"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { productService } from "@/services/productService";
import { Product } from "@/types";

export default function PromoCarousel() {
  const [promos, setPromos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    async function fetchPromotions() {
      const { data } = await productService.getPromotions();
      setPromos(data || []);
      setLoading(false);
    }

    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-slate-50/50 pb-4 pt-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4 h-6 w-32 animate-pulse rounded-lg bg-slate-200" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[160px] w-[280px] flex-none animate-pulse rounded-2xl bg-slate-200 sm:w-[340px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (promos.length === 0) return null;

  const renderCard = (promo: Product, index: number) => {
    const discountParts = promo.discount_badge ? promo.discount_badge.split(" ") : ["% off"];
    const destinoLink = promo.category_slug
      ? `/produtos/categoria/${promo.category_slug}`
      : "/#catalogo";

    return (
      <motion.div
        key={`${promo.id}-${index}`}
        whileHover={reduceMotion ? undefined : { y: -5 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="h-[160px] w-[280px] flex-none sm:h-[180px] sm:w-[340px] md:h-[200px] md:w-[400px]"
      >
        <Link
          href={destinoLink}
          className="group relative flex h-full w-full overflow-hidden rounded-2xl border border-slate-100/60 bg-[#f4f8f0] shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] md:rounded-[2rem]"
        >
          <div className="relative flex h-full w-[40%] items-center justify-center overflow-hidden bg-[#b2e633]/10 sm:w-[45%]">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#b2e633] opacity-90 sm:h-64 sm:w-64" />
            <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#b2e633] opacity-95 sm:h-44 sm:w-44" />

            <div className="relative z-10 flex h-full w-full items-center justify-center p-3 drop-shadow-md sm:p-4">
              {promo.image_url ? (
                <Image
                  src={promo.image_url}
                  alt={promo.name}
                  fill
                  sizes="160px"
                  className="-rotate-6 object-contain p-2 mix-blend-multiply transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="text-[10px] font-bold text-slate-400">Sem Imagem</div>
              )}
            </div>
          </div>

          <div className="z-10 flex w-[60%] flex-col items-start justify-center pl-3 pr-3 sm:w-[55%] sm:pl-4 sm:pr-4">
            <span className="text-[10px] font-medium italic tracking-tight text-[#0e4d32] opacity-90 sm:text-sm">
              Oferta Especial
            </span>
            <h3 className="my-0.5 line-clamp-2 text-xs font-black uppercase leading-tight tracking-tight text-[#0e4d32] sm:text-base">
              {promo.name}
            </h3>
            <p className="mt-1 text-[10px] font-semibold leading-none text-slate-500/90 sm:text-xs">Com até</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-black leading-none tracking-tighter text-[#0e4d32] sm:text-3xl">
                {discountParts[0]}
              </span>
              {discountParts[1] && (
                <span className="ml-1 text-xs font-bold text-[#0e4d32] sm:text-sm">
                  {discountParts[1]}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const precisaAnimar = promos.length > 2 && !reduceMotion;

  return (
    <motion.section
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full overflow-hidden bg-slate-50/50 pb-4 pt-6"
    >
      <div className="mx-auto mb-3 max-w-7xl px-4 sm:mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">As melhores ofertas</h2>
      </div>

      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_8%,black_92%,transparent_100%)]">
        {precisaAnimar ? (
          <div className="animate-infinite-scroll flex w-max py-2 hover:[animation-play-state:paused]">
            <div className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5">
              {promos.map((promo, idx) => renderCard(promo, idx))}
            </div>
            <div className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-5 md:pr-5" aria-hidden="true">
              {promos.map((promo, idx) => renderCard(promo, idx + promos.length))}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto px-4 py-2 sm:gap-4 sm:px-8 md:gap-5">
            {promos.map((promo, idx) => renderCard(promo, idx))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
