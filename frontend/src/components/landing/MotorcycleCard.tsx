'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Heart, ShieldCheck, Zap } from 'lucide-react';
import { LandingMotorcycle } from '../../data/landing';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

interface MotorcycleCardProps {
  motorcycle: LandingMotorcycle;
  onBookNow?: (bike: LandingMotorcycle) => void;
}

export default function MotorcycleCard({ motorcycle, onBookNow }: MotorcycleCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleBookClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
      return;
    }
    if (onBookNow) {
      onBookNow(motorcycle);
    } else {
      router.push(`/motorcycles/${motorcycle.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#142A44] rounded-3xl border border-slate-200 dark:border-[#1E3B60] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#4A74A7] transition-all duration-300 flex flex-col group text-slate-900 dark:text-white">
      
      {/* Photo with Overlay & Heart Badge */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-[#081426]">
        <Image
          src={motorcycle.image}
          alt={motorcycle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#081426] via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-[#081426]/90 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-[#DCEAF7] border border-slate-200 dark:border-[#1E3B60] shadow-sm">
          {isKhmer ? motorcycle.categoryLabelKh : motorcycle.categoryLabel}
        </div>

        {/* Favorite Heart Button (Auth Protected) */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 dark:bg-[#081426]/80 text-slate-700 dark:text-[#DCEAF7] hover:text-rose-500 border border-slate-200 dark:border-[#1E3B60]'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Pill */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#081426]/90 backdrop-blur-md border border-slate-200 dark:border-[#1E3B60] shadow-sm">
          <span className="text-base font-black text-[#142A44] dark:text-[#DCEAF7]">${motorcycle.pricePerDay}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-300 font-semibold ml-1">/ {isKhmer ? 'ថ្ងៃ' : 'day'}</span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Rating and Province */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{motorcycle.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({motorcycle.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#4A74A7]" />
              <span>{motorcycle.province}</span>
            </div>
          </div>

          {/* Bike Name */}
          <h3 className="text-lg font-black text-[#081426] dark:text-white group-hover:text-[#4A74A7] dark:group-hover:text-[#DCEAF7] transition-colors leading-snug">
            {motorcycle.name}
          </h3>

          {/* Location & Inclusions */}
          <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-1">
            {isKhmer ? motorcycle.pickupLocationKh : motorcycle.pickupLocation}
          </p>

          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-[#DCEAF7]">
              <ShieldCheck className="w-3 h-3 text-[#4A74A7]" />
              <span>{motorcycle.helmetsIncluded} Helmets Free</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-[#DCEAF7]">
              <Zap className="w-3 h-3 text-[#4A74A7]" />
              <span>{motorcycle.transmission}</span>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#1E3B60]/80">
          <Button
            type="button"
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleBookClick}
            className="py-2.5 shadow-md shadow-[#4A74A7]/30"
          >
            {isKhmer ? 'កក់ឥឡូវនេះ' : 'Book Now'}
          </Button>
        </div>

      </div>

    </div>
  );
}
