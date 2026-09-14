"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CircleAlert, CircleX, Info, X } from "lucide-react";
import { ToastMessage } from "@/context/ToastContext";

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const icons = {
  success: CheckCircle2,
  error: CircleX,
  warning: CircleAlert,
  info: Info,
};

const colors = {
  success: "border-emerald-200/90 bg-white text-emerald-900 shadow-emerald-950/10",
  error: "border-red-200/90 bg-white text-red-900 shadow-red-950/10",
  warning: "border-amber-200/90 bg-white text-amber-900 shadow-amber-950/10",
  info: "border-blue-200/90 bg-white text-blue-900 shadow-blue-950/10",
};

const iconColors = {
  success: "bg-emerald-50 text-emerald-600",
  error: "bg-red-50 text-red-600",
  warning: "bg-amber-50 text-amber-600",
  info: "bg-blue-50 text-blue-600",
};

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const reduceMotion = useReducedMotion();
  const Icon = icons[toast.type];

  return (
    <motion.div
      layout={!reduceMotion}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 30, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 22, scale: 0.98 }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { type: "spring", stiffness: 360, damping: 30, mass: 0.82 }
      }
      className={`relative flex w-full max-w-sm items-start gap-3 rounded-2xl border p-3.5 pr-10 shadow-xl backdrop-blur-xl ${colors[toast.type]}`}
      role={toast.type === "error" ? "alert" : "status"}
      aria-live={toast.type === "error" ? "assertive" : "polite"}
    >
      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${iconColors[toast.type]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-extrabold tracking-tight">{toast.title}</p>
        {toast.message && <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{toast.message}</p>}
      </div>

      <motion.button
        type="button"
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        onClick={() => onRemove(toast.id)}
        className="absolute right-2 top-2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}
