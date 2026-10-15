import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Instagram, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface FormState {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  service: string;
  budgetRange: string;
  description: string;
  referenceLink: string;
}

const initialFormState: FormState = {
  name: '',
  businessName: '',
  phone: '',
  email: '',
  service: 'AI Marketing Advertisements',
  budgetRange: '₹1,000 - ₹3,000',
  description: '',
  referenceLink: '',
};

export const ContactPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    enquiryId: string;
    whatsappUrl: string;
  } | null>(null);

  const serviceOptions = [
    'AI Marketing Advertisements',
    'AI Video Production',
    'Product & E-Commerce Creatives',
    'Wedding Invitations & Ceremony Reels',
    'Graphic Design & Marketing Cards',
    'Influencer & UGC-Style Ads',
    'Business Websites & Landing Pages',
    'Other / Custom Production',
  ];

  const budgetOptions = [
    'Under ₹1,000 (Single Ceremony / Graphic Card)',
    '₹1,000 - ₹3,000 (Video Ads / Combined Wedding Package)',
    '₹3,000 - ₹5,000 (Problem-Solving Ads / Story Concepts)',
    '₹5,000 - ₹15,000 (Custom Animations / UGC Campaign)',
    '₹15,000+ (Full Website / Agency Retainer)',
    'Flexible / To be confirmed after discussion',
  ];

  const validatePhone = (phone: string) => {
    // Basic phone validation: digits, optional plus, minimum 8 digits
    const cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length >= 8 && cleaned.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }

    if (!validatePhone(form.phone)) {
      setErrorMsg('Please enter a valid WhatsApp phone number with country code (e.g. +91 9996375070).');
      return;
    }

    if (!form.description.trim() || form.description.trim().length < 5) {
      setErrorMsg('Please provide a brief description of your project or celebration (at least 5 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessData({
          message: data.message,
          enquiryId: data.enquiryId,
          whatsappUrl: data.whatsappUrl,
        });
        setForm(initialFormState);
      } else {
        setErrorMsg(data.error || 'Unable to submit enquiry. Please try again or connect directly via WhatsApp.');
      }
    } catch {
      // Fallback if network or backend route is momentarily offline
      const directMsg = `Hello Reel Spark, I would like to enquire:\n• Name: ${form.name}\n${form.businessName ? `• Business: ${form.businessName}\n` : ''}• Phone: ${form.phone}\n• Service: ${form.service}\n• Budget: ${form.budgetRange}\n• Details: ${form.description}`;
      const fallbackUrl = getWhatsAppUrl(directMsg);

      setErrorMsg('Backend server unavailable. Please click below to send your enquiry directly via WhatsApp.');
      setSuccessData({
        message: 'Direct WhatsApp submission ready.',
        enquiryId: `direct_${Date.now()}`,
        whatsappUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Contact & Project Enquiry
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Tell us about your upcoming campaign, wedding celebration, or product launch. We review every brief and confirm scope, timeline, and exact pricing before accepting orders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Agency Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-[#0d0d12] space-y-6">
              <h2 className="text-xl font-bold font-display text-white">
                Direct Communication Channels
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Need immediate pricing or have reference reels ready to share? WhatsApp is our fastest channel for live project discussions.
              </p>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <a
                  href={getWhatsAppUrl(config.hero.defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-emerald-900/40 bg-emerald-950/20 hover:bg-emerald-950/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-[11px]">Primary WhatsApp</div>
                      <div className="text-white font-mono font-bold text-sm">
                        {config.brand.whatsappDisplay}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram */}
                <a
                  href={config.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-purple-900/40 bg-purple-950/20 hover:bg-purple-950/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-[11px]">Official Instagram</div>
                      <div className="text-white font-mono font-bold text-sm">
                        {config.brand.instagramHandle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Email */}
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Enquiry Email</div>
                    <div className="text-white font-mono text-xs">{config.brand.email}</div>
                  </div>
                </div>

                {/* Response Commitment */}
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 text-cyan-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[11px]">Typical Response Time</div>
                    <div className="text-zinc-200 text-xs">Within 2 to 4 hours on WhatsApp</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Notice */}
            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-[#0a0a0e] space-y-2 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-200">Creative Scope & Approvals</div>
              <p className="leading-relaxed">
                Before any production commences, you will receive confirmation of exact scope, revision limits, duration, and price. Please have all text details and photos reviewed prior to giving final delivery signoff.
              </p>
            </div>
          </div>

          {/* Right Column: Functional Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border border-zinc-800 bg-[#0e0e14] shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white">
                  Send a Detailed Project Brief
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Submissions are recorded directly in our production queue.
                </p>
              </div>

              {/* Success Notification */}
              {successData && (
                <div className="p-5 rounded-2xl border border-emerald-600/60 bg-emerald-950/40 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Enquiry Recorded Successfully!</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {successData.message} Reference ID: <span className="font-mono text-white font-bold">{successData.enquiryId}</span>
                  </p>
                  <div className="pt-2">
                    <a
                      href={successData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also Send to WhatsApp for Instant Review</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMsg && (
                <div className="p-4 rounded-xl border border-rose-800/60 bg-rose-950/40 flex items-start gap-3 text-xs text-rose-200 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>{errorMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="customer-name" className="block text-xs font-medium text-zinc-300">
                      Customer Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="business-name" className="block text-xs font-medium text-zinc-300">
                      Business Name <span className="text-zinc-400">(Optional)</span>
                    </label>
                    <input
                      id="business-name"
                      type="text"
                      placeholder="e.g. Velvet Luxe Apparel"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-medium text-zinc-300">
                      WhatsApp Phone Number <span className="text-purple-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 9996375070"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-medium text-zinc-300">
                      Email Address <span className="text-zinc-400">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="block text-xs font-medium text-zinc-300">
                      Required Service <span className="text-purple-400">*</span>
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget range */}
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="block text-xs font-medium text-zinc-300">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      value={form.budgetRange}
                      onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label htmlFor="description" className="block text-xs font-medium text-zinc-300">
                    Project Description / Requirements <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    placeholder="Describe your goals, preferred video duration, ceremonies to cover, target audience, or specific requirements..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 leading-relaxed resize-y"
                  />
                </div>

                {/* Reference Link */}
                <div className="space-y-1.5">
                  <label htmlFor="reference-link" className="block text-xs font-medium text-zinc-300">
                    Reference Reel / Video Link <span className="text-zinc-400">(Optional)</span>
                  </label>
                  <input
                    id="reference-link"
                    type="url"
                    placeholder="https://instagram.com/reel/... or Google Drive link"
                    value={form.referenceLink}
                    onChange={(e) => setForm({ ...form, referenceLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                  >
                    {isSubmitting ? (
                      <span>Saving Enquiry to Queue...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Project Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
