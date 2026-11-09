'use client';

import React from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function AdminPaymentsPage() {
  const transactions = [
    { id: "TX-9901", code: "MTR-2024-8891", type: "Customer Rental & Deposit", customer: "Alex Johnson", amount: 80, method: "Bakong KHQR (ABA)", status: "Paid", date: "2024-11-08" },
    { id: "TX-9902", code: "MTR-2024-7742", type: "Customer Deposit Hold", customer: "Alex Johnson", amount: 100, method: "Credit Card", status: "Pending", date: "2024-11-09" },
    { id: "TX-9903", code: "MTR-2024-4120", type: "Security Deposit Refund", customer: "Alex Johnson", amount: 70, method: "Bakong KHQR (ABA)", status: "Refunded", date: "2024-10-06" },
    { id: "TX-8804", code: "PO-2024-1101", type: "Owner Payout Transfer", customer: "Sophea Chan", amount: 480, method: "ABA Bank Direct", status: "Paid", date: "2024-11-01" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Payment Transactions & Deposits</h1>
        <p className="text-xs text-slate-400">Monitor payments, deposit refunds, and owner bank transfers in Cambodia.</p>
      </div>

      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3">Transaction ID</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Participant</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Gateway Method</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {transactions.map(t => (
              <tr key={t.id} className="text-slate-300">
                <td className="py-3.5 font-mono font-bold text-orange-400">{t.id}</td>
                <td className="py-3.5 font-medium text-white">{t.type}</td>
                <td className="py-3.5 text-slate-400">{t.customer}</td>
                <td className="py-3.5 font-bold text-white">${t.amount}.00 USD</td>
                <td className="py-3.5 text-slate-400">{t.method}</td>
                <td className="py-3.5 text-slate-400">{t.date}</td>
                <td className="py-3.5 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    t.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : t.status === 'Refunded' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
