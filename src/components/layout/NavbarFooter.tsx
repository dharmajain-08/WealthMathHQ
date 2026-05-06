import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, Home, Info, Phone, ChevronDown, Instagram, Youtube, Briefcase, Linkedin, Twitter } from 'lucide-react';
import { CALCULATORS } from '../../constants';

import { Logo } from '../ui/Logo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalcs, setShowCalcs] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Financial Calculators', path: '/financial-calculators', icon: Calculator },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Videos', path: '/youtube', icon: Youtube },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-brand-navy text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex justify-between h-[80px]">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.name === 'Financial Calculators' ? (
                  <div className="relative group/calc">
                    <div 
                      className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalcs(!showCalcs);
                      }}
                      onMouseEnter={() => setShowCalcs(true)}
                      onMouseLeave={() => setShowCalcs(false)}
                    >
                      <span className={`text-sm font-bold transition-colors ${location.pathname.startsWith(link.path) ? "text-white" : "text-white/70"}`}>
                        {link.name}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-all duration-200 ${showCalcs ? 'rotate-180' : ''} ${location.pathname.startsWith(link.path) ? "text-white" : "text-white/70"}`} />
                    </div>
                    
                    {/* Dropdown */}
                    <div 
                      className={`absolute top-full left-0 w-72 bg-white text-brand-navy rounded-2xl shadow-2xl border border-brand-border py-4 transition-all duration-300 ${showCalcs ? 'opacity-100 translate-y-2' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                      onMouseEnter={() => setShowCalcs(true)}
                      onMouseLeave={() => setShowCalcs(false)}
                    >
                      <div className="grid grid-cols-1 gap-1">
                        {CALCULATORS.slice(0, 9).map((calc) => (
                          <Link 
                            key={calc.id} 
                            to={calc.path}
                            className="block px-6 py-2.5 hover:bg-brand-bg-alt hover:text-brand-primary transition-colors text-sm font-bold border-l-4 border-transparent hover:border-brand-primary"
                          >
                            {calc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-sm font-bold hover:text-white transition-colors ${
                      location.pathname === link.path ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-primary p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-brand-navy border-t border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto`}>
        <div className="px-5 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => (
            <div key={link.path} className="space-y-1">
              {link.name === 'Financial Calculators' ? (
                <>
                  <button
                    onClick={() => setShowCalcs(!showCalcs)}
                    className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-base font-bold ${
                      location.pathname.startsWith(link.path) ? 'bg-white/10 text-brand-primary' : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="w-5 h-5 opacity-50" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCalcs ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Dropdown Sublinks */}
                  {showCalcs && (
                    <div className="pl-12 space-y-1">
                      {CALCULATORS.slice(0, 9).map((calc) => (
                        <Link
                          key={calc.id}
                          to={calc.path}
                          onClick={() => {
                            setIsOpen(false);
                            setShowCalcs(false);
                          }}
                          className="block py-3 text-sm font-bold text-white/50 hover:text-brand-primary transition-colors"
                        >
                          {calc.name}
                        </Link>
                      ))}
                      <Link
                        to="/calculators"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-sm font-bold text-brand-primary"
                      >
                        View All Calculators →
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-4 rounded-xl text-base font-bold ${
                    location.pathname === link.path ? 'bg-white/10 text-brand-primary' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="w-5 h-5 opacity-50" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 px-2">
             <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-primary text-white px-6 py-4 rounded-xl text-base font-black shadow-xl shadow-brand-primary/20"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-6 block text-white">
              <Logo />
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm mb-6">
              Data-driven financial planning practice providing personalized investment planning, wealth growth strategies, and institutional-grade research. We bridge the gap between complex financial math and real-life wealth creation for Indian investors and NRIs.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-sm text-brand-muted hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-brand-primary text-xs uppercase tracking-wider">Email:</span>
                <span>WealthMathHQ@gmail.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[2px]">Connect with us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/wealthmathhq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary cursor-pointer transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://twitter.com/wealthmathhq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary cursor-pointer transition-colors"
                  title="X"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/wealthmathhq/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary cursor-pointer transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.youtube.com/@wealthmathhq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary cursor-pointer transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Services</Link></li>
              <li><Link to="/financial-calculators" className="hover:text-brand-primary transition-colors">Financial Calculators</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/youtube" className="hover:text-brand-primary transition-colors">Videos</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Top Calculators</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><Link to="/financial-calculators/compound-inflation" className="hover:text-brand-primary transition-colors">Wealth Growth Analyser</Link></li>
              <li><Link to="/financial-calculators/goal-planner" className="hover:text-brand-primary transition-colors">Goal Planner</Link></li>
              <li><Link to="/financial-calculators/loan-part-payments" className="hover:text-brand-primary transition-colors">Loan + Part Payments</Link></li>
              <li><Link to="/financial-calculators/sip-step-up" className="hover:text-brand-primary transition-colors">SIP Step-Up</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <p className="text-xs text-brand-muted mb-2">
              &copy; {new Date().getFullYear()} WealthMathHQ. All rights reserved.
            </p>
            <p className="text-[10px] text-brand-muted/60 italic max-w-2xl">
              All investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            </p>
          </div>
          <div className="flex space-x-6 text-xs text-brand-muted">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-brand-primary transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
