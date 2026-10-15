import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Navbar: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight font-display text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-base font-extrabold shadow-sm">
            R
          </span>
          <span>{config.brand.name}</span>
        </Link>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                isActive(link.path)
                  ? 'text-purple-400 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-sm hover:shadow-purple-500/20 whitespace-nowrap shrink-0"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-md whitespace-nowrap"
          >
            Quote
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0c0c10] px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-medium transition-colors ${
                  isActive(link.path) ? 'text-purple-400 font-semibold' : 'text-zinc-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-zinc-200 hover:text-white"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-zinc-800 flex flex-col gap-3">
              <a
                href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-sm"
              >
                Chat on WhatsApp (+91 9996375070)
              </a>
              <a
                href={config.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 text-sm text-zinc-400 hover:text-zinc-200"
              >
                Instagram: {config.brand.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
