'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Gauge, Fuel, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Motorcycle } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
  onBookNow?: (motorcycle: Motorcycle) => void;
}

export default function MotorcycleCard({ motorcycle, onBookNow }: MotorcycleCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLanguage();
  const favorited = isFavorite(motorcycle.id);

  const mainImage = motorcycle.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
      return;
    }
    toggleFavorite(motorcycle.id);
  };

  const handleBookNowClick = () => {
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
    <div className="group bg-white dark:bg-[#142A44] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-[#1E3B60] shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-[#4A74A7] transition-all duration-300 flex flex-col h-full">
      
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#081426]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={motorcycle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            favorited 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-white/90 dark:bg-[#081426]/90 text-slate-700 dark:text-[#DCEAF7] hover:bg-white hover:text-rose-500'
          }`}
          title={favorited ? "Remove from favorites" : "Add to favorites (Sign In Required)"}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Type & Year Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/80 text-white backdrop-blur-md uppercase tracking-wider">
            {motorcycle.type.replace('_', ' ')}
          </span>
          <span className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-white/90 dark:bg-[#142A44]/90 text-slate-800 dark:text-slate-200 backdrop-blur-md">
            {motorcycle.year}
          </span>
        </div>

        {/* Price Tag in Bottom Corner */}
        <div className="absolute bottom-3 left-3 flex items-baseline gap-1 text-white">
          <span className="text-2xl font-black text-amber-400 drop-shadow-md">
            ${motorcycle.daily_price}
          </span>
          <span className="text-xs font-medium text-slate-200 drop-shadow">{t.fleet.day}</span>
        </div>

        {/* Verified Owner Badge */}
        {motorcycle.owner_verified && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.fleet.verifiedOwner}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-[#4A74A7] shrink-0" />
              <span className="truncate">{motorcycle.province_name}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{motorcycle.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({motorcycle.review_count})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/motorcycles/${motorcycle.id}`}>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors line-clamp-1">
              {motorcycle.title}
            </h3>
          </Link>

          {/* Specs Snippet */}
          <div className="grid grid-cols-2 gap-2 my-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-[#081426] border border-slate-100 dark:border-[#1E3B60]">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">{motorcycle.engine_capacity} cc</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-[#081426] border border-slate-100 dark:border-[#1E3B60] capitalize">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium truncate">{motorcycle.transmission}</span>
            </div>
          </div>

          {/* Address Line */}
          <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 mb-4">
            {motorcycle.address}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#1E3B60] flex items-center gap-2">
          <Link
            href={`/motorcycles/${motorcycle.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-[#1E3B60] transition-colors"
          >
            {t.fleet.viewDetails}
          </Link>

          <button
            onClick={handleBookNowClick}
            className="flex-1 py-2.5 px-3 rounded-xl btn-glow text-white text-xs font-black shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>{t.fleet.bookNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
