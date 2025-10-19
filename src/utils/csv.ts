// Papa Parse is imported in robustCSVLoader
import { mapGoogleFormsToStandard, getMemberNameFromPath, GoogleFormsSurveyRow } from './surveyDataMapper';
import { loadCSVRobustly, validateCSVStructure, detectCSVSchema } from './robustCSVLoader';

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
    console.log(`Loading CSV with robust loader: ${csvPath}`);
    
    // Generate fallback paths
    const fallbackPaths = generateFallbackPaths(csvPath);
    
    // Load CSV with robust loader
    const loadResult = await loadCSVRobustly(csvPath, {
      skipEmptyLines: true,
      dynamicTyping: false,
      maxRetries: 3,
      timeout: 15000,
      fallbackPaths
    });
    
    if (loadResult.errors.length > 0) {
      console.error(`CSV loading errors for ${csvPath}:`, loadResult.errors);
    }
    
    if (loadResult.warnings.length > 0) {
      console.warn(`CSV loading warnings for ${csvPath}:`, loadResult.warnings);
    }
    
    if (loadResult.data.length === 0) {
      console.error(`No data loaded from ${csvPath}`);
      return [];
    }
    
    const rawData = loadResult.data;
    
    // Validate CSV structure
    const memberName = getMemberNameFromPath(csvPath);
    const validation = validateCSVStructure(rawData, [], memberName);
    
    if (!validation.isValid) {
      console.error(`CSV validation failed for ${csvPath}:`, validation.errors);
      return [];
    }
    
    if (validation.warnings.length > 0) {
      console.warn(`CSV validation warnings for ${csvPath}:`, validation.warnings);
    }
    
    // Detect schema
    const schema = detectCSVSchema(rawData);
    console.log(`Detected schema for ${csvPath}:`, {
      fields: schema.fields.length,
      suggestions: schema.suggestions
    });
    
    // Check if this is Google Forms data
    const isGoogleForms = rawData.length > 0 && 
      ('Timestamp' in rawData[0] || 'timestamp' in rawData[0]) && 
      Object.keys(rawData[0]).some(key => key.includes('Age group') || key.includes('Neighborhood'));
    
    let data: SurveyResponse[];
    
    if (isGoogleForms) {
      // Transform Google Forms data to standard format
      console.log(`Processing Google Forms data for ${memberName}: ${rawData.length} rows`);
      data = mapGoogleFormsToStandard(rawData as GoogleFormsSurveyRow[], memberName);
      console.log(`Transformed ${data.length} responses for ${memberName}`);
    } else {
      // Handle standard format (legacy)
      console.log(`Processing standard CSV format for ${memberName}: ${rawData.length} rows`);
      data = rawData.map((row: any) => ({
        ...row,
        obstacles: Array.isArray(row.obstacles) ? row.obstacles : 
          (row.obstacles ? row.obstacles.split(';').map((s: string) => s.trim()).filter(Boolean) : []),
        reasons_not_walking: Array.isArray(row.reasons_not_walking) ? row.reasons_not_walking :
          (row.reasons_not_walking ? row.reasons_not_walking.split(';').map((s: string) => s.trim()).filter(Boolean) : []),
        improvements: Array.isArray(row.improvements) ? row.improvements :
          (row.improvements ? row.improvements.split(';').map((s: string) => s.trim()).filter(Boolean) : [])
      }));
    }
    
    // Final validation
    if (data.length === 0) {
      console.error(`No valid data after processing ${csvPath}`);
      return [];
    }
    
    console.log(`Successfully loaded and processed ${data.length} survey responses from ${csvPath}`);
    return data;
    
  } catch (error: any) {
    console.error(`Error loading CSV from ${csvPath}:`, error);
    return [];
  }
};

/**
 * Generate fallback paths for CSV files
 */
const generateFallbackPaths = (csvPath: string): string[] => {
  const fallbacks: string[] = [];
  
  // Try different encodings of special characters
  if (csvPath.includes('(') || csvPath.includes(')')) {
    // URL encoded versions
    fallbacks.push(csvPath.replace(/\(/g, '%28').replace(/\)/g, '%29'));
    fallbacks.push(csvPath.replace(/\(/g, '').replace(/\)/g, ''));
  }
  
  // Try different file extensions
  const basePath = csvPath.replace(/\.[^/.]+$/, '');
  fallbacks.push(`${basePath}.CSV`);
  fallbacks.push(`${basePath}.txt`);
  
  // Try with underscores instead of spaces
  if (csvPath.includes(' ')) {
    fallbacks.push(csvPath.replace(/ /g, '_'));
    fallbacks.push(csvPath.replace(/ /g, '-'));
  }
  
  return [...new Set(fallbacks)]; // Remove duplicates
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
