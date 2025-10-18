# Walkability Watch

A fully functional, interactive React website showcasing tasks and outputs for an NGO walkability project across Mumbai. Built with modern web technologies and designed for accessibility and responsiveness.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "CEP Dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Project Overview

**Walkability Watch** is a comprehensive research initiative mapping safer, walkable streets across Mumbai through community-driven data collection and analysis.

### Key Features

- **Interactive Dashboard** - Overview with team cards, KPIs, and quick links
- **Team Profiles** - Individual member pages with charts, maps, and documentation
- **Survey Insights** - Combined data analysis with filtering capabilities
- **Ward Maps** - Embedded Google My Maps for geographical context
- **Skywalk Audits** - Infrastructure assessments with photo documentation
- **Street Interviews** - Community feedback and insights
- **Mapillary Integration** - Street-level imagery documentation
- **Responsive Design** - Mobile-first, accessible interface

## 🏗️ Tech Stack

- **Framework**: Vite + React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom theme
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Data**: Papa Parse for CSV processing
- **State**: Local component state + React Context

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── ChartCard.tsx   # Chart container component
│   ├── MapEmbed.tsx    # Google Maps iframe wrapper
│   ├── ExternalLinkCard.tsx # Mapillary link cards
│   ├── PhotoGrid.tsx   # Image gallery with lightbox
│   └── KPI.tsx         # Key performance indicator cards
├── pages/              # Route components
│   ├── Dashboard.tsx   # Home page with overview
│   ├── Team.tsx        # Team index page
│   ├── Member.tsx      # Individual member profiles
│   ├── SurveyInsights.tsx # Combined data analysis
│   ├── WardMaps.tsx    # Map collection page
│   ├── SkywalkAudit.tsx # Infrastructure audits
│   ├── StreetInterviews.tsx # Community interviews
│   ├── Resources.tsx   # External links and tools
│   └── About.tsx       # Project information
├── data/               # Configuration and data
│   └── members.ts      # Team member configuration
├── utils/              # Utility functions
│   ├── csv.ts          # CSV parsing and processing
│   └── charts.ts       # Chart data transformations
└── App.tsx             # Main app with routing

public/
├── data/               # CSV data files
│   ├── survey_niranjan.csv
│   ├── survey_aarna.csv
│   ├── survey_disha.csv
│   └── survey_crisann.csv
└── skywalk/            # Placeholder images
    └── placeholder.svg
```

## 📊 Data Structure

### CSV Schema
Each team member has a CSV file with the following columns:

```csv
respondent_id,member,ward,location,footpath_condition,road_condition,walking_frequency,obstacles,reasons_not_walking,improvements,timestamp
```

- **respondent_id**: Unique identifier (string)
- **member**: Team member name (Niranjan|Aarna|Disha|Crisann)
- **ward**: Ward identifier (string)
- **location**: Specific location (string)
- **footpath_condition**: Rating 1-5 (number)
- **road_condition**: Rating 1-5 (number)
- **walking_frequency**: Daily|Weekly|Rarely|Never (string)
- **obstacles**: Semicolon-separated list (string)
- **reasons_not_walking**: Semicolon-separated list (string)
- **improvements**: Semicolon-separated list (string)
- **timestamp**: ISO datetime (string)

### Team Member Configuration

Each member is configured in `src/data/members.ts` with:
- Personal information (name, role)
- CSV data path
- Mapillary documentation links
- Ward map URLs
- Chart specifications
- Skywalk audit details
- Street interview records

## 🎯 Features by Page

### Dashboard (/)
- Hero section with project overview
- KPI cards showing key metrics
- Team member cards with quick stats
- Call-to-action for walkability game
- Quick access links to main sections

### Team (/team)
- Team overview with member cards
- Individual statistics and recent interviews
- Direct links to member profiles and ward maps

### Member Pages (/team/:member)
- Individual member profiles with role and location
- Two custom charts per member based on their CSV data
- Mapillary street imagery documentation
- Embedded ward maps with fallback options
- Skywalk audit photos and details
- Street interview summaries

### Survey Insights (/survey-insights)
- Combined data from all team members
- Interactive filters by ward, walking frequency, and member
- Comparative charts showing infrastructure conditions
- Top obstacles analysis
- Real-time filtering with result counts

### Ward Maps (/ward-maps)
- Embedded Google My Maps for each location
- Team member context and research focus
- Fallback options for blocked iframes

### Skywalk Audit (/skywalk-audit)
- Infrastructure assessment overview
- Photo documentation with lightbox gallery
- Audit methodology and criteria
- Location-specific findings

### Street Interviews (/street-interviews)
- Community feedback compilation
- Thematic analysis of common issues
- Interview methodology explanation
- Categorized insights (safety, infrastructure, improvements)

### Resources (/resources)
- Featured walkability game with prominent CTA
- Mapillary documentation links
- Ward map collection
- Internal project resources
- Technology stack information

### About (/about)
- Project mission and vision
- Research methodology overview
- Team introductions
- Impact and applications
- Acknowledgments and partnerships

## 🎨 Design System

### Colors
- **Primary**: Blue palette (#3b82f6 and variants)
- **Secondary**: Emerald, amber, red, violet, cyan for charts
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Regular weight, optimized line height
- **UI Text**: Medium weight for emphasis

### Components
- **Cards**: White background, subtle shadows, rounded corners
- **Buttons**: Primary (filled) and secondary (outlined) variants
- **Navigation**: Sticky header with active state indicators
- **Charts**: Responsive containers with tooltips and legends

## 🔧 Customization

### Adding New Data

1. **CSV Files**: Place new CSV files in `/public/data/`
2. **Member Configuration**: Update `src/data/members.ts`
3. **Chart Types**: Modify chart specifications in member config
4. **Photos**: Add images to `/public/skywalk/[member]/`

### Modifying Charts

Chart configurations are defined per member in `src/data/members.ts`:

```typescript
charts: [
  { type: "bar", metric: "footpath_condition", title: "Custom Title" },
  { type: "pie", metric: "obstacles", title: "Another Chart" }
]
```

Supported chart types:
- `bar`: Bar chart for distributions
- `pie`: Pie chart for categorical data
- `barByWardAvg`: Grouped bar chart for ward averages

### Adding New Pages

1. Create component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/Layout.tsx`

## 🌐 Deployment

The project is configured for static deployment:

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🎮 External Integration

### Walkability Game
- URL: https://crossing-project-game.vercel.app/
- Prominent CTAs on Dashboard and Resources pages
- Educational tool for understanding walkability challenges

### Mapillary Integration
- Street-level imagery documentation
- External link cards with preview functionality
- Organized by team member and location

### Google My Maps
- Ward-specific geographical context
- Embedded iframes with fallback options
- Direct links for full-screen viewing

## 🔍 Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG AA compliant color combinations
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Focus Management**: Clear focus indicators and logical tab order

## 🐛 Troubleshooting

### Common Issues

1. **CSV Loading Errors**
   - Ensure CSV files are in `/public/data/`
   - Check file names match member configuration
   - Verify CSV format matches expected schema

2. **Map Embedding Issues**
   - Some browsers block iframe embedding
   - Fallback buttons provide direct links
   - Check network connectivity for external maps

3. **Chart Display Problems**
   - Verify data format in CSV files
   - Check chart type configuration
   - Ensure Recharts dependencies are installed

### Development Tips

- Use browser dev tools to inspect CSV loading
- Check console for any JavaScript errors
- Verify responsive design across different screen sizes
- Test accessibility with screen reader tools

## 📝 License

This project is created for educational and research purposes. Please respect the privacy of survey respondents and use the data responsibly.

## 🤝 Contributing

This is a research project. For questions or collaboration opportunities, please refer to the About page or contact the team members listed in the application.

---

**Built with ❤️ for safer, more walkable streets in Mumbai**
