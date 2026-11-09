'use client';

import React, { useState } from 'react';
import { Store, Phone, Mail, MapPin, ShieldCheck, Save, CheckCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function OwnerProfilePage() {
  const { user, updateUser } = useAuth();
  const [businessName, setBusinessName] = useState(user?.business_name || 'Angkor Moto Rentals & Tours');
  const [phone, setPhone] = useState(user?.phone || '+855 98 765 432');
  const [bankAccount, setBankAccount] = useState('ABA Bank - 001 234 567 (Sophea Chan)');
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ business_name: businessName, phone });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Owner Business Profile</h1>
        <p className="text-xs text-slate-500">Manage your rental business details and payout destinations.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
        {success && (
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Owner profile updated successfully!</span>
          </div>
        )}

        <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Host Status</span>
            <h3 className="font-bold text-base flex items-center gap-2">
              <span>Verified Motorcycle Rental Business</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400">Business license and Cambodian ID verified by admin.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
            Active Host
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Business / Store Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Contact Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Payout Account (ABA / Bakong / Wing)</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
