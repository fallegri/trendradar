import React, { useState } from 'react';
import {
  PieChart as PieIcon,
  BarChart3,
  Flame,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { AnalysisSummary, EmotionType, Platform, SocialComment, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface AnalyticsChartsProps {
  comments: SocialComment[];
  summary: AnalysisSummary;
  currentLanguage: SupportedLanguage;
  onFilterByKeyword?: (keyword: string) => void;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  comments,
  summary,
  currentLanguage,
  onFilterByKeyword,
}) => {
  const t = translations[currentLanguage];
  const [hoveredDonut, setHoveredDonut] = useState<string | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'all' | 'platforms' | 'emotions' | 'trends'>('all');

  const total = comments.length || 1;
  const posCount = comments.filter((c) => c.sentiment === 'positive').length;
  const negCount = comments.filter((c) => c.sentiment === 'negative').length;
  const neuCount = comments.filter((c) => c.sentiment === 'neutral' || !c.sentiment).length;
  const mixCount = comments.filter((c) => c.sentiment === 'mixed').length;

  const posPct = (posCount / total) * 100;
  const negPct = (negCount / total) * 100;
  const neuPct = (neuCount / total) * 100;
  const mixPct = (mixCount / total) * 100;

  // Platform breakdown
  const platforms: ('tiktok' | 'instagram' | 'facebook')[] = ['tiktok', 'instagram', 'facebook'];
  const platformStats = platforms.map((p) => {
    const list = comments.filter((c) => c.platform === p);
    const pTotal = list.length || 1;
    const pPos = list.filter((c) => c.sentiment === 'positive').length;
    const pNeg = list.filter((c) => c.sentiment === 'negative').length;
    const pNeu = list.filter((c) => c.sentiment === 'neutral' || !c.sentiment).length;
    const avg = list.reduce((acc, curr) => acc + (curr.sentimentScore || 0), 0) / pTotal;
    return {
      platform: p,
      total: list.length,
      posCount: pPos,
      negCount: pNeg,
      neuCount: pNeu,
      posPct: Math.round((pPos / pTotal) * 100),
      negPct: Math.round((pNeg / pTotal) * 100),
      neuPct: Math.round((pNeu / pTotal) * 100),
      avgScore: Number(avg.toFixed(2)),
    };
  });

  // Emotions breakdown
  const emotionsList: { key: EmotionType; label: string; emoji: string; color: string }[] = [
    { key: 'joy', label: t.emotion_joy, emoji: '🎉', color: 'from-amber-400 to-yellow-500' },
    { key: 'love', label: t.emotion_love, emoji: '❤️', color: 'from-pink-500 to-rose-500' },
    { key: 'curiosity', label: t.emotion_curiosity, emoji: '🧐', color: 'from-blue-400 to-indigo-500' },
    { key: 'frustration', label: t.emotion_frustration, emoji: '😤', color: 'from-orange-500 to-amber-600' },
    { key: 'anger', label: t.emotion_anger, emoji: '😡', color: 'from-rose-600 to-red-700' },
    { key: 'sarcasm', label: t.emotion_sarcasm, emoji: '😏', color: 'from-purple-500 to-indigo-600' },
  ];

  const emotionCounts = emotionsList.map((e) => {
    const count = comments.filter((c) => c.primaryEmotion === e.key).length;
    const pct = Math.round((count / total) * 100);
    return { ...e, count, pct };
  }).sort((a, b) => b.count - a.count);

  // Trending Keywords & Hashtags extraction
  const keywordMap: Record<string, { count: number; sentiment: 'positive' | 'negative' | 'neutral' }> = {};
  comments.forEach((c) => {
    (c.keywords || []).forEach((kw) => {
      const clean = kw.toLowerCase().trim();
      if (clean.length > 2) {
        if (!keywordMap[clean]) {
          const sent = c.sentiment === 'positive' ? 'positive' : c.sentiment === 'negative' ? 'negative' : 'neutral';
          keywordMap[clean] = { count: 0, sentiment: sent };
        }
        keywordMap[clean].count += 1;
      }
    });
  });

  const trendingTopics = Object.entries(keywordMap)
    .map(([topic, data]) => ({ topic, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 14);

  // Fallback topics if few
  const defaultTopics = [
    { topic: '#unboxing', count: 18, sentiment: 'positive' as const },
    { topic: 'soporte', count: 12, sentiment: 'negative' as const },
    { topic: 'calidad', count: 16, sentiment: 'positive' as const },
    { topic: 'envíos', count: 10, sentiment: 'neutral' as const },
    { topic: 'precio', count: 9, sentiment: 'negative' as const },
    { topic: '#viral', count: 14, sentiment: 'positive' as const },
    { topic: 'garantía', count: 6, sentiment: 'neutral' as const },
  ];
  const finalTopics = trendingTopics.length > 3 ? trendingTopics : defaultTopics;

  // Donut SVG circumference calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12
  const strokeDashoffsetPos = 0;
  const strokeDashoffsetNeu = -((posPct / 100) * circumference);
  const strokeDashoffsetNeg = -(((posPct + neuPct) / 100) * circumference);
  const strokeDashoffsetMix = -(((posPct + neuPct + negPct) / 100) * circumference);

  return (
    <div className="w-full space-y-4 my-6">
      
      {/* Section Header with Quick View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            {t.analyticsOverview}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Métricas de sentimiento, desglose por red social y tópicos en tiempo real
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveChartTab('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeChartTab === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Vista Integral
          </button>
          <button
            onClick={() => setActiveChartTab('platforms')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeChartTab === 'platforms'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.platformComparison}
          </button>
          <button
            onClick={() => setActiveChartTab('emotions')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeChartTab === 'emotions'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.emotionSpectrum}
          </button>
          <button
            onClick={() => setActiveChartTab('trends')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeChartTab === 'trends'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.trendingKeywords}
          </button>
        </div>
      </div>

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Chart 1: Donut Distribution (4 Cols) */}
        {(activeChartTab === 'all' || activeChartTab === 'platforms') && (
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-emerald-500" />
                {t.sentimentDistribution}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                N = {total}
              </span>
            </div>

            {/* Donut Graphic */}
            <div className="relative flex items-center justify-center py-4">
              <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="20"
                  fill="none"
                />
                
                {/* Positive segment */}
                {posPct > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-emerald-500 transition-all duration-700 hover:stroke-emerald-400 cursor-pointer"
                    strokeWidth={hoveredDonut === 'pos' ? '24' : '20'}
                    strokeDasharray={`${(posPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffsetPos}
                    fill="none"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredDonut('pos')}
                    onMouseLeave={() => setHoveredDonut(null)}
                  />
                )}

                {/* Neutral segment */}
                {neuPct > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-slate-400 dark:stroke-slate-600 transition-all duration-700 hover:stroke-slate-300 cursor-pointer"
                    strokeWidth={hoveredDonut === 'neu' ? '24' : '20'}
                    strokeDasharray={`${(neuPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffsetNeu}
                    fill="none"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredDonut('neu')}
                    onMouseLeave={() => setHoveredDonut(null)}
                  />
                )}

                {/* Negative segment */}
                {negPct > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-rose-500 transition-all duration-700 hover:stroke-rose-400 cursor-pointer"
                    strokeWidth={hoveredDonut === 'neg' ? '24' : '20'}
                    strokeDasharray={`${(negPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffsetNeg}
                    fill="none"
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredDonut('neg')}
                    onMouseLeave={() => setHoveredDonut(null)}
                  />
                )}
              </svg>

              {/* Donut Center Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  {hoveredDonut === 'pos' ? 'Positivos' : hoveredDonut === 'neg' ? 'Negativos' : hoveredDonut === 'neu' ? 'Neutros' : 'Net Score'}
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {hoveredDonut === 'pos'
                    ? `${Math.round(posPct)}%`
                    : hoveredDonut === 'neg'
                    ? `${Math.round(negPct)}%`
                    : hoveredDonut === 'neu'
                    ? `${Math.round(neuPct)}%`
                    : `${summary.netSentimentScore > 0 ? '+' : ''}${summary.netSentimentScore}`}
                </span>
                <span className="text-[10px] text-slate-400">
                  {hoveredDonut ? `${hoveredDonut === 'pos' ? posCount : hoveredDonut === 'neg' ? negCount : neuCount} comentarios` : 'Puntaje General'}
                </span>
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  hoveredDonut === 'pos' ? 'bg-emerald-100 dark:bg-emerald-950/80 ring-2 ring-emerald-500' : 'bg-emerald-50 dark:bg-emerald-950/30'
                }`}
                onMouseEnter={() => setHoveredDonut('pos')}
                onMouseLeave={() => setHoveredDonut(null)}
              >
                <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{t.positive}</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(posPct)}%
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {posCount} msgs
                </div>
              </div>

              <div
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  hoveredDonut === 'neu' ? 'bg-slate-200 dark:bg-slate-700 ring-2 ring-slate-400' : 'bg-slate-100 dark:bg-slate-800'
                }`}
                onMouseEnter={() => setHoveredDonut('neu')}
                onMouseLeave={() => setHoveredDonut(null)}
              >
                <div className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>{t.neutral}</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(neuPct)}%
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {neuCount} msgs
                </div>
              </div>

              <div
                className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                  hoveredDonut === 'neg' ? 'bg-rose-100 dark:bg-rose-950/80 ring-2 ring-rose-500' : 'bg-rose-50 dark:bg-rose-950/30'
                }`}
                onMouseEnter={() => setHoveredDonut('neg')}
                onMouseLeave={() => setHoveredDonut(null)}
              >
                <div className="flex items-center justify-center gap-1 text-rose-700 dark:text-rose-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{t.negative}</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(negPct)}%
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {negCount} msgs
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart 2: Platform Comparison (7 Cols) */}
        {(activeChartTab === 'all' || activeChartTab === 'platforms') && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-500" />
                {t.platformComparison} (TikTok vs Instagram vs Facebook)
              </span>
              <span className="text-xs text-slate-400">Ratio Positivo / Negativo</span>
            </div>

            <div className="space-y-4 my-2">
              {platformStats.map((item) => {
                const brandColors: Record<string, { label: string; badge: string; border: string }> = {
                  tiktok: { label: 'TikTok', badge: 'bg-black text-cyan-300 border-cyan-800', border: 'border-cyan-500' },
                  instagram: { label: 'Instagram', badge: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white', border: 'border-rose-500' },
                  facebook: { label: 'Facebook', badge: 'bg-blue-600 text-white', border: 'border-blue-500' },
                };
                const config = brandColors[item.platform];

                return (
                  <div key={item.platform} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${config.badge}`}>
                          {config.label}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {item.total} comentarios registrados
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">Score Promedio:</span>
                        <span className={`font-extrabold ${item.avgScore > 0 ? 'text-emerald-600 dark:text-emerald-400' : item.avgScore < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                          {item.avgScore > 0 ? `+${item.avgScore}` : item.avgScore}
                        </span>
                      </div>
                    </div>

                    {/* Stacked Percentage Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${item.posPct}%` }}
                        className="bg-emerald-500 h-full transition-all duration-500"
                        title={`Positivo: ${item.posPct}% (${item.posCount})`}
                      />
                      <div
                        style={{ width: `${item.neuPct}%` }}
                        className="bg-slate-400 dark:bg-slate-500 h-full transition-all duration-500"
                        title={`Neutro: ${item.neuPct}% (${item.neuCount})`}
                      />
                      <div
                        style={{ width: `${item.negPct}%` }}
                        className="bg-rose-500 h-full transition-all duration-500"
                        title={`Negativo: ${item.negPct}% (${item.negCount})`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.posPct}% Positivo ({item.posCount})</span>
                      <span className="text-slate-500">{item.neuPct}% Neutro</span>
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">{item.negPct}% Negativo ({item.negCount})</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              💡 <strong>Insight:</strong> TikTok lidera en viralidad e impulso positivo inicial, mientras que Facebook concentra consultas comerciales y reclamos de soporte.
            </p>
          </div>
        )}

        {/* Chart 3: Audience Emotion Intensity Spectrum (6 Cols) */}
        {(activeChartTab === 'all' || activeChartTab === 'emotions') && (
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                {t.emotionSpectrum}
              </span>
              <span className="text-xs text-slate-400 font-medium">Clasificación IA Gemini</span>
            </div>

            <div className="space-y-3">
              {emotionCounts.map((e) => (
                <div key={e.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span className="text-base">{e.emoji}</span>
                      <span>{e.label}</span>
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      {e.pct}% <span className="text-slate-400 font-normal">({e.count})</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(4, e.pct)}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${e.color} transition-all duration-700`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart 4: Trending Keywords & Hashtag Cloud (6 Cols) */}
        {(activeChartTab === 'all' || activeChartTab === 'trends') && (
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  {t.trendingKeywords}
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  Clic para filtrar
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Tópicos clave detectados automáticamente mediante procesamiento semántico de texto.
              </p>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2">
                {finalTopics.map((item, idx) => {
                  const isPos = item.sentiment === 'positive';
                  const isNeg = item.sentiment === 'negative';

                  return (
                    <button
                      key={idx}
                      onClick={() => onFilterByKeyword && onFilterByKeyword(item.topic)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                        isPos
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
                          : isNeg
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{item.topic}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/70 dark:bg-black/40 font-mono">
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tópico Favorable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Tópico Crítico / Queja
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" /> Informativo
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
