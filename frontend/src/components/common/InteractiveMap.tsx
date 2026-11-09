'use client';

import React, { useState, useEffect } from 'react';
import { Motorcycle } from '../../types';
import { MapPin, Navigation, ExternalLink, Star, X, Info } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMapProps {
  motorcycles: Motorcycle[];
  selectedMotorcycle?: Motorcycle | null;
  onSelectMotorcycle?: (motorcycle: Motorcycle) => void;
  centerLat?: number;
  centerLng?: number;
}

export default function InteractiveMap({
  motorcycles,
  selectedMotorcycle: initialSelected = null,
  onSelectMotorcycle,
  centerLat = 12.5657, // Center of Cambodia
  centerLng = 104.9910
}: InteractiveMapProps) {
  const [selected, setSelected] = useState<Motorcycle | null>(initialSelected || null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);

  const handleMarkerClick = (bike: Motorcycle) => {
    setSelected(bike);
    if (onSelectMotorcycle) {
      onSelectMotorcycle(bike);
    }
  };

  // Haversine formula to compute distance in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        setIsLocating(false);
        alert("Could not get your location: " + err.message);
      }
    );
  };

  // Cambodia coordinates bounding box for map normalization
  // Min Lat: ~10.4, Max Lat: ~14.7, Min Lng: ~102.3, Max Lng: ~107.6
  const getMapPosition = (lat: number, lng: number) => {
    const minLat = 10.3;
    const maxLat = 14.5;
    const minLng = 102.3;
    const maxLng = 107.6;

    const top = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const left = ((lng - minLng) / (maxLng - minLng)) * 100;
    return { top: `${Math.min(92, Math.max(8, top))}%`, left: `${Math.min(92, Math.max(8, left))}%` };
  };

  return (
    <div className="relative w-full h-[550px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl select-none">
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md border border-slate-700 hover:border-orange-500 shadow-lg transition-colors cursor-pointer"
        >
          <Navigation className={`w-3.5 h-3.5 text-orange-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{userLocation ? 'Location Acquired' : 'Locate My Position'}</span>
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 text-slate-300 text-xs backdrop-blur-md border border-slate-800">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Showing {motorcycles.length} Pickup Spots</span>
        </span>
      </div>

      {/* Stylized Cambodia Topographic Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-95">
        {/* Subtle grid pattern */}
        <div 
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Cambodia provinces watermark outline styling */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <span className="text-8xl md:text-9xl font-black text-slate-600 tracking-widest uppercase">
            CAMBODIA
          </span>
        </div>
      </div>

      {/* User Location Marker if available */}
      {userLocation && (
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          style={getMapPosition(userLocation.lat, userLocation.lng)}
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white shadow-lg"></span>
          </div>
        </div>
      )}

      {/* Motorcycle Pickup Markers */}
      <div className="absolute inset-0 z-10 p-6">
        {motorcycles.map((bike) => {
          const isCurrent = selected?.id === bike.id;
          const pos = getMapPosition(bike.latitude, bike.longitude);

          return (
            <div
              key={bike.id}
              onClick={() => handleMarkerClick(bike)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10 hover:z-30 hover:scale-110"
              style={pos}
            >
              {/* Marker pin */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-xs shadow-xl transition-all border ${
                isCurrent 
                  ? 'bg-orange-500 text-white border-white scale-110 ring-4 ring-orange-500/30' 
                  : 'bg-slate-900/90 text-white border-slate-700 hover:border-orange-400 hover:bg-slate-800'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>${bike.daily_price}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Motorcycle Info Window / Card */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-white dark:bg-[#142A44] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#1E3B60] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="relative flex gap-3 p-3.5">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#081426] dark:hover:bg-[#1E3B60] text-slate-500 dark:text-slate-300 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Thumbnail */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#081426] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.images?.[0]}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 pr-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#4A74A7] dark:text-[#DCEAF7] mb-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{selected.province_name}</span>
                  {userLocation && (
                    <span className="text-slate-400">
                      • {calculateDistance(userLocation.lat, userLocation.lng, selected.latitude, selected.longitude)} km away
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                  {selected.title}
                </h4>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">${selected.daily_price}/day</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {selected.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/motorcycles/${selected.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#4A74A7] hover:bg-[#3A608F] text-white text-xs font-bold transition-colors"
                >
                  View Details
                </Link>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#081426] dark:hover:bg-[#1E3B60] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-transparent dark:border-[#1E3B60] transition-colors"
                  title="Open directions in Google Maps"
                >
                  <Navigation className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span>Directions</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attribution footer */}
      <div className="absolute bottom-2 right-3 z-10 text-[10px] text-slate-500">
        Motho Rent Interactive Map • Fixed pickup coordinates in Cambodia
      </div>
    </div>
  );
}
