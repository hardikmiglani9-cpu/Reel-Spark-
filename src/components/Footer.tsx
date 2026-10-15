import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Footer: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();

  return (
    <footer className="border-t border-zinc-800 bg-[#070709] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold font-display text-white">
              <span className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-extrabold">
                R
              </span>
              <span>{config.brand.name}</span>
            </Link>
            <p className="text-sm text-zinc-300 font-medium">
              "{config.brand.mainTagline}"
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {config.brand.supportingTagline} Premier AI-powered creative production studio specializing in high-converting commercial advertisements, customized wedding invitation reels, product showcases, and bespoke web platforms.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={config.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-300 hover:text-purple-400 transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4 text-purple-400" />
                <span>{config.brand.instagramHandle}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp chat"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{config.brand.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Agency</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">Pricing & Packages</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Creative Offerings</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services#ai-marketing-ads" className="hover:text-white transition-colors">AI Marketing Ads</Link>
              </li>
              <li>
                <Link to="/services#ai-video-production" className="hover:text-white transition-colors">AI Video Production</Link>
              </li>
              <li>
                <Link to="/services#product-ecommerce-creatives" className="hover:text-white transition-colors">Product Creatives</Link>
              </li>
              <li>
                <Link to="/services#wedding-invitations" className="hover:text-white transition-colors">Wedding Function Reels</Link>
              </li>
              <li>
                <Link to="/services#graphic-design" className="hover:text-white transition-colors">Graphic Design</Link>
              </li>
              <li>
                <Link to="/services#influencer-ugc-ads" className="hover:text-white transition-colors">UGC & Influencer Ads</Link>
              </li>
              <li>
                <Link to="/services#business-websites" className="hover:text-white transition-colors">Business Websites</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Legal & Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">Cancellation & Refund Policy</Link>
              </li>
              <li className="pt-3">
                <Link to="/admin" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} {config.brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Verified Creative Deliverables</span>
            </span>
            <span>·</span>
            <span>Digital Delivery Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
