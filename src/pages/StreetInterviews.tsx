import React from 'react';
import { MessageSquare, Calendar, MapPin, User } from 'lucide-react';
import { members } from '../data/members';

const StreetInterviews: React.FC = () => {
  // Combine all interviews from all members
  const allInterviews = Object.entries(members).flatMap(([key, member]) =>
    member.streetInterviews.map(interview => ({
      ...interview,
      memberName: member.name,
      memberKey: key,
      location: member.skywalk.location
    }))
  );

  // Sort by date (most recent first)
  const sortedInterviews = allInterviews.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Street Interviews</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Direct insights from community members about their walking experiences, challenges, and suggestions 
          for improving walkability in their neighborhoods.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <MessageSquare className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{allInterviews.length}</div>
          <p className="text-sm text-gray-600">Total Interviews</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">4</div>
          <p className="text-sm text-gray-600">Locations</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <User className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">4</div>
          <p className="text-sm text-gray-600">Interviewers</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.ceil((new Date().getTime() - new Date(sortedInterviews[sortedInterviews.length - 1]?.date || new Date()).getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <p className="text-sm text-gray-600">Days of Collection</p>
        </div>
      </div>

      {/* Interviews by Member */}
      <div className="space-y-8">
        {Object.entries(members).map(([key, member]) => (
          <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
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
                    <span className="mx-2">•</span>
                    <span>{member.streetInterviews.length} interviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interviews */}
            <div className="p-6">
              <div className="space-y-4">
                {member.streetInterviews.map((interview, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <h3 className="font-medium text-gray-900">{interview.name}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{interview.summary}</p>
                    
                    {/* Tags based on content */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interview.summary.toLowerCase().includes('lighting') && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Lighting</span>
                      )}
                      {interview.summary.toLowerCase().includes('footpath') && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Footpaths</span>
                      )}
                      {interview.summary.toLowerCase().includes('traffic') && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Traffic</span>
                      )}
                      {interview.summary.toLowerCase().includes('safety') && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Safety</span>
                      )}
                      {interview.summary.toLowerCase().includes('parking') && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Parking</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Themes */}
      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Safety Concerns</h3>
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Poor lighting conditions</li>
              <li>• Traffic speed and volume</li>
              <li>• Unsafe for children</li>
              <li>• Lack of proper crossings</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Infrastructure Issues</h3>
            <ul className="text-blue-700 space-y-2 text-sm">
              <li>• Broken or uneven paving</li>
              <li>• Footpath encroachment</li>
              <li>• Parking on walkways</li>
              <li>• Missing kerbs and ramps</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Improvement Requests</h3>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• Wider footpaths</li>
              <li>• Better lighting systems</li>
              <li>• Traffic calming measures</li>
              <li>• More rest areas and benches</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Approach</h3>
            <p className="text-sm text-gray-600">
              Our team conducts informal street interviews with local residents, commuters, and business owners 
              to gather authentic insights about walking experiences and challenges in their neighborhoods.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Key Questions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• How often do you walk in this area?</li>
              <li>• What are the main obstacles you face?</li>
              <li>• What improvements would help most?</li>
              <li>• Do you feel safe walking here?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetInterviews;
