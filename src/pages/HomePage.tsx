import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Video, 
  ShoppingBag, 
  HeartHandshake, 
  Palette, 
  Users, 
  Globe, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Play, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  MessageCircle 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const HomePage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Video': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-emerald-400" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[300px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Creative Agency & Digital Marketing</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1] text-balance">
                {config.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
                {config.hero.description}
              </p>

              {/* Tagline highlight */}
              <div className="text-xs text-zinc-400 flex items-center gap-2 pt-1 font-mono">
                <span className="text-purple-400">"{config.brand.mainTagline}"</span>
                <span aria-hidden="true">·</span>
                <span>{config.brand.supportingTagline}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all duration-150 shadow-lg shadow-purple-600/20 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{config.hero.primaryCtaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-colors whitespace-nowrap"
                >
                  <span>{config.hero.secondaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                <div>
                  <div className="text-base font-bold text-white font-mono tabular-nums">₹299 onwards</div>
                  <div className="text-zinc-400 mt-0.5">Wedding Reels</div>
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono tabular-nums">24–48 Hours</div>
                  <div className="text-zinc-400 mt-0.5">Typical Turnaround</div>
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono tabular-nums">100% Customized</div>
                  <div className="text-zinc-400 mt-0.5">Custom Creatives</div>
                </div>
              </div>
            </div>

            {/* Right Media Preview Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-2xl group">
                <img
                  src="/src/assets/images/reelspark_hero_studio_1792022411199.jpg"
                  alt="Reel Spark AI Creative Agency Studio"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-700/70 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Studio Production Suite
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">4K Commercial Master</span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-1">
                    AI-powered advertisements, viral short-form reels, and bespoke 3D product visuals.
                  </p>
                </div>
              </div>

              {/* Floating Mini Preview Cards */}
              <div className="hidden sm:grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <img
                    src="/src/assets/images/reelspark_wedding_invitation_1792022412874.jpg"
                    alt="Wedding Reel Preview"
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">Royal Wedding Reels</div>
                    <div className="text-[11px] text-zinc-400">Starting at ₹299</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <img
                    src="/src/assets/images/reelspark_product_commercial_1792022411340.jpg"
                    alt="Product Ad Preview"
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">3D Product Showcase</div>
                    <div className="text-[11px] text-zinc-400">Starting at ₹1,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Comprehensive Solutions</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              Creative Production Services
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Turn your business or personal milestones into extraordinary content. Every service has transparent starting rates.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-2xl border border-zinc-800 bg-[#0e0e13] p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 ${
                idx === 0 ? 'lg:col-span-2 bg-gradient-to-br from-[#12111a] to-[#0e0e13]' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/60">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-purple-300 font-medium">
                    {service.startingPrice}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display">{service.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{service.shortDesc}</p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <div className="text-[11px] text-zinc-400 pl-5">
                      + {service.deliverables.length - 3} more deliverables
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Discuss Project</span>
                </a>
                <Link
                  to={`/services#${service.id}`}
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PORTFOLIO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Our Craft</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              Featured Work & Projects
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Authentic samples and production examples demonstrating our motion design, AI video direction, and creative aesthetics.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap"
          >
            <span>Explore Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.portfolio.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-zinc-800 bg-[#0c0c10] overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-200"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 text-[11px] font-medium text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]">
                    {item.deliverable}
                  </span>
                  <a
                    href={getWhatsAppUrl(item.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold text-xs whitespace-nowrap"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE REEL SPARK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-[#111118] to-[#09090c] p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">The Agency Difference</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              Why Businesses & Creators Choose Reel Spark
            </h2>
            <p className="text-sm text-zinc-400">
              We reject generic templates and low-effort automations. Every video reel and ad creative is crafted with clear conversion intent and high aesthetic standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-700/40 flex items-center justify-center text-purple-300 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white font-display">Scroll-Stopping Hooks</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Audiences decide whether to keep watching in under 3 seconds. Our video ads are engineered with strong visual hooks, dynamic motion, and proven narrative frameworks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-900/30 border border-cyan-700/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white font-display">Transparent Starting Prices</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No guessing games or inflated quotes. Wedding reels start at ₹299, ad creatives at ₹800. Scope, duration, and price are mutually agreed upon before orders begin.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-900/30 border border-amber-700/40 flex items-center justify-center text-amber-300 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white font-display">Fast Turnaround Times</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Digital marketing moves fast. We deliver ceremony reels in 24–48 hours and commercial video ads within 2–5 days upon receiving all required information and media assets.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-900/30 border border-rose-700/40 flex items-center justify-center text-rose-300 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white font-display">Human Artistry + AI Power</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                AI creates the speed and infinite variation; experienced creative directors provide taste, storytelling, sound design, and color harmony.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center text-emerald-300 font-mono font-bold text-sm">
                05
              </div>
              <h3 className="text-base font-bold text-white font-display">Direct WhatsApp Consultation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No ticket queues or disconnected call centers. Chat directly with creative producers via WhatsApp (+91 9996375070) for rapid updates and revisions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-700/40 flex items-center justify-center text-blue-300 font-mono font-bold text-sm">
                06
              </div>
              <h3 className="text-base font-bold text-white font-display">White-Label Agency Support</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Digital agencies and consultants rely on us as their silent backend production arm for client video deliverables, social ads, and marketing graphics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR CREATIVE PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Streamlined Workflow</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            From Initial Idea to Final Asset
          </h2>
          <p className="text-sm text-zinc-400">
            A structured four-step delivery process ensuring complete alignment, rapid revisions, and flawless final results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] relative space-y-3">
            <span className="text-2xl font-mono font-extrabold text-zinc-400">01</span>
            <h3 className="text-base font-bold text-white font-display">Brief & Requirement Confirmation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Share your concept, photos, brand guidelines, or ceremony details via WhatsApp. We confirm scope, timeline, and exact pricing before beginning.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] relative space-y-3">
            <span className="text-2xl font-mono font-extrabold text-zinc-400">02</span>
            <h3 className="text-base font-bold text-white font-display">Storyboarding & Motion Concept</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We draft the visual direction, typography pairings, audio track, and scene sequence tailored to your target audience or wedding theme.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] relative space-y-3">
            <span className="text-2xl font-mono font-extrabold text-zinc-400">03</span>
            <h3 className="text-base font-bold text-white font-display">AI Production & Sound Mastering</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              High-definition rendering, AI portrait enhancement, sound mastering, and visual effects are assembled into a master draft.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] relative space-y-3">
            <span className="text-2xl font-mono font-extrabold text-zinc-400">04</span>
            <h3 className="text-base font-bold text-white font-display">Client Review & Final Handover</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You review text, timings, and spellings. Once approved, you receive the full-resolution watermark-free video files ready for social posting.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRICING PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Transparent Rates</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              Starting Packages & Rates
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Competitive, clearly defined starting rates for weddings, businesses, and influencers.
            </p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View Complete Rate Card & Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Haldi / Mehendi */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0c0c10] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Wedding Function</span>
              <span className="text-xs font-mono text-zinc-400">10–15 sec</span>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-white">₹299</div>
              <h3 className="text-base font-bold text-white mt-1">Haldi or Mehendi Reel</h3>
              <p className="text-xs text-zinc-400 mt-1">Single ceremony invitation reel with festive traditional motifs and custom couple music.</p>
            </div>
            <a
              href={getWhatsAppUrl("Hello Reel Spark, I am interested in the Haldi/Mehendi Reel starting at ₹299.")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 text-center text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
            >
              Book Ceremony Reel
            </a>
          </div>

          {/* Card 2: Combined Wedding Package */}
          <div className="p-6 rounded-2xl border border-purple-600/70 bg-gradient-to-b from-[#161224] to-[#0d0b16] space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Most Popular</span>
              <span className="text-xs font-mono text-purple-300">approx. 40 sec</span>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-white">₹1,499</div>
              <h3 className="text-base font-bold text-white mt-1">Combined Wedding Package</h3>
              <p className="text-xs text-zinc-300 mt-1">All-in-one cinematic itinerary reel covering all ceremonies (Haldi, Mehendi, Sangeet, Wedding).</p>
            </div>
            <a
              href={getWhatsAppUrl("Hello Reel Spark, I want to book the Combined Wedding Package (₹1,499).")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 text-center text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-md shadow-purple-600/20"
            >
              Book Combined Package
            </a>
          </div>

          {/* Card 3: Business Ad Creatives */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0c0c10] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Marketing & Sales</span>
              <span className="text-xs font-mono text-zinc-400">20–30 sec</span>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-white">₹800 <span className="text-xs text-zinc-400 font-normal">onwards</span></div>
              <h3 className="text-base font-bold text-white mt-1">Promotional Video Ads</h3>
              <p className="text-xs text-zinc-400 mt-1">High-converting social media advertising creative for businesses, products, and local stores.</p>
            </div>
            <a
              href={getWhatsAppUrl("Hello Reel Spark, I am interested in Basic Video Ads starting at ₹800.")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 text-center text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
            >
              Order Video Ad
            </a>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Common Enquiries</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-400">
            Clear, transparent answers regarding orders, turnaround, pricing, and revision rules.
          </p>
        </div>

        <div className="space-y-3">
          {config.faqs.slice(0, 5).map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-zinc-800 bg-[#0c0c10] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-semibold text-zinc-200 hover:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Read all frequently asked questions →
          </Link>
        </div>
      </section>

      {/* 8. FINAL CALL-TO-ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-purple-950/40 via-[#0e0e14] to-cyan-950/30 p-8 sm:p-12 lg:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Ready to Turn Your Ideas Into Scroll-Stopping Experiences?
            </h2>
            <p className="text-sm text-zinc-300">
              Connect directly with Reel Spark on WhatsApp. Discuss your creative project, get transparent pricing, and receive fast turnaround.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all duration-150 shadow-lg shadow-purple-600/25 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 9996375070)</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-700/80 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>Submit Project Enquiry Form</span>
            </Link>
          </div>

          <div className="text-xs text-zinc-400 pt-2 flex items-center justify-center gap-3">
            <span>Instagram: @Reelspk.ai</span>
            <span>·</span>
            <span>Worldwide Online Delivery</span>
          </div>
        </div>
      </section>
    </div>
  );
};
