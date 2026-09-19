"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { flyProductToCart } from "@/lib/animations/flyToCart";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps { product: Product; addToCart: (product: Product) => void; }

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { showToast } = useToast();

  useEffect(() => () => { if (resetTimerRef.current) clearTimeout(resetTimerRef.current); }, []);

  const handleAddToCart = () => {
    if (product.image_url) flyProductToCart(product.image_url, imageContainerRef.current);
    else if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("cart:item-added"));
    addToCart(product); setAdded(true); showToast("success", "Adicionado ao carrinho", product.name, 2400);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => { setAdded(false); resetTimerRef.current = null; }, 1250);
  };

  return (
    <motion.article whileHover={reduceMotion ? undefined : { y: -4 }} className="group relative flex h-full min-h-[330px] w-full flex-col overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-lg">
      <button type="button" aria-label="Favoritar produto" className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-slate-700 shadow-sm"><Heart className="h-5 w-5" /></button>
      {product.discount_badge && <span className="absolute left-3 top-3 z-10 rounded-lg bg-orange-100 px-2 py-1 text-[10px] font-black text-orange-600">{product.discount_badge}</span>}
      <div ref={imageContainerRef} className="relative mb-3 h-40 w-full overflow-hidden rounded-2xl bg-white sm:h-48">
        {product.image_url ? <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 768px) 46vw, 260px" className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">Sem imagem</div>}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Loja Pets</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-400">{product.description}</p>
        <div className="mt-auto pt-4">
          {product.old_price && product.old_price > 0 && <span className="block text-xs text-slate-400 line-through">{formatPrice(product.old_price)}</span>}
          <div className="mt-1 flex items-end justify-between gap-2">
            <span className="text-lg font-black text-slate-950">{formatPrice(product.price)}</span>
            <motion.button type="button" onClick={handleAddToCart} whileTap={reduceMotion ? undefined : { scale: 0.92 }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600" aria-label={`Adicionar ${product.name} ao carrinho`}>
              {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
