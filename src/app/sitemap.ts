import { MetadataRoute } from 'next';
import { createServerSupabase } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seu-dominio.com.br';

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createServerSupabase();
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at');

    if (products && products.length > 0) {
      productUrls = products.map((product) => ({
        url: ${baseUrl}/produtos/${product.id},
        lastModified: product.updated_at || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Erro ao buscar produtos para o sitemap:', error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: ${baseUrl}/produtos,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: ${baseUrl}/promocoes,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...productUrls,
  ];
}