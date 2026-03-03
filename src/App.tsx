import {
  CheckCircle2,
  XCircle,
  ChefHat,
  BookOpen,
  Target,
  Award,
  ArrowRight,
  Utensils,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const CouponBadge = ({ code, light = false }: { code: string, light?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    // Play subtle success sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Browsers often block auto-playing audio unless triggered by user interaction
      // Since this is a click event, it should work, but we catch just in case.
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        onClick={handleCopy}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
          borderColor: light
            ? ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.2)"]
            : ["rgba(61,74,53,0.2)", "rgba(61,74,53,0.5)", "rgba(61,74,53,0.2)"]
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`px-4 py-2 rounded-full border flex items-center gap-3 group cursor-pointer transition-all relative overflow-hidden ${light
          ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          : "bg-brand-green/10 hover:bg-brand-green/20"
          }`}
      >
        <div className="flex flex-col items-start">
          <span className={`text-[10px] uppercase tracking-widest font-bold ${light ? "opacity-60" : "text-neutral-500"}`}>
            Cupom:
          </span>
          <span className={`text-lg font-mono font-bold text-brand-accent tracking-widest`}>
            {code}
          </span>
        </div>

        <div className="w-8 h-8 rounded-lg bg-brand-green/60 flex items-center justify-center text-brand-accent">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 bg-brand-green flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest"
            >
              Copiado!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Button = ({ children, className = "", primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={primary ? {
      boxShadow: ["0px 0px 0px rgba(0, 214, 50, 0)", "0px 0px 20px rgba(0, 214, 50, 0.8)", "0px 0px 0px rgba(0, 214, 50, 0)"],
    } : {}}
    transition={{
      duration: 0.15,
      ease: "easeOut",
      boxShadow: primary ? {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined
    }}
    className={`inline-block px-10 py-5 rounded-full font-bold text-white uppercase tracking-widest text-sm transition-all duration-50 shadow-xl relative overflow-hidden group text-center cursor-pointer ${primary
      ? "bg-linear-to-r from-emerald-600 to-emerald-500 hover:shadow-brand-green/40"
      : "bg-brand-brown hover:bg-brand-brown/90"
      } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
    {primary && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
    )}
  </motion.button>
);

const SectionDivider = ({ light = false, className = "" }: { light?: boolean, className?: string }) => (
  <div className={`flex items-center justify-center gap-4 py-8 rotate-180 ${className}`}>
    <div className={`h-px w-12 ${light ? "bg-white/20" : "bg-brand-brown/10"}`} />
    <Sparkles className={`w-4 h-4 ${light ? "text-brand-accent/40" : "text-brand-brown/20"}`} />
    <div className={`h-px w-12 ${light ? "bg-white/20" : "bg-brand-brown/10"}`} />
  </div>
);

const CurveDivider = ({ top = false, color = "fill-brand-cream" }: { top?: boolean, color?: string }) => (
  <div className={`absolute left-0 w-full overflow-hidden leading-0 z-20 ${top ? "top-0" : "bottom-0 rotate-180"}`}>
    <svg className={`relative block w-[calc(100%+1.3px)] h-10 ${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
    </svg>
  </div>
);

export default function App() {
  const couponCode = "MANUAL2026";

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent/30">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-green text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000"
            alt="Confeitaria background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand-green via-brand-green/80 to-transparent"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="text-brand-accent w-8 h-8" />
              <span className="uppercase tracking-[0.2em] text-sm font-semibold text-brand-accent">
                Manual da Confeiteira Iniciante
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl leading-[1.1] mb-6">
              As receitas certas para quem está <span className="italic">começando</span> na confeitaria
            </h1>

            <p className="text-md md:text-lg text-white/80 mb-10 leading-relaxed max-w-2xl">
              Um manual prático com as bases que toda confeiteira iniciante precisa dominar para ganhar segurança, padronizar resultados e evitar erros que desanimam no começo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button
                onClick={scrollToOffer}
                primary
                className="w-full sm:w-auto"
              >
                QUERO MEU MANUAL
                <ArrowRight className="w-5 h-5" />
              </Button>

              <CouponBadge code={couponCode} light />
            </div>
          </motion.div>
        </div>
        <CurveDivider color="fill-brand-cream" />
      </section>

      {/* Section 1: Pain Points */}
      <section className="py-24 bg-brand-cream relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/bolos1.jpg"
                  alt="Bolo com problema"
                  className="rounded-2xl shadow-xl aspect-3/4 object-cover"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/bolos2.jpg"
                  alt="Massa de bolo"
                  className="rounded-2xl shadow-xl aspect-3/4 object-cover mt-8"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div>
              <h2 className="text-4xl mb-8 leading-tight">
                Você já seguiu uma receita e o resultado não ficou igual?
              </h2>
              <ul className="space-y-6">
                {[
                  "Já perdeu um bolo porque a massa solar, o recheio desandar ou a textura não ficar estável?",
                  "Já ficou insegura sem saber se aquela receita “aguenta” venda?",
                  "O início na confeitaria costuma ser assim: muita tentativa, pouco padrão e muita frustração.",
                  "E quase nunca é falta de talento. É falta de receitas base bem explicadas e testadas."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <XCircle className="text-white fill-red-500 w-8 h-8 shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Storytelling */}
      <section className="py-24 bg-brand-green text-white relative">
        <CurveDivider top color="fill-brand-cream" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src="/bea-bolo.webp"
                alt="Bea Requena"
                className="rounded-3xl shadow-2xl overflow-hidden border-8 border-white/5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl mb-6">Eu também já tive medo...</h2>
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>
                  Quando eu comecei, também achava que precisava de dezenas de receitas diferentes. Com o tempo, aprendi algo essencial: <strong>quem domina as bases, domina a confeitaria.</strong>
                </p>
                <p>
                  Depois de mais de 10 anos de prática, erros, ajustes e testes, eu cheguei às receitas que realmente funcionam no dia a dia — aquelas que dão segurança para quem está começando.
                </p>
                <p className="text-brand-accent font-medium italic">
                  Esse manual é exatamente isso: as receitas-chave que sustentam a confeitaria iniciante.
                </p>
              </div>
            </div>
          </div>
        </div>
        <CurveDivider color="fill-brand-brown/5" />
      </section>

      {/* Section 3 & 4: Product Info & What's Inside */}
      <section className="py-24 bg-brand-brown/5">
        <div className="max-w-5xl mx-auto px-6">
          <SectionDivider />
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className=" text-4xl mb-6">O que é o Manual da Confeiteira Iniciante?</h2>
            <p className="text-lg text-gray-600">
              Um ebook prático com receitas base, pensadas para quem está começando e precisa de estabilidade, previsibilidade e segurança no preparo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Estabilidade", desc: "Receitas que não desandam e mantêm a estrutura." },
              { icon: TrendingUp, title: "Previsibilidade", desc: "Saiba exatamente o resultado que terá em cada fornada." },
              { icon: Utensils, title: "Segurança", desc: "Prepare suas encomendas sem o medo de perder ingredientes." },
              { icon: Sparkles, title: "Resultados Consistentes", desc: "Padronize sua produção desde o primeiro dia." },
              { icon: BookOpen, title: "Didática Prática", desc: "Explicações claras e focadas em quem está começando." },
              { icon: Target, title: "Foco em Vendas", desc: "Receitas testadas para aguentar o ritmo comercial." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-brown/30 hover:shadow-lg hover:shadow-brand-brown/20 transition-shadow">
                <feature.icon className="text-brand-brown w-10 h-10 mb-4" />
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-brand-green text-white p-10 rounded-3xl">
            <h3 className="text-3xl mb-8 text-center">Neste manual, você terá acesso a:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Evitar desperdício de ingredientes caros",
                "Reduzir erros comuns de iniciantes",
                "Garantir textura e sabor impecáveis",
                "Criar confiança na sua produção diária",
                "Servir como base para variações futuras",
                "Material de consulta constante para sua cozinha"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-accent w-6 h-6 shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Transformation (Before x After) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionDivider />
          <h2 className="text-4xl text-center mb-16">Do Medo à Confiança</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-500 p-2 rounded-full">
                  <XCircle className="text-white w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-red-900">Antes do Manual</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Insegurança ao testar receitas",
                  "Resultados inconsistentes",
                  "Medo de errar e perder ingredientes",
                  "Dúvida se está pronta para vender"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-red-800/80">
                    <span className="text-red-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-accent p-2 rounded-full">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <h3 className="font-bold text-2xl text-emerald-900">Depois do Manual</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Mais segurança no preparo",
                  "Receitas estáveis e confiáveis",
                  "Clareza sobre as bases da confeitaria",
                  "Confiança para seguir evoluindo"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-emerald-800/80">
                    <span className="text-brand-accent">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: For Who */}
      <section className="py-24 bg-brand-green text-white relative">
        <CurveDivider top color="fill-white" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className=" text-4xl mb-8">Este ebook é para você que:</h2>
              <ul className="space-y-4">
                {[
                  "Está começando na confeitaria",
                  "Quer dominar receitas base",
                  "Precisa de segurança técnica",
                  "Quer parar de errar sem saber o motivo"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center">
                    <CheckCircle2 className="text-brand-accent w-6 h-6" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-4xl mb-8 opacity-60">Não é para quem:</h2>
              <ul className="space-y-4 opacity-60">
                {[
                  "Já tem domínio técnico avançado",
                  "Busca receitas extremamente elaboradas",
                  "Não quer aprender os fundamentos"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center">
                    <XCircle className="text-red-400 w-6 h-6" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <CurveDivider color="fill-brand-cream" />
      </section>

      {/* Section 7: Authority */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6">
          <SectionDivider />
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="relative">
                <img
                  src="/bea-sobre.webp"
                  alt="Bea Requena"
                  className="rounded-full aspect-square object-cover border-8 border-white shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 -right-4 bg-amber-400 p-4 rounded-full shadow-lg">
                  <Award className="w-8 h-8" color='#fff' />
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className=" text-4xl mb-6">Quem é a Bea Requena?</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Sou a Bea Requena. Confeiteira há mais de 10 anos, com ateliê próprio e experiência real em produção, vendas e ensino.
                </p>
                <p>
                  As receitas deste manual fazem parte da minha prática — são testadas, ajustadas e pensadas para quem está começando agora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Final Offer */}
      <section id="offer" className="py-24 bg-brand-brown text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 blur-3xl rounded-full -ml-32 -mb-32"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="relative group">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex justify-center z-20"
                >
                  {/* iPad Mockup */}
                  <motion.div
                    whileHover={{ y: -15, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-full max-w-105 aspect-3/4 bg-white/30 rounded-[3.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border-12 border-white/20 transform -rotate-2 cursor-pointer"
                  >
                    {/* Screen */}
                    <div className="relative w-full h-auto rounded-[2.5rem] overflow-hidden">
                      <img src="/bea-bolo.webp" alt="Ebook Cover" className="w-full h-full object-cover rounded-[2.5rem] border border-white" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                        <p className="text-xs uppercase tracking-widest font-bold mb-2 text-white/70">Bea Requena</p>
                        <h4 className="text-2xl leading-tight text-white">Manual da Confeiteira Iniciante</h4>
                        <div className="mt-6 h-1.5 w-16 bg-brand-cream rounded-full"></div>
                      </div>
                    </div>


                    <div className="mt-8 flex items-center justify-center mx-auto gap-4 opacity-60 text-xs">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-brand-brown" referrerPolicy="no-referrer" />
                        ))}
                      </div>
                      <p>+ de 500 alunas já começaram</p>
                    </div>

                    {/* Camera Notch (iPad style) */}
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1 h-8 bg-neutral-700 rounded-l-sm"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rounded-full border border-white/5"></div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="md:w-1/2 text-center md:text-left">
              <h2 className=" text-5xl mb-6">Comece hoje mesmo com segurança</h2>
              <p className="text-xl text-white/80 mb-8">
                Se você quer começar na confeitaria com mais segurança e menos frustração, este manual é para você.
              </p>

              <div className="mb-10">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                  <span className="text-white/50 line-through text-2xl">R$ 97,00</span>
                  <span className="bg-brand-accent text-brand-green text-sm font-bold px-3 py-1 rounded-full">60% OFF</span>
                </div>
                <div className="text-6xl font-bold text-brand-accent">R$ 37,90</div>
                <p className="text-sm text-white/60 mt-2 italic">Pagamento único. Acesso imediato.</p>
              </div>

              <Button
                primary
                className="w-full"
              >
                QUERO MEU MANUAL DE RECEITAS-CHAVE
                <ArrowRight className="w-6 h-6" />
              </Button>

              <div className="mt-6 flex justify-center md:justify-start">
                <CouponBadge code={couponCode} light />
              </div>

              <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm">Compra Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm">Garantia de 7 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-brand-green relative text-white/40 text-center">
        <CurveDivider top color="fill-brand-brown" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ChefHat className="w-6 h-6" />
            <span className="text-xl text-white/80">Bea Requena</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Manual da Confeiteira Iniciante. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            Desenvolvido com carinho para confeiteiras que buscam excelência.
          </p>
        </div>
      </footer>
    </div>
  );
}
