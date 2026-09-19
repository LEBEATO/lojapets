"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridClientProps {
  produtos: Product[];
}

export default function ProductGridClient({ produtos }: ProductGridClientProps) {
  const { addToCart } = useCart();
  const reduceMotion = useReducedMotion();

  if (!produtos || produtos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-base text-slate-400">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {produtos.map((product, index) => (
        <motion.div
          key={product.id}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.5,
            delay: reduceMotion ? 0 : (index % 2) * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ProductCard product={product} addToCart={addToCart} />
        </motion.div>
      ))}
    </div>
  );
}
