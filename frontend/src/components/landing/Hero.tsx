'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import SearchBox from './SearchBox';
import { TRUST_METRICS } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="relative min-h-[640px] flex items-center justify-center pt-16 pb-20 overflow-hidden bg-[#142A44] text-white">
      
      {/* Background Image with Farnegar Dark Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=80"
          alt="Cambodia Motorcycle Adventure Landscape"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform animate-pulse duration-[12000ms]"
        />
        {/* Farnegar Dark Navy Gradient Overlays (#142A44 and #081426) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-[#142A44]/90 to-[#142A44]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A74A7]/30 via-transparent to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Top Assurance Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081426]/90 border border-[#1E3B60] text-xs font-semibold text-[#DCEAF7] backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-[#DCEAF7]" />
          <span>
            {isKhmer 
              ? 'វេទិកាជួលម៉ូតូឈានមុខគេនៅកម្ពុជា • គ្របដណ្តប់ខេត្តទាំង ២៥' 
              : 'Cambodia’s Premier Motorcycle Rental Platform • 25 Provinces Covered'}
          </span>
        </div>

        {/* Headlines with Farnegar Gradient */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            {isKhmer ? (
              <>
                ស្វែងយល់ពីកម្ពុជា <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#4A74A7]">
                  នៅលើកង់ពីរដ៏អស្ចារ្យ
                </span>
              </>
            ) : (
              <>
                Explore Cambodia <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#4A74A7]">
                  on Two Wheels
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {isKhmer
              ? 'ជួលម៉ូតូដោយទំនុកចិត្តពីម្ចាស់ម៉ូតូក្នុងស្រុកផ្ទាល់។ ពីម៉ូតូអូតូសម្រាប់ដើរមើលប្រាសាទអង្គរវត្ត រហូតដល់ម៉ូតូឡើងភ្នំបូកគោ និងជួរភ្នំក្រវាញ តម្លៃគិតជាដុល្លារ ($) ច្បាស់លាស់។'
              : 'Rent scooters and adventure motorbikes from trusted local owners. Transparent USD rates, verified pickups in Phnom Penh, Siem Reap, Kampot, and beyond.'}
          </p>
        </div>

        {/* Search Box Component */}
        <div className="pt-2">
          <SearchBox />
        </div>

        {/* Trust Indicators Metrics Below */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-[#1E3B60]/70">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={idx} className="p-2">
              <p className="text-2xl sm:text-3xl font-black text-[#DCEAF7]">
                {metric.value}
              </p>
              <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                {isKhmer ? metric.labelKh : metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
