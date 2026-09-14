import { supabase } from '@/lib/supabase';
import { Product, ApiResponse } from '@/types';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const IMAGE_EXTENSION_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function validateProductImage(imageFile: File) {
  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    throw new Error('Formato de imagem inválido. Use JPG, PNG ou WEBP.');
  }

  if (imageFile.size <= 0 || imageFile.size > MAX_IMAGE_SIZE) {
    throw new Error('A imagem deve ter no máximo 5 MB.');
  }
}

export const productService = {
  async getAll(): Promise<ApiResponse<Product[]>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getByCategory(slug: string): Promise<ApiResponse<Product[]>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_slug', slug)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getPromotions(): Promise<ApiResponse<Product[]>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .not('discount_badge', 'is', null)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getById(id: string): Promise<ApiResponse<Product>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async create(product: Partial<Product>, imageFile: File): Promise<ApiResponse<Product>> {
    try {
      validateProductImage(imageFile);

      const extension = IMAGE_EXTENSION_BY_TYPE[imageFile.type];
      const randomId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const fileName = `${randomId}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('product-images').getPublicUrl(fileName);

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            ...product,
            image_url: publicUrl,
          },
        ])
        .select()
        .single();

      if (error) {
        await supabase.storage.from('product-images').remove([fileName]);
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
};