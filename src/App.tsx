/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { PlatformFilterBar } from './components/PlatformFilterBar';
import { KpiHero } from './components/KpiHero';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { AiExecutiveInsights } from './components/AiExecutiveInsights';
import { CommentsTable } from './components/CommentsTable';
import { CommentDetailModal } from './components/CommentDetailModal';
import { ImportModal } from './components/ImportModal';
import { ExportModal } from './components/ExportModal';
import { SocialIntegrationsModal } from './components/SocialIntegrationsModal';
import { initialComments, sampleLiveFeedPool } from './utils/mockPresets';
import {
  AnalysisSummary,
  EmotionType,
  Platform,
  SocialComment,
  SocialConnectionState,
  SupportedLanguage,
} from './types';
import { translations } from './i18n/translations';
import { Bell, Sparkles, AlertCircle, ExternalLink, Search, Trash2, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('es');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [comments, setComments] = useState<SocialComment[]>(initialComments);
  const [activeExtractedPost, setActiveExtractedPost] = useState<any | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [keywordFilter, setKeywordFilter] = useState<string | undefined>(undefined);

  // Modals state
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [detailComment, setDetailComment] = useState<SocialComment | null>(null);

  // Live Toast Notification
  const [liveToast, setLiveToast] = useState<string | null>(null);

  // Social Connections & Live Stream Simulator
  const [connections, setConnections] = useState<SocialConnectionState>({
    tiktokConnected: true,
    instagramConnected: true,
    facebookConnected: true,
    liveListenerActive: false,
    autoAnalyzeLive: true,
    syncIntervalSeconds: 10,
  });

  const t = translations[currentLanguage];

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Compute Platform Counts
  const platformCounts = useMemo(() => {
    return {
      all: comments.length,
      tiktok: comments.filter((c) => c.platform === 'tiktok').length,
      instagram: comments.filter((c) => c.platform === 'instagram').length,
      facebook: comments.filter((c) => c.platform === 'facebook').length,
    };
  }, [comments]);

  // Compute Aggregated Summary
  const summary: AnalysisSummary = useMemo(() => {
    const total = comments.length || 1;
    const pos = comments.filter((c) => c.sentiment === 'positive').length;
    const neg = comments.filter((c) => c.sentiment === 'negative').length;
    const neu = comments.filter((c) => c.sentiment === 'neutral' || !c.sentiment).length;
    const mix = comments.filter((c) => c.sentiment === 'mixed').length;
    const net = Math.round(((pos - neg) / total) * 100);
    const avgScore = Number(
      (
        comments.reduce((acc, curr) => acc + (curr.sentimentScore ?? 0), 0) / total
      ).toFixed(2)
    );

    return {
      totalCount: comments.length,
      positiveCount: pos,
      negativeCount: neg,
      neutralCount: neu,
      mixedCount: mix,
      netSentimentScore: net,
      averageScore: avgScore,
      executiveSummary:
        currentLanguage === 'en'
          ? `The analyzed audience on TikTok, Instagram, and Facebook reflects an overall net sentiment score of ${net > 0 ? '+' : ''}${net} points. Engagement is heavily propelled by aesthetic unboxing content and viral reach, balanced with specific customer concerns regarding delivery turnaround and DM support responsiveness.`
          : currentLanguage === 'pt'
          ? `O público analisado no TikTok, Instagram e Facebook reflete um sentimento geral com Net Sentiment Score de ${net > 0 ? '+' : ''}${net} pontos. O engajamento é impulsionado por estética visual e velocidade de entrega, com pontos de atenção no suporte ao cliente.`
          : currentLanguage === 'fr'
          ? `L'audience analysée sur TikTok, Instagram et Facebook affiche un score net de sentiment de ${net > 0 ? '+' : ''}${net} points. L'engouement est porté par l'attrait visuel des produits et la viralité, avec des attentes clés sur le service après-vente.`
          : `La audiencia analizada en TikTok, Instagram y Facebook refleja un Net Sentiment Score global de ${net > 0 ? '+' : ''}${net} puntos. La recepción positiva está liderada por la estética de los productos y la viralidad en TikTok, mientras que Facebook e Instagram concentran consultas de envíos y solicitudes de soporte técnico por DM.`,
      painPoints: [
        'Demoras percibidas en respuesta del equipo de soporte postventa',
        'Incertidumbre en costos adicionales de envío en compras nacionales',
        'Reportes aislados de lentitud o errores en la pasarela de pago',
      ],
      praises: [
        'Excelente recepción del empaque, calidad de materiales y presentación',
        'Alta recomendación boca a boca e impulso viral en TikTok',
        'Fidelidad y testimonios de compras recurrentes',
      ],
      actionableRecommendations: [
        'Publicar un video fijado en TikTok e Instagram resolviendo las 3 dudas más comunes sobre envíos y garantías.',
        'Implementar alertas prioritarias para comentarios con sentimiento negativo alto para responder en menos de 15 minutos.',
        'Convertir los comentarios de mayor entusiasmo en testimonios visuales para campañas pagadas.',
      ],
      lastAnalyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }, [comments, currentLanguage]);

  // Compute Dominant Emotion
  const dominantEmotion = useMemo(() => {
    const total = comments.length || 1;
    const emotionFreq: Record<string, number> = {};
    comments.forEach((c) => {
      const e = c.primaryEmotion || 'neutral';
      emotionFreq[e] = (emotionFreq[e] || 0) + 1;
    });

    let topEmotion: EmotionType = 'joy';
    let max = 0;
    Object.entries(emotionFreq).forEach(([e, count]) => {
      if (count > max) {
        max = count;
        topEmotion = e as EmotionType;
      }
    });

    return {
      emotion: topEmotion,
      count: max,
      percentage: Math.round((max / total) * 100),
    };
  }, [comments]);

  // Compute Critical Alerts Count
  const criticalCount = useMemo(() => {
    return comments.filter(
      (c) => c.sentiment === 'negative' && ((c.emotionalIntensity ?? 0) >= 7 || c.isSarcastic)
    ).length;
  }, [comments]);

  // Trigger AI Analysis with Gemini Server Route
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comments,
          language: currentLanguage,
        }),
      });

      if (!res.ok) throw new Error('Analysis request failed');
      const data = await res.json();

      if (data.comments && Array.isArray(data.comments)) {
        // Merge AI analysis results back into comments
        const analysisMap = new Map(data.comments.map((item: any) => [item.id, item]));

        setComments((prev) =>
          prev.map((c) => {
            const aiData: any = analysisMap.get(c.id);
            if (!aiData) return c;
            return {
              ...c,
              sentiment: aiData.sentiment || c.sentiment,
              sentimentScore: aiData.score !== undefined ? aiData.score : c.sentimentScore,
              primaryEmotion: aiData.primaryEmotion || c.primaryEmotion,
              emotionalIntensity: aiData.emotionalIntensity || c.emotionalIntensity,
              keywords: aiData.keywords || c.keywords,
              category: aiData.category || c.category,
              isSarcastic: aiData.isSarcastic !== undefined ? aiData.isSarcastic : c.isSarcastic,
              suggestedReply: aiData.suggestedReply || c.suggestedReply,
              reasoning: aiData.reasoning || c.reasoning,
            };
          })
        );
      }
    } catch (err) {
      console.error('AI Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle Star / Bookmark
  const handleToggleStar = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    );
  };

  // Delete comment
  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // Import New Comments (from URL, Presets, CSV, or Manual)
  const handleImportComments = (
    newComments: SocialComment[],
    autoAnalyze: boolean = false,
    replaceExisting: boolean = true,
    customSummary?: any,
    postInfo?: any
  ) => {
    if (replaceExisting) {
      // Clear previous comments and default examples!
      setComments(newComments);
      setActiveExtractedPost(postInfo || null);
      setKeywordFilter(undefined);
      setSelectedPlatform('all');

      if (postInfo?.author) {
        setLiveToast(`✓ Búsqueda activa: ${newComments.length} comentarios reales de @${postInfo.author}. Se limpiaron los datos anteriores.`);
      } else {
        setLiveToast(`✓ Se cargaron ${newComments.length} comentarios. Se limpiaron los datos anteriores.`);
      }
    } else {
      setComments((prev) => [...newComments, ...prev]);
    }

    if (autoAnalyze) {
      // Trigger instant analysis for the batch
      setTimeout(() => {
        handleRunAnalysis();
      }, 400);
    }
  };

  // Clear all comments
  const handleClearAllComments = () => {
    setComments([]);
    setActiveExtractedPost(null);
    setKeywordFilter(undefined);
    setLiveToast('Se han limpiado todos los comentarios.');
  };

  // Restore sample demo comments
  const handleRestoreSampleComments = () => {
    setComments(initialComments);
    setActiveExtractedPost(null);
    setKeywordFilter(undefined);
    setLiveToast('Se han restaurado los comentarios de ejemplo de prueba.');
  };

  // Live Stream Simulator Effect
  useEffect(() => {
    if (!connections.liveListenerActive) return;

    const interval = setInterval(() => {
      const randomSeed = sampleLiveFeedPool[Math.floor(Math.random() * sampleLiveFeedPool.length)];
      const newLiveComment: SocialComment = {
        ...randomSeed,
        id: `live-${Date.now()}`,
        timestamp: 'En vivo ahora',
      };

      setComments((prev) => [newLiveComment, ...prev]);
      setLiveToast(`Nuevo comentario entrante en ${newLiveComment.platform.toUpperCase()}: "${newLiveComment.content.slice(0, 45)}..."`);

      setTimeout(() => {
        setLiveToast(null);
      }, 4000);
    }, connections.syncIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [connections.liveListenerActive, connections.syncIntervalSeconds]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navigation Bar */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenIntegrations={() => setIsIntegrationsOpen(true)}
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
        liveActive={connections.liveListenerActive}
        onToggleLive={() =>
          setConnections((prev) => ({
            ...prev,
            liveListenerActive: !prev.liveListenerActive,
          }))
        }
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Live Stream Floating Toast Notification */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 shadow-2xl backdrop-blur-md max-w-md text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="flex-1 font-medium">{liveToast}</span>
          <button
            onClick={() => setLiveToast(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Active Post / Search Filter Banner */}
        {activeExtractedPost && (
          <div className="mb-4 p-4 rounded-3xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              {activeExtractedPost.authorAvatar ? (
                <img
                  src={activeExtractedPost.authorAvatar}
                  alt={activeExtractedPost.author}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {activeExtractedPost.author?.slice(0, 2).toUpperCase() || 'IG'}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {activeExtractedPost.authorHandle || `@${activeExtractedPost.author}`}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Búsqueda actual: {comments.length} comentarios reales
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Ejemplos anteriores eliminados
                  </span>
                </div>
                {activeExtractedPost.caption && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5 max-w-2xl">
                    "{activeExtractedPost.caption}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {activeExtractedPost.url && (
                <a
                  href={activeExtractedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Abrir post original"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setIsImportOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-all cursor-pointer shadow-2xs"
              >
                Buscar otra publicación
              </button>
              <button
                onClick={handleClearAllComments}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/40 transition-all cursor-pointer"
                title="Limpiar comentarios"
              >
                Limpiar
              </button>
            </div>
          </div>
        )}

        {/* Platform Selector Filter Bar */}
        <PlatformFilterBar
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(p) => {
            setSelectedPlatform(p);
            setKeywordFilter(undefined);
          }}
          counts={platformCounts}
          labels={{
            all: t.allPlatforms,
            tiktok: t.tiktok,
            instagram: t.instagram,
            facebook: t.facebook,
          }}
        />

        {/* Hero KPI Cards */}
        <KpiHero
          summary={summary}
          dominantEmotion={dominantEmotion}
          criticalCount={criticalCount}
          currentLanguage={currentLanguage}
        />

        {/* AI Executive Intelligence Card */}
        <AiExecutiveInsights
          summary={summary}
          currentLanguage={currentLanguage}
          onRegenerate={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />

        {/* Interactive Charts & Visual Trends */}
        <AnalyticsCharts
          comments={comments}
          summary={summary}
          currentLanguage={currentLanguage}
          onFilterByKeyword={(kw) => setKeywordFilter(kw)}
        />

        {/* Interactive Comments Table & Feed Manager */}
        <CommentsTable
          comments={comments}
          currentLanguage={currentLanguage}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          onOpenCommentDetail={(c) => setDetailComment(c)}
          onToggleStar={handleToggleStar}
          onDeleteComment={handleDeleteComment}
          keywordFilter={keywordFilter}
          onClearKeywordFilter={() => setKeywordFilter(undefined)}
          onClearAll={handleClearAllComments}
          onRestoreSamples={handleRestoreSampleComments}
          onOpenImport={() => setIsImportOpen(true)}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 mt-12 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">SentiSocial AI</span>
            <span>•</span>
            <span>TikTok, Instagram &amp; Facebook Intelligence Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Model: Gemini 3.8 Flash</span>
            <span>Export: PDF • Excel • CSV</span>
            <span>Multi-idioma: ES • EN • PT • FR</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportComments={handleImportComments}
        currentLanguage={currentLanguage}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        comments={comments}
        summary={summary}
        currentLanguage={currentLanguage}
        activePost={activeExtractedPost}
      />

      <SocialIntegrationsModal
        isOpen={isIntegrationsOpen}
        onClose={() => setIsIntegrationsOpen(false)}
        connections={connections}
        onToggleConnection={(key) =>
          setConnections((prev) => ({
            ...prev,
            [key]: !prev[key],
          }))
        }
        onToggleLiveListener={() =>
          setConnections((prev) => ({
            ...prev,
            liveListenerActive: !prev.liveListenerActive,
          }))
        }
        onUpdateSyncInterval={(sec) =>
          setConnections((prev) => ({
            ...prev,
            syncIntervalSeconds: sec,
          }))
        }
        currentLanguage={currentLanguage}
      />

      <CommentDetailModal
        comment={detailComment}
        isOpen={!!detailComment}
        onClose={() => setDetailComment(null)}
        currentLanguage={currentLanguage}
      />

    </div>
  );
}
