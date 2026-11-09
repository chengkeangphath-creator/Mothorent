'use client';

import React from 'react';
import { BarChart3, TrendingUp, Compass, Bike, DollarSign } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const provinceTrends = [
    { province: "Siem Reap", percentage: "38%", revenue: "$18,335", rentals: "185 trips" },
    { province: "Phnom Penh", percentage: "26%", revenue: "$12,545", rentals: "128 trips" },
    { province: "Kampot & Kep", percentage: "18%", revenue: "$8,685", rentals: "92 trips" },
    { province: "Preah Sihanouk", percentage: "12%", revenue: "$5,790", rentals: "64 trips" },
    { province: "Battambang", percentage: "6%", revenue: "$2,895", rentals: "35 trips" },
  ];

  const popularModels = [
    { model: "Honda Scoopy 110cc", share: "42%", avgPrice: "$10/day" },
    { model: "Honda Click 160cc ABS", share: "28%", avgPrice: "$14/day" },
    { model: "Honda XR 150L Dual Sport", share: "16%", avgPrice: "$22/day" },
    { model: "Honda Wave 110i", share: "9%", avgPrice: "$7/day" },
    { model: "Royal Enfield Himalayan", share: "5%", avgPrice: "$38/day" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Platform Analytics & Reports</h1>
        <p className="text-xs text-slate-400">Tourism rental patterns, provincial market shares, and model popularity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Province Market Share */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-400" />
              <span>Rental Demand by Province</span>
            </h3>
            <span className="text-[11px] text-slate-400">Last 30 Days</span>
          </div>

          <div className="space-y-4 pt-2">
            {provinceTrends.map(item => (
              <div key={item.province} className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-white">{item.province}</span>
                  <span className="font-semibold text-orange-400">{item.revenue} ({item.percentage})</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full" 
                    style={{ width: item.percentage }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{item.rentals}</span>
                  <span>Avg Duration: 3.4 days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Rented Models */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Bike className="w-4 h-4 text-orange-400" />
              <span>Top Motorcycle Models</span>
            </h3>
            <span className="text-[11px] text-slate-400">Fleet Utilization</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {popularModels.map((m, idx) => (
              <div key={m.model} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-white">{m.model}</p>
                    <p className="text-[11px] text-slate-400">Avg rate: {m.avgPrice}</p>
                  </div>
                </div>
                <span className="font-black text-amber-400">{m.share} Fleet Share</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
