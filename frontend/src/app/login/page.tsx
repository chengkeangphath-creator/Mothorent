'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Bike, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Bookmark,
  Check,
  ShieldCheck,
  Key,
  CalendarCheck,
  Star,
  MapPin,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isKhmer = language === 'km';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);
  const [showDemoHelp, setShowDemoHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage(isKhmer ? "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក។" : "Please enter your email address.");
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login(email, password);

      // If user came from a protected route, redirect back there
      if (redirectUrl && redirectUrl.startsWith('/')) {
        router.push(redirectUrl);
        return;
      }

      // Smart redirect based on email
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else if (email.toLowerCase().includes('owner')) {
        router.push('/owner');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setErrorMessage(isKhmer ? "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។" : "Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#EAF0F6] dark:bg-[#081426] transition-colors duration-200 overflow-hidden">
      
      {/* Top Left: Back to Home Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/80 dark:bg-[#142A44]/80 hover:bg-white dark:hover:bg-[#1E3B60] backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#00D2FF] dark:hover:text-[#00D2FF] transition-all shadow-md group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>{isKhmer ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Home'}</span>
      </Link>

      {/* Top Right: Theme & Language Quick Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2">
        <div className="flex bg-white/80 dark:bg-[#142A44]/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-1 shadow-md text-xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'en' ? 'bg-[#00D2FF] text-[#081426]' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('km')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'km' ? 'bg-[#00D2FF] text-[#081426]' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ខ្មែរ
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-2xl bg-white/80 dark:bg-[#142A44]/80 hover:bg-white dark:hover:bg-[#1E3B60] backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 transition-all shadow-md cursor-pointer"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#142A44]" />}
        </button>
      </div>

      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-12 w-28 h-28 hidden lg:block opacity-35 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-slate-400">
          <line x1="10" y1="0" x2="100" y2="90" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="30" y1="0" x2="100" y2="70" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50" y1="0" x2="100" y2="50" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="absolute bottom-8 right-16 hidden lg:flex items-center gap-3 pointer-events-none opacity-80">
        <div className="w-6 h-6 rounded-full bg-[#1877F2]" />
        <div className="w-16 h-16 rounded-full border-2 border-brand-orange/40" />
      </div>

      {/* Main Centered Floating Card */}
      <div className="w-full max-w-5xl bg-white dark:bg-navy rounded-[36px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200/80 dark:border-navy-light/60 relative z-10 mt-14 sm:mt-16 lg:mt-0 my-4 sm:my-8 lg:my-0">
        
        {/* Left Column (50% on Desktop / 6 Cols): Full-Bleed Epic Motorcycle Image Showcase (Hidden on Mobile for Instant Form Access) */}
        <div className="hidden lg:flex lg:col-span-6 relative min-h-[720px] p-8 sm:p-12 flex-col justify-between overflow-hidden text-white group">
          
          {/* Full-Bleed Motorcycle Background Image */}
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=85"
            alt="Motho Rent Cambodia Motorcycle"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />

          {/* Deep Cinematic Blue Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-[#081426]/60 to-[#081426]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081426]/80 via-transparent to-transparent" />
          
          {/* Neon Cyan Ambient Glow Accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D2FF]/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#0EA5E9]/25 blur-[100px] pointer-events-none" />

          {/* Top Header Pill Row */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="backdrop-blur-xl bg-black/45 border border-white/20 rounded-full px-4 py-1.5 inline-flex items-center gap-2 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
              <span className="text-xs font-bold tracking-wide text-white">#1 Cambodia Moto Platform</span>
            </div>

            <div className="backdrop-blur-xl bg-black/45 border border-white/20 rounded-full px-3.5 py-1.5 inline-flex items-center gap-1.5 shadow-2xl text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.95 Rating</span>
            </div>
          </div>

          {/* Middle Glassmorphic Floating Ride Card */}
          <div className="relative z-10 my-auto py-6">
            <div className="backdrop-blur-2xl bg-black/40 border border-white/20 rounded-3xl p-5 shadow-2xl max-w-sm space-y-3.5 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#00D2FF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                  {isKhmer ? 'ម៉ូតូពេញនិយម' : 'Top Featured Ride'}
                </span>
                <span className="text-xs font-black text-white bg-[#00D2FF]/20 border border-[#00D2FF]/40 px-2.5 py-0.5 rounded-full">
                  $7 - $25/day
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Honda Scoopy & ADV 160cc</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Siem Reap, Phnom Penh, Kampot</span>
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-200">
                <span className="px-2 py-0.5 rounded-lg bg-white/10">Smart Key</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/10">2 Free Helmets</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Verified Host ✓</span>
              </div>
            </div>
          </div>

          {/* Bottom Headline & 3 Trust Metrics */}
          <div className="relative z-10 space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
                {isKhmer ? (
                  <>
                    ជួលម៉ូតូគ្រប់ខេត្តក្រុង <br />
                    <span className="bg-gradient-to-r from-[#00D2FF] via-[#0EA5E9] to-cyan-200 bg-clip-text text-transparent">
                      ងាយស្រួល សុវត្ថិភាពខ្ពស់
                    </span>
                  </>
                ) : (
                  <>
                    Explore Cambodia on Two Wheels. <br />
                    <span className="bg-gradient-to-r from-[#00D2FF] via-[#0EA5E9] to-cyan-200 bg-clip-text text-transparent">
                      Reliable & Transparent.
                    </span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 mt-2 max-w-md drop-shadow">
                {isKhmer 
                  ? 'តភ្ជាប់ដោយផ្ទាល់ជាមួយម្ចាស់ម៉ូតូក្នុងស្រុក តម្លៃគិតជាដុល្លារច្បាស់លាស់ មិនមានកម្រៃលាក់កំបាំង។' 
                  : 'Connect directly with verified local owners. Transparent USD pricing with zero hidden fees.'}
              </p>
            </div>

            {/* 3 Glass Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/20">
              <div className="backdrop-blur-xl bg-black/40 border border-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-sm font-black text-[#00D2FF]">25</p>
                <p className="text-[10px] text-slate-300 font-medium">Provinces</p>
              </div>
              <div className="backdrop-blur-xl bg-black/40 border border-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-sm font-black text-emerald-400">100%</p>
                <p className="text-[10px] text-slate-300 font-medium">Verified</p>
              </div>
              <div className="backdrop-blur-xl bg-black/40 border border-white/15 rounded-2xl p-2.5 text-center">
                <p className="text-sm font-black text-amber-300">Free</p>
                <p className="text-[10px] text-slate-300 font-medium">Helmets</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (50% on Desktop / 6 Cols): Clean Minimal Form */}
        <div className="lg:col-span-6 bg-white dark:bg-navy p-6 sm:p-10 lg:p-14 flex flex-col justify-center space-y-6">
          
          {/* Brand Logo Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00D2FF] to-[#0284C7] text-white flex items-center justify-center shadow-md shadow-[#00D2FF]/25">
                <Bike className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Motho<span className="text-[#00D2FF]">Rent</span>
              </span>
            </Link>

            {/* Greeting Headline */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-1">
              {isKhmer ? 'សួស្តី សូមស្វាគមន៍មកវិញ!' : 'Welcome back!'}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isKhmer ? 'ទើបតែមកកាន់ Motho Rent មែនទេ? ' : 'New to Motho Rent? '}
              <Link href="/register" className="text-[#00D2FF] font-bold hover:underline">
                {isKhmer ? 'ចុះឈ្មោះឥតគិតថ្លៃ' : 'Sign Up Free'}
              </Link>
            </p>
          </div>

          {/* Error Message Notice */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {forgotSent && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{isKhmer ? 'តំណកំណត់លេខសម្ងាត់ឡើងវិញត្រូវបានផ្ញើ។' : 'Password reset link sent to your email.'}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Email Field */}
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isKhmer ? 'អ៊ីមែល: yourname@example.com' : 'Email: yourname@example.com'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-navy-light bg-white dark:bg-navy-dark text-base sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-all"
              />
            </div>

            {/* Password Field with Eye toggle */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isKhmer ? 'បញ្ចូលលេខសម្ងាត់របស់អ្នក' : 'Enter your password'}
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 dark:border-navy-light bg-white dark:bg-navy-dark text-base sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-3 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Primary CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl btn-glow disabled:opacity-50 text-white font-black text-sm shadow-xl transition-all flex items-center justify-center cursor-pointer active:scale-[0.99]"
            >
              <span>{isLoading ? (isKhmer ? 'កំពុងចូល...' : 'Signing in...') : (isKhmer ? 'ចូលគណនី' : 'Sign In')}</span>
            </button>

            {/* Forgot Password Link */}
            <div className="text-right pt-0.5">
              <button
                type="button"
                onClick={() => setForgotSent(true)}
                className="text-xs font-semibold text-[#00D2FF] hover:underline cursor-pointer"
              >
                {isKhmer ? 'ភ្លេចលេខសម្ងាត់?' : 'Forgot password?'}
              </button>
            </div>

            {/* Social Divider */}
            <div className="pt-2 text-center">
              <p className="text-xs text-slate-400 font-medium">
                {isKhmer ? 'ឬចូលគណនីតាមរយៈ' : 'Or continue with'}
              </p>
            </div>

            {/* 3 Social Buttons Row (Facebook, Google, Apple) */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => handleQuickFill('customer@motho.com')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-navy-light hover:bg-slate-50 dark:hover:bg-navy-dark flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with Facebook"
              >
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleQuickFill('customer@motho.com')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-navy-light hover:bg-slate-50 dark:hover:bg-navy-dark flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleQuickFill('owner@motho.com')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-navy-light hover:bg-slate-50 dark:hover:bg-navy-dark flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with Apple"
              >
                <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.88-1.01 2.99 1.08.08 2.18-.52 2.84-1.34z"/>
                </svg>
              </button>
            </div>

            {/* Checkbox: Remember device */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#00D2FF] focus:ring-[#00D2FF] cursor-pointer"
                />
                <span>{isKhmer ? 'ចងចាំឧបករណ៍នេះ' : 'Remember this device'}</span>
              </label>
            </div>

            {/* Bottom Disclaimer */}
            <p className="text-[11px] text-slate-400 text-left pt-2 leading-relaxed">
              {isKhmer ? (
                <>
                  ដោយបន្ត អ្នកយល់ព្រមតាម <Link href="/about" className="text-[#00D2FF] font-semibold hover:underline">ល័ក្ខខ័ណ្ឌនៃការប្រើប្រាស់</Link> និង <Link href="/about" className="text-[#00D2FF] font-semibold hover:underline">គោលការណ៍ភាពឯកជន</Link> របស់យើង។
                </>
              ) : (
                <>
                  By continuing, you agree to our <Link href="/about" className="text-[#00D2FF] font-semibold hover:underline">Terms of Use</Link> and <Link href="/about" className="text-[#00D2FF] font-semibold hover:underline">Privacy Policy</Link>.
                </>
              )}
            </p>

          </form>

          {/* Quick Demo Helper (Discreet 1-Click test accounts) */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => setShowDemoHelp(!showDemoHelp)}
              className="text-[11px] text-slate-400 hover:text-brand-orange transition-colors cursor-pointer"
            >
              {showDemoHelp ? 'Hide Demo Logins ▲' : 'Demo Test Accounts ▾'}
            </button>

            {showDemoHelp && (
              <div className="mt-2 p-2 rounded-xl bg-slate-50 dark:bg-navy-dark border border-slate-200 dark:border-navy-light text-xs flex justify-center gap-2 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => handleQuickFill('customer@motho.com')}
                  className="px-2 py-1 rounded bg-white dark:bg-navy text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-brand-orange border border-slate-200 dark:border-navy-light cursor-pointer"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('owner@motho.com')}
                  className="px-2 py-1 rounded bg-white dark:bg-navy text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-brand-orange border border-slate-200 dark:border-navy-light cursor-pointer"
                >
                  Owner
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin@motho.com')}
                  className="px-2 py-1 rounded bg-white dark:bg-navy text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-brand-orange border border-slate-200 dark:border-navy-light cursor-pointer"
                >
                  Admin
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}
