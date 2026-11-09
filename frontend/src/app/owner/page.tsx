'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bike, 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  PlusCircle, 
  Check, 
  X, 
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';
import { motorcycleService, bookingService } from '../../lib/api';
import { Motorcycle, Booking } from '../../types';

export default function OwnerOverviewPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    motorcycleService.getAll().then(data => setMotorcycles(data));
    bookingService.getAll().then(data => setBookings(data));
  }, []);

  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalEarnings = completedBookings.reduce((sum, b) => sum + b.total_price, 0) + 1280; // plus existing baseline

  const handleAccept = async (id: number) => {
    const updated = await bookingService.updateStatus(id, 'approved');
    setBookings(prev => prev.map(b => b.id === id ? updated : b));
  };

  const handleReject = async (id: number) => {
    const updated = await bookingService.updateStatus(id, 'rejected');
    setBookings(prev => prev.map(b => b.id === id ? updated : b));
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#0C1E36] dark:bg-[#081426] rounded-3xl p-6 sm:p-8 text-white border border-slate-200/10 dark:border-[#1E3B60] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#DCEAF7] uppercase tracking-wider">
            Owner Fleet Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Angkor Moto Rentals & Tours
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor incoming tourist booking requests and manage fleet availability.
          </p>
        </div>

        <Link
          href="/owner/motorcycles/add"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#4A74A7] hover:bg-[#3A608F] text-white font-bold text-xs shadow-lg shadow-[#4A74A7]/25 transition-all self-start sm:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Motorcycle</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-5 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Total Fleet</span>
            <Bike className="w-4 h-4 text-[#4A74A7] dark:text-[#6A95CA]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{motorcycles.length}</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Active listings in Cambodia</p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-5 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Pending Requests</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">{pendingRequests.length}</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Requires owner action</p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-5 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Gross Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">${totalEarnings} USD</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+18% this month</p>
        </div>

        <div className="bg-white dark:bg-[#142A44] rounded-3xl p-5 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Fleet Utilization</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">84%</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">High seasonal demand</p>
        </div>
      </div>

      {/* Pending Booking Requests Section */}
      <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Incoming Booking Requests</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Review customer dates, accept to confirm or reject.</p>
          </div>
          <Link href="/owner/bookings" className="text-xs font-bold text-[#4A74A7] dark:text-[#DCEAF7] hover:underline">
            View All Requests →
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No pending booking requests at this moment.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#4A74A7]/15 dark:bg-[#142A44] text-[#4A74A7] dark:text-[#DCEAF7] flex items-center justify-center shrink-0 border border-[#4A74A7]/20">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#4A74A7] dark:text-[#DCEAF7] bg-[#4A74A7]/10 dark:bg-[#142A44] px-2 py-0.5 rounded border border-[#4A74A7]/20">
                      {req.booking_code}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                      {req.motorcycle?.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Renter: <strong className="text-slate-700 dark:text-slate-200">{req.customer_name}</strong> • {req.start_date} to {req.end_date} ({req.total_days} days)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="text-right mr-2">
                    <p className="text-sm font-black text-slate-900 dark:text-white">${req.total_price} USD</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+${req.deposit_amount} Deposit</p>
                  </div>

                  <button
                    onClick={() => handleAccept(req.id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept</span>
                  </button>

                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-200 dark:bg-[#1E3B60] hover:bg-rose-100 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200 hover:text-rose-700 dark:hover:text-rose-400 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
