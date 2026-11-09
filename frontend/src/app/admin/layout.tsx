'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Users, 
  Store, 
  Map, 
  Bike, 
  Calendar, 
  CreditCard, 
  Star, 
  BarChart3, 
  Bot, 
  LogOut,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Owner Approvals', href: '/admin/owners', icon: Store },
    { label: '25 Provinces', href: '/admin/provinces', icon: Map },
    { label: 'Fleet Moderation', href: '/admin/motorcycles', icon: Bike },
    { label: 'Master Bookings', href: '/admin/bookings', icon: Calendar },
    { label: 'Transactions & Payouts', href: '/admin/payments', icon: CreditCard },
    { label: 'Review Moderation', href: '/admin/reviews', icon: Star },
    { label: 'Platform Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'AI Management', href: '/admin/ai', icon: Bot },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-[#081426] text-white py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Admin Sidebar Navigation */}
          <div className="space-y-6">
            
            {/* Admin Badge */}
            <div className="bg-[#142A44] rounded-3xl p-6 border border-[#1E3B60] text-center space-y-3 shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-[#4A74A7] text-white font-black text-xl flex items-center justify-center mx-auto shadow-xl shadow-[#4A74A7]/20">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{user?.name || "System Admin"}</h3>
                <p className="text-xs text-[#DCEAF7] font-semibold uppercase tracking-wider">Super Administrator</p>
              </div>
              <p className="text-[11px] text-slate-400">Full Access Control • Cambodia</p>
            </div>

            {/* Nav Links */}
            <nav className="bg-[#142A44] rounded-3xl p-4 border border-[#1E3B60] space-y-1 shadow-md">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Admin Console
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
                        ? 'bg-[#4A74A7] text-white shadow-md shadow-[#4A74A7]/25'
                        : 'text-slate-300 hover:text-white hover:bg-[#1E3B60]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-500'}`} />
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[#1E3B60]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
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
