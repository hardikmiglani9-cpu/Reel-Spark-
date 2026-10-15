import React from 'react';
import { AlertTriangle, Clock, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const RefundPolicyPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();

  return (
    <div className="py-12 md:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
          Commercial Policies
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: October 2026 · Digital Creative Services Terms for Reel Spark
        </p>
      </div>

      {/* Main Notice Banner */}
      <div className="p-5 rounded-2xl border border-purple-900/60 bg-purple-950/20 space-y-2 text-xs text-purple-200">
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          <AlertTriangle className="w-4 h-4 text-purple-400" />
          <span>Core Digital Services Notice</span>
        </div>
        <p className="leading-relaxed">
          Because Reel Spark provides bespoke, customized digital media production involving immediate dedication of specialized motion artists and computational resources, cancellations and refunds are subject to the specific operational rules outlined below.
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <span>1. Cancellation Rules</span>
          </h2>
          <p>
            Cancellation of a project is not permitted once an order has been mutually confirmed, requirements have been submitted, and creative production work has commenced.
          </p>
          <p>
            Before project commencement, our team confirms the exact scope, duration, deliverables, and starting pricing with you via WhatsApp or written quotation. Once payment is made and production commences, production hours are immediately allocated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            2. Refund Policy
          </h2>
          <p>
            Under our standard business policy, refunds are not available once creative work has begun or preliminary drafts have been rendered.
          </p>
          <p>
            Digital deliverables cannot be recalled, returned, or un-downloaded once delivered. Therefore, returns and product exchanges are not applicable to custom digital creative services.
          </p>
          <p className="text-xs text-zinc-400 border-l-2 border-zinc-700 pl-3 italic">
            Note: Nothing in this policy is intended to override or exclude any non-waivable statutory rights or mandatory consumer protection guarantees that apply under relevant consumer protection laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            3. Customer Review Responsibilities & Spelling Approval
          </h2>
          <p>
            To ensure complete satisfaction with your final video or graphic deliverable:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-300">
            <li>
              Customers must furnish correct names, ceremony dates, event timings, product specs, brand colors, and high-resolution media at the start of the project.
            </li>
            <li>
              Draft preview videos are provided for customer review. Customers must examine all spelling, names, timings, and dates thoroughly before granting final approval.
            </li>
            <li>
              Reel Spark is not responsible for errors present in final deliveries if the erroneous text was provided directly by the client or confirmed during draft preview review without notification.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            4. Revisions & Additional Deliverables
          </h2>
          <p>
            Every package includes revisions within the boundaries of the original approved brief (such as text adjustments, font size tweaks, or music timing synchronization). Any extra work, new functions, duration extensions, or new concept directions will be priced and agreed upon prior to execution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            5. Asset Rights & Public Portfolio Display
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-300">
            <li>
              The customer must possess lawful rights, licenses, or explicit permissions for any photographs, music requests, or trademarks provided for production.
            </li>
            <li>
              Reel Spark must have customer permission before featuring any customer deliverable, wedding video, or private footage in its public showcase or on its social media channels.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-white">
            6. Inquiries & Order Support
          </h2>
          <p>
            If you have any questions regarding your active project, deliverables, or this policy, please reach out directly to our production coordinator on WhatsApp:
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hello Reel Spark, I have an inquiry regarding my project deliverables and order policy.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors"
            >
              <span>Chat with Support (+91 9996375070)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
