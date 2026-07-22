"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-white pb-4 sm:pb-8">
      <div className="w-full overflow-hidden flex flex-col items-center justify-end pb-8 sm:pb-12 min-h-[400px] h-[60vh] sm:h-[70vh] md:h-[75vh] text-center px-4 sm:px-6 relative shadow-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/banner-pet.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl relative z-20 flex flex-col items-center px-4"
        >
          <motion.h1 
            variants={textVariants}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]"
          >
            Tudo que seu Pet precisa, <br className="hidden sm:block"/>
            com a entrega que ele merece!
          </motion.h1>
          
          <motion.p 
            variants={textVariants}
            className="text-slate-100 mt-3 sm:mt-5 text-sm sm:text-base md:text-xl font-semibold max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2"
          >
            Explore nossa seleção exclusiva de rações, brinquedos e acessórios direto do nosso catálogo dinâmico.
          </motion.p>

          <motion.div variants={textVariants}>
            <Link 
              href="#catalogo"
              className="mt-6 sm:mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 duration-200 inline-block"
            >
              Ver Catálogo Completo 🐾
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}