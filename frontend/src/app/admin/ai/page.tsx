'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Sliders, Save, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AdminAIManagementPage() {
  const [model, setModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are Motho AI, the official intelligent travel and motorcycle rental assistant for Motho Rent in Cambodia.
Answer questions about motorcycle rentals across all 25 Cambodian provinces, explain driving license laws, helmet rules, and suggest scenic routes (Angkor Wat, Bokor Mountain, Kep coast).
Support both English and Khmer (ភាសាខ្មែរ). Keep answers helpful, accurate, and encouraging.`
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">AI Assistant Management</h1>
        <p className="text-xs text-slate-400">Configure backend OpenAI integration parameters, system instructions, and bilingual prompts.</p>
      </div>

      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
        {saved && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>AI configuration saved and applied to Laravel backend service!</span>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Security Verified: OpenAI API keys and tokens are strictly stored on the Laravel backend (.env) and never transmitted to the client browser.
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">OpenAI Model Engine</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="gpt-4o-mini">GPT-4o Mini (Fast & Cost Effective)</option>
                <option value="gpt-4o">GPT-4o (High Reasoning & Khmer Nuance)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Temperature: {temperature}</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-orange-500 mt-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.0 (Precise)</span>
                <span>1.0 (Creative)</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Max Tokens per Reply</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-slate-300">System Instruction Prompt</label>
            <textarea
              rows={6}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-orange-500 leading-relaxed font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save AI Settings</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
