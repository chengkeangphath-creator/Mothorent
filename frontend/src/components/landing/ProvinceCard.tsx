'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { PopularDestination } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

interface ProvinceCardProps {
  province: PopularDestination;
}

export default function ProvinceCard({ province }: ProvinceCardProps) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <Link
      href={`/motorcycles?province=${encodeURIComponent(province.name)}`}
      className="group relative h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-[#DCEAF7] dark:border-[#1E3B60] transition-all duration-300 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A74A7]"
      aria-label={`Browse motorcycles in ${province.name}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={province.image}
          alt={province.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Farnegar Dark Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-[#081426]/40 to-transparent" />
      </div>

      {/* Top Badge: Available Bikes */}
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#081426]/80 backdrop-blur-md text-[#DCEAF7] text-xs font-bold border border-[#1E3B60] shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#4A74A7] animate-pulse" />
        <span>{province.count} {isKhmer ? 'ម៉ូតូ' : 'Bikes'}</span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
        <span className="text-xs text-[#DCEAF7] font-semibold tracking-wide">
          {province.nameKh}
        </span>
        <h3 className="text-2xl font-black leading-tight group-hover:text-[#DCEAF7] transition-colors">
          {province.name}
        </h3>
        <p className="text-xs text-slate-300 line-clamp-1">
          {isKhmer ? province.taglineKh : province.tagline}
        </p>
        
        {/* Subtle pill tags */}
        <div className="pt-2 flex flex-wrap gap-1.5 opacity-90">
          {province.popularSpots.slice(0, 2).map((spot, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#142A44]/80 text-[#DCEAF7] border border-[#1E3B60]"
            >
              {spot}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Arrow indicator */}
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#4A74A7]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
