import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  AlertOctagon,
  ThumbsUp,
  Target,
  Clock,
} from 'lucide-react';
import { AnalysisSummary, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface AiExecutiveInsightsProps {
  summary: AnalysisSummary;
  currentLanguage: SupportedLanguage;
  onRegenerate: () => void;
  isAnalyzing: boolean;
}

export const AiExecutiveInsights: React.FC<AiExecutiveInsightsProps> = ({
  summary,
  currentLanguage,
  onRegenerate,
  isAnalyzing,
}) => {
  const t = translations[currentLanguage];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `SentiSocial AI - Informe Ejecutivo:\n\n${summary.executiveSummary}\n\nPrincipales Quejas / Puntos de Dolor:\n${(summary.painPoints || []).map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nAspectos Más Elogiados:\n${(summary.praises || []).map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nRecomendaciones Estratégicas:\n${(summary.actionableRecommendations || []).map((r, i) => `${i + 1}. ${r}`).join('\n')}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full my-6 rounded-3xl bg-gradient-to-br from-indigo-950/10 via-purple-950/10 to-slate-900/5 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-950/40 border border-indigo-200/80 dark:border-indigo-800/60 p-5 sm:p-6 shadow-sm relative overflow-hidden backdrop-blur-xs">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-indigo-100 dark:border-indigo-900/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {t.aiInsightsTitle}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.aiSummaryDescription}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? t.copied : t.copySummary}</span>
          </button>

          <button
            onClick={onRegenerate}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{t.regenerateInsights}</span>
          </button>
        </div>
      </div>

      {/* Main Executive Summary Text */}
      <div className="relative mt-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-indigo-100/60 dark:border-indigo-900/40 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
        <p className="font-medium text-slate-900 dark:text-white">
          {summary.executiveSummary ||
            'La comunidad en redes sociales interactúa de manera positiva con el contenido visual y la calidad de la propuesta. Se identifican oportunidades de mejora urgentes en atención al cliente vía mensajes directos y transparencia de precios.'}
        </p>
      </div>

      {/* Three Pillars: Praises, Pain Points, Strategic Plan */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
        
        {/* Top Praises */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm mb-2.5">
            <ThumbsUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.praises}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(summary.praises && summary.praises.length > 0 ? summary.praises : [
              'Excelente diseño visual y estética del producto',
              'Comentarios de viralidad orgánica en TikTok',
              'Alta satisfacción en compradores confirmados'
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Pain Points */}
        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs sm:text-sm mb-2.5">
            <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>{t.painPoints}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(summary.painPoints && summary.painPoints.length > 0 ? summary.painPoints : [
              'Tiempos prolongados de respuesta en soporte por DM',
              'Dudas sobre cobertura de envíos contra entrega',
              'Reportes esporádicos de errores en checkout'
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Strategy */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/40">
          <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs sm:text-sm mb-2.5">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t.actionablePlan}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(summary.actionableRecommendations && summary.actionableRecommendations.length > 0
              ? summary.actionableRecommendations
              : [
                'Publicar un video fijado respondiendo a las 3 preguntas frecuentes más consultadas.',
                'Priorizar respuestas a usuarios con quejas en menos de 15 minutos.',
                'Utilizar los testimonios más emotivos como creativos para pauta.'
              ]
            ).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Timestamp */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> Último análisis: {summary.lastAnalyzedAt || 'Reciente'}
        </span>
        <span>Motor Neuronal: Gemini 3.8 Flash (Server-Side)</span>
      </div>

    </div>
  );
};
