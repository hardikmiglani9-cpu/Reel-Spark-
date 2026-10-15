import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const FAQPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<string | null>(config.faqs[0]?.id || null);

  const categories = ['All', 'Pricing & Orders', 'Delivery & Revisions', 'Technical & Assets', 'General'];

  const filteredFaqs = config.faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Help Center
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Detailed answers regarding our creative production workflow, pricing rules, turnaround expectations, asset guidelines, and business policies.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. revisions, timeline, wedding)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 border border-zinc-800 rounded-2xl bg-zinc-900/40 p-8 space-y-3">
            <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">No questions matched your search</h3>
            <p className="text-xs text-zinc-400">Try searching with a different keyword or connect directly with our team on WhatsApp.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-zinc-800 bg-[#0c0c10] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-semibold text-zinc-200 hover:text-white"
                  >
                    <span className="font-display text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-purple-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-purple-400 mb-2">
                        <span>Category: {faq.category}</span>
                      </div>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Still have questions? */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl border border-zinc-800 bg-[#0e0e14] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white font-display">
              Have a specific question not covered here?
            </h3>
            <p className="text-xs text-zinc-400">
              Our creative director answers queries directly on WhatsApp with sample previews.
            </p>
          </div>

          <a
            href={getWhatsAppUrl("Hello Reel Spark, I have a specific question about your production services:")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp (+91 9996375070)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
