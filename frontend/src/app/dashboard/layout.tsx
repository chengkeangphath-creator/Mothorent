'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Heart, 
  Bell, 
  Star, 
  User, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  AlertCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function DeniedBanner() {
  const searchParams = useSearchParams();
  const denied = searchParams.get('denied');
  const [dismissed, setDismissed] = useState(false);

  if (!denied || dismissed) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3 shadow-sm animate-in fade-in duration-200">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            {denied === 'admin' ? 'Administrator Access Restricted' : 'Owner Portal Access Restricted'}
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-[11px] mt-0.5 leading-relaxed">
            {denied === 'admin'
              ? 'The requested administrative panel requires Super Administrator privileges. You have been safely redirected to your Customer Dashboard.'
              : 'The Owner Portal is reserved for registered motorcycle hosts. You can list a motorcycle anytime or browse the public fleet.'}
          </p>
        </div>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer p-1"
        title="Dismiss notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
    { label: 'Saved Favorites', href: '/dashboard/favorites', icon: Heart },
    { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { label: 'My Reviews', href: '/dashboard/reviews', icon: Star },
    { label: 'Profile & License', href: '/dashboard/profile', icon: User },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#081426] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Customer Sidebar Navigation */}
          <div className="space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white dark:bg-[#142A44] rounded-3xl p-6 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#4A74A7] text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-[#4A74A7]/20">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'C'
                )}
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{user?.name || 'Customer'}</h3>
                <p className="text-xs text-slate-400">{user?.email || 'customer@motho.com'}</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Renter</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="bg-white dark:bg-[#142A44] rounded-3xl p-4 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Customer Menu
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
            <Suspense fallback={null}>
              <DeniedBanner />
            </Suspense>
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}
