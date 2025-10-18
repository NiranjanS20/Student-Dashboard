import React from 'react';
import { ExternalLink, Camera, Gamepad2, FileText, Map, Users, BarChart3 } from 'lucide-react';
import ExternalLinkCard from '../components/ExternalLinkCard';
import { members } from '../data/members';

const Resources: React.FC = () => {
  // Collect all Mapillary links
  const allMapillaryLinks = Object.entries(members).flatMap(([_, member]) =>
    member.mapillary.map(url => ({
      url,
      memberName: member.name,
      location: member.skywalk.location
    }))
  );

  // Remove duplicates
  const uniqueMapillaryLinks = allMapillaryLinks.filter((link, index, self) =>
    index === self.findIndex(l => l.url === link.url)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resources</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          External tools, documentation, and interactive resources that support our walkability research. 
          Explore street-level imagery, play our educational game, and access additional data sources.
        </p>
      </div>

      {/* Featured Game */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <Gamepad2 className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">Walkability Game</h2>
            </div>
            <p className="text-primary-100 mb-6 max-w-2xl">
              Experience walkability challenges firsthand through our interactive game. Learn about urban planning, 
              pedestrian safety, and the factors that make streets more walkable.
            </p>
            <a
              href="https://crossing-project-game.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Play Now
            </a>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-16 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mapillary Documentation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Camera className="h-6 w-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Street-Level Imagery</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Explore our collection of Mapillary street-view images documenting walkability conditions across Mumbai.
          </p>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {uniqueMapillaryLinks.map((link, index) => (
              <ExternalLinkCard
                key={index}
                url={link.url}
                title={`${link.location} - ${link.memberName}`}
                description="Street-level imagery and data"
                type="mapillary"
              />
            ))}
          </div>
        </div>

        {/* Ward Maps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Map className="h-6 w-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Ward Maps</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Interactive Google My Maps showing the geographical areas covered by each team member.
          </p>
          <div className="space-y-3">
            {Object.entries(members).map(([key, member]) => (
              <ExternalLinkCard
                key={key}
                url={member.wardMap}
                title={`${member.skywalk.location} Ward Map`}
                description={`Mapped by ${member.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Internal Resources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/survey-insights"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <BarChart3 className="h-8 w-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary-600">Survey Data</h3>
              <p className="text-sm text-gray-600">Interactive charts and analysis</p>
            </div>
          </a>
          
          <a
            href="/team"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <Users className="h-8 w-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary-600">Team Profiles</h3>
              <p className="text-sm text-gray-600">Meet our field researchers</p>
            </div>
          </a>
          
          <a
            href="/about"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <FileText className="h-8 w-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary-600">About Project</h3>
              <p className="text-sm text-gray-600">Background and methodology</p>
            </div>
          </a>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Sources & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Primary Data Collection</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Field surveys and questionnaires</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Street-level photography</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Community interviews</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Infrastructure audits</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Technology Stack</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Mapillary for street imagery</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Google My Maps for area mapping</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>React & Recharts for visualization</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>CSV data processing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Collaboration */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Collaborate With Us</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Interested in contributing to walkability research or using our data for your own projects? 
          We welcome collaboration with researchers, urban planners, and community organizations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/about"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Learn More
          </a>
          <a
            href="/team"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-white transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Contact Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;
