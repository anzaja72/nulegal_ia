import React from 'react';
import { COMPARISON, Variant } from '../content/audience.ts';

interface Props {
  variant: Variant;
  theme: 'light' | 'dark';
}

/**
 * Comparativa: abogado tradicional · IA genérica · Legal-IA.
 * Incluye privacidad (ZDR frente a entrenamiento con tus datos y Habeas Data).
 */
export const ComparisonSection: React.FC<Props> = ({ variant, theme }) => {
  const c = COMPARISON[variant];
  const dark = theme === 'dark';
  const card = dark ? 'bg-[#0F172A]/80 border border-white/10' : 'bg-[#F8FAFC] border border-slate-200';
  const title = dark ? 'text-white' : 'text-[#1E293B]';
  const body = dark ? 'text-slate-300' : 'text-slate-600';
  const foot = dark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500';
  const unit = dark ? 'text-slate-400' : 'text-slate-500';

  const Col = ({
    label,
    name,
    price,
    priceUnit,
    points,
    footer,
    mark,
    markColor,
    priceColor,
    highlight
  }: {
    label: string;
    name: string;
    price: string;
    priceUnit: string;
    points: string[];
    footer: string;
    mark: string;
    markColor: string;
    priceColor: string;
    highlight?: boolean;
  }) => (
    <div
      className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative ${
        highlight
          ? dark
            ? 'bg-[#0F172A] border-2 border-[#38B6FF] shadow-[0_0_40px_rgba(56,182,255,0.25)]'
            : 'bg-white border-2 border-[#38B6FF] shadow-[0_10px_35px_rgba(56,182,255,0.18)]'
          : card
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-6 bg-[#38B6FF] text-[#1E293B] font-space font-bold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full">
          Service as Software
        </div>
      )}
      <div>
        <span className={`text-xs font-mono font-bold uppercase ${highlight ? (dark ? 'text-[#38B6FF]' : 'text-[#0072b2]') : unit}`}>
          {label}
        </span>
        <h3 className={`font-space font-bold text-xl mt-3 ${title}`}>{name}</h3>
        <div className={`text-2xl font-space font-bold mt-2 mb-4 ${priceColor}`}>
          {price} <span className={`text-xs font-sans font-normal ${unit}`}>{priceUnit}</span>
        </div>
        <ul className={`space-y-3 text-sm ${highlight ? (dark ? 'text-slate-200' : 'text-slate-700') : body}`}>
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className={`${markColor} font-bold shrink-0`} aria-hidden="true">{mark}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`mt-6 pt-4 border-t text-xs font-medium ${highlight ? 'border-[#38B6FF]/30 ' + (dark ? 'text-[#38B6FF]' : 'text-[#0072b2]') : foot}`}>
        {footer}
      </div>
    </div>
  );

  return (
    <section id="como-funciona" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${dark ? 'mt-24 sm:mt-28' : 'mt-28'}`}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className={`font-space font-extrabold text-2xl sm:text-4xl ${title}`}>{c.heading}</h2>
        <p className={`text-sm sm:text-base mt-3 ${body}`}>{c.subheading}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <Col
          label="Opción 1"
          name={c.labels?.traditional ?? 'Abogado tradicional'}
          {...(({ ...rest }) => rest)(c.traditional)}
          mark="✕"
          markColor="text-rose-500"
          priceColor="text-rose-500"
        />
        <Col
          label="Opción 2"
          name={c.labels?.generic ?? 'IA genérica (ChatGPT, etc.)'}
          {...c.generic}
          mark="⚠"
          markColor="text-amber-500"
          priceColor="text-amber-500"
        />
        <Col
          label="Opción 3"
          name="Legal-IA"
          {...c.legalia}
          mark="✓"
          markColor="text-emerald-500"
          priceColor="text-[#38B6FF]"
          highlight
        />
      </div>
    </section>
  );
};
