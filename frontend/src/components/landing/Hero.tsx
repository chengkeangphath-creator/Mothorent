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
    <section className="relative min-h-[520px] sm:min-h-[640px] flex items-center justify-center pt-8 pb-12 sm:pt-16 sm:pb-20 overflow-hidden bg-[#142A44] text-white">
      
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
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-8">
        
        {/* Top Assurance Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#081426]/90 border border-[#1E3B60] text-[11px] sm:text-xs font-semibold text-[#DCEAF7] backdrop-blur-md shadow-lg max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
          <span className="truncate">
            {isKhmer 
              ? 'វេទិកាជួលម៉ូតូឈានមុខគេនៅកម្ពុជា • គ្របដណ្តប់ ២៥ ខេត្តក្រុង' 
              : 'Cambodia’s Premier Moto Platform • 25 Provinces'}
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-2 sm:space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            {isKhmer ? (
              <>
                ស្វែងយល់ពីកម្ពុជា <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#00D2FF]">
                  នៅលើកង់ពីរដ៏អស្ចារ្យ
                </span>
              </>
            ) : (
              <>
                Explore Cambodia <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] via-[#8EB7DF] to-[#00D2FF]">
                  on Two Wheels
                </span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            {isKhmer
              ? 'ជួលម៉ូតូដោយទំនុកចិត្តពីម្ចាស់ម៉ូតូក្នុងស្រុកផ្ទាល់។ តម្លៃគិតជាដុល្លារ ($) ច្បាស់លាស់ ទីតាំងទទួលម៉ូតូជាក់លាក់។'
              : 'Rent scooters and adventure motorbikes from trusted local owners. Transparent USD rates, verified pickups across Cambodia.'}
          </p>
        </div>

        {/* Search Box Component */}
        <div className="pt-1 sm:pt-2">
          <SearchBox />
        </div>

        {/* Trust Indicators Metrics Below */}
        <div className="pt-4 sm:pt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto text-center border-t border-[#1E3B60]/70">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={idx} className="p-1.5 sm:p-2">
              <p className="text-xl sm:text-3xl font-black text-[#DCEAF7]">
                {metric.value}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                {isKhmer ? metric.labelKh : metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
