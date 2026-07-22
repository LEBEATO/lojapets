export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  old_price?: number | null;
  image_url: string;
  discount_badge?: string | null;
  category_slug: string;
  sizes?: string[];
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface Category {
  slug: string;
  title: string;
  emoji: string;
  icon: string;
}

export type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};