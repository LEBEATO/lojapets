import Link from "next/link";
import { ArrowUpRight, Beef, Package, Pill, Shirt, Sparkles, ToyBrick } from "lucide-react";

const categories = [
  { title: "Rações", subtitle: "Nutrição para todos os dias", href: "/produtos/categoria/racoes", icon: Package },
  { title: "Petiscos", subtitle: "Carinho em forma de sabor", href: "/produtos/categoria/petiscos", icon: Beef },
  { title: "Brinquedos", subtitle: "Diversão e enriquecimento", href: "/produtos/categoria/brinquedos", icon: ToyBrick },
  { title: "Higiene", subtitle: "Cuidado e bem-estar", href: "/produtos/categoria/higiene", icon: Sparkles },
  { title: "Acessórios", subtitle: "Conforto para a rotina", href: "/produtos/categoria/acessorios", icon: Shirt },
  { title: "Medicamentos", subtitle: "Itens para cuidados especiais", href: "/produtos/categoria/medicamentos", icon: Pill },
];

export default function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-14 lg:px-8" aria-labelledby="category-heading">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Encontre mais rápido</span>
          <h2 id="category-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Compre por categoria</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">Tudo organizado para você chegar ao produto certo em poucos cliques.</p>
        </div>
        <Link href="/produtos" className="hidden text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600 sm:inline-flex">Ver todos</Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ title, subtitle, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="group relative min-h-40 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-base font-extrabold tracking-tight text-slate-900">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{subtitle}</p>
            <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
