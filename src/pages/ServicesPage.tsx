import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Video, 
  ShoppingBag, 
  HeartHandshake, 
  Palette, 
  Users, 
  Globe, 
  CheckCircle2, 
  MessageCircle, 
  ShieldAlert, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ServicesPage: React.FC = () => {
  const { config, getWhatsAppUrl } = useConfig();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'Video': return <Video className="w-6 h-6 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-amber-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-emerald-400" />;
      case 'Users': return <Users className="w-6 h-6 text-indigo-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-blue-400" />;
      default: return <Sparkles className="w-6 h-6 text-purple-400" />;
    }
  };

  const getServiceImage = (serviceId: string) => {
    switch (serviceId) {
      case 'ai-marketing-ads':
      case 'ai-video-production':
      case 'business-websites':
        return '/src/assets/images/reelspark_hero_studio_1792022411199.jpg';
      case 'product-ecommerce-creatives':
      case 'graphic-design':
        return '/src/assets/images/reelspark_product_commercial_1792022411340.jpg';
      case 'wedding-invitations':
        return '/src/assets/images/reelspark_wedding_invitation_1792022412874.jpg';
      case 'influencer-ugc-ads':
        return '/src/assets/images/reelspark_ugc_social_ad_1792022413491.jpg';
      default:
        return '/src/assets/images/reelspark_hero_studio_1792022411199.jpg';
    }
  };

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-md">
            Production & Strategy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Our Creative Services
          </h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            High-converting commercial video ads, bespoke wedding reels, 3D product visuals, and custom digital storefronts. Every service is tailored with obsessive care.
          </p>

          {/* Mandatory Order Notice */}
          <div className="p-4 rounded-xl border border-purple-800/60 bg-purple-950/20 flex items-start gap-3 text-xs text-purple-200">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Order Transparency Guarantee:</span> The exact project scope, deliverables, turnaround time, and price are mutually confirmed before an order is formally accepted and commenced.
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {config.services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-3xl border border-zinc-800 bg-[#0d0d12] p-6 sm:p-8 lg:p-10 transition-all hover:border-zinc-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left/Right Text Column */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800/90 flex items-center justify-center border border-zinc-700/60">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                          {service.category}
                        </span>
                        <h2 className="text-2xl font-bold font-display text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-purple-300">
                        {service.startingPrice}
                      </div>
                      <div className="text-[11px] text-zinc-400">Starting Rate</div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Standard Deliverables Included:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-4">
                    <a
                      href={getWhatsAppUrl(service.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/20 whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Discuss Your Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Fast Turnaround Confirmed Upfront</span>
                    </div>
                  </div>
                </div>

                {/* Media Preview Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-4/3 group shadow-xl">
                    <img
                      src={getServiceImage(service.id)}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-semibold text-white">{service.title}</div>
                      <div className="text-[11px] text-zinc-300">Reel Spark Production Catalog</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl border border-zinc-800 bg-[#0e0e14] text-center space-y-4">
          <h3 className="text-xl font-bold font-display text-white">
            Have a custom requirement or agency white-label enquiry?
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto">
            We provide custom production solutions for creative agencies, brands with large SKU catalogs, and multi-day destination wedding celebrations.
          </p>
          <a
            href={getWhatsAppUrl("Hello Reel Spark, I have a custom creative requirement / white-label agency inquiry. Can we schedule a discussion?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 9996375070)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
