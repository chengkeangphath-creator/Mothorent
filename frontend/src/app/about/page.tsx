import React from 'react';
import Link from 'next/link';
import { 
  Bike, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  Heart, 
  CheckCircle, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const faqs = [
    {
      q: "Do I need a Cambodian driver's license to rent a motorcycle?",
      a: "According to Cambodian law, motorcycles with engine capacities up to 125cc (such as Honda Scoopy, Wave, and Click 125) generally do not require a Cambodian driving license for travelers. For engines above 125cc, an International Driving Permit (IDP) or Cambodian driver's license is required."
    },
    {
      q: "Is wearing a helmet mandatory in Cambodia?",
      a: "Yes! Cambodian traffic law strictly requires both drivers and passengers to wear certified motorcycle helmets at all times. Every rental through Motho Rent includes 2 clean, inspected helmets free of charge."
    },
    {
      q: "How does the refundable security deposit work?",
      a: "Owners typically hold a small security deposit ($40 to $100 depending on the bike). This is fully refunded immediately upon returning the motorcycle in the same condition with a full tank of fuel."
    },
    {
      q: "Can I ride between different Cambodian provinces?",
      a: "Yes! Cambodia has picturesque highways (like National Road 3 from Phnom Penh to Kampot, or scenic coastal roads between Kep and Sihanoukville). Please let the owner know if you plan multi-province long-distance touring."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A74A7]/10 dark:bg-[#4A74A7]/20 text-[#4A74A7] dark:text-[#DCEAF7] font-bold text-xs border border-[#4A74A7]/20">
          <Bike className="w-4 h-4" />
          <span>About Motho Rent Cambodia</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Empowering Travelers & Local Motorcycle Owners in Cambodia
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          Motho Rent is Cambodia&apos;s leading location-based motorcycle rental platform, bridging the gap between international tourists, local travelers, and trusted motorcycle owners across all 25 provinces.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-8 border border-slate-200/80 dark:border-[#1E3B60] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#4A74A7]/15 dark:bg-[#081426] text-[#4A74A7] dark:text-[#DCEAF7] flex items-center justify-center border border-[#4A74A7]/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Safety & Verification First</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Every motorcycle owner is verified with government ID or registered business documents. Bikes undergo regular brake, tyre, and oil checks.
          </p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-8 border border-slate-200/80 dark:border-[#1E3B60] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Google Maps Precision</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            No wandering aimlessly looking for rental shops. Find motorcycles parked right next to your hotel, hostel, or bus terminal in any province.
          </p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-8 border border-slate-200/80 dark:border-[#1E3B60] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Travel Assistance</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Our bilingual (Khmer & English) AI assistant provides instant route advice, weather checks, local laws, and tailored bike recommendations.
          </p>
        </div>
      </div>

      {/* Rental Rules & FAQs */}
      <div className="bg-[#0C1E36] dark:bg-[#081426] text-white rounded-3xl p-8 sm:p-12 border border-slate-200/10 dark:border-[#1E3B60] space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#DCEAF7] uppercase tracking-wider">
            Important Information
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Cambodia Motorcycle Rental FAQ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-2xl bg-[#142A44]/90 dark:bg-[#142A44] border border-[#1E3B60] space-y-2">
              <h4 className="font-bold text-sm text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#DCEAF7] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ready to Hit the Road?</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Explore Angkor temples, Bokor summit, or Phnom Penh riverside today.</p>
        <Link
          href="/motorcycles"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl btn-glow text-white font-black text-xs shadow-2xl transition-all"
        >
          <span>Browse Available Fleet</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
