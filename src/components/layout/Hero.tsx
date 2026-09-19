"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const slides = [
  { image: "/pet1.jpg", eyebrow: "Tudo para o seu pet", title: "Cuidado, carinho e ofertas em um só lugar.", text: "Rações, petiscos, brinquedos e acessórios escolhidos para facilitar a rotina de quem ama pets." },
  { image: "/pet2.jpg", eyebrow: "Ofertas especiais", title: "Mais economia para cuidar de quem você ama.", text: "Descubra produtos para cães e gatos e monte seu pedido em poucos passos." },
  { image: "/pet3.jpg", eyebrow: "Compra simples", title: "Escolha no site e finalize pelo WhatsApp.", text: "Adicione os produtos ao carrinho, revise o pedido e fale diretamente com nosso atendimento." },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const slide = slides[current];

  return (
    <section className="bg-white px-3 pb-5 pt-19 min-[390px]:px-4 sm:px-6 sm:pb-6 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] min-[390px]:min-h-[470px] min-[390px]:rounded-[2rem] bg-emerald-950 shadow-xl sm:min-h-[520px] lg:min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div key={slide.image} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.6 }} className="absolute inset-0">
              <Image src={slide.image} alt="" fill priority={current === 0} sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-slate-950/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-transparent to-transparent lg:hidden" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex min-h-[430px] max-w-2xl flex-col justify-end p-5 pb-8 min-[390px]:min-h-[470px] min-[390px]:p-6 text-white sm:min-h-[520px] sm:p-10 lg:min-h-[560px] lg:justify-center lg:p-14">
            <motion.div key={`copy-${current}`} initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.55 }}>
              <span className="inline-flex rounded-full bg-orange-400 px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-slate-950">{slide.eyebrow}</span>
              <h1 className="mt-4 text-[1.7rem] font-black min-[390px]:text-3xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{slide.title}</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-emerald-50 sm:text-lg">{slide.text}</p>
              <div className="mt-6 flex flex-col gap-3 min-[390px]:flex-row">
                <Link href="#catalogo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-black shadow-lg shadow-emerald-950/20 hover:bg-emerald-400">Comprar agora <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/sobre" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-bold backdrop-blur hover:bg-white/15"><MessageCircle className="h-4 w-4" /> Como comprar</Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 right-5 z-20 flex gap-2">
            {slides.map((_, index) => <button key={index} type="button" onClick={() => setCurrent(index)} aria-label={`Ver banner ${index + 1}`} aria-current={index === current ? "true" : undefined} className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-orange-400" : "w-2 bg-white/60"}`} />)}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 min-[390px]:mt-4 min-[390px]:gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 min-[390px]:p-4"><Truck className="h-5 w-5 shrink-0 text-emerald-600" /><span className="text-xs font-bold text-slate-700 sm:text-sm">Entrega com cuidado</span></div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 min-[390px]:p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" /><span className="text-xs font-bold text-slate-700 sm:text-sm">Compra segura</span></div>
          <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 min-[390px]:p-4 sm:col-span-1"><MessageCircle className="h-5 w-5 shrink-0 text-emerald-600" /><span className="text-xs font-bold text-slate-700 sm:text-sm">Pedido finalizado pelo WhatsApp</span></div>
        </div>
      </div>
    </section>
  );
}
