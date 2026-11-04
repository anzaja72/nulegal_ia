import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Loader2,
  ArrowRight,
  FileSearch,
  CalendarDays,
  Gavel,
  AlertTriangle
} from 'lucide-react';
import { HERO } from '../content/audience.ts';
import { ComparisonSection } from './ComparisonSection.tsx';

interface HeroEstadosProps {
  userCredits: number;
  onDeductCredits: (amount: number, reason: string) => boolean;
  onOpenRechargeModal: () => void;
  onGoToQueries: () => void;
  onGoToPricing: () => void;
}

/** Radicado de 23 dígitos: 5 + 2 + 2 + 3 + 4 + 5 + 2. */
const SEGMENTS = [
  { digits: 5, label: 'Ciudad o municipio', example: '11001' },
  { digits: 2, label: 'Corporación', example: '31' },
  { digits: 2, label: 'Especialidad', example: '03' },
  { digits: 3, label: 'Despacho', example: '012' },
  { digits: 4, label: 'Año', example: '2026' },
  { digits: 5, label: 'Consecutivo', example: '00123' },
  { digits: 2, label: 'Instancia', example: '00' }
];

const SAMPLE_MOVED = '11001310301220260012300';
const SAMPLE_QUIET = '05001400300420260045701';

const COST = 3; // créditos por consulta de proceso y estados (tabla de consumo)

const formatRadicado = (v: string) => {
  const parts: string[] = [];
  let i = 0;
  for (const s of SEGMENTS) {
    if (v.length > i) parts.push(v.slice(i, i + s.digits));
    i += s.digits;
  }
  return parts.join(' ');
};

export const HeroEstados: React.FC<HeroEstadosProps> = ({
  userCredits,
  onDeductCredits,
  onOpenRechargeModal,
  onGoToQueries,
  onGoToPricing
}) => {
  const [radicado, setRadicado] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ radicado: string; moved: boolean } | null>(null);

  const valid = radicado.length === 23;

  const handleConsultar = (value?: string) => {
    const r = (value ?? radicado).replace(/\D/g, '');
    if (r.length !== 23 || loading) return;
    if (userCredits < COST) {
      onOpenRechargeModal();
      return;
    }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      if (onDeductCredits(COST, 'Estados y proceso por radicado')) {
        setResult({ radicado: r, moved: Number(r[r.length - 1]) % 2 === 0 });
      }
      setLoading(false);
    }, 1100);
  };

  const useSample = (value: string) => {
    setRadicado(value);
    handleConsultar(value);
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-24 bg-white text-[#1E293B]">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(56, 182, 255, 0.15) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Propuesta de valor */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#F0F9FF] border border-[#38B6FF]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0072b2]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{HERO[4].eyebrow}</span>
              </div>
              <h1 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1E293B] tracking-tight leading-[1.08]">
                {HERO[4].headline}{' '}
                <span className="block text-[#38B6FF]">{HERO[4].headlineAccent}</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{HERO[4].lead}</p>

              <ul className="space-y-3 pt-1 text-sm text-slate-700">
                {[
                  'Estados de los últimos 5 días hábiles: sabes si tu proceso se movió o no',
                  'Si salió en estado: número de estado, fecha y anotación del auto',
                  'Búsqueda por radicado en los procesos publicados en la Rama Judicial',
                  'Estado, despacho, partes y actuaciones recientes en una sola respuesta',
                  'ZDR (Zero Data Retention): los datos de tus clientes no se retienen',
                  'Sin suscripción: pagas 3 créditos por consulta (US$40 = 200 créditos, alcanzan para 66 consultas)'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://chat.legal-ia.co/w/chat/signup"
                  className="bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-sm px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(56,182,255,0.3)] inline-flex items-center gap-2"
                >
                  <span>Consultar desde el chat</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={onGoToPricing}
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold px-5 py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Pay as you go · {COST} créditos por consulta
                </button>
              </div>
            </div>

            {/* Demostración */}
            <div className="lg:col-span-7">
              <div className="bg-[#1E293B] border border-slate-700 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(30,41,59,0.25)] text-white">
                <div className="bg-[#0F172A] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileSearch className="w-5 h-5 text-[#38B6FF]" />
                    <span className="font-space font-bold text-sm">Consulta por radicado</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Demostración con datos de ejemplo</span>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleConsultar();
                    }}
                    className="space-y-3"
                  >
                    <label htmlFor="radicado" className="block text-xs font-semibold text-slate-300">
                      Número de radicado (23 dígitos)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="radicado"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={23}
                        value={radicado}
                        onChange={(e) => setRadicado(e.target.value.replace(/\D/g, '').slice(0, 23))}
                        placeholder="11001310301220260012300"
                        aria-describedby="radicado-ayuda"
                        className="flex-1 min-w-0 bg-[#0F172A] border border-slate-700 focus:border-[#38B6FF] rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 outline-none tracking-wider"
                      />
                      <button
                        type="submit"
                        disabled={!valid || loading}
                        className="bg-[#38B6FF] hover:bg-[#20a4f5] disabled:opacity-40 text-[#1E293B] font-space font-bold text-sm px-4 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        <span className="hidden sm:inline">Consultar</span>
                      </button>
                    </div>
                    <p id="radicado-ayuda" className="text-[11px] text-slate-400">
                      {radicado.length}/23 dígitos · {radicado ? formatRadicado(radicado) : 'Solo números, sin guiones ni espacios.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button type="button" onClick={() => useSample(SAMPLE_MOVED)} className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-[#38B6FF]/40 text-[#38B6FF] hover:bg-[#38B6FF]/10 cursor-pointer">
                        Ejemplo: con movimiento
                      </button>
                      <button type="button" onClick={() => useSample(SAMPLE_QUIET)} className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-700/40 cursor-pointer">
                        Ejemplo: sin movimiento
                      </button>
                    </div>
                  </form>

                  <div aria-live="polite" className="min-h-[220px]">
                    {!result && !loading && (
                      <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center text-slate-400 text-sm border border-dashed border-slate-700 rounded-2xl p-6">
                        <CalendarDays className="w-7 h-7 text-slate-500 mb-2" />
                        Escribe un radicado o prueba un ejemplo para ver la respuesta que recibes.
                      </div>
                    )}
                    {loading && (
                      <div className="min-h-[220px] flex items-center justify-center gap-3 text-sm text-[#38B6FF]">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Revisando estados de los últimos 5 días hábiles y la Rama Judicial...
                      </div>
                    )}
                    {result && (
                      <div className="rounded-2xl border border-slate-700 bg-[#0F172A] p-5 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">Radicado</div>
                            <div className="font-mono text-sm break-all">{formatRadicado(result.radicado)}</div>
                          </div>
                          <span
                            className={`shrink-0 text-[11px] font-bold px-3 py-1 rounded-full ${
                              result.moved
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                                : 'bg-slate-800 text-slate-300 border border-slate-600'
                            }`}
                          >
                            {result.moved ? 'Sí se movió' : 'Sin movimiento'}
                          </span>
                        </div>
                        {result.moved ? (
                          <dl className="grid grid-cols-2 gap-3 text-xs">
                            <div><dt className="text-slate-400">Salió en estado No.</dt><dd className="font-semibold">087 (ejemplo)</dd></div>
                            <div><dt className="text-slate-400">Fecha</dt><dd className="font-semibold">3 de noviembre de 2026</dd></div>
                            <div className="col-span-2"><dt className="text-slate-400">Anotación del auto</dt><dd className="font-semibold">Auto que fija fecha para audiencia inicial</dd></div>
                          </dl>
                        ) : (
                          <p className="text-xs text-slate-300">
                            No aparece en los estados de los últimos 5 días hábiles. Si una fuente no responde, Legal-IA te dice que no pudo consultarla, nunca que no hubo movimiento.
                          </p>
                        )}
                        <dl className="grid grid-cols-2 gap-3 text-xs border-t border-slate-800 pt-3">
                          <div><dt className="text-slate-400">Despacho</dt><dd className="font-semibold">Juzgado 012 (ejemplo)</dd></div>
                          <div><dt className="text-slate-400">Partes</dt><dd className="font-semibold">Demandante y demandado (ejemplo)</dd></div>
                        </dl>
                        <div className="flex items-start gap-2 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded-lg p-2.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          Demostración: los datos son de ejemplo. En el chat recibes la información real del proceso.
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Saldo de la demo: {userCredits} créditos</span>
                    <span>Costo: {COST} créditos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona-estados" className="bg-white text-[#1E293B] pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl tracking-tight text-center">
            Del radicado a saber si tu proceso se movió
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '1', t: 'Dale el radicado al chat', d: 'Escribe el número de 23 dígitos en el chat de Legal-IA. No necesitas entrar a cada despacho ni a cada portal.' },
              { n: '2', t: 'Legal-IA revisa los estados y la Rama Judicial', d: 'Busca el radicado en los estados de los últimos 5 días hábiles y consulta la información del proceso publicada en la Rama Judicial.' },
              { n: '3', t: 'Recibes la respuesta', d: 'Te dice si el proceso se movió o no. Si salió en estado, te da el número de estado, la fecha y la anotación del auto, junto con el despacho, las partes y las actuaciones recientes.' }
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 p-6">
                <div className="w-11 h-11 rounded-2xl bg-[#F0F9FF] border border-[#38B6FF]/30 flex items-center justify-center font-space font-extrabold text-lg text-[#0072b2] mb-4">
                  {s.n}
                </div>
                <h3 className="font-space font-bold text-lg">{s.t}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          {/* Anatomía del radicado */}
          <div className="mt-20">
            <h2 className="font-space font-extrabold text-2xl sm:text-3xl tracking-tight">Cómo se lee un radicado de 23 dígitos</h2>
            <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
              Cada bloque del número identifica una parte del proceso. Este es un ejemplo con cifras ficticias.
            </p>
            <div className="mt-8 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {SEGMENTS.map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#F0F9FF] border border-[#38B6FF]/30 px-4 py-3 text-center">
                    <div className="font-mono font-bold text-xl tracking-widest text-[#1E293B]">{s.example}</div>
                    <div className="text-[11px] text-[#0072b2] font-semibold mt-1">{s.label}</div>
                    <div className="text-[10px] text-slate-500">{s.digits} dígitos</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-start gap-3 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-5 text-sm text-slate-600">
            <Gavel className="w-5 h-5 text-[#38B6FF] shrink-0 mt-0.5" />
            <p>
              Legal-IA consulta la información publicada. Un estado es una notificación pública del despacho, pero la información de los despachos puede tardar en publicarse. Para actuaciones con términos, verifica siempre en el expediente.
              <button type="button" onClick={onGoToQueries} className="ml-1 text-[#0072b2] font-semibold underline underline-offset-4 cursor-pointer">
                Ver las 11 consultas
              </button>
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#1E293B] pt-1 pb-24">
        <ComparisonSection variant={4} theme="dark" />
      </div>
    </>
  );
};
