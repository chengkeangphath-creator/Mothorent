'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#4A74A7] dark:text-[#DCEAF7] uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact Motho Rent Cambodia
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Have questions about motorcycle listings, owner partnerships, or rental verification? Our local team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-[#0C1E36] dark:bg-[#081426] text-white rounded-3xl p-8 border border-slate-200/10 dark:border-[#1E3B60] space-y-6 shadow-xl">
            <h3 className="font-bold text-lg text-white">Office & Support Info</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Phnom Penh Headquarters</strong>
                  <span>Street 288, BKK1, Chamkarmon, Phnom Penh, Kingdom of Cambodia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Telephone & WhatsApp</strong>
                  <span>+855 (0) 12 345 678 / +855 (0) 98 765 432</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Email Address</strong>
                  <span>support@mothorent.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#4A74A7] dark:text-[#6A95CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Customer Support Hours</strong>
                  <span>Monday – Sunday: 7:00 AM – 9:00 PM (ICT)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 dark:border-[#1E3B60]">
              <p className="text-[11px] text-slate-400">
                For urgent breakdown assistance, call our 24/7 emergency dispatch line directly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#142A44] rounded-3xl p-8 border border-slate-200/90 dark:border-[#1E3B60] shadow-sm">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">Message Received!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out, {name}. A member of the Motho Rent customer care team will reply to {email} within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-[#4A74A7] text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7] bg-white dark:bg-[#081426]"
                  >
                    <option value="" className="dark:bg-[#142A44] dark:text-white">Select Topic...</option>
                    <option value="rental" className="dark:bg-[#142A44] dark:text-white">Rental Booking Assistance</option>
                    <option value="owner" className="dark:bg-[#142A44] dark:text-white">Motorcycle Owner Partnership</option>
                    <option value="safety" className="dark:bg-[#142A44] dark:text-white">Breakdown & Roadside Safety</option>
                    <option value="feedback" className="dark:bg-[#142A44] dark:text-white">Platform Feedback / Bug Report</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Describe your question or travel requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl btn-glow text-white font-black text-xs shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
