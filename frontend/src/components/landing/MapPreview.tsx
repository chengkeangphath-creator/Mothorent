'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Crosshair, 
  Star, 
  MapPin, 
  Zap, 
  Bot, 
  Check, 
  Layers, 
  Maximize2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export interface MapMotorcycleItem {
  id: number;
  name: string;
  yearTag: string;
  category: 'scooter' | 'semi-auto' | 'manual' | 'dirt_bike';
  engine: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  locationArea: string;
  tags: string[];
  priceUSD: number;
  priceKHR: number;
  image: string;
  pinX: number; // percentage X on map overlay (0-100)
  pinY: number; // percentage Y on map overlay (0-100)
  isInstant: boolean;
  isAuto: boolean;
  dropOffHotel: boolean;
  zeroDeposit: boolean;
  readyMins: number;
}

const PHNOM_PENH_FLEET: MapMotorcycleItem[] = [
  {
    id: 1,
    name: "Honda Scoopy Club 12",
    yearTag: "2024",
    category: "scooter",
    engine: "110cc Auto",
    rating: 4.9,
    reviewsCount: 68,
    distanceKm: 0.4,
    locationArea: "BKK1 • Riverside",
    tags: ["Instant Pickup", "2 Helmets", "No Passport Lock"],
    priceUSD: 7.50,
    priceKHR: 30600,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    pinX: 63,
    pinY: 62,
    isInstant: true,
    isAuto: true,
    dropOffHotel: true,
    zeroDeposit: true,
    readyMins: 10
  },
  {
    id: 2,
    name: "Honda Click 125i eSP",
    yearTag: "2024",
    category: "scooter",
    engine: "125cc Auto",
    rating: 4.95,
    reviewsCount: 92,
    distanceKm: 0.9,
    locationArea: "Riverside Depot",
    tags: ["Smart Key", "Hotel Drop-off", "USB Port"],
    priceUSD: 9.00,
    priceKHR: 36700,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
    pinX: 68,
    pinY: 45,
    isInstant: true,
    isAuto: true,
    dropOffHotel: true,
    zeroDeposit: false,
    readyMins: 15
  },
  {
    id: 3,
    name: "Yamaha Grand Filano Hybrid",
    yearTag: "Hybrid",
    category: "scooter",
    engine: "125cc Eco",
    rating: 4.88,
    reviewsCount: 45,
    distanceKm: 1.2,
    locationArea: "Daun Penh Center",
    tags: ["27L Trunk", "USB Charger", "Eco Idle"],
    priceUSD: 8.50,
    priceKHR: 34680,
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=600&q=80",
    pinX: 58,
    pinY: 51,
    isInstant: true,
    isAuto: true,
    dropOffHotel: false,
    zeroDeposit: true,
    readyMins: 12
  },
  {
    id: 4,
    name: "Yamaha NMAX 155 ABS",
    yearTag: "ABS Max",
    category: "scooter",
    engine: "155cc Touring",
    rating: 4.97,
    reviewsCount: 54,
    distanceKm: 1.8,
    locationArea: "Russian Market",
    tags: ["Intercity Ready", "Dual ABS", "Traction Control"],
    priceUSD: 14.50,
    priceKHR: 59160,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80",
    pinX: 52,
    pinY: 72,
    isInstant: false,
    isAuto: true,
    dropOffHotel: true,
    zeroDeposit: false,
    readyMins: 25
  },
  {
    id: 5,
    name: "Honda Dream 125 Legend",
    yearTag: "2023",
    category: "semi-auto",
    engine: "125cc Semi-Auto",
    rating: 4.92,
    reviewsCount: 114,
    distanceKm: 2.1,
    locationArea: "Tuol Tompoung",
    tags: ["Low Fuel 65km/L", "Heavy Duty", "Simple Ride"],
    priceUSD: 6.00,
    priceKHR: 24480,
    image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=600&q=80",
    pinX: 62,
    pinY: 70,
    isInstant: true,
    isAuto: false,
    dropOffHotel: false,
    zeroDeposit: true,
    readyMins: 15
  },
  {
    id: 6,
    name: "Honda ADV 160 Adventure",
    yearTag: "2024",
    category: "scooter",
    engine: "160cc eSP+",
    rating: 5.0,
    reviewsCount: 38,
    distanceKm: 2.8,
    locationArea: "Sen Sok Mall Depot",
    tags: ["Bokor Ready", "Dual Rear Shocks", "ABS Disc"],
    priceUSD: 18.00,
    priceKHR: 73440,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    pinX: 42,
    pinY: 46,
    isInstant: true,
    isAuto: true,
    dropOffHotel: true,
    zeroDeposit: false,
    readyMins: 20
  }
];

export default function MapPreview() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  // Filters & State
  const [selectedRadius, setSelectedRadius] = useState<number>(5);
  const [activeFilterChip, setActiveFilterChip] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'nearest' | 'price_low' | 'rating'>('nearest');
  const [selectedBikeId, setSelectedBikeId] = useState<number>(1);
  const [isUpdatingGps, setIsUpdatingGps] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [isInteractiveMap, setIsInteractiveMap] = useState(true);

  // Filtered bikes
  const filteredBikes = useMemo(() => {
    return PHNOM_PENH_FLEET.filter((bike) => {
      if (bike.distanceKm > selectedRadius) return false;
      if (activeFilterChip === 'instant' && !bike.isInstant) return false;
      if (activeFilterChip === 'auto' && !bike.isAuto) return false;
      if (activeFilterChip === 'under10' && bike.priceUSD >= 10) return false;
      if (activeFilterChip === 'hotel' && !bike.dropOffHotel) return false;
      if (activeFilterChip === 'zeroDeposit' && !bike.zeroDeposit) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.priceUSD - b.priceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.distanceKm - b.distanceKm;
    });
  }, [selectedRadius, activeFilterChip, sortBy]);

  const selectedBike = useMemo(() => {
    return PHNOM_PENH_FLEET.find((b) => b.id === selectedBikeId) || PHNOM_PENH_FLEET[0];
  }, [selectedBikeId]);

  const handleBookNow = (bike: MapMotorcycleItem) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${bike.id}`);
      return;
    }
    router.push(`/motorcycles/${bike.id}`);
  };

  const handleUpdateGps = () => {
    setIsUpdatingGps(true);
    setTimeout(() => {
      setIsUpdatingGps(false);
    }, 600);
  };

  // Google Maps official embed URL provided by user
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.46385427783!2d104.72503046690517!3d11.579317443203909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2sin!4v1794218599171!5m2!1sen!2sin";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="map-preview">
      
      {/* Outer Card styled with Farnegar palette */}
      <div className="bg-white dark:bg-[#142A44] rounded-[32px] border border-[#DCEAF7] dark:border-[#1E3B60] shadow-2xl overflow-hidden text-[#081426] dark:text-white transition-all">
        
        {/* =========================================================================
            TOP SUB-BAR: GPS & RADIUS CONTROLS MATCHING TARGET DESIGN
           ========================================================================= */}
        <div className="p-4 sm:p-5 border-b border-[#DCEAF7] dark:border-[#1E3B60] bg-[#F8FAFD] dark:bg-[#081426]/90 space-y-3.5">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Current GPS Location Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] shadow-sm text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-[#081426] dark:text-white">Preah Sisowath Quay, Phnom Penh</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-[#DCEAF7] dark:bg-[#1E3B60] text-[#142A44] dark:text-[#DCEAF7]">
                  GPS Active
                </span>
              </div>

              <button
                type="button"
                onClick={handleUpdateGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] hover:border-[#4A74A7] text-xs font-bold text-[#4A74A7] dark:text-[#DCEAF7] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Crosshair className={`w-3.5 h-3.5 ${isUpdatingGps ? 'animate-spin' : ''}`} />
                <span>{isUpdatingGps ? 'Locating...' : 'Update GPS'}</span>
              </button>
            </div>

            {/* Search Radius Pills & View Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-white dark:bg-[#142A44] p-1 rounded-2xl border border-[#DCEAF7] dark:border-[#1E3B60] text-xs font-bold">
                <span className="px-2 text-slate-400 text-[11px]">Search Radius:</span>
                {[1, 3, 5, 10, 20].map((radius) => (
                  <button
                    key={radius}
                    type="button"
                    onClick={() => setSelectedRadius(radius)}
                    className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                      selectedRadius === radius
                        ? 'bg-[#142A44] dark:bg-[#4A74A7] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#142A44] dark:hover:text-white'
                    }`}
                  >
                    {radius} km
                  </button>
                ))}
              </div>

              <div className="px-3 py-1.5 rounded-2xl bg-[#DCEAF7]/80 dark:bg-[#081426] border border-[#B9D5EE] dark:border-[#1E3B60] text-xs font-black text-[#142A44] dark:text-[#DCEAF7]">
                {filteredBikes.length} motorbikes within {selectedRadius} km
              </div>

              {/* View Mode Toggle: Split Map vs Grid Only */}
              <div className="hidden sm:flex items-center p-1 rounded-2xl bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    viewMode === 'split'
                      ? 'bg-[#4A74A7] text-white shadow-sm'
                      : 'text-slate-500 hover:text-[#081426]'
                  }`}
                >
                  Split Map
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#4A74A7] text-white shadow-sm'
                      : 'text-slate-500 hover:text-[#081426]'
                  }`}
                >
                  Grid Only
                </button>
              </div>
            </div>

          </div>

          {/* Quick Filter Chips & Live Exchange Rate */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'instant', label: '⚡ Instant Pickup' },
                { id: 'auto', label: '🛵 Automatic Only' },
                { id: 'under10', label: '🏷️ Under $10 / day' },
                { id: 'hotel', label: '🏨 Drop-off to Hotel' },
                { id: 'zeroDeposit', label: '🛡️ Zero Passport Deposit' },
              ].map((chip) => {
                const isActive = activeFilterChip === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveFilterChip(isActive ? null : chip.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#4A74A7] text-white border-[#4A74A7] shadow-sm'
                        : 'bg-white dark:bg-[#142A44] text-slate-700 dark:text-slate-200 border-[#DCEAF7] dark:border-[#1E3B60] hover:border-[#4A74A7]'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-bold text-slate-500 dark:text-[#DCEAF7] flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A74A7]" />
              <span>Live Exchange: $1 = 4,080៛ (KHR)</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            MAIN SPLIT VIEW: LEFT MOTORBIKE LIST + RIGHT REAL GOOGLE MAP EMBED
           ========================================================================= */}
        <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
          
          {/* =====================================================================
              LEFT LIST PANEL (5 COLS)
             ===================================================================== */}
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'col-span-12'} p-4 sm:p-6 border-r border-[#DCEAF7] dark:border-[#1E3B60] flex flex-col h-[650px] overflow-hidden`}>
            
            {/* List Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DCEAF7] dark:border-[#1E3B60]">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#081426] dark:text-white">
                  {filteredBikes.length} Motorbikes Near You
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-300">
                  Live verified inventory with GPS telematics
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2 py-1 rounded-lg bg-[#F8FAFD] dark:bg-[#081426] border border-[#DCEAF7] dark:border-[#1E3B60] text-xs font-bold text-[#081426] dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="nearest">Nearest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Scrollable Bike Cards */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 pt-1">
              {filteredBikes.map((bike) => {
                const isSelected = selectedBikeId === bike.id;
                return (
                  <div
                    key={bike.id}
                    onClick={() => setSelectedBikeId(bike.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3.5 relative ${
                      isSelected
                        ? 'bg-[#F0F6FC] dark:bg-[#081426] border-[#4A74A7] ring-2 ring-[#4A74A7]/30 shadow-md'
                        : 'bg-white dark:bg-[#142A44] border-[#DCEAF7] dark:border-[#1E3B60] hover:border-[#4A74A7]/70 hover:shadow-sm'
                    }`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#4A74A7] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                        Selected on Map
                      </span>
                    )}

                    {/* Bike Thumbnail */}
                    <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#081426]">
                      <Image
                        src={bike.image}
                        alt={bike.name}
                        fill
                        sizes="130px"
                        className="object-cover"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                        {bike.yearTag}
                      </span>
                    </div>

                    {/* Bike Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-[#081426] dark:text-white truncate">
                          {bike.name}
                        </h4>

                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-300 mt-0.5">
                          <span className="flex items-center gap-0.5 font-bold text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {bike.rating}
                          </span>
                          <span>•</span>
                          <span className="font-semibold">{bike.distanceKm} km ({bike.locationArea.split('•')[0].trim()})</span>
                          <span>•</span>
                          <span>{bike.engine}</span>
                        </div>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {bike.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#DCEAF7] dark:bg-[#1E3B60] text-[#142A44] dark:text-[#DCEAF7]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#DCEAF7] dark:border-[#1E3B60]/60 mt-2">
                        <div>
                          <p className="text-sm font-black text-[#142A44] dark:text-[#DCEAF7]">
                            ${bike.priceUSD.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">/day</span>
                          </p>
                          <p className="text-[10px] text-slate-400">
                            ≈ {bike.priceKHR.toLocaleString()} KHR
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(bike);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-[#DCEAF7] dark:border-[#1E3B60] text-slate-700 dark:text-slate-200 hover:bg-[#DCEAF7]/30 transition-colors cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(bike);
                            }}
                            className="px-3 py-1 text-[11px] font-bold rounded-lg bg-[#4A74A7] hover:bg-[#3A608F] text-white shadow-sm transition-all cursor-pointer active:scale-95"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* =====================================================================
              RIGHT PANEL: REAL GOOGLE MAP EMBED + INTERACTIVE OVERLAYS
             ===================================================================== */}
          {viewMode === 'split' && (
            <div className="lg:col-span-7 relative h-[650px] overflow-hidden select-none bg-[#EAF2F8]">
              
              {/* REAL GOOGLE MAP IFRAME PROVIDED BY USER */}
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full object-cover"
                title="Real Google Map of Phnom Penh, Cambodia"
              />

              {/* OVERLAY: Top Delivery Notification Banner */}
              <div className="absolute top-4 left-4 right-16 sm:right-auto sm:max-w-md p-2.5 rounded-2xl bg-white/95 dark:bg-[#142A44]/95 border border-[#DCEAF7] dark:border-[#1E3B60] shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20 text-xs pointer-events-auto">
                <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-[#081426] flex items-center justify-center text-amber-600 shrink-0 font-bold">
                  ⚡
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#081426] dark:text-white truncate">12 Keyless / Delivery Units Ready</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-300 truncate">
                    Instant doorstep delivery within 15 mins to Riverside hotels
                  </p>
                </div>
              </div>

              {/* OVERLAY: GEOFENCE DISTANCE RADIUS RING AROUND RIVERSIDE */}
              <div 
                className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#4A74A7] bg-[#4A74A7]/10"
                style={{
                  left: '60%',
                  top: '52%',
                  width: `${selectedRadius * 60}px`,
                  height: `${selectedRadius * 60}px`
                }}
              >
                <span className="absolute top-1 right-2 text-[10px] font-black text-[#4A74A7] bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                  {selectedRadius}.0 KM Geofence
                </span>
              </div>

              {/* OVERLAY: USER CURRENT LOCATION PIN */}
              <div 
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                style={{ left: '60%', top: '52%' }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-[#142A44] opacity-30 animate-ping" />
                  <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#142A44] text-white text-[11px] font-black shadow-2xl border-2 border-white ring-4 ring-[#4A74A7]/30 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>You are here (Riverside Hotel)</span>
                  </div>
                </div>
              </div>

              {/* OVERLAY: MOTORBIKE PRICE TAG PINS OVER PHNOM PENH */}
              {filteredBikes.map((bike) => {
                const isSelected = selectedBikeId === bike.id;
                return (
                  <div
                    key={bike.id}
                    onClick={() => setSelectedBikeId(bike.id)}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 pointer-events-auto"
                    style={{ left: `${bike.pinX}%`, top: `${bike.pinY}%` }}
                  >
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black shadow-2xl flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-[#4A74A7] text-white scale-115 ring-4 ring-[#DCEAF7] border-2 border-white z-30'
                        : 'bg-white dark:bg-[#081426] text-[#142A44] dark:text-white border-2 border-[#DCEAF7] dark:border-[#1E3B60] hover:scale-110'
                    }`}>
                      <span className="text-[11px]">🛵</span>
                      <span>${bike.priceUSD.toFixed(2)}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isSelected ? 'bg-[#4A74A7]' : 'bg-slate-500'}`} />
                  </div>
                );
              })}

              {/* OVERLAY: FLOATING SELECTED MOTORBIKE POPUP OVER THE MAP */}
              {selectedBike && (
                <div 
                  className="absolute z-30 p-3 rounded-2xl bg-white/95 dark:bg-[#081426]/95 border border-[#DCEAF7] dark:border-[#1E3B60] shadow-2xl backdrop-blur-md w-80 flex gap-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-150"
                  style={{
                    left: `${Math.min(Math.max(selectedBike.pinX - 15, 6), 55)}%`,
                    top: `${Math.max(selectedBike.pinY - 22, 16)}%`
                  }}
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 dark:border-[#1E3B60]">
                    <Image
                      src={selectedBike.image}
                      alt={selectedBike.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-black text-[#081426] dark:text-white truncate">
                          {selectedBike.name}
                        </h5>
                        <span className="text-[11px] font-bold text-amber-500 flex items-center">
                          {selectedBike.rating}★
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-300">
                        {selectedBike.distanceKm} km • Ready in {selectedBike.readyMins} mins
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-black text-[#4A74A7] dark:text-[#DCEAF7]">
                        ${selectedBike.priceUSD.toFixed(2)}/d
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBookNow(selectedBike)}
                        className="px-3 py-1 rounded-lg bg-[#4A74A7] hover:bg-[#3A608F] text-white text-[10px] font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* OVERLAY: Bottom Telematics Status Bar & AI Concierge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#081426]/95 border border-[#DCEAF7] dark:border-[#1E3B60] backdrop-blur-md text-[10px] font-semibold text-slate-700 dark:text-slate-200 shadow-md pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Phnom Penh GPS Telematics • Official Google Map</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const chatBtn = document.getElementById('floating-chatbot-launcher');
                    if (chatBtn) chatBtn.click();
                  }}
                  className="pointer-events-auto hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#081426] border border-[#1E3B60] text-white text-xs font-bold shadow-xl hover:bg-[#142A44] transition-all cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-[#4A74A7]" />
                  <span>Ask AI Concierge</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
