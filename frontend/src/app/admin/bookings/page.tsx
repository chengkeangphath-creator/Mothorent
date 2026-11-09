'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { bookingService } from '../../../lib/api';
import { Booking } from '../../../types';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    bookingService.getAll().then(data => setBookings(data));
  }, []);

  const handleStatusOverride = async (id: number, status: any) => {
    const updated = await bookingService.updateStatus(id, status);
    setBookings(prev => prev.map(b => b.id === id ? updated : b));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Master Bookings Registry</h1>
        <p className="text-xs text-slate-400">Platform-wide overview of all reservations and rental statuses.</p>
      </div>

      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3">Code</th>
              <th className="pb-3">Motorcycle</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Owner</th>
              <th className="pb-3">Dates</th>
              <th className="pb-3">Total / Deposit</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Override</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {bookings.map(b => (
              <tr key={b.id} className="text-slate-300">
                <td className="py-3.5 font-mono font-bold text-orange-400">{b.booking_code}</td>
                <td className="py-3.5 font-bold text-white">{b.motorcycle?.title}</td>
                <td className="py-3.5">{b.customer_name}</td>
                <td className="py-3.5">{b.owner_name}</td>
                <td className="py-3.5 text-slate-400">{b.start_date} to {b.end_date}</td>
                <td className="py-3.5">
                  <span className="font-bold text-white">${b.total_price}</span>
                  <span className="text-[10px] text-slate-500 block">Dep: ${b.deposit_amount}</span>
                </td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    b.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusOverride(b.id, e.target.value)}
                    className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
