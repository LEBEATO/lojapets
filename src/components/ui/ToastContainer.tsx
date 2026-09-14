"use client";

import { AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { ToastItem } from "./Toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="pointer-events-none fixed left-3 right-3 top-16 z-[100] flex flex-col items-end gap-2 sm:left-auto sm:right-4 sm:top-20 sm:w-full sm:max-w-sm"
      aria-label="Notificações"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
