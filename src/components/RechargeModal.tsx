import React from 'react';
import { PAY_AS_YOU_GO_TIERS } from '../data/legalQueriesData.ts';
import { X, Check, ShieldCheck, Coins, Sparkles, ArrowRight } from 'lucide-react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (credits: number, tierName: string, priceUSD: number) => void;
  currentCredits: number;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
  currentCredits
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#38b6ff]/10 border border-[#38b6ff]/30 flex items-center justify-center text-[#38b6ff]">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-space font-bold text-xl text-white">
              Recargar Créditos Pay As You Go
            </h3>
            <span className="text-xs text-slate-400">
              Saldo actual disponible: <strong className="text-[#38b6ff] font-mono">{currentCredits} créditos</strong>
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Todos los paquetes son de pago único. Sin mensualidades fijas, sin caducidad.
        </p>

        {/* Tiers List */}
        <div className="space-y-3">
          {PAY_AS_YOU_GO_TIERS.map((tier) => {
            const isMandated = tier.priceUSD === 40;
            return (
              <div
                key={tier.id}
                onClick={() => {
                  onSelectTier(tier.credits, tier.name, tier.priceUSD);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isMandated
                    ? 'bg-gradient-to-r from-[#1E293B] to-[#1E293B]/80 border-[#38b6ff] shadow-md shadow-[#38b6ff]/15'
                    : 'bg-[#1E293B]/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-space font-bold text-sm text-white">
                      {tier.name}
                    </span>
                    {isMandated && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#38b6ff] text-[#1E293B] font-mono">
                        RECOMENDADO · MANDATARIO
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {tier.idealFor}
                  </div>
                </div>

                <div className="text-right shrink-0 pl-4">
                  <div className="font-space font-bold text-base text-white">
                    ${tier.priceUSD} USD
                  </div>
                  <div className="text-xs font-mono text-[#38b6ff] font-bold">
                    {tier.credits} Créditos
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#38b6ff]" />
            <span>Pago seguro con PSE, Tarjeta o Wompi / Stripe</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Créditos de vigencia ilimitada</span>
        </div>

      </div>
    </div>
  );
};
