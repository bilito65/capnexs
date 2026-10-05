import React from 'react';
import { MarketAsset } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { X, TrendingUp, TrendingDown, Sparkles, ArrowRight } from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  onAskNexa: (prompt: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playTactileClick } = useSound();

  if (!asset) return null;

  const isPositive = asset.change24h >= 0;

  // Generate SVG path for sparkline
  const minVal = Math.min(...asset.sparkline);
  const maxVal = Math.max(...asset.sparkline);
  const range = maxVal - minVal || 1;
  const width = 360;
  const height = 120;

  const points = asset.sparkline.map((val, idx) => {
    const x = (idx / (asset.sparkline.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 24) - 12;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-payote-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-payote-card border border-payote-gold/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 sm:p-8 overflow-hidden">
        {/* Glowing edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-payote-gold to-transparent" />

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

        {/* Asset Header */}
        <div className="flex items-start justify-between pr-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-payote-gold font-semibold">
              {asset.category.toUpperCase()} · MARKET INTEL
            </span>
            <h3 className="text-2xl font-serif font-bold text-payote-cream mt-1">
              {asset.name}
            </h3>
            <span className="text-sm font-mono text-payote-slate font-medium">
              {asset.symbol}
            </span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-payote-cream">
              {asset.currency} {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div
              className={`inline-flex items-center text-xs font-mono font-semibold px-2 py-0.5 rounded mt-1 ${
                isPositive ? 'text-payote-emerald bg-payote-emerald/10' : 'text-payote-rose bg-payote-rose/10'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {isPositive ? '+' : ''}{asset.change24h}% (24h)
            </div>
          </div>
        </div>

        {/* Detailed SVG Graph */}
        <div className="mt-6 p-4 rounded-xl bg-payote-black/60 border border-payote-border/40">
          <div className="flex items-center justify-between text-[11px] font-mono text-payote-slate mb-2">
            <span>Mín 24h: {asset.low24h || minVal}</span>
            <span>Tendencia intradía</span>
            <span>Máx 24h: {asset.high24h || maxVal}</span>
          </div>

          <div className="w-full h-32 flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>

        {/* Asset Description & NEXA Strategic Insight */}
        <div className="mt-6 space-y-4">
          <div className="text-xs font-mono text-payote-slate leading-relaxed">
            {asset.description}
          </div>

          <div className="p-4 rounded-xl bg-payote-espresso/60 border border-payote-gold/20 flex gap-3.5 items-start">
            <Sparkles className="w-4 h-4 text-payote-gold flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-payote-gold font-bold">
                NEXA Capital Insight
              </span>
              <p className="text-xs text-payote-sand leading-relaxed">
                {asset.nexaInsight}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Ask NEXA */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="px-4 py-2 rounded-full border border-payote-border text-payote-sandMuted text-xs font-mono uppercase tracking-wider hover:bg-payote-surface"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
              onAskNexa(`¿Cuál es tu análisis estratégico sobre el activo ${asset.symbol} y cómo impacta mis decisiones de inversión y financiamiento en República Dominicana?`);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-payote-gold-light transition-colors shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultar a NEXA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
