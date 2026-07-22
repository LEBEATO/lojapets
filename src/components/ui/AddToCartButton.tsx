"use client";

import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95"
    >
      🛒 Adicionar ao Carrinho
    </button>
  );
}