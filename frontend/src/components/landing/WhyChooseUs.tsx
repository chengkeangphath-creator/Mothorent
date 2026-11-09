'use client';

import React from 'react';
import { Award } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { WHY_CHOOSE_US_FEATURES } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="why-choose-us">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#4A74A7]" />
          <span>{isKhmer ? 'ភាពជឿជាក់ និងគុណតម្លៃ' : 'Why Choose Motho Rent'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
          {isKhmer ? 'ទំនុកចិត្តសម្រាប់ដំណើរកម្សាន្តនៅកម្ពុជា' : 'Built for Tourists, Powered by Locals'}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {isKhmer
            ? 'យើងរចនាឡើងដើម្បីផ្តល់នូវបទពិសោធន៍ជួលម៉ូតូប្រកបដោយសុវត្ថិភាព តម្លៃច្បាស់លាស់ និងភាពងាយស្រួលបំផុត។'
            : 'Designed from the ground up for seamless motorcycle discovery, transparent deposits, and unforgettable Cambodian adventures.'}
        </p>
      </div>

      {/* 6 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {WHY_CHOOSE_US_FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

    </section>
  );
}
