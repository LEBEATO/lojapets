import { createServerSupabase } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/ui/AddToCartButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  
  const supabase = await createServerSupabase();
  const { data: produto, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !produto) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Imagem do Produto */}
        <div className="relative h-[400px] md:h-[500px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <Image
            src={produto.image_url || "/placeholder.png"}
            alt={produto.name}
            fill
            priority
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Informações do Produto */}
        <div className="flex flex-col justify-center">
          {produto.discount_badge && (
            <span className="inline-block bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg w-fit mb-4">
              {produto.discount_badge}
            </span>
          )}
          
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            {produto.name}
          </h1>
          
          <p className="text-slate-500 mt-4 leading-relaxed">
            {produto.description}
          </p>
          
          <div className="mt-6">
            {produto.old_price && produto.old_price > 0 && (
              <span className="text-slate-400 line-through text-lg">
                {formatPrice(produto.old_price)}
              </span>
            )}
            <span className="text-4xl font-black text-emerald-600 block">
              {formatPrice(produto.price)}
            </span>
          </div>

          {produto.sizes && produto.sizes.length > 0 && (
            <div className="mt-6">
              <p className="font-bold text-sm text-slate-700">Tamanhos disponíveis:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {produto.sizes.map((size: string) => (
                  <span 
                    key={size} 
                    className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700 border border-slate-200"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton product={produto} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  const supabase = await createServerSupabase();
  const { data: produto } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", slug)
    .single();

  return {
    title:` ${produto?.name || 'Produto'} - PetLoja`,
    description: produto?.description || 'Produto de qualidade para seu pet.',
  };
}