import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { members } from '../data/members';
import { loadCSV, SurveyResponse } from '../utils/csv';
import { transformDataForDynamicChart } from '../utils/dynamicDataParser';

interface Filters {
  wards: string[];
  walkingFrequency: string[];
  members: string[];
}

const SurveyInsights: React.FC = () => {
  const [allData, setAllData] = useState<SurveyResponse[]>([]);
  const [filteredData, setFilteredData] = useState<SurveyResponse[]>([]);
  const [filters, setFilters] = useState<Filters>({
    wards: [],
    walkingFrequency: [],
    members: []
  });
  const [loading, setLoading] = useState(true);

  // Get unique values for filters
  const uniqueWards = [...new Set(allData.map(item => item.ward))].sort();
  const uniqueFrequencies = ['Daily', 'Weekly', 'Rarely', 'Never'];
  const uniqueMembers = Object.values(members).map(m => m.name);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const promises = Object.values(members).map(member => loadCSV(member.csv));
        const results = await Promise.all(promises);
        const combined = results.flat();
        setAllData(combined);
        setFilteredData(combined);
      } catch (error) {
        console.error('Error loading survey data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    let filtered = allData;

    if (filters.wards.length > 0) {
      filtered = filtered.filter(item => filters.wards.includes(item.ward));
    }

    if (filters.walkingFrequency.length > 0) {
      filtered = filtered.filter(item => filters.walkingFrequency.includes(item.walking_frequency));
    }

    if (filters.members.length > 0) {
      filtered = filtered.filter(item => filters.members.includes(item.member));
    }

    setFilteredData(filtered);
  }, [filters, allData]);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({ wards: [], walkingFrequency: [], members: [] });
  };

  const hasActiveFilters = filters.wards.length > 0 || filters.walkingFrequency.length > 0 || filters.members.length > 0;

  // Chart data using dynamic transformation with error handling
  const footpathConditionData = filteredData.length > 0 ? 
    transformDataForDynamicChart(filteredData, 'footpath_condition', 'bar') : [];
  const roadConditionData = filteredData.length > 0 ? 
    transformDataForDynamicChart(filteredData, 'road_condition', 'bar') : [];
  const obstaclesData = filteredData.length > 0 ? 
    transformDataForDynamicChart(filteredData, 'obstacles', 'pie') : [];
  const walkingFrequencyData = filteredData.length > 0 ? 
    transformDataForDynamicChart(filteredData, 'walking_frequency', 'pie') : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Survey Insights</h1>
        <p className="text-lg text-gray-600">
          Combined analysis of walkability surveys across all team members and locations.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Ward Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Wards</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueWards.map(ward => (
                <button
                  key={ward}
                  onClick={() => toggleFilter('wards', ward)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.wards.includes(ward)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {ward}
                </button>
              ))}
            </div>
          </div>

          {/* Walking Frequency Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Walking Frequency</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueFrequencies.map(freq => (
                <button
                  key={freq}
                  onClick={() => toggleFilter('walkingFrequency', freq)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.walkingFrequency.includes(freq)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Member Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Team Members</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueMembers.map(member => (
                <button
                  key={member}
                  onClick={() => toggleFilter('members', member)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.members.includes(member)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {member}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredData.length}</span> of{' '}
            <span className="font-medium">{allData.length}</span> survey responses
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard
          title="Footpath Condition Distribution"
          subtitle="Rating distribution across all surveys"
          data={footpathConditionData}
          type="bar"
        />
        <ChartCard
          title="Top Walking Obstacles"
          subtitle="Most frequently reported barriers"
          data={obstaclesData}
          type="pie"
        />
        <ChartCard
          title="Road Condition Distribution"
          subtitle="Rating distribution across all surveys"
          data={roadConditionData}
          type="bar"
        />
        <ChartCard
          title="Walking Frequency Patterns"
          subtitle="How often people walk in surveyed areas"
          data={walkingFrequencyData}
          type="pie"
        />
      </div>

      {/* Summary Stats */}
      {!loading && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {(filteredData.reduce((sum, item) => sum + item.footpath_condition, 0) / filteredData.length || 0).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Average Footpath Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {(filteredData.reduce((sum, item) => sum + item.road_condition, 0) / filteredData.length || 0).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Average Road Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {Math.round((filteredData.filter(item => item.walking_frequency === 'Daily').length / filteredData.length || 0) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Daily Walkers</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyInsights;
