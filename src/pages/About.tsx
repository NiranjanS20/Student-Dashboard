import React from 'react';
import { MapPin, Users, BarChart3, Target, Heart, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About Walkability Watch
          </h1>
          <p className="text-xl text-primary-100">
            A community-driven research initiative mapping safer, more walkable streets across Mumbai 
            through comprehensive data collection and analysis.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To create comprehensive, data-driven insights about walkability conditions in Mumbai, 
            empowering communities and policymakers to make informed decisions that improve pedestrian 
            safety and accessibility for all residents.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            A Mumbai where every street is safe, accessible, and welcoming for pedestrians of all ages 
            and abilities, fostering healthier communities and sustainable urban mobility.
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Walkability Watch is a comprehensive research initiative that combines quantitative surveys, 
            qualitative interviews, photographic documentation, and infrastructure audits to create a 
            detailed picture of pedestrian conditions across Mumbai.
          </p>
          <p className="mb-4">
            Our four-member field team covers different wards across the city, each bringing unique 
            perspectives and expertise to the data collection process. Through systematic documentation 
            and community engagement, we're building a valuable resource for urban planners, 
            policymakers, and residents.
          </p>
          <p>
            The project emphasizes community participation and local knowledge, ensuring that our 
            findings reflect the real experiences and needs of Mumbai's pedestrians.
          </p>
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Surveys</h3>
            <p className="text-sm text-gray-600">
              Structured questionnaires capturing walking patterns, obstacles, and improvement suggestions
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Interviews</h3>
            <p className="text-sm text-gray-600">
              In-depth conversations with residents, commuters, and local stakeholders
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mapping</h3>
            <p className="text-sm text-gray-600">
              Geographic documentation using GPS, street photography, and digital mapping tools
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Audits</h3>
            <p className="text-sm text-gray-600">
              Systematic assessment of infrastructure conditions and accessibility features
            </p>
          </div>
        </div>
      </div>

      {/* Team Introduction */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">N</span>
            </div>
            <h3 className="font-semibold text-gray-900">Niranjan</h3>
            <p className="text-primary-600 font-medium">Field Mapper</p>
            <p className="text-sm text-gray-600 mt-2">Mahim East</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">A</span>
            </div>
            <h3 className="font-semibold text-gray-900">Aarna</h3>
            <p className="text-primary-600 font-medium">Survey Coordinator</p>
            <p className="text-sm text-gray-600 mt-2">Goregaon West</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">D</span>
            </div>
            <h3 className="font-semibold text-gray-900">Disha</h3>
            <p className="text-primary-600 font-medium">Data Analyst</p>
            <p className="text-sm text-gray-600 mt-2">Virar</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">C</span>
            </div>
            <h3 className="font-semibold text-gray-900">Crisann</h3>
            <p className="text-primary-600 font-medium">Community Liaison</p>
            <p className="text-sm text-gray-600 mt-2">Kandivali</p>
          </div>
        </div>
      </div>

      {/* Impact & Applications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact & Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">For Policymakers</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Evidence-based infrastructure planning</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Budget allocation for pedestrian improvements</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Priority identification for safety interventions</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">For Communities</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Advocacy tools for local improvements</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Awareness of walkability challenges</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Participation in urban planning processes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acknowledgments</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            This project is made possible through the support of local NGOs and community organizations 
            working towards better urban mobility and pedestrian safety in Mumbai. We are grateful for 
            the participation of residents, commuters, and local stakeholders who shared their experiences 
            and insights.
          </p>
          <p className="mb-6">
            Special thanks to the community leaders, shop owners, and daily commuters who took time to 
            participate in our surveys and interviews, making this research truly representative of 
            ground-level experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://crossing-project-game.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Try Our Walkability Game
            </a>
            <a
              href="/team"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-white transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Meet the Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
