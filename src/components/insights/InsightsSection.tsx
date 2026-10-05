import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Newspaper, Mail, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface Article {
  id: string;
  category: 'MARKETS' | 'CAPITAL' | 'INTELLIGENCE';
  title: string;
  readTime: string;
  summary: string;
  date: string;
}

const INSIGHTS_ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'CAPITAL',
    title: 'Guía Integral: Cómo Financiar una Propiedad en República Dominicana siendo Extranjero',
    readTime: '6 min de lectura',
    summary: 'Requisitos de la banca múltiple, tax returns necesarios, porcentaje de inicial habitual y cómo aprovechar la Ley CONFOTUR para ahorrar hasta un 3% en costos de cierre.',
    date: 'Octubre 2026'
  },
  {
    id: 'art-2',
    category: 'MARKETS',
    title: 'USD vs. DOP: ¿En Qué Moneda Conviene Endeudarse para Inversión Inmobiliaria?',
    readTime: '5 min de lectura',
    summary: 'Análisis de diferenciales de tasas (7.75% USD vs 11.45% DOP), histórico de depreciación del peso dominicano y arbitraje financiero para rentas turísticas.',
    date: 'Octubre 2026'
  },
  {
    id: 'art-3',
    category: 'INTELLIGENCE',
    title: 'Banca y Compliance Dominicano: Proceso de Apertura de Cuentas para No Residentes',
    readTime: '4 min de lectura',
    summary: 'Directrices de la Superintendencia de Bancos sobre debida diligencia, trazabilidad de origen de fondos y estructuración de expedientes KYC sin fricciones.',
    date: 'Septiembre 2026'
  }
];

interface InsightsSectionProps {
  onAskNexa: (query: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onAskNexa }) => {
  const { t } = useLanguage();
  const { playTactileClick, playSuccessHum } = useSound();

  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSuccessHum();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <section id="insights" className="relative py-24 bg-[#0a0705] border-t border-payote-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t.insights.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
              {t.insights.title}
            </h2>
            <p className="text-sm sm:text-base text-payote-sandMuted max-w-2xl font-light">
              {t.insights.subtitle}
            </p>
          </div>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {INSIGHTS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="luxury-card rounded-2xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-payote-slate uppercase tracking-wider pb-3 border-b border-payote-border/30">
                  <span className="text-payote-gold font-semibold">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-payote-cream mt-4 group-hover:text-payote-gold transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-payote-sandMuted mt-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-payote-border/30 flex items-center justify-between">
                <button
                  onClick={() => {
                    playTactileClick();
                    onAskNexa(`¿Podrías profundizar en las conclusiones del informe "${article.title}" de CAPNEXS Insights?`);
                  }}
                  className="text-xs font-mono text-payote-gold hover:text-payote-gold-light inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explorar con NEXA</span>
                </button>
                <span className="text-[10px] font-mono text-payote-slate">{article.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CAPNEXS CAPITAL BRIEF Editorial Subscription Box */}
        <div className="luxury-card rounded-3xl p-8 sm:p-12 border border-payote-gold/30 bg-gradient-to-br from-payote-espresso/90 via-payote-black to-payote-black relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-payote-gold font-bold block">
              PRODUCTO EDITORIAL SEMANAL
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-payote-cream">
              CAPNEXS CAPITAL BRIEF
            </h3>
            <p className="text-sm font-serif italic text-payote-gold-light">
              Intelligence for capital moving through the Dominican Republic.
            </p>
            <p className="text-xs sm:text-sm text-payote-sandMuted leading-relaxed font-light">
              {t.insights.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo institucional o personal..."
                className="flex-1 px-5 py-3 rounded-full bg-payote-black/90 border border-payote-border/60 text-xs font-mono text-payote-cream placeholder-payote-slate focus:border-payote-gold focus:outline-none"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-payote-gold-light transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>{t.insights.subNewsletter}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="pt-2 text-xs font-mono text-payote-emerald flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Suscripción confirmada. Recibirás la próxima edición de CAPNEXS CAPITAL BRIEF este viernes.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
