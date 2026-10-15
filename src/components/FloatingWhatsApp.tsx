import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#121218] border border-zinc-700/80 text-white px-3.5 py-2 rounded-xl shadow-xl text-xs backdrop-blur-md animate-fade-in">
          <span>Chat with Reel Spark on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-white"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        aria-label="Chat with Reel Spark on WhatsApp at +91 9996375070"
      >
        <MessageCircle className="w-7 h-7 fill-white/10 stroke-[2.2]" />
      </a>
    </div>
  );
};
