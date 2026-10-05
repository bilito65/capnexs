import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { PieChart, ArrowRight, Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface DtiAnalyzerProps {
  onPrequalify: () => void;
  onAskNexa: (prompt: string) => void;
}

export const DtiAnalyzer: React.FC<DtiAnalyzerProps> = ({ onPrequalify, onAskNexa }) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick } = useSound();

  const [grossIncome, setGrossIncome] = useState<number>(8500);
  const [housingDebt, setHousingDebt] = useState<number>(1400);
  const [autoDebt, setAutoDebt] = useState<number>(450);
  const [cardDebt, setCardDebt] = useState<number>(250);
  const [otherDebt, setOtherDebt] = useState<number>(200);

  const totalMonthlyDebt = housingDebt + autoDebt + cardDebt + otherDebt;
  const dtiPercent = grossIncome > 0 ? (totalMonthlyDebt / grossIncome) * 100 : 0;

  // Status tiers
  let status: 'healthy' | 'moderate' | 'high' | 'critical' = 'healthy';
  let statusLabel = t.dti.healthy;
  let statusColor = 'text-payote-emerald';
  let statusBg = 'bg-payote-emerald/10 border-payote-emerald/30';
  let message = t.dti.healthyMsg;

  if (dtiPercent > 50) {
    status = 'critical';
    statusLabel = t.dti.critical;
    statusColor = 'text-payote-rose';
    statusBg = 'bg-payote-rose/10 border-payote-rose/30';
    message = t.dti.criticalMsg;
  } else if (dtiPercent > 43) {
    status = 'high';
    statusLabel = t.dti.high;
    statusColor = 'text-[#F97316]'; // orange
    statusBg = 'bg-[#F97316]/10 border-[#F97316]/30';
    message = t.dti.highMsg;
  } else if (dtiPercent > 35) {
    status = 'moderate';
    statusLabel = t.dti.moderate;
    statusColor = 'text-payote-amber';
    statusBg = 'bg-payote-amber/10 border-payote-amber/30';
    message = t.dti.moderateMsg;
  }

  // Maximum allowed loan estimate (assuming 43% DTI max threshold)
  const maxAllowableDebt = grossIncome * 0.43;
  const borrowingCapacityDelta = Math.max(0, maxAllowableDebt - totalMonthlyDebt);

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-payote-border/50">
      <div className="pb-8 border-b border-payote-border/40">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
          <PieChart className="w-3.5 h-3.5" />
          <span>TOOL 02 · SOLVENCY ENGINE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
          {t.dti.title}
        </h3>
        <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
          {t.dti.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Gross Monthly Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.dti.grossIncome}</span>
              <span className="font-bold text-payote-gold text-sm">US$ {grossIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={35000}
              step={250}
              value={grossIncome}
              onChange={(e) => {
                playSubtleTick();
                setGrossIncome(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Housing Debt */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.dti.housingDebt}</span>
              <span className="font-bold text-payote-cream">US$ {housingDebt.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={housingDebt}
              onChange={(e) => {
                playSubtleTick();
                setHousingDebt(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Auto Debt */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.dti.autoDebt}</span>
              <span className="font-bold text-payote-cream">US$ {autoDebt.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={4000}
              step={50}
              value={autoDebt}
              onChange={(e) => {
                playSubtleTick();
                setAutoDebt(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Credit Cards Debt */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.dti.cardDebt}</span>
              <span className="font-bold text-payote-cream">US$ {cardDebt.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={3000}
              step={50}
              value={cardDebt}
              onChange={(e) => {
                playSubtleTick();
                setCardDebt(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Other Obligations */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.dti.otherDebt}</span>
              <span className="font-bold text-payote-cream">US$ {otherDebt.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={otherDebt}
              onChange={(e) => {
                playSubtleTick();
                setOtherDebt(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* DTI Gauge Card (5 cols) */}
        <div className="lg:col-span-5 bg-payote-black/80 rounded-2xl p-6 border border-payote-border/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4 text-center">
            {/* Circular Gauge Graphic */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#1F1813"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Dynamic Color Progress Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={
                    status === 'healthy'
                      ? '#10B981'
                      : status === 'moderate'
                      ? '#F59E0B'
                      : status === 'high'
                      ? '#F97316'
                      : '#EF4444'
                  }
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(dtiPercent, 100) / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-payote-slate">
                  RATIO DTI
                </span>
                <span className="text-3xl font-mono font-bold text-payote-cream tracking-tight">
                  {dtiPercent.toFixed(1)}%
                </span>
                <span className="text-[10px] font-mono text-payote-sandMuted">DEUDA / INGRESO</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase ${statusBg} ${statusColor}`}>
              {status === 'healthy' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : status === 'moderate' ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>{statusLabel}</span>
            </div>

            <p className="text-xs text-payote-sandMuted leading-relaxed">
              {message}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-payote-border/30 text-left text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-payote-surface/40">
                <span className="text-payote-slate block text-[9px] uppercase">Deuda Mensual Total</span>
                <span className="font-bold text-payote-cream text-sm">US$ {totalMonthlyDebt.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-payote-surface/40">
                <span className="text-payote-slate block text-[9px] uppercase">Margen Adicional Cuota</span>
                <span className="font-bold text-payote-gold text-sm">US$ {Math.round(borrowingCapacityDelta).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                playTactileClick();
                onPrequalify();
              }}
              className="w-full py-2.5 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold-light transition-colors"
            >
              <span>Precalificar con este DTI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onAskNexa(`Tengo un DTI actual del ${dtiPercent.toFixed(1)}% con ingresos de US$${grossIncome.toLocaleString()} y deudas de US$${totalMonthlyDebt.toLocaleString()}. ¿Cómo puedo optimizar este ratio para obtener la aprobación bancaria en República Dominicana?`);
              }}
              className="w-full py-2 rounded-xl border border-payote-border text-payote-sandMuted hover:text-payote-cream font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-payote-surface transition-colors"
            >
              <Sparkles className="w-3 h-3 text-payote-gold" />
              <span>Ver cómo mejorar mi perfil con NEXA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
