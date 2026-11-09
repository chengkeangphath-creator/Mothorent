'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bike, 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  User as UserIcon,
  Calendar,
  Sparkles,
  LogIn,
  Home,
  MapPin,
  Phone,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Language } from '../../i18n/translations';
import { UserRole } from '../../types';

function FlagUK() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover shrink-0">
      <clipPath id="uk-flag-clip">
        <rect width="60" height="40" rx="0" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path d="M0,0 v40 h60 v-40 z" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="7" />
        <path d="M0,0 L60,40" stroke="#C8102E" strokeWidth="2.5" />
        <path d="M60,0 L0,40" stroke="#C8102E" strokeWidth="2.5" />
        <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="11" />
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="6.5" />
      </g>
    </svg>
  );
}

function FlagKH() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover shrink-0">
      <rect width="60" height="10" fill="#032ea1" />
      <rect y="10" width="60" height="20" fill="#e00025" />
      <rect y="30" width="60" height="10" fill="#032ea1" />
      <g fill="#ffffff">
        <rect x="20" y="24" width="20" height="3" rx="0.5" />
        <rect x="22" y="21" width="16" height="3" rx="0.5" />
        <polygon points="30,12 32.5,18 27.5,18" />
        <rect x="29" y="18" width="2" height="3" />
        <polygon points="25,14 27,19 23,19" />
        <rect x="24" y="19" width="2" height="2" />
        <polygon points="35,14 37,19 33,19" />
        <rect x="34" y="19" width="2" height="2" />
      </g>
    </svg>
  );
}

function FlagCN() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover shrink-0">
      <rect width="60" height="40" fill="#de2910" />
      <polygon fill="#ffde00" points="10,5 12,11 18,11 13,15 15,21 10,17 5,21 7,15 2,11 8,11" />
      <circle cx="21" cy="6" r="1.5" fill="#ffde00" />
      <circle cx="25" cy="10" r="1.5" fill="#ffde00" />
      <circle cx="25" cy="16" r="1.5" fill="#ffde00" />
      <circle cx="21" cy="20" r="1.5" fill="#ffde00" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, switchRole, logout, isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Dedicated Auth Pages: Hide landing navbar on Login & Register so user sees only the login page
  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage) return null;

  // Determine dashboard link according to role
  const dashboardLink = role === 'admin' 
    ? '/admin' 
    : role === 'owner' 
      ? '/owner' 
      : '/dashboard';

  const languageOptions = [
    { code: 'en' as Language, label: "English", short: "EN", flag: <FlagUK /> },
    { code: 'km' as Language, label: "ភាសាខ្មែរ", short: "ខ្មែរ", flag: <FlagKH /> },
    { code: 'zh' as Language, label: "中文", short: "中文", flag: <FlagCN /> },
  ];

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#081426]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#1E3B60]/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center shadow-md shadow-[#4A74A7]/30 group-hover:scale-105 transition-transform duration-200">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                MOTHO<span className="text-[#4A74A7] dark:text-[#DCEAF7]">RENT</span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-500 dark:text-slate-300 font-bold uppercase -mt-0.5">
                Cambodia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-xs xl:text-sm text-slate-600 dark:text-slate-300">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive('/') 
                  ? 'text-[#4A74A7] dark:text-white bg-slate-100 dark:bg-[#1E3B60]/80 font-bold shadow-sm' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/motorcycles" 
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive('/motorcycles') 
                  ? 'text-[#4A74A7] dark:text-white bg-slate-100 dark:bg-[#1E3B60]/80 font-bold shadow-sm' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {t.nav.browse}
            </Link>
            <Link 
              href="/search" 
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive('/search') 
                  ? 'text-[#4A74A7] dark:text-white bg-slate-100 dark:bg-[#1E3B60]/80 font-bold shadow-sm' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {t.nav.map}
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive('/about') 
                  ? 'text-[#4A74A7] dark:text-white bg-slate-100 dark:bg-[#1E3B60]/80 font-bold shadow-sm' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {t.nav.about}
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                isActive('/contact') 
                  ? 'text-[#4A74A7] dark:text-white bg-slate-100 dark:bg-[#1E3B60]/80 font-bold shadow-sm' 
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#1E3B60]/40'
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
            
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => { setLangMenuOpen(!langMenuOpen); setUserMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 dark:bg-[#142A44] dark:hover:bg-[#1E3B60] border border-slate-200/90 dark:border-[#1E3B60] text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs transition-all cursor-pointer hover:border-[#00D2FF]/40 active:scale-95"
                title="Change Language"
                aria-label="Change Language"
              >
                <span className="w-4 h-4 rounded-full overflow-hidden shadow-xs shrink-0 flex items-center justify-center border border-white/20">
                  {currentLang.flag}
                </span>
                <span className="text-xs font-bold tracking-wide">{currentLang.short}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] rounded-2xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-[#1E3B60]/60">
                    Language
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => { setLanguage(opt.code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-100/80 dark:hover:bg-[#142A44] transition-colors cursor-pointer ${
                        language === opt.code 
                          ? 'text-[#00D2FF] font-bold bg-slate-100/70 dark:bg-[#142A44]/70' 
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded-full overflow-hidden shadow-xs shrink-0 flex items-center justify-center border border-white/20">
                          {opt.flag}
                        </span>
                        <span className="font-semibold">{opt.label}</span>
                      </span>
                      {language === opt.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-[#142A44] dark:hover:bg-[#1E3B60] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#142A44]" />
              )}
            </button>

            {/* Favorites Icon Button */}
            {role === 'customer' && (
              <Link 
                href="/dashboard/favorites"
                className="relative p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-[#142A44] dark:hover:bg-[#1E3B60] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-200 transition-all"
                title="Favorite Motorcycles"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}

            <div className="h-5 w-px bg-slate-200 dark:bg-[#1E3B60] mx-0.5" />

            {/* User Profile Pill / Menu */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setLangMenuOpen(false); }}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-[#142A44] dark:hover:bg-[#1E3B60] border border-slate-200 dark:border-[#1E3B60] transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center text-xs font-black text-white shrink-0 shadow-sm">
                    {user.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 pr-1" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-[#1E3B60]">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#DCEAF7] dark:bg-[#1E3B60] text-[#142A44] dark:text-[#DCEAF7] border border-[#B9D5EE] dark:border-[#1E3B60]">
                        {role} Account
                      </span>
                    </div>

                    <Link
                      href={dashboardLink}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#4A74A7]" />
                      <span>{role === 'admin' ? t.nav.adminPanel : role === 'owner' ? t.nav.ownerPortal : t.nav.dashboard}</span>
                    </Link>

                    {role === 'customer' && (
                      <Link
                        href="/dashboard/bookings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>My Bookings</span>
                      </Link>
                    )}

                    {role === 'owner' && (
                      <Link
                        href="/owner/motorcycles"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors"
                      >
                        <Bike className="w-4 h-4 text-slate-400" />
                        <span>My Fleet</span>
                      </Link>
                    )}

                    <Link
                      href={role === 'owner' ? '/owner/profile' : '/dashboard/profile'}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Settings & Profile</span>
                    </Link>

                    <div className="pt-1 mt-1 border-t border-slate-100 dark:border-[#1E3B60]">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left flex items-center gap-2.5 px-3.5 py-2 text-rose-500 hover:bg-slate-100 dark:hover:bg-[#142A44] transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 text-xs font-bold btn-glow text-white rounded-xl shadow-lg transition-all"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick Login Pill for Mobile (Visible right in the header!) */}
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0284C7] text-white text-xs font-bold shadow-md shadow-[#00D2FF]/25 flex items-center gap-1 active:scale-95 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.nav.login}</span>
              </Link>
            ) : (
              <Link
                href={dashboardLink}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-[#00D2FF] flex items-center justify-center hover:border-[#00D2FF] transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-300 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#142A44]" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => {
                const nextLang: Record<Language, Language> = { en: 'km', km: 'zh', zh: 'en' };
                setLanguage(nextLang[language]);
              }}
              className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-colors"
              title="Switch Language"
            >
              <span className="w-4 h-3 rounded-xs overflow-hidden shrink-0 flex items-center justify-center border border-white/20">
                {currentLang.flag}
              </span>
              <span className="text-[10px] font-bold">{currentLang.short}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-800 dark:text-white focus:outline-none transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          
          {/* Top Auth Section: Prominent Mobile Login/Register or Profile Card */}
          {!isAuthenticated ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0E2038] dark:to-[#142A44] border border-slate-200 dark:border-[#1E3B60] shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00D2FF] to-[#0284C7] flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {language === 'km' ? 'សូមស្វាគមន៍មកកាន់ MothoRent' : 'Welcome to MothoRent'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'km' ? 'ជួលម៉ូតូគ្រប់ខេត្តក្រុង ងាយស្រួល និងរហ័ស' : 'Explore Cambodia on Two Wheels'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#081426] border border-slate-200 dark:border-[#1E3B60] text-slate-800 dark:text-white hover:text-[#00D2FF] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>{t.nav.login}</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl btn-glow text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{t.nav.register}</span>
                </Link>
              </div>
            </div>
          ) : (
            user && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0E2038] dark:to-[#142A44] border border-slate-200 dark:border-[#1E3B60] shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center font-black text-white text-sm shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{user.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40">
                    {role}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-[#1E3B60]">
                  <Link
                    href={dashboardLink}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#00D2FF]/15 text-[#00D2FF] hover:bg-[#00D2FF]/25 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{role === 'admin' ? t.nav.adminPanel : role === 'owner' ? t.nav.ownerPortal : t.nav.dashboard}</span>
                  </Link>
                  <button
                    onClick={() => {
                      const nextRole: UserRole = role === 'owner' ? 'customer' : 'owner';
                      switchRole(nextRole);
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 px-2.5 rounded-xl bg-slate-200 dark:bg-[#1E3B60] text-slate-700 dark:text-slate-200 hover:text-white font-bold text-xs transition-colors"
                    title="Switch Role"
                  >
                    🔄
                  </button>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="py-2 px-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-bold text-xs transition-colors"
                    title={t.nav.logout}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}

          {/* Navigation Links with Icons */}
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                isActive('/') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.nav.home}</span>
            </Link>

            <Link 
              href="/motorcycles" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                isActive('/motorcycles') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>{t.nav.browse}</span>
            </Link>

            <Link 
              href="/search" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                isActive('/search') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.nav.map}</span>
            </Link>

            {/* Mobile Favorites Link */}
            <Link 
              href="/dashboard/favorites" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                isActive('/dashboard/favorites') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{language === 'km' ? 'ម៉ូតូពេញចិត្ត' : 'Saved Favorites'}</span>
              </div>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                isActive('/about') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t.nav.about}</span>
            </Link>

            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                isActive('/contact') 
                  ? 'bg-slate-100 dark:bg-[#1E3B60] text-[#00D2FF] font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#142A44]'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.contact}</span>
            </Link>
          </nav>

          {/* Mobile Theme & Language Controls */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#1E3B60] flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Theme Mode:</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 bg-slate-100 dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-700 dark:text-slate-200"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#142A44]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Languages Selector with Flags */}
          <div className="pt-2 border-t border-slate-200 dark:border-[#1E3B60] space-y-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Language:</span>
            <div className="grid grid-cols-3 gap-2">
              {languageOptions.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-2 px-2 text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    language === l.code 
                      ? 'bg-[#00D2FF] text-[#081426] font-black shadow-sm' 
                      : 'bg-slate-100 dark:bg-[#142A44] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E3B60]'
                  }`}
                >
                  <span className="w-4 h-3 rounded-xs overflow-hidden shadow-xs shrink-0 flex items-center justify-center border border-white/20">
                    {l.flag}
                  </span>
                  <span className="font-bold">{l.short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Hotline Footer */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#1E3B60] text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              📞 24/7 Hotline: <a href="tel:+85512345678" className="text-[#00D2FF] font-bold hover:underline">+855 12 345 678</a>
            </p>
          </div>

        </div>
      )}
    </header>
  );
}
