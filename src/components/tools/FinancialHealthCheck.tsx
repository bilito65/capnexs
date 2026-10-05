import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { HeartPulse, CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface FinancialHealthCheckProps {
  onPrequalify: () => void;
  onAskNexa: (prompt: string) => void;
}

export const FinancialHealthCheck: React.FC<FinancialHealthCheckProps> = ({
  onPrequalify,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick, playGoldChime } = useSound();

  const questions = [
    { id: 'q1', text: t.health.q1 },
    { id: 'q2', text: t.health.q2 },
    { id: 'q3', text: t.health.q3 },
    { id: 'q4', text: t.health.q4 },
    { id: 'q5', text: t.health.q5 },
  ];

  const [answers, setAnswers] = useState<Record<string, number>>({
    q1: 2,
    q2: 2,
    q3: 2,
    q4: 1,
    q5: 2,
  });

  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateHealth = () => {
    playGoldChime();
    setShowResult(true);
  };

  const totalPoints = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const maxPoints = questions.length * 2;
  const healthScore = Math.round((totalPoints / maxPoints) * 100);

  let statusLabel = t.health.good;
  let statusColor = 'text-payote-emerald';
  let statusBg = 'bg-payote-emerald/10 border-payote-emerald/30';
  let advice = 'Tu base patrimonial y control de deuda muestran alta resiliencia. Estás en posición óptima para apalancarte en préstamos hipotecarios e inversiones con tasas preferenciales.';

  if (healthScore < 50) {
    statusLabel = t.health.attention;
    statusColor = 'text-payote-rose';
    statusBg = 'bg-payote-rose/10 border-payote-rose/30';
    advice = 'Se recomienda consolidar deudas rotativas y acumular al menos 4 meses de fondo de contingencia antes de asumir compromisos hipotecarios de envergadura.';
  } else if (healthScore < 75) {
    statusLabel = t.health.fair;
    statusColor = 'text-payote-amber';
    statusBg = 'bg-payote-amber/10 border-payote-amber/30';
    advice = 'Salud financiera en rango favorable. Para acceder al escalafón A de precalificación bancaria, diversificar tus ingresos o incrementar el aporte inicial acelerará la aprobación.';
  }

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-payote-border/50">
      <div className="pb-8 border-b border-payote-border/40">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>TOOL 06 · 2-MINUTE DIAGNOSTIC</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
          {t.health.title}
        </h3>
        <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
          {t.health.desc}
        </p>
      </div>

      {!showResult ? (
        <div className="pt-8 space-y-6">
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-payote-black/60 border border-payote-border/40 space-y-2.5">
                <span className="text-xs font-mono text-payote-cream font-medium block">
                  {idx + 1}. {q.text}
                </span>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { label: t.health.yes, val: 2 },
                    { label: t.health.partial, val: 1 },
                    { label: t.health.no, val: 0 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        playSubtleTick();
                        setAnswers({ ...answers, [q.id]: opt.val });
                      }}
                      className={`py-2 px-2 rounded-xl border text-center transition-all ${
                        answers[q.id] === opt.val
                          ? 'border-payote-gold bg-payote-gold/15 text-payote-gold font-bold shadow'
                          : 'border-payote-border/40 text-payote-sandMuted hover:text-payote-cream'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={calculateHealth}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-[1.01] transition-transform"
          >
            <span>{t.health.submit}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="pt-8 space-y-6">
          <div className="p-8 rounded-2xl bg-payote-black/80 border border-payote-gold/30 text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-payote-gold">
              {t.health.scoreTitle}
            </span>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-gold-gradient">
              {healthScore} <span className="text-xl text-payote-slate font-normal">/ 100</span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border text-xs font-mono font-bold tracking-widest uppercase ${statusBg} ${statusColor}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{statusLabel}</span>
            </div>

            <p className="text-xs font-mono text-payote-sand max-w-lg mx-auto leading-relaxed pt-2">
              {advice}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                playTactileClick();
                onPrequalify();
              }}
              className="py-3 px-4 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold-light transition-colors"
            >
              <span>Generar Plan y CAPNEXS SCORE™</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onAskNexa(`Obtuve un Índice de Salud Financiera de ${healthScore}/100 (${statusLabel}). ¿Cuáles son las 3 acciones prioritarias para maximizar mi elegibilidad de financiamiento en República Dominicana?`);
              }}
              className="py-3 px-4 rounded-xl border border-payote-border hover:border-payote-gold text-payote-cream font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-surface transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-payote-gold" />
              <span>Consultar Plan con NEXA</span>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                playTactileClick();
                setShowResult(false);
              }}
              className="text-xs font-mono text-payote-slate hover:text-payote-gold inline-flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
