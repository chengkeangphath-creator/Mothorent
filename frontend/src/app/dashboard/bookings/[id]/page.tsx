'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Printer, 
  Navigation,
  ExternalLink,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { bookingService } from '../../../../lib/api';
import { Booking } from '../../../../types';

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bookingId = Number(resolvedParams.id);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getById(bookingId).then(data => {
      setBooking(data);
      setLoading(false);
    });
  }, [bookingId]);

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading booking receipt...</div>;
  }

  if (!booking) {
    return (
      <div className="p-12 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Booking not found</h3>
        <Link href="/dashboard/bookings" className="text-xs text-orange-600 font-bold">
          ← Back to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Bookings</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Print Receipt</span>
        </button>
      </div>

      {/* Main Receipt Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
              Official Reservation Receipt
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">
              Booking {booking.booking_code}
            </h1>
            <p className="text-xs text-slate-400">Created on {new Date(booking.created_at).toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              booking.status === 'approved'
                ? 'bg-emerald-100 text-emerald-800'
                : booking.status === 'pending'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
            }`}>
              {booking.status}
            </span>
          </div>
        </div>

        {/* Motorcycle & Owner Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={booking.motorcycle?.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80'}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Reserved Motorcycle
              </span>
              <h3 className="font-bold text-base text-slate-900">{booking.motorcycle?.title}</h3>
              <p className="text-xs text-slate-500">${booking.daily_price}/day • {booking.motorcycle?.province_name}</p>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-600 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200/70 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner Contact</span>
            <h4 className="font-bold text-sm text-slate-900">{booking.owner_name}</h4>
            <p className="flex items-center gap-1.5 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{booking.owner_phone}</span>
            </p>
          </div>
        </div>

        {/* Itinerary & Pickup Map Box */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pickup Instructions & GPS Location</h3>
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">{booking.pickup_address}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Coordinates: {booking.pickup_latitude.toFixed(4)}, {booking.pickup_longitude.toFixed(4)}
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${booking.pickup_latitude},${booking.pickup_longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate With Google Maps</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
            </div>
          </div>
        </div>

        {/* Invoice Itemized Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Financial Breakdown</h3>
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <div className="flex justify-between p-3.5 bg-slate-50 font-bold text-slate-600 border-b border-slate-200">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="p-3.5 flex justify-between border-b border-slate-100 text-slate-700">
              <span>Rental Fee ({booking.total_days} Days @ ${booking.daily_price}/day)</span>
              <span className="font-bold">${booking.total_price}.00 USD</span>
            </div>
            <div className="p-3.5 flex justify-between border-b border-slate-100 text-slate-700">
              <span>2 Helmets & Phone Mount Rental</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="p-3.5 flex justify-between border-b border-slate-100 text-slate-700">
              <span>Refundable Security Deposit (Returned on bike drop-off)</span>
              <span className="font-bold">${booking.deposit_amount}.00 USD</span>
            </div>
            <div className="p-4 flex justify-between bg-slate-50 font-black text-sm text-slate-900">
              <span>Total Amount (Rental + Deposit)</span>
              <span className="text-orange-600">${booking.total_price + booking.deposit_amount}.00 USD</span>
            </div>
          </div>
        </div>

        {/* Special Notes if any */}
        {booking.notes && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs space-y-1">
            <span className="font-bold text-amber-900 uppercase text-[10px]">Your Special Notes</span>
            <p className="text-amber-800">{booking.notes}</p>
          </div>
        )}

      </div>

    </div>
  );
}
