// Dynamic data parser that automatically adapts to CSV schema changes
import Papa from 'papaparse';

export interface DataColumn {
  name: string;
  type: 'numeric' | 'categorical' | 'multi_select' | 'text' | 'datetime';
  values: any[];
  uniqueValues?: any[];
}

export interface SchemaAnalysis {
  columns: DataColumn[];
  totalRows: number;
  numericColumns: string[];
  categoricalColumns: string[];
  multiSelectColumns: string[];
  suggestedCharts: ChartSuggestion[];
}

export interface ChartSuggestion {
  column: string;
  chartType: 'bar' | 'pie' | 'barByWardAvg';
  title: string;
  priority: number; // Higher = more important
}

export const analyzeCSVSchema = async (csvPath: string): Promise<SchemaAnalysis> => {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }

    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    if (parsed.errors.length > 0) {
      console.warn('CSV parsing warnings:', parsed.errors);
    }

    const data = parsed.data as any[];
    const headers = parsed.meta.fields || [];
    
    const columns: DataColumn[] = headers.map(header => {
      const values = data.map(row => row[header]).filter(val => val !== null && val !== undefined && val !== '');
      const uniqueValues = [...new Set(values)];
      
      // Detect column type
      let type: DataColumn['type'] = 'text';
      
      // Check if numeric (ratings, scores)
      if (values.every(val => !isNaN(Number(val)) && val !== '')) {
        type = 'numeric';
      }
      // Check if multi-select (contains semicolons)
      else if (values.some(val => String(val).includes(';'))) {
        type = 'multi_select';
      }
      // Check if datetime
      else if (header.toLowerCase().includes('timestamp') || header.toLowerCase().includes('date')) {
        type = 'datetime';
      }
      // Check if categorical (limited unique values)
      else if (uniqueValues.length <= Math.min(10, values.length * 0.5)) {
        type = 'categorical';
      }

      return {
        name: header,
        type,
        values,
        uniqueValues
      };
    });

    // Generate chart suggestions based on data analysis
    const suggestedCharts = generateChartSuggestions(columns);

    return {
      columns,
      totalRows: data.length,
      numericColumns: columns.filter(col => col.type === 'numeric').map(col => col.name),
      categoricalColumns: columns.filter(col => col.type === 'categorical').map(col => col.name),
      multiSelectColumns: columns.filter(col => col.type === 'multi_select').map(col => col.name),
      suggestedCharts
    };

  } catch (error) {
    console.error('Error analyzing CSV schema:', error);
    throw error;
  }
};

const generateChartSuggestions = (columns: DataColumn[]): ChartSuggestion[] => {
  const suggestions: ChartSuggestion[] = [];

  columns.forEach(column => {
    switch (column.type) {
      case 'numeric':
        // Numeric columns are great for bar charts
        if (column.name.toLowerCase().includes('condition') || 
            column.name.toLowerCase().includes('rating') ||
            column.name.toLowerCase().includes('score')) {
          suggestions.push({
            column: column.name,
            chartType: 'bar',
            title: `${column.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Distribution`,
            priority: 9
          });
        }
        break;

      case 'categorical':
        // Categorical columns work well with pie charts
        if (column.uniqueValues && column.uniqueValues.length <= 8) {
          suggestions.push({
            column: column.name,
            chartType: 'pie',
            title: `${column.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Breakdown`,
            priority: 8
          });
        }
        break;

      case 'multi_select':
        // Multi-select columns (like obstacles, improvements) are perfect for pie charts
        suggestions.push({
          column: column.name,
          chartType: 'pie',
          title: `Top ${column.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
          priority: 10
        });
        break;
    }
  });

  // Sort by priority and return top suggestions
  return suggestions.sort((a, b) => b.priority - a.priority);
};

export const transformDataForDynamicChart = (
  data: any[], 
  column: string, 
  chartType: 'bar' | 'pie' | 'barByWardAvg'
): any[] => {
  if (!data || data.length === 0) return [];

  try {
    switch (chartType) {
      case 'bar':
        if (data[0][column] && !isNaN(Number(data[0][column]))) {
          // Numeric data - create distribution
          const counts: { [key: string]: number } = {};
          data.forEach(row => {
            const value = Number(row[column]);
            if (!isNaN(value)) {
              const key = `${value}`;
              counts[key] = (counts[key] || 0) + 1;
            }
          });
          
          return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => Number(a.name) - Number(b.name));
        } else {
          // Categorical data
          const counts: { [key: string]: number } = {};
          data.forEach(row => {
            const value = row[column];
            if (value) {
              counts[value] = (counts[value] || 0) + 1;
            }
          });
          
          return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
        }

      case 'pie':
        if (data[0][column] && String(data[0][column]).includes(';')) {
          // Multi-select data
          const counts: { [key: string]: number } = {};
          data.forEach(row => {
            const values = String(row[column]).split(';');
            values.forEach(val => {
              const cleanVal = val.trim();
              if (cleanVal) {
                counts[cleanVal] = (counts[cleanVal] || 0) + 1;
              }
            });
          });
          
          return Object.entries(counts)
            .map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Top 8 for readability
        } else {
          // Regular categorical data
          const counts: { [key: string]: number } = {};
          data.forEach(row => {
            const value = row[column];
            if (value) {
              counts[value] = (counts[value] || 0) + 1;
            }
          });
          
          return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);
        }

      case 'barByWardAvg':
        if (data[0].ward && data[0][column] && !isNaN(Number(data[0][column]))) {
          const wardData: { [ward: string]: number[] } = {};
          
          data.forEach(row => {
            const ward = row.ward;
            const value = Number(row[column]);
            if (ward && !isNaN(value)) {
              if (!wardData[ward]) wardData[ward] = [];
              wardData[ward].push(value);
            }
          });
          
          return Object.entries(wardData)
            .map(([name, values]) => ({
              name,
              value: Number((values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2))
            }))
            .sort((a, b) => b.value - a.value);
        }
        return [];

      default:
        return [];
    }
  } catch (error) {
    console.error('Error transforming data for chart:', error);
    return [];
  }
};

export const detectBestMetrics = (schema: SchemaAnalysis): string[] => {
  // Return the top 2 most insightful metrics based on data analysis
  const topSuggestions = schema.suggestedCharts.slice(0, 2);
  return topSuggestions.map(suggestion => suggestion.column);
};

export const getOptimalChartType = (column: string, schema: SchemaAnalysis): 'bar' | 'pie' | 'barByWardAvg' => {
  const suggestion = schema.suggestedCharts.find(s => s.column === column);
  return suggestion?.chartType || 'bar';
};
