import React, { useState, useRef, useEffect } from 'react';
import { AI_AGENTS } from '../../data/financialData';
import { ChatMessage, AiAgent } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import {
  Sparkles,
  Send,
  Brain,
  Home,
  LineChart,
  ShieldCheck,
  TrendingUp,
  User,
  Bot,
  ArrowRight,
  Calendar,
  Layers
} from 'lucide-react';

interface NexaAiDeskProps {
  initialPrompt?: string;
  onOpenBooking: () => void;
  onOpenScore: () => void;
}

export const NexaAiDesk: React.FC<NexaAiDeskProps> = ({
  initialPrompt,
  onOpenBooking,
  onOpenScore,
}) => {
  const { t } = useLanguage();
  const { playTactileClick, playSubtleTick, playSuccessHum } = useSound();

  const [selectedAgent, setSelectedAgent] = useState<AiAgent>(AI_AGENTS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'nexa',
      agentName: 'NEXA Orchestrator',
      content: 'Bienvenido al CAPNEXS Financial Desk. Soy NEXA, tu interfaz de inteligencia financiera respaldada por Payote Group. Puedo analizar tu capacidad crediticia, simular escenarios hipotecarios en USD o DOP, evaluar rentabilidad de activos y coordinar la normativa bancaria dominicana. ¿En qué oportunidad o estructuración deseas trabajar hoy?',
      timestamp: 'Ahora',
      calculationSnippet: [
        { label: 'Tasa Hipotecaria Preferencial', value: '7.75% USD / 9.95% DOP' },
        { label: 'LTV Máximo Financiable', value: 'Hasta 80%' },
        { label: 'Tiempo Promedio de Precalificación', value: '12 Minutos' },
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // If parent passes initial prompt, execute it
  useEffect(() => {
    if (initialPrompt) {
      handleUserSubmit(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-3.5 h-3.5" />;
      case 'LineChart': return <LineChart className="w-3.5 h-3.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'TrendingUp': return <TrendingUp className="w-3.5 h-3.5" />;
      default: return <Brain className="w-3.5 h-3.5" />;
    }
  };

  const handleUserSubmit = (queryToRun?: string) => {
    const text = queryToRun || inputText;
    if (!text.trim()) return;

    playTactileClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: 'Ahora'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Agent intelligent reply generation
    setTimeout(() => {
      let replyContent = '';
      let snippet: ChatMessage['calculationSnippet'] = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('madrid') || lower.includes('cap cana') || lower.includes('extranjero') || lower.includes('no residente')) {
        replyContent = `[Consulta Internacional Orquestada]:\n\n1. **Mortgage Advisor**: Para una villa de US$700,000 con US$200,000 inicial (28.5% equity), el préstamo requerido es US$500,000. Al 7.75% a 20 años en USD, la cuota estimada es de US$4,106/mes. Se requiere un ingreso comprobable mensual de aprox. US$11,800.\n\n2. **Regulation & KYC**: Como residente en el extranjero, los bancos dominicanos solicitan tax returns (IRPF o W-2 de los últimos 2 años), últimos 6 estados de cuenta bancarios y verificación de origen lícito de fondos.\n\n3. **Investment & Structuring**: Se recomienda crear una SRL dominicana a través de Avranza para optimizar la titularidad del activo y ampararse en los incentivos de la Ley CONFOTUR (exención del 3% de impuesto de transferencia y 1% de IPI anual durante 15 años).`;
        snippet = [
          { label: 'Monto Financiado Requerido', value: 'US$ 500,000' },
          { label: 'Cuota Estimada al 7.75%', value: 'US$ 4,106 / mes' },
          { label: 'Ahorro Fiscal CONFOTUR (15 años)', value: 'Aprox. US$ 126,000' }
        ];
      } else if (lower.includes('dti') || lower.includes('capacidad') || lower.includes('deuda')) {
        replyContent = `[Financial Analyst Agent]:\n\nEl ratio Debt-to-Income (DTI) se calcula dividiendo la totalidad de tus obligaciones mensuales (cuota hipotecaria + préstamos vehiculares + mínimos de tarjetas) entre tu ingreso bruto mensual.\n\n• **Límite Bancario Máximo**: 40% a 45% según la entidad.\n• **Rango Óptimo CAPNEXS**: Menor al 35%.\n\nSi tu DTI actual es elevado, nuestra mesa de capital puede estructurar un préstamo conjunto (co-solicitante) o liberar capacidad cancelando pasivos de alto interés rotativo.`;
        snippet = [
          { label: 'DTI Máximo Recomendado', value: '< 35%' },
          { label: 'Margen de Tolerancia Bancaria', value: '43%' },
          { label: 'Incremento de Capacidad x cada $500 saldados', value: '+US$ 60,000 préstamo' }
        ];
      } else if (lower.includes('usd') && lower.includes('dop')) {
        replyContent = `[Currency & Banking Intelligence]:\n\nLa decisión entre financiar en USD o DOP depende de la moneda en que generas tus ingresos y de los flujos del inmueble:\n\n• **Financiar en USD**: Tasa significativamente menor (7.50% - 8.25%). Ideal si percibes ingresos en dólares o si la propiedad se destinará a alquiler vacacional en Cap Cana / Punta Cana (cuyas tarifas se cobran en USD).\n• **Financiar en DOP**: Tasa nominal mayor (11.00% - 12.50%), pero neutraliza el riesgo de depreciación cambiaria si tus salarios o utilidades empresariales están nominados en Pesos Dominicanos.`;
        snippet = [
          { label: 'Tasa Referencial USD', value: '7.75% fija 3-5 años' },
          { label: 'Tasa Referencial DOP', value: '11.45% fija 1-3 años' },
          { label: 'Depreciación Promedio Histórica USD/DOP', value: '~2.8% a 3.5% anual' }
        ];
      } else {
        replyContent = `[${selectedAgent.name}]: He analizado tu solicitud bajo nuestros modelos de crédito y directrices del mercado financiero dominicano.\n\nPara estructurar tu caso con exactitud milimétrica y emitir tu CAPNEXS SCORE™ oficial, podemos proceder con la precalificación en línea o coordinar una sesión estratégica privada con Paola García y nuestro equipo senior de banca privada.`;
        snippet = [
          { label: 'Score Preliminar', value: 'Disponible para simulación' },
          { label: 'Acompañamiento', value: '1 a 1 con Director Senior' }
        ];
      }

      setIsTyping(false);
      playSuccessHum();

      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'agent',
          agentId: selectedAgent.id,
          agentName: selectedAgent.name,
          content: replyContent,
          timestamp: 'Ahora',
          calculationSnippet: snippet
        }
      ]);
    }, 1100);
  };

  return (
    <section id="nexa-desk" className="relative py-24 bg-[#0a0705] border-t border-payote-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-payote-espresso border border-payote-gold/30 text-[10px] font-mono tracking-widest text-payote-gold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nexa.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-payote-cream tracking-tight">
              {t.nexa.title}
            </h2>
            <p className="text-sm sm:text-base text-payote-sandMuted max-w-2xl font-light">
              {t.nexa.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playTactileClick();
                onOpenScore();
              }}
              className="px-4 py-2 rounded-full border border-payote-gold/40 text-payote-gold font-mono text-xs uppercase tracking-wider hover:bg-payote-gold/10 transition-colors"
            >
              Emitir CAPNEXS SCORE™
            </button>
            <button
              onClick={() => {
                playTactileClick();
                onOpenBooking();
              }}
              className="px-4 py-2 rounded-full bg-payote-gold text-payote-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-payote-gold-light transition-colors"
            >
              Hablar con Paola García
            </button>
          </div>
        </div>

        {/* AI Desk Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Agent Selection Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-payote-slate px-1">
              {t.nexa.selectAgent}
            </div>

            <div className="space-y-2">
              {AI_AGENTS.map((agent) => {
                const isSelected = selectedAgent.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => {
                      playSubtleTick();
                      setSelectedAgent(agent);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-payote-espresso/90 border-payote-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                        : 'bg-payote-card/60 border-payote-border/50 hover:border-payote-border hover:bg-payote-card'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected ? 'bg-payote-gold text-payote-black' : 'bg-payote-surface text-payote-gold'
                          }`}
                        >
                          {getAgentIcon(agent.avatarIcon)}
                        </div>
                        <div>
                          <h4 className="text-sm font-serif font-bold text-payote-cream">
                            {agent.name}
                          </h4>
                          <span className="text-[10px] font-mono text-payote-slate block">
                            {agent.title}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-payote-gold animate-ping mt-1" />
                      )}
                    </div>

                    <p className="mt-2.5 text-xs text-payote-sandMuted line-clamp-2">
                      {agent.specialty}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Chat Console (8 cols) */}
          <div className="lg:col-span-8 luxury-card rounded-3xl p-6 flex flex-col h-[640px] border border-payote-border/60">
            {/* Console Header */}
            <div className="flex items-center justify-between pb-4 border-b border-payote-border/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-payote-gold/15 text-payote-gold border border-payote-gold/30">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-payote-cream">
                      {selectedAgent.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-payote-gold/15 text-payote-gold uppercase">
                      Active Agent
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-payote-slate">
                    Orquestación financiera con datos del Banco Central y Superintendencia de Bancos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-payote-emerald">
                <span className="w-2 h-2 rounded-full bg-payote-emerald animate-pulse" />
                <span>ONLINE 24/7</span>
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto py-5 space-y-4 pr-2">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`p-2 rounded-xl flex-shrink-0 ${
                        isUser
                          ? 'bg-payote-surface text-payote-cream'
                          : 'bg-payote-espresso text-payote-gold border border-payote-gold/30'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs font-mono leading-relaxed space-y-3 ${
                        isUser
                          ? 'bg-payote-surface text-payote-cream rounded-tr-none'
                          : 'bg-payote-black/90 text-payote-sand rounded-tl-none border border-payote-border/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-payote-slate pb-1 border-b border-payote-border/20">
                        <span>{msg.agentName || (isUser ? 'Tú (Inversionista)' : 'NEXA Desk')}</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="whitespace-pre-line text-payote-cream font-sans text-xs sm:text-sm">
                        {msg.content}
                      </div>

                      {/* Dynamic Financial Calculation Widget inside chat */}
                      {msg.calculationSnippet && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-payote-espresso/60 border border-payote-gold/20 mt-2 font-mono">
                          {msg.calculationSnippet.map((s, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <span className="text-[9px] uppercase text-payote-slate block">
                                {s.label}
                              </span>
                              <span className="text-xs font-bold text-payote-gold">
                                {s.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-payote-espresso text-payote-gold border border-payote-gold/30 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-payote-black/80 border border-payote-border/50 text-xs font-mono text-payote-slate flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-payote-gold animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-payote-gold animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-payote-gold animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-payote-sandMuted">NEXA está modelando escenarios...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Context Prompts */}
            <div className="py-2 overflow-x-auto scrollbar-none flex gap-2 border-t border-payote-border/30">
              {selectedAgent.presetQueries.map((pq, i) => (
                <button
                  key={i}
                  onClick={() => handleUserSubmit(pq)}
                  className="px-3 py-1.5 rounded-full bg-payote-surface/70 hover:bg-payote-espresso border border-payote-border/50 hover:border-payote-gold/40 text-[11px] font-mono text-payote-sandMuted hover:text-payote-gold whitespace-nowrap transition-colors flex-shrink-0"
                >
                  ✦ {pq}
                </button>
              ))}
            </div>

            {/* Console Input Bar */}
            <div className="pt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserSubmit();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.nexa.askPlaceholder}
                  className="flex-1 px-4 py-3 rounded-xl bg-payote-black border border-payote-border/60 text-xs font-mono text-payote-cream placeholder-payote-slate focus:border-payote-gold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-5 py-3 rounded-xl bg-payote-gold hover:bg-payote-gold-light disabled:opacity-40 text-payote-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>{t.nexa.send}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="text-[10px] font-mono text-payote-slate text-center mt-2">
                {t.nexa.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
