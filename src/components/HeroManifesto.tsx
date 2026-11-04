import React from 'react';
import { LEGAL_AGENTS } from '../data/legalQueriesData.ts';
import { LegalIALogo } from './LegalIALogo.tsx';
import { ComparisonSection } from './ComparisonSection.tsx';
import { HERO } from '../content/audience.ts';
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
            <span>{HERO[2].eyebrow}</span>
          </div>
        </div>

        {/* Manifesto Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-space font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]">
            {HERO[2].headline}{' '}
            <span className="block text-[#38B6FF]">
              {HERO[2].headlineAccent}
            </span>
          </h1>

          <p className="mt-7 text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            {HERO[2].lead}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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

        <ComparisonSection variant={2} theme="dark" />

        {/* Radical Honesty & Colombian Access Quote */}
        <div className="mt-20 max-w-4xl mx-auto bg-[#0F172A]/90 border border-[#38B6FF]/30 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-200 font-light italic leading-relaxed">
            «Una pyme no debería tener que elegir entre firmar sin asesoría o endeudarse en honorarios.
            <strong className="text-[#38B6FF] font-medium not-italic"> Te damos acceso a un servicio jurídico automatizado</strong>, con transparencia radical sobre el estado de las fuentes y sin cobrarte cuando no lo usas.»
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
