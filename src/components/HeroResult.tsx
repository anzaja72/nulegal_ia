import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Scale,
  FileCheck2,
  Clock,
  ShieldCheck,
  Bot,
  Zap,
  Building2,
  ExternalLink
} from 'lucide-react';
import { LEGAL_AGENTS } from '../data/legalQueriesData.ts';
import { ComparisonSection } from './ComparisonSection.tsx';
import { HERO, RETURNING_TERMS_LAWYERS } from '../content/audience.ts';

interface HeroResultProps {
  onGoToQueries: () => void;
  onGoToPricing: () => void;
  onSelectSample: (queryId: string) => void;
}

export const HeroResult: React.FC<HeroResultProps> = ({
  onGoToQueries,
  onGoToPricing,
  onSelectSample
}) => {
  const docTypes = RETURNING_TERMS_LAWYERS;

  const [termIndex, setTermIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTermIndex((prev) => (prev + 1) % docTypes.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [docTypes.length]);

  return (
    <div className="relative bg-[#FFFFFF] text-[#1E293B] overflow-hidden pt-28 sm:pt-36 pb-20">
      
      {/* Subtle Sky-Blue Serenity Ambient Backdrop */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[620px] pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(56, 182, 255, 0.12) 0%, rgba(240, 249, 255, 0.4) 45%, transparent 75%)'
        }}
      />

      {/* Main Hero Container */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Value Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#38B6FF]/30 text-[#0072b2] text-xs font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#38B6FF] animate-pulse" />
          <span>{HERO[1].eyebrow}</span>
        </div>

        {/* Brand Headline from Page 2 of Brand Book */}
        <h1 className="font-space font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1E293B] leading-[1.08] max-w-4xl mx-auto">
          {HERO[1].headline}{' '}
          <span className="block text-[#1E293B]">
            {HERO[1].headlineAccent}
          </span>
        </h1>

        {/* Dynamic Rotating Document Word */}
        <div className="mt-5 sm:mt-7 text-2xl sm:text-4xl font-space font-bold text-[#1E293B] flex items-center justify-center flex-wrap gap-2.5">
          <span className="text-slate-500 font-normal">Recibe</span>
          <span
            key={termIndex}
            className="animate-word-flip inline-block text-[#38B6FF] relative underline decoration-[#38B6FF]/40 decoration-wavy decoration-2 underline-offset-8"
          >
            {docTypes[termIndex]}
          </span>
          <span className="text-slate-500 font-normal">listo para revisar y radicar.</span>
        </div>

        {/* Brand Overview Paragraph */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-sans font-normal">
          {HERO[1].lead}
        </p>

        {/* Primary CTAs with Impeccable Craft */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGoToQueries}
            className="w-full sm:w-auto bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-[0_4px_16px_rgba(56,182,255,0.35)] hover:shadow-[0_8px_24px_rgba(56,182,255,0.45)] cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#1E293B]" />
            <span>Explorar las 11 Fuentes Oficiales</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onGoToPricing}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 font-space font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Ver Tarifas Pay As You Go</span>
            <span className="text-xs font-mono font-bold text-[#0072b2] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#38B6FF]/30">
              $40 = 200 cr
            </span>
          </button>
        </div>

        {/* Micro-guarantees */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#38B6FF]" />
            <span>Probado 2 y 3 de nov 2026 contra registros reales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#38B6FF]" />
            <span>100% Pay As You Go (Créditos sin vencimiento)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#38B6FF]" />
            <span>Transparencia radical ante servidores caídos</span>
          </div>
        </div>

      </section>

      <ComparisonSection variant={1} theme="light" />

      {/* Section: Tu Documento en 3 Pasos */}
      <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-[#1E293B]">
            Tu flujo de trabajo en 3 pasos
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            De los hechos de tu cliente a una pieza procesal lista para tu revisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#38B6FF]/30 flex items-center justify-center font-space font-extrabold text-xl text-[#0072b2] mb-5">
              1
            </div>
            <h3 className="font-space font-bold text-lg text-[#1E293B]">
              Describe tu caso
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Cuéntale a Legal-IA los hechos del caso. La IA te hace las preguntas clave de contexto, como lo haría un abogado sénior de tu equipo.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#38B6FF]/30 flex items-center justify-center font-space font-extrabold text-xl text-[#0072b2] mb-5">
              2
            </div>
            <h3 className="font-space font-bold text-lg text-[#1E293B]">
              La IA investiga y cruza
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Interroga los servidores de noviembre 2026 (RUES, RUNT, SECOP, SAMAI), identifica el medio de control idóneo y cita la jurisprudencia aplicable.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#38B6FF]/30 flex items-center justify-center font-space font-extrabold text-xl text-[#0072b2] mb-5">
              3
            </div>
            <h3 className="font-space font-bold text-lg text-[#1E293B]">
              Recibe tu documento
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Descargas la tutela, el derecho de petición o el contrato en PDF y formato editable, con hechos, pretensiones y pruebas listos para tu revisión.
            </p>
          </div>

        </div>

      </section>

      {/* Section: Director de Orquesta & 5 Agentes */}
      <section className="mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0072b2] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#38B6FF]/30">
            Arquitectura Cognitiva
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-[#1E293B] mt-3">
            El Director de Orquesta y sus {LEGAL_AGENTS.length} Agentes Especialistas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No es un solo modelo adivinando. Es una orquesta coordinada donde cada agente audita y refina la respuesta.
          </p>
        </div>

        {/* Central Conductor Node */}
        <div className="max-w-xl mx-auto mb-8 bg-[#F0F9FF] border-2 border-[#38B6FF] rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl select-none">🎼</span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0072b2]">
                Cerebro Coordinador Autónomo
              </span>
              <h3 className="font-space font-bold text-xl text-[#1E293B]">
                Legal-IA · Director de Orquesta
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Descompone el caso, enruta a los especialistas y sintetiza la pieza procesal.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#0072b2] bg-white border border-[#38B6FF]/30 px-3 py-1 rounded-full shadow-2xs">
            En vivo
          </span>
        </div>

        {/* 5 Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEGAL_AGENTS.map((agent) => (
            <div
              key={agent.code}
              className="bg-white border border-slate-200/90 rounded-xl p-4.5 flex flex-col justify-between transition-all hover:border-[#38B6FF] hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl select-none">{agent.avatar}</span>
                  <span className="text-[10px] font-mono font-bold text-[#0072b2] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#38B6FF]/30">
                    {agent.code}
                  </span>
                </div>
                <h4 className="font-space font-bold text-base text-[#1E293B]">
                  {agent.name}
                </h4>
                <div className="text-[11px] text-[#0072b2] font-semibold mt-0.5 mb-2">
                  {agent.role}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {agent.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[10px] font-mono text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]" />
                <span>{agent.tools[0]}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Section: Prominent "No compras un software. Compras un resultado." */}
      <section className="mt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E293B] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle, #38B6FF 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#38B6FF]">
                Filosofía Service-as-Software
              </span>
              <h3 className="font-space font-extrabold text-3xl sm:text-4xl text-white mt-2 leading-tight">
                No compras un software.{' '}
                <span className="block text-[#38B6FF]">
                  Compras un resultado.
                </span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-light">
                No queremos que pases horas aprendiendo una plataforma ni configurando plantillas. Tú nos cuentas lo sucedido y nosotros te entregamos el documento final fundamentado en la ley colombiana.
              </p>
            </div>

            <button
              type="button"
              onClick={onGoToQueries}
              className="shrink-0 bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-[#38B6FF]/25 cursor-pointer flex items-center gap-2"
            >
              <span>Ver las 11 Consultas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
