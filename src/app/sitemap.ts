import { MetadataRoute } from 'next';
import { createClient } from '../lib/supabase-server'; 

// Garante que a rota não seja pré-renderizada estaticamente sem as variáveis de ambiente no build
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seu-dominio.com.br';

  // Páginas estáticas principais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
  url:`${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    // Inicialização segura do Supabase para buscar produtos dinamicamente
    const supabase = await createClient();
    const { data: produtos } = await supabase
      .from('produtos')
      .select('slug, updated_at');

    const productRoutes: MetadataRoute.Sitemap = (produtos || []).map((produto) => ({
      url: `${baseUrl}/produtos/${produto.slug}`,
      lastModified: produto.updated_at ? new Date(produto.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    console.error('Erro ao gerar sitemap dinâmico:', error);
    // Retorna ao menos as rotas estáticas caso haja algum problema na busca
    return staticRoutes;
  }
}