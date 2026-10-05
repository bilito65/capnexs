import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface MortgageCalculatorProps {
  onPrequalify: () => void;
  onAskNexa: (prompt: string) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  onPrequalify,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick } = useSound();

  const [currency, setCurrency] = useState<'USD' | 'DOP'>('USD');
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.75); // 7.75% USD default
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(9500);

  // Currency multiplier if DOP
  const currSymbol = currency === 'USD' ? 'US$' : 'RD$';

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly mortgage calculation formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const recommendedIncome = monthlyPayment / 0.35; // Recommended max 35% housing ratio
  const dtiImpact = monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0;

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-payote-border/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-payote-border/40">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>TOOL 01 · MORTGAGE ENGINE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
            {t.mortgage.title}
          </h3>
          <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
            {t.mortgage.desc}
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1 p-1 bg-payote-black rounded-full border border-payote-border self-start">
          <button
            onClick={() => {
              playSubtleTick();
              setCurrency('USD');
              setInterestRate(7.75);
              if (propertyPrice > 2000000) setPropertyPrice(450000);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              currency === 'USD'
                ? 'bg-payote-gold text-payote-black font-bold shadow'
                : 'text-payote-sandMuted hover:text-payote-cream'
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => {
              playSubtleTick();
              setCurrency('DOP');
              setInterestRate(11.45);
              if (propertyPrice < 2000000) setPropertyPrice(25000000);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              currency === 'DOP'
                ? 'bg-payote-gold text-payote-black font-bold shadow'
                : 'text-payote-sandMuted hover:text-payote-cream'
            }`}
          >
            DOP (RD$)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.mortgage.propPrice}</span>
              <span className="font-bold text-payote-cream text-sm">
                {currSymbol} {propertyPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={currency === 'USD' ? 80000 : 4000000}
              max={currency === 'USD' ? 3000000 : 150000000}
              step={currency === 'USD' ? 10000 : 500000}
              value={propertyPrice}
              onChange={(e) => {
                playSubtleTick();
                setPropertyPrice(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment Percent */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">
                {t.mortgage.downPayment} ({downPaymentPercent}%)
              </span>
              <span className="font-bold text-payote-gold text-sm">
                {currSymbol} {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => {
                playSubtleTick();
                setDownPaymentPercent(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.mortgage.rate}</span>
                <span className="font-bold text-payote-cream">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={5.0}
                max={16.0}
                step={0.25}
                value={interestRate}
                onChange={(e) => {
                  playSubtleTick();
                  setInterestRate(Number(e.target.value));
                }}
                className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.mortgage.term}</span>
                <span className="font-bold text-payote-cream">{loanTermYears} años</span>
              </div>
              <div className="flex gap-2">
                {[10, 15, 20, 25, 30].map((yrs) => (
                  <button
                    key={yrs}
                    onClick={() => {
                      playSubtleTick();
                      setLoanTermYears(yrs);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      loanTermYears === yrs
                        ? 'bg-payote-gold text-payote-black font-bold'
                        : 'bg-payote-surface text-payote-sandMuted hover:text-payote-cream'
                    }`}
                  >
                    {yrs}y
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Income Input */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.mortgage.income}</span>
              <span className="font-bold text-payote-cream text-sm">
                {currSymbol} {monthlyIncome.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={currency === 'USD' ? 2000 : 100000}
              max={currency === 'USD' ? 40000 : 2500000}
              step={currency === 'USD' ? 500 : 25000}
              value={monthlyIncome}
              onChange={(e) => {
                playSubtleTick();
                setMonthlyIncome(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-payote-black/80 rounded-2xl p-6 border border-payote-border/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-payote-slate">
                {t.mortgage.monthlyPayment}
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-payote-gold tracking-tight mt-1">
                {currSymbol} {Math.round(monthlyPayment).toLocaleString()}
                <span className="text-xs text-payote-sandMuted font-sans font-normal ml-1">/ mes</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-payote-border/30 text-xs font-mono">
              <div>
                <span className="text-payote-slate block text-[10px] uppercase">{t.mortgage.loanAmount}</span>
                <span className="font-bold text-payote-cream">
                  {currSymbol} {Math.round(loanAmount).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-payote-slate block text-[10px] uppercase">{t.mortgage.totalInterest}</span>
                <span className="font-bold text-payote-sand">
                  {currSymbol} {Math.round(totalInterest).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-payote-slate block text-[10px] uppercase">{t.mortgage.minIncome}</span>
                <span className="font-bold text-payote-gold">
                  {currSymbol} {Math.round(recommendedIncome).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-payote-slate block text-[10px] uppercase">{t.mortgage.dtiImpact}</span>
                <span
                  className={`font-bold ${
                    dtiImpact <= 35
                      ? 'text-payote-emerald'
                      : dtiImpact <= 45
                      ? 'text-payote-amber'
                      : 'text-payote-rose'
                  }`}
                >
                  {dtiImpact.toFixed(1)}% {dtiImpact <= 35 ? '✓ Saludable' : '⚠ Ajustado'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Hand-offs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                playTactileClick();
                onPrequalify();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E2C775] via-[#C9A84C] to-[#9E7E2C] text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Solicitar Precalificación Formal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onAskNexa(`Calculé una hipoteca de ${currSymbol} ${loanAmount.toLocaleString()} a ${loanTermYears} años al ${interestRate}%. La cuota mensual es ${currSymbol} ${Math.round(monthlyPayment).toLocaleString()} con ingresos de ${currSymbol} ${monthlyIncome.toLocaleString()}. ¿Cuál es tu recomendación de estructuración bancaria?`);
              }}
              className="w-full py-2.5 rounded-xl border border-payote-gold/30 hover:border-payote-gold text-payote-gold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analizar este cálculo con NEXA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
