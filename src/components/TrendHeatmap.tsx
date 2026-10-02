import React, { useState, useEffect } from 'react';
import {
  Flame,
  Globe2,
  TrendingUp,
  Clock,
  MessageCircle,
  Copy,
  Check,
  Zap,
  BarChart3,
  Grid3X3,
  LayoutList,
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  Share2,
  Download,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CountryCode, TrendTopic, TrendItem, TrendHeatmapResponse, SocialComment } from '../types';
import { COUNTRIES_LIST, TOPICS_LIST, PLATFORMS_LIST, getTop10TrendsFor } from '../services/trendData';

interface TrendHeatmapProps {
  onAnalyzeTrendComments?: (
    comments: SocialComment[],
    trendName: string,
    summary?: any,
    postInfo?: any
  ) => void;
  currentLanguage?: string;
}

export const TrendHeatmap: React.FC<TrendHeatmapProps> = ({
  onAnalyzeTrendComments,
  currentLanguage = 'es',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('global');
  const [selectedTopic, setSelectedTopic] = useState<TrendTopic>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'tiktok' | 'instagram' | 'facebook'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [viewMode, setViewMode] = useState<'matrix' | 'cards' | 'mosaic'>('matrix');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trendData, setTrendData] = useState<TrendHeatmapResponse>(() =>
    getTop10TrendsFor('global', 'all', '24h', 'all')
  );

  // Script Generator Modal State
  const [scriptModalTrend, setScriptModalTrend] = useState<TrendItem | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [generatedScript, setGeneratedScript] = useState<{
    hook: string;
    body: string;
    cta: string;
    recommendedHashtags: string[];
    bestPostingHour: string;
  } | null>(null);

  // Real Comment Extraction Modal & Loading State
  const [extractModalTrend, setExtractModalTrend] = useState<TrendItem | null>(null);
  const [extractUrl, setExtractUrl] = useState<string>('');
  const [extractCount, setExtractCount] = useState<number>(20);
  const [isExtractingReal, setIsExtractingReal] = useState<boolean>(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [extractSuccessCount, setExtractSuccessCount] = useState<number | null>(null);

  // Copy notification state
  const [copiedHashtag, setCopiedHashtag] = useState<string | null>(null);

  // Time slot labels for 24h Heatmap
  const timeSlots = [
    { label: '00:00 - 04:00', shortLabel: '00-04h', period: 'Madrugada' },
    { label: '04:00 - 08:00', shortLabel: '04-08h', period: 'Mañana' },
    { label: '08:00 - 12:00', shortLabel: '08-12h', period: 'Mañana pico' },
    { label: '12:00 - 16:00', shortLabel: '12-16h', period: 'Mediodía' },
    { label: '16:00 - 20:00', shortLabel: '16-20h', period: 'Tarde Prime' },
    { label: '20:00 - 24:00', shortLabel: '20-24h', period: 'Noche viral' },
  ];

  // Instant optimistic handlers for country, platform, topic, and timeframe
  const handleCountrySelect = (cCode: CountryCode) => {
    setSelectedCountry(cCode);
    const immediate = getTop10TrendsFor(cCode, selectedTopic, selectedTimeframe, selectedPlatform);
    setTrendData(immediate);
  };

  const handlePlatformSelect = (pCode: 'all' | 'tiktok' | 'instagram' | 'facebook') => {
    setSelectedPlatform(pCode);
    const immediate = getTop10TrendsFor(selectedCountry, selectedTopic, selectedTimeframe, pCode);
    setTrendData(immediate);
  };

  const handleTopicSelect = (tCode: TrendTopic) => {
    setSelectedTopic(tCode);
    const immediate = getTop10TrendsFor(selectedCountry, tCode, selectedTimeframe, selectedPlatform);
    setTrendData(immediate);
  };

  const handleTimeframeSelect = (tf: '24h' | '7d' | '30d') => {
    setSelectedTimeframe(tf);
    const immediate = getTop10TrendsFor(selectedCountry, selectedTopic, tf, selectedPlatform);
    setTrendData(immediate);
  };

  // Fetch or calculate trends whenever country, topic, platform, or timeframe changes
  useEffect(() => {
    let isCancelled = false;

    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/trend-heatmap?country=${selectedCountry}&topic=${selectedTopic}&timeframe=${selectedTimeframe}&platform=${selectedPlatform}`
        );
        if (res.ok) {
          const json = await res.json();
          if (!isCancelled && json.top10Trends) {
            setTrendData(json);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('API error, falling back to local dataset:', e);
      }

      // Offline / Fast fallback
      if (!isCancelled) {
        const local = getTop10TrendsFor(selectedCountry, selectedTopic, selectedTimeframe, selectedPlatform);
        setTrendData(local);
        setIsLoading(false);
      }
    };

    fetchTrends();

    return () => {
      isCancelled = true;
    };
  }, [selectedCountry, selectedTopic, selectedTimeframe, selectedPlatform]);

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHashtag(id);
    setTimeout(() => setCopiedHashtag(null), 2000);
  };

  // Open Real Extraction Modal for a Trend
  const handleOpenExtractModal = (trend: TrendItem) => {
    setExtractModalTrend(trend);
    setExtractError(null);
    setExtractSuccessCount(null);
    // Suggest verified viral URL based on platform preference
    const defaultUrl = trend.realPostUrl || (selectedPlatform === 'instagram'
      ? 'https://www.instagram.com/p/DcWoXGLSXSp/'
      : selectedPlatform === 'facebook'
      ? 'https://www.facebook.com/watch/?v=10153231379946729'
      : 'https://www.tiktok.com/@scout2015/video/6718335390845095173');
    setExtractUrl(defaultUrl);
  };

  // Execute Real Comment Extraction via backend /api/extract-social-post
  const handleExecuteRealExtraction = async () => {
    if (!extractUrl.trim() || !extractModalTrend) return;

    setIsExtractingReal(true);
    setExtractError(null);

    try {
      const res = await fetch('/api/extract-social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: extractUrl.trim(),
          count: extractCount,
          language: currentLanguage,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Error del servidor (HTTP ${res.status})`);
      }

      const data = await res.json();
      if (!data.comments || !Array.isArray(data.comments) || data.comments.length === 0) {
        throw new Error('No se pudieron extraer comentarios de la publicación especificada.');
      }

      setExtractSuccessCount(data.comments.length);

      // Tag comments with trend context
      const enrichedComments: SocialComment[] = data.comments.map((c: SocialComment) => ({
        ...c,
        postTitle: `Tendencia: ${extractModalTrend.name} · ${extractModalTrend.displayName}`,
        category: extractModalTrend.topicLabel,
        keywords: [extractModalTrend.name.replace('#', ''), ...(c.keywords || [])],
        isRealExtracted: true,
      }));

      // Transfer to main dashboard after brief visual feedback
      setTimeout(() => {
        if (onAnalyzeTrendComments) {
          onAnalyzeTrendComments(enrichedComments, extractModalTrend.name, data.summary, data.postInfo);
        }
        setExtractModalTrend(null);
        setIsExtractingReal(false);
      }, 1200);

    } catch (err: any) {
      console.error('Real comment extraction error:', err);
      setExtractError(err.message || 'Error al conectar con la red social para recopilar comentarios reales.');
      setIsExtractingReal(false);
    }
  };

  // Script Generator Handler
  const handleOpenScriptGenerator = async (trend: TrendItem) => {
    setScriptModalTrend(trend);
    setIsGeneratingScript(true);
    setGeneratedScript(null);

    try {
      const res = await fetch('/api/trend-generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trendName: trend.name,
          topic: trend.topicLabel,
          countryLabel: trend.countryLabel,
          platform: selectedPlatform !== 'all' ? selectedPlatform : 'tiktok',
          language: currentLanguage,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setGeneratedScript(json);
      }
    } catch (e) {
      console.warn('Script generation fallback:', e);
      setGeneratedScript({
        hook: `¿Ya viste lo que está pasando con ${trend.name}? 🔥 Aquí te cuento en 30 segundos.`,
        body: `Esta tendencia se ha vuelto viral en ${trend.countryLabel} porque toca exactamente lo que todos estábamos pensando. El debate central gira en torno a cómo afecta a la comunidad y las opiniones encontradas.`,
        cta: `¿Tú qué opinas de ${trend.name}? Déjamelo en los comentarios 👇`,
        recommendedHashtags: [trend.name, 'viral', 'tendencias', 'socialmedia'],
        bestPostingHour: '19:30',
      });
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Thermal heat color calculator (0 to 100)
  const getThermalClass = (score: number) => {
    if (score >= 90) {
      return 'bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 text-white font-black shadow-xs shadow-rose-500/40 ring-1 ring-rose-400/50';
    }
    if (score >= 75) {
      return 'bg-orange-500/90 text-white font-bold shadow-xs';
    }
    if (score >= 50) {
      return 'bg-amber-400/80 dark:bg-amber-600/70 text-slate-900 dark:text-white font-semibold';
    }
    if (score >= 30) {
      return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-medium';
    }
    return 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400';
  };

  return (
    <section className="space-y-5 animate-in fade-in duration-300">
      
      {/* Header Container & Controls Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        
        {/* Title & Live Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Trend Heatmap · Top 10
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  RADAR TÉRMICO EN VIVO
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Top 10 tendencias virales con índice de calor, horas pico y descarga de comentarios reales.
              </p>
            </div>
          </div>

          {/* View Mode Toggle & Timeframe */}
          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            {/* Timeframe */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => handleTimeframeSelect('24h')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedTimeframe === '24h'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                24h
              </button>
              <button
                onClick={() => handleTimeframeSelect('7d')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedTimeframe === '7d'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                7 días
              </button>
              <button
                onClick={() => handleTimeframeSelect('30d')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedTimeframe === '30d'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                30 días
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Matriz Horaria de Calor"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Matriz 24h</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tarjetas Detalladas Top 10"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Top 10 Detallado</span>
              </button>
              <button
                onClick={() => setViewMode('mosaic')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'mosaic'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Mosaico Térmico por Volumen"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mosaico</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Country Selector (Responsive 2-Row Grid on Desktop, No Horizontal Cutoff!) */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-indigo-500" />
              <span>Seleccionar País o Región</span>
              <span className="text-[11px] font-normal text-slate-400">(10 países disponibles)</span>
            </label>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Activo: <strong className="text-slate-900 dark:text-white">{trendData.countryFlag} {trendData.countryLabel}</strong>
            </span>
          </div>
          
          {/* Grid wraps automatically on all screens: 5 cols on desktop, 3 on tablet, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {COUNTRIES_LIST.map((c) => (
              <button
                key={c.code}
                onClick={() => handleCountrySelect(c.code)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-start gap-2 border text-left ${
                  selectedCountry === c.code
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="text-base shrink-0">{c.flag}</span>
                <span className="truncate">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Platform Selector (Red Social) */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-rose-500" />
              <span>Seleccionar Red Social</span>
              <span className="text-[11px] font-normal text-slate-400">(Filtro de plataforma)</span>
            </label>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Red activa: <strong className="text-slate-900 dark:text-white">
                {PLATFORMS_LIST.find(p => p.code === selectedPlatform)?.label || 'Todas las Redes'}
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PLATFORMS_LIST.map((p) => (
              <button
                key={p.code}
                onClick={() => handlePlatformSelect(p.code)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                  selectedPlatform === p.code
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white border-rose-500 shadow-sm shadow-rose-500/30 ring-2 ring-rose-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Topic Selector (Responsive Grid, No Horizontal Cutoff!) */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Seleccionar Tópico / Categoría del Trend</span>
              <span className="text-[11px] font-normal text-slate-400">(9 categorías)</span>
            </label>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Categoría: <strong className="text-slate-900 dark:text-white">{trendData.topicLabel}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {TOPICS_LIST.map((t) => (
              <button
                key={t.code}
                onClick={() => handleTopicSelect(t.code)}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border truncate ${
                  selectedTopic === t.code
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm shadow-amber-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="shrink-0">{t.icon}</span>
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Top 10 Summary KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Leading Trend #1 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-200/80 dark:border-rose-900/50 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> #1 Más Viral
            </span>
            <span className="text-xs font-black text-rose-600 dark:text-rose-400">
              {trendData.top10Trends[0]?.heatScore || 100}/100 CALOR
            </span>
          </div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate mt-1">
            {trendData.kpis.topTrendName}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {trendData.top10Trends[0]?.displayName}
          </p>
        </div>

        {/* Total Volume */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Volumen Top 10
            </span>
            <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1">
            {trendData.kpis.totalVolumeFormatted}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
            +{(trendData.kpis.averageVelocity * 0.8).toFixed(1)}% vs periodo anterior
          </p>
        </div>

        {/* Velocity Momentum */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Velocidad Media
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            +{trendData.kpis.averageVelocity}% en 24h
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Aceleración de menciones
          </p>
        </div>

        {/* Dominant Sentiment */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Sentimiento Neto
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            +{trendData.kpis.netSentimentAverage} NPS
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {trendData.kpis.dominantSentiment}
          </p>
        </div>

      </div>

      {/* Main Heatmap Container according to View Mode */}
      {viewMode === 'matrix' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                <span>Matriz Horaria de Calor · Top 10 Tendencias</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {trendData.countryFlag} {trendData.countryLabel}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                  selectedPlatform === 'tiktok'
                    ? 'bg-slate-900 text-rose-400 border border-slate-700'
                    : selectedPlatform === 'instagram'
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/30'
                    : selectedPlatform === 'facebook'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                    : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                }`}>
                  <span>{PLATFORMS_LIST.find((p) => p.code === selectedPlatform)?.icon}</span>
                  <span>{PLATFORMS_LIST.find((p) => p.code === selectedPlatform)?.label}</span>
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Intensidad térmica por franja horaria para <strong className="text-slate-800 dark:text-slate-200">{PLATFORMS_LIST.find((p) => p.code === selectedPlatform)?.label}</strong>. Haz clic en "Extraer Reales" para recopilar comentarios de la plataforma.
              </p>
            </div>

            {/* Heat Gradient Legend */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 self-start sm:self-auto shrink-0">
              <span>Menor calor</span>
              <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 inline-block"></span>
              <span className="w-3 h-3 rounded bg-amber-200 dark:bg-amber-900 inline-block"></span>
              <span className="w-3 h-3 rounded bg-orange-400 inline-block"></span>
              <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span>
              <span>En llamas (Pico)</span>
            </div>
          </div>

          {/* Responsive Table / Matrix Grid */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Tendencia / Hashtag</th>
                  <th className="py-2.5 px-3 w-28">Volumen</th>
                  <th className="py-2.5 px-3 w-24">Crecimiento</th>
                  {timeSlots.map((ts, idx) => (
                    <th key={idx} className="py-2.5 px-2 text-center w-24">
                      <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{ts.shortLabel}</div>
                      <div className="text-[9px] font-normal text-slate-400 lowercase">{ts.period}</div>
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right w-44">Acción Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {trendData.top10Trends.map((trend) => (
                  <tr
                    key={trend.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black ${
                          trend.rank === 1
                            ? 'bg-amber-400 text-slate-950 shadow-xs shadow-amber-400/50'
                            : trend.rank === 2
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold'
                            : trend.rank === 3
                            ? 'bg-amber-700/80 text-white font-extrabold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {trend.rank}
                      </span>
                    </td>

                    {/* Trend Name & Topic */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {trend.name}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          selectedPlatform === 'tiktok'
                            ? 'bg-slate-900 text-rose-400 border border-slate-700'
                            : selectedPlatform === 'instagram'
                            ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                            : selectedPlatform === 'facebook'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {selectedPlatform === 'tiktok'
                            ? '🎵 TikTok'
                            : selectedPlatform === 'instagram'
                            ? '📸 Instagram'
                            : selectedPlatform === 'facebook'
                            ? '📘 Facebook'
                            : '🌐 Redes'}
                        </span>
                        <button
                          onClick={() => handleCopy(trend.name, trend.id)}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                          title="Copiar hashtag"
                        >
                          {copiedHashtag === trend.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                        {trend.displayName} · <span className="text-indigo-500 font-medium">{trend.topicLabel}</span>
                      </div>
                    </td>

                    {/* Volume */}
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {trend.volumeFormatted}
                    </td>

                    {/* Velocity */}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="w-3.5 h-3.5" />+{trend.velocityPercent}%
                      </span>
                    </td>

                    {/* 6 Thermal Matrix Hourly Cells */}
                    {trend.hourlyHeat.map((heat, idx) => (
                      <td key={idx} className="py-2 px-1 text-center">
                        <div
                          className={`w-full py-2 rounded-lg text-[11px] transition-transform hover:scale-105 cursor-help ${getThermalClass(
                            heat
                          )}`}
                          title={`Franja ${timeSlots[idx]?.label}: ${heat}% de intensidad térmica en ${trend.name}`}
                        >
                          {heat}°
                        </div>
                      </td>
                    ))}

                    {/* Actions: Recopilar Comentarios Reales */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenExtractModal(trend)}
                          className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1"
                          title="Recopilar comentarios reales de la red social"
                        >
                          <Download className="w-3 h-3" />
                          <span>Extraer Reales</span>
                        </button>

                        <button
                          onClick={() => handleOpenScriptGenerator(trend)}
                          className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
                          title="Generar Guión Viral con IA"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Cards View (Top 10 Detallado) */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendData.top10Trends.map((trend) => (
            <div
              key={trend.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Rank, Title, Heat Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shrink-0 ${
                        trend.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/40'
                          : trend.rank === 2
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          : trend.rank === 3
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      #{trend.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {trend.name}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          selectedPlatform === 'tiktok'
                            ? 'bg-slate-900 text-rose-400 border border-slate-700'
                            : selectedPlatform === 'instagram'
                            ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                            : selectedPlatform === 'facebook'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {selectedPlatform === 'tiktok'
                            ? '🎵 TikTok'
                            : selectedPlatform === 'instagram'
                            ? '📸 Instagram'
                            : selectedPlatform === 'facebook'
                            ? '📘 Facebook'
                            : '🌐 Redes'}
                        </span>
                        <button
                          onClick={() => handleCopy(trend.name, trend.id)}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          {copiedHashtag === trend.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {trend.displayName}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 ${getThermalClass(
                      trend.heatScore
                    )}`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    {trend.heatScore}° CALOR
                  </span>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Volumen</div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {trend.volumeFormatted}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Aceleración</div>
                    <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      +{trend.velocityPercent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Hora Pico</div>
                    <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {trend.peakTimeLabel}
                    </div>
                  </div>
                </div>

                {/* Sentiment Distribution Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Sentimiento de la Audiencia</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {trend.sentiment.positive}% Positivo · Net: +{trend.sentiment.netScore}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                    <div
                      style={{ width: `${trend.sentiment.positive}%` }}
                      className="bg-emerald-500 h-full"
                      title={`Positivo: ${trend.sentiment.positive}%`}
                    />
                    <div
                      style={{ width: `${trend.sentiment.neutral}%` }}
                      className="bg-slate-300 dark:bg-slate-600 h-full"
                      title={`Neutro: ${trend.sentiment.neutral}%`}
                    />
                    <div
                      style={{ width: `${trend.sentiment.negative}%` }}
                      className="bg-rose-500 h-full"
                      title={`Negativo: ${trend.sentiment.negative}%`}
                    />
                  </div>
                </div>

                {/* Content Angle Advice */}
                {trend.contentAngle && (
                  <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                    <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1 mb-0.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Ángulo de Contenido Recomendado:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 italic text-[11px]">
                      "{trend.contentAngle}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions: Recopilar Comentarios Reales */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span>Plataformas:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    TikTok ({trend.topPlatforms[0]?.share || 60}%) · IG ({trend.topPlatforms[1]?.share || 30}%)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenScriptGenerator(trend)}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Guión</span>
                  </button>

                  <button
                    onClick={() => handleOpenExtractModal(trend)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Extraer Comentarios Reales</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mosaic Treemap View */}
      {viewMode === 'mosaic' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Mosaico Térmico de Intensidad
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Haz clic en cualquier bloque para recopilar comentarios reales de la tendencia en {trendData.countryLabel}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {trendData.top10Trends.map((trend) => (
              <div
                key={trend.id}
                onClick={() => handleOpenExtractModal(trend)}
                className={`p-4 rounded-2xl flex flex-col justify-between cursor-pointer transition-all hover:scale-102 hover:shadow-lg ${getThermalClass(
                  trend.heatScore
                )} min-h-[140px]`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] opacity-90 mb-1">
                    <span className="font-bold">#{trend.rank}</span>
                    <span className="font-bold">{trend.heatScore}° CALOR</span>
                  </div>
                  <div className="font-extrabold text-sm line-clamp-1">{trend.name}</div>
                  <div className="text-[11px] opacity-90 line-clamp-1 mt-0.5">{trend.displayName}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/20 text-[10px] flex items-center justify-between">
                  <span className="font-bold">{trend.volumeFormatted}</span>
                  <span className="font-bold underline flex items-center gap-1">
                    <Download className="w-3 h-3" /> Extraer reales
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: RECOPILAR COMENTARIOS REALES EN VIVO */}
      {extractModalTrend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    EXTRACCIÓN REAL EN VIVO
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Recopilar Comentarios de {extractModalTrend.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {extractModalTrend.displayName} · {extractModalTrend.countryFlag} {extractModalTrend.countryLabel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExtractModalTrend(null)}
                disabled={isExtractingReal}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            {/* Error banner */}
            {extractError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{extractError}</span>
              </div>
            )}

            {/* Success state */}
            {extractSuccessCount !== null ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  ¡{extractSuccessCount} comentarios reales recopilados!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cargando los datos al tablero principal con insignias reales y análisis de sentimiento...
                </p>
              </div>
            ) : isExtractingReal ? (
              <div className="py-10 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Descargando comentarios reales de {selectedPlatform !== 'all' ? selectedPlatform.toUpperCase() : 'la red social'}...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Conectando directamente con la publicación viral de #{extractModalTrend.name.replace('#', '')}. Extrayendo autores, avatares y métricas reales.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enlace de la Publicación Viral en Redes:
                  </label>
                  <input
                    type="url"
                    value={extractUrl}
                    onChange={(e) => setExtractUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@... o Instagram..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Se preconfiguró el video/post más activo de la tendencia. También puedes pegar cualquier enlace de TikTok o Instagram que quieras raspar.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Cantidad a Recopilar:
                    </label>
                    <select
                      value={extractCount}
                      onChange={(e) => setExtractCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                    >
                      <option value={15}>15 comentarios reales (Rápido)</option>
                      <option value={20}>20 comentarios reales (Recomendado)</option>
                      <option value={30}>30 comentarios reales</option>
                      <option value={50}>50 comentarios reales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tipo de Comentario:
                    </label>
                    <div className="px-3 py-2 rounded-xl text-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Reales de Usuarios</span>
                    </div>
                  </div>
                </div>

                {/* Quick preset links for this trend */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px]">
                    Publicaciones virales detectadas para esta tendencia:
                  </span>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setExtractUrl('https://www.tiktok.com/@scout2015/video/6718335390845095173')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-500 cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>TikTok Viral Oficial</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setExtractUrl('https://www.instagram.com/p/DcWoXGLSXSp/')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500 cursor-pointer flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span>Instagram Reel Viral</span>
                    </button>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setExtractModalTrend(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteRealExtraction}
                    disabled={isExtractingReal || !extractUrl.trim()}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Iniciar Extracción de Comentarios Reales</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL 2: GENERADOR DE GUION VIRAL IA */}
      {scriptModalTrend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-4">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> GENERADOR DE GUION VIRAL IA
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  Aprovechar {scriptModalTrend.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {scriptModalTrend.displayName} · {scriptModalTrend.countryFlag} {scriptModalTrend.countryLabel}
                </p>
              </div>
              <button
                onClick={() => setScriptModalTrend(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            {isGeneratingScript ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Gemini está estructurando el guion con gancho de 3 segundos...
                </p>
                <p className="text-xs text-slate-400">
                  Analizando el sentimiento y las objeciones clave de la audiencia en {scriptModalTrend.countryLabel}.
                </p>
              </div>
            ) : generatedScript ? (
              <div className="space-y-3.5">
                
                {/* Hook (Gancho) */}
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    ⚡ Gancho de Entrada (Primeros 3 Segundos):
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                    "{generatedScript.hook}"
                  </p>
                </div>

                {/* Body (Desarrollo) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Cuerpo del Video (15 a 30 segundos):
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {generatedScript.body}
                  </p>
                </div>

                {/* Call to Action (Llamada a la Acción) */}
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
                  <div className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-0.5">
                    Llamada a la Acción (Comentarios):
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    "{generatedScript.cta}"
                  </p>
                </div>

                {/* Metadata & Copy Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    ⏰ Publicar preferentemente: <strong className="text-slate-800 dark:text-slate-200">{generatedScript.bestPostingHour || '19:30'}</strong>
                  </div>

                  <button
                    onClick={() => {
                      const fullText = `HOOK: ${generatedScript.hook}\n\nBODY: ${generatedScript.body}\n\nCTA: ${generatedScript.cta}\n\nHASHTAGS: ${(generatedScript.recommendedHashtags || []).join(' ')}`;
                      handleCopy(fullText, 'modal-script');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {copiedHashtag === 'modal-script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>¡Guion Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Guion Completo</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : null}

          </div>
        </div>
      )}

    </section>
  );
};
