import ProductGridClient from "@/components/ui/ProductGridClient";
import { createServerSupabase } from "@/lib/supabase-server";

export const revalidate = 0;

export default async function ProdutosPage() {
  const supabase = await createServerSupabase();
  const { data: produtos, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600">
          Catálogo PetLoja
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Todos os produtos
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          Encontre rações, petiscos, brinquedos, itens de higiene, acessórios e outros cuidados para o seu pet.
        </p>
      </div>

      {produtos && produtos.length > 0 ? (
        <>
          <div className="mb-5 text-sm font-semibold text-slate-500">
            {produtos.length} produto{produtos.length === 1 ? "" : "s"} disponível{produtos.length === 1 ? "" : "is"}
          </div>
          <ProductGridClient produtos={produtos} />
        </>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Nenhum produto disponível no momento</h2>
          <p className="mt-2 text-sm text-slate-500">
            Volte em breve para conferir as novidades da PetLoja.
          </p>
        </div>
      )}
    </div>
  );
}

export const metadata = {
  title: "Produtos - PetLoja",
  description: "Confira o catálogo completo de produtos da PetLoja para o seu pet.",
};
