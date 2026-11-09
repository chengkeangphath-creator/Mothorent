'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X,
  Bike,
  MapPin,
  RefreshCw
} from 'lucide-react';
import MotorcycleCard from '../../components/common/MotorcycleCard';
import BookingModal from '../../components/common/BookingModal';
import { CAMBODIA_PROVINCES } from '../../data/mockData';
import { motorcycleService } from '../../lib/api';
import { Motorcycle, FilterOptions } from '../../types';

function BrowseMotorcyclesContent() {
  const searchParams = useSearchParams();
  const initialProvince = searchParams.get('province') || '';
  const initialType = searchParams.get('type') || 'all';

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'popular'>('rating');

  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchMotorcycles();
  }, [selectedProvince, selectedType, selectedBrand, selectedTransmission, maxPrice, searchQuery, sortBy]);

  const fetchMotorcycles = async () => {
    setLoading(true);
    const filters: FilterOptions = {
      province: selectedProvince || undefined,
      type: selectedType !== 'all' ? selectedType : undefined,
      brand: selectedBrand !== 'all' ? selectedBrand : undefined,
      transmission: selectedTransmission !== 'all' ? selectedTransmission : undefined,
      maxPrice: maxPrice,
      searchQuery: searchQuery || undefined,
      sortBy: sortBy
    };

    const res = await motorcycleService.getAll(filters);
    setMotorcycles(res);
    setLoading(false);
  };

  const handleResetFilters = () => {
    setSelectedProvince('');
    setSelectedType('all');
    setSelectedBrand('all');
    setSelectedTransmission('all');
    setMaxPrice(50);
    setSearchQuery('');
    setSortBy('rating');
  };

  const handleBookNow = (bike: Motorcycle) => {
    setSelectedMotorcycle(bike);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#142A44] dark:from-[#081426] dark:to-[#142A44] rounded-3xl p-8 sm:p-10 text-white border border-slate-800 dark:border-[#1E3B60] shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEAF7]/20 text-[#DCEAF7] text-xs font-semibold border border-[#DCEAF7]/30">
            <Bike className="w-3.5 h-3.5 text-[#4A74A7]" />
            <span>Cambodia Rental Fleet Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Browse Motorcycles & Scooters
          </h1>
          <p className="text-slate-300 text-sm">
            Compare prices, check specs, and book directly with verified local owners in all 25 provinces.
          </p>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Trigger */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-800 dark:text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#4A74A7]" />
            <span>Filter Fleet</span>
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing {motorcycles.length} motorcycles
          </span>
        </div>

        {/* Sidebar Filters Desktop */}
        <div className={`lg:block ${mobileFilterOpen ? 'fixed inset-0 z-50 bg-white dark:bg-[#081426] p-6 overflow-y-auto' : 'hidden'} space-y-6`}>
          
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#1E3B60] lg:hidden">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-lg bg-slate-100 dark:bg-[#142A44]">
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-[#142A44] rounded-2xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E3B60] pb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4A74A7]" />
                <span>Filters</span>
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#4A74A7] hover:text-[#3A608F] dark:text-[#DCEAF7] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-[#DCEAF7] block">Search by Model / Keyword</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Scoopy, Click, XR 150..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Province Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-[#DCEAF7] block">Cambodia Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] focus:outline-none focus:border-[#4A74A7] font-semibold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="">All Provinces (25)</option>
                {CAMBODIA_PROVINCES.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.name_kh})
                  </option>
                ))}
              </select>
            </div>

            {/* Motorcycle Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-[#DCEAF7] block">Motorcycle Category</label>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {[
                  { label: 'All Categories', value: 'all' },
                  { label: 'Automatic Scooter', value: 'scooter' },
                  { label: 'Dual Sport / Dirt Bike', value: 'dirt_bike' },
                  { label: 'Manual / Semi-Auto', value: 'manual' },
                  { label: 'Sport Street Bike', value: 'sport' },
                  { label: 'Adventure Touring', value: 'touring' },
                ].map(item => (
                  <label key={item.value} className="flex items-center gap-2 cursor-pointer hover:text-[#4A74A7] dark:hover:text-[#DCEAF7]">
                    <input
                      type="radio"
                      name="catType"
                      checked={selectedType === item.value}
                      onChange={() => setSelectedType(item.value)}
                      className="text-[#4A74A7] focus:ring-[#4A74A7]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-[#DCEAF7] block">Manufacturer / Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] focus:outline-none focus:border-[#4A74A7] font-semibold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="all">All Brands</option>
                <option value="Honda">Honda</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Royal Enfield">Royal Enfield</option>
                <option value="Kawasaki">Kawasaki</option>
                <option value="Suzuki">Suzuki</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1E3B60]">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-[#DCEAF7]">Max Daily Rate:</span>
                <span className="font-extrabold text-[#4A74A7] dark:text-[#DCEAF7]">${maxPrice}/day</span>
              </div>
              <input
                type="range"
                min={7}
                max={50}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4A74A7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>$7</span>
                <span>$25</span>
                <span>$50+</span>
              </div>
            </div>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#4A74A7] text-white font-bold text-xs shadow-md"
              >
                Apply Filters
              </button>
            )}
          </div>
        </div>

        {/* Fleet Grid Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Bar Sort and Results Count */}
          <div className="hidden lg:flex items-center justify-between bg-white dark:bg-[#142A44] p-4 rounded-2xl border border-slate-200/80 dark:border-[#1E3B60] shadow-sm">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Showing <strong className="text-slate-900 dark:text-white">{motorcycles.length}</strong> available motorcycles in Cambodia
            </span>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-slate-50 dark:bg-[#081426] focus:outline-none focus:border-[#4A74A7] font-semibold text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Motorcycle Cards */}
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <Bike className="w-10 h-10 animate-bounce mx-auto text-[#4A74A7] mb-2" />
              <p className="text-sm font-semibold">Loading motorcycles...</p>
            </div>
          ) : motorcycles.length === 0 ? (
            <div className="bg-white dark:bg-[#142A44] rounded-3xl p-12 text-center border border-slate-200 dark:border-[#1E3B60] space-y-4">
              <Bike className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Motorcycles Match Your Criteria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try widening your price filter or selecting another province in Cambodia.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-[#4A74A7] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {motorcycles.map(bike => (
                <MotorcycleCard
                  key={bike.id}
                  motorcycle={bike}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        motorcycle={selectedMotorcycle}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}

export default function BrowseMotorcyclesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading catalog...</div>}>
      <BrowseMotorcyclesContent />
    </Suspense>
  );
}
