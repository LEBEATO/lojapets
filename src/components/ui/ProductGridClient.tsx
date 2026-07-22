"use client";

import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridClientProps {
  produtos: Product[];
}

export default function ProductGridClient({ produtos }: ProductGridClientProps) {
  const { addToCart } = useCart();

  if (!produtos || produtos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-base">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {produtos.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}