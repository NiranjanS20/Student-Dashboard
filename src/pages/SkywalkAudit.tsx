import React from 'react';
import { Building, MapPin, Camera, FileText } from 'lucide-react';
import PhotoGrid from '../components/PhotoGrid';
import { members } from '../data/members';

const SkywalkAudit: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Skywalk Audit</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive assessments of skywalk infrastructure across Mumbai. Our team evaluates accessibility, 
          safety conditions, maintenance needs, and usage patterns to improve pedestrian connectivity.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Building className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Object.keys(members).length}</div>
          <p className="text-sm text-gray-600">Locations Audited</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Camera className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Object.values(members).reduce((sum, member) => sum + member.skywalk.photos.length, 0)}
          </div>
          <p className="text-sm text-gray-600">Photos Collected</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <FileText className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">4</div>
          <p className="text-sm text-gray-600">Team Members</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">4</div>
          <p className="text-sm text-gray-600">Wards Covered</p>
        </div>
      </div>

      {/* Audit Results by Location */}
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
                    <h2 className="text-xl font-semibold text-gray-900">{member.skywalk.location}</h2>
                    <p className="text-gray-600">Audited by {member.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Photos</div>
                  <div className="text-lg font-semibold text-gray-900">{member.skywalk.photos.length}</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Audit Details */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                      <p className="text-sm text-gray-600">{member.skywalk.location}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Assessment Areas</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Structural integrity</li>
                        <li>• Accessibility features</li>
                        <li>• Safety conditions</li>
                        <li>• Maintenance needs</li>
                        <li>• Usage patterns</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
                      <p className="text-sm text-gray-600">
                        Detailed assessment findings and recommendations for improving 
                        pedestrian infrastructure and connectivity in {member.skywalk.location}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo Documentation */}
                <div className="lg:col-span-2">
                  <PhotoGrid
                    photos={member.skywalk.photos}
                    title="Photo Documentation"
                    maxDisplay={6}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Criteria</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Structural condition and safety features</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Accessibility for disabled users</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Lighting and visibility conditions</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Cleanliness and maintenance status</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Connectivity to surrounding areas</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Collection</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Photographic documentation</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Condition assessment forms</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Usage pattern observations</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>GPS location mapping</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>User feedback collection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkywalkAudit;
