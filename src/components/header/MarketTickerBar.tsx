import React from 'react';
import { MARKET_ASSETS } from '../../data/financialData';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketAsset } from '../../types';

interface MarketTickerBarProps {
  onSelectAsset?: (asset: MarketAsset) => void;
}

export const MarketTickerBar: React.FC<MarketTickerBarProps> = ({ onSelectAsset }) => {
  const { t } = useLanguage();
  const { playSubtleTick } = useSound();

  // Duplicate list to create seamless infinite marquee loop
  const tickerItems = [...MARKET_ASSETS, ...MARKET_ASSETS];

  return (
    <div className="relative w-full bg-[#0a0705] border-b border-payote-border/40 overflow-hidden py-1.5 z-40 select-none text-[11px] font-mono">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Left Pulse indicator */}
        <div className="flex-shrink-0 flex items-center gap-2 pr-4 border-r border-payote-border/50 bg-[#0a0705] z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-payote-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-payote-emerald"></span>
          </span>
          <span className="font-semibold text-payote-gold tracking-widest uppercase text-[10px]">
            {t.ticker.live}
          </span>
        </div>

        {/* Scrolling items */}
        <div className="flex overflow-hidden whitespace-nowrap mask-radial">
          <div className="flex items-center gap-8 animate-ticker hover:[animation-play-state:paused]">
            {tickerItems.map((asset, idx) => {
              const isPositive = asset.change24h >= 0;
              return (
                <button
                  key={`${asset.id}-${idx}`}
                  onClick={() => {
                    playSubtleTick();
                    if (onSelectAsset) onSelectAsset(asset);
                  }}
                  className="flex items-center gap-2 text-payote-cream hover:text-payote-gold transition-colors py-0.5 focus:outline-none"
                >
                  <span className="font-medium text-payote-sandMuted">{asset.symbol}</span>
                  <span className="font-semibold tracking-wider text-payote-cream">
                    {asset.currency} {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`flex items-center text-[10px] font-medium px-1 rounded ${
                      isPositive
                        ? 'text-payote-emerald bg-payote-emerald/10'
                        : 'text-payote-rose bg-payote-rose/10'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    ) : (
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                    )}
                    {isPositive ? '+' : ''}
                    {asset.change24h}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
