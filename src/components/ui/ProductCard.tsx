"use client";

import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="relative flex h-auto min-h-[340px] w-full flex-col rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm hover:shadow-md transition-all group">
      {/* Badge de desconto */}
      {product.discount_badge && (
        <span className="absolute left-2 top-2 z-10 rounded-lg bg-amber-400 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-900">
          {product.discount_badge}
        </span>
      )}

      {/* Imagem */}
      <div className="relative mb-2 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, 250px"
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-[10px] text-slate-400">Sem imagem</div>
        )}
      </div>

      {/* Informações */}
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-1 text-xs font-bold uppercase tracking-tight text-slate-900">
          {product.name}
        </h3>
        <p className="mt-0.5 min-h-[24px] line-clamp-2 text-[10px] text-slate-400 leading-snug">
          {product.description}
        </p>
      </div>

      {/* Preço e Botão */}
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

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-1 rounded-xl bg-emerald-500 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95 whitespace-nowrap"
        >
          <span>Comprar</span>
          <span className="text-xs">🛒</span>
        </button>
      </div>
    </div>
  );
}