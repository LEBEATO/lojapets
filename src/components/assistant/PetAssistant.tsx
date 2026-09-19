"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Check,
  MessageCircle,
  Send,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
};

type AssistantResponse = {
  answer?: string;
  products?: Product[];
  error?: string;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Olá! Eu sou o Assistente Pet da PetLoja. Posso ajudar você a encontrar produtos, comparar opções e tirar dúvidas gerais sobre cuidados com seu pet.",
};

const QUICK_PROMPTS = [
  "Qual ração você recomenda?",
  "Quero um brinquedo para cachorro pequeno",
  "Mostre produtos em promoção",
];

export default function PetAssistant() {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const conversationHistory = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .slice(-8)
        .map(({ role, content }) => ({ role, content })),
    [messages]
  );

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, loading, open, reduceMotion]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProductId(product.id);
    window.setTimeout(() => setAddedProductId(null), 1200);
  };

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: conversationHistory,
        }),
      });

      const data = (await response.json()) as AssistantResponse;

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Não foi possível responder agora.");
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.answer!,
          products: Array.isArray(data.products) ? data.products.slice(0, 3) : [],
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "O Assistente Pet está indisponível no momento. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-3 right-3 z-[70] flex h-[min(680px,78vh)] flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] sm:bottom-24 sm:left-auto sm:right-5 sm:w-[420px]"
            aria-label="Assistente Pet"
          >
            <header className="flex items-center justify-between border-b border-emerald-500/30 bg-emerald-600 px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-black">Assistente Pet</h2>
                    <Sparkles className="h-3.5 w-3.5 text-orange-300" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] text-emerald-50">Ajuda inteligente para escolher melhor</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Fechar Assistente Pet"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto bg-slate-50/80 px-3.5 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={message.role === "assistant" ? "w-[94%]" : "max-w-[86%]"}>
                      <div
                        className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                          message.role === "user"
                            ? "rounded-br-md bg-emerald-600 text-white"
                            : "rounded-bl-md border border-slate-200/70 bg-white text-slate-700"
                        }`}
                      >
                        {message.content}
                      </div>

                      {message.role === "assistant" && message.products && message.products.length > 0 && (
                        <div className="mt-2.5 space-y-2.5">
                          <div className="flex items-center gap-2 px-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                            <Sparkles className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                            Recomendados para você
                          </div>

                          {message.products.map((product) => (
                            <motion.article
                              key={product.id}
                              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
                            >
                              <div className="flex gap-3 p-3">
                                <Link
                                  href={`/produtos/${product.id}`}
                                  onClick={() => setOpen(false)}
                                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                  aria-label={`Ver ${product.name}`}
                                >
                                  {product.image_url ? (
                                    <Image
                                      src={product.image_url}
                                      alt={product.name}
                                      fill
                                      sizes="80px"
                                      className="object-contain p-1.5 transition-transform duration-300 hover:scale-105"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                                      Sem imagem
                                    </div>
                                  )}
                                </Link>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                      {product.discount_badge && (
                                        <span className="mb-1 inline-flex rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-800">
                                          {product.discount_badge}
                                        </span>
                                      )}
                                      <Link
                                        href={`/produtos/${product.id}`}
                                        onClick={() => setOpen(false)}
                                        className="block line-clamp-2 text-xs font-extrabold leading-snug text-slate-900 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:underline"
                                      >
                                        {product.name}
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="mt-2 flex items-end justify-between gap-2">
                                    <div>
                                      {product.old_price && product.old_price > product.price && (
                                        <div className="text-[10px] leading-none text-slate-400 line-through">
                                          {formatPrice(product.old_price)}
                                        </div>
                                      )}
                                      <div className="mt-0.5 text-sm font-black text-emerald-700">
                                        {formatPrice(product.price)}
                                      </div>
                                    </div>

                                    {product.sizes && product.sizes.length > 0 && (
                                      <div className="max-w-[110px] truncate text-right text-[9px] font-medium text-slate-400">
                                        {product.sizes.slice(0, 2).join(" • ")}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 border-t border-slate-100">
                                <Link
                                  href={`/produtos/${product.id}`}
                                  onClick={() => setOpen(false)}
                                  className="flex min-h-11 items-center justify-center gap-1.5 border-r border-slate-100 px-2 text-[11px] font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
                                >
                                  Ver produto
                                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(product)}
                                  className="flex min-h-11 items-center justify-center gap-1.5 px-2 text-[11px] font-extrabold text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
                                  aria-label={`Adicionar ${product.name} ao carrinho`}
                                >
                                  {addedProductId === product.id ? (
                                    <>
                                      Adicionado
                                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                    </>
                                  ) : (
                                    <>
                                      Adicionar
                                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200/70 bg-white px-3.5 py-3 shadow-sm">
                      {[0, 1, 2].map((index) => (
                        <motion.span
                          key={index}
                          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.12 }}
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {messages.length === 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-left text-[11px] font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/10">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 600))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      if (input.trim()) void sendMessage(input);
                    }
                  }}
                  rows={1}
                  maxLength={600}
                  placeholder="Pergunte sobre seu pet ou um produto..."
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label="Mensagem para o Assistente Pet"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !input.trim()}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="mt-2 px-1 text-center text-[10px] leading-relaxed text-slate-400">
                Recomendações usam o catálogo atual. Para questões de saúde, procure um veterinário.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        className="fixed bottom-4 right-3 z-[70] flex min-h-14 items-center gap-2 rounded-full bg-emerald-600 px-3.5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(5,150,105,0.30)] transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:bottom-5 sm:right-5 sm:px-4"
        aria-expanded={open}
        aria-label={open ? "Fechar Assistente Pet" : "Abrir Assistente Pet"}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        </span>
        <span className="hidden min-[390px]:inline">Assistente Pet IA</span>
      </motion.button>
    </>
  );
}
