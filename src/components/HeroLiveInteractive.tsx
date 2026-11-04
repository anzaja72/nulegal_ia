import React, { useState, useRef, useEffect } from 'react';
import { LegalIALogo } from './LegalIALogo.tsx';
import {
  Send,
  Sparkles,
  CheckCircle2,
  Download,
  Search,
  Loader2,
  Coins,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { NOVEMBER_2026_QUERIES } from '../data/legalQueriesData.ts';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  agent?: string;
  text: string;
  badge?: string;
  creditsDeducted?: number;
  sourcesInterrogated?: string[];
  docReady?: {
    title: string;
    pages: number;
    type: string;
  };
  timestamp: string;
}

interface HeroLiveInteractiveProps {
  userCredits: number;
  onDeductCredits: (amount: number, reason: string) => boolean;
  onOpenRechargeModal: () => void;
  onSelectQueryCategory?: (id: string) => void;
  onGoToQueries: () => void;
  onGoToPricing: () => void;
}

export const HeroLiveInteractive: React.FC<HeroLiveInteractiveProps> = ({
  userCredits,
  onDeductCredits,
  onOpenRechargeModal,
  onSelectQueryCategory,
  onGoToQueries,
  onGoToPricing
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      text: 'La EPS Sanitas me negó un medicamento para la diabetes que mi médico me formuló hace dos semanas. Me dicen que no está en el PBS y que debo pagarlo yo. Tengo 64 años.',
      timestamp: '10:42 AM'
    },
    {
      id: '2',
      sender: 'assistant',
      agent: 'Legal-IA · Director de Orquesta',
      badge: 'Investigando normativa · Derecho de petición, Art. 23 C.P. & Sentencia T-760',
      text: 'Entendido. Conforme al Art. 23 de la Constitución Política y la Sentencia T-760/08 de la Corte Constitucional, la EPS no puede negar medicamentos esenciales que comprometan tu vida digna. He redactado tu derecho de petición formal con orden urgente de entrega en 48 horas y advertencia de desacato.',
      docReady: {
        title: 'Derecho de Petición — Medicamentos EPS Sanitas',
        pages: 2,
        type: 'PDF Oficial radicación virtual'
      },
      creditsDeducted: 1,
      sourcesInterrogated: ['Corte Constitucional T-760/08', 'ADRES BDUA', 'Ley 1751 de 2015'],
      timestamp: '10:43 AM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickChips = [
    { label: 'Antecedentes CC 79.982.140', text: 'Consulta antecedentes penales y disciplinarios de la CC 79.982.140', cost: 1 },
    { label: 'RUES NIT 900.123.456-1', text: 'Verificar existencia y representación legal de NIT 900.123.456-1 en RUES', cost: 2 },
    { label: 'RUNT Placa BKS-412', text: 'Consultar estado, SOAT y comparendos de la placa BKS-412 en RUNT/SIMIT', cost: 1 },
    { label: 'Tutela Salud Sanitas', text: 'Redactar acción de tutela por negación de procedimiento quirúrgico urgente', cost: 5 }
  ];

  const handleSend = (customText?: string) => {
    const text = customText || inputVal.trim();
    if (!text) return;

    let cost = 1;
    let badgeText = 'Investigando registro oficial en tiempo real...';
    let doc: any = null;

    if (text.toLowerCase().includes('tutela') || text.toLowerCase().includes('contrato') || text.toLowerCase().includes('redact')) {
      cost = 5;
      badgeText = 'Orquestando 5 agentes · Redacción procesal fundamentada';
      doc = { title: 'Acción de Tutela con Medida Cautelar', pages: 3, type: 'PDF / DOCX Formal' };
    } else if (text.toLowerCase().includes('rues') || text.toLowerCase().includes('nit')) {
      cost = 2;
      badgeText = 'Consultando RUES & Cámaras de Comercio Colombia...';
      doc = { title: 'Dossier Societario RUES Sustituto', pages: 2, type: 'Certificado oficial' };
    } else if (text.toLowerCase().includes('runt') || text.toLowerCase().includes('placa')) {
      cost = 1;
      badgeText = 'Interrogando servidores RUNT & SIMIT...';
      doc = { title: 'Historial Vehicular y Comparendos SIMIT', pages: 1, type: 'Dossier RUNT' };
    } else {
      cost = 1;
      badgeText = 'Interrogando Policía, Procuraduría y RNMC...';
      doc = { title: 'Certificado Antecedentes Cruzados', pages: 1, type: 'Constancia oficial' };
    }

    if (userCredits < cost) {
      onOpenRechargeModal();
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);
    setActiveBadge(badgeText);

    setTimeout(() => {
      const ok = onDeductCredits(cost, `Demo Chat: ${text.slice(0, 25)}...`);
      if (ok) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          agent: 'Legal-IA · Director de Orquesta',
          badge: badgeText,
          text: `Consulta ejecutada con éxito. Se interrogaron las fuentes verificadas de noviembre 2026 y los 5 especialistas estructuraron el documento definitivo listo para radicar.`,
          docReady: doc,
          creditsDeducted: cost,
          sourcesInterrogated: ['Servidor oficial verificado 2026', 'Constitución Política de Colombia', 'SAMAI'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      }
      setIsTyping(false);
      setActiveBadge(null);
    }, 1100);
  };

  const handleDownloadFakeDoc = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-24 bg-[#FFFFFF] text-[#1E293B]">
      
      {/* Subtle Sky Blue Ambient Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(56, 182, 255, 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-[#F0F9FF] border border-[#38B6FF]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0072b2]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Entorno en Vivo · Service as Software</span>
            </div>

            <h1 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1E293B] tracking-tight leading-[1.08]">
              Cuéntale tu caso.{' '}
              <span className="block text-[#38B6FF]">
                Recibe el documento.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Legal-IA te entrevista como un abogado sénior, investiga la normativa colombiana en tiempo real, cruza las 11 fuentes oficiales y redacta el documento con formato forense listo para radicar.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Entrevista guiada en lenguaje natural (sin tecnicismos)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>11 Registros Oficiales colombianos probados (RUES, RUNT, SECOP, ADRES...)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Documentos generados con citas de leyes y sentencias de la relatoría</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Pay As You Go estricto: <strong>$40 USD = 200 créditos</strong> (sin mensualidades)</span>
              </div>
            </div>

            {/* Balance & Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Saldo actual:</span>
                <span className="font-space font-bold text-amber-700 text-base">{userCredits} créditos</span>
              </div>

              <button
                type="button"
                onClick={onOpenRechargeModal}
                className="bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(56,182,255,0.3)] cursor-pointer"
              >
                + Recargar Créditos
              </button>

              <button
                type="button"
                onClick={onGoToQueries}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Search className="w-3.5 h-3.5 text-[#38B6FF]" />
                <span>Ver Catálogo 11 Fuentes</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Studio Terminal */}
          <div className="lg:col-span-7">
            <div className="bg-[#1E293B] border border-slate-700 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(30,41,59,0.25)] flex flex-col h-[630px] text-white">
              
              {/* Studio Header with Official Logo */}
              <div className="bg-[#0F172A] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LegalIALogo size={28} variant="sky" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-space font-bold text-white text-sm">Legal-IA Studio</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2 py-0.2 rounded-full">
                        En línea
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Director de Orquesta + 5 Especialistas en tiempo real
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-slate-400">Jurisdicción Oficial</span>
                  <div className="text-[11px] font-bold text-[#38B6FF]">República de Colombia</div>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#0F172A] to-[#1E293B] custom-scrollbar">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-1 px-1 font-mono">
                      {m.sender === 'user' ? 'Tú' : m.agent} · {m.timestamp}
                    </div>

                    {/* Glowing status badge if assistant */}
                    {m.badge && (
                      <div className="mb-2 bg-[#38B6FF]/10 border border-[#38B6FF]/30 text-[#38B6FF] text-[11px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#38B6FF] animate-spin" />
                        <span>{m.badge}</span>
                      </div>
                    )}

                    <div
                      className={`max-w-[90%] sm:max-w-md rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#38B6FF] text-[#1E293B] font-medium shadow-md'
                          : 'bg-[#0F172A] border border-slate-700/80 text-slate-100 shadow-md'
                      }`}
                    >
                      <p>{m.text}</p>

                      {/* Document Ready Card */}
                      {m.docReady && (
                        <div className="mt-3.5 bg-[#1E293B] border border-[#38B6FF]/40 rounded-xl p-3 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">📄</span>
                              <div>
                                <div className="font-bold text-xs text-white">
                                  {m.docReady.title}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {m.docReady.type} · {m.docReady.pages} páginas
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono font-bold bg-[#38B6FF]/20 text-[#38B6FF] px-2 py-0.5 rounded border border-[#38B6FF]/30">
                              LISTO
                            </span>
                          </div>

                          {/* Skeleton lines representing document preview */}
                          <div className="space-y-1.5 my-2.5 opacity-30">
                            <div className="h-1.5 bg-[#38B6FF] rounded w-3/4" />
                            <div className="h-1.5 bg-slate-400 rounded w-full" />
                            <div className="h-1.5 bg-slate-400 rounded w-5/6" />
                          </div>

                          <button
                            type="button"
                            onClick={handleDownloadFakeDoc}
                            className="w-full mt-2 bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{downloadSuccess ? '¡Documento descargado en PDF!' : 'Descargar documento listo ↓'}</span>
                          </button>
                        </div>
                      )}

                      {/* Sources interrogated */}
                      {m.sourcesInterrogated && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap gap-1 items-center text-[10px] text-slate-400 font-mono">
                          <span>Fuentes:</span>
                          {m.sourcesInterrogated.map((s, i) => (
                            <span key={i} className="bg-[#1E293B] text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/60">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#38B6FF] bg-[#0F172A] border border-[#38B6FF]/30 px-3.5 py-2 rounded-2xl w-fit">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#38B6FF]" />
                    <span>{activeBadge || 'Consultando registro oficial en tiempo real...'}</span>
                  </div>
                )}

                <div ref={chatScrollRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="bg-[#0F172A] px-3.5 py-2 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">Prueba:</span>
                {quickChips.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(c.text)}
                    className="shrink-0 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 hover:border-[#38B6FF]/60 text-slate-200 hover:text-white px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>{c.label}</span>
                    <span className="text-[10px] font-mono text-amber-300">({c.cost}cr)</span>
                  </button>
                ))}
              </div>

              {/* Chat Input Box */}
              <div className="bg-[#0F172A] p-3.5 border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Describe tu caso (ej: tutela, despido, contrato o CC/NIT/Placa)..."
                    className="flex-1 bg-[#1E293B] border border-slate-700 focus:border-[#38B6FF] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    aria-label="Enviar consulta"
                    disabled={!inputVal.trim() || isTyping}
                    className="bg-[#38B6FF] hover:bg-[#20a4f5] disabled:opacity-40 text-[#1E293B] font-bold p-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
