'use client';

import React, { useState, useEffect } from 'react';
import { History, Calendar, CheckCircle } from 'lucide-react';
import { bookingService } from '../../../lib/api';
import { Booking } from '../../../types';

export default function OwnerHistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    bookingService.getAll().then(data => {
      setBookings(data.filter(b => b.status === 'completed' || b.status === 'cancelled'));
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Rental History</h1>
        <p className="text-xs text-slate-500">Record of all completed and past rentals across your fleet.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3">Code</th>
              <th className="pb-3">Motorcycle</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Dates</th>
              <th className="pb-3">Revenue</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map(b => (
              <tr key={b.id} className="text-slate-700">
                <td className="py-3.5 font-mono font-bold text-orange-600">{b.booking_code}</td>
                <td className="py-3.5 font-bold text-slate-900">{b.motorcycle?.title}</td>
                <td className="py-3.5">{b.customer_name}</td>
                <td className="py-3.5 text-slate-500">{b.start_date} to {b.end_date} ({b.total_days}d)</td>
                <td className="py-3.5 font-bold text-slate-900">${b.total_price} USD</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    b.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {b.status}
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
