'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Heart, 
  Bell, 
  MapPin, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Navigation,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { bookingService, motorcycleService } from '../../lib/api';
import { Booking, Motorcycle } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';

export default function CustomerDashboardOverview() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    bookingService.getAll().then(data => setBookings(data));
  }, []);

  const activeBooking = bookings.find(b => b.status === 'approved' || b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#0C1E36] dark:bg-[#081426] rounded-3xl p-6 sm:p-8 text-white border border-slate-200/10 dark:border-[#1E3B60] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#DCEAF7] uppercase tracking-wider">
            Traveler Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome to Your Motho Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track active rentals, review upcoming itineraries, and explore Cambodia.
          </p>
        </div>

        <Link
          href="/motorcycles"
          className="px-5 py-3 rounded-2xl bg-[#4A74A7] hover:bg-[#3A608F] text-white font-bold text-xs shadow-lg shadow-[#4A74A7]/25 transition-all self-start sm:self-auto shrink-0"
        >
          Book Another Bike
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-[#4A74A7]/15 dark:bg-[#081426] text-[#4A74A7] dark:text-[#DCEAF7] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {bookings.filter(b => b.status === 'approved' || b.status === 'pending').length}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Reserved or currently underway</p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Trips</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{completedBookings.length}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Successful road trips in Cambodia</p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Favorites</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{favorites.length}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Saved for upcoming road trips</p>
        </div>
      </div>

      {/* Next Upcoming Booking Card */}
      {activeBooking ? (
        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3B60] gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#4A74A7] dark:text-[#DCEAF7] uppercase tracking-wider">
                Upcoming Reservation
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {activeBooking.motorcycle?.title || "Motorcycle Rental"}
              </h3>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto uppercase tracking-wider ${
              activeBooking.status === 'approved' 
                ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300' 
                : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
            }`}>
              {activeBooking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-1">
              <span className="font-bold text-slate-400 block uppercase text-[10px]">Rental Dates</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                {activeBooking.start_date} → {activeBooking.end_date}
              </p>
              <p className="text-slate-500 dark:text-slate-400">{activeBooking.total_days} Rental Days</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-400 block uppercase text-[10px]">Pickup Location</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {activeBooking.pickup_address}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-400 block uppercase text-[10px]">Total Due / Paid</span>
              <p className="font-black text-slate-900 dark:text-white text-sm">${activeBooking.total_price} USD</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Deposit: ${activeBooking.deposit_amount} USD</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href={`/dashboard/bookings/${activeBooking.id}`}
              className="px-4 py-2.5 rounded-xl bg-[#4A74A7] hover:bg-[#3A608F] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Booking Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeBooking.pickup_latitude},${activeBooking.pickup_longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-[#081426] hover:bg-slate-800 dark:hover:bg-[#1E3B60] text-white font-semibold text-xs border border-transparent dark:border-[#1E3B60] transition-colors flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#4A74A7] dark:text-[#6A95CA]" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-10 text-center border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-500 mx-auto" />
          <h3 className="font-bold text-base text-slate-800 dark:text-white">No Active Bookings Right Now</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Ready to explore? Choose a bike in Siem Reap, Phnom Penh, or Kampot.
          </p>
          <Link
            href="/motorcycles"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#4A74A7] text-white font-bold text-xs"
          >
            Find a Motorcycle
          </Link>
        </div>
      )}

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/dashboard/bookings"
          className="p-6 rounded-3xl bg-white dark:bg-[#142A44] border border-slate-200/90 dark:border-[#1E3B60] shadow-sm hover:border-[#4A74A7] transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#4A74A7] dark:group-hover:text-[#DCEAF7] transition-colors">
              Booking History & Invoices
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">View all past rentals and receipts</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#4A74A7] group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/profile"
          className="p-6 rounded-3xl bg-white dark:bg-[#142A44] border border-slate-200/90 dark:border-[#1E3B60] shadow-sm hover:border-[#4A74A7] transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#4A74A7] dark:group-hover:text-[#DCEAF7] transition-colors">
              Driver&apos;s License & Identity
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Manage verification for rapid pickup</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#4A74A7] group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

    </div>
  );
}
