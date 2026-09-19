"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { HiXMark, HiMinus, HiPlus, HiTrash, HiOutlineShoppingBag } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/config/constants";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();
  const reduceMotion = useReducedMotion();

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

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            className="absolute inset-0 h-full w-full bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
          />

          <motion.div
            initial={reduceMotion ? { x: 0, opacity: 0 } : { x: "104%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { x: 0, opacity: 0 } : { x: "104%", opacity: 0.92 }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 320, damping: 32, mass: 0.86 }
            }
            className="absolute inset-y-0 right-0 flex w-full max-w-[390px] sm:max-w-md"
          >
            <div className="flex flex-1 flex-col overflow-hidden bg-white shadow-2xl">
              <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
                <h2 className="flex items-center gap-1 text-xs font-black text-slate-800 sm:gap-1.5 sm:text-lg">
                  <HiOutlineShoppingBag className="h-3.5 w-3.5 text-emerald-600 sm:h-5 sm:w-5" />
                  <span>Meu carrinho</span>
                  {cart.length > 0 && (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                      {cart.length}
                    </span>
                  )}
                </h2>
                <motion.button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                  aria-label="Fechar carrinho"
                >
                  <HiXMark className="h-5 w-5" />
                </motion.button>
              </div>

              <motion.div
                className="flex-1 space-y-3 overflow-y-auto p-4 sm:space-y-4 sm:p-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: 0.08 },
                  },
                }}
              >
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-xs font-medium text-slate-400 sm:py-12 sm:text-sm"
                  >
                    Seu carrinho está vazio.
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                      layout={!reduceMotion}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-1">
                        <Image src={item.image_url} alt={item.name} fill className="object-contain p-0.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-xs font-bold text-slate-800">
                          {item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name}
                        </h4>
                        <p className="text-xs font-extrabold text-emerald-600">{formatPrice(item.price)}</p>

                        <div className="mt-0.5 flex items-center gap-1">
                          <motion.button
                            type="button"
                            whileTap={reduceMotion ? undefined : { scale: 0.88 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-md border border-slate-200 bg-white p-0.5 text-slate-600 transition-colors hover:bg-slate-100"
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <HiMinus className="h-3 w-3" />
                          </motion.button>
                          <span className="w-4 text-center text-xs font-bold text-slate-700">{item.quantity}</span>
                          <motion.button
                            type="button"
                            whileTap={reduceMotion ? undefined : { scale: 0.88 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-md border border-slate-200 bg-white p-0.5 text-slate-600 transition-colors hover:bg-slate-100"
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <HiPlus className="h-3 w-3" />
                          </motion.button>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remover ${item.name}`}
                      >
                        <HiTrash className="h-3.5 w-3.5" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </motion.div>

              {cart.length > 0 && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.3 }}
                  className="flex-shrink-0 space-y-3 border-t border-slate-100 bg-white px-4 py-4 sm:px-6"
                >
                  <p className="text-xs leading-relaxed text-slate-500">Revise os produtos e envie o pedido diretamente para nosso atendimento.</p>\n                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="text-[11px] sm:text-sm">Total:</span>
                    <span className="text-sm font-black text-slate-950 sm:text-xl">{formatPrice(cartTotal)}</span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-md transition-colors duration-200 hover:bg-[#20ba5a]"
                  >
                    <FaWhatsapp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Finalizar no WhatsApp</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
