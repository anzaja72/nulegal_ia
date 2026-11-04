import React from 'react';
import { LegalIALogo } from './LegalIALogo.tsx';
import { Shield, ExternalLink, Scale, CheckCircle2, HeartHandshake, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand quote banner */}
        <div className="pb-10 mb-10 border-b border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <LegalIALogo size={46} variant="white" />
            <div>
              <p className="font-space font-bold text-lg text-white">
                “Tú pones los hechos. Nosotros ponemos el derecho.”
              </p>
              <p className="text-xs text-[#38B6FF] font-medium mt-0.5">
                Service-as-Software Jurídico para Colombia · 100% Pay As You Go
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]" />
              <span>Radical Honesty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]" />
              <span>Legal Accessibility</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]" />
              <span>Autonomous Efficiency</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-space font-bold text-sm text-white tracking-wider uppercase block">
              Sobre Legal-IA
            </span>
            <p className="text-xs leading-relaxed text-slate-400">
              Arquitectura de agentes jurídicos autónomos especializados en la República de Colombia. Consultas directas a 11 fuentes oficiales y redacción procesal con citas de altas cortes.
            </p>
            <div className="text-[11px] font-mono text-[#38B6FF] pt-1">
              Fuentes probadas contra registros reales el 2 y 3 de nov 2026.
            </div>
          </div>

          {/* Registries tested */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-white text-xs uppercase tracking-wider">
              Registros Verificados 2026
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Procuraduría, Policía & RNMC</li>
              <li>RUES Cámaras de Comercio</li>
              <li>Supersociedades & SAGRILAFT</li>
              <li>SIC Marcas y Patentes</li>
              <li>RUNT, SIMIT & Tránsito</li>
              <li>ADRES BDUA & ReTHUS</li>
            </ul>
          </div>

          {/* Legal Features */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-white text-xs uppercase tracking-wider">
              Módulos Avanzados
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>SECOP I y II (94 variables)</li>
              <li>DIAN Comercio Exterior & Doctrina</li>
              <li>Consejo de Estado SAMAI</li>
              <li>LEGAL-IA PRO: Procesos 23 dígitos</li>
              <li>Notificaciones por Estados Electrónicos</li>
              <li>Directorio Despachos & IGAC Catastral</li>
            </ul>
          </div>

          {/* Framework & Compliance */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-white text-xs uppercase tracking-wider">
              Marco Legal Colombiano
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Conforme a la Ley 2213 de 2022 (justicia digital), Código General del Proceso (CGP), CPACA y Ley 1581 de 2012 de Protección de Datos Personales.
            </p>
            <div className="pt-2 flex items-center space-x-1.5 text-emerald-400 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Avisos transparentes si una fuente está caída</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} LEGAL-IA Colombia. Todos los derechos reservados. Modelo Pay As You Go estricto.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 transition-colors">Términos del Servicio</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors">Política SAGRILAFT</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors">Aviso de Privacidad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
