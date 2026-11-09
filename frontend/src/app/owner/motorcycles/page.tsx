'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bike, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  MapPin,
  Star
} from 'lucide-react';
import { motorcycleService } from '../../../lib/api';
import { Motorcycle } from '../../../types';

export default function OwnerMotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    motorcycleService.getAll().then(data => {
      setMotorcycles(data);
      setLoading(false);
    });
  }, []);

  const handleToggleAvailability = async (bike: Motorcycle) => {
    try {
      const updated = await motorcycleService.update(bike.id, {
        is_available: !bike.is_available,
        status: !bike.is_available ? 'active' : 'maintenance'
      });
      setMotorcycles(prev => prev.map(m => m.id === bike.id ? updated : m));
    } catch {
      alert("Could not update availability.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this motorcycle listing?")) return;
    await motorcycleService.delete(id);
    setMotorcycles(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Motorcycle Fleet</h1>
          <p className="text-xs text-slate-500">Manage listings, edit rental prices, and toggle maintenance status.</p>
        </div>

        <Link
          href="/owner/motorcycles/add"
          className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Motorcycle</span>
        </Link>
      </div>

      {/* Fleet List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading fleet...</div>
      ) : motorcycles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <Bike className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No Motorcycles Listed Yet</h3>
          <p className="text-xs text-slate-500">List your first motorcycle to start receiving booking requests.</p>
          <Link href="/owner/motorcycles/add" className="inline-block px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs">
            List a Motorcycle
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {motorcycles.map((bike) => (
            <div
              key={bike.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bike.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                      {bike.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{bike.year}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {bike.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {bike.province_name}
                    </span>
                    <span>•</span>
                    <span className="font-black text-slate-900">${bike.daily_price}/day</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {bike.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3 self-end md:self-center">
                {/* Availability Toggle */}
                <button
                  onClick={() => handleToggleAvailability(bike)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    bike.is_available
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                  title="Toggle available / maintenance"
                >
                  {bike.is_available ? '● Available' : '○ Maintenance'}
                </button>

                <Link
                  href={`/motorcycles/${bike.id}`}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="View Public Listing"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <Link
                  href={`/owner/motorcycles/${bike.id}/edit`}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  title="Edit Motorcycle"
                >
                  <Edit className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleDelete(bike.id)}
                  className="p-2.5 rounded-xl border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
