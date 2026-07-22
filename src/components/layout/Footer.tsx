"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaPaw } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-black text-lg tracking-tight">
              <FaPaw className="w-5 h-5" />
              <span>PET<span className="text-slate-800">LOJA</span></span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto md:mx-0 leading-relaxed">
              O pet shop feito para quem ama cuidar. Oferecemos a melhor experiência de compra online com produtos selecionados e entrega rápida.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">Siga-nos nas redes</span>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex flex-col gap-1 md:text-right">
            <span className="font-bold text-slate-700">Atendimento ao Cliente</span>
            <span>Segunda a Sexta: 08h às 18h</span>
            <span>suporte@petloja.com</span>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 text-center text-xs text-slate-400">
          <span>© {new Date().getFullYear()} PetLoja. Todos os direitos reservados
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 transition-colors ml-1">....</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}