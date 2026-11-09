'use client';

import React, { useState, useEffect } from 'react';
import { Bike, ShieldCheck, Trash2, CheckCircle, Eye, MapPin } from 'lucide-react';
import { motorcycleService } from '../../../lib/api';
import { Motorcycle } from '../../../types';

export default function AdminMotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    motorcycleService.getAll().then(data => setMotorcycles(data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this motorcycle listing from the platform?")) return;
    await motorcycleService.delete(id);
    setMotorcycles(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Fleet Moderation</h1>
          <p className="text-xs text-slate-400">Review and moderate all motorcycle listings posted by owners.</p>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3">Motorcycle</th>
              <th className="pb-3">Owner</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Daily Rate</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {motorcycles.map(bike => (
              <tr key={bike.id} className="text-slate-300">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={bike.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{bike.title}</p>
                      <p className="text-[11px] text-slate-400">{bike.brand} • {bike.engine_capacity}cc</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-slate-300">{bike.owner_name}</td>
                <td className="py-3.5 text-slate-400">{bike.province_name}</td>
                <td className="py-3.5 font-bold text-orange-400">${bike.daily_price}/day</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    bike.is_available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {bike.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDelete(bike.id)}
                    className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                    title="Remove listing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
