import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, User } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { playTactileClick, playSuccessHum } = useSound();

  const [sessionType, setSessionType] = useState<string>(t.booking.types[0]);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('2026-10-15');
  const [budget, setBudget] = useState<string>('US$ 500,000 - 1,000,000');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessHum();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C9A84C', '#E2C775', '#F7F4EF']
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-payote-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-payote-card border border-payote-gold/30 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8 my-8 overflow-hidden">
        {/* Gold Border Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-payote-gold to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-payote-slate hover:text-payote-cream hover:bg-payote-surface rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PRIVATE CLIENT CONCIERGE · PAOLA GARCÍA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
                {t.booking.title}
              </h3>
              <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
                {t.booking.subtitle}
              </p>
            </div>

            {/* Session Type Select */}
            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-payote-slate uppercase text-[10px]">{t.booking.typeLabel}</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
              >
                {t.booking.types.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.booking.fullName}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Alejandro Morales"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.booking.email}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.booking.phone}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (809) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.booking.date}</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Capital / Budget input */}
            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-payote-slate uppercase text-[10px]">{t.booking.budget}</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/60 text-payote-cream focus:border-payote-gold focus:outline-none"
              >
                <option value="US$ 150,000 - 350,000">US$ 150,000 - 350,000</option>
                <option value="US$ 350,000 - 700,000">US$ 350,000 - 700,000</option>
                <option value="US$ 700,000 - 1,500,000">US$ 700,000 - 1,500,000</option>
                <option value="US$ 1,500,000 - 5,000,000+">US$ 1,500,000 - 5,000,000+ (Private Wealth)</option>
              </select>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-[1.01] transition-transform active:scale-95"
            >
              <span>{t.booking.submit}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-payote-emerald/20 text-payote-emerald mx-auto flex items-center justify-center border border-payote-emerald/40 animate-in zoom-in-75">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-payote-cream">
              {t.booking.successTitle}
            </h3>

            <p className="text-xs font-mono text-payote-sand leading-relaxed max-w-md mx-auto">
              {t.booking.successMsg}
            </p>

            <div className="p-4 rounded-2xl bg-payote-black/60 border border-payote-border/40 text-xs font-mono text-payote-sandMuted text-left space-y-1.5 max-w-sm mx-auto">
              <div><strong className="text-payote-cream">Cliente:</strong> {fullName}</div>
              <div><strong className="text-payote-cream">Enfoque:</strong> {sessionType}</div>
              <div><strong className="text-payote-cream">Contacto:</strong> {email}</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-payote-gold-light transition-colors"
            >
              Finalizar y Regresar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
