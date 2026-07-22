"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productService } from "@/services/productService";
import { Product } from "@/types";

export default function PromoCarousel() {
  const [promos, setPromos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="w-full bg-slate-50/50 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse mb-4" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-none w-[280px] sm:w-[340px] h-[160px] bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (promos.length === 0) return null;

  const renderCard = (promo: Product, index: number) => {
    const discountParts = promo.discount_badge ? promo.discount_badge.split(' ') : ["% off"];
    // ✅ CORRIGIDO: template string com crases
    const destinoLink = promo.category_slug 
      ? `/produtos/categoria/${promo.category_slug}`
      : "/#catalogo";

    return (
      <Link
        // ✅ CORRIGIDO: template string com crases
        key={`${promo.id}-${index}`}
        href={destinoLink}
        className="flex-none w-[280px] sm:w-[340px] md:w-[400px] h-[160px] sm:h-[180px] md:h-[200px] rounded-2xl md:rounded-[2rem] bg-[#f4f8f0] flex relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100/40"
      >
        <div className="w-[40%] sm:w-[45%] h-full relative flex items-center justify-center overflow-hidden bg-[#b2e633]/10">
          <div className="absolute -left-20 -top-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#b2e633] opacity-90" />
          <div className="absolute -left-10 -bottom-16 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-[#b2e633] opacity-95" />
          
          <div className="relative z-10 w-full h-full p-3 sm:p-4 flex items-center justify-center drop-shadow-md">
            {promo.image_url ? (
              <Image 
                src={promo.image_url} 
                alt={promo.name}
                fill
                sizes="120px"
                className="object-contain p-2 transform -rotate-6 mix-blend-multiply" 
              />
            ) : (
              <div className="text-[10px] text-slate-400 font-bold">Sem Imagem</div>
            )}
          </div>
        </div>

        <div className="w-[60%] sm:w-[55%] flex flex-col justify-center items-start pl-3 sm:pl-4 pr-3 sm:pr-4 z-10">
          <span className="text-[10px] sm:text-sm italic font-medium tracking-tight text-[#0e4d32] opacity-90">
            Oferta Especial
          </span>
          <h3 className="text-xs sm:text-base font-black tracking-tight leading-tight my-0.5 text-[#0e4d32] line-clamp-2 uppercase">
            {promo.name}
          </h3>
          <p className="text-[10px] sm:text-xs font-semibold text-slate-500/90 leading-none mt-1">Com até</p>
          <div className="flex items-baseline">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-[#0e4d32]">
              {discountParts[0]}
            </span>
            {discountParts[1] && (
              <span className="text-xs sm:text-sm font-bold ml-1 text-[#0e4d32]">
                {discountParts[1]}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const precisaAnimar = promos.length > 2;return (
    <section className="w-full bg-slate-50/50 pt-6 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          As melhores ofertas
        </h2>
      </div>
      
      <div className="flex w-full overflow-hidden `[mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]`">
        <div 
          className={`flex gap-3 sm:gap-4 md:gap-5 py-2 whitespace-nowrap min-w-full ${
            precisaAnimar 
              ? "animate-infinite-scroll hover:[animation-play-state:paused]" 
              : "justify-start px-4 sm:px-8"
          }`}
          // ✅ Velocidade controlada pelo globals.css (15s)
        >
          {promos.map((promo, idx) => renderCard(promo, idx))}
          {precisaAnimar && promos.map((promo, idx) => renderCard(promo, idx + promos.length))}
        </div>
      </div>
    </section>
  );
}