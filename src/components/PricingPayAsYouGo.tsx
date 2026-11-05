import React, { useState } from 'react';
import { PAY_AS_YOU_GO_TIERS, QUERY_COST_GUIDE } from '../data/legalQueriesData.ts';
import {
  Check,
  Sparkles,
  Calculator,
  Coins,
  ArrowRight,
  Info,
  Scale,
  Gift,
  ShieldCheck
} from 'lucide-react';

interface PricingPayAsYouGoProps {
  onPurchaseTier: (credits: number, tierName: string, priceUSD: number) => void;
}

const CORPORATE_SALES_URL = 'https://wa.me/573012303249?text=Interesado%20en%20el%20plan%20Corporativo';
const FREE_URL = 'https://free.legal-ia.co/';
const CHAT_URL = 'https://chat.legal-ia.co/';

export const PricingPayAsYouGo: React.FC<PricingPayAsYouGoProps> = ({ onPurchaseTier }) => {
  // Calculator state
  const [antecedentesCount, setAntecedentesCount] = useState(15);
  const [ruesCount, setRuesCount] = useState(10);
  const [runtCount, setRuntCount] = useState(10);
  const [procesosCount, setProcesosCount] = useState(5);
  const [tutelasCount, setTutelasCount] = useState(2);

  // Calculate required credits
  const totalCreditsNeeded =
    antecedentesCount * 1 +
    runtCount * 1 +
    ruesCount * 2 +
    procesosCount * 3 +
    tutelasCount * 5;

  // Find ideal tier
  const recommendedTier =
    PAY_AS_YOU_GO_TIERS.find((t) => t.credits >= totalCreditsNeeded) ||
    PAY_AS_YOU_GO_TIERS[PAY_AS_YOU_GO_TIERS.length - 1];

  return (
    <section id="pricing" className="py-24 bg-[#0F172A] text-white relative overflow-hidden border-t border-slate-800">
      {/* Background ambient pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(56, 182, 255, 0.20) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#38b6ff]/10 border border-[#38b6ff]/30 px-4 py-1.5 rounded-full text-xs text-[#38b6ff] font-mono tracking-wider uppercase mb-4">
            <Coins className="w-3.5 h-3.5 text-[#38b6ff]" />
            <span>Pay As You Go · Sin suscripciones en los packs de créditos</span>
          </div>

          <h2 className="font-space font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Paga solo por lo que consultas.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#70c9ff] via-[#38b6ff] to-white">
              Tus créditos nunca vencen.
            </span>
          </h2>

          <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Sin cargos recurrentes mensuales, sin tarjetas atadas a suscripción ni vencimientos sorpresivos. Recargas un paquete de créditos según la necesidad de tu despacho y los consumes al ritmo de tus casos.
          </p>
        </div>

        {/* 4 Pricing Cards Grid (Exact 22px border radius & 32px padding) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 0: Plan Gratis */}
          <div className="bg-[#1E293B]/80 border border-slate-700/80 rounded-[22px] p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-600">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-space font-bold text-xl text-white">
                  Plan Gratis
                </h3>
                <Gift className="w-5 h-5 text-[#38b6ff]" />
              </div>
              <p className="text-xs text-slate-400 min-h-[36px]">
                Hasta 10 documentos · análisis de PDF e imágenes · comunidad
              </p>
              <div className="mt-6 pb-6 border-b border-slate-700">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold font-space text-white">$0</span>
                  <span className="text-xs font-mono text-slate-400">USD</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>10 derechos de petición o 10 consultas jurídicas básicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>10 documentos mensuales</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Solo derechos de petición, tutelas o acciones constitucionales del ciudadano</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Sin ingresar tarjeta de crédito</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4">
              <a
                href={FREE_URL}
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer font-space"
              >
                Comenzar gratis
              </a>
              <div className="text-[10px] text-center text-slate-500 mt-2 font-mono">
                10 documentos al mes
              </div>
            </div>
          </div>

          {/* Card 1: Por Uso / Starter ($25 USD = 100 créditos) */}
          <div className="bg-[#1E293B]/80 border border-slate-700/80 rounded-[22px] p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-600">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-space font-bold text-xl text-white">
                  Por Uso
                </h3>
              </div>
              <p className="text-xs text-slate-400 min-h-[36px]">
                Abogados independientes y consultas jurídicas puntuales
              </p>

              <div className="mt-6 pb-6 border-b border-slate-700">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold font-space text-white">$25</span>
                  <span className="text-xs font-mono text-slate-400">USD</span>
                  <span className="text-[11px] text-slate-400 ml-1">/ Pago único</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-space font-bold text-white">100 Créditos</span>
                  <span className="text-slate-400 text-[11px] font-mono">$0.25 USD / cr</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>100 créditos sin fecha de expiración</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Antecedentes y RUNT a 1 crédito c/u</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Dossiers RUES de sociedades (2 créditos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Descarga de certificados en PDF oficial</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={CHAT_URL}
                className="block text-center w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer font-space"
              >
                Comprar 100 créditos ($25)
              </a>
              <div className="text-[10px] text-center text-slate-500 mt-2 font-mono">
                Pay As You Go · Sin vencimiento
              </div>
            </div>
          </div>

          {/* Card 2: Profesional ★ Recomendado ($40 USD = 200 créditos, pago por uso) HIGHLIGHTED */}
          <div className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-2 border-[#38b6ff] rounded-[22px] p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(56,182,255,0.25)] scale-[1.03] z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#38b6ff] text-[#1E293B] font-extrabold text-[11px] px-4 py-1 rounded-full shadow-md uppercase tracking-wider font-mono">
              ★ RECOMENDADO
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-space font-extrabold text-2xl text-white">
                  Profesional
                </h3>
                <span className="text-xl">⚖️</span>
              </div>
              <p className="text-xs text-[#70c9ff] min-h-[36px]">
                Litigantes, consultores y despachos con flujo constante de casos
              </p>

              <div className="mt-6 pb-6 border-b border-[#38b6ff]/30">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold font-space text-white">$40</span>
                  <span className="text-xs font-mono text-[#38b6ff]">USD</span>
                  <span className="text-[11px] text-[#38b6ff] ml-1 font-semibold">/ Pago único</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-space font-extrabold text-[#38b6ff] text-base">
                    200 Créditos
                  </span>
                  <span className="text-slate-300 text-[11px] font-mono">
                    $0.20 USD / crédito
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-100">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span><strong>200 créditos que nunca caducan</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Estados y procesos por radicado: 3 créditos por consulta</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Dossiers de sociedades RUES + Supersociedades</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Marcas SIC y SECOP I/II (94 datos por contrato)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Redacción de tutelas, peticiones y contratos</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={CHAT_URL}
                className="w-full bg-[#38b6ff] hover:bg-[#20a4f5] text-[#1E293B] font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 font-space"
              >
                <span>Comprar 200 créditos ($40 USD)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[10px] text-center text-[#38b6ff] mt-2 font-mono font-bold">
                100% Pay As You Go · Sin renovación automática
              </div>
            </div>
          </div>

          {/* Card 3: Corporativo (setup único + mensualidad, modelo exclusivo) */}
          <div className="bg-[#1E293B]/80 border border-slate-700/80 rounded-[22px] p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-600">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-space font-bold text-xl text-white">
                  Corporativo
                </h3>
                <ShieldCheck className="w-5 h-5 text-[#38b6ff]" />
              </div>
              <p className="text-xs text-slate-400 min-h-[36px]">
                Empresas y firmas que necesitan un entorno exclusivo
              </p>
              <div className="mt-6 pb-6 border-b border-slate-700">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold font-space text-white">$180</span>
                  <span className="text-xs font-mono text-slate-400">USD</span>
                  <span className="text-[11px] text-slate-400 ml-1">/ mes</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-space font-bold text-white">1,000 Créditos / mes</span>
                  <span className="text-slate-400 text-[11px] font-mono">$0.18 USD / cr</span>
                </div>
                <div className="mt-3 text-[11px] text-[#38b6ff] font-semibold">
                  + Setup único de US$500
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Setup: cargue de la información de tu empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Alojamiento de modelo exclusivo para tu empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Acceso solo desde el dominio empresarial</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>Acceso multi-usuario y módulo catastral IGAC</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4">
              <a
                href={CORPORATE_SALES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer font-space"
              >
                Hablar con ventas
              </a>
              <div className="text-[10px] text-center text-slate-500 mt-2 font-mono">
                US$500 de setup + US$180 al mes
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Credit Consumption Calculator */}
        <div className="mt-20 bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-slate-700 pb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#38b6ff] mb-1">
                <Calculator className="w-4 h-4" />
                <span>CALCULADORA DE CONSUMO ESTIMADO</span>
              </div>
              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white">
                ¿Cuántos créditos necesita tu operación legal?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                Ajusta las cantidades estimadas de tus consultas y nuestro algoritmo te sugerirá el paquete Pay As You Go más eficiente sin desperdiciar presupuesto.
              </p>
            </div>

            {/* Total credits box */}
            <div className="bg-[#0F172A] border border-[#38b6ff]/40 rounded-2xl p-5 sm:p-6 text-center min-w-[260px] shadow-lg">
              <span className="text-xs text-slate-400 font-medium block">Total créditos requeridos:</span>
              <div className="text-4xl font-extrabold font-space text-[#38b6ff] my-1">
                {totalCreditsNeeded}
              </div>
              <span className="text-xs text-amber-300 font-semibold block">
                Paquete sugerido: {recommendedTier.name} (${recommendedTier.priceUSD} USD)
              </span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Slider 1 */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-200">Antecedentes & BDME (1 cr c/u)</span>
                <span className="font-space font-bold text-[#38b6ff]">{antecedentesCount} consultas</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={antecedentesCount}
                onChange={(e) => setAntecedentesCount(Number(e.target.value))}
                className="w-full accent-[#38b6ff] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Subtotal: {antecedentesCount * 1} créditos</span>
            </div>

            {/* Slider 2 */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-200">RUES & Sociedades (2 cr c/u)</span>
                <span className="font-space font-bold text-[#38b6ff]">{ruesCount} consultas</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={ruesCount}
                onChange={(e) => setRuesCount(Number(e.target.value))}
                className="w-full accent-[#38b6ff] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Subtotal: {ruesCount * 2} créditos</span>
            </div>

            {/* Slider 3 */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-200">RUNT & Vehículos (1 cr c/u)</span>
                <span className="font-space font-bold text-[#38b6ff]">{runtCount} consultas</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={runtCount}
                onChange={(e) => setRuntCount(Number(e.target.value))}
                className="w-full accent-[#38b6ff] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Subtotal: {runtCount * 1} créditos</span>
            </div>

            {/* Slider 4 */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-200">Procesos 23 dígitos (3 cr c/u)</span>
                <span className="font-space font-bold text-[#38b6ff]">{procesosCount} procesos</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={procesosCount}
                onChange={(e) => setProcesosCount(Number(e.target.value))}
                className="w-full accent-[#38b6ff] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Subtotal: {procesosCount * 3} créditos</span>
            </div>

            {/* Slider 5 */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-200">Redacción Tutelas / Contratos (5 cr c/u)</span>
                <span className="font-space font-bold text-[#38b6ff]">{tutelasCount} documentos</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={tutelasCount}
                onChange={(e) => setTutelasCount(Number(e.target.value))}
                className="w-full accent-[#38b6ff] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Subtotal: {tutelasCount * 5} créditos</span>
            </div>

            {/* Quick Action Button for Calculated Plan */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-[#38b6ff]/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#38b6ff]">Recomendación Directa</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  El <strong>{recommendedTier.name}</strong> cubre exactamente tu operación con saldo a favor que no caduca.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (recommendedTier.contactSales) {
                    window.open(CORPORATE_SALES_URL, '_blank', 'noopener');
                    return;
                  }
                  window.open(CHAT_URL, '_blank', 'noopener');
                }}
                className="mt-3 bg-[#38b6ff] hover:bg-[#20a4f5] text-[#1E293B] font-bold text-xs py-2 px-3 rounded-lg transition-all cursor-pointer font-space"
              >
                {recommendedTier.contactSales
                  ? `Hablar con ventas (US$${recommendedTier.setupFeeUSD} setup + US$${recommendedTier.priceUSD}/mes)`
                  : `Comprar ${recommendedTier.credits} créditos por $${recommendedTier.priceUSD} USD`}
              </button>
            </div>

          </div>
        </div>

        {/* Cost Table per Legal Action */}
        <div className="mt-16 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8">
          <h3 className="font-space font-bold text-xl text-white mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#38b6ff]" />
            <span>Tabla Oficial de Consumo de Créditos por Trámite</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-[#0F172A] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Tipo de Consulta o Documento</th>
                  <th className="py-3 px-4">Fuentes / Entidades Involucradas</th>
                  <th className="py-3 px-4 text-center">Costo en Créditos</th>
                  <th className="py-3 px-4 text-right">Equivalente USD (Pack $40)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {QUERY_COST_GUIDE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">
                      {row.type}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">
                      {row.description}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-300">
                      {row.credits} {row.credits === 1 ? 'cr' : 'cr'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#38b6ff]">
                      ${(row.credits * 0.20).toFixed(2)} USD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#38b6ff] shrink-0" />
            <span>
              En el <strong>Pack Profesional ($40 USD = 200 créditos)</strong>, cada consulta simple de antecedentes o RUNT te cuesta apenas <strong>$0.20 USD</strong>, y un dossier societario completo con 12 años de finanzas cuesta <strong>$0.40 USD</strong>.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
