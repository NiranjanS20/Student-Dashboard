// Asset validation utility for production deployment
export interface AssetValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateAssetPaths = async (): Promise<AssetValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if we're in development or production
  const isDev = (import.meta as any).env?.DEV || false;
  const baseUrl = isDev ? '' : (import.meta as any).env?.BASE_URL || '/';

  // Required CSV files
  const csvFiles = [
    '/data/Walkability Survey (Niranjan).csv',
    '/data/Walkability Survey (Aarna).csv',
    '/data/Walkability Survey (Disha).csv',
    '/data/Walkability Survey (Crisann).csv'
  ];

  // Check CSV files
  for (const csvPath of csvFiles) {
    try {
      const response = await fetch(baseUrl + csvPath.substring(1));
      if (!response.ok) {
        errors.push(`CSV file not accessible: ${csvPath} (Status: ${response.status})`);
      }
    } catch (error) {
      errors.push(`Failed to fetch CSV: ${csvPath} - ${error}`);
    }
  }

  // Check placeholder image
  try {
    const response = await fetch(baseUrl + 'skywalk/placeholder.svg');
    if (!response.ok) {
      warnings.push(`Placeholder image not found: /skywalk/placeholder.svg`);
    }
  } catch (error) {
    warnings.push(`Failed to fetch placeholder image: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const preloadCriticalAssets = async (): Promise<void> => {
  const isDev = (import.meta as any).env?.DEV || false;
  const baseUrl = isDev ? '' : (import.meta as any).env?.BASE_URL || '/';

  // Preload critical CSV files
  const csvFiles = [
    '/data/Walkability Survey (Niranjan).csv',
    '/data/Walkability Survey (Aarna).csv',
    '/data/Walkability Survey (Disha).csv',
    '/data/Walkability Survey (Crisann).csv'
  ];

  const preloadPromises = csvFiles.map(async (csvPath) => {
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = baseUrl + csvPath.substring(1);
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Failed to preload ${csvPath}:`, error);
    }
  });

  await Promise.allSettled(preloadPromises);
};

// Utility to check external link availability
export const checkExternalLink = async (url: string): Promise<boolean> => {
  try {
    // For external links, we can only check if they're properly formatted
    // CORS prevents us from actually fetching them
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

// Validate all external links in the application
export const validateExternalLinks = async (): Promise<{valid: string[], invalid: string[]}> => {
  const externalLinks = [
    'https://crossing-project-game.vercel.app/',
    'https://mapillary.com/map/im/647572587915776',
    'https://mapillary.com/map/im/1880608246136267',
    'https://mapillary.com/map/im/1063792962636018',
    'https://www.mapillary.com/app/?pKey=4375816732652468',
    'https://www.mapillary.com/app/?pKey=639365212122666',
    'https://www.mapillary.com/app/?pKey=75675353711118',
    'https://mapillary.com/map/im/1158045939477828',
    'https://mapillary.com/map/im/142010767573787676',
    'https://mapillary.com/map/im/652579527875101',
    'https://mapillary.com/map/im/1430948828118182',
    'https://www.google.com/maps/d/edit?mid=1_YoIB1mH7pgxZMFTVNseVWm9VNNrspE&usp=sharing',
    'https://www.google.com/maps/d/edit?mid=1abMA2-fTLjuJy7VOe2R0JqDXbD1jTuY&usp=sharing',
    'https://www.google.com/maps/d/u/0/edit?mid=1FXlbA6B1fxyk6MkxcmJYO9PU-IPdqoY&usp=sharing',
    'https://www.google.com/maps/d/u/0/edit?mid=1VAsdOW-Zx0b01E30Uwi6xi4dZ8syOvA&ll=19.203233358625383%2C72.84361475000001&z=17'
  ];

  const valid: string[] = [];
  const invalid: string[] = [];

  for (const link of externalLinks) {
    const isValid = await checkExternalLink(link);
    if (isValid) {
      valid.push(link);
    } else {
      invalid.push(link);
    }
  }

  return { valid, invalid };
};
