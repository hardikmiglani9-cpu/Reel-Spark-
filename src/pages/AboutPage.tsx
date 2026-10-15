import React from 'react';
import { 
  Sparkles, 
  Target, 
  Heart, 
  ShieldCheck, 
  Layers, 
  MessageCircle, 
  Instagram, 
  ArrowUpRight 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const AboutPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();

  const targetAudiences = [
    {
      title: "Small & Medium-Sized Businesses",
      description: "Local service providers, retailers, gyms, clinics, and entrepreneurs who need high-converting commercial video ads to win local market share.",
    },
    {
      title: "E-Commerce Brands & Product Sellers",
      description: "Direct-to-consumer stores on Shopify and Amazon looking for studio-grade product showcases, liquid dynamics, and 3D floating commercial renders.",
    },
    {
      title: "Wedding Businesses & Event Planners",
      description: "Couples and event professionals requiring royal, customized wedding reels for Haldi, Mehendi, Roka, Engagement, and full multi-function celebrations.",
    },
    {
      title: "Influencers & Content Creators",
      description: "Creators needing scroll-stopping vertical edits, YouTube Shorts, dynamic caption motion design, and high-energy personal brand teasers.",
    },
    {
      title: "Marketing Agencies (White-Label Production)",
      description: "Digital agencies seeking reliable, cost-efficient video production capacity without increasing full-time internal overhead.",
    },
    {
      title: "Local Retailers & Showrooms",
      description: "Physical retail shops, jewelry showrooms, and boutiques seeking shop-matching promotional reels and social announcements.",
    },
  ];

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Agency Identity
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            About Reel Spark
          </h1>
          <p className="text-xl text-purple-300 font-medium font-display">
            "{config.brand.mainTagline}"
          </p>
          <p className="text-base text-zinc-300 leading-relaxed">
            {config.brand.supportingTagline} Reel Spark is an AI-powered creative and digital marketing agency dedicated to turning ambitious visions into unforgettable visual experiences.
          </p>
        </div>
      </div>

      {/* Studio Image & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <img
              src="/src/assets/images/reelspark_hero_studio_1792022411199.jpg"
              alt="Reel Spark Production Workspace"
              className="w-full h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-zinc-300">
              <span className="font-semibold text-white">Reel Spark Production Philosophy:</span> Cutting-edge generative tools married to human storytelling, rigorous timing, and brand aesthetics.
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Our Core Thesis</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Creativity Accelerated by Intelligence
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Traditional video production has historically been slow, expensive, and out of reach for growing businesses and modern wedding celebrations. Physical studio shoots, multiple camera crews, and lengthy rendering cycles often inflate costs into prohibitive territory.
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                At Reel Spark, we harness generative AI pipelines, virtual cinematography, and modern motion design. This allows us to craft world-class commercial advertisements and cinematic celebration reels in hours rather than weeks, backed by transparent pricing starting as low as ₹299.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-zinc-800 text-xs">
              <div>
                <div className="font-semibold text-white">Human Art Direction</div>
                <div className="text-zinc-400 mt-1">Every frame, beat, and font choice is overseen by human motion designers.</div>
              </div>
              <div>
                <div className="font-semibold text-white">Zero Slop or Shortcuts</div>
                <div className="text-zinc-400 mt-1">We refuse generic templates, delivering bespoke deliverables tailored to your exact brief.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Customers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Partnerships & Clients</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Who We Create For
          </h2>
          <p className="text-xs text-zinc-400">
            Our specialized production workflows cater directly to six primary customer categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudiences.map((audience, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] space-y-3 hover:border-zinc-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-mono text-purple-400 font-bold">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-white font-display">{audience.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Standards & Contact Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-[#0a0a0f] p-8 sm:p-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Direct Contact</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect directly with our creative team on WhatsApp at <span className="text-zinc-200 font-mono">+91 9996375070</span> or follow our public work catalog on Instagram at <span className="text-zinc-200 font-mono">@Reelspk.ai</span>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Transparent Business Policy</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We confirm exact scope, timeline, and pricing before an order is accepted. Once work has begun, dedicated artist hours are immediately committed.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Digital Delivery Worldwide</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We serve businesses, agencies, and families across India and globally with fast cloud-based digital delivery formatted for Instagram, YouTube, and digital platforms.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <a
                href={config.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>{config.brand.instagramHandle}</span>
              </a>
              <span>·</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{config.brand.whatsappDisplay}</span>
              </a>
            </div>

            <a
              href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
