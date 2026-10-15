import React from 'react';
import { Lock, Shield, Eye, Trash2, ArrowUpRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const PrivacyPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();

  return (
    <div className="py-12 md:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
          Data Governance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: October 2026 · Privacy & Data Protection Policy for Reel Spark
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            1. Overview & Commitment
          </h2>
          <p>
            {config.brand.name} ("Reel Spark", "we", "our") respects the privacy of our customers and visitors. This Privacy Policy details the types of personal information and creative assets we collect when you use our website, submit project inquiries, or interact with us via WhatsApp (+91 9996375070), and how that data is safeguarded.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            2. Information We Collect
          </h2>
          <div className="space-y-3">
            <div>
              <strong className="text-white">A. Contact & Identity Information:</strong>
              <p className="text-xs text-zinc-400 mt-1">
                When submitting an enquiry form or messaging us on WhatsApp, you provide your name, business name, WhatsApp contact number, email address, and preferred service requirements.
              </p>
            </div>
            <div>
              <strong className="text-white">B. Project Assets & Creative Media:</strong>
              <p className="text-xs text-zinc-400 mt-1">
                For video and graphic production, you may provide couple photographs, family pictures, event dates, brand logos, product images, reference reels, and textual descriptions.
              </p>
            </div>
            <div>
              <strong className="text-white">C. Communication & Inquiry Logs:</strong>
              <p className="text-xs text-zinc-400 mt-1">
                Records of project briefs, revision notes, approval confirmations, and timestamps associated with your commissioned orders.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 text-xs">
            <li>To review your creative project requirements and provide accurate, itemized quotations.</li>
            <li>To produce, edit, animate, and deliver your customized video reels, advertisements, and graphics.</li>
            <li>To communicate draft milestones, solicit revision requests, and deliver final approved deliverables.</li>
            <li>To maintain internal order records and support future re-orders or additional function add-ons.</li>
            <li>We do NOT sell, rent, monetize, or trade your personal information or submitted media to data brokers or third-party advertisers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            4. Asset Storage & Security
          </h2>
          <p>
            We enforce strict access controls. Client photos, wedding memories, and proprietary product concepts are held only on secured production workstations and encrypted cloud drives solely for the duration required to complete rendering, revisions, and backup retrieval.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            5. Your Data Rights & Deletion Requests
          </h2>
          <p>
            You have the right to access the personal information we hold about you and request its correction or complete deletion from our production archives after your final deliverables have been accepted.
          </p>
          <p>
            To request asset deletion or update your records, simply message our privacy officer on WhatsApp at <span className="font-mono text-white">+91 9996375070</span> or email <span className="font-mono text-white">{config.brand.email}</span> with your project name or order date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            6. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy periodically to reflect procedural or regulatory updates. Continued engagement with Reel Spark following updates constitutes acceptance of the amended policy.
          </p>
        </section>
      </div>
    </div>
  );
};
