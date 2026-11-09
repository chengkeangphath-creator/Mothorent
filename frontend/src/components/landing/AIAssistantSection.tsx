'use client';

import React from 'react';
import { Bot, Sparkles, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AI_ASSISTANT_PREVIEW } from '../../data/landing';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export default function AIAssistantSection() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="ai-assistant">
      
      {/* Outer Card with Farnegar Deep Navy Gradient */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#081426] via-[#142A44] to-[#081426] border border-[#1E3B60] p-6 sm:p-12 text-white shadow-2xl">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4A74A7]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#DCEAF7]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: AI Highlights & Explanations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142A44] border border-[#1E3B60] text-xs font-bold text-[#DCEAF7]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A74A7]" />
              <span>{isKhmer ? 'ជំនួយការវៃឆ្លាត ២៤/៧' : 'Instant AI Moto Advisor'}</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {isKhmer ? (
                  <>
                    មិនដឹងថាគួរជួលម៉ូតូមួយណា? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] to-[#4A74A7]">
                      សួរជំនួយការ AI របស់យើង
                    </span>
                  </>
                ) : (
                  <>
                    Not sure which bike fits your route? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCEAF7] to-[#4A74A7]">
                      Ask Your Motho AI Guide
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {isKhmer
                  ? 'ទទួលបានការណែនាំអំពីម៉ូតូសមស្របតាមថវិកា ចម្ងាយផ្លូវឡើងភ្នំបូកគោ ឬជិះកម្សាន្តប្រាសាទអង្គរវត្ត ជាភាសាខ្មែរ និងអង់គ្លេសភ្លាមៗ។'
                  : 'Get customized motorcycle recommendations matched to your travel itinerary, passenger count, mountain elevation, and daily USD budget in English & Khmer.'}
              </p>
            </div>

            {/* Value bullets */}
            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DCEAF7] shrink-0" />
                <span>Smart budget optimization ($7 - $45/day)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DCEAF7] shrink-0" />
                <span>Road condition warnings & fuel station pointers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DCEAF7] shrink-0" />
                <span>Instant helmet & license requirement advice</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const chatBtn = document.getElementById('floating-chatbot-launcher');
                  if (chatBtn) chatBtn.click();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-lg shadow-[#4A74A7]/30"
              >
                {isKhmer ? 'សាកល្បងសន្ទនាឥឡូវនេះ' : 'Try Motho AI Chat'}
              </Button>
            </div>
          </div>

          {/* Right Column: Realistic Mock Chat Conversation UI */}
          <div className="lg:col-span-7">
            <div className="bg-[#081426]/90 backdrop-blur-md rounded-3xl border border-[#1E3B60] p-5 sm:p-6 shadow-2xl space-y-4">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E3B60]/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white">Motho AI Assistant</h3>
                    <p className="text-[10px] text-[#DCEAF7] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active • English & Khmer
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#142A44] border border-[#1E3B60] text-slate-300 font-semibold">
                  Sample Interaction
                </span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 text-xs">
                
                {/* User Message (Right-aligned, soft Ice Blue badge) */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-md p-3.5 rounded-2xl rounded-tr-none bg-[#DCEAF7] text-[#142A44] font-medium leading-relaxed shadow-md">
                    {isKhmer ? AI_ASSISTANT_PREVIEW.userQueryKh : AI_ASSISTANT_PREVIEW.userQuery}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#1E3B60] text-white flex items-center justify-center shrink-0 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Assistant Message (Left-aligned, Farnegar Deep Navy) */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#4A74A7] text-white flex items-center justify-center shrink-0 text-xs shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="max-w-md p-4 rounded-2xl rounded-tl-none bg-[#142A44] border border-[#1E3B60] text-slate-200 leading-relaxed space-y-3 shadow-md">
                    <p>
                      {isKhmer ? AI_ASSISTANT_PREVIEW.assistantReplyKh : AI_ASSISTANT_PREVIEW.assistantReply}
                    </p>

                    {/* Interactive Bike Card Recommendation Embedded inside Chat */}
                    <div className="p-3 rounded-xl bg-[#081426] border border-[#1E3B60] flex items-center justify-between gap-3">
                      <div>
                        <p className="font-black text-white text-xs">{AI_ASSISTANT_PREVIEW.recommendedBike.name}</p>
                        <p className="text-[11px] text-[#DCEAF7] font-semibold">{AI_ASSISTANT_PREVIEW.recommendedBike.price}</p>
                        <p className="text-[10px] text-slate-400">{AI_ASSISTANT_PREVIEW.recommendedBike.location}</p>
                      </div>
                      <Button
                        href="/motorcycles?type=scooter&province=Kampot"
                        variant="primary"
                        size="sm"
                        className="text-[10px] py-1.5 px-3"
                      >
                        Inspect
                      </Button>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
