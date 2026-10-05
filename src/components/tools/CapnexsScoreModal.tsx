import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { X, Sparkles, Award, ShieldCheck, Download, Calendar, ArrowRight, RefreshCw } from 'lucide-react';
import { CapnexsScoreData, CapnexsScoreResult } from '../../types';

interface CapnexsScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onAskNexa: (query: string) => void;
}

export const CapnexsScoreModal: React.FC<CapnexsScoreModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playTactileClick, playGoldChime, playSuccessHum } = useSound();

  const [step, setStep] = useState<'form' | 'result'>('form');

  // Form State
  const [formData, setFormData] = useState<CapnexsScoreData>({
    age: 38,
    citizenship: 'Dominicana / USA',
    residenceCountry: 'Estados Unidos',
    employmentType: 'Empresario / Independiente',
    monthlyIncomeUSD: 14500,
    totalLiquidSavingsUSD: 85000,
    monthlyDebtsUSD: 2100,
    targetPropertyUSD: 550000,
    downPaymentUSD: 130000,
  });

  const [result, setResult] = useState<CapnexsScoreResult | null>(null);

  if (!isOpen) return null;

  const calculateScore = () => {
    playGoldChime();

    // Algorithmic evaluation
    const dti = formData.monthlyIncomeUSD > 0 ? (formData.monthlyDebtsUSD / formData.monthlyIncomeUSD) * 100 : 50;
    const ltv = formData.targetPropertyUSD > 0 ? ((formData.targetPropertyUSD - formData.downPaymentUSD) / formData.targetPropertyUSD) * 100 : 80;
    const liquidityRatio = formData.targetPropertyUSD > 0 ? (formData.totalLiquidSavingsUSD / formData.targetPropertyUSD) * 100 : 10;

    // Sub-scores (0-100)
    const capacityScore = Math.min(100, Math.max(30, Math.round((formData.monthlyIncomeUSD / 12000) * 85)));
    const debtScore = Math.min(100, Math.max(25, Math.round(100 - dti * 1.4)));
    const liquidityScore = Math.min(100, Math.max(20, Math.round(liquidityRatio * 4.5)));
    const initialCapScore = Math.min(100, Math.max(20, Math.round((100 - ltv) * 2.2)));
    const riskScore = Math.min(100, Math.max(40, Math.round((debtScore + capacityScore + initialCapScore) / 3)));

    const globalScore = Math.round(
      capacityScore * 0.3 +
      debtScore * 0.25 +
      liquidityScore * 0.15 +
      initialCapScore * 0.2 +
      riskScore * 0.1
    );

    let tier: CapnexsScoreResult['tier'] = 'Strong';
    let grade: CapnexsScoreResult['grade'] = 'A';

    if (globalScore >= 90) {
      tier = 'Exceptional';
      grade = 'A+';
    } else if (globalScore >= 80) {
      tier = 'Strong';
      grade = 'A';
    } else if (globalScore >= 70) {
      tier = 'Favorable';
      grade = 'B+';
    } else if (globalScore >= 60) {
      tier = 'Moderate';
      grade = 'B';
    } else if (globalScore >= 40) {
      tier = 'Limited';
      grade = 'C';
    } else {
      tier = 'High Risk';
      grade = 'D';
    }

    const qualifiedLoan = Math.round(formData.targetPropertyUSD - formData.downPaymentUSD);

    setResult({
      score: globalScore,
      tier,
      grade,
      breakdown: {
        financialCapacity: capacityScore,
        debtLevel: debtScore,
        liquidity: liquidityScore,
        initialCapital: initialCapScore,
        riskProfile: riskScore
      },
      qualifiedLoanEstimateUSD: qualifiedLoan,
      summaryFeedback: `Perfil ${tier.toUpperCase()}: Tu combinación de liquidez y bajo DTI te posiciona favorablemente ante las entidades bancarias aliadas para un crédito de hasta US$ ${qualifiedLoan.toLocaleString()}.`
    });

    setStep('result');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#E2C775', '#F7F4EF', '#8394A6']
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-payote-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-payote-card border border-payote-gold/30 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8 my-8 overflow-hidden">
        {/* Gold Accent Strip */}
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

        {step === 'form' ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PREQUALIFICATION ENGINE · CAPNEXS SCORE™</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
                {t.score.title}
              </h3>
              <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
                {t.score.desc}
              </p>
            </div>

            {/* Input Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.age}</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.citizenship}</label>
                <input
                  type="text"
                  value={formData.citizenship}
                  onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.residence}</label>
                <input
                  type="text"
                  value={formData.residenceCountry}
                  onChange={(e) => setFormData({ ...formData, residenceCountry: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.employment}</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                >
                  <option value="Empresario / Independiente">Empresario / Propietario de Negocio</option>
                  <option value="Empleado en Relación de Dependencia">Empleado en Nómina / Corporativo</option>
                  <option value="Inversionista Privado">Inversionista Privado / Rentista</option>
                  <option value="Profesional Liberal">Profesional Liberal / Consultor</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.monthlyIncome}</label>
                <input
                  type="number"
                  step="500"
                  value={formData.monthlyIncomeUSD}
                  onChange={(e) => setFormData({ ...formData, monthlyIncomeUSD: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.monthlyDebt}</label>
                <input
                  type="number"
                  step="100"
                  value={formData.monthlyDebtsUSD}
                  onChange={(e) => setFormData({ ...formData, monthlyDebtsUSD: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.targetProp}</label>
                <input
                  type="number"
                  step="5000"
                  value={formData.targetPropertyUSD}
                  onChange={(e) => setFormData({ ...formData, targetPropertyUSD: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-payote-slate uppercase text-[10px]">{t.score.initialCap}</label>
                <input
                  type="number"
                  step="5000"
                  value={formData.downPaymentUSD}
                  onChange={(e) => setFormData({ ...formData, downPaymentUSD: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-payote-black/80 border border-payote-border/50 text-payote-cream focus:border-payote-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-payote-black/50 border border-payote-border/40 text-[10px] font-mono text-payote-slate leading-relaxed">
              {t.score.disclaimer}
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateScore}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-[1.02] transition-transform active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>{t.score.calculateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* RESULT VIEW */
          result && (
            <div className="space-y-6">
              {/* Header result */}
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-payote-gold font-semibold">
                  CAPNEXS PROPRIETARY EVALUATION
                </span>
                <h3 className="text-3xl font-serif font-bold text-payote-cream">
                  CAPNEXS SCORE™
                </h3>
              </div>

              {/* Big Score Dial */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-payote-espresso/80 to-payote-black border border-payote-gold/40 text-center relative overflow-hidden">
                <div className="text-6xl sm:text-7xl font-mono font-extrabold text-gold-gradient tracking-tight drop-shadow-[0_0_25px_rgba(201,168,76,0.3)]">
                  {result.score}
                  <span className="text-2xl text-payote-slate font-normal"> / 100</span>
                </div>

                <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-payote-gold/10 border border-payote-gold/30 text-payote-gold font-mono text-xs font-bold tracking-widest uppercase">
                  <span>Rating {result.grade} — {result.tier} Profile</span>
                </div>

                <p className="mt-4 text-xs font-mono text-payote-sand max-w-lg mx-auto leading-relaxed">
                  {result.summaryFeedback}
                </p>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-payote-slate text-[11px] uppercase">
                  <span>{t.score.capacity}</span>
                  <span className="text-payote-cream font-bold">{result.breakdown.financialCapacity} / 100</span>
                </div>
                <div className="w-full h-2 bg-payote-surface rounded-full overflow-hidden">
                  <div className="h-full bg-payote-gold transition-all duration-1000" style={{ width: `${result.breakdown.financialCapacity}%` }} />
                </div>

                <div className="flex justify-between items-center text-payote-slate text-[11px] uppercase">
                  <span>{t.score.debtLvl}</span>
                  <span className="text-payote-cream font-bold">{result.breakdown.debtLevel} / 100</span>
                </div>
                <div className="w-full h-2 bg-payote-surface rounded-full overflow-hidden">
                  <div className="h-full bg-payote-emerald transition-all duration-1000" style={{ width: `${result.breakdown.debtLevel}%` }} />
                </div>

                <div className="flex justify-between items-center text-payote-slate text-[11px] uppercase">
                  <span>{t.score.liqScore}</span>
                  <span className="text-payote-cream font-bold">{result.breakdown.liquidity} / 100</span>
                </div>
                <div className="w-full h-2 bg-payote-surface rounded-full overflow-hidden">
                  <div className="h-full bg-payote-sand transition-all duration-1000" style={{ width: `${result.breakdown.liquidity}%` }} />
                </div>

                <div className="flex justify-between items-center text-payote-slate text-[11px] uppercase">
                  <span>{t.score.initCapScore}</span>
                  <span className="text-payote-cream font-bold">{result.breakdown.initialCapital} / 100</span>
                </div>
                <div className="w-full h-2 bg-payote-surface rounded-full overflow-hidden">
                  <div className="h-full bg-payote-gold-light transition-all duration-1000" style={{ width: `${result.breakdown.initialCapital}%` }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => {
                    playSuccessHum();
                    onClose();
                    onOpenBooking();
                  }}
                  className="py-3 px-4 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold-light transition-colors shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Revisión con Paola García</span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onClose();
                    onAskNexa(`Acabo de obtener un CAPNEXS SCORE™ de ${result.score}/100 (${result.tier} - Rating ${result.grade}). Mis ingresos son US$${formData.monthlyIncomeUSD} y busco financiar US$${result.qualifiedLoanEstimateUSD}. ¿Cuáles son los siguientes pasos recomendados para someter a la banca?`);
                  }}
                  className="py-3 px-4 rounded-xl border border-payote-border hover:border-payote-gold text-payote-cream font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-surface transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-payote-gold" />
                  <span>Consultar Hoja de Ruta con NEXA</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    playTactileClick();
                    setStep('form');
                  }}
                  className="text-xs font-mono text-payote-slate hover:text-payote-gold inline-flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Modificar datos y recalcular</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
