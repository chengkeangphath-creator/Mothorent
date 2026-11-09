'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ChatbotButton() {
  const { language } = useLanguage();
  const isKhmer = language === 'km';
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: isKhmer
        ? 'សួស្តី! ខ្ញុំជាជំនួយការវៃឆ្លាត Motho AI។ តើអ្នកចង់ទៅដើរលេងនៅខេត្តណា ហើយមានថវិកាប៉ុន្មានក្នុងមួយថ្ងៃដែរ?'
        : 'Hello! I am your Motho AI travel assistant. Where in Cambodia are you planning to ride, and what is your daily budget?'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);

    // Simulated quick response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: isKhmer
            ? `អរគុណសម្រាប់សំណួរ! សម្រាប់គម្រោង "${userText}" ខ្ញុំសូមណែនាំម៉ូតូ Honda ADV 160 ឬ Click 125 ដែលមានតម្លៃសមរម្យ និងសន្សំសំចៃសាំង។`
            : `Great question! For "${userText}", I suggest checking out the Honda Click 125 ($10/day) or Honda ADV 160 ($18/day). Both come with 2 free helmets and reliable disc brakes!`
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="floating-chatbot-launcher"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#4A74A7] hover:bg-[#3A608F] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-[#DCEAF7]/30"
          aria-label="Open Motho AI Chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
          
          {/* Notification status dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#DCEAF7] text-[#142A44] flex items-center justify-center text-[10px] font-black border-2 border-[#142A44]">
              1
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[460px] bg-[#081426] border border-[#1E3B60] rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#142A44] border-b border-[#1E3B60] flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4A74A7] to-[#6A95CA] flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black">Motho AI Assistant</h4>
                <p className="text-[10px] text-[#DCEAF7] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Cambodia Road Advisor
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-[#1E3B60] text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#4A74A7] text-white flex items-center justify-center shrink-0 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#DCEAF7] text-[#142A44] font-medium rounded-tr-none'
                      : 'bg-[#142A44] border border-[#1E3B60] text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-[#081426] border-t border-[#1E3B60]/50 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              type="button"
              onClick={() => setInputVal('Best bike for Angkor Wat')}
              className="px-2.5 py-1 rounded-lg bg-[#142A44] text-[#DCEAF7] border border-[#1E3B60] whitespace-nowrap hover:bg-[#1E3B60]"
            >
              Angkor Wat
            </button>
            <button
              type="button"
              onClick={() => setInputVal('Bokor Mountain Kampot ride')}
              className="px-2.5 py-1 rounded-lg bg-[#142A44] text-[#DCEAF7] border border-[#1E3B60] whitespace-nowrap hover:bg-[#1E3B60]"
            >
              Bokor Mountain
            </button>
            <button
              type="button"
              onClick={() => setInputVal('Budget under $15/day')}
              className="px-2.5 py-1 rounded-lg bg-[#142A44] text-[#DCEAF7] border border-[#1E3B60] whitespace-nowrap hover:bg-[#1E3B60]"
            >
              Under $15/day
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#142A44] border-t border-[#1E3B60] flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isKhmer ? 'សួរសំណួរអំពីការជិះម៉ូតូ...' : 'Ask about routes or bikes...'}
              className="flex-1 px-3 py-2 rounded-xl bg-[#081426] border border-[#1E3B60] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4A74A7]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#4A74A7] hover:bg-[#3A608F] text-white transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
