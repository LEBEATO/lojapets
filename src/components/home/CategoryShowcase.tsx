"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Beef, Package, Pill, Shirt, Sparkles, ToyBrick } from "lucide-react";

const categories = [
  { title: "Rações", href: "/produtos/categoria/racoes", icon: Package },
  { title: "Petiscos", href: "/produtos/categoria/petiscos", icon: Beef },
  { title: "Brinquedos", href: "/produtos/categoria/brinquedos", icon: ToyBrick },
  { title: "Higiene", href: "/produtos/categoria/higiene", icon: Sparkles },
  { title: "Acessórios", href: "/produtos/categoria/acessorios", icon: Shirt },
  { title: "Medicamentos", href: "/produtos/categoria/medicamentos", icon: Pill },
];

export default function CategoryShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8" aria-labelledby="category-heading">
      <div className="mb-5 flex items-end justify-between">
        <h2 id="category-heading" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Categorias</h2>
        <Link href="/produtos" className="text-sm font-bold text-emerald-700 underline underline-offset-4">Ver todas</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ title, href, icon: Icon }, index) => (
          <motion.div key={title} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduceMotion ? 0.01 : 0.42, delay: reduceMotion ? 0 : (index % 2) * 0.05 }}>
            <Link href={href} className="group flex min-h-20 items-center gap-3 rounded-[1.6rem] border border-slate-200 bg-white p-2 pr-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-14 sm:w-14"><Icon className="h-7 w-7" /></span>
              <span className="text-sm font-extrabold text-slate-900 sm:text-base">{title}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
