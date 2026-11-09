'use client';

import React from 'react';
import Link from 'next/link';
import { Bike, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LandingFooter() {
  const { language, setLanguage } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <footer className="bg-[#081426] text-slate-300 border-t border-[#142A44] pt-16 pb-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#142A44]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 select-none" aria-label="Motho Rent Home">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center text-white shadow-md shadow-[#4A74A7]/30">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                MOTHO<span className="text-[#DCEAF7]">RENT</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isKhmer
                ? 'វេទិកាជួលម៉ូតូឈានមុខគេនៅកម្ពុជា សម្រាប់ភ្ញៀវទេសចរជាតិ និងអន្តរជាតិ។ តភ្ជាប់ផ្ទាល់ជាមួយម្ចាស់ម៉ូតូក្នុងស្រុក គ្មានការដកហូតលិខិតឆ្លងដែន។'
                : 'Cambodia’s premier motorcycle rental marketplace connecting international tourists with verified local bike hosts across all 25 provinces.'}
            </p>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#142A44] border border-[#1E3B60] text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#DCEAF7]" />
                <span>100% Verified Hosts</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#142A44] border border-[#1E3B60] text-slate-200">
                <span className="text-[#4A74A7] font-bold">2x</span>
                <span>Free Helmets</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isKhmer ? 'តំណភ្ជាប់រហ័ស' : 'Explore Fleet'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/motorcycles?type=scooter" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ម៉ូតូអូតូ (Scooters)' : 'Automatic Scooters'}
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?type=dirt_bike" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ម៉ូតូកែច្នៃផ្លូវលំបាក' : 'Dirt Bikes & Dual-Sport'}
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?type=semi-auto" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ម៉ូតូលេខជើងសន្សំសំចៃ' : 'Semi-Automatic (Wave)'}
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?type=manual" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ម៉ូតូធំទេសចរណ៍' : 'Adventure Touring Bikes'}
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ផែនទីទីតាំងទទួលម៉ូតូ' : 'Interactive Map Search'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isKhmer ? 'ខេត្តពេញនិយម' : 'Top Destinations'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/motorcycles?province=Siem%20Reap" className="hover:text-[#DCEAF7] transition-colors">
                  Siem Reap (Angkor)
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?province=Phnom%20Penh" className="hover:text-[#DCEAF7] transition-colors">
                  Phnom Penh Capital
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?province=Kampot" className="hover:text-[#DCEAF7] transition-colors">
                  Kampot & Bokor Mountain
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?province=Sihanoukville" className="hover:text-[#DCEAF7] transition-colors">
                  Sihanoukville & Koh Rong
                </Link>
              </li>
              <li>
                <Link href="/motorcycles?province=Battambang" className="hover:text-[#DCEAF7] transition-colors">
                  Battambang Colonial Loop
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isKhmer ? 'ជំនួយ និងទំនាក់ទំនង' : 'Support & Contact'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'អំពី Motho Rent' : 'About Us & Mission'}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'សំណួរដែលសួរញឹកញាប់' : 'Rental FAQ'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ទំនាក់ទំនងក្រុមការងារ' : 'Contact Support'}
                </Link>
              </li>
              <li>
                <Link href="/owner" className="hover:text-[#DCEAF7] transition-colors">
                  {isKhmer ? 'ចុះឈ្មោះជាម្ចាស់ម៉ូតូ' : 'Host Your Motorcycle'}
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
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

        {/* Bottom Bar: Social Icons, Language Selector & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          
          <p>© {new Date().getFullYear()} Motho Rent. All rights reserved. Cambodia Two-Wheels Marketplace.</p>

          {/* Language Selector in Footer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#4A74A7]" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setLanguage('km')}
                className={`transition-colors ${language === 'km' ? 'text-[#DCEAF7] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                ភាសាខ្មែរ
              </button>
            </div>

            {/* Social Icons SVG */}
            <div className="flex items-center gap-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-[#142A44] hover:text-white hover:bg-[#1E3B60] transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#142A44] hover:text-white hover:bg-[#1E3B60] transition-colors" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
