# Walkability Watch

A fully functional, interactive React website showcasing tasks and outputs for an NGO walkability project across Mumbai. Built with modern web technologies and designed for accessibility, responsiveness, and production deployment.

[![Build Status](https://github.com/your-username/walkability-watch/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/your-username/walkability-watch/actions)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

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

### ✨ Key Features

### 🔄 **Dynamic Data Integration (NEW)**
- **Auto-Schema Detection**: Automatically adapts to CSV structure changes
- **Smart Metric Selection**: AI-powered selection of most insightful charts
- **Real-time Data Validation**: Comprehensive error handling and validation
- **Flexible Data Processing**: Handles various CSV formats and column types

### 🗺️ **Enhanced Mapillary Integration (NEW)**
- **Interactive Street-View Previews**: Thumbnail galleries with modal lightbox
- **Multiple URL Format Support**: Works with both image and sequence links
- **Fallback Mechanisms**: External link buttons when embedding fails
- **Responsive Design**: Optimized for all screen sizes

### 📸 **Smart Photo Discovery (NEW)**
- **Auto-Detection**: Finds images using multiple naming patterns
- **Dynamic Loading**: Lazy loads photos as needed
- **Keyboard Navigation**: Full accessibility with arrow keys and ESC
- **Download Support**: Direct download functionality for audit photos

### 📊 **Advanced Data Visualization**
- **Interactive Dashboard**: Real-time KPIs with enhanced calculations
- **Individual Member Profiles**: Auto-generated charts based on data analysis
- **Survey Data Insights**: Advanced filtering and aggregation
- **Ward Maps**: Embedded Google My Maps with security enhancements
- **Comprehensive Analytics**: Cross-member data comparison and trends

### 🛡️ **Robust Error Handling (NEW)**
- **Global Error Boundaries**: Graceful error recovery throughout app
- **Loading States**: Informative loading indicators and progress feedback
- **404 Handling**: Custom not-found pages with search functionality
- **Network Resilience**: Handles offline scenarios and failed requests

### ♿ **Accessibility & UX (ENHANCED)**
- **WCAG AA Compliance**: Full keyboard navigation and screen reader support
- **Skip Links**: Quick navigation for assistive technologies
- **ARIA Labels**: Comprehensive labeling for all interactive elements
- **Focus Management**: Logical tab order and focus indicators
- **Mobile Optimization**: Touch-friendly interfaces with responsive design

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

### GitHub Pages (Recommended)

1. **Enable GitHub Actions** in your repository settings
2. **Push to main branch** - deployment happens automatically via GitHub Actions
3. **Configure Pages** in repository settings to use GitHub Actions source
4. **Custom domain** (optional): Update `cname` in `.github/workflows/main.yml`

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

Deploy the `dist/` folder to any static hosting service:

#### Netlify
1. Drag and drop `dist/` folder to Netlify dashboard
2. Or connect GitHub repository for automatic deployments
3. Build command: `npm run build`
4. Publish directory: `dist`

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### AWS S3 + CloudFront
```bash
# Install AWS CLI and configure credentials
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### GitHub Pages (Manual)
```bash
npm run build
npx gh-pages -d dist
```

### Environment Variables

For production deployment, you may need to set:
- `BASE_URL`: Base path for your application (default: `/`)
- `NODE_ENV`: Set to `production` for optimized builds

### Post-Deployment Checklist

- ✅ All pages load correctly
- ✅ CSV data loads without CORS issues
- ✅ External links (Mapillary, Google Maps) work
- ✅ Images and assets load properly
- ✅ Responsive design works on all devices
- ✅ Accessibility features function correctly
- ✅ Performance scores are acceptable (Lighthouse audit)

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
   - Check file names match member configuration in `src/data/members.ts`
   - Verify CSV format matches expected schema (11 columns)
   - Check network tab in browser dev tools for 404 errors

2. **Map Embedding Issues**
   - Some browsers block iframe embedding due to CORS policies
   - Fallback buttons provide direct links to Google My Maps
   - Check network connectivity for external maps
   - Verify iframe sandbox attributes are properly set

3. **Chart Display Problems**
   - Verify data format in CSV files matches expected types
   - Check chart type configuration in member config
   - Ensure Recharts dependencies are installed correctly
   - Look for JavaScript errors in browser console

4. **Build/Deployment Issues**
   - Run `npm run build` to check for TypeScript errors
   - Verify all assets are in `/public/` directory
   - Check that relative paths work in production
   - Ensure environment variables are set correctly

5. **Accessibility Issues**
   - Test with screen readers (NVDA, JAWS, VoiceOver)
   - Verify keyboard navigation works throughout the site
   - Check color contrast ratios meet WCAG AA standards
   - Ensure all interactive elements have proper ARIA labels

### Development Tips

- Use browser dev tools to inspect CSV loading and network requests
- Check console for any JavaScript errors or warnings
- Verify responsive design across different screen sizes (mobile, tablet, desktop)
- Test accessibility with screen reader tools and keyboard-only navigation
- Use Lighthouse audits to check performance and accessibility scores
- Run `npm run lint` to catch code quality issues early

### Performance Optimization

- Images are lazy-loaded and optimized by Vite
- Charts render only when visible (intersection observer)
- CSV data is cached after first load
- Static assets have proper cache headers
- Bundle size is monitored with bundlesize package

### Security Considerations

- All external links use `rel="noopener noreferrer"`
- Iframes have proper sandbox attributes
- No inline scripts or unsafe content
- Input validation on all user interactions
- Content Security Policy headers recommended for production

## 📝 License

This project is created for educational and research purposes. Please respect the privacy of survey respondents and use the data responsibly.

## 🤝 Contributing

This is a research project. For questions or collaboration opportunities, please refer to the About page or contact the team members listed in the application.

---

**Built with ❤️ for safer, more walkable streets in Mumbai**
