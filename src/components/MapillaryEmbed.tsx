import React, { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Camera, AlertCircle } from 'lucide-react';

interface MapillaryEmbedProps {
  urls: readonly string[];
  title?: string;
  memberName?: string;
}

interface MapillaryPreview {
  url: string;
  id: string;
  type: 'image' | 'sequence';
  thumbnailUrl?: string;
  isLoaded: boolean;
  hasError: boolean;
}

const MapillaryEmbed: React.FC<MapillaryEmbedProps> = ({ urls, title, memberName }) => {
  const [previews, setPreviews] = useState<MapillaryPreview[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<MapillaryPreview | null>(null);

  useEffect(() => {
    const initializePreviews = () => {
      const initialPreviews: MapillaryPreview[] = urls.map(url => {
        const id = extractMapillaryId(url);
        const type = url.includes('/im/') ? 'image' : 'sequence';
        
        return {
          url,
          id,
          type,
          thumbnailUrl: generateThumbnailUrl(id, type),
          isLoaded: false,
          hasError: false
        };
      });
      
      setPreviews(initialPreviews);
    };

    initializePreviews();
  }, [urls]);

  const extractMapillaryId = (url: string): string => {
    // Extract ID from various Mapillary URL formats
    if (url.includes('/im/')) {
      return url.split('/im/')[1].split('?')[0];
    } else if (url.includes('pKey=')) {
      return url.split('pKey=')[1].split('&')[0];
    }
    return '';
  };

  const generateThumbnailUrl = (id: string, type: 'image' | 'sequence'): string => {
    if (type === 'image') {
      // Mapillary API v4 thumbnail endpoint
      return `https://graph.mapillary.com/${id}?fields=thumb_1024_url&access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333`;
    } else {
      // For sequences, we'll use a placeholder or try to get first image
      return `https://images.mapillary.com/${id}/thumb-1024.jpg`;
    }
  };

  const handlePreviewLoad = (index: number) => {
    setPreviews(prev => prev.map((preview, i) => 
      i === index ? { ...preview, isLoaded: true } : preview
    ));
  };

  const handlePreviewError = (index: number) => {
    setPreviews(prev => prev.map((preview, i) => 
      i === index ? { ...preview, hasError: true } : preview
    ));
  };

  const openMapillaryLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!urls || urls.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No street-view images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {memberName && `${memberName}'s Documentation`}
          </div>
        </div>
      )}

      {/* Preview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative group cursor-pointer bg-gray-50 rounded-lg overflow-hidden aspect-video border-2 border-transparent hover:border-primary-300 transition-all duration-200"
            onClick={() => setSelectedPreview(preview)}
          >
            {!preview.hasError ? (
              <>
                <img
                  src={preview.thumbnailUrl}
                  alt={`Street view ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => handlePreviewLoad(index)}
                  onError={() => handlePreviewError(index)}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white rounded-full p-2">
                      <ExternalLink className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {preview.type === 'image' ? 'Image' : 'Sequence'}
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Preview unavailable</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openMapillaryLink(preview.url);
                    }}
                    className="mt-2 text-xs text-primary-600 hover:text-primary-700 underline"
                  >
                    View on Mapillary
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {urls.map((url, index) => (
          <button
            key={index}
            onClick={() => openMapillaryLink(url)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 hover:border-primary-300 transition-colors"
            aria-label={`Open street view ${index + 1} in Mapillary`}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View {index + 1}
          </button>
        ))}
      </div>

      {/* Selected Preview Modal */}
      {selectedPreview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPreview(null)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Street View Preview</h4>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
              {!selectedPreview.hasError ? (
                <img
                  src={selectedPreview.thumbnailUrl}
                  alt="Street view preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Preview not available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => openMapillaryLink(selectedPreview.url)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Mapillary
              </button>
              <button
                onClick={() => setSelectedPreview(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapillaryEmbed;
