import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  RotateCcw,
  Scale,
  ShieldCheck,
  Building2,
  Loader2
} from 'lucide-react';
import { LegalIALogo } from './LegalIALogo.tsx';
import { NOVEMBER_2026_QUERIES } from '../data/legalQueriesData.ts';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  agent?: string;
  text: string;
  creditsDeducted?: number;
  sourcesInterrogated?: string[];
  attachedDossier?: any;
  timestamp: string;
}

interface InteractiveChatLiveProps {
  userCredits: number;
  onDeductCredits: (amount: number, reason: string) => boolean;
  onOpenRechargeModal: () => void;
  onSelectQueryCategory?: (id: string) => void;
}

export const InteractiveChatLive: React.FC<InteractiveChatLiveProps> = ({
  userCredits,
  onDeductCredits,
  onOpenRechargeModal,
  onSelectQueryCategory
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      agent: 'Lex Litigia (Orchestrator)',
      text: 'Bienvenido a LEGAL-IA Service-as-Software. Estoy conectado a las 11 fuentes oficiales de Colombia verificadas a noviembre de 2026. Puedes pedirme consultas directas de antecedentes, RUES, RUNT, SECOP, procesos judiciales de 23 dígitos o redactar tutelas y contratos completos.',
      timestamp: 'Ahora'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    {
      label: 'Antecedentes CC 79.982.140',
      text: 'Consulta los antecedentes e inhabilidades de Carlos Restrepo con CC 79.982.140 antes de nombrarlo representante legal.',
      cost: 1
    },
    {
      label: 'Sustituto RUES NIT 900.123.456-1',
      text: 'Genera el sustituto de certificado de cámara de comercio para el NIT 900.123.456-1 con representantes y finanzas.',
      cost: 2
    },
    {
      label: 'RUNT & Comparendos Placa BKS-412',
      text: 'Verifica la placa BKS-412 en RUNT y SIMIT: prendas, SOAT y proyección de comparendos.',
      cost: 1
    },
    {
      label: 'Proceso Judicial 23 dígitos',
      text: 'Revisa el proceso judicial 11001310300120230045600 y verifica si salió notificación en estados electrónicos.',
      cost: 3
    },
    {
      label: 'Redactar Tutela de Salud (Sanitas)',
      text: 'Redacta una acción de tutela contra Sanitas EPS por negación de procedimiento de reemplazo articular de cadera.',
      cost: 5
    }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    let requiredCost = 1;
    let categoryMatch = NOVEMBER_2026_QUERIES[0];
    let agentName = 'Lex Litigia';

    // Determine intent and cost
    if (text.toLowerCase().includes('tutela') || text.toLowerCase().includes('contrato') || text.toLowerCase().includes('redacta')) {
      requiredCost = 5;
      agentName = 'Lex Litigia & Jus Publica';
    } else if (text.toLowerCase().includes('proceso') || text.toLowerCase().includes('radicad') || text.includes('11001310')) {
      requiredCost = 3;
      categoryMatch = NOVEMBER_2026_QUERIES.find((q) => q.id === 'procesos-judiciales')!;
      agentName = 'Lex Litigia (LEGAL-IA PRO)';
    } else if (text.toLowerCase().includes('nit') || text.toLowerCase().includes('rues') || text.toLowerCase().includes('camara') || text.toLowerCase().includes('sociedad')) {
      requiredCost = 2;
      categoryMatch = NOVEMBER_2026_QUERIES.find((q) => q.id === 'sociedad')!;
      agentName = 'Contractia (Corporativo)';
    } else if (text.toLowerCase().includes('placa') || text.toLowerCase().includes('runt') || text.toLowerCase().includes('vehiculo')) {
      requiredCost = 1;
      categoryMatch = NOVEMBER_2026_QUERIES.find((q) => q.id === 'vehiculos')!;
      agentName = 'Synapse Transit';
    } else if (text.toLowerCase().includes('secop') || text.toLowerCase().includes('contratacion')) {
      requiredCost = 2;
      categoryMatch = NOVEMBER_2026_QUERIES.find((q) => q.id === 'contratacion-estatal')!;
      agentName = 'Jus Publica';
    }

    if (userCredits < requiredCost) {
      onOpenRechargeModal();
      return;
    }

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const success = onDeductCredits(requiredCost, `Consulta Chat: ${text.slice(0, 30)}...`);
      if (success) {
        let replyText = '';
        let dossierData: any = null;
        let sourcesUsed: string[] = [];

        if (requiredCost === 5) {
          replyText = `He redactado la Acción de Tutela con fundamento en el Artículo 86 de la Constitución Política y Sentencia T-760/08. Se invocaron los derechos fundamentales a la salud, dignidad humana y vida digna. El documento cuenta con acápite de hechos cronológicos, pretensiones principales y de medida cautelar provisional de protección inmediata, pruebas y anexos formalizados para radicación virtual ante el Consejo Superior de la Judicatura.`;
          dossierData = {
            titulo: 'ACCIÓN DE TUTELA CON MEDIDA PROVISIONAL',
            accionante: 'Carlos Mario Beltrán Gómez (CC 79.982.140)',
            accionado: 'SANITAS EPS S.A.S. (NIT 800.251.440-6)',
            derechosTutelados: 'Salud, Vida en Condiciones Dignas, Mínimo Vital',
            medidaCautelar: 'Orden inmediata de asignación de quirófano en 48 horas',
            jurisprudenciaBase: 'Corte Constitucional T-025/04, T-760/08 y Auto 263/2026'
          };
          sourcesUsed = ['Corte Constitucional', 'ADRES BDUA', 'Registro Médico ReTHUS'];
        } else {
          replyText = `Consulta ejecutada exitosamente a través de las fuentes oficiales de noviembre 2026. Se estructuró el expediente y se verificaron los estados de servicio.`;
          dossierData = categoryMatch.demoData;
          sourcesUsed = categoryMatch.sources.map((s) => s.name);
        }

        const newAssistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          agent: agentName,
          text: replyText,
          creditsDeducted: requiredCost,
          sourcesInterrogated: sourcesUsed,
          attachedDossier: dossierData,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newAssistantMsg]);
      }
      setIsTyping(false);
    }, 1300);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
      
      {/* Console Top Bar */}
      <div className="bg-[#090e1a] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LegalIALogo size={32} variant="sky" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space font-bold text-white text-sm">Consola Chat Legal-IA</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                11 FUENTES CONECTADAS
              </span>
            </div>
            <span className="text-xs text-slate-400">Agentes jurídicos autónomos en tiempo real</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Tu saldo:</span>
          <span className="font-space font-bold text-amber-300 bg-amber-950/50 border border-amber-800/50 px-2.5 py-1 rounded-md">
            {userCredits} créditos
          </span>
          <button
            onClick={onOpenRechargeModal}
            className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline text-xs"
          >
            Recargar
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-[#090e1a] to-[#0c1424]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-2 mb-1 px-1">
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {msg.sender === 'assistant' ? msg.agent : 'Tú (Abogado / Solicitante)'}
              </span>
              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
              {msg.creditsDeducted && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  -{msg.creditsDeducted} cr
                </span>
              )}
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
              }`}
            >
              <p>{msg.text}</p>

              {/* Interrogated Sources Badge */}
              {msg.sourcesInterrogated && msg.sourcesInterrogated.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-cyan-400 mr-1">Fuentes:</span>
                  {msg.sourcesInterrogated.map((src, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              )}

              {/* Dossier Card Inside Message */}
              {msg.attachedDossier && (
                <div className="mt-4 bg-[#070b14] border border-cyan-800/30 rounded-xl p-3.5 text-xs text-slate-300 font-mono space-y-2">
                  <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-1.5">
                    <span className="font-bold flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>EXPEDIENTE ESTRUCTURADO LEGAL-IA</span>
                    </span>
                    <span className="text-[10px]">VERIFICADO 2026</span>
                  </div>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {Object.entries(msg.attachedDossier).map(([k, v]: [string, any], i) => (
                      <div key={i} className="text-[11px]">
                        <span className="text-slate-400">{k}: </span>
                        <span className="text-white font-medium">
                          {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Consultando servidores judiciales y registros de noviembre 2026...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Strip */}
      <div className="bg-[#0a0f1c] px-4 py-2 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">Ejemplos:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            className="shrink-0 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg text-xs transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>{p.label}</span>
            <span className="text-[10px] text-amber-400 font-mono">({p.cost} cr)</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-[#090e1a] p-4 border-t border-slate-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Pregunta o consulta por CC, NIT, Placa, Radicación 23 dígitos o redacción legal..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold p-3 rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>Consultas directas a 11 bases oficiales · Sin suscripción mensual forzada</span>
          <span>Presiona Enter para enviar</span>
        </div>
      </div>

    </div>
  );
};
