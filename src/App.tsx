import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Member from './pages/Member';
import SurveyInsights from './pages/SurveyInsights';
import WardMaps from './pages/WardMaps';
import SkywalkAudit from './pages/SkywalkAudit';
import StreetInterviews from './pages/StreetInterviews';
import Resources from './pages/Resources';
import About from './pages/About';

// Define the type for the NotFound component props
interface NotFoundProps {
  showSearch: boolean;
}

// Cast the imported NotFound component to include the props type
const NotFoundWithProps = NotFound as React.FC<NotFoundProps>;

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:memberKey" element={<Member />} />
            <Route path="/survey-insights" element={<SurveyInsights />} />
            <Route path="/ward-maps" element={<WardMaps />} />
            <Route path="/skywalk-audit" element={<SkywalkAudit />} />
            <Route path="/street-interviews" element={<StreetInterviews />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="*" 
              element={
                <NotFoundWithProps 
                  showSearch={true} 
                  // Add any other props that NotFound expects
                />
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
