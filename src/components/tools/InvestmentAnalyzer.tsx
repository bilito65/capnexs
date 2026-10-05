import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { TrendingUp, ArrowRight, Sparkles, Building, Percent } from 'lucide-react';

interface InvestmentAnalyzerProps {
  onPrequalify: () => void;
  onAskNexa: (prompt: string) => void;
}

export const InvestmentAnalyzer: React.FC<InvestmentAnalyzerProps> = ({
  onPrequalify,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick } = useSound();

  const [purchasePrice, setPurchasePrice] = useState<number>(650000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(7.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState<number>(6200);
  const [occupancyRate, setOccupancyRate] = useState<number>(75); // 75% occupancy
  const [monthlyHOA, setMonthlyHOA] = useState<number>(450);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState<number>(300);

  // Financial calculations
  const downPaymentAmount = (purchasePrice * downPaymentPercent) / 100;
  const loanAmount = purchasePrice - downPaymentAmount;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const effectiveMonthlyIncome = monthlyRentalIncome * (occupancyRate / 100);
  const totalMonthlyExpenses = monthlyMortgage + monthlyHOA + monthlyMaintenance;
  const netMonthlyCashFlow = effectiveMonthlyIncome - totalMonthlyExpenses;
  const annualNetCashFlow = netMonthlyCashFlow * 12;

  // Net Operating Income (NOI before debt service)
  const annualNOI = (effectiveMonthlyIncome - monthlyHOA - monthlyMaintenance) * 12;
  const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;
  const cashOnCash = downPaymentAmount > 0 ? (annualNetCashFlow / downPaymentAmount) * 100 : 0;
  const breakEvenYears = annualNetCashFlow > 0 ? (downPaymentAmount / annualNetCashFlow).toFixed(1) : 'N/A';

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-payote-border/50">
      <div className="pb-8 border-b border-payote-border/40">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
          <Building className="w-3.5 h-3.5" />
          <span>TOOL 05 · ASSET YIELD & ROI ENGINE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
          {t.investment.title}
        </h3>
        <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
          {t.investment.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Purchase Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.investment.price}</span>
              <span className="font-bold text-payote-cream text-sm">US$ {purchasePrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={150000}
              max={3000000}
              step={25000}
              value={purchasePrice}
              onChange={(e) => {
                playSubtleTick();
                setPurchasePrice(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">
                {t.investment.downPayment} ({downPaymentPercent}%)
              </span>
              <span className="font-bold text-payote-gold">US$ {downPaymentAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={15}
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

          {/* Gross Rent & Occupancy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.investment.expectedRent}</span>
                <span className="font-bold text-payote-cream">US$ {monthlyRentalIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={25000}
                step={250}
                value={monthlyRentalIncome}
                onChange={(e) => {
                  playSubtleTick();
                  setMonthlyRentalIncome(Number(e.target.value));
                }}
                className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.investment.occupancy}</span>
                <span className="font-bold text-payote-cream">{occupancyRate}%</span>
              </div>
              <input
                type="range"
                min={40}
                max={95}
                step={5}
                value={occupancyRate}
                onChange={(e) => {
                  playSubtleTick();
                  setOccupancyRate(Number(e.target.value));
                }}
                className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* HOA & Maintenance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.investment.hoaExp}</span>
                <span className="font-bold text-payote-cream">US$ {monthlyHOA.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={monthlyHOA}
                onChange={(e) => {
                  playSubtleTick();
                  setMonthlyHOA(Number(e.target.value));
                }}
                className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-payote-sandMuted uppercase tracking-wider">{t.investment.maintenance}</span>
                <span className="font-bold text-payote-cream">US$ {monthlyMaintenance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={1500}
                step={50}
                value={monthlyMaintenance}
                onChange={(e) => {
                  playSubtleTick();
                  setMonthlyMaintenance(Number(e.target.value));
                }}
                className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-payote-black/80 rounded-2xl p-6 border border-payote-border/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-payote-slate">
                {t.investment.cashFlow}
              </span>
              <div
                className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight mt-1 ${
                  netMonthlyCashFlow >= 0 ? 'text-payote-emerald' : 'text-payote-rose'
                }`}
              >
                {netMonthlyCashFlow >= 0 ? '+' : ''}US$ {Math.round(netMonthlyCashFlow).toLocaleString()}
                <span className="text-xs text-payote-sandMuted font-sans font-normal ml-1">/ mes</span>
              </div>
            </div>

            {/* Yield Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-payote-border/30 text-xs font-mono">
              <div className="p-3 rounded-xl bg-payote-surface/60 border border-payote-border/40">
                <span className="text-payote-slate block text-[9px] uppercase">{t.investment.cashOnCash}</span>
                <span className="text-lg font-bold text-payote-gold">{cashOnCash.toFixed(2)}%</span>
              </div>

              <div className="p-3 rounded-xl bg-payote-surface/60 border border-payote-border/40">
                <span className="text-payote-slate block text-[9px] uppercase">{t.investment.capRate}</span>
                <span className="text-lg font-bold text-payote-cream">{capRate.toFixed(2)}%</span>
              </div>

              <div className="p-3 rounded-xl bg-payote-surface/60 border border-payote-border/40">
                <span className="text-payote-slate block text-[9px] uppercase">Cuota Hipotecaria Mes</span>
                <span className="text-sm font-bold text-payote-sand">US$ {Math.round(monthlyMortgage).toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-payote-surface/60 border border-payote-border/40">
                <span className="text-payote-slate block text-[9px] uppercase">{t.investment.breakEven}</span>
                <span className="text-sm font-bold text-payote-cream">{breakEvenYears} años</span>
              </div>
            </div>

            {/* NEXA AI Auto-Takeaway */}
            <div className="p-3.5 rounded-xl bg-payote-espresso/60 border border-payote-gold/25 flex items-start gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-payote-gold flex-shrink-0 mt-0.5" />
              <p className="text-[11px] font-mono text-payote-sand leading-relaxed">
                NEXA Insight: Con un Cash-on-Cash del {cashOnCash.toFixed(1)}% y Cap Rate del {capRate.toFixed(1)}%, este activo supera la media caribeña (6.2%). La integración con Ocevia para administración vacacional podría elevar la ocupación a un 82%.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onAskNexa(`Analicé una inversión inmobiliaria de US$${purchasePrice.toLocaleString()} con ${downPaymentPercent}% de inicial, renta estimada de US$${monthlyRentalIncome}/mes y ocupación de ${occupancyRate}%. El Cash-on-Cash resultante es ${cashOnCash.toFixed(2)}%. ¿Cómo optimizamos la estructura de financiamiento y fiscalidad a través de Avranza y Capnexs?`);
            }}
            className="w-full py-3 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold-light transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consultar Escenarios de Inversión con NEXA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
