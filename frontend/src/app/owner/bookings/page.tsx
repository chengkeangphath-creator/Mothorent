'use client';

import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Check, 
  X, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { bookingService } from '../../../lib/api';
import { Booking } from '../../../types';

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<'pending' | 'approved' | 'all'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getAll().then(data => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (id: number, status: 'approved' | 'rejected' | 'completed') => {
    const updated = await bookingService.updateStatus(id, status);
    setBookings(prev => prev.map(b => b.id === id ? updated : b));
  };

  const filtered = tab === 'all'
    ? bookings
    : bookings.filter(b => b.status === tab);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Booking Requests</h1>
          <p className="text-xs text-slate-500">Accept or reject incoming traveler rental reservations.</p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              tab === 'pending' ? 'bg-orange-500 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Pending Requests ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            onClick={() => setTab('approved')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              tab === 'approved' ? 'bg-orange-500 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Active & Approved
          </button>
          <button
            onClick={() => setTab('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              tab === 'all' ? 'bg-orange-500 text-white font-bold' : 'text-slate-600'
            }`}
          >
            All History
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading requests...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-2">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No {tab} bookings found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {b.booking_code}
                    </span>
                    <span className="text-xs text-slate-400">
                      Requested {new Date(b.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    {b.motorcycle?.title}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                  b.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : b.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {b.status}
                </span>
              </div>

              {/* Renter Details & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="space-y-1">
                  <span className="font-bold text-slate-400 block uppercase text-[10px]">Renter Profile</span>
                  <p className="font-bold text-slate-900 text-sm">{b.customer_name}</p>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.customer_phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.customer_email}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-400 block uppercase text-[10px]">Rental Period</span>
                  <p className="font-bold text-slate-900">{b.start_date} → {b.end_date}</p>
                  <p className="text-slate-500">{b.total_days} Total Days</p>
                  <p className="text-slate-500 truncate">{b.pickup_address}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-400 block uppercase text-[10px]">Financials</span>
                  <p className="text-base font-black text-slate-900">${b.total_price} USD</p>
                  <p className="text-emerald-600 font-semibold">Deposit: ${b.deposit_amount} USD</p>
                  <p className="text-slate-400 text-[11px]">Payment: {b.payment_status}</p>
                </div>
              </div>

              {b.notes && (
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600">
                  <strong className="text-slate-700">Renter Note:</strong> {b.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(b.id, 'rejected')}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(b.id, 'approved')}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Request</span>
                    </button>
                  </>
                )}

                {b.status === 'approved' && (
                  <button
                    onClick={() => handleStatusChange(b.id, 'completed')}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Bike Returned & Complete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
