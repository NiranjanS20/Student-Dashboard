import React from 'react';
import { ExternalLink, Camera } from 'lucide-react';

interface ExternalLinkCardProps {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  type?: 'mapillary' | 'general';
}

const ExternalLinkCard: React.FC<ExternalLinkCardProps> = ({ 
  url, 
  title, 
  description, 
  thumbnail, 
  type = 'general' 
}) => {
  const openLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={openLink}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${thumbnail ? 'hidden' : ''}`}>
            {type === 'mapillary' ? (
              <Camera className="h-6 w-6 text-gray-500" />
            ) : (
              <ExternalLink className="h-6 w-6 text-gray-500" />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>Open in {type === 'mapillary' ? 'Mapillary' : 'new tab'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkCard;
