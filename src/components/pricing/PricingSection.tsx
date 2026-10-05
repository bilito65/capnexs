import React from 'react';
import { GoldEmblem3D } from '../3d/GoldEmblem3D';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Check, Sparkles, Shield, ArrowRight, Star } from 'lucide-react';

interface PricingSectionProps {
  onOpenScore: () => void;
  onOpenBooking: () => void;
  onSelectTier?: (tierName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenScore,
  onOpenBooking,
}) => {
  const { t } = useLanguage();
  const { playTactileClick, playGoldChime } = useSound();

  const plans = [
    {
      name: t.pricing.plan1Name,
      price: t.pricing.plan1Price,
      period: 'acceso permanente',
      desc: t.pricing.plan1Desc,
      points: t.pricing.plan1Points,
      cta: t.pricing.plan1Cta,
      action: onOpenScore,
      isPrimary: false,
    },
    {
      name: t.pricing.plan2Name,
      price: t.pricing.plan2Price,
      period: 'pago único / 90 días validez',
      desc: t.pricing.plan2Desc,
      points: t.pricing.plan2Points,
      cta: t.pricing.plan2Cta,
      action: onOpenScore,
      isPrimary: false,
    },
    {
      name: t.pricing.plan3Name,
      price: t.pricing.plan3Price,
      badge: t.pricing.plan3Badge,
      period: 'sesión privada 1 a 1',
      desc: t.pricing.plan3Desc,
      points: t.pricing.plan3Points,
      cta: t.pricing.plan3Cta,
      action: onOpenBooking,
      isPrimary: true,
    },
    {
      name: t.pricing.plan4Name,
      price: t.pricing.plan4Price,
      period: 'honorarios a éxito / corretaje',
      desc: t.pricing.plan4Desc,
      points: t.pricing.plan4Points,
      cta: t.pricing.plan4Cta,
      action: onOpenBooking,
      isPrimary: false,
      has3DCard: true
    },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-[#080605] border-t border-payote-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-sm sm:text-base text-payote-sandMuted font-light">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPrimary
                  ? 'bg-gradient-to-b from-payote-espresso to-payote-black border-2 border-payote-gold shadow-[0_0_40px_rgba(201,168,76,0.25)] -translate-y-2'
                  : 'luxury-card border border-payote-border/60 hover:border-payote-gold/40'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-payote-gold text-payote-black text-[10px] font-mono font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="border-b border-payote-border/30 pb-5">
                  <h3 className="text-lg font-serif font-bold text-payote-cream">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-payote-gold">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-payote-slate uppercase tracking-wider block mt-1">
                    {plan.period}
                  </span>
                </div>

                <p className="text-xs text-payote-sandMuted mt-4 leading-relaxed">
                  {plan.desc}
                </p>

                {/* Features List */}
                <div className="space-y-3 mt-6">
                  {plan.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-payote-sand">
                      <Check className="w-3.5 h-3.5 text-payote-gold flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    playTactileClick();
                    plan.action();
                  }}
                  className={`w-full py-3 rounded-full text-xs font-mono tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.isPrimary
                      ? 'bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black hover:opacity-95 shadow-[0_0_20px_rgba(201,168,76,0.35)]'
                      : 'border border-payote-gold/40 text-payote-gold hover:bg-payote-gold hover:text-payote-black'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Client Holographic Emblem Spotlight */}
        <div className="mt-16 luxury-card rounded-3xl p-8 sm:p-12 border border-payote-gold/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRIVATE CLIENT MEMBERSHIP · ULTRA HIGH NET WORTH</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-payote-cream">
              Atención directa con Paola García y la mesa de banca privada.
            </h3>
            <p className="text-sm text-payote-sandMuted leading-relaxed font-light">
              Para operaciones superiores a US$ 1,000,000 o carteras inmobiliarias corporativas. Acceso prioritario a líneas de crédito privadas, estructuración fiduciaria y oportunidades off-market originadas dentro del ecosistema Payote Group.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  playGoldChime();
                  onOpenBooking();
                }}
                className="px-6 py-3 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-payote-gold-light transition-colors shadow-lg"
              >
                Solicitar Acceso Private Client
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <GoldEmblem3D />
          </div>
        </div>
      </div>
    </section>
  );
};
