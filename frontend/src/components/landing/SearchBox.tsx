'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Navigation, Loader2 } from 'lucide-react';
import { CAMBODIA_PROVINCES_LIST } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export default function SearchBox() {
  const router = useRouter();
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const [province, setProvince] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const today = new Date();
    const pickup = today.toISOString().split('T')[0];
    const retDate = new Date();
    retDate.setDate(today.getDate() + 3);
    const ret = retDate.toISOString().split('T')[0];
    setPickupDate(pickup);
    setReturnDate(ret);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (province && province !== 'all') params.set('province', province);
    if (pickupDate) params.set('startDate', pickupDate);
    if (returnDate) params.set('endDate', returnDate);

    router.push(`/search?${params.toString()}`);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert(isKhmer ? 'កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ Geolocation ទេ។' : 'Geolocation is not supported by your browser.');
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
        alert((isKhmer ? 'មិនអាចទាញយកទីតាំងបានទេ៖ ' : 'Unable to retrieve location: ') + error.message);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 dark:bg-[#142A44]/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1E3B60] text-slate-900 dark:text-white transition-colors"
        role="search"
        aria-label="Motorcycle Search Form"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 items-end">
          
          {/* Province Dropdown: Full width on mobile (col-span-2), 1 col on desktop */}
          <div className="col-span-2 lg:col-span-1 relative text-left">
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-[#DCEAF7] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>{isKhmer ? 'ជ្រើសរើសខេត្ត' : 'Destination'}</span>
            </label>
            <div className="relative">
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full pl-3 pr-8 py-3 rounded-2xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors cursor-pointer appearance-none"
                aria-label="Select Cambodian Province"
              >
                <option value="">{isKhmer ? 'ខេត្តទាំង ២៥ (ទាំងអស់)' : 'All 25 Provinces'}</option>
                {CAMBODIA_PROVINCES_LIST.map((p) => (
                  <option key={p.id} value={p.name}>
                    {isKhmer ? p.nameKh : p.name} ({p.count})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pickup Date: 1 Col (Half width on mobile) */}
          <div className="col-span-1 relative text-left">
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-white mb-1.5 flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
              <span className="truncate">{isKhmer ? 'ថ្ងៃទទួល' : 'Pick-up'}</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onClick={(e) => e.currentTarget.showPicker?.()}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors cursor-pointer"
                aria-label="Pick up date"
              />
            </div>
          </div>

          {/* Return Date: 1 Col (Half width on mobile) */}
          <div className="col-span-1 relative text-left">
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-white mb-1.5 flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
              <span className="truncate">{isKhmer ? 'ថ្ងៃប្រគល់' : 'Return'}</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={returnDate}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                onClick={(e) => e.currentTarget.showPicker?.()}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors cursor-pointer"
                aria-label="Return date"
              />
            </div>
          </div>

          {/* Search Button: Full width on mobile (col-span-2), 1 col on desktop */}
          <div className="col-span-2 lg:col-span-1 pt-1 lg:pt-0">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Search className="w-4 h-4" />}
              className="py-3.5 shadow-lg shadow-[#00D2FF]/20 text-xs sm:text-sm font-black"
            >
              {isKhmer ? 'ស្វែងរកម៉ូតូ' : 'Search Motorcycles'}
            </Button>
          </div>

        </div>

        {/* Secondary Action: Geolocation Button */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#1E3B60]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-[#DCEAF7] hover:text-[#4A74A7] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Use current location to find nearby motorcycles"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A74A7]" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-[#4A74A7]" />
            )}
            <span>{isKhmer ? 'ប្រើប្រាស់ទីតាំងបច្ចុប្បន្នរបស់ខ្ញុំ' : 'Use My Current Location'}</span>
          </button>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4A74A7] animate-ping" />
            {isKhmer ? 'ចំណុចទទួលម៉ូតូជាក់លាក់លើផែនទី Google Maps' : 'Fixed pickup coordinates • No account needed to browse'}
          </span>
        </div>

      </form>
    </div>
  );
}
