import React from 'react';
import { FAQ, LAST_UPDATED, LAST_UPDATED_LABEL } from '../seo/config.ts';
import { NOVEMBER_2026_QUERIES } from '../data/legalQueriesData.ts';

/**
 * Preguntas frecuentes + catálogo de consultas en HTML nativo (<details>).
 * El contenido está siempre en el DOM, así que los rastreadores de IA y Google lo leen
 * aunque no ejecuten JavaScript. Las respuestas coinciden con el JSON-LD FAQPage.
 */
export const FaqSection: React.FC = () => {
  return (
    <section id="preguntas-frecuentes" className="py-24 bg-white text-[#1E293B] border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-space font-extrabold text-3xl sm:text-4xl tracking-tight">
          Preguntas frecuentes sobre Legal-IA
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Respuestas directas sobre qué hace Legal-IA, cuánto cuesta y qué registros oficiales puedes consultar en Colombia.
        </p>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6 font-space font-bold text-lg marker:hidden [&::-webkit-details-marker]:hidden">
                <h3 className="font-space font-bold text-lg">{item.q}</h3>
                <span aria-hidden="true" className="mt-1 text-[#38B6FF] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-700 leading-relaxed max-w-3xl">{item.a}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-20 font-space font-extrabold text-2xl sm:text-3xl tracking-tight">
          Qué puedes consultar desde el chat
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Once grupos de consulta sobre fuentes oficiales colombianas, con la entidad que certifica cada dato.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {NOVEMBER_2026_QUERIES.map((q) => (
            <details key={q.id} className="group rounded-2xl border border-slate-200 p-5 open:bg-slate-50">
              <summary className="cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                <h3 className="font-space font-bold text-base">{q.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{q.subtitle}</p>
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {q.sources.map((s) => (
                  <li key={s.name}>
                    <strong className="font-semibold">{s.name}:</strong> {s.certifies}
                    {s.status !== 'active' && (
                      <span className="ml-1 text-amber-700">
                        {s.status === 'down_at_source' ? '(caída en la fuente)' : '(próxima actualización)'}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Última actualización: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>. Fuentes probadas contra los registros reales el 2 y 3 de noviembre de 2026.
        </p>
      </div>
    </section>
  );
};
