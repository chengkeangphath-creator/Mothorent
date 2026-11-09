'use client';

import React, { useState } from 'react';
import { Motorcycle, Booking } from '../../types';
import { bookingService } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  MapPin,
  Lock,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

interface BookingModalProps {
  motorcycle: Motorcycle | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (booking: Booking) => void;
}

export default function BookingModal({
  motorcycle,
  isOpen,
  onClose,
  onSuccess
}: BookingModalProps) {
  const { isAuthenticated, user } = useAuth();

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthGate, setShowAuthGate] = useState(false);

  if (!isOpen || !motorcycle) return null;

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const subtotal = rentalDays * motorcycle.daily_price;
  const deposit = motorcycle.deposit_amount;
  const totalDueAtPickup = subtotal + deposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If user is not authenticated, block booking and show sign-in gate
    if (!isAuthenticated) {
      setShowAuthGate(true);
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select both pickup and return dates.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError("Return date must be after pickup date.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await bookingService.create({
        motorcycle_id: motorcycle.id,
        start_date: startDate,
        end_date: endDate,
        notes: notes.trim(),
      });
      setCreatedBooking(res);
      if (onSuccess) onSuccess(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create booking.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCreatedBooking(null);
    setError(null);
    setShowAuthGate(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#142A44] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1E3B60] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 dark:bg-[#081426] text-white border-b border-slate-800 dark:border-[#1E3B60]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A74A7]/20 text-[#DCEAF7] border border-[#4A74A7]/30 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {createdBooking ? "Booking Request Sent!" : showAuthGate ? "Sign In to Complete Booking" : "Reserve Motorcycle"}
              </h3>
              <p className="text-xs text-slate-400">{motorcycle.title}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 dark:bg-[#142A44] text-slate-400 dark:text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {createdBooking ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Request Submitted Successfully</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Your reservation code is <strong className="text-[#4A74A7] dark:text-[#DCEAF7] font-mono">{createdBooking.booking_code}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-100 dark:border-[#1E3B60] text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="font-bold">{createdBooking.total_days} Days ({createdBooking.start_date} to {createdBooking.end_date})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Rental:</span>
                <span className="font-bold">${createdBooking.total_price} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Refundable Deposit:</span>
                <span className="font-bold">${createdBooking.deposit_amount} USD</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 dark:border-[#1E3B60] pt-2">
                <span className="text-slate-400">Pickup Location:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[220px]">{createdBooking.pickup_address}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              The motorcycle owner (<strong className="text-slate-700 dark:text-slate-300">{motorcycle.owner_name}</strong>) has been notified and will approve your request shortly.
            </p>

            <div className="pt-2 flex gap-3">
              <Link
                href="/dashboard/bookings"
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-[#4A74A7] hover:bg-[#3A608F] text-white font-bold text-xs shadow-lg shadow-[#4A74A7]/25 transition-all text-center"
              >
                View in My Bookings
              </Link>
              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-[#081426] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : showAuthGate ? (
          /* Sign-In Required Screen for Logged-Out Users */
          <div className="p-6 text-center space-y-5 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#4A74A7]/15 dark:bg-[#081426] text-[#4A74A7] dark:text-[#DCEAF7] border border-[#4A74A7]/30 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Account Required to Complete Booking
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                You can browse and calculate prices freely as a guest, but an account is required to protect your reservation and connect directly with host <strong>{motorcycle.owner_name}</strong>.
              </p>
            </div>

            {/* Selected Booking Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Motorcycle:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{motorcycle.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dates:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{startDate} to {endDate} ({rentalDays} days)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-[#1E3B60] pt-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total at Pickup:</span>
                <span className="font-black text-[#4A74A7] dark:text-[#DCEAF7]">${totalDueAtPickup} USD</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href={`/login?redirect=/motorcycles/${motorcycle.id}`}
                className="w-full py-3.5 px-4 rounded-xl btn-glow text-white font-black text-xs shadow-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Confirm Reservation</span>
              </Link>
              <Link
                href="/register"
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#081426] dark:hover:bg-[#1E3B60] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-[#1E3B60] font-bold text-xs transition-colors text-center"
              >
                Create a Free Account
              </Link>
              <button
                type="button"
                onClick={() => setShowAuthGate(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 mt-1 cursor-pointer"
              >
                ← Back to date selection
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Date Range Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Pickup Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={todayStr}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Return Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || todayStr}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                />
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#081426] border border-slate-200/80 dark:border-[#1E3B60] space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Rental Rate:</span>
                <span className="font-semibold">${motorcycle.daily_price} × {rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Rental Total:</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal} USD</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-[#1E3B60]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Refundable Deposit:
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">${deposit} USD</span>
              </div>
              <div className="flex items-center justify-between text-xs font-black text-[#4A74A7] dark:text-[#DCEAF7] pt-2 border-t border-slate-200 dark:border-[#1E3B60]">
                <span>Total Due at Pickup:</span>
                <span>${totalDueAtPickup} USD</span>
              </div>
            </div>

            {/* Special Instructions / Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Special Requests / Arrival Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Arriving by Giant Ibis bus around 9 AM, need XL helmet..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
              />
            </div>

            {/* Pickup Notice */}
            <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0 mt-0.5" />
              <span>
                Pickup address: <strong className="text-slate-700 dark:text-slate-200">{motorcycle.address}</strong> ({motorcycle.province_name})
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl btn-glow disabled:opacity-50 text-white font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {isSubmitting
                  ? 'Sending Request...'
                  : isAuthenticated
                  ? 'Confirm Booking Request'
                  : 'Continue to Confirm (Sign In Required)'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
