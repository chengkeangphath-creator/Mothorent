'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Store, 
  Bike, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { CAMBODIA_PROVINCES } from '../../data/mockData';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
          Platform Administration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Motho Rent Master Command Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Real-time oversight of Cambodian motorcycle rentals, owner verifications, and financial health.
        </p>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">$48,250 USD</p>
          <p className="text-[10px] text-emerald-400 font-semibold">+22% month-over-month</p>
        </div>

        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Active Fleet</span>
            <Bike className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white">245 Bikes</p>
          <p className="text-[10px] text-slate-400">Across 25 provinces</p>
        </div>

        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">1,820</p>
          <p className="text-[10px] text-blue-400 font-semibold">1,650 renters • 170 owners</p>
        </div>

        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Pending Verifications</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">4 Owners</p>
          <p className="text-[10px] text-amber-400/80">Requires ID check</p>
        </div>
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Bookings Feed */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Recent System Bookings</h3>
            <Link href="/admin/bookings" className="text-xs text-orange-400 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { code: "MTR-2024-8891", bike: "Honda Scoopy 2024", prov: "Siem Reap", price: 30, st: "Approved" },
              { code: "MTR-2024-7742", bike: "Honda XR 150L", prov: "Kampot", price: 44, st: "Pending" },
              { code: "MTR-2024-4120", bike: "Honda Click 160", prov: "Phnom Penh", price: 56, st: "Completed" },
            ].map(item => (
              <div key={item.code} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-mono font-bold text-orange-400">{item.code}</p>
                  <p className="text-white font-medium">{item.bike} • {item.prov}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-white">${item.price} USD</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.st === 'Completed' ? 'bg-blue-500/20 text-blue-400' : item.st === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {item.st}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Provinces Activity */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Top Provinces by Fleet</h3>
            <Link href="/admin/provinces" className="text-xs text-orange-400 hover:underline">
              Manage 25 Provinces →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {CAMBODIA_PROVINCES.slice(0, 4).map(prov => (
              <div key={prov.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                    {prov.code.replace('KHM-', '')}
                  </div>
                  <div>
                    <p className="font-bold text-white">{prov.name} ({prov.name_kh})</p>
                    <p className="text-[11px] text-slate-400">{prov.popular_attractions[0]}</p>
                  </div>
                </div>
                <span className="font-black text-orange-400">{prov.motorcycle_count} Listed Bikes</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
