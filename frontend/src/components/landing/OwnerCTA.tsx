'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, DollarSign, CalendarCheck, LayoutDashboard, ArrowRight, ShieldCheck } from 'lucide-react';
import { OWNER_BENEFITS } from '../../data/landing';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export default function OwnerCTA() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const handleListMotorcycleClick = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/owner/motorcycles/add');
    } else {
      router.push('/owner/motorcycles/add');
    }
  };

  const getBenefitIcon = (index: number) => {
    switch (index) {
      case 0:
        return <DollarSign className="w-6 h-6 text-[#4A74A7]" />;
      case 1:
        return <CalendarCheck className="w-6 h-6 text-[#4A74A7]" />;
      case 2:
        return <LayoutDashboard className="w-6 h-6 text-[#4A74A7]" />;
      default:
        return <KeyRound className="w-6 h-6 text-[#4A74A7]" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="owner-cta">
      
      {/* Outer Banner in Farnegar Navy (#142A44) with dark accents */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#142A44] via-[#081426] to-[#142A44] border border-[#1E3B60] text-white p-8 sm:p-14 shadow-2xl">
        
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4A74A7]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#081426] border border-[#1E3B60] text-xs font-bold text-[#DCEAF7]">
              <KeyRound className="w-3.5 h-3.5 text-[#4A74A7]" />
              <span>{isKhmer ? 'សម្រាប់ម្ចាស់ម៉ូតូក្នុងស្រុក' : 'Become a Motorcycle Host'}</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {isKhmer ? (
                  <>
                    មានម៉ូតូទំនេរមិនសូវជិះ? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] to-[#4A74A7]">
                      ចុះឈ្មោះជួលម៉ូតូរបស់អ្នកជាមួយយើង
                    </span>
                  </>
                ) : (
                  <>
                    Turn Your Motorcycle Into <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] to-[#4A74A7]">
                      Steady Monthly Income
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {isKhmer
                  ? 'ចូលរួមជាមួយបណ្តាញម្ចាស់ម៉ូតូទូទាំងប្រទេសកម្ពុជា។ ទទួលបានភ្ញៀវទេសចរដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណត្រឹមត្រូវ និងគ្រប់គ្រងប្រតិបត្តិការតាមទូរស័ព្ទរបស់អ្នក។'
                  : 'Join hundreds of trusted local hosts in Phnom Penh, Siem Reap, and Kampot. Earn between $250 and $800+ monthly renting safely to verified travelers.'}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleListMotorcycleClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-xl shadow-[#4A74A7]/30"
              >
                {isKhmer ? 'ចុះឈ្មោះដាក់ជួលម៉ូតូ' : 'List Your Motorcycle'}
              </Button>

              <Button
                href="/about"
                variant="secondary"
                size="lg"
                className="border border-[#1E3B60]"
              >
                {isKhmer ? 'ស្វែងយល់បន្ថែម' : 'How Host Protection Works'}
              </Button>
            </div>
          </div>

          {/* Right 3 Benefits Cards */}
          <div className="lg:col-span-6 space-y-4">
            {OWNER_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#142A44]/80 backdrop-blur-md rounded-2xl p-5 border border-[#1E3B60] flex items-start gap-4 hover:border-[#4A74A7] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#081426] border border-[#1E3B60] flex items-center justify-center shrink-0">
                  {getBenefitIcon(idx)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {isKhmer ? benefit.titleKh : benefit.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {isKhmer ? benefit.descriptionKh : benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
