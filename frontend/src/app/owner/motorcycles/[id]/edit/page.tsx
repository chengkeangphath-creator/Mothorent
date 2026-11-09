'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { motorcycleService } from '../../../../../lib/api';
import { Motorcycle } from '../../../../../types';

export default function EditMotorcyclePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const motorcycleId = Number(resolvedParams.id);
  const router = useRouter();

  const [bike, setBike] = useState<Motorcycle | null>(null);
  const [title, setTitle] = useState('');
  const [dailyPrice, setDailyPrice] = useState(10);
  const [depositAmount, setDepositAmount] = useState(50);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    motorcycleService.getById(motorcycleId).then(data => {
      if (data) {
        setBike(data);
        setTitle(data.title);
        setDailyPrice(data.daily_price);
        setDepositAmount(data.deposit_amount);
        setDescription(data.description);
      }
      setLoading(false);
    });
  }, [motorcycleId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bike) return;
    await motorcycleService.update(bike.id, {
      title,
      daily_price: dailyPrice,
      deposit_amount: depositAmount,
      description
    });
    router.push('/owner/motorcycles');
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading...</div>;
  if (!bike) return <div className="p-12 text-center text-slate-500">Motorcycle not found.</div>;

  return (
    <div className="space-y-6">
      <Link href="/owner/motorcycles" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600">
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Fleet</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
        <h1 className="text-2xl font-black text-slate-900">Edit {bike.title}</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Listing Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Daily Price (USD)</label>
              <input
                type="number"
                required
                value={dailyPrice}
                onChange={(e) => setDailyPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Deposit (USD)</label>
              <input
                type="number"
                required
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="btn-glow px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Updates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
