import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

export default function StoreCta() {
  return (
    <section className="mx-auto max-w-7xl px-3 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-12">
        <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Atendimento que entende de pet
          </div>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Precisa de ajuda para escolher?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">Nossa equipe pode ajudar você a encontrar o produto ideal para a rotina e o bem-estar do seu pet.</p>
        </div>
        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-8">
          <Link href="/contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar com a PetLoja
          </Link>
          <Link href="/produtos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            Ver produtos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
