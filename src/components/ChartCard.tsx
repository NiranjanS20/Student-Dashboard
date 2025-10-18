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
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      );
    }

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
                {data.map((entry, index) => (
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
        return <div>Unsupported chart type</div>;
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
