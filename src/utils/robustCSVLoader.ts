// Robust CSV loading and parsing utility
import Papa from 'papaparse';

export interface CSVLoadResult<T = any> {
  data: T[];
  errors: string[];
  warnings: string[];
  meta: {
    fields: string[];
    rowCount: number;
    fileSize?: number;
    lastModified?: Date;
  };
}

export interface CSVLoadOptions {
  skipEmptyLines?: boolean;
  trimHeaders?: boolean;
  dynamicTyping?: boolean;
  maxRetries?: number;
  timeout?: number;
  fallbackPaths?: string[];
}

/**
 * Robust CSV loader with error handling, retries, and fallback paths
 */
export const loadCSVRobustly = async <T = any>(
  csvPath: string, 
  options: CSVLoadOptions = {}
): Promise<CSVLoadResult<T>> => {
  const {
    skipEmptyLines = true,
    dynamicTyping = false,
    maxRetries = 3,
    timeout = 10000,
    fallbackPaths = []
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];
  const pathsToTry = [csvPath, ...fallbackPaths];

  for (let pathIndex = 0; pathIndex < pathsToTry.length; pathIndex++) {
    const currentPath = pathsToTry[pathIndex];
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempting to load CSV: ${currentPath} (attempt ${attempt}/${maxRetries})`);
        
        // Create timeout promise
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout);
        });
        
        // Create fetch promise
        const fetchPromise = fetch(currentPath);
        
        // Race between fetch and timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        if (!csvText.trim()) {
          throw new Error('CSV file is empty');
        }
        
        // Parse CSV with Papa Parse
        const parseResult = await new Promise<Papa.ParseResult<T>>((resolve, reject) => {
          Papa.parse<T>(csvText, {
            header: true,
            skipEmptyLines,
            dynamicTyping,
            transform: (value: string, field: string) => {
              if (!value) return value;
              const trimmed = value.trim();
              
              // Handle common data transformations
              if (field && field.toLowerCase().includes('condition') && /^\d+$/.test(trimmed)) {
                return parseInt(trimmed);
              }
              
              return trimmed;
            },
            complete: (results) => resolve(results),
            error: (error: any) => reject(error)
          });
        });
        
        if (parseResult.errors && parseResult.errors.length > 0) {
          const criticalErrors = parseResult.errors.filter(err => err.type === 'Delimiter' || err.type === 'Quotes');
          const minorErrors = parseResult.errors.filter(err => err.type !== 'Delimiter' && err.type !== 'Quotes');
          
          if (criticalErrors.length > 0) {
            throw new Error(`CSV parsing failed: ${criticalErrors.map(e => e.message).join(', ')}`);
          }
          
          // Add minor errors as warnings
          minorErrors.forEach(err => {
            warnings.push(`Row ${err.row}: ${err.message}`);
          });
        }
        
        const data = parseResult.data || [];
        const fields = parseResult.meta?.fields || [];
        
        if (data.length === 0) {
          throw new Error('No data rows found in CSV');
        }
        
        if (fields.length === 0) {
          throw new Error('No header fields found in CSV');
        }
        
        // Success! Log and return
        console.log(`Successfully loaded CSV: ${currentPath} (${data.length} rows, ${fields.length} columns)`);
        
        // Add info about fallback usage
        if (pathIndex > 0) {
          warnings.push(`Used fallback path: ${currentPath} (original: ${csvPath})`);
        }
        
        return {
          data,
          errors,
          warnings,
          meta: {
            fields,
            rowCount: data.length,
            fileSize: csvText.length,
            lastModified: response.headers.get('last-modified') 
              ? new Date(response.headers.get('last-modified')!) 
              : undefined
          }
        };
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const attemptInfo = `${currentPath} (attempt ${attempt}/${maxRetries})`;
        
        console.warn(`Failed to load CSV: ${attemptInfo} - ${errorMessage}`);
        
        if (attempt === maxRetries) {
          errors.push(`${attemptInfo}: ${errorMessage}`);
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
  }
  
  // All attempts failed
  return {
    data: [],
    errors,
    warnings,
    meta: {
      fields: [],
      rowCount: 0
    }
  };
};

/**
 * Validate CSV data structure and provide helpful error messages
 */
export const validateCSVStructure = (
  data: any[], 
  expectedFields: string[] = [],
  memberName?: string
): { isValid: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (data.length === 0) {
    errors.push('No data found in CSV file');
    return { isValid: false, errors, warnings };
  }
  
  const firstRow = data[0];
  const actualFields = Object.keys(firstRow);
  
  if (actualFields.length === 0) {
    errors.push('No columns found in CSV data');
    return { isValid: false, errors, warnings };
  }
  
  // Check for expected fields (if provided)
  if (expectedFields.length > 0) {
    const missingFields = expectedFields.filter(field => !actualFields.includes(field));
    const extraFields = actualFields.filter(field => !expectedFields.includes(field));
    
    if (missingFields.length > 0) {
      warnings.push(`Missing expected fields: ${missingFields.join(', ')}`);
    }
    
    if (extraFields.length > 0) {
      warnings.push(`Extra fields found: ${extraFields.join(', ')}`);
    }
  }
  
  // Check for empty values
  let emptyValueCount = 0;
  data.forEach((row) => {
    Object.entries(row).forEach(([, value]) => {
      if (value === null || value === undefined || value === '') {
        emptyValueCount++;
      }
    });
  });
  
  if (emptyValueCount > 0) {
    const emptyPercentage = ((emptyValueCount / (data.length * actualFields.length)) * 100).toFixed(1);
    warnings.push(`${emptyValueCount} empty values found (${emptyPercentage}% of total data)`);
  }
  
  // Member-specific validation
  if (memberName) {
    const memberField = actualFields.find(field => 
      field.toLowerCase().includes('member') || 
      field.toLowerCase().includes('name') ||
      field.toLowerCase().includes('researcher')
    );
    
    if (memberField) {
      const memberValues = data.map(row => row[memberField]).filter(Boolean);
      const uniqueMembers = [...new Set(memberValues)];
      
      if (uniqueMembers.length > 1) {
        warnings.push(`Multiple members found in ${memberName}'s CSV: ${uniqueMembers.join(', ')}`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Auto-detect CSV schema and suggest field mappings
 */
export const detectCSVSchema = (data: any[]): {
  fields: Array<{
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'multiselect';
    sampleValues: any[];
    nullCount: number;
  }>;
  suggestions: {
    idField?: string;
    memberField?: string;
    locationField?: string;
    timestampField?: string;
    ratingFields: string[];
    multiSelectFields: string[];
  };
} => {
  if (data.length === 0) {
    return { fields: [], suggestions: { ratingFields: [], multiSelectFields: [] } };
  }
  
  const firstRow = data[0];
  const fieldNames = Object.keys(firstRow);
  
  const fields = fieldNames.map(fieldName => {
    const values = data.map(row => row[fieldName]).filter(v => v !== null && v !== undefined && v !== '');
    const sampleValues = values.slice(0, 5);
    const nullCount = data.length - values.length;
    
    // Detect field type
    let type: 'string' | 'number' | 'boolean' | 'date' | 'multiselect' = 'string';
    
    if (values.length > 0) {
      // Check for numbers
      if (values.every(v => !isNaN(Number(v)))) {
        type = 'number';
      }
      // Check for booleans
      else if (values.every(v => ['true', 'false', 'yes', 'no', '1', '0'].includes(String(v).toLowerCase()))) {
        type = 'boolean';
      }
      // Check for dates
      else if (values.some(v => !isNaN(Date.parse(String(v))))) {
        type = 'date';
      }
      // Check for multi-select (contains commas or semicolons)
      else if (values.some(v => String(v).includes(',') || String(v).includes(';'))) {
        type = 'multiselect';
      }
    }
    
    return {
      name: fieldName,
      type,
      sampleValues,
      nullCount
    };
  });
  
  // Generate suggestions
  const suggestions = {
    idField: fields.find(f => f.name.toLowerCase().includes('id'))?.name,
    memberField: fields.find(f => 
      f.name.toLowerCase().includes('member') || 
      f.name.toLowerCase().includes('name') ||
      f.name.toLowerCase().includes('researcher')
    )?.name,
    locationField: fields.find(f => 
      f.name.toLowerCase().includes('location') || 
      f.name.toLowerCase().includes('ward') ||
      f.name.toLowerCase().includes('neighborhood')
    )?.name,
    timestampField: fields.find(f => 
      f.name.toLowerCase().includes('timestamp') || 
      f.name.toLowerCase().includes('date') ||
      f.name.toLowerCase().includes('time')
    )?.name,
    ratingFields: fields.filter(f => 
      f.type === 'number' && 
      (f.name.toLowerCase().includes('rating') || 
       f.name.toLowerCase().includes('condition') ||
       f.name.toLowerCase().includes('score'))
    ).map(f => f.name),
    multiSelectFields: fields.filter(f => f.type === 'multiselect').map(f => f.name)
  };
  
  return { fields, suggestions };
};
