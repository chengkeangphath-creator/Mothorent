'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Eye, 
  XCircle, 
  Navigation, 
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { bookingService } from '../../../lib/api';
import { Booking, BookingStatus } from '../../../types';

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getAll().then(data => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const handleCancelBooking = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking request?")) return;
    try {
      const updated = await bookingService.updateStatus(id, 'cancelled');
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
    } catch (e) {
      alert("Could not cancel booking.");
    }
  };

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Motorcycle Bookings</h1>
          <p className="text-xs text-slate-500">Track and manage your upcoming trips and rental receipts.</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold overflow-x-auto">
          {['all', 'pending', 'approved', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-orange-500 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No bookings found</h3>
          <p className="text-xs text-slate-500">You don&apos;t have any {statusFilter !== 'all' ? statusFilter : ''} bookings yet.</p>
          <Link href="/motorcycles" className="inline-block px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs">
            Browse Motorcycles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.motorcycle?.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80'}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                      {b.booking_code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {b.motorcycle?.title || "Motorcycle Rental"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    b.status === 'approved' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : b.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : b.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>

              {/* Booking Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Rental Dates</span>
                  <p className="font-semibold text-slate-800">{b.start_date} to {b.end_date}</p>
                  <p className="text-[11px] text-slate-400">({b.total_days} Days)</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Rental</span>
                  <p className="font-bold text-slate-900 text-sm">${b.total_price} USD</p>
                  <p className="text-[11px] text-emerald-600">Deposit: ${b.deposit_amount}</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Pickup Location</span>
                  <p className="font-semibold text-slate-800 truncate">{b.pickup_address}</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Owner Contact</span>
                  <p className="font-semibold text-slate-800">{b.owner_name}</p>
                  <p className="text-[11px] text-slate-500">{b.owner_phone}</p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/bookings/${b.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Receipt Details</span>
                  </Link>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${b.pickup_latitude},${b.pickup_longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-slate-500" />
                    <span>Get Directions</span>
                  </a>
                </div>

                {b.status === 'pending' && (
                  <button
                    onClick={() => handleCancelBooking(b.id)}
                    className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Request</span>
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
