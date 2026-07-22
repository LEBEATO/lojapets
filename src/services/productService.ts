import { supabase } from '@/lib/supabase';
import { Product, ApiResponse } from '@/types';

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
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          image_url: publicUrl,
        }])
        .select()
        .single();

      if (error) throw error;
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