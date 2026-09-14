import Hero from "@/components/layout/Hero";
import TrustBenefits from "@/components/home/TrustBenefits";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import StoreCta from "@/components/home/StoreCta";
import PromoCarousel from "@/components/ui/PromoCarousel";
import ProductGridClient from "@/components/ui/ProductGridClient";
import { productService } from "@/services/productService";

export const revalidate = 0;

export default async function Home() {
  const { data: produtos } = await productService.getAll();

  return (
    <>
      <Hero />
      <TrustBenefits />
      <CategoryShowcase />
      <PromoCarousel />

      <section id="catalogo" className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
            Escolhas para o seu pet
          </span>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Catálogo completo
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Encontre alimentação, diversão, higiene e acessórios em uma seleção organizada para facilitar sua compra.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {produtos?.length || 0} produtos disponíveis
            </span>
          </div>
        </div>

        <ProductGridClient produtos={produtos || []} />
      </section>

      <StoreCta />
    </>
  );
}
