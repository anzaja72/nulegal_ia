import React from 'react';

interface FloatingSelectorProps {
  variant: 1 | 2 | 3;
  onSelectVariant: (v: 1 | 2 | 3) => void;
}

export const FloatingSelector: React.FC<FloatingSelectorProps> = ({ variant, onSelectVariant }) => {
  return (
    <aside 
      aria-label="Selector de enfoque"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 bg-white/95 dark:bg-[#121c30]/95 backdrop-blur-xl border border-[#2A3B5F]/15 dark:border-white/10 shadow-[0_16px_40px_rgba(42,59,95,0.25)] rounded-full text-xs font-sans transition-all"
    >
      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 px-2.5 uppercase tracking-wider select-none hidden sm:inline">
        ENFOQUE
      </span>
      
      <button
        type="button"
        onClick={() => onSelectVariant(1)}
        className={`cursor-pointer font-bold px-4 py-2 rounded-full transition-all duration-200 select-none ${
          variant === 1
            ? 'bg-[#2A3B5F] text-white shadow-[0_6px_16px_rgba(42,59,95,0.35)] scale-[1.02]'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        1 · El Resultado
      </button>

      <button
        type="button"
        onClick={() => onSelectVariant(2)}
        className={`cursor-pointer font-bold px-4 py-2 rounded-full transition-all duration-200 select-none ${
          variant === 2
            ? 'bg-[#0c1424] text-[#38b6ff] border border-[#38b6ff]/40 shadow-[0_0_24px_rgba(56,182,255,0.35)] scale-[1.02]'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        2 · Manifiesto
      </button>

      <button
        type="button"
        onClick={() => onSelectVariant(3)}
        className={`cursor-pointer font-bold px-4 py-2 rounded-full transition-all duration-200 select-none flex items-center gap-1.5 ${
          variant === 3
            ? 'bg-gradient-to-r from-[#4cbcff] to-[#38b6ff] text-[#0c1424] shadow-[0_8px_24px_rgba(56,182,255,0.45)] scale-[1.02]'
            : 'text-slate-600 dark:text-slate-300 hover:text-[#38b6ff]'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>3 · En Vivo (11 Registros)</span>
      </button>
    </aside>
  );
};
