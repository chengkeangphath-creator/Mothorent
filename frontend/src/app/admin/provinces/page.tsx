'use client';

import React, { useState } from 'react';
import { Map, MapPin, Plus, Search, Edit } from 'lucide-react';
import { CAMBODIA_PROVINCES } from '../../../data/mockData';
import { Province } from '../../../types';

export default function AdminProvincesPage() {
  const [provinces, setProvinces] = useState<Province[]>(CAMBODIA_PROVINCES);
  const [search, setSearch] = useState('');

  const filtered = provinces.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.name_kh.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Manage Cambodian Provinces</h1>
          <p className="text-xs text-slate-400">Configure all 25 provinces, GPS coordinates, and active motorcycle counts.</p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search province..."
            className="w-56 pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs">
                {p.code.replace('KHM-', '')}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{p.name} <span className="text-xs text-slate-400">({p.name_kh})</span></h4>
                <p className="text-[11px] text-slate-400">{p.latitude.toFixed(2)}, {p.longitude.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-orange-400 text-sm block">{p.motorcycle_count}</span>
              <span className="text-[10px] text-slate-500">Fleet Bikes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
