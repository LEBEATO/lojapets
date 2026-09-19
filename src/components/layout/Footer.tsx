"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaFacebook, FaInstagram, FaPaw, FaWhatsapp } from "react-icons/fa";
import { Clock3, Headphones, ShieldCheck, Truck } from "lucide-react";

const columns = [
  { title: "Loja Pets", links: [["Sobre nós","/sobre"],["Todos os produtos","/produtos"],["Promoções","/promocoes"],["Rações","/produtos/categoria/racoes"]] },
  { title: "Ajuda", links: [["Atendimento","/sobre"],["Entrega e pedidos","/sobre"],["Trocas e devoluções","/sobre"],["Privacidade","/sobre"]] },
  { title: "Categorias", links: [["Petiscos","/produtos/categoria/petiscos"],["Brinquedos","/produtos/categoria/brinquedos"],["Higiene","/produtos/categoria/higiene"],["Acessórios","/produtos/categoria/acessorios"]] },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 rounded-[2rem] bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-3"><FaWhatsapp className="h-8 w-8 text-emerald-500" /><div><h2 className="text-lg font-black text-slate-950">Fale com a Loja Pets</h2><p className="text-sm text-slate-500">Atendimento rápido para ajudar na sua compra.</p></div></div>
          <Link href="/sobre" className="mt-4 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white sm:mt-0">Atendimento</Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-xl font-black text-emerald-600"><FaPaw /> <span>LOJA <span className="text-slate-900">PETS</span></span></div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">Produtos e cuidados escolhidos para deixar a rotina do seu pet mais feliz.</p>
            <div className="mt-5 flex gap-3"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white p-3 text-slate-500 shadow-sm"><FaInstagram /></a><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white p-3 text-slate-500 shadow-sm"><FaFacebook /></a></div>
          </div>
          {columns.map((column) => <div key={column.title}><h3 className="font-black text-slate-950">{column.title}</h3><div className="mt-4 flex flex-col gap-3">{column.links.map(([label,href]) => <Link key={label} href={href} className="text-sm text-slate-500 hover:text-emerald-600">{label}</Link>)}</div></div>)}
        </div>

        <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:grid-cols-4">
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Compra segura</span>
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-emerald-600" /> Entrega com cuidado</span>
          <span className="flex items-center gap-2"><Headphones className="h-4 w-4 text-emerald-600" /> Suporte ao cliente</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-600" /> Seg–Sex, 08h–18h</span>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Loja Pets. Todos os direitos reservados. <Link href="/login" className="text-emerald-600">•••</Link></div>
      </div>
    </footer>
  );
}
