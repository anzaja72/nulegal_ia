import React from 'react';
import { LegalIALogo } from './LegalIALogo.tsx';
import { Coins, Sparkles, Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  variant: 1 | 2 | 3 | 4;
  credits: number;
  onOpenRechargeModal: () => void;
  onOpenQueries: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  variant,
  credits,
  onOpenRechargeModal,
  onOpenQueries
}) => {
  const isDark = variant === 2;

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className={`pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
          isDark
            ? 'bg-[#1E293B]/90 border border-slate-700/80 text-white shadow-[0_12px_36px_rgba(15,23,42,0.4)] backdrop-blur-xl'
            : 'bg-white/95 border border-slate-200/90 text-[#1E293B] shadow-[0_10px_30px_rgba(30,41,59,0.08)] backdrop-blur-xl'
        }`}
      >
        {/* Brand Group with Official Logo */}
        <div className="flex items-center gap-3">
          <LegalIALogo
            size={40}
            variant={isDark ? 'sky' : 'sky'}
            className="hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-space font-extrabold text-lg tracking-tight leading-none">
                Legal-IA
              </span>
              <span
                className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                  isDark
                    ? 'bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/30'
                    : 'bg-[#38B6FF]/10 text-[#0072b2] border border-[#38B6FF]/30'
                }`}
              >
                COLOMBIA 2026
              </span>
            </div>
            <span
              className={`text-[11px] font-sans font-medium tracking-tight hidden sm:block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Service as Software Jurídico
            </span>
          </div>
        </div>

        {/* Center Links (Restrained, airy, professional) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-wide">
          <a
            href="#como-funciona"
            className={`transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#38B6FF]'
            }`}
          >
            Cómo funciona
          </a>
          <a
            href="#documentos"
            className={`transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#38B6FF]'
            }`}
          >
            Documentos
          </a>
          <a
            href="#consultas-2026"
            onClick={(e) => {
              e.preventDefault();
              onOpenQueries();
            }}
            className="flex items-center gap-1.5 font-semibold text-[#38B6FF] hover:text-[#2196F3] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>11 Registros Oficiales</span>
          </a>
          <a
            href="#precios"
            className={`transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#38B6FF]'
            }`}
          >
            Precios Pay As You Go
          </a>
        </div>

        {/* Right CTA & Credit Balance */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Credit Wallet Button */}
          <button
            type="button"
            onClick={onOpenRechargeModal}
            title="Ver saldo y paquetes Pay As You Go"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-400/30'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 shadow-xs'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-space font-bold text-sm tracking-tight">{credits}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">cr</span>
          </button>

          {/* Recharge Action */}
          <button
            type="button"
            onClick={onOpenRechargeModal}
            className="bg-[#38B6FF] hover:bg-[#20a4f5] text-[#1E293B] font-space font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-[0_4px_14px_rgba(56,182,255,0.3)] hover:shadow-[0_6px_20px_rgba(56,182,255,0.4)] cursor-pointer flex items-center gap-1"
          >
            <span>Recargar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>
    </header>
  );
};
