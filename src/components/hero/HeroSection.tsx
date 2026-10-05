import React from 'react';
import { HeroFinancialNexus } from '../3d/HeroFinancialNexus';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { ArrowUpRight, Shield, Sparkles, ChevronRight, Activity } from 'lucide-react';

interface HeroSectionProps {
  onOpenScoreModal: () => void;
  onOpenBookingModal: () => void;
  onExploreTools: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScoreModal,
  onOpenBookingModal,
  onExploreTools,
}) => {
  const { t } = useLanguage();
  const { playTactileClick, playGoldChime } = useSound();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-12 pb-16">
      {/* 3D WebGL Background Canvas */}
      <HeroFinancialNexus />

      {/* Subtle radial ambient gradients (non-blocking) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-payote-gold/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-10 w-[450px] h-[450px] bg-payote-slate/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl space-y-8">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-payote-espresso/80 border border-payote-gold/30 backdrop-blur-md shadow-[0_0_25px_rgba(201,168,76,0.15)] shimmer-effect">
            <span className="w-2 h-2 rounded-full bg-payote-gold animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-payote-gold font-semibold uppercase">
              {t.hero.tag}
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-payote-cream leading-[1.05]">
              Capital <br />
              <span className="text-gold-gradient italic font-normal">
                connected
              </span>{' '}
              to opportunity.
            </h1>

            <p className="text-base sm:text-lg text-payote-sandMuted max-w-2xl font-light leading-relaxed tracking-wide pt-2">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary CTA: Analyze Profile */}
            <button
              onClick={() => {
                playGoldChime();
                onOpenScoreModal();
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-mono font-bold text-xs uppercase tracking-widest shadow-[0_0_35px_rgba(201,168,76,0.35)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-payote-black group-hover:rotate-12 transition-transform" />
              <span>{t.hero.ctaPrimary}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Talk to Specialist */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenBookingModal();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-payote-border/70 hover:border-payote-gold text-payote-cream hover:text-payote-gold font-mono font-medium text-xs uppercase tracking-widest bg-payote-black/40 backdrop-blur-md transition-all duration-300 hover:bg-payote-espresso/60"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowUpRight className="w-4 h-4 text-payote-gold" />
            </button>

            {/* Explore Tools link */}
            <button
              onClick={() => {
                playTactileClick();
                onExploreTools();
              }}
              className="text-xs font-mono tracking-wider text-payote-slate hover:text-payote-sand underline underline-offset-4 py-2 transition-colors"
            >
              Explorar simuladores y calculadoras ↓
            </button>
          </div>

          {/* Services pill */}
          <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-payote-slate tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5 text-payote-gold" />
            <span>{t.hero.servicesPill}</span>
          </div>
        </div>
      </div>

      {/* Bottom KPI Bar / Luxury Statistics Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-payote-border/40 pt-8">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream tracking-tight flex items-baseline gap-1">
              <span>{t.hero.stat1Value}</span>
              <span className="text-payote-gold text-sm font-sans font-normal">✦</span>
            </div>
            <div className="text-xs font-mono text-payote-slate uppercase tracking-wider">
              {t.hero.stat1Label}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-payote-gold tracking-tight flex items-baseline gap-1">
              <span>{t.hero.stat2Value}</span>
              <Activity className="w-3.5 h-3.5 text-payote-emerald inline ml-1 animate-pulse" />
            </div>
            <div className="text-xs font-mono text-payote-slate uppercase tracking-wider">
              {t.hero.stat2Label}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream tracking-tight">
              <span>{t.hero.stat3Value}</span>
            </div>
            <div className="text-xs font-mono text-payote-slate uppercase tracking-wider">
              {t.hero.stat3Label}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-payote-sand tracking-tight">
              <span>{t.hero.stat4Value}</span>
            </div>
            <div className="text-xs font-mono text-payote-slate uppercase tracking-wider">
              {t.hero.stat4Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
