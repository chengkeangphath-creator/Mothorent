'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function FAQAccordion() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="faq">
      
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#4A74A7]" />
          <span>{isKhmer ? 'សំណួរដែលសួរញឹកញាប់' : 'Frequently Asked Questions'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
          {isKhmer ? 'អ្វីៗដែលអ្នកត្រូវដឹងមុនពេលជួល' : 'Cambodia Motorcycle Rental FAQ'}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {isKhmer
            ? 'ព័ត៌មានលម្អិតអំពីច្បាប់ចរាចរណ៍ ប្រាក់កក់ មួកសុវត្ថិភាព និងការធានាលើការធ្វើដំណើរ។'
            : 'Answers regarding local driving permits, deposit choices, free helmets, and 24/7 roadside assistance.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-[#142A44] border-[#4A74A7] shadow-xl ring-1 ring-[#4A74A7]/30'
                  : 'bg-white dark:bg-[#142A44] border-slate-200 dark:border-[#1E3B60] hover:border-[#4A74A7]/60'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-black transition-colors ${
                  isOpen
                    ? 'text-[#4A74A7] dark:text-[#DCEAF7]'
                    : 'text-[#081426] dark:text-white'
                }`}>
                  {isKhmer ? item.questionKh : item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  isOpen
                    ? 'bg-[#4A74A7] text-white rotate-180 shadow-md'
                    : 'bg-slate-100 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-[#DCEAF7]'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#1E3B60]/80 animate-in fade-in duration-200">
                  {isKhmer ? item.answerKh : item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
