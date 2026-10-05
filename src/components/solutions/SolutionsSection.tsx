import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import {
  Home,
  Landmark,
  Briefcase,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface SolutionsSectionProps {
  onOpenBooking: () => void;
  onOpenScore: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onOpenBooking,
  onOpenScore,
}) => {
  const { t } = useLanguage();
  const { playTactileClick, playSubtleTick } = useSound();

  const [activeTab, setActiveTab] = useState<number>(0);

  const solutions = [
    {
      id: 'mortgages',
      title: t.solutions.s1Title,
      icon: Home,
      desc: t.solutions.s1Desc,
      points: t.solutions.s1Points,
      stat: 'Hasta 80% LTV',
      statLabel: 'Financiamiento sobre valor de tasación',
      tag: '01 · CORE DIVISION'
    },
    {
      id: 'banking',
      title: t.solutions.s2Title,
      icon: Landmark,
      desc: t.solutions.s2Desc,
      points: t.solutions.s2Points,
      stat: '48 Horas',
      statLabel: 'Tiempo récord de apertura asistida',
      tag: '02 · PRIVATE ONBOARDING'
    },
    {
      id: 'corporate',
      title: t.solutions.s3Title,
      icon: Briefcase,
      desc: t.solutions.s3Desc,
      points: t.solutions.s3Points,
      stat: 'US$ 500K - 15M+',
      statLabel: 'Capacidad de sindicación crediticia',
      tag: '03 · CORPORATE DESK'
    },
    {
      id: 'investment',
      title: t.solutions.s4Title,
      icon: TrendingUp,
      desc: t.solutions.s4Desc,
      points: t.solutions.s4Points,
      stat: '11.8% Net Yield',
      statLabel: 'Rendimiento promedio de activos optimizados',
      tag: '04 · YIELD ADVISORY'
    },
    {
      id: 'international',
      title: t.solutions.s5Title,
      icon: Globe2,
      desc: t.solutions.s5Desc,
      points: t.solutions.s5Points,
      stat: 'Ley CONFOTUR',
      statLabel: 'Exención del 3% transferencia y 1% IPI',
      tag: '05 · CROSS-BORDER WEALTH'
    }
  ];

  const current = solutions[activeTab];

  return (
    <section id="solutions" className="relative py-24 bg-[#080605] border-t border-payote-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.solutions.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
            {t.solutions.title}
          </h2>
          <p className="text-sm sm:text-base text-payote-sandMuted font-light">
            {t.solutions.subtitle}
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Column (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {solutions.map((sol, index) => {
              const Icon = sol.icon;
              const isSelected = activeTab === index;
              return (
                <div
                  key={sol.id}
                  onClick={() => {
                    playSubtleTick();
                    setActiveTab(index);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-payote-espresso border-payote-gold shadow-[0_0_25px_rgba(201,168,76,0.18)]'
                      : 'bg-payote-card/50 border-payote-border/50 hover:bg-payote-surface/60 hover:border-payote-border'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-payote-gold text-payote-black'
                          : 'bg-payote-surface text-payote-gold group-hover:bg-payote-gold/20'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-payote-slate uppercase block">
                        {sol.tag}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-payote-cream group-hover:text-payote-gold transition-colors">
                        {sol.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-payote-gold translate-x-1' : 'text-payote-slate'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Detailed View Card (7 cols) */}
          <div className="lg:col-span-7 luxury-card rounded-3xl p-8 sm:p-10 border border-payote-gold/30 flex flex-col justify-between space-y-8 min-h-[460px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-payote-border/40 pb-5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-payote-gold font-bold">
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-payote-slate">
                  PAYOTE FINANCIAL LAYER
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-payote-sandMuted leading-relaxed">
                {current.desc}
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-payote-sand">
                    <CheckCircle2 className="w-4 h-4 text-payote-gold flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Banner & Actions */}
            <div className="pt-6 border-t border-payote-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold text-payote-gold">
                  {current.stat}
                </div>
                <div className="text-[11px] font-mono text-payote-slate">
                  {current.statLabel}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenScore();
                  }}
                  className="px-4 py-2.5 rounded-full border border-payote-gold/40 text-payote-gold font-mono text-xs uppercase tracking-wider hover:bg-payote-gold/10 transition-colors"
                >
                  Precalificar
                </button>
                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenBooking();
                  }}
                  className="px-5 py-2.5 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-payote-gold-light transition-colors shadow-lg flex items-center gap-1.5"
                >
                  <span>Solicitar Asesoría</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
