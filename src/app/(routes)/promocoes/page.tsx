import { createServerSupabase } from "@/lib/supabase-server";
import ProductGridClient from "@/components/ui/ProductGridClient";

export default async function PromocoesPage() {
  const supabase = await createServerSupabase();
  const { data: produtos } = await supabase
    .from("products")
    .select("*")
    .not("discount_badge", "is", null)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">🏷️</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Promoções
        </h1>
      </div>
      <p className="text-slate-500 mb-8">
        {produtos?.length || 0} produto(s) com desconto
      </p>
      <ProductGridClient produtos={produtos || []} />
    </div>
  );
}

export const metadata = {
  title: 'Promoções - PetLoja',
  description: 'Confira as melhores ofertas e promoções da PetLoja. Produtos com descontos especiais para seu pet.',
};