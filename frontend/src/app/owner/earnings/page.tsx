'use client';

import React from 'react';
import { DollarSign, TrendingUp, Download, ArrowUpRight, CheckCircle, CreditCard } from 'lucide-react';

export default function OwnerEarningsPage() {
  const payouts = [
    { id: 1, date: "2024-11-01", amount: 480, status: "Paid", method: "ABA Bank (Bakong KHQR)" },
    { id: 2, date: "2024-10-15", amount: 620, status: "Paid", method: "ABA Bank (Bakong KHQR)" },
    { id: 3, date: "2024-10-01", amount: 530, status: "Paid", method: "Wing Bank" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Earnings & Payouts</h1>
        <p className="text-xs text-slate-500">Track your daily rental income and bank deposits.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available for Payout</span>
          <p className="text-3xl font-black text-slate-900">$240.00 USD</p>
          <button className="w-full mt-2 py-2 px-3 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-md">
            Request Instant Payout
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Earned (Lifetime)</span>
          <p className="text-3xl font-black text-emerald-600">$3,240.00 USD</p>
          <p className="text-[11px] text-slate-500">Across 64 completed bookings</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Default Payout Account</span>
          <div className="flex items-center gap-2 pt-1">
            <CreditCard className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-bold text-xs text-slate-900">ABA Bank (001 234 567)</p>
              <p className="text-[10px] text-emerald-600 font-semibold">Bakong KHQR Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Payout History</h3>
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3">Payout Date</th>
              <th className="pb-3">Method / Destination</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payouts.map(p => (
              <tr key={p.id} className="text-slate-700">
                <td className="py-3.5 font-semibold">{p.date}</td>
                <td className="py-3.5">{p.method}</td>
                <td className="py-3.5 font-bold text-slate-900">${p.amount}.00 USD</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
