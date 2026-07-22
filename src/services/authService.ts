import { supabase } from '@/lib/supabase';
import { ApiResponse } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ session: any; user: any }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      return { 
        data: { session: data.session, user: data.user }, 
        error: null 
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  },

  async getSession(): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { data: data.session, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getUser(): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
};