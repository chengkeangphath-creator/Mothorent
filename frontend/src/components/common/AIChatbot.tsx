'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight
} from 'lucide-react';
import { aiChatService } from '../../lib/api';
import { AIChatMessage, Motorcycle } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AIChatbot() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: t.chatbot.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [t.chatbot.welcome]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: AIChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await aiChatService.sendMessage(text, history);

      const botMsg: AIChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedMotorcycles: res.suggestedMotorcycles
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errorMsg: AIChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: "Sorry, I had trouble processing your request. Please check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Hide AI chatbot on dedicated auth pages so it does not obstruct the login card
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button: Sleek & Compact so it NEVER blocks mobile inputs */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pb-[env(safe-area-inset-bottom,0px)]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-11 h-11 sm:w-auto sm:px-5 sm:py-3.5 rounded-full btn-glow text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label={t.chatbot.launcher}
          title={t.chatbot.launcher}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="hidden md:inline font-bold text-xs">{t.chatbot.launcher}</span>
        </button>
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] h-[520px] max-h-[82vh] z-50 bg-white dark:bg-[#142A44] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-[#1E3B60] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 dark:bg-[#081426] text-white flex items-center justify-between border-b border-slate-800 dark:border-[#1E3B60]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#4A74A7]/20 text-[#DCEAF7] border border-[#4A74A7]/30 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <span>{t.chatbot.title}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                    {t.chatbot.online}
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">English • ភាសាខ្មែរ • 中文</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 dark:bg-[#1E3B60] text-slate-400 dark:text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-[#0C1E36] border-b border-slate-100 dark:border-[#1E3B60] flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
            <button
              onClick={() => handleSend(t.chatbot.askAngkor)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-600 dark:text-slate-300 hover:border-[#4A74A7] hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors cursor-pointer"
            >
              {t.chatbot.askAngkor}
            </button>
            <button
              onClick={() => handleSend(t.chatbot.askLicense)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-600 dark:text-slate-300 hover:border-[#4A74A7] hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors cursor-pointer"
            >
              {t.chatbot.askLicense}
            </button>
            <button
              onClick={() => handleSend(t.chatbot.askKampot)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#142A44] border border-slate-200 dark:border-[#1E3B60] text-slate-600 dark:text-slate-300 hover:border-[#4A74A7] hover:text-[#4A74A7] dark:hover:text-[#DCEAF7] transition-colors cursor-pointer"
            >
              {t.chatbot.askKampot}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50 dark:bg-[#081426]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#4A74A7]/20 text-[#DCEAF7] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#4A74A7] text-white rounded-tr-none shadow-sm'
                    : 'bg-white dark:bg-[#142A44] text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-[#1E3B60] shadow-sm'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Suggested Motorcycles Card inside Chat */}
                  {msg.suggestedMotorcycles && msg.suggestedMotorcycles.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#1E3B60] space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.chatbot.recommended}
                      </p>
                      {msg.suggestedMotorcycles.slice(0, 2).map((bike) => (
                        <div
                          key={bike.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-[#081426] border border-slate-100 dark:border-[#1E3B60] hover:border-[#4A74A7] transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={bike.images[0]}
                            alt={bike.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate">{bike.title}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">${bike.daily_price}/day • {bike.province_name}</p>
                          </div>
                          <Link
                            href={`/motorcycles/${bike.id}`}
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-lg bg-[#4A74A7] text-white hover:bg-[#3A608F] shrink-0"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-[#1E3B60] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 text-[#4A74A7] animate-spin" />
                <span>{t.chatbot.typing}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#142A44] border-t border-slate-200 dark:border-[#1E3B60]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.chatbot.placeholder}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3B60] bg-white dark:bg-[#081426] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#4A74A7]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl btn-glow disabled:opacity-40 text-white transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
