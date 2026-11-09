'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MapPin, 
  SlidersHorizontal, 
  Map as MapIcon, 
  List, 
  Navigation, 
  Bike,
  Sparkles
} from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import MotorcycleCard from '../../components/common/MotorcycleCard';
import InteractiveMap from '../../components/common/InteractiveMap';
import BookingModal from '../../components/common/BookingModal';
import { motorcycleService } from '../../lib/api';
import { Motorcycle, FilterOptions } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

function SearchPageContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const provinceParam = searchParams.get('province') || '';
  const typeParam = searchParams.get('type') || 'all';
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const nearbyParam = searchParams.get('nearby') === 'true';

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      setLoading(true);
      const filters: FilterOptions = {
        province: provinceParam || undefined,
        type: typeParam !== 'all' ? typeParam : undefined,
        lat: latParam ? Number(latParam) : undefined,
        lng: lngParam ? Number(lngParam) : undefined,
      };

      const data = await motorcycleService.getAll(filters);
      setMotorcycles(data);
      if (data.length > 0) {
        setSelectedMotorcycle(data[0]);
      }
      setLoading(false);
    }
    loadResults();
  }, [provinceParam, typeParam, latParam, lngParam]);

  const handleBookNow = (bike: Motorcycle) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${bike.id}`);
      return;
    }
    setSelectedMotorcycle(bike);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search Filter Bar */}
      <div className="space-y-4">
        <SearchBar
          initialProvince={provinceParam}
          initialType={typeParam}
          compact={true}
        />

        {/* View Switcher and Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#142A44] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3B60] shadow-sm">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-white">
              Found {motorcycles.length} motorcycles
            </span>
            {provinceParam && (
              <span className="px-2 py-0.5 rounded-md bg-[#4A74A7]/10 dark:bg-[#4A74A7]/20 text-[#4A74A7] dark:text-[#DCEAF7] font-semibold">
                in {provinceParam}
              </span>
            )}
            {nearbyParam && (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>Near your current location</span>
              </span>
            )}
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#081426] p-1 rounded-xl text-xs font-semibold border border-slate-200/60 dark:border-[#1E3B60]">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'split' ? 'bg-white dark:bg-[#142A44] text-[#4A74A7] dark:text-[#DCEAF7] shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'map' ? 'bg-white dark:bg-[#142A44] text-[#4A74A7] dark:text-[#DCEAF7] shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map Only</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white dark:bg-[#142A44] text-[#4A74A7] dark:text-[#DCEAF7] shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Results View */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Cards Column (5 Cols) */}
          <div className="lg:col-span-6 space-y-4 max-h-[750px] overflow-y-auto pr-1">
            {motorcycles.map(bike => (
              <div 
                key={bike.id}
                onMouseEnter={() => setSelectedMotorcycle(bike)}
                className={`transition-transform ${selectedMotorcycle?.id === bike.id ? 'ring-2 ring-[#4A74A7] rounded-2xl' : ''}`}
              >
                <MotorcycleCard
                  motorcycle={bike}
                  onBookNow={handleBookNow}
                />
              </div>
            ))}
          </div>

          {/* Right Map Column (6 Cols Sticky) */}
          <div className="lg:col-span-6 sticky top-28">
            <InteractiveMap
              motorcycles={motorcycles}
              selectedMotorcycle={selectedMotorcycle}
              onSelectMotorcycle={(b) => setSelectedMotorcycle(b)}
            />
          </div>
        </div>
      )}

      {viewMode === 'map' && (
        <div className="w-full">
          <InteractiveMap
            motorcycles={motorcycles}
            selectedMotorcycle={selectedMotorcycle}
            onSelectMotorcycle={(b) => setSelectedMotorcycle(b)}
          />
        </div>
      )}

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map(bike => (
            <MotorcycleCard
              key={bike.id}
              motorcycle={bike}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        motorcycle={selectedMotorcycle}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
