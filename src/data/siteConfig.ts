export interface PriceItem {
  id: string;
  name: string;
  category: 'wedding' | 'marketing' | 'video' | 'design' | 'ugc';
  price: number;
  priceDisplay: string;
  duration?: string;
  description: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  deliverables: string[];
  startingPrice: string;
  whatsappMessage: string;
  iconName: string;
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Marketing Ads' | 'Product Videos' | 'Wedding Invitations' | 'Graphic Design' | 'AI Videos' | 'Influencer and UGC-Style Ads' | 'Website Projects';
  description: string;
  deliverable: string;
  image: string;
  whatsappMessage: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing & Orders' | 'Delivery & Revisions' | 'Technical & Assets';
}

export interface SiteConfig {
  brand: {
    name: string;
    instagramHandle: string;
    instagramUrl: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    mainTagline: string;
    supportingTagline: string;
    email: string;
    location: string;
  };
  hero: {
    headline: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    defaultWhatsappMessage: string;
  };
  weddingPricing: PriceItem[];
  creativePricing: PriceItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  faqs: FAQItem[];
}

export const initialSiteConfig: SiteConfig = {
  brand: {
    name: "Reel Spark",
    instagramHandle: "@Reelspk.ai",
    instagramUrl: "https://instagram.com/Reelspk.ai",
    whatsappNumber: "919996375070",
    whatsappDisplay: "+91 9996375070",
    mainTagline: "Your Vision. Our Creativity. Limitless Possibilities.",
    supportingTagline: "We Turn Ideas Into Scroll-Stopping Experiences.",
    email: "contact@reelspark.ai",
    location: "India & Worldwide Online Delivery",
  },
  hero: {
    headline: "Creative Ads. Powerful Videos. Extraordinary Brands.",
    description: "Reel Spark helps businesses stand out with AI-powered advertisements, premium product videos, creative designs and customized wedding invitations.",
    primaryCtaText: "Get a Quote",
    secondaryCtaText: "Explore Our Work",
    defaultWhatsappMessage: "Hello Reel Spark, I am interested in your creative and marketing services. Please share available packages and pricing.",
  },
  weddingPricing: [
    {
      id: "w-wedding",
      name: "Wedding Reel",
      category: "wedding",
      price: 499,
      priceDisplay: "₹499",
      duration: "15–20 seconds",
      description: "Grand wedding announcement or cinematic celebration reel with custom music and couple titles.",
      popular: true,
    },
    {
      id: "w-haldi",
      name: "Haldi Function Reel",
      category: "wedding",
      price: 299,
      priceDisplay: "₹299",
      duration: "10–15 seconds",
      description: "Vibrant yellow-themed high-energy invitation reel with personalized ceremony details.",
    },
    {
      id: "w-roka",
      name: "Roka Ceremony Reel",
      category: "wedding",
      price: 349,
      priceDisplay: "₹349",
      duration: "15–18 seconds",
      description: "Elegant formal blessing and family announcement video reel.",
    },
    {
      id: "w-engagement",
      name: "Engagement / Ring Ceremony Reel",
      category: "wedding",
      price: 399,
      priceDisplay: "₹399",
      duration: "approx. 15 seconds",
      description: "Romantic ring ceremony invite reel with smooth photo transitions and custom typography.",
    },
    {
      id: "w-mehendi",
      name: "Mehendi Function Reel",
      category: "wedding",
      price: 299,
      priceDisplay: "₹299",
      duration: "10–15 seconds",
      description: "Festive, colorful celebration invitation reel with traditional rhythm & motifs.",
    },
    {
      id: "w-extra-func",
      name: "Additional Function Add-on",
      category: "wedding",
      price: 150,
      priceDisplay: "₹150 extra",
      duration: "+8–10 seconds",
      description: "Add an extra function (Sangeet, Cocktail, Reception) into the same single video.",
    },
    {
      id: "w-combined",
      name: "Combined Wedding Package",
      category: "wedding",
      price: 1499,
      priceDisplay: "₹1,499",
      duration: "approx. 40 seconds",
      description: "All-in-one comprehensive cinematic itinerary reel covering all pre-wedding and wedding events.",
      popular: true,
    },
  ],
  creativePricing: [
    {
      id: "c-basic-ads",
      name: "Basic Ads",
      category: "marketing",
      price: 800,
      priceDisplay: "Starting at ₹800",
      duration: "20-second ads",
      description: "High-impact 20-second video advertisement formatted for Instagram Reels and Shorts.",
    },
    {
      id: "c-marketing-ads",
      name: "Marketing Ads",
      category: "marketing",
      price: 1000,
      priceDisplay: "Starting at ₹1,000",
      duration: "20–30 seconds",
      description: "Targeted advertising creative optimized for paid social campaigns and lead generation.",
    },
    {
      id: "c-product-ads",
      name: "Product Ads",
      category: "video",
      price: 1000,
      priceDisplay: "Starting at ₹1,000",
      duration: "15–30 seconds",
      description: "Sleek product showcase video focusing on design details, features, and purchase appeal.",
    },
    {
      id: "c-influencer-ads",
      name: "Influencer Ads",
      category: "ugc",
      price: 1000,
      priceDisplay: "Starting at ₹1,000",
      duration: "15–30 seconds",
      description: "Influencer-style promotional video concept to drive authentic engagement.",
    },
    {
      id: "c-problem-solving",
      name: "Problem-Solving Ads",
      category: "marketing",
      price: 2000,
      priceDisplay: "Starting at ₹2,000",
      duration: "30–45 seconds",
      description: "Hook-Problem-Solution narrative framework designed for maximum conversion on ad networks.",
      popular: true,
    },
    {
      id: "c-story-ads",
      name: "Story-Based Ads",
      category: "video",
      price: 3000,
      priceDisplay: "Starting at ₹3,000",
      duration: "45–60 seconds",
      description: "Emotional storytelling narrative video building long-term brand recall and trust.",
    },
    {
      id: "c-save-date",
      name: "Save-the-Date Invitations",
      category: "wedding",
      price: 2000,
      priceDisplay: "Starting at ₹2,000",
      duration: "30–45 seconds",
      description: "Cinematic digital invitation video with premium motion transitions and audio design.",
    },
    {
      id: "c-custom-invites",
      name: "Customized Invitations",
      category: "wedding",
      price: 5000,
      priceDisplay: "Starting at ₹5,000",
      duration: "45–90 seconds",
      description: "Bespoke digital invitation experience customized to couple themes, stories, and heritage.",
    },
    {
      id: "c-face-matching",
      name: "Face-Matching Invitations",
      category: "wedding",
      price: 5000,
      priceDisplay: "Starting at ₹5,000",
      duration: "30–60 seconds",
      description: "Advanced AI portrait-matching aesthetic animations turning your photos into royal characters.",
    },
    {
      id: "c-birthday-invites",
      name: "Birthday Invitations",
      category: "wedding",
      price: 1500,
      priceDisplay: "₹1,500",
      duration: "20–30 seconds",
      description: "Vibrant theme-based birthday party video invitation with personalized photos.",
    },
    {
      id: "c-pdf-invites",
      name: "PDF Invitations",
      category: "design",
      price: 250,
      priceDisplay: "₹250 per slide",
      duration: "High-Res PDF",
      description: "Luxury digital PDF card formatted with clickable location, RSVP, and itinerary links.",
    },
    {
      id: "c-graphic-cards",
      name: "Graphic Cards",
      category: "design",
      price: 249,
      priceDisplay: "₹249 per image",
      duration: "Static Graphic",
      description: "High-resolution promotional poster, social post, or product graphic banner.",
    },
    {
      id: "c-ugc-ads",
      name: "UGC Ads",
      category: "ugc",
      price: 5000,
      priceDisplay: "Starting at ₹5,000",
      duration: "Subject to arrangement",
      description: "Authentic user-generated content style ads, subject to agreed product and creator arrangement.",
    },
    {
      id: "c-shop-matching",
      name: "Shop-Matching Videos",
      category: "video",
      price: 5000,
      priceDisplay: "Starting at ₹5,000",
      duration: "Bespoke Production",
      description: "Tailored video production matched to your physical retail store, showroom, or salon ambiance.",
    },
  ],
  services: [
    {
      id: "ai-marketing-ads",
      title: "AI Marketing Advertisements",
      shortDesc: "High-converting ad creatives engineered for social media performance and customer acquisition.",
      fullDesc: "We craft targeted advertising creatives that stop the scroll and turn viewers into buyers. Using modern generative visual workflows, we produce multiple hook variations, benefit spotlights, and problem-solving angles.",
      category: "Marketing Ads",
      deliverables: [
        "Promotional ads for businesses",
        "Product advertising videos",
        "Story-based advertisements",
        "Problem-solving advertisements",
        "Brand awareness creatives",
        "Social media advertising creatives"
      ],
      startingPrice: "Starting at ₹800",
      whatsappMessage: "Hello Reel Spark, I am interested in your AI Marketing Advertisements. I'd like to discuss promotional ad concepts for my business.",
      iconName: "Sparkles",
      badge: "High Conversion",
    },
    {
      id: "ai-video-production",
      title: "AI Video Production",
      shortDesc: "Cinematic commercial videos, product showcases, and viral reels built with cutting-edge AI tools.",
      fullDesc: "Transform raw footage or product concepts into polished commercials. We handle creative direction, AI voiceovers, motion design, and sound mastering for vertical and widescreen formats.",
      category: "AI Videos",
      deliverables: [
        "AI-generated promotional videos",
        "Product showcase videos",
        "Instagram Reels and YouTube Shorts",
        "Animated promotional videos",
        "AI voiceovers and creative storytelling"
      ],
      startingPrice: "Starting at ₹1,000",
      whatsappMessage: "Hello Reel Spark, I am interested in AI Video Production services. Please share video showcase packages and turnaround times.",
      iconName: "Video",
    },
    {
      id: "product-ecommerce-creatives",
      title: "Product & E-Commerce Creatives",
      shortDesc: "Studio-grade product visuals, e-commerce catalog renders, and high-impact showcase reels.",
      fullDesc: "Elevate your product presentation without paying for expensive physical studio sets. We create clean, 3D-enhanced product imagery, floating showcase videos, and catalog assets tailored for Amazon, Shopify, and Instagram Shop.",
      category: "Product Videos",
      deliverables: [
        "Product promotional videos",
        "Product image creatives",
        "E-commerce promotional content",
        "Catalog and promotional designs"
      ],
      startingPrice: "Starting at ₹1,000",
      whatsappMessage: "Hello Reel Spark, I would like to get product and e-commerce video creatives made for my products. Please share pricing details.",
      iconName: "ShoppingBag",
    },
    {
      id: "wedding-invitations",
      title: "Wedding Invitations & Event Reels",
      shortDesc: "Royal, customized digital invitation reels, save-the-dates, and face-matched ceremony videos.",
      fullDesc: "Celebrate your biggest moments with unforgettable digital invitations. From single ceremony reels (Haldi, Mehendi, Roka, Engagement, Wedding) to multi-day itineraries and personalized AI face-matching concepts.",
      category: "Wedding Invitations",
      deliverables: [
        "Customized wedding invitation videos",
        "Save-the-date invitations",
        "Birthday invitations",
        "PDF invitations with interactive links",
        "Face-matching invitation concepts",
        "Wedding function invitation videos"
      ],
      startingPrice: "Starting at ₹299",
      whatsappMessage: "Hello Reel Spark, I am looking for wedding function reels and customized invitation videos. Please share your catalog and sample reels.",
      iconName: "HeartHandshake",
      badge: "Starting ₹299",
    },
    {
      id: "graphic-design",
      title: "Graphic Design & Brand Creatives",
      shortDesc: "Pixel-perfect promotional posters, social media banners, and commercial marketing cards.",
      fullDesc: "Bold, modern graphics designed to reinforce your brand identity across all touchpoints. We produce print-ready and digital assets optimized for conversion, brand recall, and consistent social engagement.",
      category: "Graphic Design",
      deliverables: [
        "Promotional posters",
        "Product graphics",
        "Social media posts & carousel packs",
        "Marketing banners",
        "Business promotional creatives"
      ],
      startingPrice: "Starting at ₹249",
      whatsappMessage: "Hello Reel Spark, I need graphic design and marketing poster services. Can we discuss required formats and bundle rates?",
      iconName: "Palette",
    },
    {
      id: "influencer-ugc-ads",
      title: "Influencer & UGC-Style Ads",
      shortDesc: "Relatable, authentic-feeling user generated content and AI spokesperson commercial concepts.",
      fullDesc: "Consumers trust authentic peer recommendations. We craft UGC-style video concepts, AI presenter explainers, and relatable problem-solution storytelling designed to slash your customer acquisition costs.",
      category: "Influencer and UGC-Style Ads",
      deliverables: [
        "Influencer-style promotional concepts",
        "UGC-style advertisements",
        "AI presenter and spokesperson videos",
        "Product-focused storytelling"
      ],
      startingPrice: "Starting at ₹1,000",
      whatsappMessage: "Hello Reel Spark, I am interested in UGC-style advertisements and influencer concept reels. Please provide details on production.",
      iconName: "Users",
    },
    {
      id: "business-websites",
      title: "Business Websites & Landing Pages",
      shortDesc: "Sleek, lightning-fast digital storefronts and landing pages optimized for high conversion.",
      fullDesc: "Transform advertising traffic into paying customers with high-speed, modern websites. We design responsive, mobile-first business sites, product showcase hubs, and campaign landing pages with direct WhatsApp integration.",
      category: "Website Projects",
      deliverables: [
        "Business websites",
        "Service websites",
        "Product showcase websites",
        "Landing pages for advertising campaigns"
      ],
      startingPrice: "Custom Quote",
      whatsappMessage: "Hello Reel Spark, I would like to get a business website or high-converting landing page built. Let's discuss scope and timeline.",
      iconName: "Globe",
    },
  ],
  portfolio: [
    {
      id: "port-studio-production",
      title: "Next-Gen Commercial Editing Suite",
      category: "AI Videos",
      description: "Multi-camera promotional workflow utilizing real-time 3D motion tracking, high-definition color grading, and AI voice synchronization.",
      deliverable: "4K Commercial Video & Master Cut",
      image: "/src/assets/images/reelspark_hero_studio_1792022411199.jpg",
      whatsappMessage: "Hello Reel Spark, I saw your Commercial Editing Suite video project in the portfolio. I would like to enquire about similar video production.",
      featured: true,
    },
    {
      id: "port-velour-perfume",
      title: "Aura Arcane Luxury Perfume Commercial",
      category: "Product Videos",
      description: "High-contrast studio product commercial with liquid droplet dynamics, floating plinths, and bespoke sound design engineered for luxury e-commerce.",
      deliverable: "15s & 30s Product Ad Creatives",
      image: "/src/assets/images/reelspark_product_commercial_1792022411340.jpg",
      whatsappMessage: "Hello Reel Spark, I loved the Aura Arcane product video in your portfolio. Can you create a similar 3D commercial for my product?",
      featured: true,
    },
    {
      id: "port-royal-wedding",
      title: "Imperial Royal Wedding Video Invitation",
      category: "Wedding Invitations",
      description: "Bespoke midnight velvet and embossed gold foil invitation reel featuring animated royal crests, couple titles, and multi-function schedule.",
      deliverable: "40s Combined Wedding Reel & PDF Card",
      image: "/src/assets/images/reelspark_wedding_invitation_1792022412874.jpg",
      whatsappMessage: "Hello Reel Spark, I saw your Imperial Royal Wedding invitation reel in the portfolio. We are planning a wedding and want a similar customized video.",
      featured: true,
    },
    {
      id: "port-ugc-hydration",
      title: "Daily Sip UGC Hydration Ad Campaign",
      category: "Influencer and UGC-Style Ads",
      description: "Relatable lifestyle video reel with dynamic creator hook, product benefits breakdown, and seamless conversion call-to-action.",
      deliverable: "9:16 Vertical UGC Video Ad",
      image: "/src/assets/images/reelspark_ugc_social_ad_1792022413491.jpg",
      whatsappMessage: "Hello Reel Spark, I am interested in UGC-style video ads like the Daily Sip hydration campaign. Please share pricing and workflow.",
      featured: true,
    },
    {
      id: "port-saas-ad",
      title: "Problem-Solving B2B Service Promo",
      category: "Marketing Ads",
      description: "High-speed 30-second problem-agitate-solution video ad featuring punchy on-screen motion typography and clean product UI highlights.",
      deliverable: "Paid Social Video Package (1:1 & 9:16)",
      image: "/src/assets/images/reelspark_hero_studio_1792022411199.jpg",
      whatsappMessage: "Hello Reel Spark, I want to discuss a Problem-Solving B2B marketing ad campaign for my company.",
      featured: false,
    },
    {
      id: "port-poster-graphic",
      title: "Minimalist Brand Visual Identity Series",
      category: "Graphic Design",
      description: "Curated typography posters, social promotional banners, and visual asset system built for an upscale lifestyle retail launch.",
      deliverable: "Set of 6 Digital Graphics & Print Posters",
      image: "/src/assets/images/reelspark_product_commercial_1792022411340.jpg",
      whatsappMessage: "Hello Reel Spark, I need graphic posters and brand graphics similar to your Minimalist Brand Visual Identity project.",
      featured: false,
    },
    {
      id: "port-landing-page",
      title: "Direct-to-Consumer Product Showcase Hub",
      category: "Website Projects",
      description: "High-performance digital landing page featuring interactive product configurator, instant WhatsApp enquiry, and 99+ mobile performance score.",
      deliverable: "Full-Stack Responsive Web Application",
      image: "/src/assets/images/reelspark_hero_studio_1792022411199.jpg",
      whatsappMessage: "Hello Reel Spark, I am looking to build a high-converting product showcase website like the one in your portfolio.",
      featured: false,
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How do I place an order with Reel Spark?",
      answer: "Placing an order is straightforward: choose your desired service or package, click 'Discuss Your Project' or 'Get a Quote', and connect directly with us on WhatsApp (+91 9996375070). We will review your requirements, confirm the exact deliverables, turnaround time, and price before any work begins.",
      category: "Pricing & Orders",
    },
    {
      id: "faq-2",
      question: "What are your starting prices for wedding function reels?",
      answer: "Our wedding reels start at ₹299 for Haldi or Mehendi functions (10–15 seconds), ₹349 for Roka (15–18 seconds), ₹399 for Engagement (approx. 15 seconds), and ₹499 for Wedding reels (15–20 seconds). You can combine multiple functions into one comprehensive reel with our Combined Wedding Package at ₹1,499 (approx. 40 seconds) or add individual functions for ₹150 extra each.",
      category: "Pricing & Orders",
    },
    {
      id: "faq-3",
      question: "What is your typical turnaround time?",
      answer: "Turnaround time depends on the complexity and scope of the project. Wedding function reels are typically completed in 24–48 hours upon receiving all required details and photos. Marketing video ads and custom animations generally take 2–5 business days. Exact timelines are confirmed prior to order acceptance.",
      category: "Delivery & Revisions",
    },
    {
      id: "faq-4",
      question: "How do revisions work?",
      answer: "Every agreed package includes revisions for text, timings, and adjustments within the agreed original creative scope. Any revisions, extra work, or new deliverables outside the original brief are quoted transparently before proceeding.",
      category: "Delivery & Revisions",
    },
    {
      id: "faq-5",
      question: "What assets do I need to provide?",
      answer: "Depending on your project, you provide your product photos, logos, couple/family photos, ceremony dates, event venues, and any reference styles you love. You must have full rights or permissions to use the media assets you provide to us.",
      category: "Technical & Assets",
    },
    {
      id: "faq-6",
      question: "What is your cancellation and refund policy?",
      answer: "Because our creative services involve personalized custom production and dedicated artist time, cancellations are not permitted once an order has been confirmed and production has commenced. Refunds and returns are not applicable to digital creative deliverables once work has begun, subject to applicable law.",
      category: "Pricing & Orders",
    },
    {
      id: "faq-7",
      question: "Can Reel Spark produce white-label creatives for other marketing agencies?",
      answer: "Yes! We partner with digital marketing agencies, consultants, and event management firms worldwide to deliver white-label video production, motion reels, and ad graphics under your own agency branding.",
      category: "General",
    },
  ],
};
