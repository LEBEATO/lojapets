import { Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Entrega com praticidade",
    description: "Seu pedido preparado com cuidado e agilidade.",
  },
  {
    icon: Headphones,
    title: "Atendimento próximo",
    description: "Suporte para ajudar você a escolher melhor.",
  },
  {
    icon: Sparkles,
    title: "Seleção de qualidade",
    description: "Produtos escolhidos pensando no bem-estar do pet.",
  },
  {
    icon: ShieldCheck,
    title: "Compra confiável",
    description: "Uma experiência simples, clara e segura.",
  },
];

export default function TrustBenefits() {
  return (
    <section aria-label="Benefícios da PetLoja" className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-200/70 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex min-h-32 gap-3 bg-white px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">{title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
