"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "/pet1.jpg",
  "/pet2.jpg",
  "/pet3.jpg",
   "/pet4.jpg",
    "/pet5.jpg",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });


  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

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
    <section ref={containerRef} className="w-full bg-white pb-4 md:pb-8">
     
      <div className="w-full overflow-hidden flex flex-col items-center justify-center md:justify-end pb-8 md:pb-12 min-h-[420px] h-[60vh] sm:h-[65vh] md:h-[75vh] text-center px-4 sm:px-6 relative shadow-lg">

        {/* Container da Imagem */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={HERO_IMAGES[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="object-cover object-[center_25%]"sizer="100vw"
            >
              <Image
                src={HERO_IMAGES[currentImageIndex]}
                alt="Banner Pet Shop"
                fill
                priority={currentImageIndex === 0}
                className="object-cover object-[center_25%]"
                
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Overlay com leve escurecimento extra no mobile para melhorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10 pointer-events-none" />

        {/* Conteúdo textual centralizado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl relative z-20 flex flex-col items-center w-full"
        >
          <motion.h1
            variants={textVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-stretch-50% text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2"
          >
            Tudo que seu Pet precisa, <br className="hidden md:block" />
            com a entrega que ele merece!
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-slate-100 mt-3 sm:mt-5 text-sm sm:text-base md:text-xl font-medium max-w-xl md:max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2"
          >
            Explore nossa seleção exclusiva de rações, brinquedos e acessórios direto do nosso catálogo dinâmico.
          </motion.p><motion.div variants={textVariants} className="mt-6 sm:mt-8">
            <Link
              href="#catalogo"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 duration-200 inline-block"
            >
              Ver Catálogo Completo 🐾
            </Link>
          </motion.div>

          {/* Dots de navegação */}
          {HERO_IMAGES.length > 1 && (
            <div className="flex gap-2 mt-5 sm:mt-6 z-20">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-6 sm:w-8 bg-emerald-400"
                      : "w-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}