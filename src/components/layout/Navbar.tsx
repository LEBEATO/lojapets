"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  ShoppingBag, Package, Beef, ToyBrick, Sparkles,
  Shirt, Pill, BadgePercent, Heart, ChevronDown, Menu, X
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

  const closeMenus = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const menuRef = useOutsideClick(closeMenus);

  return (
    <nav ref={menuRef} className="w-full h-14 sm:h-16 bg-white border-b border-slate-100 fixed top-0 left-0 z-50 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between">
        
        <Link href="/" className="text-lg sm:text-xl font-black text-emerald-600 tracking-tight flex items-center gap-1">
          🐾 PET<span className="text-slate-800">LOJA</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Botão de Produtos (Desktop) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`hidden md:flex items-center gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
              mobileMenuOpen ? "bg-emerald-50 text-emerald-600" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Produtos</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Botão Menu Hambúrguer (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1 font-bold text-xs"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Carrinho */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="relative p-1.5 sm:p-2 text-slate-700 hover:text-emerald-600 transition-colors"
            aria-label="Abrir carrinho"
          >
            <HiOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Menu Dropdown Unificado (Mobile e Desktop) */}
      {mobileMenuOpen && (
        <div className="absolute top-14 sm:top-16 left-0 right-0 md:left-auto md:right-8 bg-white border-b md:border border-slate-100 shadow-xl z-50 py-3 px-4 md:rounded-3xl md:w-[380px] animate-in fade-in zoom-in-95"><div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-slate-50 transition-all group"
                >
                  <Icon className="h-4 w-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                  <span className="font-bold text-xs sm:text-sm text-slate-700 group-hover:text-emerald-600 transition-colors">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}