'use client';

import React, { useState } from 'react';
import { Store, ShieldCheck, Check, X, FileText, ExternalLink } from 'lucide-react';

export default function AdminOwnersPage() {
  const [owners, setOwners] = useState([
    { id: 2, name: "Sophea Chan", shop: "Angkor Moto Rentals & Tours", email: "owner@motho.com", phone: "+855 98 765 432", province: "Siem Reap", status: "verified", fleet_count: 5 },
    { id: 4, name: "Vireak Bun", shop: "Bokor Trail Expeditions", email: "vireak@bokormoto.com", phone: "+855 12 998 877", province: "Kampot", status: "pending", fleet_count: 2 },
    { id: 5, name: "Sreypov Meas", shop: "Otres Scooter Rental Hub", email: "sreypov@shvrent.com", phone: "+855 88 554 332", province: "Preah Sihanouk", status: "pending", fleet_count: 3 },
  ]);

  const handleApprove = (id: number) => {
    setOwners(prev => prev.map(o => o.id === id ? { ...o, status: "verified" } : o));
  };

  const handleReject = (id: number) => {
    setOwners(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Owner Verification & Approvals</h1>
        <p className="text-xs text-slate-400">Review Cambodian business licenses, identity documents, and approve new hosts.</p>
      </div>

      <div className="space-y-4">
        {owners.map(owner => (
          <div key={owner.id} className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{owner.shop}</h3>
                  <p className="text-xs text-slate-400">Owner: {owner.name} • {owner.province}, Cambodia</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                owner.status === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {owner.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div>
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Contact</span>
                <p className="text-white font-medium">{owner.phone}</p>
                <p>{owner.email}</p>
              </div>

              <div>
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Submitted Verification Docs</span>
                <p className="text-orange-400 font-medium flex items-center gap-1 cursor-pointer hover:underline">
                  <FileText className="w-3.5 h-3.5" />
                  <span>cambodia_national_id_{owner.id}.pdf</span>
                </p>
                <p className="text-orange-400 font-medium flex items-center gap-1 cursor-pointer hover:underline">
                  <FileText className="w-3.5 h-3.5" />
                  <span>business_registration_patent.pdf</span>
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Fleet Capacity</span>
                <p className="text-white font-medium">{owner.fleet_count} Motorcycles Ready</p>
              </div>
            </div>

            {owner.status === 'pending' && (
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  onClick={() => handleReject(owner.id)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 font-bold border border-slate-800 transition-colors"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleApprove(owner.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Verify Host</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
