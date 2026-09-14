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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.07,
            delayChildren: reduceMotion ? 0 : 0.04,
          },
        },
      }}
      className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {produtos.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 36, scale: 0.975, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                duration: reduceMotion ? 0.01 : 0.58,
                ease: [0.16, 1, 0.3, 1] as const,
              },
            },
          }}
        >
          <ProductCard product={product} addToCart={addToCart} />
        </motion.div>
      ))}
    </motion.div>
  );
}
