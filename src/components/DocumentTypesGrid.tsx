import React from 'react';
import { DOCS_SECTION, Variant } from '../content/audience.ts';
import {
  FileText,
  ShieldAlert,
  Briefcase,
  Layers,
  FileCheck2,
  FileCode,
  ArrowRight,
  Gavel,
  CheckCircle2
} from 'lucide-react';

interface DocumentTypesGridProps {
  variant: Variant;
  onDraftClick: (docName: string) => void;
}

export const DocumentTypesGrid: React.FC<DocumentTypesGridProps> = ({ variant, onDraftClick }) => {
  const documents = [
    {
      title: 'Acción de Tutela en Salud',
      tag: 'Constitucional · Prioridad 48h',
      description: 'Fundamentada en sentencias T-760/08 y Auto 263. Invocación de medida cautelar provisional de protección médica inmediata.',
      cost: '5 créditos',
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />
    },
    {
      title: 'Derecho de Petición Integral',
      tag: 'CPACA · Art. 23 C.P.',
      description: 'Estructuración formal de términos perentorios ante entidades públicas o privadas con advertencia de queja disciplinaria.',
      cost: '5 créditos',
      icon: <FileText className="w-5 h-5 text-[#0284C7]" />
    },
    {
      title: 'Incidente de Desacato de Tutela',
      tag: 'Sancionatorio · Arresto & Multa',
      description: 'Requerimiento judicial estricto ante incumplimiento de orden de tutela con liquidación de días de retardo.',
      cost: '5 créditos',
      icon: <Gavel className="w-5 h-5 text-amber-600" />
    },
    {
      title: 'Contrato de Servicios SAS Blindado',
      tag: 'Comercial & Societario',
      description: 'Cláusulas penales, arbitraje de Cámara de Comercio, protección de propiedad intelectual y SAGRILAFT cruzado.',
      cost: '5 créditos',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Contestación de Demanda Civil CGP',
      tag: 'Procesal Civil · Art. 96 CGP',
      description: 'Excepciones previas y de mérito, llamamiento en garantía, tacha de falsedad y juramento estimatorio.',
      cost: '5 créditos',
      icon: <FileCode className="w-5 h-5 text-[#0284C7]" />
    },
    {
      title: 'Recurso de Reposición y Apelación',
      tag: 'Contencioso Administrativo',
      description: 'Ataque de actos administrativos sancionatorios con análisis de falsa motivación y desviación de poder.',
      cost: '5 créditos',
      icon: <Layers className="w-5 h-5 text-indigo-600" />
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] text-[#1E293B] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider block mb-2">
              {DOCS_SECTION[variant].kicker}
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-[#1E293B] tracking-tight">
              {DOCS_SECTION[variant].title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md mt-3 md:mt-0 leading-relaxed">
            {DOCS_SECTION[variant].intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-[#38B6FF] hover:shadow-lg hover:shadow-[#38B6FF]/10 rounded-2xl p-7 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#F0F9FF] group-hover:scale-105 transition-transform">
                    {doc.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0284C7] bg-[#F0F9FF] border border-[#38B6FF]/30 px-2.5 py-1 rounded-lg">
                    {doc.cost}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold text-slate-500 tracking-wide uppercase">
                  {doc.tag}
                </span>

                <h3 className="font-space font-bold text-xl text-[#1E293B] mt-1 group-hover:text-[#0284C7] transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Word .DOCX & PDF
                </span>
                <button
                  type="button"
                  onClick={() => onDraftClick(doc.title)}
                  className="text-xs font-bold text-[#0284C7] group-hover:text-[#0369a1] flex items-center gap-1 cursor-pointer font-space"
                >
                  <span>Redactar ahora</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
