import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SubNav from './SubNav';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  const location = useLocation();
  const isWorksPage = location.pathname === '/works' || location.pathname.startsWith('/works/');

  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-lg font-bold group overflow-hidden">
            Ellie Tsatsou-Palmer
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                `nav-link ${isActive || location.pathname.startsWith('/work/') ? 'active' : ''}`
              }
            >
              Artworks
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* SubNav for Collection filtering */}
        {isWorksPage && (
          <div className="hidden md:block border-t border-border/50">
            <SubNav />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col px-4 py-2 space-y-4 bg-background border-b border-border">
            <NavLink to="/" className={({ isActive }) => `py-2 ${isActive ? 'font-medium' : ''}`}>
              Home
            </NavLink>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                `py-2 ${isActive || location.pathname.startsWith('/work/') ? 'font-medium' : ''}`
              }
            >
              Artworks
            </NavLink>
            {(location.pathname === '/works' || location.pathname.startsWith('/work/')) && (
              <div className="hidden pl-4 md:block">
                <SubNav />
              </div>
            )}
            <NavLink to="/about" className={({ isActive }) => `py-2 ${isActive ? 'font-medium' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `py-2 ${isActive ? 'font-medium' : ''}`}>
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
