"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useOutsideClick(() => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  });

  return (
    <nav className="w-full h-14 sm:h-16 bg-white border-b border-slate-100 fixed top-0 left-0 z-50 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between">
        
        <Link href="/" className="text-lg sm:text-xl font-black text-emerald-600 tracking-tight flex items-center gap-1">
          🐾 PET<span className="text-slate-800">LOJA</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4" ref={menuRef}>
          
          {/* Menu Desktop */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                menuOpen ? "bg-emerald-50 text-emerald-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Produtos</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-[340px] sm:w-[400px] rounded-3xl border border-slate-100 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="grid grid-cols-2 gap-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.title} 
                        href={item.href} 
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-slate-50 transition-all group"
                      >
                        <Icon className="h-4 w-4 text-slate-600" />
                        <span className="font-bold text-xs sm:text-sm text-slate-700">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Menu Mobile (Hambúrguer) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-emerald-600 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>{/* Carrinho */}
          <button 
            onClick={() => setIsCartOpen(true)}
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

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-slate-100 shadow-lg md:hidden z-50 py-3 px-4">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.title} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-all"
                >
                  <Icon className="h-4 w-4 text-slate-600" />
                  <span className="font-medium text-sm text-slate-700">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}