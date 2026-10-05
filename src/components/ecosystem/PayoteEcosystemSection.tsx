import React, { useState } from 'react';
import { EcosystemOrbit3D } from '../3d/EcosystemOrbit3D';
import { ECOSYSTEM_NODES } from '../../data/financialData';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { Network, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PayoteEcosystemSectionProps {
  onOpenBooking: () => void;
  onAskNexa: (query: string) => void;
}

export const PayoteEcosystemSection: React.FC<PayoteEcosystemSectionProps> = ({
  onOpenBooking,
  onAskNexa,
}) => {
  const { t } = useLanguage();
  const { playSubtleTick, playTactileClick } = useSound();

  const [activeNodeId, setActiveNodeId] = useState<string>('capnexs');

  const selectedNode = ECOSYSTEM_NODES.find(n => n.id === activeNodeId) || ECOSYSTEM_NODES[1];

  return (
    <section id="ecosystem" className="relative py-24 bg-[#0a0705] border-t border-payote-border/30 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-payote-gold/5 blur-[220px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
            <Network className="w-3.5 h-3.5" />
            <span>{t.ecosystem.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
            {t.ecosystem.title}
          </h2>
          <p className="text-sm sm:text-base text-payote-sandMuted font-light">
            {t.ecosystem.subtitle}
          </p>
        </div>

        {/* 3D Orbit Visualization with Interactive Detail overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D WebGL Canvas (7 cols) */}
          <div className="lg:col-span-7 luxury-card rounded-3xl p-4 sm:p-6 border border-payote-gold/25 relative overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-4 py-2 border-b border-payote-border/30 text-[10px] font-mono text-payote-slate">
              <span className="flex items-center gap-1.5 text-payote-gold">
                <Sparkles className="w-3 h-3" />
                <span>INTERACTIVE 3D CAPITAL ORBIT</span>
              </span>
              <span>Gira con el cursor · Haz clic en cualquier nodo</span>
            </div>

            <EcosystemOrbit3D
              activeNodeId={activeNodeId}
              onSelectNode={(id) => {
                playTactileClick();
                setActiveNodeId(id);
              }}
            />

            {/* Step Timeline Chips below 3D scene */}
            <div className="w-full flex items-center justify-center gap-2 flex-wrap pt-3 border-t border-payote-border/30">
              {ECOSYSTEM_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    playSubtleTick();
                    setActiveNodeId(node.id);
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all border ${
                    activeNodeId === node.id
                      ? 'bg-payote-gold text-payote-black font-bold border-payote-gold shadow-[0_0_12px_rgba(201,168,76,0.3)]'
                      : 'bg-payote-black/60 text-payote-sandMuted border-payote-border/40 hover:text-payote-cream'
                  }`}
                >
                  {node.step} {node.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Detail Card (5 cols) */}
          <div className="lg:col-span-5 luxury-card rounded-3xl p-8 border border-payote-gold/30 space-y-6 flex flex-col justify-between min-h-[460px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-payote-border/40 pb-4">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-payote-gold font-bold">
                  ETAPA {selectedNode.step} DEL ECOSISTEMA
                </span>
                <span className="text-[10px] font-mono text-payote-slate">
                  PAYOTE SYNERGY
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold text-payote-cream">
                  {selectedNode.name}
                </h3>
                <span className="text-sm font-mono text-payote-gold font-medium mt-1 block">
                  {selectedNode.subtitle}
                </span>
              </div>

              <p className="text-sm text-payote-sand leading-relaxed">
                {selectedNode.tagline}
              </p>

              {/* Case Study Example */}
              <div className="p-4 rounded-2xl bg-payote-black/60 border border-payote-border/40 space-y-2 text-xs font-mono">
                <span className="text-[10px] uppercase text-payote-slate tracking-wider block font-semibold">
                  Ejemplo de Integración Real:
                </span>
                <p className="text-payote-sandMuted leading-relaxed">
                  {selectedNode.id === 'dream' && 'DREAM selecciona una villa premium en Cap Cana o Las Terrenas evaluada para alta plusvalía.'}
                  {selectedNode.id === 'capnexs' && 'CAPNEXS estructura el financiamiento al 7.75% USD y precalifica al inversionista en menos de 48 horas.'}
                  {selectedNode.id === 'avranza' && 'AVRANZA constituye la sociedad comercial y optimiza las exenciones de la Ley CONFOTUR.'}
                  {selectedNode.id === 'alenza' && 'ALENZA conduce la debida diligencia de títulos y redacción de contratos de compraventa blindados.'}
                  {selectedNode.id === 'acougos' && 'ACOGUS equipa la residencia con acabados arquitectónicos de ultra-lujo listos para operar.'}
                  {selectedNode.id === 'ocevia' && 'OCEVIA asume la gestión de reservas, mantenimiento y administración de dividendos.'}
                  {selectedNode.id === 'payote-luxury' && 'PAYOTE LUXURY eleva el ADR y la ocupación mediante experiencias exclusivas y concierge.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-payote-border/40 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenBooking();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-payote-gold-light transition-colors shadow-lg"
              >
                <span>Estructurar mi Inversión</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  playTactileClick();
                  onAskNexa(`¿Cómo se coordina CAPNEXS con ${selectedNode.name} (${selectedNode.subtitle}) para un cliente que adquiere una villa de lujo en República Dominicana?`);
                }}
                className="py-3 px-4 rounded-xl border border-payote-border hover:border-payote-gold text-payote-sandMuted hover:text-payote-cream font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-payote-surface transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-payote-gold" />
                <span>Consultar NEXA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
