'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { CUSTOMER_REVIEWS } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

export default function CustomerReviews() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="reviews">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-[#4A74A7] text-[#4A74A7]" />
          <span>{isKhmer ? 'មតិយោបល់ពិតពីអ្នកធ្វើដំណើរ' : 'Authentic Rider Experiences'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
          {isKhmer ? 'ទទួលបានការស្រលាញ់ពេញចិត្តទូទាំងកម្ពុជា' : 'Loved by Travelers Across Cambodia'}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {isKhmer
            ? 'ការវាយតម្លៃពិតប្រាកដពីភ្ញៀវទេសចរអន្តរជាតិ ដែលបានជួលម៉ូតូតាមរយៈ Motho Rent ក្នុងទីក្រុងភ្នំពេញ សៀមរាប និងកំពត។'
            : 'Read real stories from solo travelers, couples, and adventure riders who explored Angkor, Bokor, and Cardamom trails.'}
        </p>
      </div>

      {/* Testimonials 4-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CUSTOMER_REVIEWS.map((rev) => (
          <TestimonialCard key={rev.id} testimonial={rev} />
        ))}
      </div>

    </section>
  );
}
