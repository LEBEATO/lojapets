"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
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
    else window.dispatchEvent(new CustomEvent("cart:item-added"));
    addToCart(product);
    setAdded(true);
    showToast("success", "Adicionado ao carrinho", product.name, 2400);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => { setAdded(false); resetTimerRef.current = null; }, 1250);
  };

  return (
    <motion.article whileHover={reduceMotion ? undefined : { y: -3 }} className="group relative flex h-full min-h-[292px] w-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-lg min-[390px]:min-h-[310px] min-[390px]:rounded-[1.6rem] min-[390px]:p-3 sm:min-h-[350px]">
      {product.discount_badge && <span className="absolute left-2 top-2 z-10 max-w-[75%] rounded-md bg-orange-100 px-1.5 py-1 text-[9px] font-black text-orange-700 min-[390px]:left-3 min-[390px]:top-3 min-[390px]:text-[10px]">{product.discount_badge}</span>}
      <div ref={imageContainerRef} className="relative mb-2 h-32 w-full overflow-hidden rounded-xl bg-white min-[390px]:h-36 sm:mb-3 sm:h-48 sm:rounded-2xl">
        {product.image_url ? <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 639px) 45vw, 260px" className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105 sm:p-2" /> : <div className="flex h-full items-center justify-center text-[10px] text-slate-400">Sem imagem</div>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400 sm:text-[10px]">Loja Pets</p>
        <h3 className="line-clamp-2 text-[12px] font-bold leading-[1.3] text-slate-800 min-[390px]:text-[13px] sm:text-sm">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-[10px] text-slate-400 sm:line-clamp-2 sm:text-xs">{product.description}</p>
        <div className="mt-auto pt-2.5 sm:pt-4">
          {product.old_price && product.old_price > product.price && <span className="block text-[10px] text-slate-400 line-through sm:text-xs">{formatPrice(product.old_price)}</span>}
          <div className="mt-1 flex items-end justify-between gap-1">
            <span className="min-w-0 text-[15px] font-black tracking-tight text-slate-950 min-[390px]:text-base sm:text-lg">{formatPrice(product.price)}</span>
            <motion.button type="button" onClick={handleAddToCart} whileTap={reduceMotion ? undefined : { scale: 0.9 }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 min-[390px]:h-10 min-[390px]:w-10 sm:h-11 sm:w-11" aria-label={`Adicionar ${product.name} ao carrinho`}>
              {added ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
