import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Member from './pages/Member';
import SurveyInsights from './pages/SurveyInsights';
import WardMaps from './pages/WardMaps';
import SkywalkAudit from './pages/SkywalkAudit';
import StreetInterviews from './pages/StreetInterviews';
import Resources from './pages/Resources';
import About from './pages/About';

function App() {
  return (
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
