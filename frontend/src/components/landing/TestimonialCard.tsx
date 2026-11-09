'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E3B60] shadow-sm hover:shadow-2xl hover:border-[#4A74A7] transition-all flex flex-col justify-between space-y-5 text-slate-900 dark:text-white">
      
      <div className="space-y-3">
        {/* Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-5 h-5 text-[#4A74A7]/60" />
        </div>

        {/* Review Quote */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed italic">
          &ldquo;{isKhmer ? testimonial.reviewKh : testimonial.review}&rdquo;
        </p>
      </div>

      {/* Author Details with Avatar */}
      <div className="pt-4 border-t border-slate-100 dark:border-[#1E3B60] flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#4A74A7] shrink-0 shadow-sm">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-black text-[#081426] dark:text-white flex items-center gap-1.5">
            <span>{testimonial.name}</span>
            <span>{testimonial.countryFlag}</span>
          </h4>
          <p className="text-[11px] text-[#4A74A7] dark:text-[#DCEAF7] font-semibold">
            {testimonial.motorcycle}
          </p>
          <p className="text-[10px] text-slate-400">
            {testimonial.date}
          </p>
        </div>
      </div>

    </div>
  );
}
