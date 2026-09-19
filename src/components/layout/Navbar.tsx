"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { CART_ITEM_ADDED_EVENT } from "@/lib/animations/flyToCart";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BadgePercent, Beef, Heart, Home, Menu, Package, Pill, Shirt, Sparkles, ToyBrick, X, ChevronRight } from "lucide-react";

const menuItems = [
  { title: "Rações", href: "/produtos/categoria/racoes", icon: Package },
  { title: "Petiscos", href: "/produtos/categoria/petiscos", icon: Beef },
  { title: "Brinquedos", href: "/produtos/categoria/brinquedos", icon: ToyBrick },
  { title: "Higiene", href: "/produtos/categoria/higiene", icon: Sparkles },
  { title: "Acessórios", href: "/produtos/categoria/acessorios", icon: Shirt },
  { title: "Medicamentos", href: "/produtos/categoria/medicamentos", icon: Pill },
  { title: "Promoções", href: "/promocoes", icon: BadgePercent },
  { title: "Sobre nós", href: "/sobre", icon: Heart },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const cartControls = useAnimationControls();

  useEffect(() => {
    const handleCartArrival = () => {
      if (!reduceMotion) cartControls.start({ scale: [1, 1.18, 1], transition: { duration: 0.35 } });
    };
    window.addEventListener(CART_ITEM_ADDED_EVENT, handleCartArrival);
    return () => window.removeEventListener(CART_ITEM_ADDED_EVENT, handleCartArrival);
  }, [cartControls, reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center bg-emerald-600 px-4 text-white shadow-md sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center">
          <button type="button" onClick={() => setOpen(true)} className="justify-self-start rounded-xl p-2 hover:bg-white/10" aria-label="Abrir menu">
            <Menu className="h-7 w-7" />
          </button>
          <Link href="/" className="justify-self-center whitespace-nowrap text-xl font-black italic tracking-tight sm:text-2xl">
            <span className="mr-1" aria-hidden="true">🐾</span>Loja Pets
          </Link>
          <motion.button data-cart-target type="button" animate={cartControls} onClick={() => setIsCartOpen(true)} className="relative justify-self-end rounded-xl p-2 hover:bg-white/10" aria-label="Abrir carrinho">
            <HiOutlineShoppingBag className="h-7 w-7" />
            {cartCount > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black">{cartCount}</span>}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button aria-label="Fechar menu" className="fixed inset-0 z-[60] bg-slate-950/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 top-0 z-[70] w-[86%] max-w-[390px] overflow-y-auto bg-white text-slate-800 shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-5">
                <div><p className="text-xl font-black">Olá! 👋</p><p className="text-sm text-slate-500">Encontre tudo para o seu pet</p></div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-slate-100 p-2" aria-label="Fechar menu"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-4">
                <Link href="/" onClick={() => setOpen(false)} className="mb-2 flex items-center gap-3 rounded-2xl px-3 py-3 font-bold hover:bg-emerald-50"><Home className="h-5 w-5 text-emerald-600" /> Início</Link>
                <p className="px-3 pb-2 pt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Categorias</p>
                {menuItems.map(({ title, href, icon: Icon }) => (
                  <Link key={title} href={href} onClick={() => setOpen(false)} className="group flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-emerald-50">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Icon className="h-5 w-5" /></span>
                    <span className="flex-1 font-bold">{title}</span><ChevronRight className="h-5 w-5 text-slate-400" />
                  </Link>
                ))}
                <div className="my-4 border-t border-slate-100" />
                <Link href="/produtos" onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 font-bold hover:bg-slate-50">Todos os produtos</Link>
                <Link href="/sobre" onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 font-bold hover:bg-slate-50">Atendimento e informações</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
