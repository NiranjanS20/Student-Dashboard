import React, { useState, useEffect } from 'react';
import { X, Download, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface PhotoItem {
  src: string;
  alt: string;
  filename: string;
  isLoaded: boolean;
  hasError: boolean;
}

interface DynamicPhotoGalleryProps {
  memberKey: string;
  title?: string;
  maxDisplay?: number;
}

const DynamicPhotoGallery: React.FC<DynamicPhotoGalleryProps> = ({ 
  memberKey, 
  title = "Photo Documentation", 
  maxDisplay = 6 
}) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const discoverPhotos = async () => {
      setIsLoading(true);
      
      // Define actual photo names based on what we know exists
      const knownPhotos: Record<string, string[]> = {
        niranjan: [
          '20251003_114854AMByGPSMapCamera.jpg',
          '20251003_114953AMByGPSMapCamera.jpg',
          '20251003_115042AMByGPSMapCamera.jpg',
          '20251003_115050AMByGPSMapCamera.jpg',
          '20251003_115143AMByGPSMapCamera.jpg',
          '20251003_115236AMByGPSMapCamera.jpg',
          '20251003_115342AMByGPSMapCamera.jpg',
          '20251003_115430AMByGPSMapCamera.jpg',
          '20251003_115514AMByGPSMapCamera.jpg',
          '20251003_115538AMByGPSMapCamera.jpg',
          '20251003_115603AMByGPSMapCamera.jpg',
          '20251003_115708AMByGPSMapCamera.jpg'
        ],
        aarna: [
          'IMG_3955.JPG',
          'IMG_3956.JPG',
          'IMG_3957.JPG',
          'IMG_3958.JPG',
          'IMG_3959.JPG',
          'IMG_3960.JPG',
          'IMG_3961.JPG',
          'IMG_3962.JPG',
          'IMG_3963.JPG',
          'IMG_3964.JPG',
          'IMG_3965.JPG'
        ],
        disha: [
          '20251004_53506PMByGPSMapCamera.jpg',
          '20251004_53515PMByGPSMapCamera.jpg',
          '20251004_53548PMByGPSMapCamera.jpg',
          '20251004_53559PMByGPSMapCamera.jpg',
          '20251004_53603PMByGPSMapCamera.jpg',
          '20251004_53626PMByGPSMapCamera.jpg',
          '20251004_53658PMByGPSMapCamera.jpg',
          '20251004_53715PMByGPSMapCamera.jpg',
          '20251004_53747PMByGPSMapCamera.jpg',
          '20251004_53751PMByGPSMapCamera.jpg',
          '20251004_53801PMByGPSMapCamera.jpg',
          '20251004_53919PMByGPSMapCamera.jpg',
          '20251004_54012PMByGPSMapCamera.jpg',
          '20251004_54015PMByGPSMapCamera.jpg',
          '20251004_54042PMByGPSMapCamera.jpg',
          '20251004_54058PMByGPSMapCamera.jpg',
          '20251004_54117PMByGPSMapCamera.jpg',
          '20251004_54134PMByGPSMapCamera.jpg'
        ],
        crisann: [
          '20251009_41737PMByGPSMapCamera.jpg',
          '20251009_41752PMByGPSMapCamera.jpg',
          '20251009_41807PMByGPSMapCamera.jpg',
          '20251009_41904PMByGPSMapCamera.jpg',
          '20251009_41955PMByGPSMapCamera.jpg',
          '20251009_42116PMByGPSMapCamera.jpg',
          '20251009_42143PMByGPSMapCamera.jpg',
          '20251009_42422PMByGPSMapCamera.jpg',
          '20251009_42520PMByGPSMapCamera.jpg',
          '20251009_42559PMByGPSMapCamera.jpg',
          '20251009_42644PMByGPSMapCamera.jpg',
          '20251009_42702PMByGPSMapCamera.jpg',
          '20251009_42727PMByGPSMapCamera.jpg',
          '20251009_42808PMByGPSMapCamera.jpg'
        ]
      };

      // Get photos for this member
      const memberPhotos = knownPhotos[memberKey] || [];
      const discoveredPhotos: PhotoItem[] = [];
      
      // Try to load each known photo
      for (let index = 0; index < memberPhotos.length; index++) {
        const filename = memberPhotos[index];
        const photoPath = `/skywalk/${memberKey}/${filename}`;
        
        try {
          const response = await fetch(photoPath, { method: 'HEAD' });
          if (response.ok) {
            discoveredPhotos.push({
              src: photoPath,
              alt: `${memberKey} skywalk audit photo ${index + 1}`,
              filename,
              isLoaded: false,
              hasError: false
            });
          }
        } catch (error) {
          console.warn(`Failed to load photo: ${photoPath}`, error);
        }
      }

      console.log(`Found ${discoveredPhotos.length} photos for ${memberKey}`);
      setPhotos(discoveredPhotos);
      setIsLoading(false);
    };

    discoverPhotos();
  }, [memberKey]);

  const openLightbox = (photo: PhotoItem, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + photos.length) % photos.length
      : (currentIndex + 1) % photos.length;
    
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handlePhotoLoad = (index: number) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, isLoaded: true } : photo
    ));
  };

  const handlePhotoError = (index: number) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, hasError: true } : photo
    ));
  };

  const downloadPhoto = async (photoSrc: string, filename: string) => {
    try {
      const response = await fetch(photoSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download photo:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Camera className="h-4 w-4 mr-1" />
            Loading...
          </div>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Camera className="h-4 w-4 mr-1" />
            0 photos
          </div>
        </div>
        <div className="text-center py-8">
          <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No photos available for this location.</p>
        </div>
      </div>
    );
  }

  const displayPhotos = photos.slice(0, maxDisplay);
  const remainingCount = photos.length - maxDisplay;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Camera className="h-4 w-4 mr-1" />
            {photos.length} photos
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
              onClick={() => openLightbox(photo, index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onLoad={() => handlePhotoLoad(index)}
                onError={() => handlePhotoError(index)}
                loading="lazy"
              />
              {photo.hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Failed to load</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
            </div>
          ))}

          {remainingCount > 0 && (
            <div
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow flex items-center justify-center"
              onClick={() => openLightbox(photos[maxDisplay], maxDisplay)}
            >
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">+{remainingCount} more</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => navigatePhoto('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigatePhoto('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Photo */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Photo info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedPhoto.filename}</p>
                  <p className="text-sm text-gray-300">
                    Photo {currentIndex + 1} of {photos.length}
                  </p>
                </div>
                <button
                  onClick={() => downloadPhoto(selectedPhoto.src, selectedPhoto.filename)}
                  className="p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
                  aria-label="Download photo"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicPhotoGallery;
