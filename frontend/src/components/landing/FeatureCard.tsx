'use client';

import React from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  MapPin, 
  CalendarClock, 
  CreditCard, 
  Bot 
} from 'lucide-react';
import { FeatureItem } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';

interface FeatureCardProps {
  feature: FeatureItem;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#4A74A7]" />;
      case 'DollarSign':
        return <DollarSign className="w-6 h-6 text-[#4A74A7]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#4A74A7]" />;
      case 'CalendarClock':
        return <CalendarClock className="w-6 h-6 text-[#4A74A7]" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-[#4A74A7]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#4A74A7]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#4A74A7]" />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E3B60] shadow-sm hover:shadow-2xl hover:border-[#4A74A7] transition-all flex flex-col space-y-4 group">
      
      {/* Icon Container with subtle backdrop */}
      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] flex items-center justify-center group-hover:scale-105 group-hover:border-[#4A74A7] transition-all shadow-inner">
        {renderIcon(feature.iconName)}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-black text-[#081426] dark:text-white group-hover:text-[#4A74A7] dark:group-hover:text-[#DCEAF7] transition-colors">
          {isKhmer ? feature.titleKh : feature.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {isKhmer ? feature.descriptionKh : feature.description}
        </p>
      </div>

    </div>
  );
}
