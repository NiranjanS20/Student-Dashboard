// Maps Google Forms survey data to the expected schema
export interface GoogleFormsSurveyRow {
  'Timestamp': string;
  'Email address': string;
  'Name': string;
  'What Age group do you belong from? ': string;
  'What Neighborhood do you stay in (Eg. Bandra, West, Dadar East, Goregaon West, etc)': string;
  'What neighborhood do you work/study at? (Eg. Bandra, West, Dadar East, Andheri West, etc)': string;
  'What mode of transport do you use? (Select all that apply)': string;
  'How often do you walk for your daily activities?(Work, transit connections,etc)': string;
  'What is the typical distance you walk in a single trip?': string;
  'What would rate about the infrastructure of your neighborhood? ': string;
  'What would rate about the infrastructure near your workplace/studyplace neighborhood?': string;
  'What time of day do you most commonly walk? (Select all that apply.)': string;
  'What are the biggest barriers that prevent you from walking more? (Select all that apply.)': string;
  'What would be 3 aspects that need improvements to make your neighborhood more walkable?': string;
  'Would better road and footpath infrastructure encourage you to walk more and use private vehicles less?': string;
  'Leave any questions/remarks ': string;
}

export interface StandardSurveyResponse {
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

export const mapGoogleFormsToStandard = (
  googleFormsData: GoogleFormsSurveyRow[], 
  memberName: string
): StandardSurveyResponse[] => {
  console.log(`Mapping ${googleFormsData.length} responses for member: ${memberName}`);
  
  return googleFormsData.map((row, index) => {
    // Extract neighborhood for location and ward
    const neighborhood = row['What Neighborhood do you stay in (Eg. Bandra, West, Dadar East, Goregaon West, etc)'] || 'Unknown';
    
    // Map walking frequency
    const walkingFrequency = mapWalkingFrequency(row['How often do you walk for your daily activities?(Work, transit connections,etc)']);
    
    // Map infrastructure ratings (assuming 1-10 scale, convert to 1-5)
    const neighborhoodRating = parseInt(row['What would rate about the infrastructure of your neighborhood? ']) || 3;
    const workplaceRating = parseInt(row['What would rate about the infrastructure near your workplace/studyplace neighborhood?']) || 3;
    
    // Convert 1-10 to 1-5 scale
    const footpathCondition = Math.ceil(neighborhoodRating / 2);
    const roadCondition = Math.ceil(workplaceRating / 2);
    
    // Parse barriers/obstacles
    const barriers = row['What are the biggest barriers that prevent you from walking more? (Select all that apply.)'] || '';
    const obstacles = parseMultiSelectField(barriers);
    
    // Parse improvements
    const improvementsText = row['What would be 3 aspects that need improvements to make your neighborhood more walkable?'] || '';
    const improvements = parseMultiSelectField(improvementsText);
    
    // Use barriers as reasons for not walking
    const reasonsNotWalking = obstacles;
    
    return {
      respondent_id: `R-${memberName}-${String(index + 1).padStart(3, '0')}`,
      member: memberName,
      ward: extractWard(neighborhood),
      location: neighborhood,
      footpath_condition: Math.max(1, Math.min(5, footpathCondition)),
      road_condition: Math.max(1, Math.min(5, roadCondition)),
      walking_frequency: walkingFrequency,
      obstacles: obstacles,
      reasons_not_walking: reasonsNotWalking,
      improvements: improvements,
      timestamp: formatTimestamp(row['Timestamp'])
    };
  });
};

const mapWalkingFrequency = (frequency: string): string => {
  if (!frequency) return 'Unknown';
  
  const freq = frequency.toLowerCase();
  if (freq.includes('daily')) return 'Daily';
  if (freq.includes('weekly') || freq.includes('few times a week')) return 'Weekly';
  if (freq.includes('monthly') || freq.includes('few times a month')) return 'Monthly';
  if (freq.includes('rarely') || freq.includes('seldom')) return 'Rarely';
  if (freq.includes('never')) return 'Never';
  
  return frequency; // Return original if no match
};

const parseMultiSelectField = (text: string): string[] => {
  if (!text) return [];
  
  // Split by common delimiters and clean up
  const items = text.split(/[,;]/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => {
      // Convert to snake_case and clean up
      return item
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
    })
    .filter(item => item.length > 0);
  
  return [...new Set(items)]; // Remove duplicates
};

const extractWard = (neighborhood: string): string => {
  if (!neighborhood) return 'Unknown Ward';
  
  // Simple ward mapping based on neighborhood names
  const wardMap: Record<string, string> = {
    'dombivli': 'Ward 62',
    'dahisar': 'Ward 45', 
    'nallasopara': 'Ward 78',
    'kandivali': 'Ward 91',
    'goregaon': 'Ward 45',
    'andheri': 'Ward 58',
    'bandra': 'Ward 50',
    'dadar': 'Ward 227',
    'virar': 'Ward 78'
  };
  
  const lowerNeighborhood = neighborhood.toLowerCase();
  for (const [key, ward] of Object.entries(wardMap)) {
    if (lowerNeighborhood.includes(key)) {
      return ward;
    }
  }
  
  return `Ward ${neighborhood}`;
};

const formatTimestamp = (timestamp: string): string => {
  if (!timestamp) return new Date().toISOString();
  
  try {
    // Parse DD/MM/YYYY HH:MM:SS format
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1, // Month is 0-indexed
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
    
    return date.toISOString();
  } catch (error) {
    console.warn('Error parsing timestamp:', timestamp, error);
    return new Date().toISOString();
  }
};

// Helper function to get member name from CSV path
export const getMemberNameFromPath = (csvPath: string): string => {
  console.log('Getting member name from path:', csvPath);
  
  if (csvPath.includes('(Niranjan)')) return 'Niranjan';
  if (csvPath.includes('(Aarna)')) return 'Aarna';
  if (csvPath.includes('(Disha)')) return 'Disha';
  if (csvPath.includes('(Crisann)')) return 'Crisann';
  
  // Fallback to check without parentheses
  if (csvPath.toLowerCase().includes('niranjan')) return 'Niranjan';
  if (csvPath.toLowerCase().includes('aarna')) return 'Aarna';
  if (csvPath.toLowerCase().includes('disha')) return 'Disha';
  if (csvPath.toLowerCase().includes('crisann')) return 'Crisann';
  
  console.warn('Could not determine member name from path:', csvPath);
  return 'Unknown';
};
