import React, { useState, useEffect } from 'react';
import { CapnexsLogo } from '../common/CapnexsLogo';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Volume2, VolumeX, Globe, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenScoreModal: () => void;
  onOpenBookingModal: () => void;
  onOpenNexaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScoreModal,
  onOpenBookingModal,
  onOpenNexaModal,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { soundEnabled, toggleSound, playTactileClick } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.solutions, href: '#solutions' },
    { label: t.nav.markets, href: '#financial-desk' },
    { label: t.nav.tools, href: '#tools-suite' },
    { label: t.nav.ecosystem, href: '#ecosystem' },
    { label: t.nav.insights, href: '#insights' },
    { label: t.nav.pricing, href: '#pricing' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-payote-black/90 backdrop-blur-md border-b border-payote-border/50 py-3 shadow-2xl'
          : 'bg-transparent py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => playTactileClick()}
            className="flex items-center group transition-transform duration-300 hover:scale-[1.02]"
          >
            <CapnexsLogo size="sm" showSubtitle={true} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => playTactileClick()}
                className="text-payote-sandMuted hover:text-payote-gold transition-colors duration-200 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-payote-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* NEXA AI Quick Trigger Pill */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenNexaModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-payote-gold/10 border border-payote-gold/30 text-payote-gold hover:bg-payote-gold hover:text-payote-black transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.15)] group"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow group-hover:rotate-45 transition-transform" />
              <span className="font-semibold">{t.nav.nexa}</span>
              <span className="text-[10px] opacity-75">✦</span>
            </button>
          </div>

          {/* Right Controls: Sound, Language, CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? t.nav.soundOn : t.nav.soundOff}
              className={`p-2 rounded-full border transition-all duration-200 ${
                soundEnabled
                  ? 'border-payote-gold text-payote-gold bg-payote-gold/10 shadow-[0_0_10px_rgba(201,168,76,0.25)]'
                  : 'border-payote-border/50 text-payote-slate hover:text-payote-cream hover:border-payote-slate'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                playTactileClick();
                setLanguage(language === 'es' ? 'en' : 'es');
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-payote-border/60 hover:border-payote-gold/50 text-payote-cream hover:text-payote-gold text-[11px] font-mono tracking-widest uppercase transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-payote-gold" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Talk to Specialist CTA */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenBookingModal();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-payote-border hover:border-payote-sand text-xs font-mono text-payote-cream tracking-wider uppercase transition-all duration-200 hover:bg-payote-surface"
            >
              <span>{t.nav.talkSpecialist}</span>
            </button>

            {/* Primary Action Button: Analyze Profile */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenScoreModal();
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-semibold text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>{t.nav.analyzeProfile}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                playTactileClick();
                setLanguage(language === 'es' ? 'en' : 'es');
              }}
              className="p-1.5 text-payote-gold border border-payote-border rounded-full text-xs font-mono"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-payote-cream hover:text-payote-gold focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-payote-black/95 backdrop-blur-xl border-b border-payote-border px-6 pt-4 pb-8 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3 font-mono text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playTactileClick();
                  setMobileMenuOpen(false);
                }}
                className="text-payote-sandMuted hover:text-payote-gold py-1.5 border-b border-payote-border/30"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(false);
                onOpenNexaModal();
              }}
              className="flex items-center justify-between text-payote-gold font-semibold py-2"
            >
              <span>NEXA AI DESK ✦</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(false);
                onOpenScoreModal();
              }}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-bold text-xs font-mono tracking-widest uppercase text-center shadow-lg"
            >
              {t.nav.analyzeProfile}
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 rounded-full border border-payote-border text-payote-cream font-mono text-xs tracking-wider uppercase text-center"
            >
              {t.nav.talkSpecialist}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
