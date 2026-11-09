'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bike, ArrowRight } from 'lucide-react';
import MotorcycleCard from './MotorcycleCard';
import { FEATURED_MOTORCYCLES, LandingMotorcycle } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

interface FeaturedMotorcyclesProps {
  onBookNow?: (bike: LandingMotorcycle) => void;
}

export default function FeaturedMotorcycles({ onBookNow }: FeaturedMotorcyclesProps) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { label: isKhmer ? 'ទាំងអស់' : 'All Fleet', value: 'all' },
    { label: isKhmer ? 'ម៉ូតូអូតូ' : 'Scooters', value: 'scooter' },
    { label: isKhmer ? 'ម៉ូតូផ្លូវលំបាក' : 'Dirt Bikes', value: 'dirt_bike' },
    { label: isKhmer ? 'ម៉ូតូលេខជើង' : 'Semi-Auto', value: 'semi-auto' },
    { label: isKhmer ? 'ម៉ូតូធំ' : 'Adventure / Manual', value: 'manual' },
  ];

  const filteredBikes = activeTab === 'all'
    ? FEATURED_MOTORCYCLES
    : FEATURED_MOTORCYCLES.filter((b) => b.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="motorcycles">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] dark:bg-[#142A44] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-bold text-[#142A44] dark:text-[#DCEAF7] uppercase tracking-wider mb-3">
            <Bike className="w-3.5 h-3.5 text-[#4A74A7]" />
            <span>{isKhmer ? 'ម៉ូតូពេញនិយមសម្រាប់ជួល' : 'Featured Verified Fleet'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#081426] dark:text-white tracking-tight">
            {isKhmer ? 'ជ្រើសរើសម៉ូតូដែលអ្នកចូលចិត្ត' : 'Rent Reliable Motorcycles'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-xl">
            {isKhmer
              ? 'ម៉ូតូទាំងអស់ត្រូវបានត្រួតពិនិត្យសុវត្ថិភាព ថែទាំយ៉ាងម៉ត់ចត់ និងផ្តល់ជូនមួកសុវត្ថិភាព ២ ឥតគិតថ្លៃ។'
              : 'Every bike is mechanically verified, includes 2 clean sanitized helmets, and starts with a clear fuel tank.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] overflow-x-auto text-xs font-bold">
          {categories.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.value
                  ? 'btn-glow text-white shadow-md font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#081426] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Motorcycle Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBikes.map((bike) => (
          <MotorcycleCard
            key={bike.id}
            motorcycle={bike}
            onBookNow={onBookNow}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-12">
        <Button
          href="/motorcycles"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shadow-2xl"
        >
          {isKhmer ? 'មើលម៉ូតូទាំងអស់' : 'View All Motorcycles'}
        </Button>
      </div>

    </section>
  );
}
