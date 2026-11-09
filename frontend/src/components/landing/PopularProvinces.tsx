'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ChevronRight } from 'lucide-react';
import ProvinceCard from './ProvinceCard';
import { POPULAR_DESTINATIONS } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function PopularProvinces() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="destinations">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#4A74A7]" />
            <span>{isKhmer ? 'គោលដៅទេសចរណ៍ពេញនិយម' : 'Popular Cambodian Destinations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
            {isKhmer ? 'រុករកម៉ូតូតាមរាជធានី-ខេត្ត' : 'Explore by Province & City'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-xl">
            {isKhmer 
              ? 'ម៉ូតូជួលត្រូវបានផ្ទៀងផ្ទាត់រួចរាល់ ស្ថិតនៅទីតាំងសំខាន់ៗជុំវិញប្រទេសកម្ពុជា ងាយស្រួលទទួល និងជិះកម្សាន្ត។'
              : 'Verified motorcycles waiting near major tourist hubs, train stations, and temple entryways across Cambodia.'}
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A74A7] hover:text-[#3A608F] dark:text-[#DCEAF7] dark:hover:text-white transition-colors self-start md:self-end"
        >
          <span>{isKhmer ? 'មើលផែនទីទីតាំងទាំងអស់' : 'View All on Interactive Map'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Provinces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POPULAR_DESTINATIONS.map((dest) => (
          <ProvinceCard key={dest.id} province={dest} />
        ))}
      </div>
    </section>
  );
}
