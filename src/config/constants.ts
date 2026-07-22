import { Category } from '@/types';

export const CATEGORIES: Record<string, Category> = {
  racoes: { slug: 'racoes', title: 'Rações', emoji: '🦴', icon: 'Package' },
  petiscos: { slug: 'petiscos', title: 'Petiscos', emoji: '🍖', icon: 'Beef' },
  brinquedos: { slug: 'brinquedos', title: 'Brinquedos', emoji: '🧸', icon: 'ToyBrick' },
  higiene: { slug: 'higiene', title: 'Higiene & Estética', emoji: '✨', icon: 'Sparkles' },
  acessorios: { slug: 'acessorios', title: 'Acessórios', emoji: '👔', icon: 'Shirt' },
  medicamentos: { slug: 'medicamentos', title: 'Medicamentos', emoji: '💊', icon: 'Pill' },
};

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5511999999999';
export const SITE_NAME = 'PetLoja';
export const SITE_DESCRIPTION = 'O melhor pet shop online com produtos selecionados para seu animal de estimação.';