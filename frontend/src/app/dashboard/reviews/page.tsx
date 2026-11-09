'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Bike } from 'lucide-react';
import { reviewService } from '../../../lib/api';
import { Review } from '../../../types';

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In mock data, fetch motorcycle 1 reviews
    reviewService.getByMotorcycle(1).then(data => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">My Reviews</h1>
        <p className="text-xs text-slate-500">Reviews you&apos;ve shared for motorcycles and hosts in Cambodia.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No Reviews Written Yet</h3>
          <p className="text-xs text-slate-500">After completing a trip, share your experience to help fellow travelers.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
