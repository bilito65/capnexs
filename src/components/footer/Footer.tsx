import React from 'react';
import { CapnexsLogo } from '../common/CapnexsLogo';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Shield, Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenScore: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScore, onOpenBooking }) => {
  const { t } = useLanguage();
  const { playTactileClick } = useSound();

  const ecosystemLinks = [
    { name: 'Dream', desc: 'Luxury Properties', href: '#' },
    { name: 'Capnexs', desc: 'Financial Intelligence', href: '#' },
    { name: 'Avranza', desc: 'Tax & Corporate', href: '#' },
    { name: 'Alenza', desc: 'Legal Architecture', href: '#' },
    { name: 'Acogus', desc: 'Architecture & Design', href: '#' },
    { name: 'Ocevia', desc: 'Asset Management', href: '#' },
    { name: 'Payote Luxury', desc: 'Hospitality & Living', href: 'https://payote-web.web.app' },
  ];

  return (
    <footer className="relative bg-[#060403] border-t border-payote-border/40 pt-16 pb-12 text-payote-cream overflow-hidden">
      {/* Top Gold Shimmer Border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-payote-gold to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <CapnexsLogo size="md" showSubtitle={true} />
            <p className="text-xs font-mono text-payote-sandMuted leading-relaxed max-w-sm pt-2">
              {t.footer.tagline} La capa de inteligencia financiera y estructuración de capital de Payote Group.
            </p>
            <div className="text-[11px] font-mono text-payote-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.footer.ceoNotice}</span>
            </div>
          </div>

          {/* Ecosystem Matrix (4 cols) */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-widest text-payote-slate font-bold pb-1 border-b border-payote-border/30">
              PAYOTE GROUP ECOSYSTEM
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {ecosystemLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => playTactileClick()}
                  className="p-2 rounded-lg bg-payote-card/40 border border-payote-border/30 hover:border-payote-gold/50 hover:bg-payote-surface transition-all group"
                >
                  <span className="font-bold text-payote-cream group-hover:text-payote-gold block text-xs">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-payote-slate block">
                    {item.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Access & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-widest text-payote-slate font-bold pb-1 border-b border-payote-border/30">
              DIRECT DESK & ENGAGEMENT
            </div>

            <div className="space-y-2 text-payote-sandMuted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-payote-gold flex-shrink-0" />
                <span>Torre Piantini, Santo Domingo · Cap Cana Marina, RD</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-payote-gold flex-shrink-0" />
                <span>capital@capnexs.com · desk@payote.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-payote-gold flex-shrink-0" />
                <span>+1 (809) 555-NEXA · +1 (829) 700-CAPN</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenScore();
                }}
                className="px-4 py-2 rounded-full border border-payote-gold/40 text-payote-gold text-[11px] uppercase tracking-wider hover:bg-payote-gold/10 transition-colors"
              >
                Precalificación
              </button>
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenBooking();
                }}
                className="px-4 py-2 rounded-full bg-payote-gold text-payote-black font-bold text-[11px] uppercase tracking-wider hover:bg-payote-gold-light transition-colors"
              >
                Reservar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-payote-card/40 border border-payote-border/30 flex items-start gap-3 text-[10px] font-mono text-payote-slate leading-relaxed">
          <Shield className="w-4 h-4 text-payote-gold flex-shrink-0 mt-0.5" />
          <p>{t.footer.regulatoryNotice}</p>
        </div>

        {/* Copyright & Meta */}
        <div className="border-t border-payote-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-payote-slate gap-4">
          <div>
            © {new Date().getFullYear()} CAPNEXS by Payote. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-payote-cream transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-payote-cream transition-colors">Privacidad & Datos</a>
            <a href="#" className="hover:text-payote-cream transition-colors">Cumplimiento SIB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
