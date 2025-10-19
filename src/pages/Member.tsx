import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageSquare, Users } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import MapEmbed from '../components/MapEmbed';
import MapillaryEmbed from '../components/MapillaryEmbed';
import DynamicPhotoGallery from '../components/DynamicPhotoGallery';
import Loading from '../components/Loading';
import { members, MemberKey } from '../data/members';
import { loadCSV, SurveyResponse } from '../utils/csv';
import { transformDataForChart } from '../utils/charts';
import { analyzeCSVSchema, detectBestMetrics, getOptimalChartType, transformDataForDynamicChart, SchemaAnalysis } from '../utils/dynamicDataParser';

const Member: React.FC = () => {
  const { memberKey } = useParams<{ memberKey: string }>();
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [schema, setSchema] = useState<SchemaAnalysis | null>(null);
  const [dynamicMetrics, setDynamicMetrics] = useState<string[]>([]);

  const member = memberKey ? members[memberKey as MemberKey] : null;

  useEffect(() => {
    if (!member) return;

    const loadMemberData = async () => {
      try {
        // Load CSV data
        const csvData = await loadCSV(member.csv);
        console.log(`Member ${memberKey} loaded ${csvData.length} responses from ${member.csv}`);
        console.log('Sample data:', csvData.slice(0, 2));
        setData(csvData);

        // Analyze schema and detect best metrics
        const schemaAnalysis = await analyzeCSVSchema(member.csv);
        setSchema(schemaAnalysis);
        
        // Get the two best metrics for this member
        const bestMetrics = detectBestMetrics(schemaAnalysis);
        setDynamicMetrics(bestMetrics);

        setLoading(false);
      } catch (error) {
        console.error('Error loading member data:', error);
        setLoading(false);
      }
    };

    loadMemberData();
  }, [member]);

  if (!member) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/team"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Member Not Found</h1>
          <p className="text-gray-600 mb-6">
            The team member "{memberKey}" doesn't exist or may have been removed from our records.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/team"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Users className="h-4 w-4 mr-2" />
              View All Team Members
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading message="Loading member data..." fullScreen />;
  }

  // Use dynamic metrics if available, fallback to configured charts
  const metricsToUse = dynamicMetrics.length >= 2 ? dynamicMetrics : 
    member.charts.map(chart => chart.metric);
  
  const chartType1 = schema ? getOptimalChartType(metricsToUse[0], schema) : member.charts[0]?.type || 'bar';
  const chartType2 = schema ? getOptimalChartType(metricsToUse[1], schema) : member.charts[1]?.type || 'pie';

  const chartData1 = schema ? 
    transformDataForDynamicChart(data, metricsToUse[0], chartType1) :
    transformDataForChart(data, member.charts[0].type, member.charts[0].metric);
    
  const chartData2 = schema ? 
    transformDataForDynamicChart(data, metricsToUse[1], chartType2) :
    transformDataForChart(data, member.charts[1].type, member.charts[1].metric);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <Link
        to="/team"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Team
      </Link>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">{member.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-primary-500 px-3 py-1 rounded-full text-sm font-medium">
                {member.role}
              </span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{member.skywalk.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard
          title={schema?.suggestedCharts.find(s => s.column === metricsToUse[0])?.title || 
                 member.charts[0]?.title || `${metricsToUse[0]?.replace(/_/g, ' ')} Analysis`}
          data={chartData1}
          type={chartType1 as any}
          csvSource={member.csv}
          lastUpdated="Auto-detected from latest data"
        />
        <ChartCard
          title={schema?.suggestedCharts.find(s => s.column === metricsToUse[1])?.title || 
                 member.charts[1]?.title || `${metricsToUse[1]?.replace(/_/g, ' ')} Analysis`}
          data={chartData2}
          type={chartType2 as any}
          csvSource={member.csv}
          lastUpdated="Auto-detected from latest data"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mapillary Street-View */}
        <MapillaryEmbed
          urls={[...member.mapillary]}
          title="Mapillary Street-View Documentation"
          memberName={member.name}
        />

        {/* Street Interviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Street Interviews</h2>
          </div>
          <div className="space-y-4">
            {member.streetInterviews.map((interview, index) => (
              <div key={index} className="border-l-4 border-primary-200 pl-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900">{interview.name}</h3>
                  <span className="text-xs text-gray-500">{interview.date}</span>
                </div>
                <p className="text-sm text-gray-600">{interview.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ward Map */}
      <div className="mb-8">
        <MapEmbed
          url={member.wardMap}
          title={`${member.skywalk.location} Ward Map`}
          height={480}
        />
      </div>

      {/* Skywalk Audit */}
      <div className="mb-8">
        <DynamicPhotoGallery
          memberKey={memberKey!}
          title={`Skywalk Audit - ${member.skywalk.location}`}
          maxDisplay={12}
          showAllImages={true}
        />
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {loading ? '...' : data.length}
            </div>
            <p className="text-sm text-gray-600">Survey Responses</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {member.mapillary.length}
            </div>
            <p className="text-sm text-gray-600">Mapillary Items</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {member.streetInterviews.length}
            </div>
            <p className="text-sm text-gray-600">Street Interviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
