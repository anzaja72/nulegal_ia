/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroResult } from './components/HeroResult.tsx';
import { HeroManifesto } from './components/HeroManifesto.tsx';
import { HeroLiveInteractive } from './components/HeroLiveInteractive.tsx';
import { QueriesExplorer2026 } from './components/QueriesExplorer2026.tsx';
import { PricingPayAsYouGo } from './components/PricingPayAsYouGo.tsx';
import { DocumentTypesGrid } from './components/DocumentTypesGrid.tsx';
import { RechargeModal } from './components/RechargeModal.tsx';
import { Footer } from './components/Footer.tsx';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface AppProps {
  /**
   * Cada versión se publica en su propia URL (ver vite.config.ts):
   * 1: /resultado/  ("El Resultado")
   * 2: /manifiesto/ ("Manifiesto")
   * 3: /en-vivo/    ("En Vivo")
   */
  variant: 1 | 2 | 3;
}

export default function App({ variant }: AppProps) {
  
  // Starting balance: 200 credits (mandated $40 = 200 credits plan)
  const [credits, setCredits] = useState<number>(200);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [preselectedQueryId, setPreselectedQueryId] = useState<string>('antecedentes');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDeductCredits = (amount: number, reason: string): boolean => {
    if (credits < amount) {
      showToast(`Créditos insuficientes. Requieres ${amount} créditos. Por favor recarga.`, 'error');
      setIsRechargeModalOpen(true);
      return false;
    }

    setCredits((prev) => prev - amount);
    showToast(`Se descontaron ${amount} ${amount === 1 ? 'crédito' : 'créditos'} (${reason}). Saldo actual: ${credits - amount}`, 'info');
    return true;
  };

  const handlePurchaseTier = (addedCredits: number, tierName: string, priceUSD: number) => {
    setCredits((prev) => prev + addedCredits);
    showToast(`¡Recarga exitosa! Se acreditaron ${addedCredits} créditos (${tierName} por $${priceUSD} USD). Saldo: ${credits + addedCredits} créditos`, 'success');
  };

  const handleSelectSampleQuery = (queryId: string) => {
    setPreselectedQueryId(queryId);
    const elem = document.getElementById('consultas-2026');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDraftDocumentInChat = (docName: string) => {
    if (variant === 3) {
      showToast(`Iniciando redacción de ${docName} en la consola en vivo.`, 'info');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // En las otras versiones la consola en vivo vive en su propia URL.
    window.location.assign(`${import.meta.env.BASE_URL}en-vivo/`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-[#38b6ff] selection:text-[#1E293B] ${
      variant === 1 ? 'bg-white text-[#1E293B]' : 'bg-[#0F172A] text-slate-100'
    }`}>
      
      {/* Top Banner Notice */}
      <aside aria-label="Aviso oficial" className="bg-[#0F172A] border-b border-slate-800 text-xs text-center py-2 px-4 text-slate-300">
        <span className="font-semibold text-white">LEGAL-IA Colombia · Noviembre 2026:</span> Todas las fuentes probadas contra registros reales el 2 y 3 de nov 2026.
        <span className="ml-2 font-mono text-[#38B6FF] font-bold hidden sm:inline">Pack Profesional: $40 USD = 200 créditos Pay As You Go</span>
      </aside>

      {/* Floating Pill Navbar */}
      <Navbar
        variant={variant}
        credits={credits}
        onOpenRechargeModal={() => setIsRechargeModalOpen(true)}
        onOpenQueries={() => scrollToSection('consultas-2026')}
      />

      {/* Main Dynamic View based on Perspective Variant */}
      <main className="flex-1">
        {variant === 1 && (
          <HeroResult
            onGoToQueries={() => scrollToSection('consultas-2026')}
            onGoToPricing={() => scrollToSection('pricing')}
            onSelectSample={handleSelectSampleQuery}
          />
        )}

        {variant === 2 && (
          <HeroManifesto
            onGoToQueries={() => scrollToSection('consultas-2026')}
            onGoToPricing={() => scrollToSection('pricing')}
          />
        )}

        {variant === 3 && (
          <HeroLiveInteractive
            userCredits={credits}
            onDeductCredits={handleDeductCredits}
            onOpenRechargeModal={() => setIsRechargeModalOpen(true)}
            onSelectQueryCategory={handleSelectSampleQuery}
            onGoToQueries={() => scrollToSection('consultas-2026')}
            onGoToPricing={() => scrollToSection('pricing')}
          />
        )}

        {/* Document Types Grid (Common across views) */}
        <DocumentTypesGrid onDraftClick={handleDraftDocumentInChat} />

        {/* November 2026 Tested Queries Catalog & Interactive Executor */}
        <QueriesExplorer2026
          userCredits={credits}
          onDeductCredits={handleDeductCredits}
          onOpenRechargeModal={() => setIsRechargeModalOpen(true)}
          preselectedQueryId={preselectedQueryId}
        />

        {/* 100% Pay As You Go Pricing Section ($40 = 200 credits) */}
        <PricingPayAsYouGo onPurchaseTier={handlePurchaseTier} />
      </main>

      {/* Pay As You Go Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onSelectTier={handlePurchaseTier}
        currentCredits={credits}
      />

      {/* Toast Notification Feedback */}
      {toastMessage && (
        <aside
          aria-label="Notificación del sistema"
          className={`fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-xs font-medium transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
              : toastMessage.type === 'error'
              ? 'bg-rose-950 border border-rose-500 text-rose-200'
              : 'bg-[#121c30] border border-[#38b6ff] text-[#38b6ff]'
          }`}
        >
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-[#38b6ff] shrink-0" />}
          <span>{toastMessage.text}</span>
        </aside>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
