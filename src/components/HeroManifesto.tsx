import React from 'react';
import { LEGAL_AGENTS } from '../data/legalQueriesData.ts';
import { LegalIALogo } from './LegalIALogo.tsx';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Sparkles,
  ShieldCheck,
  Building,
  Gavel
} from 'lucide-react';

interface HeroManifestoProps {
  onGoToQueries: () => void;
  onGoToPricing: () => void;
}

export const HeroManifesto: React.FC<HeroManifestoProps> = ({
  onGoToQueries,
  onGoToPricing
}) => {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-24 bg-[#1E293B] text-white">
      
      {/* Subtle Sky Blue Ambient Radial Grid */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 15%, rgba(56, 182, 255, 0.35) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Voice Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#38B6FF]/10 border border-[#38B6FF]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#38B6FF] tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38B6FF]" />
            <span>Manifiesto Service-as-Software · República de Colombia</span>
          </div>
        </div>

        {/* Manifesto Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-space font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]">
            No es un software.{' '}
            <span className="block text-[#38B6FF]">
              Es un servicio jurídico automatizado.
            </span>
          </h1>

          <p className="mt-7 text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            El usuario no aprende derecho. No configura software. No llena formularios de 40 campos.{' '}
            <strong className="text-white font-medium">Solo describe su problema en lenguaje natural.</strong> Los 5 agentes de Legal-IA investigan la normativa colombiana, cruzan 11 registros oficiales y entregan la pieza procesal definitiva.
          </p>
        </div>

        {/* Conductor Node Architecture */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          
          {/* Central Conductor Node */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-gradient-to-r from-[#38B6FF] to-[#20a4f5] text-[#1E293B] p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(56,182,255,0.35)] flex items-center justify-between border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-3xl select-none">🎼</span>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-80">
                    Cerebro Coordinador
                  </div>
                  <h3 className="font-space font-extrabold text-lg sm:text-xl leading-tight">
                    Legal-IA · Director de Orquesta
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#1E293B]/20 px-2.5 py-1 rounded-full text-[#1E293B]">
                En vivo
              </span>
            </div>

            {/* Glowing Connector Line */}
            <div className="w-0.5 h-10 sm:h-12 bg-gradient-to-b from-[#38B6FF] to-[#38B6FF]/30 shadow-[0_0_12px_#38B6FF]" />
          </div>

          {/* 5 Specialist Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {LEGAL_AGENTS.map((agent) => (
              <div
                key={agent.code}
                className="bg-[#0F172A]/90 border-t-2 border-t-[#38B6FF] border-x border-b border-white/10 rounded-xl p-4 transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl select-none">{agent.avatar}</span>
                    <span className="text-[10px] font-mono text-[#38B6FF] bg-[#38B6FF]/10 px-1.5 py-0.5 rounded border border-[#38B6FF]/20">
                      {agent.code}
                    </span>
                  </div>
                  <h4 className="font-space font-bold text-sm text-white leading-snug">
                    {agent.name}
                  </h4>
                  <div className="text-[11px] text-[#38B6FF] font-medium mt-0.5 mb-2">
                    {agent.role}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    {agent.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] font-mono text-slate-400">
                  {agent.tools[0]}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs font-mono text-slate-400 mt-4">
            Cada agente audita el trabajo del anterior y cita las providencias aplicables antes de emitir la pieza procesal.
          </p>
        </div>

        {/* 3-Way Comparison Cards */}
        <div className="mt-24 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-space font-extrabold text-2xl sm:text-3xl text-white">
              ¿Por qué el modelo actual de software legal no funciona?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Comparativa objetiva entre las alternativas existentes en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* Column 1: Abogado Tradicional */}
            <div className="bg-[#0F172A]/80 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Opción 1</span>
                  <XCircle className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="font-space font-bold text-xl text-white">
                  Abogado tradicional
                </h3>
                <div className="text-2xl font-space font-bold text-rose-300 mt-2 mb-4">
                  ~$800.000 COP <span className="text-xs font-sans text-slate-400 font-normal">/ consulta o tutela</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>Tarda de <strong>15 a 30 días hábiles</strong> en radicar un documento básico.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>Cobro por horas o aranceles mínimos inalcanzables para PYMEs y ciudadanos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>Frecuentes errores humanos en cómputo de términos de ejecutoria procesal.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                Lento, manual y prohibitivo.
              </div>
            </div>

            {/* Column 2: IA Genérica */}
            <div className="bg-[#0F172A]/80 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Opción 2</span>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-space font-bold text-xl text-white">
                  IA genérica (ChatGPT, etc.)
                </h3>
                <div className="text-2xl font-space font-bold text-amber-300 mt-2 mb-4">
                  $20 USD/mes <span className="text-xs font-sans text-slate-400 font-normal">/ suscripción pasiva</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">⚠</span>
                    <span><strong>Alucina leyes colombianas</strong> que no existen o inventa sentencias T inexistentes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">⚠</span>
                    <span>Cita artículos derogados por el CGP o CPACA desactualizada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">⚠</span>
                    <span>No puede consultar en tiempo real RUES, SIMIT, RUNT ni notificaciones de Rama Judicial.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                Peligroso para trámites jurídicos formales.
              </div>
            </div>

            {/* Column 3: Legal-IA Highlighted */}
            <div className="bg-[#0F172A] border-2 border-[#38B6FF] rounded-2xl p-6 sm:p-7 shadow-[0_0_40px_rgba(56,182,255,0.25)] relative flex flex-col justify-between scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38B6FF] text-[#1E293B] text-[10px] font-mono font-bold uppercase px-3.5 py-0.5 rounded-full shadow-md">
                Service-as-Software · Recomendado
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#38B6FF] uppercase">Opción 3</span>
                  <CheckCircle2 className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <h3 className="font-space font-extrabold text-xl text-white">
                  Legal-IA Service
                </h3>
                <div className="text-2xl font-space font-bold text-[#38B6FF] mt-2 mb-4">
                  $40 USD = 200 Créditos <span className="text-xs font-sans text-slate-300 font-normal">Pay As You Go</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span><strong>En 5 minutos</strong> tienes el derecho de petición o tutela con PDF oficial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span><strong>11 Registros Oficiales colombianos</strong> probados (RUES, RUNT, SECOP, SAMAI).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span><strong>Tus créditos nunca vencen.</strong> Cero suscripciones mensuales forzadas.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#38B6FF]/30">
                <button
                  type="button"
                  onClick={onGoToPricing}
                  className="w-full bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Ver paquetes Pay As You Go</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Radical Honesty & Colombian Access Quote */}
        <div className="mt-20 max-w-4xl mx-auto bg-[#0F172A]/90 border border-[#38B6FF]/30 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-200 font-light italic leading-relaxed">
            «En Colombia, 7 de cada 10 ciudadanos desisten de exigir sus derechos por el costo y la complejidad de los trámites legales. 
            <strong className="text-[#38B6FF] font-medium not-italic"> Democratizamos la justicia con inteligencia artificial real</strong> y transparencia radical sobre el estado de las fuentes.»
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Scale className="w-3.5 h-3.5 text-[#38B6FF]" />
            <span>Valores de Marca: Radical Honesty · Legal Accessibility · Efficiency</span>
          </div>
        </div>

      </div>
    </section>
  );
};
