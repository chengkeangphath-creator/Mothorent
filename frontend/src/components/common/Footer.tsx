'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, Phone, Mail, ShieldCheck } from 'lucide-react';
import { CAMBODIA_PROVINCES } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  // Hide footer on dedicated fullscreen auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <footer className="bg-slate-100 dark:bg-[#081426] text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-[#142A44] pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-[#142A44]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center shadow-md shadow-[#4A74A7]/30">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                MOTHO<span className="text-[#4A74A7] dark:text-[#DCEAF7]">RENT</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60]">
                <ShieldCheck className="w-4 h-4 text-[#4A74A7] dark:text-[#DCEAF7]" />
                <span>{t.footer.verifiedOwners}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60]">
                <span className="text-[#4A74A7] font-bold">$0</span>
                <span>{t.footer.zeroFees}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t.footer.explore}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/motorcycles" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.footer.allBikes}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.footer.findMap}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.footer.howItWorks}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Rental Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t.footer.topDestinations}</h4>
            <ul className="space-y-2 text-sm">
              {CAMBODIA_PROVINCES.slice(0, 5).map(p => (
                <li key={p.id}>
                  <Link 
                    href={`/motorcycles?province=${encodeURIComponent(p.name)}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors flex items-center justify-between"
                  >
                    <span>{language === 'km' ? p.name_kh : p.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">({p.motorcycle_count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Host & Community */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t.footer.needHelp}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/owner" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.footer.listBike}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-600 dark:text-slate-300 hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">
                  {t.nav.login}
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#4A74A7]" />
                <span>+855 23 999 888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#4A74A7]" />
                <span>support@mothorent.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Motho Rent Cambodia. {t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
