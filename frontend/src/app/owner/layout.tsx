'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bike, 
  PlusCircle, 
  CalendarCheck, 
  History, 
  DollarSign, 
  Star, 
  Store, 
  ShieldCheck, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/owner', icon: LayoutDashboard },
    { label: 'My Fleet', href: '/owner/motorcycles', icon: Bike },
    { label: 'Add Motorcycle', href: '/owner/motorcycles/add', icon: PlusCircle },
    { label: 'Booking Requests', href: '/owner/bookings', icon: CalendarCheck },
    { label: 'Rental History', href: '/owner/history', icon: History },
    { label: 'Earnings & Payouts', href: '/owner/earnings', icon: DollarSign },
    { label: 'Fleet Reviews', href: '/owner/reviews', icon: Star },
    { label: 'Owner Profile', href: '/owner/profile', icon: Store },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-[#081426] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Owner Sidebar Navigation */}
          <div className="space-y-6">
            
            {/* Owner Shop Profile */}
            <div className="bg-[#0C1E36] dark:bg-[#142A44] rounded-3xl p-6 text-white border border-slate-200/10 dark:border-[#1E3B60] shadow-md text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#4A74A7] text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-[#4A74A7]/25">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  'O'
                )}
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{user?.business_name || user?.name || "Angkor Moto Rentals"}</h3>
                <p className="text-xs text-slate-400">Owner Portal • Cambodia</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Host</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="bg-white dark:bg-[#142A44] rounded-3xl p-4 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Fleet Management
              </div>
              {links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#4A74A7] text-white shadow-md shadow-[#4A74A7]/20'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#081426]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-300 dark:text-slate-500'}`} />
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-slate-100 dark:border-[#1E3B60]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </nav>

          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}
