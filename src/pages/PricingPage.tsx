import React, { useState } from 'react';
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  MessageCircle, 
  ArrowUpRight, 
  Calculator, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const PricingPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [activeTab, setActiveTab] = useState<'all' | 'wedding' | 'marketing' | 'design'>('all');

  // Interactive Wedding Package Calculator state
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(['w-wedding', 'w-haldi', 'w-mehendi']);

  const toggleFunction = (id: string) => {
    if (selectedFunctions.includes(id)) {
      setSelectedFunctions(selectedFunctions.filter((item) => item !== id));
    } else {
      setSelectedFunctions([...selectedFunctions, id]);
    }
  };

  // Wedding estimate calculation
  const calculateWeddingEstimate = () => {
    if (selectedFunctions.length === 0) return 0;
    // If they have 3 or more functions, recommended combined package (₹1499)
    if (selectedFunctions.length >= 3) {
      return 1499; // Combined wedding package
    }
    // Otherwise primary function + ₹150 for second function
    let total = 0;
    selectedFunctions.forEach((id, index) => {
      const item = config.weddingPricing.find((p) => p.id === id);
      if (item) {
        if (index === 0) {
          total += item.price;
        } else {
          total += 150; // Add-on function rule
        }
      }
    });
    return total;
  };

  const weddingTotal = calculateWeddingEstimate();
  const isCombinedRecommendation = selectedFunctions.length >= 3;

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Title & Disclaimers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Transparent Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Clear, Starting Rates & Packages
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            All prices are starting rates with zero hidden charges. Final quotes are confirmed in advance based on duration, creative complexity, number of revisions, and deliverables.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={getWhatsAppUrl("Hello Reel Spark, I would like to request a custom quote for my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-md shadow-purple-600/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Get Custom Quote on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: Wedding Function Reels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-rose-400 font-mono">Ceremony Invitations</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Wedding Function Reels
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Customized celebration and ceremony announcement reels tailored with photos, music, and royal typography.
            </p>
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            * Additional function in same video: <span className="text-purple-300 font-bold">₹150 extra</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {config.weddingPricing.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                item.popular
                  ? 'border-purple-600/80 bg-gradient-to-b from-[#171226] to-[#0c0a13] shadow-lg shadow-purple-950/40'
                  : 'border-zinc-800 bg-[#0d0d12] hover:border-zinc-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                    {item.duration}
                  </span>
                  {item.popular && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-700/60 px-2 py-0.5 rounded-md">
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {item.priceDisplay}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1 font-display">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60">
                <a
                  href={getWhatsAppUrl(`Hello Reel Spark, I am interested in booking the ${item.name} (${item.priceDisplay}, ${item.duration}). Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 text-center text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
                    item.popular
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Wedding Package Estimator */}
        <div className="rounded-2xl border border-zinc-800 bg-[#111119] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Wedding Reel Multi-Function Estimator
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your functions to calculate estimated package pricing.
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-zinc-400">Estimated Total</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                ₹{weddingTotal.toLocaleString('en-IN')}
                {isCombinedRecommendation && (
                  <span className="text-xs font-normal text-purple-400 ml-2 font-sans">
                    (Combined Package)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Function Selector Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {[
              { id: 'w-wedding', label: 'Wedding (₹499)' },
              { id: 'w-haldi', label: 'Haldi (₹299)' },
              { id: 'w-mehendi', label: 'Mehendi (₹299)' },
              { id: 'w-engagement', label: 'Engagement (₹399)' },
              { id: 'w-roka', label: 'Roka (₹349)' },
            ].map((func) => {
              const isSelected = selectedFunctions.includes(func.id);
              return (
                <button
                  key={func.id}
                  type="button"
                  onClick={() => toggleFunction(func.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'border-purple-600 bg-purple-950/40 text-white font-semibold'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>{func.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 text-xs">
            <span className="text-zinc-400">
              {selectedFunctions.length} function(s) selected · Final video formatted for 9:16 vertical reels & status
            </span>
            <a
              href={getWhatsAppUrl(`Hello Reel Spark, I used the Wedding Reel Estimator for: ${selectedFunctions.map(f => config.weddingPricing.find(p => p.id === f)?.name).filter(Boolean).join(', ')}. Estimated starting total is ₹${weddingTotal}. Please share sample drafts and confirm booking.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Selected Functions on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: Other Creative Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-zinc-800 pb-4">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">Commercial & Digital Media</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Other Creative & Marketing Services
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Video advertisements, product showcases, UGC commercial concepts, graphic assets, and digital invitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {config.creativePricing.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                item.popular
                  ? 'border-cyan-600/70 bg-gradient-to-b from-[#0f1722] to-[#0c0e14] shadow-lg shadow-cyan-950/30'
                  : 'border-zinc-800 bg-[#0d0d12] hover:border-zinc-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                    {item.duration}
                  </span>
                  {item.popular && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded-md">
                      Recommended
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {item.priceDisplay}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1 font-display">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60">
                <a
                  href={getWhatsAppUrl(`Hello Reel Spark, I am interested in ${item.name} (${item.priceDisplay}). Please provide turnaround time and package options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-center text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Pricing Rules & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
            <AlertCircle className="w-4 h-4 text-purple-400" />
            <span>Important Pricing & Order Policy Rules</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-zinc-400">
            <div className="space-y-1.5">
              <div className="font-semibold text-zinc-200">Starting Rates Structure</div>
              <p className="leading-relaxed">
                Prices indicated with "Starting at" or "Onwards" represent the entry tier. Final project fees depend on script complexity, length, voiceover requirements, and extra deliverables.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-zinc-200">Revisions & Scope Confirmation</div>
              <p className="leading-relaxed">
                Project scope, deliverables, turnaround time, and exact pricing are mutually locked in writing before commencement. Scope changes requested mid-production are quoted separately.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-zinc-200">Digital Deliverables & Cancellation</div>
              <p className="leading-relaxed">
                Due to custom artistic creation and immediate dedication of video production hours, cancellations and refunds are not permitted once production begins, subject to applicable law.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
