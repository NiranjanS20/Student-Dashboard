import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

interface NotFoundProps {
  title?: string;
  message?: string;
  showSearch?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  title = "Page Not Found", 
  message = "The page you're looking for doesn't exist or may have been moved.",
  showSearch = false 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {showSearch && (
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for pages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Simple search functionality
                    const query = (e.target as HTMLInputElement).value.toLowerCase();
                    if (query.includes('team')) window.location.href = '/team';
                    else if (query.includes('survey')) window.location.href = '/survey-insights';
                    else if (query.includes('map')) window.location.href = '/ward-maps';
                    else if (query.includes('about')) window.location.href = '/about';
                  }
                }}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/team" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Team
              </Link>
              <Link to="/survey-insights" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Survey Insights
              </Link>
              <Link to="/ward-maps" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Ward Maps
              </Link>
              <Link to="/resources" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Resources
              </Link>
              <Link to="/about" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
