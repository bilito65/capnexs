import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { DollarSign, ArrowRightLeft, Bell, Sparkles, TrendingUp, ShieldAlert } from 'lucide-react';

interface CurrencyIntelligenceProps {
  onAskNexa: (prompt: string) => void;
}

export const CurrencyIntelligence: React.FC<CurrencyIntelligenceProps> = ({ onAskNexa }) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick, playSuccessHum } = useSound();

  const [pair, setPair] = useState<'USD_DOP' | 'EUR_DOP' | 'EUR_USD'>('USD_DOP');
  const [amountUSD, setAmountUSD] = useState<number>(100000);
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertSubmitted, setAlertSubmitted] = useState<boolean>(false);

  // Exchange rates
  const rates = {
    USD_DOP: { interbank: 62.35, standardBank: 61.80, capnexsRate: 62.28, symbol: 'RD$', from: 'USD', to: 'DOP' },
    EUR_DOP: { interbank: 67.85, standardBank: 67.10, capnexsRate: 67.75, symbol: 'RD$', from: 'EUR', to: 'DOP' },
    EUR_USD: { interbank: 1.088, standardBank: 1.076, capnexsRate: 1.086, symbol: '$', from: 'EUR', to: 'USD' },
  };

  const currentPair = rates[pair];
  const marketTotal = amountUSD * currentPair.interbank;
  const standardBankTotal = amountUSD * currentPair.standardBank;
  const capnexsDeskTotal = amountUSD * currentPair.capnexsRate;

  const bankSpreadLoss = marketTotal - standardBankTotal;
  const capnexsSavings = capnexsDeskTotal - standardBankTotal;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    playSuccessHum();
    setAlertSubmitted(true);
    setTimeout(() => {
      setAlertSubmitted(false);
      setAlertEmail('');
    }, 4000);
  };

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-payote-border/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-payote-border/40">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <DollarSign className="w-3.5 h-3.5" />
            <span>TOOL 04 · CURRENCY DESK INTELLIGENCE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-payote-cream mt-1">
            {t.currency.title}
          </h3>
          <p className="text-xs sm:text-sm text-payote-sandMuted mt-1">
            {t.currency.desc}
          </p>
        </div>

        {/* Currency Pair Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-payote-black rounded-full border border-payote-border">
          {(['USD_DOP', 'EUR_DOP', 'EUR_USD'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                playSubtleTick();
                setPair(p);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                pair === p
                  ? 'bg-payote-gold text-payote-black font-bold shadow'
                  : 'text-payote-sandMuted hover:text-payote-cream'
              }`}
            >
              {p.replace('_', ' / ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Converter Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-payote-sandMuted uppercase tracking-wider">{t.currency.amountConvert}</span>
              <span className="font-bold text-payote-cream text-sm">
                {currentPair.from} {amountUSD.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={amountUSD}
              onChange={(e) => {
                playSubtleTick();
                setAmountUSD(Number(e.target.value));
              }}
              className="w-full accent-payote-gold h-1.5 bg-payote-espresso rounded-lg cursor-pointer"
            />
          </div>

          {/* Quick preset amount chips */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[50000, 100000, 250000, 500000, 1000000].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  playSubtleTick();
                  setAmountUSD(amt);
                }}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  amountUSD === amt
                    ? 'border-payote-gold bg-payote-gold/10 text-payote-gold font-bold'
                    : 'border-payote-border/50 text-payote-sandMuted hover:text-payote-cream'
                }`}
              >
                ${(amt / 1000).toLocaleString()}k
              </button>
            ))}
          </div>

          {/* Comparison Matrix Table */}
          <div className="p-4 rounded-2xl bg-payote-black/60 border border-payote-border/50 space-y-3 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-widest text-payote-slate">
              Comparativa de Ejecución de Cambio (Spread Analysis)
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-b border-payote-border/30 text-payote-slate text-[10px] uppercase">
              <span>Canal de Cambio</span>
              <span className="text-center">Tasa Aplicada</span>
              <span className="text-right">Monto Recibido</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1.5 items-center">
              <span className="text-payote-sandMuted">Banca Comercial Estándar</span>
              <span className="text-center text-payote-sandMuted">{currentPair.symbol} {currentPair.standardBank}</span>
              <span className="text-right font-bold text-payote-cream">
                {currentPair.symbol} {Math.round(standardBankTotal).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2.5 items-center bg-payote-gold/10 px-2 rounded-xl border border-payote-gold/30">
              <span className="font-bold text-payote-gold flex items-center gap-1">
                <span>✦ CAPNEXS Private Desk</span>
              </span>
              <span className="text-center font-bold text-payote-gold">{currentPair.symbol} {currentPair.capnexsRate}</span>
              <span className="text-right font-bold text-payote-gold text-sm">
                {currentPair.symbol} {Math.round(capnexsDeskTotal).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1.5 items-center text-payote-slate text-[11px]">
              <span>Tasa Interbancaria Pura</span>
              <span className="text-center">{currentPair.symbol} {currentPair.interbank}</span>
              <span className="text-right">{currentPair.symbol} {Math.round(marketTotal).toLocaleString()}</span>
            </div>
          </div>

          {/* Create Alert mini-form */}
          <form onSubmit={handleCreateAlert} className="flex gap-2">
            <input
              type="email"
              required
              value={alertEmail}
              onChange={(e) => setAlertEmail(e.target.value)}
              placeholder="Recibir alerta si la tasa cruza un umbral..."
              className="flex-1 px-4 py-2 rounded-xl bg-payote-black border border-payote-border/60 text-xs font-mono text-payote-cream focus:border-payote-gold focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-payote-surface border border-payote-gold/30 text-payote-gold text-xs font-mono uppercase tracking-wider hover:bg-payote-gold hover:text-payote-black transition-all flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Crear alerta</span>
            </button>
          </form>
          {alertSubmitted && (
            <div className="text-[11px] font-mono text-payote-emerald flex items-center gap-1.5">
              <span>✓ Alerta de tipo de cambio activada para {currentPair.from}/{currentPair.to}.</span>
            </div>
          )}
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-payote-black/80 rounded-2xl p-6 border border-payote-border/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-payote-slate">
                {t.currency.receivedDOP} (CAPNEXS Desk)
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-payote-gold tracking-tight mt-1">
                {currentPair.symbol} {Math.round(capnexsDeskTotal).toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-payote-emerald/10 border border-payote-emerald/30 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-payote-emerald font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Ahorro Directo de Capital Negociando con CAPNEXS</span>
              </span>
              <div className="text-xl font-mono font-bold text-payote-cream">
                +{currentPair.symbol} {Math.round(capnexsSavings).toLocaleString()}
              </div>
              <p className="text-[10px] font-mono text-payote-sandMuted">
                Diferencial recuperado al evitar spreads abusivos de ventanilla comercial.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-payote-espresso/50 border border-payote-border/40 text-[11px] font-mono text-payote-sandMuted">
              <div className="flex justify-between py-1">
                <span>Spread de ventanilla bancaria:</span>
                <span className="text-payote-rose font-bold">-{currentPair.symbol} {Math.round(bankSpreadLoss).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-payote-border/30">
                <span>Eficiencia cambiaria CAPNEXS:</span>
                <span className="text-payote-gold font-bold">99.88% de paridad interbancaria</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onAskNexa(`¿Por qué conviene estructurar la conversión de divisas de ${currentPair.from} a ${currentPair.to} por medio de CAPNEXS en vez del banco tradicional, y qué impacto fiscal tiene sobre la compra de una propiedad en República Dominicana?`);
            }}
            className="w-full py-3 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-payote-gold-light transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consultar Escenarios de Divisa con NEXA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
