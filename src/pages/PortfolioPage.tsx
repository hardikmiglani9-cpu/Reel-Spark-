import React, { useState } from 'react';
import { 
  Play, 
  ArrowUpRight, 
  MessageCircle, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Maximize2 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { PortfolioItem } from '../data/siteConfig';

export const PortfolioPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All Projects',
    'Marketing Ads',
    'Product Videos',
    'Wedding Invitations',
    'Graphic Design',
    'AI Videos',
    'Influencer and UGC-Style Ads',
    'Website Projects',
  ];

  const filteredItems = selectedCategory === 'All Projects'
    ? config.portfolio
    : config.portfolio.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-12 md:py-16 space-y-12">
      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Creative Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Portfolio & Production Gallery
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Browse representative samples across commercial advertising, wedding ceremony reels, 3D product renders, and UGC motion creatives.
          </p>
          <div className="text-xs text-zinc-400 flex items-center gap-2 pt-1 font-mono">
            <span>Sample projects demonstrating visual aesthetic & technical direction.</span>
            <span>·</span>
            <span className="text-purple-400">Media editable via Admin Hub</span>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Functional Buttons) */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/20'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-zinc-800 rounded-2xl bg-zinc-900/40 p-8 space-y-3">
            <Layers className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">No projects found in this category</h3>
            <p className="text-xs text-zinc-400">Try selecting "All Projects" or reach out to see custom archived samples.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-zinc-800 bg-[#0d0d12] overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-lg"
              >
                {/* Media Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill Tag Replacement: clean unboxed tag with dark scrim */}
                  <div className="absolute top-3 left-3 text-[11px] font-medium text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {item.category}
                  </div>

                  {/* Quick Action Overlay */}
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs"
                    aria-label={`View details for ${item.title}`}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600/90 hover:bg-purple-600 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Project Details</span>
                    </span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-display group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[140px]">
                      {item.deliverable}
                    </span>

                    <a
                      href={getWhatsAppUrl(item.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-700 bg-[#0f0f15] overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-16/9 bg-zinc-950">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-transparent to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
                  {activeModalItem.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeModalItem.deliverable}
                </span>
              </div>

              <h2 className="text-2xl font-bold font-display text-white">
                {activeModalItem.title}
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeModalItem.description}
              </p>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs">
                <div className="font-semibold text-white">Production Notes:</div>
                <div className="text-zinc-400 leading-relaxed">
                  Produced with custom motion graphics, optimized color spaces for mobile viewing, and tailored soundtracks. Work begins only after agreeing on scope and deliverables.
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Close Preview
                </button>

                <a
                  href={getWhatsAppUrl(activeModalItem.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-md shadow-purple-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire About Similar Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
