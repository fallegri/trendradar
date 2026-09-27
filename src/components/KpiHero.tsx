import React from 'react';
import {
  MessageSquare,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { AnalysisSummary, EmotionType, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface KpiHeroProps {
  summary: AnalysisSummary;
  dominantEmotion: { emotion: EmotionType; count: number; percentage: number };
  criticalCount: number;
  currentLanguage: SupportedLanguage;
}

export const KpiHero: React.FC<KpiHeroProps> = ({
  summary,
  dominantEmotion,
  criticalCount,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  const total = summary.totalCount || 1;
  const posPct = Math.round((summary.positiveCount / total) * 100);
  const negPct = Math.round((summary.negativeCount / total) * 100);
  const neuPct = Math.round((summary.neutralCount / total) * 100);
  const nps = summary.netSentimentScore;

  // Emotion icon and label mapping
  const emotionEmojis: Record<string, string> = {
    joy: '🎉',
    anger: '😡',
    curiosity: '🧐',
    frustration: '😤',
    love: '❤️',
    sarcasm: '😏',
    skepticism: '🤨',
    neutral: '😐',
  };

  const emotionLabels: Record<string, string> = {
    joy: t.emotion_joy,
    anger: t.emotion_anger,
    curiosity: t.emotion_curiosity,
    frustration: t.emotion_frustration,
    love: t.emotion_love,
    sarcasm: t.emotion_sarcasm,
    skepticism: t.emotion_skepticism,
    neutral: t.emotion_neutral,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-4">
      
      {/* Total Comments Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.totalComments}
          </span>
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {summary.totalCount}
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> 100% analizados
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          TikTok, Instagram y Facebook sincronizados
        </p>
      </div>

      {/* Net Sentiment Score (NPS) Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.netSentimentScore}
          </span>
          <div
            className={`p-2 rounded-xl ${
              nps >= 20
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                : nps <= -20
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
            }`}
          >
            <Zap className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span
            className={`text-3xl font-extrabold tracking-tight ${
              nps >= 20
                ? 'text-emerald-600 dark:text-emerald-400'
                : nps <= -20
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {nps > 0 ? `+${nps}` : nps}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            / 100 pts
          </span>
        </div>
        {/* Simple visual gauge bar */}
        <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${Math.max(0, Math.min(100, (nps + 100) / 2))}%` }}
            className={`h-full transition-all duration-500 ${
              nps >= 20 ? 'bg-emerald-500' : nps <= -20 ? 'bg-rose-500' : 'bg-amber-500'
            }`}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
          <span>-100 Crítico</span>
          <span>0 Neutro</span>
          <span>+100 Excelente</span>
        </p>
      </div>

      {/* Sentiment Breakdown Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.sentimentDistribution}
          </span>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
            <Smile className="w-5 h-5" />
          </div>
        </div>
        
        {/* Distribution Multi-Bar */}
        <div className="mt-3.5 w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex gap-0.5">
          <div
            style={{ width: `${posPct}%` }}
            className="bg-emerald-500 h-full transition-all duration-500"
            title={`Positivos: ${posPct}%`}
          />
          <div
            style={{ width: `${neuPct}%` }}
            className="bg-slate-400 dark:bg-slate-600 h-full transition-all duration-500"
            title={`Neutros: ${neuPct}%`}
          />
          <div
            style={{ width: `${negPct}%` }}
            className="bg-rose-500 h-full transition-all duration-500"
            title={`Negativos: ${negPct}%`}
          />
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-3 gap-1 text-center">
          <div className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
            <div className="text-[10px] font-bold">POS</div>
            <div className="text-xs font-extrabold">{posPct}%</div>
          </div>
          <div className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <div className="text-[10px] font-bold">NEU</div>
            <div className="text-xs font-extrabold">{neuPct}%</div>
          </div>
          <div className="p-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
            <div className="text-[10px] font-bold">NEG</div>
            <div className="text-xs font-extrabold">{negPct}%</div>
          </div>
        </div>
      </div>

      {/* Dominant Emotion & Alerts */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.topEmotionDetected}
          </span>
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
            <span className="text-lg leading-none">
              {emotionEmojis[dominantEmotion.emotion] || '✨'}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white capitalize truncate">
            {emotionLabels[dominantEmotion.emotion] || dominantEmotion.emotion}
          </span>
          <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            {dominantEmotion.percentage}%
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">{t.criticalAlerts}:</span>
          <span className={`font-bold flex items-center gap-1 ${criticalCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}>
            {criticalCount > 0 && <AlertTriangle className="w-3.5 h-3.5" />}
            {criticalCount} comentarios críticos
          </span>
        </div>
      </div>

    </div>
  );
};
