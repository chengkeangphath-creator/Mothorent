'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Bike, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  Upload, 
  Plus, 
  X,
  Navigation
} from 'lucide-react';
import { motorcycleService } from '../../../../lib/api';
import { CAMBODIA_PROVINCES } from '../../../../data/mockData';
import { MotorcycleType, TransmissionType } from '../../../../types';

export default function AddMotorcyclePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Honda');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2024);
  const [type, setType] = useState<MotorcycleType>('scooter');
  const [engineCapacity, setEngineCapacity] = useState(125);
  const [transmission, setTransmission] = useState<TransmissionType>('automatic');
  const [dailyPrice, setDailyPrice] = useState(12);
  const [weeklyPrice, setWeeklyPrice] = useState(70);
  const [depositAmount, setDepositAmount] = useState(50);
  const [provinceName, setProvinceName] = useState('Siem Reap');
  const [address, setAddress] = useState('Old Market Area, Street 08, Siem Reap');
  const [latitude, setLatitude] = useState(13.3547);
  const [longitude, setLongitude] = useState(103.8548);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80');
  
  // Selected Features
  const [features, setFeatures] = useState<string[]>([
    "2 Clean Helmets Included",
    "Secure Phone Mount",
    "Full Fuel Tank on Pickup"
  ]);

  const availableFeatures = [
    "2 Clean Helmets Included",
    "Secure Phone Mount",
    "USB Phone Charger Port",
    "Full Fuel Tank on Pickup",
    "Luggage Bungee Straps",
    "Rain Ponchos Included",
    "Tool Kit & Spare Tube",
    "24/7 Breakdown Roadside Assist"
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFeature = (feat: string) => {
    setFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const handleProvinceChange = (name: string) => {
    setProvinceName(name);
    const prov = CAMBODIA_PROVINCES.find(p => p.name === name);
    if (prov) {
      setLatitude(prov.latitude);
      setLongitude(prov.longitude);
      setAddress(`${name} Town Center, Cambodia`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setIsSubmitting(true);

    try {
      await motorcycleService.create({
        title,
        brand,
        model: model || title,
        year,
        type,
        engine_capacity: engineCapacity,
        transmission,
        daily_price: dailyPrice,
        weekly_price: weeklyPrice,
        deposit_amount: depositAmount,
        province_name: provinceName,
        address,
        latitude,
        longitude,
        description: description || "Reliable and fully inspected motorcycle ready for exploring Cambodia.",
        features,
        images: [imageUrl],
      });
      router.push('/owner/motorcycles');
    } catch {
      alert("Error creating listing.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/owner/motorcycles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div>
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
            Owner Fleet Registration
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-0.5">
            List a New Motorcycle
          </h1>
          <p className="text-xs text-slate-500">
            Provide accurate details, Google Maps pickup point, and photos to maximize rental bookings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Motorcycle Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Listing Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Honda Scoopy Prestige 2024 (Smart Key)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Brand / Make</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-semibold bg-white"
                >
                  <option value="Honda">Honda</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="Kawasaki">Kawasaki</option>
                  <option value="Suzuki">Suzuki</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Model Name</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Click 160 or Scoopy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as MotorcycleType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-semibold bg-white"
                >
                  <option value="scooter">Automatic Scooter (110-160cc)</option>
                  <option value="dirt_bike">Dual Sport / Dirt Bike</option>
                  <option value="manual">Manual / Semi-Automatic</option>
                  <option value="sport">Sport Street Bike</option>
                  <option value="touring">Adventure Touring</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Engine Capacity (cc)</label>
                <input
                  type="number"
                  value={engineCapacity}
                  onChange={(e) => setEngineCapacity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-semibold bg-white"
                >
                  <option value="automatic">Automatic</option>
                  <option value="semi-automatic">Semi-Automatic</option>
                  <option value="manual">Manual with Clutch</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Manufacturing Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Deposit */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Rental Rates & Security Deposit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Daily Rate (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Weekly Rate (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={weeklyPrice}
                    onChange={(e) => setWeeklyPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Refundable Deposit (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Google Maps */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Pickup Location & Google Maps Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Cambodia Province</label>
                <select
                  value={provinceName}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-semibold bg-white"
                >
                  {CAMBODIA_PROVINCES.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.name_kh})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Street Address / Landmark</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Street 08, Old Market Area"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Latitude (GPS)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Longitude (GPS)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Features Checkboxes */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              4. Included Amenities & Gear
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableFeatures.map((feat) => {
                const checked = features.includes(feat);
                return (
                  <label
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-colors ${
                      checked
                        ? 'bg-orange-50/50 border-orange-300 text-orange-950'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                    <span>{feat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Photo & Description */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              5. Photos & Description
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Image Photo URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe condition, pickup instructions, mileage restrictions (if any)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3">
            <Link
              href="/owner/motorcycles"
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-glow px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Publishing Listing...' : 'Publish Motorcycle Listing'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
