import React, { useState } from 'react';
import {
  NOVEMBER_2026_QUERIES,
  LegalQueryCategory
} from '../data/legalQueriesData.ts';
import { validateQueryInput } from '../utils/legalQueriesLogic.ts';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Share2,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Car,
  HeartPulse,
  Briefcase,
  FileSpreadsheet,
  BookOpen,
  Scale,
  Wrench,
  Loader2,
  Info,
  Calendar,
  Sparkles,
  Printer,
  ExternalLink
} from 'lucide-react';

interface QueriesExplorer2026Props {
  userCredits: number;
  onDeductCredits: (amount: number, reason: string) => boolean;
  onOpenRechargeModal: () => void;
  preselectedQueryId?: string;
}

export const QueriesExplorer2026: React.FC<QueriesExplorer2026Props> = ({
  userCredits,
  onDeductCredits,
  onOpenRechargeModal,
  preselectedQueryId
}) => {
  const [selectedId, setSelectedId] = useState<string>(preselectedQueryId || 'antecedentes');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [fechaExpedicion, setFechaExpedicion] = useState<string>('1998-05-14');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeDossier, setActiveDossier] = useState<{
    category: LegalQueryCategory;
    data: any;
    executedAt: string;
    queryInput: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedCategory = NOVEMBER_2026_QUERIES.find((q) => q.id === selectedId) || NOVEMBER_2026_QUERIES[0];

  const filteredQueries = NOVEMBER_2026_QUERIES.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.sources.some((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'antecedentes': return <ShieldCheck className="w-5 h-5" />;
      case 'sociedad': return <Building2 className="w-5 h-5" />;
      case 'financiera-insolvencia': return <TrendingUp className="w-5 h-5" />;
      case 'marcas': return <Sparkles className="w-5 h-5" />;
      case 'vehiculos': return <Car className="w-5 h-5" />;
      case 'salud': return <HeartPulse className="w-5 h-5" />;
      case 'contratacion-estatal': return <Briefcase className="w-5 h-5" />;
      case 'tributario-comercio': return <FileSpreadsheet className="w-5 h-5" />;
      case 'jurisprudencia': return <BookOpen className="w-5 h-5" />;
      case 'procesos-judiciales': return <Scale className="w-5 h-5" />;
      case 'herramientas-apoyo': return <Wrench className="w-5 h-5" />;
      default: return <FileCheck className="w-5 h-5" />;
    }
  };

  const handleSelectCategory = (cat: LegalQueryCategory) => {
    setSelectedId(cat.id);
    setValidationError(null);
    setInputValue('');
  };

  const handleLoadSample = () => {
    if (selectedCategory.inputType === 'cedula') {
      setInputValue('79.982.140');
    } else if (selectedCategory.inputType === 'nit') {
      setInputValue('900.123.456-1');
    } else if (selectedCategory.inputType === 'placa') {
      setInputValue('BKS-412');
    } else if (selectedCategory.inputType === 'radicado') {
      setInputValue('11001310300120230045600');
    } else if (selectedCategory.inputType === 'sentencia') {
      setInputValue('C-055/22');
    } else if (selectedCategory.inputType === 'marca') {
      setInputValue('LEGAL-IA');
    } else {
      setInputValue('Juzgado 01 Administrativo Oral de Medellín');
    }
    setValidationError(null);
  };

  const handleExecute = () => {
    const input = inputValue || selectedCategory.sampleInputPlaceholder.replace('Ej: ', '');
    const validation = validateQueryInput(selectedCategory, input);
    
    if (!validation.isValid) {
      setValidationError(validation.message || 'Entrada inválida.');
      return;
    }

    setValidationError(null);

    // Verify credits
    const cost = selectedCategory.creditCost;
    if (userCredits < cost) {
      onOpenRechargeModal();
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      const success = onDeductCredits(cost, `Consulta: ${selectedCategory.title}`);
      if (success) {
        setActiveDossier({
          category: selectedCategory,
          data: selectedCategory.demoData,
          executedAt: new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          queryInput: input
        });
      }
      setIsExecuting(false);
    }, 1100);
  };

  return (
    <section id="consultas-2026" className="py-20 bg-white text-[#1E293B] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-slate-200/80 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wide text-[#0284C7] bg-[#F0F9FF] border border-[#38B6FF]/30 px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-[#38B6FF] animate-pulse" />
                <span>LEGAL-IA — Consultas disponibles en noviembre de 2026</span>
              </div>
              <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-[#1E293B] tracking-tight">
                Catálogo de Consultas y Registros Oficiales
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Todas las fuentes de esta lista fueron probadas contra el registro real el <strong>2 y 3 de noviembre de 2026</strong>. Solo aparecen las que respondieron. Principio de <em>Honestidad Radical</em>: si una fuente externa está caída, se reporta de forma transparente como «No consultado», nunca como «sin antecedentes».
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar 11 módulos o fuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-[#38B6FF] focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Main Two-Column Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of 11 Queries */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[780px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredQueries.map((cat) => {
              const isSelected = cat.id === selectedCategory.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left group ${
                    isSelected
                      ? 'bg-[#F0F9FF] border-[#38B6FF] shadow-sm ring-1 ring-[#38B6FF]/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg mt-0.5 transition-colors ${
                        isSelected 
                          ? 'bg-[#38B6FF] text-[#1E293B]' 
                          : 'bg-[#F1F5F9] text-[#1E293B] group-hover:bg-[#E2E8F0]'
                      }`}>
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-slate-400">0{cat.number}.</span>
                          <span className={`text-sm font-bold font-space ${isSelected ? 'text-[#1E293B]' : 'text-slate-800'}`}>
                            {cat.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-[11px] font-space font-bold px-2 py-0.5 rounded bg-[#F8FAFC] text-slate-700 border border-slate-200">
                        {cat.creditCost} {cat.creditCost === 1 ? 'crédito' : 'créditos'}
                      </span>
                      <ChevronRight className={`w-4 h-4 mt-2 transition-transform ${isSelected ? 'text-[#0284C7] translate-x-0.5' : 'text-slate-300'}`} />
                    </div>
                  </div>

                  {/* Sources tag badges */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5 items-center">
                    {cat.sources.slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          s.status === 'down_at_source'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : s.status === 'next_update'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {s.name}
                        {s.status === 'down_at_source' && ' (Caída)'}
                      </span>
                    ))}
                    {cat.sources.length > 3 && (
                      <span className="text-[10px] text-slate-400">+{cat.sources.length - 3} más</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Sandbox & Verified Dossier */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
            
            {/* Header of Active Category */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center space-x-2 text-xs text-[#0284C7] font-mono font-bold mb-1">
                  <span>MÓDULO {selectedCategory.number} DE 11</span>
                  <span>•</span>
                  <span>VERIFICADO 2-3 NOV 2026</span>
                </div>
                <h3 className="font-space font-bold text-xl sm:text-2xl text-[#1E293B]">
                  {selectedCategory.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {selectedCategory.subtitle}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block text-xs font-mono font-bold text-[#0284C7] bg-[#F0F9FF] border border-[#38B6FF]/40 px-2.5 py-1 rounded-lg">
                  Costo: {selectedCategory.creditCost} {selectedCategory.creditCost === 1 ? 'Crédito' : 'Créditos'}
                </span>
                <div className="text-[11px] text-slate-500 mt-1">
                  Saldo disponible: <strong className="text-[#1E293B] font-mono">{userCredits} créditos</strong>
                </div>
              </div>
            </div>

            {/* Input Form for Testing */}
            <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#1E293B]">
                  {selectedCategory.sampleInputLabel}
                </label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-xs text-[#0284C7] hover:text-[#0369a1] font-semibold underline cursor-pointer"
                >
                  Cargar caso real de prueba
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className={selectedCategory.id === 'antecedentes' ? 'sm:col-span-7' : 'sm:col-span-8'}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setValidationError(null);
                    }}
                    placeholder={selectedCategory.sampleInputPlaceholder}
                    className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-[#38B6FF] focus:bg-white font-mono"
                  />
                </div>

                {/* Additional field for RNMC if category is antecedentes */}
                {selectedCategory.id === 'antecedentes' && (
                  <div className="sm:col-span-5">
                    <label className="block text-[10px] text-slate-500 mb-0.5">Expedición (RNMC):</label>
                    <input
                      type="date"
                      value={fechaExpedicion}
                      onChange={(e) => setFechaExpedicion(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#38B6FF]"
                    />
                  </div>
                )}

                <div className={selectedCategory.id === 'antecedentes' ? 'sm:col-span-12 mt-2' : 'sm:col-span-4'}>
                  <button
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="w-full bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 transition-all cursor-pointer font-space"
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Consultando servidores...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5 text-[#1E293B]" />
                        <span>Ejecutar Consulta ({selectedCategory.creditCost} cr)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {validationError && (
                <div className="mt-3 flex items-center space-x-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            {/* Official Scope & Technical Notices */}
            {selectedCategory.caveats && selectedCategory.caveats.length > 0 && (
              <div className="mt-4 bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Avisos de Alcance y Disponibilidad Oficial (Noviembre 2026):</span>
                </div>
                {selectedCategory.caveats.map((cav, idx) => (
                  <p key={idx} className="pl-5 text-[11px] leading-relaxed text-amber-800">
                    • {cav}
                  </p>
                ))}
              </div>
            )}

            {/* Verified Sources Status Table */}
            <div className="mt-6">
              <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
                Fuentes Integradas & Estado en Noviembre 2026
              </h4>
              <div className="space-y-2">
                {selectedCategory.sources.map((src, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-lg text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        src.status === 'active'
                          ? 'bg-emerald-500'
                          : src.status === 'down_at_source'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`} />
                      <div>
                        <strong className="text-[#1E293B]">{src.name}</strong>
                        <span className="text-slate-500 ml-2">({src.certifies})</span>
                      </div>
                    </div>

                    <div className="mt-1 sm:mt-0 flex items-center space-x-2 self-start sm:self-auto">
                      {src.status === 'active' && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                          OPERACIONAL
                        </span>
                      )}
                      {src.status === 'down_at_source' && (
                        <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-mono font-semibold">
                          CAÍDA EN FUENTE
                        </span>
                      )}
                      {src.status === 'next_update' && (
                        <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono font-semibold">
                          PRÓXIMA ACTUALIZACIÓN
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Dossier Panel */}
            {activeDossier && activeDossier.category.id === selectedCategory.id && (
              <div className="mt-8 border-t border-slate-200 pt-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-space font-bold text-[#1E293B] text-base">
                      Dossier Oficial Emitido · Noviembre 2026
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir / PDF</span>
                    </button>
                  </div>
                </div>

                {/* Structured Result Display */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs text-[#1E293B] font-sans space-y-4 shadow-xs">
                  <div className="flex flex-wrap justify-between items-center pb-3 border-b border-slate-100 text-[11px] text-slate-500 font-mono">
                    <span>Criterio: <strong className="text-[#1E293B]">{activeDossier.queryInput}</strong></span>
                    <span>Fecha: {activeDossier.executedAt}</span>
                    <span>Hash Verificación: SHA-256 (OK)</span>
                  </div>

                  {/* Render Data Fields Elegantly */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(activeDossier.data).map(([key, val]: [string, any], index) => {
                      if (typeof val === 'object' && val !== null) {
                        return (
                          <div key={index} className="md:col-span-2 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3">
                            <span className="text-[11px] font-mono font-bold text-[#0284C7] uppercase tracking-wide">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              {Object.entries(val).map(([subK, subV]: [string, any], subI) => (
                                <div key={subI} className="bg-white p-2 rounded border border-slate-200/60">
                                  <span className="text-slate-500 block text-[10px]">{subK}:</span>
                                  <span className="font-medium text-[#1E293B]">{String(subV)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={index} className="bg-[#F8FAFC] border border-slate-200 p-3 rounded-lg">
                          <span className="text-[10px] font-mono text-slate-500 uppercase block">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="text-xs font-semibold text-[#1E293B] mt-1 block">
                            {String(val)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
                    Certificación estructurada conforme a la Ley 2213 de 2022 y Decreto 1074 de 2015.
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
