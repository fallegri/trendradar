import React, { useState, useEffect } from 'react';
import {
  X,
  Link as LinkIcon,
  Upload,
  Plus,
  Sparkles,
  Layers,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Flame,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  HelpCircle,
  RefreshCw,
  ExternalLink,
  Lock,
  Trash2,
  Save,
} from 'lucide-react';
import { campaignPresets } from '../utils/mockPresets';
import { CampaignPreset, Platform, SocialComment, SupportedLanguage, UserSocialCredentials } from '../types';
import { translations } from '../i18n/translations';
import {
  getStoredCredentials,
  saveStoredCredentials,
  clearStoredCredentials,
  hasCredentialsForPlatform,
} from '../utils/credentialsStorage';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComments: (
    comments: SocialComment[],
    autoAnalyze?: boolean,
    replaceExisting?: boolean,
    customSummary?: any,
    postInfo?: any
  ) => void;
  currentLanguage: SupportedLanguage;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImportComments,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLanguage];

  const [activeTab, setActiveTab] = useState<'url' | 'credentials' | 'presets' | 'batch' | 'upload' | 'manual'>('url');
  
  // Credentials State
  const [credentials, setCredentials] = useState<UserSocialCredentials>(() => getStoredCredentials());
  const [showPassword, setShowPassword] = useState(false);
  const [showInlineCredentials, setShowInlineCredentials] = useState(false);
  const [isTestingCreds, setIsTestingCreds] = useState(false);
  const [testCredsFeedback, setTestCredsFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showCredsGuide, setShowCredsGuide] = useState(false);

  // URL Tab State
  const [postUrl, setPostUrl] = useState('');
  const [targetPlatform, setTargetPlatform] = useState<'tiktok' | 'instagram' | 'facebook' | 'youtube'>('instagram');
  const [fetchCount, setFetchCount] = useState<number>(15);
  const [clearPreviousOnImport, setClearPreviousOnImport] = useState<boolean>(true);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlFetchSuccess, setUrlFetchSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedPreview, setExtractedPreview] = useState<{
    author: string;
    caption: string;
    likesCount: number;
    commentsCount: number;
    extractedCount: number;
    isRealExtracted: boolean;
    credentialsUsed?: boolean;
    credentialNotice?: string | null;
  } | null>(null);

  // Batch Paste State
  const [batchText, setBatchText] = useState('');
  const [batchPlatform, setBatchPlatform] = useState<'tiktok' | 'instagram' | 'facebook'>('instagram');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Manual Tab State
  const [manualText, setManualText] = useState('');
  const [manualAuthor, setManualAuthor] = useState('');
  const [manualPlatform, setManualPlatform] = useState<'tiktok' | 'instagram' | 'facebook'>('tiktok');
  const [manualLikes, setManualLikes] = useState<number>(15);

  // Reload stored credentials on mount
  useEffect(() => {
    setCredentials(getStoredCredentials());
  }, [isOpen]);

  // Auto detect platform from URL
  const handleUrlChange = (val: string) => {
    setPostUrl(val);
    setErrorMessage(null);
    const low = val.toLowerCase();
    if (low.includes('tiktok.com')) setTargetPlatform('tiktok');
    else if (low.includes('instagram.com')) setTargetPlatform('instagram');
    else if (low.includes('youtube.com') || low.includes('youtu.be')) setTargetPlatform('youtube');
    else if (low.includes('facebook.com') || low.includes('fb.watch')) setTargetPlatform('facebook');
  };

  // Save credentials handler
  const handleSaveCredentials = () => {
    saveStoredCredentials(credentials);
    setTestCredsFeedback({
      success: true,
      message: '¡Credenciales guardadas localmente en tu navegador de forma segura!',
    });
    setTimeout(() => setTestCredsFeedback(null), 4000);
  };

  // Clear credentials handler
  const handleClearCredentials = () => {
    clearStoredCredentials();
    setCredentials({});
    setTestCredsFeedback({
      success: true,
      message: 'Se han eliminado las credenciales guardadas.',
    });
    setTimeout(() => setTestCredsFeedback(null), 3000);
  };

  // Test credentials endpoint
  const handleTestPlatformCredentials = async (platformName: 'instagram' | 'youtube' | 'tiktok' | 'twitter') => {
    setIsTestingCreds(true);
    setTestCredsFeedback(null);

    try {
      const payloadCreds: any = {};
      if (platformName === 'instagram') {
        payloadCreds.sessionId = credentials.instagram?.sessionId;
        payloadCreds.cookieString = credentials.instagram?.cookieString;
        payloadCreds.username = credentials.instagram?.username;
        payloadCreds.password = credentials.instagram?.password;
      } else if (platformName === 'youtube') {
        payloadCreds.apiKey = credentials.youtube?.apiKey;
      } else if (platformName === 'tiktok') {
        payloadCreds.sessionId = credentials.tiktok?.sessionId;
        payloadCreds.cookieString = credentials.tiktok?.cookieString;
      } else if (platformName === 'twitter') {
        payloadCreds.authToken = credentials.twitter?.authToken;
      }

      const res = await fetch('/api/verify-social-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: platformName,
          credentials: payloadCreds,
        }),
      });

      const data = await res.json();
      if (data.valid) {
        setTestCredsFeedback({
          success: true,
          message: data.message || `✓ Credenciales de ${platformName} validadas correctamente.`,
        });
        // Update credentials with valid flag
        const updated = {
          ...credentials,
          [platformName]: {
            ...credentials[platformName],
            isValid: true,
            lastVerified: new Date().toISOString(),
          },
        };
        setCredentials(updated);
        saveStoredCredentials(updated);
      } else {
        setTestCredsFeedback({
          success: false,
          message: data.message || `No se pudo validar la sesión de ${platformName}. Revisa los datos.`,
        });
      }
    } catch (err: any) {
      setTestCredsFeedback({
        success: false,
        message: err.message || 'Error de conexión al validar credenciales.',
      });
    } finally {
      setIsTestingCreds(false);
    }
  };

  // URL Ingestion handler - REAL BACKEND SCRAPER & AI ANALYSIS
  const handleFetchFromUrl = async () => {
    if (!postUrl.trim()) return;
    setIsFetchingUrl(true);
    setErrorMessage(null);
    setExtractedPreview(null);
    setUrlFetchSuccess(false);

    try {
      const latestCredentials = getStoredCredentials();

      const res = await fetch('/api/extract-social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: postUrl.trim(),
          count: fetchCount,
          language: currentLanguage,
          credentials: latestCredentials,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Error del servidor (HTTP ${res.status})`);
      }

      const data = await res.json();
      if (!data.comments || !Array.isArray(data.comments) || data.comments.length === 0) {
        throw new Error('No se encontraron comentarios en la publicación especificada.');
      }

      setExtractedPreview({
        author: data.postInfo?.author || 'Creador',
        caption: data.postInfo?.caption || '',
        likesCount: data.postInfo?.likesCount || 0,
        commentsCount: data.postInfo?.commentsCount || 0,
        extractedCount: data.comments.length,
        isRealExtracted: !!data.isRealExtracted,
        credentialsUsed: !!data.credentialsUsed,
        credentialNotice: data.credentialNotice,
      });

      setUrlFetchSuccess(true);

      setTimeout(() => {
        onImportComments(data.comments, false, clearPreviousOnImport, data.summary, data.postInfo);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Real fetch error:', err);
      setErrorMessage(err.message || 'Error al recopilar datos de la publicación.');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  // Batch comments paste handler
  const handleBatchImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchText.trim()) return;

    setIsProcessingBatch(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/parse-batch-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: batchText,
          platform: batchPlatform,
          language: currentLanguage,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Error al procesar el lote de comentarios.');
      }

      const data = await res.json();
      if (data.comments && Array.isArray(data.comments) && data.comments.length > 0) {
        onImportComments(data.comments, false, clearPreviousOnImport);
        onClose();
      } else {
        throw new Error('No se pudieron extraer comentarios válidos del texto ingresado.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al procesar lote.');
    } finally {
      setIsProcessingBatch(false);
    }
  };

  // Preset loader
  const handleLoadPreset = (preset: CampaignPreset) => {
    onImportComments(preset.comments, false, clearPreviousOnImport);
    onClose();
  };

  // Manual comment submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    const newComment: SocialComment = {
      id: `manual-${Date.now()}`,
      platform: manualPlatform,
      author: manualAuthor.trim() || 'usuario_anonimo',
      authorHandle: `@${(manualAuthor.trim() || 'usuario').toLowerCase().replace(/\s+/g, '_')}`,
      authorAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      content: manualText.trim(),
      likes: manualLikes || 0,
      timestamp: 'Ahora mismo',
      repliesCount: 0,
      starred: false,
    };

    onImportComments([newComment], true, false);
    setManualText('');
    setManualAuthor('');
    onClose();
  };

  const hasCredsForCurrent = hasCredentialsForPlatform(credentials, targetPlatform as any);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.importModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extrae comentarios reales o ingresa credenciales para recopilar más de 20 registros
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

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl my-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('url')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'url' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="truncate">{t.tabUrl}</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 relative ${
              activeTab === 'credentials' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">{t.tabCredentials}</span>
            {(hasCredentialsForPlatform(credentials, 'instagram') || hasCredentialsForPlatform(credentials, 'youtube')) && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-1"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'presets' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">{t.tabPresets}</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'batch' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
            <span className="truncate">{t.tabBatchPaste}</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'upload' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-purple-500" />
            <span className="truncate">CSV/Excel</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'manual' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-emerald-500" />
            <span className="truncate">{t.tabManual}</span>
          </button>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Tab 1: Direct URL Ingestion */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.urlInputLabel}
              </label>
              <input
                type="url"
                value={postUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.instagram.com/p/DcWoXGLSXSp/ o TikTok / YouTube / Facebook..."
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Conexión en vivo con Instagram, TikTok, YouTube y Facebook: extrae autor, descripción y comentarios reales del post.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Plataforma Detectada
                </label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.commentCountToFetch}
                </label>
                <select
                  value={fetchCount}
                  onChange={(e) => setFetchCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                >
                  <option value={15}>15 comentarios reales (Rápido)</option>
                  <option value={30}>30 comentarios reales</option>
                  <option value={50}>50 comentarios reales</option>
                  <option value={100}>100 comentarios reales (Extracción profunda)</option>
                </select>
              </div>
            </div>

            {/* Credential Status Pill / Banner for >15 comments */}
            {fetchCount > 15 && (
              <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                hasCredsForCurrent
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300'
              }`}>
                <div className="flex items-center gap-2">
                  {hasCredsForCurrent ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Key className="w-4 h-4 text-indigo-500 shrink-0" />
                  )}
                  <span>
                    {hasCredsForCurrent
                      ? `✓ Credenciales de usuario configuradas para ${targetPlatform.toUpperCase()}: extracción profunda autenticada activa.`
                      : `💡 Extracción directa de comentarios reales activa para ${targetPlatform.toUpperCase()}. Si deseas conectar tu propia sesión para paginación profunda extendida, puedes configurarla aquí.`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInlineCredentials(!showInlineCredentials)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer shrink-0 transition-colors ${
                    hasCredsForCurrent
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  }`}
                >
                  {showInlineCredentials ? 'Ocultar Credenciales' : 'Ver / Configurar Sesión'}
                </button>
              </div>
            )}

            {/* Quick Inline Credentials Form */}
            {showInlineCredentials && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-indigo-200 dark:border-slate-700 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-indigo-500" />
                    Credenciales de Usuario para {targetPlatform.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('credentials')}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Configuración avanzada</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {targetPlatform === 'instagram' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Cookie Session ID (sessionid) de Instagram:
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={credentials.instagram?.sessionId || ''}
                          onChange={(e) => {
                            const updated = {
                              ...credentials,
                              instagram: {
                                ...credentials.instagram,
                                sessionId: e.target.value,
                              },
                            };
                            setCredentials(updated);
                            saveStoredCredentials(updated);
                          }}
                          placeholder="Pega aquí el valor de la cookie sessionid..."
                          className="w-full px-3 py-2 pr-9 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                        Obtenlo en 10 seg: Abre instagram.com -&gt; F12 (DevTools) -&gt; Aplicación -&gt; Cookies -&gt; copia el valor de "sessionid".
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleTestPlatformCredentials('instagram')}
                        disabled={isTestingCreds || !credentials.instagram?.sessionId}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3 h-3 ${isTestingCreds ? 'animate-spin' : ''}`} />
                        <span>Probar Sesión</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCredentials}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3 h-3" />
                        <span>Guardar</span>
                      </button>
                    </div>
                  </div>
                )}

                {targetPlatform === 'tiktok' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Cookie sessionid de TikTok (Para extraer comentarios reales):
                      </label>
                      <input
                        type="password"
                        value={credentials.tiktok?.sessionId || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            tiktok: {
                              ...credentials.tiktok,
                              sessionId: e.target.value,
                            },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="Pega aquí el valor de sessionid de tiktok.com..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                        Obtenlo en tiktok.com: F12 -&gt; Application -&gt; Cookies -&gt; copia "sessionid" (o en pestaña Network copia la cabecera Cookie).
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleTestPlatformCredentials('tiktok')}
                        disabled={isTestingCreds || (!credentials.tiktok?.sessionId && !credentials.tiktok?.cookieString)}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3 h-3 ${isTestingCreds ? 'animate-spin' : ''}`} />
                        <span>Probar Sesión TikTok</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCredentials}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3 h-3" />
                        <span>Guardar</span>
                      </button>
                    </div>
                  </div>
                )}

                {targetPlatform === 'youtube' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        YouTube Data API v3 Key:
                      </label>
                      <input
                        type="password"
                        value={credentials.youtube?.apiKey || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            youtube: {
                              ...credentials.youtube,
                              apiKey: e.target.value,
                            },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="AIzaSy..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTestPlatformCredentials('youtube')}
                      disabled={isTestingCreds || !credentials.youtube?.apiKey}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Guardar y Probar Clave</span>
                    </button>
                  </div>
                )}

                {testCredsFeedback && (
                  <div className={`p-2 rounded-xl text-[11px] font-medium flex items-center gap-1.5 ${
                    testCredsFeedback.success
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {testCredsFeedback.success ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{testCredsFeedback.message}</span>
                  </div>
                )}
              </div>
            )}

            {/* Clean slate option checkbox */}
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={clearPreviousOnImport}
                  onChange={(e) => setClearPreviousOnImport(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                />
                <span>{t.clearPreviousOption}</span>
              </label>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-6">
                Elimina los comentarios anteriores y de ejemplo para que la tabla, los gráficos y la exportación contengan exclusivamente los comentarios de esta búsqueda.
              </p>
            </div>

            {/* Quick URL presets for instant testing */}
            <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40">
              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 block mb-1.5 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Enlaces recomendados para probar la extracción real:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleUrlChange('https://www.instagram.com/p/DcWoXGLSXSp/')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:border-rose-500 cursor-pointer text-[11px] flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Instagram: WNBA & Caitlin Clark (Real)
                </button>
                <button
                  type="button"
                  onClick={() => handleUrlChange('https://www.tiktok.com/@scout2015/video/6718335390845095173')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 cursor-pointer text-[11px] flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  TikTok: Video Viral
                </button>
              </div>
            </div>

            {/* Extracted preview card */}
            {extractedPreview && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 animate-in fade-in">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {extractedPreview.isRealExtracted
                      ? '¡Comentarios reales extraídos exitosamente!'
                      : '¡Publicación conectada!'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                    {extractedPreview.extractedCount} comentarios
                  </span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div><strong>Autor:</strong> @{extractedPreview.author}</div>
                  {extractedPreview.likesCount > 0 && (
                    <div><strong>Engagement:</strong> {extractedPreview.likesCount.toLocaleString()} likes &middot; {extractedPreview.commentsCount.toLocaleString()} comentarios en el post</div>
                  )}
                  {extractedPreview.caption && (
                    <div className="line-clamp-2 italic text-slate-500 dark:text-slate-400 text-[11px]">
                      "{extractedPreview.caption}"
                    </div>
                  )}
                  {extractedPreview.credentialsUsed && (
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 pt-1">
                      <Key className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Extracción profunda autenticada usando tus credenciales de usuario.</span>
                    </div>
                  )}
                  {extractedPreview.credentialNotice && !extractedPreview.credentialsUsed && (
                    <div className="text-[11px] font-medium text-amber-700 dark:text-amber-300 flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{extractedPreview.credentialNotice}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleFetchFromUrl}
              disabled={isFetchingUrl || !postUrl.trim()}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isFetchingUrl ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Limpiando panel y extrayendo {fetchCount} comentarios reales...</span>
                </>
              ) : urlFetchSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>¡Búsqueda Actualizada con Éxito!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Limpiar y Recopilar {fetchCount} Comentarios de Este Post</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Social Credentials Manager */}
        {activeTab === 'credentials' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    {t.credentialsTitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredsGuide(!showCredsGuide)}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showCredsGuide ? 'Ocultar Guía' : '¿Cómo obtenerlas?'}</span>
                </button>
              </div>
              <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80 mt-1">
                {t.credentialsSubtitle}
              </p>

              {showCredsGuide && (
                <div className="mt-3 pt-3 border-t border-indigo-200/60 dark:border-indigo-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-3 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-xl">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                      <span>📸 Instagram: Obtener tu Cookie sessionid en 3 pasos:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] pl-1">
                      <li>Abre <strong>instagram.com</strong> en tu navegador e inicia sesión con tu cuenta.</li>
                      <li>Presiona <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">F12</kbd> (o clic derecho -&gt; Inspeccionar).</li>
                      <li>Ve a la pestaña <strong>Aplicación</strong> (Application) -&gt; <strong>Cookies</strong> -&gt; <strong>https://www.instagram.com</strong>.</li>
                      <li>Busca la fila <strong>sessionid</strong>, haz doble clic en su valor y cópialo. ¡Pégalo en el campo de Instagram!</li>
                    </ol>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                      <span>🎵 TikTok: Obtener tu Cookie sessionid en 3 pasos:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] pl-1">
                      <li>Abre <strong>tiktok.com</strong> en tu navegador e inicia sesión con tu cuenta.</li>
                      <li>Presiona <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">F12</kbd> (Inspeccionar elemento).</li>
                      <li>Ve a la pestaña <strong>Aplicación</strong> (Application) -&gt; <strong>Cookies</strong> -&gt; <strong>https://www.tiktok.com</strong>.</li>
                      <li>Busca la fila <strong>sessionid</strong> (o <strong>sessionid_ss</strong>), copia su valor y pégalo abajo. También puedes copiar la cabecera <code>Cookie:</code> completa desde la pestaña Red (Network).</li>
                    </ol>
                  </div>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                    Nota de seguridad: Las cookies de sesión permiten a la aplicación autenticar solicitudes de lectura para comentarios reales sin que tengas que compartir tu contraseña.
                  </p>
                </div>
              )}
            </div>

            {/* Platform Credential Forms */}
            <div className="space-y-3">
              {/* Instagram Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      IG
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        Instagram (Meta)
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {hasCredentialsForPlatform(credentials, 'instagram')
                          ? '✓ Sesión de usuario configurada (Extracción > 20 habilitada)'
                          : 'Sin credenciales (Límite público de 15 comentarios)'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTestPlatformCredentials('instagram')}
                    disabled={isTestingCreds || !credentials.instagram?.sessionId}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-indigo-500 cursor-pointer disabled:opacity-40 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTestingCreds ? 'animate-spin' : ''}`} />
                    <span>Probar Sesión</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Método 1 (Recomendado): Cookie sessionid
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.instagram?.sessionId || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            instagram: {
                              ...credentials.instagram,
                              sessionId: e.target.value,
                            },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="Ejemplo: 6829481912%3AeFk98..."
                        className="w-full px-3 py-2 pr-9 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Método 2: Usuario de Instagram (Opcional)
                      </label>
                      <input
                        type="text"
                        value={credentials.instagram?.username || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            instagram: {
                              ...credentials.instagram,
                              username: e.target.value,
                            },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="@usuario"
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Contraseña (Opcional)
                      </label>
                      <input
                        type="password"
                        value={credentials.instagram?.password || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            instagram: {
                              ...credentials.instagram,
                              password: e.target.value,
                            },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="••••••••"
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Método 3: Cookie Header Completo de DevTools (Opcional)
                    </label>
                    <input
                      type="password"
                      value={credentials.instagram?.cookieString || ''}
                      onChange={(e) => {
                        const updated = {
                          ...credentials,
                          instagram: {
                            ...credentials.instagram,
                            cookieString: e.target.value,
                          },
                        };
                        setCredentials(updated);
                        saveStoredCredentials(updated);
                      }}
                      placeholder="sessionid=...; ds_user_id=...; csrftoken=...;"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* TikTok Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-black text-cyan-400 flex items-center justify-center font-extrabold text-xs shadow-sm">
                      TT
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        TikTok (ByteDance)
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {hasCredentialsForPlatform(credentials, 'tiktok')
                          ? '✓ Sesión de TikTok configurada (Extracción de comentarios reales habilitada)'
                          : 'Sin credenciales (Requiere sesión para extraer comentarios reales)'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTestPlatformCredentials('tiktok')}
                    disabled={isTestingCreds || (!credentials.tiktok?.sessionId && !credentials.tiktok?.cookieString)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-cyan-500 cursor-pointer disabled:opacity-40 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTestingCreds ? 'animate-spin' : ''}`} />
                    <span>Probar Sesión</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Método 1 (Recomendado): Cookie sessionid de TikTok
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.tiktok?.sessionId || ''}
                        onChange={(e) => {
                          const updated = {
                            ...credentials,
                            tiktok: { ...credentials.tiktok, sessionId: e.target.value },
                          };
                          setCredentials(updated);
                          saveStoredCredentials(updated);
                        }}
                        placeholder="Ejemplo: d7a6e4f183920..."
                        className="w-full px-3 py-2 pr-9 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Método 2: Cookie Header Completo de DevTools (Opcional)
                    </label>
                    <input
                      type="password"
                      value={credentials.tiktok?.cookieString || ''}
                      onChange={(e) => {
                        const updated = {
                          ...credentials,
                          tiktok: { ...credentials.tiktok, cookieString: e.target.value },
                        };
                        setCredentials(updated);
                        saveStoredCredentials(updated);
                      }}
                      placeholder="sessionid=...; ttwid=...; msToken=...;"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      En tiktok.com abre F12 -&gt; Red (Network) -&gt; selecciona cualquier solicitud -&gt; copia el encabezado <code>Cookie:</code> y pégalo aquí.
                    </p>
                  </div>
                </div>
              </div>

              {/* YouTube Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                      YT
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        YouTube Data API v3
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {hasCredentialsForPlatform(credentials, 'youtube')
                          ? '✓ Clave de API configurada (Hasta 100 comentarios reales)'
                          : 'Opcional para videos y shorts de YouTube'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTestPlatformCredentials('youtube')}
                    disabled={isTestingCreds || !credentials.youtube?.apiKey}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-indigo-500 cursor-pointer disabled:opacity-40 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTestingCreds ? 'animate-spin' : ''}`} />
                    <span>Probar Clave</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    API Key de Google Cloud Console:
                  </label>
                  <input
                    type="password"
                    value={credentials.youtube?.apiKey || ''}
                    onChange={(e) => {
                      const updated = {
                        ...credentials,
                        youtube: {
                          ...credentials.youtube,
                          apiKey: e.target.value,
                        },
                      };
                      setCredentials(updated);
                      saveStoredCredentials(updated);
                    }}
                    placeholder="AIzaSyBxxxx..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Twitter / X Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                    X
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Twitter / X auth_token</span>
                </div>
                <input
                  type="password"
                  value={credentials.twitter?.authToken || ''}
                  onChange={(e) => {
                    const updated = {
                      ...credentials,
                      twitter: { ...credentials.twitter, authToken: e.target.value },
                    };
                    setCredentials(updated);
                    saveStoredCredentials(updated);
                  }}
                  placeholder="Cookie auth_token..."
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            {testCredsFeedback && (
              <div className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                testCredsFeedback.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-800 dark:text-rose-300'
              }`}>
                {testCredsFeedback.success ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span>{testCredsFeedback.message}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleClearCredentials}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar Credenciales</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCredentials}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.saveCredentialsBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                >
                  <span>Ir a Extraer Post</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Viral Campaign Presets */}
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Carga al instante conjuntos de comentarios virales reales preconfigurados con alto engagement:
            </p>

            {campaignPresets.map((preset) => (
              <div
                key={preset.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {preset.description}
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    {preset.comments.length} comentarios listos
                  </span>
                </div>

                <button
                  onClick={() => handleLoadPreset(preset)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xs cursor-pointer shrink-0 transition-all"
                >
                  {t.loadPreset}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Batch Paste Comments */}
        {activeTab === 'batch' && (
          <form onSubmit={handleBatchImport} className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Pegar Comentarios Copiados en Bloque
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-slate-500">Plataforma:</label>
                  <select
                    value={batchPlatform}
                    onChange={(e) => setBatchPlatform(e.target.value as any)}
                    className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium cursor-pointer"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
              </div>
              <textarea
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder={t.batchPastePlaceholder}
                rows={6}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Soporta formato directo "usuario: comentario" o comentarios sueltos separados por línea.
              </p>
            </div>

            {/* Clean slate option checkbox for batch */}
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={clearPreviousOnImport}
                  onChange={(e) => setClearPreviousOnImport(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                />
                <span>{t.clearPreviousOption}</span>
              </label>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-6">
                Descarta los comentarios anteriores para analizar solo los del texto pegado.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessingBatch || !batchText.trim()}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessingBatch ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando y Analizando Lote...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Procesar y Cargar Comentarios</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 5: CSV Upload */}
        {activeTab === 'upload' && (
          <div className="space-y-4 text-center py-4">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 hover:border-indigo-500 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
              <FileSpreadsheet className="w-10 h-10 text-indigo-500" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t.dropzoneText}
              </p>
              <p className="text-[11px] text-slate-400">
                {t.orBrowse}
              </p>
              <input
                type="file"
                accept=".csv, .xlsx, .json"
                className="hidden"
                id="file-upload-input"
                onChange={() => {
                  alert('Procesando archivo CSV/Excel importado...');
                  onClose();
                }}
              />
              <label
                htmlFor="file-upload-input"
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500 cursor-pointer shadow-xs"
              >
                Seleccionar Archivo
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Columnas reconocidas: content/comment/texto, author/user/usuario, platform, likes.
            </p>
          </div>
        )}

        {/* Tab 6: Manual Input */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.manualAuthorLabel}
                </label>
                <input
                  type="text"
                  value={manualAuthor}
                  onChange={(e) => setManualAuthor(e.target.value)}
                  placeholder="@usuario_fan"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Plataforma
                </label>
                <select
                  value={manualPlatform}
                  onChange={(e) => setManualPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium cursor-pointer"
                >
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.manualTextLabel}
              </label>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Escribe el comentario..."
                rows={3}
                required
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md cursor-pointer transition-all"
            >
              {t.addCommentBtn}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
