import React, { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface MapEmbedProps {
  url: string;
  title: string;
  height?: number;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ url, title, height = 480 }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (hasError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Unable to embed the map. This may be due to browser security settings.
          </p>
          <button
            onClick={openInNewTab}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View on Google My Maps</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={openInNewTab}
          className="inline-flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open in new tab</span>
        </button>
      </div>
      
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          title={title}
          aria-label={`Interactive map: ${title}`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default MapEmbed;
