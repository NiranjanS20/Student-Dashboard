import React from 'react';

interface PhotoDocumentationProps {
  photos: Array<{
    id: string | number;
    src: string;
    alt: string;
    caption?: string;
  }>;
  title?: string;
}

const PhotoDocumentation: React.FC<PhotoDocumentationProps> = ({ 
  photos, 
  title = 'Photo Documentation' 
}) => {
  // Default sample photos if none provided (for demo purposes)
  const defaultPhotos = [
    { id: 1, src: 'image.jpg', alt: 'Skywalk photo 1', caption: 'Skywalk Audit Photo' },
    { id: 2, src: 'image.jpg', alt: 'Skywalk photo 2', caption: 'Skywalk Audit Photo' },
    { id: 3, src: 'image.jpg', alt: 'Skywalk photo 3', caption: 'Skywalk Audit Photo' },
  ];

  const displayPhotos = photos?.length > 0 ? photos : defaultPhotos;

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayPhotos.map((photo) => (
          <figure key={photo.id} className="group relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback for broken images
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUg4TTggOVY5TTggMTNIMTJNMTIgMTNWMTdNMTIgMTdIOE04IDE3VjEzTTggMTNWOSIgc3Ryb2tlPSIjOUI5QkEwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
            </div>
            <figcaption className="mt-3 text-sm text-gray-600 text-center">
              {photo.caption || 'Skywalk Audit Photo'}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default PhotoDocumentation;
