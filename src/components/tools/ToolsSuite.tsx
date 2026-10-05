import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { MortgageCalculator } from './MortgageCalculator';
import { DtiAnalyzer } from './DtiAnalyzer';
import { CurrencyIntelligence } from './CurrencyIntelligence';
import { InvestmentAnalyzer } from './InvestmentAnalyzer';
import { FinancialHealthCheck } from './FinancialHealthCheck';
import {
  Calculator,
  PieChart,
  Award,
  DollarSign,
  TrendingUp,
  HeartPulse,
  Wrench
} from 'lucide-react';

interface ToolsSuiteProps {
  onOpenScoreModal: () => void;
  onAskNexa: (query: string) => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({
  onOpenScoreModal,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick } = useSound();

  const [activeTab, setActiveTab] = useState<'mortgage' | 'dti' | 'currency' | 'investment' | 'health'>('mortgage');

  const tools = [
    { id: 'mortgage', label: t.tools.tab1, icon: Calculator, badge: '01' },
    { id: 'dti', label: t.tools.tab2, icon: PieChart, badge: '02' },
    { id: 'score', label: t.tools.tab3, icon: Award, badge: '03', isModalTrigger: true },
    { id: 'currency', label: t.tools.tab4, icon: DollarSign, badge: '04' },
    { id: 'investment', label: t.tools.tab5, icon: TrendingUp, badge: '05' },
    { id: 'health', label: t.tools.tab6, icon: HeartPulse, badge: '06' },
  ];

  return (
    <section id="tools-suite" className="relative py-24 bg-[#080605] border-t border-payote-border/30">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-payote-gold/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <Wrench className="w-3 h-3" />
            <span>{t.tools.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
            {t.tools.title}
          </h2>
          <p className="text-sm sm:text-base text-payote-sandMuted font-light">
            {t.tools.subtitle}
          </p>
        </div>

        {/* Tab Pills Navigator */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {tools.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isModalTrigger) {
                    playTactileClick();
                    onOpenScoreModal();
                  } else {
                    playSubtleTick();
                    setActiveTab(item.id as typeof activeTab);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                  item.isModalTrigger
                    ? 'border-payote-gold/60 text-payote-gold hover:bg-payote-gold/15'
                    : isActive
                    ? 'bg-payote-gold text-payote-black border-payote-gold font-bold shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                    : 'bg-payote-surface/60 text-payote-sandMuted border-payote-border/50 hover:border-payote-gold/40 hover:text-payote-cream'
                }`}
              >
                <span className="text-[10px] opacity-75 font-semibold">{item.badge}</span>
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.isModalTrigger && <span className="text-xs">✦</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tool Render */}
        <div className="w-full">
          {activeTab === 'mortgage' && (
            <MortgageCalculator onPrequalify={onOpenScoreModal} onAskNexa={onAskNexa} />
          )}
          {activeTab === 'dti' && (
            <DtiAnalyzer onPrequalify={onOpenScoreModal} onAskNexa={onAskNexa} />
          )}
          {activeTab === 'currency' && (
            <CurrencyIntelligence onAskNexa={onAskNexa} />
          )}
          {activeTab === 'investment' && (
            <InvestmentAnalyzer onPrequalify={onOpenScoreModal} onAskNexa={onAskNexa} />
          )}
          {activeTab === 'health' && (
            <FinancialHealthCheck onPrequalify={onOpenScoreModal} onAskNexa={onAskNexa} />
          )}
        </div>
      </div>
    </section>
  );
};
