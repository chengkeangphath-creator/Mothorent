'use client';

import React, { useState } from 'react';
import { Star, Trash2, CheckCircle } from 'lucide-react';
import { MOCK_REVIEWS } from '../../../data/mockData';
import { Review } from '../../../types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  const handleDelete = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Review Moderation</h1>
        <p className="text-xs text-slate-400">Moderate customer ratings and prevent spam or abusive language.</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{r.user_name}</span>
                <span className="text-[10px] text-slate-400">({r.user_country || 'Traveler'})</span>
                <span className="text-slate-600">•</span>
                <span className="text-[10px] text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 my-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{r.comment}</p>
            </div>

            <button
              onClick={() => handleDelete(r.id)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
              title="Delete review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
