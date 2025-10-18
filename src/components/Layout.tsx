import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Users, BarChart3, Map, Building, MessageSquare, ExternalLink, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Survey Insights', href: '/survey-insights', icon: BarChart3 },
    { name: 'Ward Maps', href: '/ward-maps', icon: Map },
    { name: 'Skywalk Audit', href: '/skywalk-audit', icon: Building },
    { name: 'Street Interviews', href: '/street-interviews', icon: MessageSquare },
    { name: 'Resources', href: '/resources', icon: ExternalLink },
    { name: 'About', href: '/about', icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Walkability Watch</h1>
                <p className="text-xs text-gray-500">Mapping safer streets</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Walkability Watch</h3>
              <p className="text-sm text-gray-600">
                Mapping safer, walkable streets across Mumbai through community-driven research and data collection.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Team</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Niranjan - Field Mapper</li>
                <li>Aarna - Survey Coordinator</li>
                <li>Disha - Data Analyst</li>
                <li>Crisann - Community Liaison</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Acknowledgments</h3>
              <p className="text-sm text-gray-600">
                This project is supported by local NGOs and community organizations working towards better urban mobility.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              © 2025 Walkability Watch. Built with React, Tailwind CSS, and Recharts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
