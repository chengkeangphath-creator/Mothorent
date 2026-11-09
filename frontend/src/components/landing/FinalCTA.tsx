'use client';

import React from 'react';
import Link from 'next/link';
import { Search, UserPlus, Sparkles, Bike } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export default function FinalCTA() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Container in Farnegar Deep Navy (#142A44) with Night Navy (#081426) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#142A44] via-[#081426] to-[#142A44] border border-[#1E3B60] text-white p-8 sm:p-14 text-center shadow-2xl space-y-6">
        
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4A74A7]/25 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081426] border border-[#1E3B60] text-xs font-bold text-[#DCEAF7]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A74A7]" />
            <span>{isKhmer ? 'ចាប់ផ្តើមដំណើរកម្សាន្តរបស់អ្នក' : 'Start Your Adventure Today'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {isKhmer ? (
              <>
                ត្រៀមខ្លួនសម្រាប់ដំណើរកម្សាន្ត <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#4A74A7]">
                  នៅលើកង់ពីរនៅកម្ពុជាហើយឬនៅ?
                </span>
              </>
            ) : (
              <>
                Ready to Start Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#4A74A7]">
                  Cambodian Motorcycle Adventure?
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isKhmer
              ? 'ស្វែងរកម៉ូតូជួលគ្រប់ខេត្តក្រុង ពិនិត្យតម្លៃច្បាស់លាស់ និងកក់ទុកជាមុនដោយឥតគិតថ្លៃ។'
              : 'Browse 500+ verified scooters and dual-sport bikes across all 25 provinces. No account needed to explore.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              href="/motorcycles"
              variant="ice"
              size="lg"
              leftIcon={<Search className="w-4 h-4 text-[#142A44]" />}
              className="shadow-xl w-full sm:w-auto"
            >
              {isKhmer ? 'ស្វែងរកម៉ូតូឥឡូវនេះ' : 'Search Motorcycles'}
            </Button>

            <Button
              href="/register"
              variant="primary"
              size="lg"
              leftIcon={<UserPlus className="w-4 h-4" />}
              className="shadow-xl shadow-[#4A74A7]/30 w-full sm:w-auto"
            >
              {isKhmer ? 'ចុះឈ្មោះបង្កើតគណនី' : 'Create Free Account'}
            </Button>
          </div>
        </div>

      </div>

    </section>
  );
}
