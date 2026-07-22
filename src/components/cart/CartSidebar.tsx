"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { HiXMark, HiMinus, HiPlus, HiTrash, HiOutlineShoppingBag } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/config/constants";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "🐾 *Novo Pedido - PetLoja* 🐾\n\n";
    message += "Olá! Gostaria de encomendar os seguintes produtos:\n";
    message += "-----------------------------------------\n";

    cart.forEach((item) => {
      const itemTotal = formatPrice(item.price * item.quantity);
      message += `• *${item.quantity}x* ${item.name} (${itemTotal})\n`;
    });

    const totalFormatted = formatPrice(cartTotal);
    message += "-----------------------------------------\n";
    message += `💰 *Total Geral:* ${totalFormatted}\n\n`;
    message += "Eles estão disponíveis para entrega?";

    const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message);
    
    clearCart();
    setIsCartOpen(false);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fundo escurecido */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      {/* Sidebar do Carrinho */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[92vw] sm:max-w-md">
        <div className="flex-1 bg-white shadow-xl flex flex-col rounded-l-2xl sm:rounded-l-none overflow-hidden">
          
          {/* Cabeçalho - Reduzido */}
          <div className="flex-shrink-0 px-3 py-2.5 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm sm:text-lg font-black text-slate-800 flex items-center gap-1.5">
              <HiOutlineShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> 
              <span>Carrinho</span>
              {cart.length > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              aria-label="Fechar carrinho"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Listagem de Itens - Compacta */}
          <div className="flex-1 overflow-y-auto p-2.5 sm:p-6 space-y-2 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm font-medium">
                Seu carrinho está vazio.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {/* Imagem - Menor */}
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-lg relative overflow-hidden flex-shrink-0 p-0.5 border border-slate-100">
                    <Image src={item.image_url} alt={item.name} fill className="object-contain p-0.5" />
                  </div>

                  {/* Informações - Compactas */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name}
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-600">
                      {formatPrice(item.price)}
                    </p>
                    
                    {/* Controles - Menores */}
                    <div className="flex items-center gap-1 mt-0.5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="p-0.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <HiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="p-0.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <HiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Botão Remover - Menor */}
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Remover produto"
                  >
                    <HiTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Rodapé - Compacto */}
          {cart.length > 0 && (
            <div className="flex-shrink-0 px-3 py-2.5 sm:px-6 sm:py-4 border-t border-slate-100 space-y-2 bg-white">
              <div className="flex items-center justify-between text-slate-800 font-bold">
                <span className="text-xs sm:text-sm">Total:</span>
                <span className="text-base sm:text-xl font-black text-slate-950">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 px-3 rounded-xl transition-colors duration-200 text-xs sm:text-sm shadow-sm active:scale-95"
              >
                <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Finalizar no WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}