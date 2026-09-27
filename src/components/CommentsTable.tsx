import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Sparkles,
  MessageCircle,
  Heart,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Trash2,
  SlidersHorizontal,
  ThumbsUp,
} from 'lucide-react';
import { EmotionType, Platform, SentimentType, SocialComment, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface CommentsTableProps {
  comments: SocialComment[];
  currentLanguage: SupportedLanguage;
  selectedPlatform: Platform;
  onSelectPlatform: (p: Platform) => void;
  onOpenCommentDetail: (c: SocialComment) => void;
  onToggleStar: (id: string) => void;
  onDeleteComment: (id: string) => void;
  keywordFilter?: string;
  onClearKeywordFilter?: () => void;
  onClearAll?: () => void;
  onRestoreSamples?: () => void;
  onOpenImport?: () => void;
}

export const CommentsTable: React.FC<CommentsTableProps> = ({
  comments,
  currentLanguage,
  selectedPlatform,
  onSelectPlatform,
  onOpenCommentDetail,
  onToggleStar,
  onDeleteComment,
  keywordFilter,
  onClearKeywordFilter,
  onClearAll,
  onRestoreSamples,
  onOpenImport,
}) => {
  const t = translations[currentLanguage];

  const [searchQuery, setSearchQuery] = useState(keywordFilter || '');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'likes' | 'highScore' | 'lowScore'>('recent');
  const [starredOnly, setStarredOnly] = useState(false);
  const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);

  // Keep search in sync if prop changes
  React.useEffect(() => {
    if (keywordFilter !== undefined) {
      setSearchQuery(keywordFilter);
    }
  }, [keywordFilter]);

  // Filter logic
  const filteredComments = useMemo(() => {
    return comments.filter((c) => {
      // Platform filter
      if (selectedPlatform !== 'all' && c.platform !== selectedPlatform) return false;

      // Starred filter
      if (starredOnly && !c.starred) return false;

      // Sentiment filter
      if (selectedSentiment !== 'all' && c.sentiment !== selectedSentiment) return false;

      // Emotion filter
      if (selectedEmotion !== 'all' && c.primaryEmotion !== selectedEmotion) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesContent = (c.content || '').toLowerCase().includes(q);
        const matchesAuthor = (c.author || '').toLowerCase().includes(q) || (c.authorHandle || '').toLowerCase().includes(q);
        const matchesKeywords = (c.keywords || []).some(k => k.toLowerCase().includes(q));
        const matchesCategory = (c.category || '').toLowerCase().includes(q);
        if (!matchesContent && !matchesAuthor && !matchesKeywords && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
      if (sortBy === 'highScore') return (b.sentimentScore ?? 0) - (a.sentimentScore ?? 0);
      if (sortBy === 'lowScore') return (a.sentimentScore ?? 0) - (b.sentimentScore ?? 0);
      return 0; // Default recent
    });
  }, [comments, selectedPlatform, starredOnly, selectedSentiment, selectedEmotion, searchQuery, sortBy]);

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

  const platformBadge = (p: 'tiktok' | 'instagram' | 'facebook') => {
    if (p === 'tiktok') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-black text-cyan-300 border border-cyan-800">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> TikTok
        </span>
      );
    }
    if (p === 'instagram') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Instagram
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-600 text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span> Facebook
      </span>
    );
  };

  const sentimentPill = (sentiment?: SentimentType, score?: number) => {
    if (sentiment === 'positive') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t.positive}</span>
          <span className="font-mono text-[10px] ml-0.5 opacity-90">{score !== undefined ? `+${score}` : '+0.8'}</span>
        </span>
      );
    }
    if (sentiment === 'negative') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>{t.negative}</span>
          <span className="font-mono text-[10px] ml-0.5 opacity-90">{score !== undefined ? `${score}` : '-0.7'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <span>{t.neutral}</span>
        <span className="font-mono text-[10px] ml-0.5 opacity-80">{score !== undefined ? `${score}` : '0.0'}</span>
      </span>
    );
  };

  return (
    <div className="w-full my-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xs">
      
      {/* Table Header & Controls */}
      <div className="flex flex-col gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-500" />
              {t.feedTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.showingComments.replace('{count}', filteredComments.length.toString()).replace('{total}', comments.length.toString())}
            </p>
          </div>

          {/* Quick Filter: Starred Toggle & Clear/Restore */}
          <div className="flex items-center gap-2">
            {onClearAll && comments.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-all cursor-pointer"
                title={t.clearAllComments}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearAllComments}</span>
              </button>
            )}

            {onRestoreSamples && comments.length === 0 && (
              <button
                onClick={onRestoreSamples}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer"
              >
                <span>{t.restoreSampleComments}</span>
              </button>
            )}

            <button
              onClick={() => setStarredOnly(!starredOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                starredOnly
                  ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${starredOnly ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>{t.starredOnly}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Box (6 Cols) */}
          <div className="sm:col-span-2 lg:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (onClearKeywordFilter) onClearKeywordFilter();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sentiment Filter Dropdown (2 Cols) */}
          <div className="lg:col-span-3">
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer font-medium"
            >
              <option value="all">{t.filterSentiment}: {t.filterAll}</option>
              <option value="positive">🟢 {t.positive}</option>
              <option value="neutral">⚪ {t.neutral}</option>
              <option value="negative">🔴 {t.negative}</option>
              <option value="mixed">🟣 {t.mixed}</option>
            </select>
          </div>

          {/* Emotion Filter Dropdown (2 Cols) */}
          <div className="lg:col-span-2">
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer font-medium"
            >
              <option value="all">{t.filterEmotion}: {t.filterAll}</option>
              <option value="joy">🎉 Alegría</option>
              <option value="love">❤️ Admiración</option>
              <option value="curiosity">🧐 Curiosidad</option>
              <option value="frustration">😤 Frustración</option>
              <option value="anger">😡 Enojo</option>
              <option value="sarcasm">😏 Sarcasmo</option>
            </select>
          </div>

          {/* Sort By Dropdown (2 Cols) */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer font-medium"
            >
              <option value="recent">{t.sortRecent}</option>
              <option value="likes">{t.sortLikes}</option>
              <option value="highScore">{t.sortHighestScore}</option>
              <option value="lowScore">{t.sortLowestScore}</option>
            </select>
          </div>

        </div>

      </div>

      {/* Comments List Grid */}
      {filteredComments.length === 0 ? (
        <div className="py-14 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mb-3 shadow-xs">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {comments.length === 0 ? 'No hay comentarios cargados' : t.noCommentsFound}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {comments.length === 0
              ? 'Realiza una nueva búsqueda ingresando el enlace de Instagram, TikTok o Facebook, o recarga los ejemplos de prueba.'
              : 'Prueba ajustando los filtros de plataforma, sentimiento o borra el término de búsqueda.'}
          </p>
          {comments.length === 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {onOpenImport && (
                <button
                  onClick={onOpenImport}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all cursor-pointer"
                >
                  Extraer Comentarios por URL
                </button>
              )}
              {onRestoreSamples && (
                <button
                  onClick={onRestoreSamples}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  Restaurar Ejemplos de Prueba
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="py-4 sm:py-5 flex flex-col sm:flex-row items-start justify-between gap-4 group hover:bg-slate-50/60 dark:hover:bg-slate-800/40 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl transition-colors"
            >
              
              {/* Left Column: Author, Platform, Content, Metadata */}
              <div className="flex items-start gap-3 w-full">
                
                {/* Avatar with Platform Indicator */}
                <div className="relative shrink-0">
                  <img
                    src={comment.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {comment.platform === 'tiktok' && <div className="w-4 h-4 rounded-full bg-black border border-white flex items-center justify-center text-[8px] text-cyan-400">tt</div>}
                    {comment.platform === 'instagram' && <div className="w-4 h-4 rounded-full bg-rose-500 border border-white flex items-center justify-center text-[8px] text-white">ig</div>}
                    {comment.platform === 'facebook' && <div className="w-4 h-4 rounded-full bg-blue-600 border border-white flex items-center justify-center text-[8px] text-white">fb</div>}
                  </div>
                </div>

                {/* Comment Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {comment.author}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {comment.authorHandle}
                    </span>
                    <span className="text-[11px] text-slate-400">• {comment.timestamp}</span>
                    {platformBadge(comment.platform)}
                    
                    {/* Real Extracted Badge */}
                    {comment.isRealExtracted && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Real
                      </span>
                    )}

                    {/* Sarcasm flag */}
                    {comment.isSarcastic && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        😏 Sarcasmo
                      </span>
                    )}
                  </div>

                  {/* Comment Text */}
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    {comment.content}
                  </p>

                  {/* AI Tags & Keywords */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-2">
                    {comment.primaryEmotion && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <span>{emotionEmojis[comment.primaryEmotion] || '✨'}</span>
                        <span className="capitalize">{comment.primaryEmotion}</span>
                      </span>
                    )}

                    {comment.category && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        📂 {comment.category}
                      </span>
                    )}

                    {(comment.keywords || []).slice(0, 3).map((kw, i) => (
                      <span key={i} className="text-[11px] text-slate-500 dark:text-slate-400">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  {/* Social Counters */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> {comment.likes} likes
                    </span>
                    {comment.repliesCount !== undefined && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-indigo-400" /> {comment.repliesCount} respuestas
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* Right Column: Sentiment Badge & AI Action Triggers */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2">
                
                <div className="flex items-center gap-2">
                  {sentimentPill(comment.sentiment, comment.sentimentScore)}
                  
                  {/* Star Toggle */}
                  <button
                    onClick={() => onToggleStar(comment.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                    title={comment.starred ? 'Desmarcar' : 'Destacar comentario'}
                  >
                    <Star className={`w-4 h-4 ${comment.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Inspect with AI Button */}
                <div className="flex items-center gap-1.5 mt-1">
                  <button
                    onClick={() => onOpenCommentDetail(comment)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.viewAiDetails}</span>
                  </button>

                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    title="Eliminar comentario"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
