'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, Menu, X, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../../data/landing';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export default function LandingNavbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, role } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isKhmer = language === 'km';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#142A44]/95 backdrop-blur-md shadow-lg border-b border-[#1E3B60]/80 py-3'
          : 'bg-[#142A44] border-b border-[#1E3B60]/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group select-none"
            aria-label="Motho Rent Cambodia Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center text-white shadow-md shadow-[#4A74A7]/30 group-hover:scale-105 transition-transform">
              <Bike className="w-6 h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              MOTHO<span className="text-[#DCEAF7]">RENT</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'text-[#DCEAF7] bg-[#1E3B60]/80 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-[#1E3B60]/40'
                  }`}
                >
                  {isKhmer ? item.labelKh : item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons & Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E3B60]/60 hover:bg-[#1E3B60] border border-[#1E3B60] text-xs font-bold text-[#DCEAF7] transition-colors cursor-pointer"
                aria-label="Change Language"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#DCEAF7]" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 bg-[#081426] border border-[#1E3B60] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      language === 'en' ? 'text-[#DCEAF7] bg-[#1E3B60]/60' : 'text-slate-200 hover:bg-[#1E3B60]/30'
                    }`}
                  >
                    <span>English</span>
                    <span>🇬🇧</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('km');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      language === 'km' ? 'text-[#DCEAF7] bg-[#1E3B60]/60' : 'text-slate-200 hover:bg-[#1E3B60]/30'
                    }`}
                  >
                    <span>ភាសាខ្មែរ</span>
                    <span>🇰🇭</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-[#1E3B60]" />

            {/* Auth States */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-[#1E3B60]/70 hover:bg-[#1E3B60] border border-[#1E3B60] transition-colors cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="text-right">
                    <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-[#DCEAF7] capitalize font-medium">{role || 'Renter'}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#4A74A7] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300 mr-1" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 bg-[#081426] border border-[#1E3B60] rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-[#1E3B60]/60">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={role === 'admin' ? '/admin' : role === 'owner' ? '/owner/dashboard' : '/dashboard'}
                        className="block px-3.5 py-2.5 text-slate-200 hover:bg-[#1E3B60]/40 transition-colors font-bold"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        {role === 'admin' ? 'Admin Portal' : role === 'owner' ? 'Owner Portal' : 'My Bookings Dashboard'}
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[#1E3B60]/60">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-rose-400 hover:bg-[#1E3B60]/40 transition-colors font-bold cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  {isKhmer ? 'ចូលគណនី' : 'Sign In'}
                </Link>
                
                {/* Palette Vibrant Accent Blue Button */}
                <Button
                  href="/register"
                  variant="primary"
                  size="sm"
                  className="shadow-lg shadow-[#4A74A7]/30"
                >
                  {isKhmer ? 'ចុះឈ្មោះ' : 'Register'}
                </Button>
              </div>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#1E3B60]/60 text-white hover:bg-[#1E3B60] transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-3 border-t border-[#1E3B60]/60 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      active
                        ? 'text-[#DCEAF7] bg-[#1E3B60]/70'
                        : 'text-slate-200 hover:bg-[#1E3B60]/30'
                    }`}
                  >
                    {isKhmer ? item.labelKh : item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher on Mobile */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#081426] border border-[#1E3B60] text-xs text-white">
              <span className="font-semibold text-slate-300">Language / ភាសា:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === 'en' ? 'bg-[#4A74A7] text-white' : 'text-slate-400'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('km')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === 'km' ? 'bg-[#4A74A7] text-white' : 'text-slate-400'
                  }`}
                >
                  KH
                </button>
              </div>
            </div>

            {/* Mobile Auth Actions */}
            <div className="pt-2 border-t border-[#1E3B60]/60 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href={role === 'admin' ? '/admin' : role === 'owner' ? '/owner/dashboard' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-bold text-white bg-[#1E3B60] rounded-xl"
                  >
                    Dashboard ({user.name})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-sm font-bold text-rose-400 bg-[#081426] border border-rose-500/20 rounded-xl"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-slate-200 bg-[#1E3B60] rounded-xl"
                  >
                    {isKhmer ? 'ចូលគណនី' : 'Sign In'}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-white bg-[#4A74A7] rounded-xl shadow-md shadow-[#4A74A7]/30"
                  >
                    {isKhmer ? 'ចុះឈ្មោះ' : 'Register'}
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </header>
  );
}
