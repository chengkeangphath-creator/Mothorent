'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, SlidersHorizontal, Navigation } from 'lucide-react';
import { CAMBODIA_PROVINCES } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface SearchBarProps {
  initialProvince?: string;
  initialType?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  compact?: boolean;
}

export default function SearchBar({
  initialProvince = '',
  initialType = 'all',
  initialStartDate = '',
  initialEndDate = '',
  compact = false
}: SearchBarProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [province, setProvince] = useState(initialProvince);
  const [type, setType] = useState(initialType);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (province && province !== 'all') params.set('province', province);
    if (type && type !== 'all') params.set('type', type);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);

    router.push(`/search?${params.toString()}`);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        router.push(`/search?lat=${lat}&lng=${lng}&nearby=true`);
      },
      (error) => {
        setIsLocating(false);
        alert("Unable to retrieve your location: " + error.message);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className={`bg-white dark:bg-[#142A44] rounded-2xl md:rounded-3xl shadow-xl border border-slate-200/90 dark:border-[#1E3B60] p-3 md:p-4 ${compact ? 'max-w-4xl' : 'max-w-5xl'} mx-auto transition-colors`}>
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Province Dropdown */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#081426] border border-slate-200/80 dark:border-[#1E3B60] hover:border-[#4A74A7] dark:hover:border-[#6A95CA] transition-colors">
          <MapPin className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0" />
          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.destination}
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="text-slate-900 dark:bg-[#142A44] dark:text-white">
                {t.search.allProvinces}
              </option>
              {CAMBODIA_PROVINCES.map((prov) => (
                <option key={prov.id} value={prov.name} className="text-slate-900 dark:bg-[#142A44] dark:text-white">
                  {prov.name} {language !== 'en' ? `(${prov.name_kh})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Motorcycle Category */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#081426] border border-slate-200/80 dark:border-[#1E3B60] hover:border-[#4A74A7] dark:hover:border-[#6A95CA] transition-colors">
          <SlidersHorizontal className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0" />
          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.bikeCategory}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-sm focus:outline-none cursor-pointer capitalize"
            >
              <option value="all" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.allCategories}</option>
              <option value="scooter" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.scooter}</option>
              <option value="dirt_bike" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.dirtBike}</option>
              <option value="manual" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.manual}</option>
              <option value="sport" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.sport}</option>
              <option value="touring" className="text-slate-900 dark:bg-[#142A44] dark:text-white">{t.search.touring}</option>
            </select>
          </div>
        </div>

        {/* Rental Dates */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#081426] border border-slate-200/80 dark:border-[#1E3B60] hover:border-[#00D2FF] dark:hover:border-[#00D2FF] transition-colors">
          <Calendar className="w-5 h-5 text-slate-700 dark:text-white shrink-0" />
          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.pickupDate}
            </label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split('T')[0]}
              onClick={(e) => e.currentTarget.showPicker?.()}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-sm focus:outline-none cursor-pointer dark:[color-scheme:dark] [color-scheme:light]"
            />
          </div>
        </div>

        {/* Action Buttons: Search & Geolocation */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 h-full py-3.5 px-6 rounded-xl btn-glow text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t.search.searchFleet}</span>
          </button>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            title={t.search.locateMe}
            className="h-full px-3.5 py-3.5 rounded-xl bg-slate-100 dark:bg-[#081426] hover:bg-slate-200 dark:hover:bg-[#1E3B60] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1E3B60] transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <Navigation className={`w-4 h-4 text-[#4A74A7] dark:text-[#6A95CA] ${isLocating ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </form>
    </div>
  );
}
