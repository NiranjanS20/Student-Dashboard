import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getChartColors } from '../utils/charts';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: 'bar' | 'pie' | 'barByWardAvg';
  csvSource?: string;
  lastUpdated?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  data, 
  type, 
  csvSource, 
  lastUpdated 
}) => {
  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="h-64 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-medium text-gray-900 mb-1">No Data Available</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              This chart will display data once survey responses are loaded. 
              Check your network connection or try refreshing the page.
            </p>
          </div>
        </div>
      );
    }

    try {
      switch (type) {
      case 'bar':
      case 'barByWardAvg':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getChartColors(index)} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="font-medium text-gray-900 mb-1">Unsupported Chart Type</h3>
              <p className="text-sm text-gray-600">Chart type "{type}" is not supported</p>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Chart rendering error:', error);
      return (
        <div className="h-64 flex items-center justify-center text-gray-500 bg-red-50 rounded-lg border-2 border-dashed border-red-200">
          <div className="text-center">
            <div className="text-4xl mb-2">❌</div>
            <h3 className="font-medium text-gray-900 mb-1">Chart Error</h3>
            <p className="text-sm text-gray-600">Failed to render chart. Please check the data format.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        <div className="flex items-center justify-between mt-2">
          {csvSource && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Source: {csvSource}
            </span>
          )}
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Updated: {lastUpdated}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;
