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
  const all = produtos || [];
  const dogProducts = all.filter((p) => /cao|cachorro|racao|petisco/i.test(p.category_slug || "")).slice(0, 4);
  const catProducts = all.filter((p) => /gato|racao|petisco/i.test(p.category_slug || "")).slice(0, 4);
  const featured = all.slice(0, 6);

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <PromoCarousel />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-600">Mais procurados</p><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Os pets amam</h2></div>
          <a href="#catalogo" className="text-sm font-bold text-emerald-700 underline underline-offset-4">Ver todos</a>
        </div>
        <ProductGridClient produtos={featured} />
      </section>

      {dogProducts.length > 0 && <section className="bg-slate-50 py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="mb-6 text-2xl font-black text-slate-950 sm:text-3xl">Ofertas para Cães</h2><ProductGridClient produtos={dogProducts} /></div></section>}
      {catProducts.length > 0 && <section className="py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="mb-6 text-2xl font-black text-slate-950 sm:text-3xl">Ofertas para Gatos</h2><ProductGridClient produtos={catProducts} /></div></section>}

      <TrustBenefits />

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-7"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-600">Tudo em um só lugar</p><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Todos os produtos</h2><p className="mt-2 text-sm text-slate-500">{all.length} produtos disponíveis</p></div>
        <ProductGridClient produtos={all} />
      </section>

      <StoreCta />
    </>
  );
}
