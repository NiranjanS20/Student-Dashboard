import { SurveyResponse, tallyMultiSelectField, getTopN, getConditionDistribution, getAverageByWard, tallyFrequencies } from './csv';

export interface ChartData {
  [key: string]: any;
}

export const transformDataForChart = (data: SurveyResponse[], chartType: string, metric: string): ChartData[] => {
  switch (chartType) {
    case 'bar':
      if (metric === 'footpath_condition' || metric === 'road_condition') {
        return getConditionDistribution(data, metric).map(item => ({
          name: `Rating ${item.condition}`,
          value: item.count
        }));
      }
      if (metric === 'improvements') {
        const frequencies = tallyMultiSelectField(data, 'improvements');
        return getTopN(frequencies, 5).map(item => ({
          name: item.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: item.value
        }));
      }
      break;

    case 'pie':
      if (metric === 'walking_frequency') {
        const frequencies = tallyFrequencies(data.map(row => row.walking_frequency));
        return Object.entries(frequencies).map(([name, value]) => ({ name, value }));
      }
      if (metric === 'obstacles' || metric === 'reasons_not_walking') {
        const frequencies = tallyMultiSelectField(data, metric as any);
        return getTopN(frequencies, 5).map(item => ({
          name: item.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: item.value
        }));
      }
      break;

    case 'barByWardAvg':
      if (metric === 'footpath_condition') {
        return getAverageByWard(data, 'footpath_condition').map(item => ({
          name: item.ward,
          value: item.average
        }));
      }
      break;

    default:
      return [];
  }
  return [];
};

export const getChartColors = (index: number): string => {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316', // orange-500
  ];
  return colors[index % colors.length];
};
