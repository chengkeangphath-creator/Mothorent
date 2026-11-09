'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Gauge, 
  Fuel, 
  ShieldCheck, 
  Calendar, 
  CheckCircle, 
  Heart, 
  Share2, 
  Phone, 
  MessageSquare,
  Navigation,
  ExternalLink,
  ChevronLeft,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { motorcycleService, reviewService } from '../../../lib/api';
import { Motorcycle, Review } from '../../../types';
import { useFavorites } from '../../../context/FavoritesContext';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import BookingModal from '../../../components/common/BookingModal';

export default function MotorcycleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const resolvedParams = use(params);
  const motorcycleId = Number(resolvedParams.id);

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Review form state
  const [userRating, setUserRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const bike = await motorcycleService.getById(motorcycleId);
      if (bike) {
        setMotorcycle(bike);
        setSelectedImage(bike.images[0] || '');
        const revs = await reviewService.getByMotorcycle(motorcycleId);
        setReviews(revs);
      }
      setLoading(false);
    }
    loadData();
  }, [motorcycleId]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm font-semibold text-slate-500">Loading motorcycle details...</p>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-800">Motorcycle Not Found</h2>
        <p className="text-slate-500 text-sm">The requested listing does not exist or was removed.</p>
        <Link
          href="/motorcycles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(motorcycle.id);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
      return;
    }
    if (!reviewComment.trim()) return;
    setSubmittingReview(true);
    try {
      const newRev = await reviewService.create({
        motorcycle_id: motorcycle.id,
        rating: userRating,
        comment: reviewComment.trim(),
      });
      setReviews(prev => [newRev, ...prev]);
      setReviewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/motorcycles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Motorcycles</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
                return;
              }
              toggleFavorite(motorcycle.id);
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              favorited 
                ? 'bg-rose-50 border-rose-200 text-rose-500' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-rose-500'
            }`}
            title={favorited ? "Remove from favorites" : "Save to favorites (Sign In Required)"}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Details on Left, Booking Sticky Box on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt={motorcycle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider">
                  {motorcycle.type.replace('_', ' ')}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-orange-500 text-white font-bold text-xs">
                  {motorcycle.year}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {motorcycle.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {motorcycle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 h-18 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Headline Specs */}
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-[#1E3B60]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4A74A7] dark:text-[#DCEAF7]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{motorcycle.province_name}, Cambodia</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-slate-400">{motorcycle.address}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {motorcycle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 px-3 py-1 rounded-full font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{motorcycle.rating.toFixed(2)}</span>
                <span className="text-slate-400 font-normal">({reviews.length} reviews)</span>
              </div>

              {motorcycle.owner_verified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified Motorcycle Owner</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technical Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#142A44] border border-slate-200/80 dark:border-[#1E3B60]">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">Engine</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1">{motorcycle.engine_capacity} cc</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#142A44] border border-slate-200/80 dark:border-[#1E3B60]">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">Transmission</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1 capitalize">{motorcycle.transmission}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#142A44] border border-slate-200/80 dark:border-[#1E3B60]">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">Fuel Efficiency</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1">{motorcycle.fuel_consumption || '45 km/L'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#142A44] border border-slate-200/80 dark:border-[#1E3B60]">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">Security Deposit</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1">${motorcycle.deposit_amount} USD</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">About this Motorcycle</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {motorcycle.description}
            </p>
          </div>

          {/* Included Features & Gear */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Included Features & Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {motorcycle.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pickup Location & Google Maps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pickup Location in {motorcycle.province_name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{motorcycle.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${motorcycle.latitude},${motorcycle.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-[#142A44] text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-[#1E3B60] transition-colors border border-transparent dark:border-[#1E3B60]"
              >
                <Navigation className="w-3.5 h-3.5 text-[#4A74A7]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Visual map preview banner */}
            <div className="relative h-60 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-[#1E3B60] flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-3 z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#4A74A7] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#4A74A7]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base">{motorcycle.address}</h4>
                <p className="text-xs text-slate-400">
                  Fixed GPS Coordinates: {motorcycle.latitude.toFixed(4)}, {motorcycle.longitude.toFixed(4)}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${motorcycle.latitude},${motorcycle.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-[#DCEAF7] hover:underline"
                >
                  View Landmark & Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-[#1E3B60]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Renter Reviews</span>
                <span className="text-sm text-slate-400 font-normal">({reviews.length})</span>
              </h2>
            </div>

            {/* Add Review Box */}
            <form onSubmit={handleAddReview} className="bg-slate-50 dark:bg-[#142A44] rounded-2xl p-5 border border-slate-200 dark:border-[#1E3B60] space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">Leave a Review</h4>
              
              {reviewSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thank you! Your review has been added.</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your rental experience with this motorcycle and owner..."
                rows={3}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7] bg-white dark:bg-[#081426]"
              />

              <button
                type="submit"
                disabled={submittingReview}
                className="px-4 py-2 rounded-xl bg-[#4A74A7] hover:bg-[#3A608F] disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-white dark:bg-[#142A44] border border-slate-200/80 dark:border-[#1E3B60] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                        {rev.user_avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={rev.user_avatar} alt={rev.user_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">
                            {rev.user_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.user_name}</h4>
                        <p className="text-[10px] text-slate-400">{rev.user_country || 'Traveler'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Booking Widget & Owner Info (1 Col) */}
        <div className="space-y-6">
          
          <div className="sticky top-28 space-y-6">
            
            {/* Price & Booking Box */}
            <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-xl space-y-6">
              
              <div className="flex items-baseline justify-between pb-4 border-b border-slate-100 dark:border-[#1E3B60]">
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">${motorcycle.daily_price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / day</span>
                </div>
                {motorcycle.weekly_price && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                    ${motorcycle.weekly_price} / week
                  </span>
                )}
              </div>

              {/* Quick highlights */}
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong className="text-slate-900 dark:text-white">{motorcycle.province_name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">Instant Confirmation</strong>
                </div>
                <div className="flex justify-between">
                  <span>Refundable Deposit:</span>
                  <strong className="text-slate-900 dark:text-white">${motorcycle.deposit_amount} USD</strong>
                </div>
                <div className="flex justify-between">
                  <span>Helmets Included:</span>
                  <strong className="text-slate-900 dark:text-white">2 Clean Helmets</strong>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    router.push(`/login?redirect=/motorcycles/${motorcycle.id}`);
                    return;
                  }
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-4 px-6 rounded-2xl btn-glow text-white font-black text-sm shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Motorcycle</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Free cancellation up to 24 hours before pickup. No credit card required to request.
              </p>
            </div>

            {/* Owner Profile Card */}
            <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Motorcycle Owner
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={motorcycle.owner_avatar} alt={motorcycle.owner_name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{motorcycle.owner_name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Identity Verified Owner</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#1E3B60] space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#4A74A7]" />
                  <span>{motorcycle.owner_phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#4A74A7]" />
                  <span>Response time: Under 15 mins</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        motorcycle={motorcycle}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}
