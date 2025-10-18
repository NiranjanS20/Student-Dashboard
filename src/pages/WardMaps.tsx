import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import MapEmbed from '../components/MapEmbed';
import { members } from '../data/members';

const WardMaps: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ward Maps</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Interactive maps showing the specific wards and areas covered by each team member. 
          These Google My Maps provide detailed geographical context for our walkability research.
        </p>
      </div>

      {/* Maps Grid */}
      <div className="space-y-8">
        {Object.entries(members).map(([key, member]) => (
          <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-lg">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{member.name}</h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{member.skywalk.location}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={member.wardMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full Map
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="p-6">
              <MapEmbed
                url={member.wardMap}
                title={`${member.skywalk.location} Ward Map`}
                height={400}
              />
            </div>

            {/* Additional Info */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Research Focus</h3>
                <p className="text-sm text-gray-600">
                  {member.name} is conducting comprehensive walkability assessments in {member.skywalk.location}, 
                  including survey collection, street documentation, and skywalk audits.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Explore More Data</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          These ward maps provide geographical context for our research. Dive deeper into the data with our survey insights and team member profiles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/survey-insights"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            View Survey Data
          </a>
          <a
            href="/team"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-400 transition-colors border border-primary-400"
          >
            Meet the Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default WardMaps;
