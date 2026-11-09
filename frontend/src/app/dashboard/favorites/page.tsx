'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Bike, ArrowRight } from 'lucide-react';
import { useFavorites } from '../../../context/FavoritesContext';
import { motorcycleService } from '../../../lib/api';
import { Motorcycle } from '../../../types';
import MotorcycleCard from '../../../components/common/MotorcycleCard';

export default function CustomerFavoritesPage() {
  const { favorites } = useFavorites();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    motorcycleService.getAll().then(all => {
      const favBikes = all.filter(m => favorites.includes(m.id));
      setMotorcycles(favBikes);
      setLoading(false);
    });
  }, [favorites]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Saved Favorites</h1>
        <p className="text-xs text-slate-500">Quickly reserve your favorite motorcycles for upcoming trips.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading saved favorites...</div>
      ) : motorcycles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any motorcycle card to bookmark it for your itinerary.
          </p>
          <Link
            href="/motorcycles"
            className="inline-block px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
          >
            Browse Motorcycles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {motorcycles.map(bike => (
            <MotorcycleCard key={bike.id} motorcycle={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
