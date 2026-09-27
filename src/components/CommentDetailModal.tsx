import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Heart,
  MessageCircle,
  Tag,
  AlertTriangle,
  Send,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { SocialComment, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface CommentDetailModalProps {
  comment: SocialComment | null;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onUpdateTags?: (id: string, tags: string[]) => void;
}

export const CommentDetailModal: React.FC<CommentDetailModalProps> = ({
  comment,
  isOpen,
  onClose,
  currentLanguage,
  onUpdateTags,
}) => {
  if (!isOpen || !comment) return null;

  const t = translations[currentLanguage];
  const [copiedReply, setCopiedReply] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'friendly' | 'professional' | 'deescalate' | 'witty'>('friendly');
  const [customReply, setCustomReply] = useState(comment.suggestedReply || '');
  const [isGeneratingNewReply, setIsGeneratingNewReply] = useState(false);

  const handleCopyReply = () => {
    navigator.clipboard.writeText(customReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  const generateToneReply = async (tone: 'friendly' | 'professional' | 'deescalate' | 'witty') => {
    setSelectedTone(tone);
    setIsGeneratingNewReply(true);

    try {
      const res = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentText: comment.content,
          platform: comment.platform,
          tone,
          language: currentLanguage,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setCustomReply(data.reply);
      }
    } catch (err) {
      console.error('Failed to generate reply:', err);
    } finally {
      setIsGeneratingNewReply(false);
    }
  };

  const score = comment.sentimentScore ?? 0;
  const intensity = comment.emotionalIntensity ?? 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Análisis Detallado con IA Gemini
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspección neuronal de sentimiento, intención y propuesta de respuesta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comment Preview Card */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={comment.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={comment.author}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {comment.author}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {comment.authorHandle}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {comment.platform}
                </span>
                {comment.isRealExtracted && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    ✓ Real del Post
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">{comment.timestamp}</span>
            </div>
          </div>

          <p className="text-sm text-slate-800 dark:text-slate-200 font-medium my-2">
            "{comment.content}"
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <span className="flex items-center gap-1 font-semibold text-rose-500">
              <Heart className="w-3.5 h-3.5" /> {comment.likes} Me gusta
            </span>
            <span>📂 Categoría: <strong>{comment.category || 'General'}</strong></span>
          </div>
        </div>

        {/* Neural Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          
          {/* Sentiment Gauge Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Puntuación de Sentimiento
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-2xl font-black ${score > 0 ? 'text-emerald-500' : score < 0 ? 'text-rose-500' : 'text-slate-500'}`}>
                {score > 0 ? `+${score}` : score}
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                {comment.sentiment || 'Neutro'}
              </span>
            </div>
            
            <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${((score + 1) / 2) * 100}%` }}
                className={`h-full transition-all duration-500 ${score > 0 ? 'bg-emerald-500' : score < 0 ? 'bg-rose-500' : 'bg-slate-400'}`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>-1.0 Negativo</span>
              <span>0.0 Neutro</span>
              <span>+1.0 Positivo</span>
            </div>
          </div>

          {/* Emotional Radar & Sarcasm */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Emoción & Tono Detectado
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-base font-bold text-slate-900 dark:text-white capitalize flex items-center gap-1.5">
                <span>{comment.primaryEmotion === 'joy' ? '🎉' : comment.primaryEmotion === 'anger' ? '😡' : comment.primaryEmotion === 'curiosity' ? '🧐' : '✨'}</span>
                {comment.primaryEmotion || 'Neutro'}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Intensidad: {intensity}/10
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Sarcasmo / Ironía:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                comment.isSarcastic
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {comment.isSarcastic ? '⚠️ Detectado' : 'No detectado'}
              </span>
            </div>
          </div>

        </div>

        {/* AI Reasoning Text */}
        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300">
          <strong className="text-indigo-900 dark:text-indigo-300 block mb-1">
            🧠 Razonamiento del Modelo de IA:
          </strong>
          {comment.reasoning || 'Evaluación contextual semántica basada en el léxico utilizado, presencia de emojis y patrones gramaticales.'}
        </div>

        {/* Suggested Response Generator Section */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-indigo-500" />
              Respuesta Sugerida por IA
            </span>

            {/* Tone Selector */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => generateToneReply('friendly')}
                className={`px-2 py-1 rounded-lg font-medium cursor-pointer transition-all ${selectedTone === 'friendly' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                Amigable
              </button>
              <button
                onClick={() => generateToneReply('professional')}
                className={`px-2 py-1 rounded-lg font-medium cursor-pointer transition-all ${selectedTone === 'professional' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                Corporativo
              </button>
              <button
                onClick={() => generateToneReply('deescalate')}
                className={`px-2 py-1 rounded-lg font-medium cursor-pointer transition-all ${selectedTone === 'deescalate' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                Soporte
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={customReply}
              onChange={(e) => setCustomReply(e.target.value)}
              disabled={isGeneratingNewReply}
              className="w-full p-3 pr-24 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none font-normal"
              placeholder="Escribe o edita la respuesta..."
            />
            <button
              onClick={handleCopyReply}
              className="absolute right-3 bottom-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copiedReply ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReply ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Puedes copiar esta respuesta directamente para responder en TikTok, Instagram o Facebook.
          </p>
        </div>

      </div>
    </div>
  );
};
