import Hero from "@/components/layout/Hero";
import PromoCarousel from "@/components/ui/PromoCarousel";
import ProductGridClient from "@/components/ui/ProductGridClient";
import { productService } from "@/services/productService";

export default async function Home() {
  const { data: produtos } = await productService.getAll();

  return (
    <>
      <Hero />
      <PromoCarousel />
      <section id="catalogo" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 sm:mb-8">
          🐾 Catálogo Completo
        </h2>
        <ProductGridClient produtos={produtos || []} />
      </section>
    </>
  );
}