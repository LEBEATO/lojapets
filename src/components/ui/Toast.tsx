"use client";

import { useState } from 'react';
import { ToastMessage } from '@/context/ToastContext';

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const colors = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 pr-10 rounded-xl border shadow-lg
        ${colors[toast.type]} transition-all duration-300 w-full max-w-sm
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
     `}
      role="alert"
    >
      <span className="text-xl flex-shrink-0">{icons[toast.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold">{toast.title}</p>
        {toast.message && <p className="text-xs opacity-80 mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-white/50 transition-colors"
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  );
}