import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const TermsPage: React.FC = () => {
  const { config } = useConfig();

  return (
    <div className="py-12 md:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
          Legal Agreement
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: October 2026 · Official Terms of Service for Reel Spark Creative Agency
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <span>1. Acceptance of Terms & Engagement Overview</span>
          </h2>
          <p>
            Welcome to {config.brand.name} ("Reel Spark", "we", "us", or "our"). By commissioning any creative service, purchasing video reels, placing custom design orders, or communicating via WhatsApp (+91 9996375070) and our official website, you ("Customer", "Client", or "User") agree to be bound by these Terms and Conditions in full.
          </p>
          <p>
            Reel Spark provides specialized digital creative services, including but not limited to AI-powered marketing advertisements, wedding ceremony and function invitation reels, 3D product commercial visuals, graphic cards, and website design solutions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            2. Scope, Deliverables & Upfront Quotation
          </h2>
          <p>
            All listed prices on the website represent initial starting rates. Before any creative engagement or order is formally accepted, the specific project scope, expected duration, exact deliverables, agreed turnaround timeline, and total price will be clearly communicated and mutually approved.
          </p>
          <p>
            Work will only commence upon mutual confirmation and receipt of agreed upfront fees. Any subsequent requests for additional scenes, extra duration, new variations, or out-of-scope modifications will be quoted as separate add-ons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            3. Customer Asset Permissions & Accuracy Obligations
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>
              <strong className="text-white">Rights & Permissions:</strong> The Customer warrants that they own, or hold all lawful permissions, copyright clearances, and likeness consents for all photographs, trademarks, audio tracks, brand assets, product footage, and portraits supplied to Reel Spark.
            </li>
            <li>
              <strong className="text-white">Accuracy of Details:</strong> The Customer is solely responsible for verifying the accuracy of all submitted dates, couple names, venue addresses, product specifications, discount codes, and textual information.
            </li>
            <li>
              <strong className="text-white">Pre-Approval Review:</strong> Customers must rigorously review spelling, grammar, event dates, and visual details on draft renders prior to granting final delivery approval.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            4. Turnaround Timelines & Delivery
          </h2>
          <p>
            Delivery timelines depend upon the agreed project scope and prompt provision of necessary customer assets. Typical delivery for single ceremony reels is 24 to 48 business hours upon receipt of all photographs and text; commercial video ads and custom 3D animations generally require 2 to 5 business days. Timelines are estimates provided in good faith and confirmed prior to order acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            5. Revisions Policy
          </h2>
          <p>
            Each creative package includes specified revision rounds (e.g., text corrections, timing adjustments, music balance) within the boundaries of the original project brief. A revision does not include a complete rewrite of the creative direction, substitution of core photos once rendered, or altering agreed script structures after rendering.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            6. Portfolio & Publicity Rights
          </h2>
          <p>
            Reel Spark takes client privacy seriously. We respect non-disclosure requests and will only feature completed customer deliverables, commercial ads, or wedding reels in our public marketing showcase, portfolio gallery, or on our Instagram (@Reelspk.ai) where explicit customer permission has been granted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            7. Limitation of Liability & Consumer Rights
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Reel Spark shall not be liable for any indirect, incidental, or consequential damages resulting from delays caused by third-party platforms, social media algorithms, or missing client assets. Nothing in these Terms limits or excludes statutory consumer guarantees that cannot be lawfully excluded under applicable consumer protection legislation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            8. Governing Law & Contact
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. For questions or notices regarding these Terms, please contact us on WhatsApp at +91 9996375070 or via email at {config.brand.email}.
          </p>
        </section>
      </div>
    </div>
  );
};
