'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Check, Clock, Calendar, ShieldCheck, DollarSign } from 'lucide-react';
import { notificationService } from '../../../lib/api';
import { NotificationItem } from '../../../types';

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService.getAll().then(data => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  const handleMarkAsRead = async (id: number) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Notifications</h1>
          <p className="text-xs text-slate-500">Stay informed about booking confirmations and trip alerts.</p>
        </div>

        <button
          onClick={() => notifications.forEach(n => handleMarkAsRead(n.id))}
          className="text-xs text-orange-600 font-bold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No Notifications</h3>
          <p className="text-xs text-slate-500">You are completely up to date.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                n.is_read
                  ? 'bg-white border-slate-200/80 text-slate-600'
                  : 'bg-orange-50/50 border-orange-200 text-slate-900'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'booking' ? <Calendar className="w-4 h-4" /> : n.type === 'payment' ? <DollarSign className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                {n.link && (
                  <Link
                    href={n.link}
                    className="inline-block text-xs font-bold text-orange-600 hover:underline pt-1"
                  >
                    View Details →
                  </Link>
                )}
              </div>

              {!n.is_read && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  title="Mark as read"
                  className="p-1 text-slate-400 hover:text-orange-500"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
