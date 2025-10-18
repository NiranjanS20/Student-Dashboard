import Papa from 'papaparse';
import { mapGoogleFormsToStandard, getMemberNameFromPath, GoogleFormsSurveyRow } from './surveyDataMapper';

export interface SurveyResponse {
  respondent_id: string;
  member: string;
  ward: string;
  location: string;
  footpath_condition: number;
  road_condition: number;
  walking_frequency: string;
  obstacles: string[];
  reasons_not_walking: string[];
  improvements: string[];
  timestamp: string;
}

export const loadCSV = async (csvPath: string): Promise<SurveyResponse[]> => {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transform: (value: string, field: string) => {
          // Trim whitespace
          const trimmed = value.trim();
          
          // Convert numeric fields
          if (field === 'footpath_condition' || field === 'road_condition') {
            return parseInt(trimmed) || 0;
          }
          
          return trimmed;
        },
        complete: (results) => {
          try {
            const rawData = results.data as GoogleFormsSurveyRow[];
            
            // Check if this is Google Forms data (has the characteristic columns)
            const isGoogleForms = rawData.length > 0 && 
              'Timestamp' in rawData[0] && 
              'What Age group do you belong from? ' in rawData[0];
            
            let data: SurveyResponse[];
            
            if (isGoogleForms) {
              // Transform Google Forms data to standard format
              const memberName = getMemberNameFromPath(csvPath);
              console.log(`Processing ${csvPath} for member: ${memberName}, rows: ${rawData.length}`);
              data = mapGoogleFormsToStandard(rawData, memberName);
              console.log(`Transformed data for ${memberName}:`, data.length, 'responses');
            } else {
              // Handle standard format (legacy)
              data = rawData.map((row: any) => ({
                ...row,
                obstacles: row.obstacles ? row.obstacles.split(';').map((s: string) => s.trim()).filter(Boolean) : [],
                reasons_not_walking: row.reasons_not_walking ? row.reasons_not_walking.split(';').map((s: string) => s.trim()).filter(Boolean) : [],
                improvements: row.improvements ? row.improvements.split(';').map((s: string) => s.trim()).filter(Boolean) : []
              }));
            }
            
            resolve(data);
          } catch (error) {
            console.error('Error processing CSV data:', error);
            resolve([]);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error: any) {
    console.error(`Error loading CSV from ${csvPath}:`, error);
    return [];
  }
};

export const tallyFrequencies = (items: string[]): Record<string, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const tallyMultiSelectField = (data: SurveyResponse[], field: keyof Pick<SurveyResponse, 'obstacles' | 'reasons_not_walking' | 'improvements'>): Record<string, number> => {
  const allItems = data.flatMap(row => row[field] as string[]);
  return tallyFrequencies(allItems);
};

export const getTopN = (frequencies: Record<string, number>, n: number = 5): Array<{name: string, value: number}> => {
  return Object.entries(frequencies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, n)
    .map(([name, value]) => ({ name, value }));
};

export const getConditionDistribution = (data: SurveyResponse[], field: 'footpath_condition' | 'road_condition'): Array<{condition: string, count: number}> => {
  const frequencies = tallyFrequencies(data.map(row => row[field].toString()));
  return Object.entries(frequencies)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([condition, count]) => ({ condition, count }));
};

export const getAverageByWard = (data: SurveyResponse[], field: 'footpath_condition' | 'road_condition'): Array<{ward: string, average: number}> => {
  const wardData = data.reduce((acc, row) => {
    if (!acc[row.ward]) {
      acc[row.ward] = { sum: 0, count: 0 };
    }
    acc[row.ward].sum += row[field];
    acc[row.ward].count += 1;
    return acc;
  }, {} as Record<string, { sum: number, count: number }>);

  return Object.entries(wardData).map(([ward, { sum, count }]) => ({
    ward,
    average: Math.round((sum / count) * 10) / 10
  }));
};
