import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, MapPin, ExternalLink, Camera, FileText } from 'lucide-react';
import KPI from '../components/KPI';
import { members } from '../data/members';
import { loadCSV, SurveyResponse } from '../utils/csv';

const Dashboard: React.FC = () => {
  const [allData, setAllData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const promises = Object.values(members).map(member => loadCSV(member.csv));
        const results = await Promise.all(promises);
        const combined = results.flat();
        setAllData(combined);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const totalResponses = allData.length;
  const avgFootpathScore = allData.length > 0 
    ? (allData.reduce((sum, item) => sum + item.footpath_condition, 0) / allData.length).toFixed(1)
    : '0';
  
  const mostCommonObstacle = allData.length > 0 
    ? allData
        .flatMap(item => item.obstacles)
        .reduce((acc, obstacle) => {
          acc[obstacle] = (acc[obstacle] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    : {};
  
  const topObstacle = Object.entries(mostCommonObstacle)
    .sort(([,a], [,b]) => b - a)[0]?.[0]?.replace(/_/g, ' ') || 'N/A';

  const totalMapillaryItems = Object.values(members)
    .reduce((sum, member) => sum + member.mapillary.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Walkability Watch
          </h1>
          <p className="text-xl mb-6 text-primary-100">
            Explore surveys, street views, and skywalk audits from our field teams across Mumbai—insights that help make every step safer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/team"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Meet the Team
            </Link>
            <a
              href="https://crossing-project-game.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-400 transition-colors border border-primary-400"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Play the Walkability Game
            </a>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPI
          title="Total Survey Responses"
          value={loading ? '...' : totalResponses}
          subtitle="Across all team members"
          icon={FileText}
          color="blue"
        />
        <KPI
          title="Avg Footpath Score"
          value={loading ? '...' : `${avgFootpathScore}/5`}
          subtitle="Overall condition rating"
          icon={BarChart3}
          color="green"
        />
        <KPI
          title="Top Obstacle"
          value={loading ? '...' : topObstacle}
          subtitle="Most frequently reported"
          icon={MapPin}
          color="yellow"
        />
        <KPI
          title="Mapillary Images"
          value={totalMapillaryItems}
          subtitle="Street view documentation"
          icon={Camera}
          color="purple"
        />
      </div>

      {/* Team Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Field Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(members).map(([key, member]) => (
            <Link
              key={key}
              to={`/team/${key}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{member.skywalk.location}</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Survey data available</span>
                </div>
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  <span>{member.mapillary.length} Mapillary items</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/survey-insights"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Survey Insights</h3>
              <p className="text-sm text-gray-600">Combined analysis & filters</p>
            </div>
          </Link>
          
          <Link
            to="/ward-maps"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MapPin className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Ward Maps</h3>
              <p className="text-sm text-gray-600">Interactive area maps</p>
            </div>
          </Link>
          
          <Link
            to="/resources"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Resources</h3>
              <p className="text-sm text-gray-600">External links & tools</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
