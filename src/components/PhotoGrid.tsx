import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  title?: string;
  maxDisplay?: number;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, title, maxDisplay = 4 }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayPhotos = photos.slice(0, maxDisplay);
  const remainingCount = photos.length - maxDisplay;

  const openLightbox = (photo: string, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    // Restore body scroll when lightbox is closed
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + photos.length) % photos.length
      : (currentIndex + 1) % photos.length;
    
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          if (photos.length > 1) navigatePhoto('prev');
          break;
        case 'ArrowRight':
          if (photos.length > 1) navigatePhoto('next');
          break;
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedPhoto, photos.length]);

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No photos available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(photo, index)}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUg4TTggOVY5TTggMTNIMTJNMTIgMTNWMTdNMTIgMTdIOE04IDE3VjEzTTggMTNWOSIgc3Ryb2tlPSIjOUI5QkEwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200" />
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                +{remainingCount} more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => navigatePhoto('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={() => navigatePhoto('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
            
            <img
              src={selectedPhoto}
              alt={`Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} of {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGrid;
