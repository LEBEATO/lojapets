"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CART_ITEM_ADDED_EVENT } from "@/lib/animations/flyToCart";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  ShoppingBag,
  Package,
  Beef,
  ToyBrick,
  Sparkles,
  Shirt,
  Pill,
  BadgePercent,
  Heart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "Rações", href: "/produtos/categoria/racoes", icon: Package },
  { title: "Petiscos", href: "/produtos/categoria/petiscos", icon: Beef },
  { title: "Brinquedos", href: "/produtos/categoria/brinquedos", icon: ToyBrick },
  { title: "Higiene", href: "/produtos/categoria/higiene", icon: Sparkles },
  { title: "Acessórios", href: "/produtos/categoria/acessorios", icon: Shirt },
  { title: "Medicamentos", href: "/produtos/categoria/medicamentos", icon: Pill },
  { title: "Promoções", href: "/promocoes", icon: BadgePercent },
  { title: "Sobre Nós", href: "/sobre", icon: Heart },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const cartControls = useAnimationControls();

  const closeMenus = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const menuRef = useOutsideClick(closeMenus);
  const isHomeTop = pathname === "/" && !scrolled;

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const handleCartArrival = () => {
      if (reduceMotion) return;
      cartControls.start({
        scale: [1, 1.2, 0.94, 1],
        rotate: [0, -5, 4, 0],
        transition: { type: "spring", stiffness: 420, damping: 24, duration: 0.46 },
      });
    };

    window.addEventListener(CART_ITEM_ADDED_EVENT, handleCartArrival);
    return () => window.removeEventListener(CART_ITEM_ADDED_EVENT, handleCartArrival);
  }, [cartControls, reduceMotion]);

  return (
    <nav
      ref={menuRef}
      className={`fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-center px-3 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 sm:h-16 sm:px-6 lg:px-8 ${
        isHomeTop
          ? "border-b border-white/10 bg-transparent shadow-none"
          : "border-b border-slate-200/70 bg-white/82 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      }`}
    >
      <div className="flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-1 text-lg font-black tracking-tight sm:text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">🐾</span>
          <span className="text-emerald-500">PET</span>
          <span className={isHomeTop ? "text-white" : "text-slate-800"}>LOJA</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className={`hidden items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors sm:px-4 sm:py-2 sm:text-sm md:flex ${
              mobileMenuOpen
                ? "bg-emerald-50 text-emerald-600"
                : isHomeTop
                  ? "text-white hover:bg-white/12"
                  : "text-slate-700 hover:bg-slate-50"
            }`}
            aria-expanded={mobileMenuOpen}
            aria-controls="products-menu"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Produtos</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            className={`flex items-center gap-1 p-1.5 text-xs font-bold transition-colors md:hidden ${
              isHomeTop ? "text-white" : "text-slate-700 hover:text-emerald-600"
            }`}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="products-menu"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                initial={reduceMotion ? false : { opacity: 0, rotate: -18, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 18, scale: 0.8 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            data-cart-target
            type="button"
            animate={cartControls}
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            whileHover={reduceMotion ? undefined : { y: -1, scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            className={`relative rounded-xl p-1.5 transition-colors sm:p-2 ${
              isHomeTop ? "text-white hover:bg-white/12" : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            }`}
            aria-label="Abrir carrinho"
          >
            <HiOutlineShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            <AnimatePresence initial={false}>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm sm:h-5 sm:w-5 sm:text-[10px]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="products-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-14 z-50 border-b border-slate-100 bg-white px-4 py-3 shadow-xl sm:top-16 md:left-auto md:right-8 md:w-[380px] md:rounded-3xl md:border"
          >
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.025, duration: 0.22 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <Icon className="h-4 w-4 text-slate-600 transition-[color,transform] duration-200 group-hover:scale-110 group-hover:text-emerald-600" />
                      <span className="text-xs font-bold text-slate-700 transition-colors group-hover:text-emerald-700 sm:text-sm">{item.title}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
