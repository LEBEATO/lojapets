"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGES = ["/pet1.jpg","/pet2.jpg","/pet3.jpg","/pet4.jpg","/pet5.jpg"];
const HERO_TITLE_LINES = ["Tudo que seu Pet precisa,","com a entrega que ele merece!"];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentImageIndex,setCurrentImageIndex]=useState(0);
  const reduceMotion=useReducedMotion();
  useEffect(()=>{ if(HERO_IMAGES.length<=1||reduceMotion)return; const interval=window.setInterval(()=>setCurrentImageIndex(p=>(p+1)%HERO_IMAGES.length),5600); return()=>window.clearInterval(interval);},[reduceMotion]);
  const {scrollYProgress}=useScroll({target:containerRef,offset:["start start","end start"]});
  const imageY=useTransform(scrollYProgress,[0,1],["0%","12%"]);
  const imageScale=useTransform(scrollYProgress,[0,1],[1,1.055]);
  const textVariants={hidden:reduceMotion?{opacity:0}:{opacity:0,y:22,filter:"blur(8px)"},visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:reduceMotion?0.01:0.72,ease:[0.16,1,0.3,1] as const}}};
  return <section ref={containerRef} className="w-full bg-white pb-4 md:pb-8">
    <div className="relative flex min-h-[420px] h-[60vh] w-full flex-col items-center justify-center overflow-hidden px-4 pb-8 text-center shadow-lg sm:h-[65vh] sm:px-6 md:h-[75vh] md:justify-end md:pb-12">
      <motion.div style={reduceMotion?undefined:{y:imageY,scale:imageScale}} className="absolute inset-0 z-0 h-full w-full">
        <AnimatePresence initial={false} mode="sync"><motion.div key={HERO_IMAGES[currentImageIndex]} initial={reduceMotion?{opacity:1}:{opacity:0,scale:1.015}} animate={reduceMotion?{opacity:1}:{opacity:1,scale:1.065}} exit={{opacity:0}} transition={{opacity:{duration:reduceMotion?0.01:1.15,ease:"easeInOut"},scale:{duration:reduceMotion?0.01:6.2,ease:"linear"}}} className="absolute inset-0">
          <Image src={HERO_IMAGES[currentImageIndex]} alt={`Banner Pet Shop ${currentImageIndex+1}`} fill sizes="100vw" priority={currentImageIndex===0} className="object-cover object-[center_25%]"/>
        </motion.div></AnimatePresence>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/42 to-black/25"/>
      <motion.div initial="hidden" animate="visible" transition={{staggerChildren:reduceMotion?0:0.12,delayChildren:0.12}} className="relative z-20 flex w-full max-w-3xl flex-col items-center">
        <motion.span variants={textVariants} className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm shadow-lg backdrop-blur-md">🐾</motion.span>
        <motion.h1 variants={textVariants} className="px-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-5xl">
          {HERO_TITLE_LINES.map((line,i)=><span key={line} className={i===1?"block md:mt-1":"block"}>{line}</span>)}
        </motion.h1>
        <motion.p variants={textVariants} className="mt-3 max-w-2xl px-2 text-sm font-medium text-slate-100 sm:mt-5 sm:text-base md:text-xl">Explore nossa seleção exclusiva de rações, brinquedos e acessórios direto do nosso catálogo dinâmico.</motion.p>
        <motion.div variants={textVariants} className="mt-6 sm:mt-8" whileHover={reduceMotion?undefined:{y:-2,scale:1.025}} whileTap={reduceMotion?undefined:{scale:.97}}>
          <Link href="#catalogo" className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-300/30 bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(16,185,129,0.32)] transition duration-300 hover:bg-emerald-400 sm:px-8 sm:py-3.5 sm:text-base">Ver Catálogo Completo <span className="transition-transform group-hover:translate-x-0.5">🐾</span></Link>
        </motion.div>
        <motion.div variants={textVariants} className="mt-5 flex gap-2 sm:mt-6">{HERO_IMAGES.map((_,index)=><button key={index} type="button" onClick={()=>setCurrentImageIndex(index)} className="relative h-5 min-w-5 rounded-full" aria-label={`Ir para imagem ${index+1}`}><span className={`absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${index===currentImageIndex?"w-7 bg-emerald-400":"w-1.5 bg-white/55"}`}/></button>)}</motion.div>
      </motion.div>
    </div>
  </section>;
}
