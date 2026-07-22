import { createServerSupabase } from "@/lib/supabase-server";
import ProductGridClient from "@/components/ui/ProductGridClient";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/config/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoriaSlugPage({ params }: Props) {
  const { slug } = await params;
  
  const supabase = await createServerSupabase();
  const { data: produtos, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", slug)
    .order("created_at", { ascending: false });

  if (error || !produtos || produtos.length === 0) {
    notFound();
  }

  const categoria = CATEGORIES[slug];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{categoria?.emoji || '🐾'}</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {categoria?.title || slug}
        </h1>
      </div>
      <p className="text-slate-500 mb-8">
        {produtos.length} produto(s) encontrado(s)
      </p>
      <ProductGridClient produtos={produtos} />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categoria = CATEGORIES[slug];
  
  return {
    title:` ${categoria?.title || slug} - PetLoja `,
    description: `Compre ${categoria?.title || slug} para seu pet na PetLoja. Produtos de qualidade com entrega rápida.`,
  };
}