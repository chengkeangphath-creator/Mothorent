'use client';

import React from 'react';
import { Search, CalendarCheck, Send, KeyRound, Sparkles } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorks() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-6 h-6 text-[#4A74A7]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-[#4A74A7]" />;
      case 'Send':
        return <Send className="w-6 h-6 text-[#4A74A7]" />;
      case 'KeyRound':
        return <KeyRound className="w-6 h-6 text-[#4A74A7]" />;
      default:
        return <Search className="w-6 h-6 text-[#4A74A7]" />;
    }
  };

  return (
    <section className="bg-slate-100/70 dark:bg-[#0C1E36] py-20 border-y border-slate-200 dark:border-[#1E3B60] transition-colors" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#4A74A7]" />
            <span>{isKhmer ? 'ដំណើរការងាយៗ ៤ ជំហាន' : 'Simple 4-Step Process'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
            {isKhmer ? 'របៀបជួលម៉ូតូជាមួយ Motho Rent' : 'How Motho Rent Works'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            {isKhmer
              ? 'គ្មានភាពស្មុគស្មាញ គ្មានការដកហូតលិខិតឆ្លងដែន និងទទួលបានការបញ្ជាក់ភ្លាមៗ។'
              : 'Book your ride in minutes. Transparent pricing, direct owner chat, and zero passport hostage.'}
          </p>
        </div>

        {/* 4 Steps Grid with Desktop Connecting Line */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-slate-300 dark:bg-[#1E3B60] -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-[#142A44] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E3B60] shadow-sm hover:shadow-2xl hover:border-[#4A74A7] transition-all flex flex-col items-center text-center space-y-4 group"
              >
                {/* Step Circle & Icon */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {getStepIcon(step.iconName)}
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#4A74A7] text-white font-black text-xs flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-black text-[#081426] dark:text-white group-hover:text-[#4A74A7] dark:group-hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? step.titleKh : step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isKhmer ? step.descriptionKh : step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
