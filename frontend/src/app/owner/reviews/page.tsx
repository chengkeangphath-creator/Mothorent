'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { reviewService } from '../../../lib/api';
import { Review } from '../../../types';

export default function OwnerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    reviewService.getByMotorcycle(1).then(data => setReviews(data));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Fleet Customer Reviews</h1>
        <p className="text-xs text-slate-500">Feedback and ratings submitted by travelers who rented from your fleet.</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{r.user_name}</h4>
                <p className="text-[10px] text-slate-400">{r.user_country || 'Traveler'} • {new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
