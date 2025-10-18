import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Camera, BarChart3, ExternalLink } from 'lucide-react';
import { members } from '../data/members';

const Team: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Field Team</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Meet the dedicated researchers mapping walkability across Mumbai. Each team member focuses on a specific ward, 
          conducting surveys, documenting street conditions, and engaging with local communities.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(members).map(([key, member]) => (
          <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                  <p className="text-primary-700 font-medium">{member.role}</p>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{member.skywalk.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                  </div>
                  <p className="text-sm text-gray-600">Survey Data</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {member.mapillary.length}
                  </div>
                  <p className="text-sm text-gray-600">Mapillary Items</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {member.skywalk.photos.length}
                  </div>
                  <p className="text-sm text-gray-600">Skywalk Photos</p>
                </div>
              </div>

              {/* Recent Interviews */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Street Interviews</h3>
                <div className="space-y-2">
                  {member.streetInterviews.slice(0, 2).map((interview, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium text-gray-900">{interview.name}</p>
                      <p className="text-gray-600 line-clamp-1">{interview.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/team/${key}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Details
                </Link>
                <a
                  href={member.wardMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ward Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Explore the Data</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Dive deeper into our findings with interactive charts, combined survey insights, and detailed ward maps.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/survey-insights"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Survey Insights
          </Link>
          <Link
            to="/ward-maps"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-400 transition-colors border border-primary-400"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Ward Maps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;
