'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from 'next/image';
import { Layers, Plus, Minus, Navigation, Bot } from 'lucide-react';

export interface MapBikePoint {
  id: number;
  name: string;
  yearTag: string;
  category: string;
  engine: string;
  rating: number;
  distanceKm: number;
  locationArea: string;
  priceUSD: number;
  priceKHR: number;
  image: string;
  lat: number;
  lng: number;
  readyMins: number;
}

interface RealGoogleMapProps {
  bikes: MapBikePoint[];
  selectedBikeId: number;
  onSelectBike: (id: number) => void;
  onBookNow: (bike: MapBikePoint) => void;
  radiusKm: number;
}

export default function RealGoogleMap({
  bikes,
  selectedBikeId,
  onSelectBike,
  onBookNow,
  radiusKm
}: RealGoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const markersRef = useRef<{ [id: number]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [mapType, setMapType] = useState<'streets' | 'hybrid'>('streets');
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // User location: Preah Sisowath Quay, Phnom Penh (Riverside Hotel)
  const userLat = 11.5683;
  const userLng = 104.9312;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map instance centered at user's location
    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add Real Google Maps Tile Layer
    const tileUrl = mapType === 'streets' 
      ? 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      : 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // User location marker with radar pulse ring
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; white-space: nowrap; transform: translate(-50%, -50%);">
          <div style="position: absolute; inset: -8px; border-radius: 9999px; background: rgba(20, 42, 68, 0.3); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 9999px; background: #142A44; color: #FFFFFF; font-size: 11px; font-weight: 800; border: 2px solid #FFFFFF; box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 10;">
            <span style="width: 8px; height: 8px; border-radius: 9999px; background: #38BDF8; box-shadow: 0 0 8px #38BDF8;"></span>
            <span>You are here (Riverside Hotel)</span>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    userMarkerRef.current = L.marker([userLat, userLng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);

    // Geofence Radius Circle
    const circle = L.circle([userLat, userLng], {
      radius: radiusKm * 1000,
      color: '#4A74A7',
      fillColor: '#4A74A7',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '6, 6'
    }).addTo(map);

    circleRef.current = circle;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle map type toggle (streets vs hybrid)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const tileUrl = mapType === 'streets'
      ? 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      : 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

    const newLayer = L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [mapType]);

  // Update geofence radius circle when radius changes
  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.setRadius(radiusKm * 1000);
  }, [radiusKm]);

  // Update Bike Markers on map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add new markers
    bikes.forEach((bike) => {
      const isSelected = bike.id === selectedBikeId;

      const markerIcon = L.divIcon({
        className: `custom-bike-marker-${bike.id}`,
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
            <div style="display: flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 9999px; font-size: 11px; font-weight: 900; background: ${isSelected ? '#4A74A7' : '#FFFFFF'}; color: ${isSelected ? '#FFFFFF' : '#142A44'}; border: 2px solid ${isSelected ? '#FFFFFF' : '#DCEAF7'}; box-shadow: 0 4px 15px rgba(0,0,0,0.25); transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'}; transition: transform 0.2s ease;">
              <span>🛵</span>
              <span>$${bike.priceUSD.toFixed(2)}</span>
            </div>
            <div style="width: 6px; height: 6px; border-radius: 9999px; background: ${isSelected ? '#4A74A7' : '#142A44'}; margin-top: 2px;"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([bike.lat, bike.lng], { icon: markerIcon, zIndexOffset: isSelected ? 500 : 100 })
        .addTo(map)
        .on('click', () => {
          onSelectBike(bike.id);
        });

      markersRef.current[bike.id] = marker;
    });
  }, [bikes, selectedBikeId, onSelectBike]);

  // Fly to selected bike when selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const targetBike = bikes.find((b) => b.id === selectedBikeId);
    if (targetBike) {
      map.flyTo([targetBike.lat, targetBike.lng], 14, { duration: 0.6 });
    }
  }, [selectedBikeId, bikes]);

  const selectedBike = bikes.find((b) => b.id === selectedBikeId) || bikes[0];

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    mapInstanceRef.current?.flyTo([userLat, userLng], 13, { duration: 0.6 });
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden select-none bg-[#EAF2F8]">
      
      {/* Real Google Maps Leaflet container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Notification Banner matching the reference */}
      <div className="absolute top-4 left-4 right-16 sm:right-auto sm:max-w-md p-2.5 rounded-2xl bg-white/95 dark:bg-[#142A44]/95 border border-[#DCEAF7] dark:border-[#1E3B60] shadow-lg backdrop-blur-md flex items-center gap-2.5 z-[1000] text-xs">
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

      {/* FLOATING SELECTED MOTORCYCLE CARD (Exact design from target screenshot) */}
      {selectedBike && (
        <div className="absolute bottom-16 left-4 sm:left-6 z-[1000] p-3 rounded-2xl bg-white/95 dark:bg-[#081426]/95 border border-[#DCEAF7] dark:border-[#1E3B60] shadow-2xl backdrop-blur-md w-80 flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
                onClick={() => onBookNow(selectedBike)}
                className="px-3 py-1 rounded-lg bg-[#4A74A7] hover:bg-[#3A608F] text-white text-[10px] font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Controls (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-[1000]">
        <button
          type="button"
          onClick={() => setMapType(mapType === 'streets' ? 'hybrid' : 'streets')}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-md transition-colors cursor-pointer ${
            mapType === 'hybrid'
              ? 'bg-[#4A74A7] text-white border-[#4A74A7]'
              : 'bg-white dark:bg-[#142A44] border-[#DCEAF7] dark:border-[#1E3B60] text-slate-700 dark:text-white hover:bg-slate-50'
          }`}
          title={mapType === 'streets' ? "Switch to Google Satellite / Hybrid" : "Switch to Google Roadmap"}
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] text-slate-700 dark:text-white flex items-center justify-center hover:bg-slate-50 shadow-md cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] text-slate-700 dark:text-white flex items-center justify-center hover:bg-slate-50 shadow-md cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRecenter}
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#142A44] border border-[#DCEAF7] dark:border-[#1E3B60] text-slate-700 dark:text-white flex items-center justify-center hover:bg-slate-50 shadow-md cursor-pointer"
          title="Recenter to Riverside Hotel"
        >
          <Navigation className="w-4 h-4 text-[#4A74A7]" />
        </button>
      </div>

      {/* Bottom Telematics & Google Maps Attribution Bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-[1000]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#081426]/95 border border-[#DCEAF7] dark:border-[#1E3B60] backdrop-blur-md text-[10px] font-semibold text-slate-600 dark:text-slate-300 shadow-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Phnom Penh GPS Telematics • Google Maps Data</span>
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
  );
}
