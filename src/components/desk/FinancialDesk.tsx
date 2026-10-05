import React, { useState } from 'react';
import { MARKET_ASSETS } from '../../data/financialData';
import { MarketAsset } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { AssetDetailModal } from './AssetDetailModal';
import { TrendingUp, TrendingDown, Sparkles, ChevronRight, BarChart2 } from 'lucide-react';

interface FinancialDeskProps {
  onAskNexa: (query: string) => void;
}

export const FinancialDesk: React.FC<FinancialDeskProps> = ({ onAskNexa }) => {
  const { t } = useLanguage();
  const { playTactileClick, playSubtleTick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAsset, setActiveAsset] = useState<MarketAsset | null>(null);

  const categories = [
    { id: 'all', label: t.desk.all },
    { id: 'currency', label: t.desk.currency },
    { id: 'dominican', label: t.desk.dominican },
    { id: 'market', label: t.desk.market },
    { id: 'commodity', label: t.desk.commodity },
    { id: 'crypto', label: t.desk.crypto },
  ];

  const filteredAssets = selectedCategory === 'all'
    ? MARKET_ASSETS
    : MARKET_ASSETS.filter(a => a.category === selectedCategory);

  return (
    <section id="financial-desk" className="relative py-24 bg-[#0a0705] border-t border-payote-border/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-payote-gold/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-payote-slate/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
              <BarChart2 className="w-3 h-3" />
              <span>{t.desk.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
              {t.desk.title}
            </h2>
            <p className="text-sm sm:text-base text-payote-sandMuted max-w-2xl font-light">
              {t.desk.subtitle}
            </p>
          </div>

          {/* Real-time status badge */}
          <div className="flex items-center gap-2 font-mono text-xs text-payote-slate">
            <span className="w-2 h-2 rounded-full bg-payote-emerald animate-ping" />
            <span>{t.desk.lastUpdate}</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSubtleTick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-payote-gold text-payote-black border-payote-gold font-bold shadow-[0_0_15px_rgba(201,168,76,0.25)]'
                  : 'bg-payote-surface/50 text-payote-sandMuted border-payote-border/50 hover:border-payote-gold/40 hover:text-payote-cream'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const isPositive = asset.change24h >= 0;

            // Mini SVG sparkline points
            const min = Math.min(...asset.sparkline);
            const max = Math.max(...asset.sparkline);
            const range = max - min || 1;
            const pts = asset.sparkline.map((v, i) => {
              const x = (i / (asset.sparkline.length - 1)) * 90;
              const y = 35 - ((v - min) / range) * 28 - 3;
              return `${x},${y}`;
            }).join(' ');

            return (
              <div
                key={asset.id}
                onClick={() => {
                  playTactileClick();
                  setActiveAsset(asset);
                }}
                className="luxury-card rounded-2xl p-5 cursor-pointer group relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-payote-slate">
                      {asset.category}
                    </span>
                    <span
                      className={`inline-flex items-center text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        isPositive ? 'text-payote-emerald bg-payote-emerald/10' : 'text-payote-rose bg-payote-rose/10'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                      {isPositive ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-semibold text-payote-cream mt-2 group-hover:text-payote-gold transition-colors">
                    {asset.symbol}
                  </h3>
                  <div className="text-[11px] text-payote-sandMuted line-clamp-1">
                    {asset.name}
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-payote-slate uppercase">
                      {t.desk.price}
                    </div>
                    <div className="text-lg font-mono font-bold text-payote-cream tracking-tight">
                      {asset.currency} {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Sparkline curve */}
                  <div className="w-24 h-10">
                    <svg viewBox="0 0 90 35" className="w-full h-full overflow-visible">
                      <polyline
                        fill="none"
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={pts}
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover CTA Bar */}
                <div className="mt-4 pt-3 border-t border-payote-border/30 flex items-center justify-between text-[11px] font-mono text-payote-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>NEXA Insight</span>
                  </span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Asset Detail Modal */}
      <AssetDetailModal
        asset={activeAsset}
        onClose={() => setActiveAsset(null)}
        onAskNexa={onAskNexa}
      />
    </section>
  );
};
