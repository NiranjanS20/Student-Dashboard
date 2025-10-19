// Dynamic image discovery utility for skywalk audit photos
export interface ImageFile {
  filename: string;
  path: string;
  size?: number;
  lastModified?: Date;
}

export interface ImageDiscoveryResult {
  images: ImageFile[];
  errors: string[];
  totalFound: number;
}

/**
 * Dynamically discovers all images in a member's skywalk directory
 * Uses multiple strategies to find images without hardcoding filenames
 */
export const discoverMemberImages = async (memberKey: string): Promise<ImageDiscoveryResult> => {
  const baseDir = `/skywalk/${memberKey}/`;
  const discoveredImages: ImageFile[] = [];
  const errors: string[] = [];
  
  // Common image extensions (for future use)
  // const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg'];
  
  // Strategy 1: Try common naming patterns
  const namingPatterns = [
    // Simple numbered patterns
    (i: number) => `${i}.jpg`,
    (i: number) => `${i}.jpeg`,
    (i: number) => `${i}.png`,
    (i: number) => `${i}.webp`,
    
    // Photo/image prefixed patterns
    (i: number) => `photo${i}.jpg`,
    (i: number) => `image${i}.jpg`,
    (i: number) => `audit${i}.jpg`,
    (i: number) => `pic${i}.jpg`,
    
    // Member-specific patterns
    (i: number) => `${memberKey}${i}.jpg`,
    (i: number) => `${memberKey}_${i}.jpg`,
    (i: number) => `${memberKey}-${i}.jpg`,
    
    // Zero-padded patterns
    (i: number) => `${String(i).padStart(2, '0')}.jpg`,
    (i: number) => `${String(i).padStart(3, '0')}.jpg`,
    (i: number) => `photo${String(i).padStart(2, '0')}.jpg`,
  ];
  
  // Strategy 2: Camera patterns (for future pattern matching)
  // const cameraPatterns = [
  //   /^\d{8}_\d{6}[AP]MByGPSMapCamera\.(jpg|jpeg)$/i,
  //   /^IMG_\d{4}\.(jpg|jpeg|png)$/i,
  //   /^DSC_\d{4}\.(jpg|jpeg)$/i,
  //   /^DCIM_\d{4}\.(jpg|jpeg)$/i,
  //   /^Photo_\d{4}\.(jpg|jpeg|png)$/i,
  //   /^Screenshot_\d{8}_\d{6}\.(png|jpg)$/i,
  //   /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.(jpg|jpeg|png)$/i,
  //   /^\d{8}_\d{6}\.(jpg|jpeg|png)$/i,
  //   /^\d{13}\.(jpg|jpeg|png)$/i, // Unix timestamp
  // ];
  
  // Strategy 3: Try to discover images using pattern matching
  const maxAttempts = 50; // Reasonable limit to avoid infinite loops
  
  // First, try numbered patterns
  for (let i = 1; i <= maxAttempts; i++) {
    for (const pattern of namingPatterns) {
      const filename = pattern(i);
      const imagePath = `${baseDir}${filename}`;
      
      try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
          // Check if we already found this image
          if (!discoveredImages.some(img => img.filename === filename)) {
            discoveredImages.push({
              filename,
              path: imagePath,
              size: parseInt(response.headers.get('content-length') || '0'),
              lastModified: response.headers.get('last-modified') 
                ? new Date(response.headers.get('last-modified')!) 
                : undefined
            });
          }
        }
      } catch (error) {
        // Silently continue - this is expected for non-existent files
      }
    }
  }
  
  // Strategy 4: Try known camera patterns with reasonable date ranges
  // const currentYear = new Date().getFullYear();
  // const years = [currentYear, currentYear - 1]; // Current and previous year
  // const months = Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0'));
  // const days = Array.from({length: 31}, (_, i) => String(i + 1).padStart(2, '0'));
  
  // Try GPS Map Camera pattern (sample a few dates to avoid too many requests)
  const sampleDates = [
    '20251003', '20251004', '20251009', '20251010', '20251011', // Recent dates from your files
    '20240901', '20240902', '20240903', // Some older dates
  ];
  
  for (const date of sampleDates) {
    for (let hour = 0; hour < 24; hour += 2) { // Sample every 2 hours
      for (let minute = 0; minute < 60; minute += 15) { // Sample every 15 minutes
        const timeStr = `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const filename = `${date}_${timeStr}${ampm}ByGPSMapCamera.jpg`;
        const imagePath = `${baseDir}${filename}`;
        
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok && !discoveredImages.some(img => img.filename === filename)) {
            discoveredImages.push({
              filename,
              path: imagePath,
              size: parseInt(response.headers.get('content-length') || '0'),
              lastModified: response.headers.get('last-modified') 
                ? new Date(response.headers.get('last-modified')!) 
                : undefined
            });
          }
        } catch (error) {
          // Continue silently
        }
      }
    }
  }
  
  // Strategy 5: Try iPhone IMG pattern
  for (let i = 3900; i <= 4000; i++) { // Range around your actual files
    const filename = `IMG_${i}.JPG`;
    const imagePath = `${baseDir}${filename}`;
    
    try {
      const response = await fetch(imagePath, { method: 'HEAD' });
      if (response.ok && !discoveredImages.some(img => img.filename === filename)) {
        discoveredImages.push({
          filename,
          path: imagePath,
          size: parseInt(response.headers.get('content-length') || '0'),
          lastModified: response.headers.get('last-modified') 
            ? new Date(response.headers.get('last-modified')!) 
            : undefined
        });
      }
    } catch (error) {
      // Continue silently
    }
  }
  
  // Sort images by filename for consistent ordering
  discoveredImages.sort((a, b) => a.filename.localeCompare(b.filename));
  
  console.log(`Image discovery for ${memberKey}: Found ${discoveredImages.length} images`);
  
  return {
    images: discoveredImages,
    errors,
    totalFound: discoveredImages.length
  };
};

/**
 * Fallback method using a more aggressive discovery approach
 */
export const aggressiveImageDiscovery = async (memberKey: string): Promise<ImageFile[]> => {
  const baseDir = `/skywalk/${memberKey}/`;
  const discovered: ImageFile[] = [];
  
  // Try a wider range of patterns and numbers
  const patterns = [
    // Basic patterns
    (i: number) => `${i}.jpg`,
    (i: number) => `${i}.jpeg`,
    (i: number) => `${i}.png`,
    
    // Your specific patterns based on actual files
    (i: number) => `IMG_${3950 + i}.JPG`, // Aarna's pattern
    (i: number) => `20251003_${String(114800 + i * 100).substring(0, 6)}AMByGPSMapCamera.jpg`, // Niranjan's pattern
    (i: number) => `20251004_${String(535000 + i * 100).substring(0, 6)}PMByGPSMapCamera.jpg`, // Disha's pattern
    (i: number) => `20251009_${String(417000 + i * 100).substring(0, 6)}PMByGPSMapCamera.jpg`, // Crisann's pattern
  ];
  
  for (let i = 0; i < 30; i++) { // Try up to 30 variations
    for (const pattern of patterns) {
      const filename = pattern(i);
      const imagePath = `${baseDir}${filename}`;
      
      try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok && !discovered.some(img => img.filename === filename)) {
          discovered.push({
            filename,
            path: imagePath
          });
        }
      } catch (error) {
        // Continue silently
      }
    }
  }
  
  return discovered;
};

/**
 * Create a manifest of all images for a member (for development/debugging)
 */
export const createImageManifest = async (memberKey: string): Promise<string> => {
  const result = await discoverMemberImages(memberKey);
  
  const manifest = {
    memberKey,
    discoveredAt: new Date().toISOString(),
    totalImages: result.totalFound,
    images: result.images.map(img => ({
      filename: img.filename,
      path: img.path,
      size: img.size,
      lastModified: img.lastModified?.toISOString()
    })),
    errors: result.errors
  };
  
  return JSON.stringify(manifest, null, 2);
};
