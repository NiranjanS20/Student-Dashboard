import React from 'react';

export interface Photo {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoDocumentationProps {
  photos: Photo[];
  title?: string;
  className?: string;
}

// Base64 encoded SVG for image placeholder
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjEwMTAxMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggZD0iTTIyIDE2Ljk5OVYxMUMyMiA2LjU4MSAxNy41MjIgMyAxMiAzQzYuNDc4IDMgMiA2LjU4IDIgMTF2NS45OTlIMjJaIi8+CiAgPHBhdGggZD0iTTUgMTVMMzAuMjI4IDIuEEMxNy4zNDEgMi4yMzggMTIgNy4zMzMgMTIgMTJjMCA0LjY2NyA1LjM0MyA5Ljk5OSAxNy45OTkgOS45OTlDMTkuMjI3IDIxLjk5OSAxOSAxOC42NjcgMTkgMTVINFoiLz4KPC9zdmc+Cg==';

const PhotoDocumentation: React.FC<PhotoDocumentationProps> = ({
  photos = [],
  title = 'Photo Documentation',
  className = ''
}) => {
  // If no photos are provided, show a single placeholder
  const hasPhotos = photos.length > 0;
  const displayPhotos = hasPhotos ? photos : [
    { 
      id: 'placeholder-1', 
      src: placeholderImage, 
      alt: 'No photos available',
      caption: 'No skywalk photos available'
    }
  ];

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = placeholderImage;
    img.alt = 'Failed to load image';
    img.parentElement?.classList.add('bg-gray-50');
  };

  return (
    <section className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {displayPhotos.map((photo) => (
          <figure 
            key={photo.id}
            className="group relative overflow-hidden rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-opacity duration-300" />
            </div>
            
            <figcaption className="p-3 text-sm text-gray-600 text-center border-t border-gray-100">
              {photo.caption || 'Skywalk Audit Photo'}
            </figcaption>
          </figure>
        ))}
      </div>

      {!hasPhotos && (
        <div className="px-6 pb-6 text-center text-gray-500 text-sm">
          No skywalk photos available for this location.
        </div>
      )}
    </section>
  );
};

export default PhotoDocumentation;
