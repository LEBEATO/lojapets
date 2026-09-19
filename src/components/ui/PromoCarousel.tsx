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

  useEffect(() => { (async () => { const { data } = await productService.getPromotions(); setPromos(data || []); setLoading(false); })(); }, []);

  if (loading) return <section className="bg-slate-50 py-8"><div className="mx-auto max-w-7xl px-4"><div className="mb-5 h-8 w-48 animate-pulse rounded bg-slate-200" /><div className="h-56 animate-pulse rounded-[2rem] bg-slate-200" /></div></section>;
  if (!promos.length) return null;

  return (
    <section className="bg-slate-50 py-7 sm:py-12">
      <div className="mx-auto max-w-7xl px-3 min-[390px]:px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950 min-[390px]:text-2xl sm:text-3xl">Ofertas para seu pet</h2>
          <Link href="/promocoes" className="text-xs font-bold text-emerald-700 sm:text-sm underline underline-offset-4">Ver todas</Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {promos.map((promo, index) => {
            const href = promo.category_slug ? `/produtos/categoria/${promo.category_slug}` : "/#catalogo";
            return (
              <motion.div key={promo.id} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: reduceMotion ? 0 : index * 0.04 }} className="w-[92%] max-w-[620px] shrink-0 snap-start min-[390px]:w-[88%]">
                <Link href={href} className="grid h-48 grid-cols-[42%_58%] min-[390px]:h-56 min-[390px]:grid-cols-[44%_56%] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:h-64">
                  <div className="relative bg-emerald-50">{promo.image_url && <Image src={promo.image_url} alt={promo.name} fill sizes="300px" className="object-contain p-4" />}</div>
                  <div className="flex flex-col justify-center p-3 min-[390px]:p-5 sm:p-7">
                    <span className="text-xs font-bold text-slate-400">Oferta especial</span>
                    <h3 className="mt-1 line-clamp-2 text-base min-[390px]:text-lg font-black text-slate-950 sm:text-2xl">{promo.name}</h3>
                    {promo.discount_badge && <div className="mt-2 text-2xl min-[390px]:text-3xl font-black text-emerald-600 sm:text-4xl">{promo.discount_badge}</div>}
                    <span className="mt-3 w-fit rounded-full min-[390px]:mt-4 bg-emerald-500 px-4 py-2 text-xs font-black text-white sm:text-sm">Comprar agora</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
