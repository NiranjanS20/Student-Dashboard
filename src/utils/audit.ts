// Automated audit utility for project validation
export interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  file?: string;
  suggestion?: string;
}

export interface AuditReport {
  issues: AuditIssue[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
  };
}

export const validateCSVSchema = async (csvPath: string): Promise<AuditIssue[]> => {
  const issues: AuditIssue[] = [];
  const expectedColumns = [
    'respondent_id', 'member', 'ward', 'location', 
    'footpath_condition', 'road_condition', 'walking_frequency',
    'obstacles', 'reasons_not_walking', 'improvements', 'timestamp'
  ];

  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      issues.push({
        type: 'error',
        category: 'CSV Validation',
        message: `CSV file not found: ${csvPath}`,
        file: csvPath,
        suggestion: 'Ensure the CSV file exists in the public/data directory'
      });
      return issues;
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      issues.push({
        type: 'error',
        category: 'CSV Validation',
        message: `CSV file is empty or has no data rows: ${csvPath}`,
        file: csvPath
      });
      return issues;
    }

    // Check header
    const header = lines[0].split(',').map(col => col.trim());
    const missingColumns = expectedColumns.filter(col => !header.includes(col));
    const extraColumns = header.filter(col => !expectedColumns.includes(col));

    if (missingColumns.length > 0) {
      issues.push({
        type: 'error',
        category: 'CSV Schema',
        message: `Missing required columns in ${csvPath}: ${missingColumns.join(', ')}`,
        file: csvPath,
        suggestion: 'Add the missing columns to match the expected schema'
      });
    }

    if (extraColumns.length > 0) {
      issues.push({
        type: 'warning',
        category: 'CSV Schema',
        message: `Extra columns found in ${csvPath}: ${extraColumns.join(', ')}`,
        file: csvPath,
        suggestion: 'Remove extra columns or update the schema validation'
      });
    }

    // Validate data rows
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length !== header.length) {
        issues.push({
          type: 'error',
          category: 'CSV Data',
          message: `Row ${i + 1} in ${csvPath} has ${row.length} columns, expected ${header.length}`,
          file: csvPath,
          suggestion: 'Check for missing commas or extra data in the row'
        });
      }

      // Validate specific columns
      const footpathCondition = parseInt(row[header.indexOf('footpath_condition')]);
      const roadCondition = parseInt(row[header.indexOf('road_condition')]);

      if (isNaN(footpathCondition) || footpathCondition < 1 || footpathCondition > 5) {
        issues.push({
          type: 'error',
          category: 'CSV Data',
          message: `Invalid footpath_condition in row ${i + 1} of ${csvPath}: must be 1-5`,
          file: csvPath
        });
      }

      if (isNaN(roadCondition) || roadCondition < 1 || roadCondition > 5) {
        issues.push({
          type: 'error',
          category: 'CSV Data',
          message: `Invalid road_condition in row ${i + 1} of ${csvPath}: must be 1-5`,
          file: csvPath
        });
      }
    }

  } catch (error) {
    issues.push({
      type: 'error',
      category: 'CSV Validation',
      message: `Failed to validate CSV ${csvPath}: ${error}`,
      file: csvPath,
      suggestion: 'Check if the file exists and is properly formatted'
    });
  }

  return issues;
};

export const validateAssetPaths = async (memberConfig: any): Promise<AuditIssue[]> => {
  const issues: AuditIssue[] = [];

  // Check CSV file
  try {
    const csvResponse = await fetch(memberConfig.csv);
    if (!csvResponse.ok) {
      issues.push({
        type: 'error',
        category: 'Asset Validation',
        message: `CSV file not accessible: ${memberConfig.csv}`,
        suggestion: 'Ensure the CSV file exists in public/data/'
      });
    }
  } catch (error) {
    issues.push({
      type: 'error',
      category: 'Asset Validation',
      message: `Failed to fetch CSV: ${memberConfig.csv}`,
      suggestion: 'Check network connectivity and file path'
    });
  }

  // Check skywalk photos (we'll use placeholder for now)
  for (const photo of memberConfig.skywalk.photos) {
    if (photo.endsWith('.jpg')) {
      issues.push({
        type: 'warning',
        category: 'Asset Validation',
        message: `Skywalk photo not found: ${photo}`,
        suggestion: 'Replace with actual image files or use placeholder.svg'
      });
    }
  }

  return issues;
};

export const runFullAudit = async (membersConfig: any): Promise<AuditReport> => {
  const allIssues: AuditIssue[] = [];

  // Validate each member's configuration
  for (const [key, member] of Object.entries(membersConfig)) {
    // Validate CSV schema
    const csvIssues = await validateCSVSchema((member as any).csv);
    allIssues.push(...csvIssues);

    // Validate asset paths
    const assetIssues = await validateAssetPaths(member);
    allIssues.push(...assetIssues);

    // Validate chart configuration
    const charts = (member as any).charts;
    for (const chart of charts) {
      if (!['bar', 'pie', 'barByWardAvg'].includes(chart.type)) {
        allIssues.push({
          type: 'error',
          category: 'Chart Configuration',
          message: `Invalid chart type "${chart.type}" for member ${key}`,
          suggestion: 'Use one of: bar, pie, barByWardAvg'
        });
      }

      const validMetrics = [
        'footpath_condition', 'road_condition', 'walking_frequency',
        'obstacles', 'reasons_not_walking', 'improvements'
      ];

      if (!validMetrics.includes(chart.metric)) {
        allIssues.push({
          type: 'error',
          category: 'Chart Configuration',
          message: `Invalid chart metric "${chart.metric}" for member ${key}`,
          suggestion: `Use one of: ${validMetrics.join(', ')}`
        });
      }
    }
  }

  const summary = {
    errors: allIssues.filter(issue => issue.type === 'error').length,
    warnings: allIssues.filter(issue => issue.type === 'warning').length,
    infos: allIssues.filter(issue => issue.type === 'info').length
  };

  return { issues: allIssues, summary };
};
