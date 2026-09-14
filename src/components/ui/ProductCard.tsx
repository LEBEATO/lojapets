"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { flyProductToCart } from "@/lib/animations/flyToCart";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (product.image_url) {
      flyProductToCart(product.image_url, imageContainerRef.current);
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cart:item-added"));
    }

    addToCart(product);
    setAdded(true);
    showToast("success", "Adicionado ao carrinho", product.name, 2400);

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setAdded(false), 1250);
  };

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="group relative flex min-h-[240px] h-auto w-full flex-col rounded-2xl border border-slate-100/90 bg-white p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)]"
    >
      {product.discount_badge && (
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, scale: 0.78, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 24, delay: 0.12 }}
          className="absolute left-2 top-2 z-10 rounded-lg bg-amber-400 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-900 shadow-sm"
        >
          {product.discount_badge}
        </motion.span>
      )}

      <div
        ref={imageContainerRef}
        className="relative mb-2 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/35 p-2"
      >
        {product.image_url ? (
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.055, y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, 250px"
              className="object-contain p-1"
            />
          </motion.div>
        ) : (
          <div className="text-[10px] text-slate-400">Sem imagem</div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-1 pt-1 text-xs font-bold uppercase tracking-tight text-slate-900">
          {product.name}
        </h3>
        <p className="mt-0.5 min-h-[24px] line-clamp-2 text-[10px] leading-snug text-slate-400">
          {product.description}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between gap-1 border-t border-slate-50 pt-2">
        <div className="flex flex-col">
          {product.old_price && product.old_price > 0 && (
            <span className="mb-0.5 text-[9px] leading-none text-slate-400 line-through">
              {formatPrice(product.old_price)}
            </span>
          )}
          <span className="text-base font-black leading-none text-slate-950">
            {formatPrice(product.price)}
          </span>
        </div>

        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          className={`flex min-w-[86px] items-center justify-center gap-1 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm transition-colors duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
            added
              ? "bg-emerald-600 shadow-emerald-600/20"
              : "bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600"
          }`}
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          {added ? (
            <>
              <span>Adicionado</span>
              <Check className="h-3 w-3" aria-hidden="true" />
            </>
          ) : (
            <>
              <span>Comprar</span>
              <ShoppingBag className="h-3 w-3" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
