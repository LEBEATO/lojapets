import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/config/constants";
import { generateWhatsAppLink } from "@/lib/utils";

export default function SobrePage() {
  const whatsappMessage = encodeURIComponent("Olá! Vim pelo site da PetLoja e gostaria de tirar uma dúvida.");
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, whatsappMessage);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full bg-white min-h-screen text-slate-800">
      <div className="text-center mb-12">
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Nossa História 🐾
        </span>
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mt-3">
          Sobre a PetLoja
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Cuidando do seu melhor amigo com carinho, respeito e produtos premium.
        </p>
      </div>

      <div className="w-full h-[250px] sm:h-[350px] relative rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
        <Image 
          src="/lojapet.jpg" 
          alt="Fachada da PetLoja"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="space-y-8 text-sm leading-relaxed border-t border-slate-100 pt-8">
        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="text-lg font-bold text-slate-950 mb-2">Quem Somos</h2>
          <p className="text-slate-600">
            A PetLoja nasceu da paixão por animais de estimação e do desejo de oferecer uma experiência de compra moderna, rápida e confiável. Somos um ecossistema completo focado em trazer o que há de melhor no mercado de nutrição, saúde, higiene e diversão para o seu pet.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 rounded-2xl">
            <h3 className="font-bold text-slate-950 mb-2">Nossa Missão 🎯</h3>
            <p className="text-slate-600">
              Facilitar o acesso a produtos de altíssima qualidade, garantindo que tutores encontrem tudo o que precisam em um clique, com a confiança de um estoque auditado e entrega ágil.
            </p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl">
            <h3 className="font-bold text-slate-950 mb-2">Nossos Valores ❤️</h3>
            <p className="text-slate-600">
              Amor e respeito incondicional aos animais, transparência total no catálogo e compromisso em usar a tecnologia para aproximar você do bem-estar do seu amigo peludo.
            </p>
          </div>
        </section>

        <div className="text-center bg-emerald-600 text-white p-8 rounded-3xl shadow-sm mt-8">
          <h3 className="text-xl font-black mb-2">Precisa de suporte ou tem alguma dúvida?</h3>
          <p className="text-emerald-100 text-xs mb-4">Nossa equipe de atendimento humanizado está pronta para ajudar você e seu pet.</p>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl text-xs shadow-sm inline-flex items-center gap-2 hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}