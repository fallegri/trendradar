import React, { useState, useEffect } from 'react';
import {
  X,
  Share2,
  CheckCircle2,
  Radio,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
  Key,
  Save,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SocialConnectionState, SupportedLanguage, UserSocialCredentials } from '../types';
import { translations } from '../i18n/translations';
import {
  getStoredCredentials,
  saveStoredCredentials,
  hasCredentialsForPlatform,
} from '../utils/credentialsStorage';

interface SocialIntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  connections: SocialConnectionState;
  onToggleConnection: (key: 'tiktokConnected' | 'instagramConnected' | 'facebookConnected') => void;
  onToggleLiveListener: () => void;
  onUpdateSyncInterval: (sec: number) => void;
  currentLanguage: SupportedLanguage;
}

export const SocialIntegrationsModal: React.FC<SocialIntegrationsModalProps> = ({
  isOpen,
  onClose,
  connections,
  onToggleConnection,
  onToggleLiveListener,
  onUpdateSyncInterval,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLanguage];

  const [credentials, setCredentials] = useState<UserSocialCredentials>(() => getStoredCredentials());
  const [expandedNetwork, setExpandedNetwork] = useState<string | null>('instagram');
  const [showPassword, setShowPassword] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setCredentials(getStoredCredentials());
  }, [isOpen]);

  const handleSave = () => {
    saveStoredCredentials(credentials);
    setTestResult({
      success: true,
      message: '✓ Credenciales guardadas localmente.',
    });
    setTimeout(() => setTestResult(null), 3500);
  };

  const handleTest = async (platformName: 'instagram' | 'youtube' | 'tiktok' | 'twitter') => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const payloadCreds: any = {};
      if (platformName === 'instagram') {
        payloadCreds.sessionId = credentials.instagram?.sessionId;
        payloadCreds.cookieString = credentials.instagram?.cookieString;
        payloadCreds.username = credentials.instagram?.username;
      } else if (platformName === 'youtube') {
        payloadCreds.apiKey = credentials.youtube?.apiKey;
      } else if (platformName === 'tiktok') {
        payloadCreds.sessionId = credentials.tiktok?.sessionId;
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
      setTestResult({
        success: !!data.valid,
        message: data.message || (data.valid ? 'Credencial verificada con éxito' : 'Credencial no validada'),
      });
      if (data.valid) {
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
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Error de conexión',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.integrationsTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configura credenciales de usuario para extraer comentarios sin límites o activa el simulador en vivo
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

        {/* Live Simulator Section */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${connections.liveListenerActive ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.liveStreamSimulator}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  connections.liveListenerActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {connections.liveListenerActive ? t.liveActive : t.liveInactive}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {t.liveStreamDesc}
              </p>
            </div>

            <button
              onClick={onToggleLiveListener}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                connections.liveListenerActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {connections.liveListenerActive ? 'Detener Transmisión' : 'Iniciar Transmisión'}
            </button>
          </div>

          {connections.liveListenerActive && (
            <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Frecuencia de comentarios entrantes:</span>
              <div className="flex items-center gap-1.5">
                {[5, 10, 20].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => onUpdateSyncInterval(sec)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      connections.syncIntervalSeconds === sec
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Cada {sec}s
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Credentials & Platform Settings */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              Credenciales de Usuario (Para recopilar &gt; 20 comentarios)
            </span>
            <span className="text-[11px] text-slate-400">
              Almacenamiento local seguro
            </span>
          </div>

          {/* Instagram Graph API & Session */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 transition-all">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
                  IG
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Instagram (Sesión &amp; Graph API)
                    </span>
                    {hasCredentialsForPlatform(credentials, 'instagram') ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Credenciales Activas
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        Solo Vista Pública
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Permite recopilar 30, 50 o 100+ comentarios reales en cualquier publicación
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedNetwork(expandedNetwork === 'instagram' ? null : 'instagram')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-500 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1"
              >
                <span>Configurar</span>
                {expandedNetwork === 'instagram' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {expandedNetwork === 'instagram' && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cookie de Sesión (sessionid):
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.instagram?.sessionId || ''}
                      onChange={(e) => {
                        const updated = {
                          ...credentials,
                          instagram: { ...credentials.instagram, sessionId: e.target.value },
                        };
                        setCredentials(updated);
                      }}
                      placeholder="Valor de la cookie sessionid desde instagram.com..."
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
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">
                    F12 -&gt; Aplicación -&gt; Cookies -&gt; instagram.com -&gt; sessionid
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTest('instagram')}
                      disabled={isTesting || !credentials.instagram?.sessionId}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 cursor-pointer disabled:opacity-40 flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>Probar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* YouTube Data API */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 transition-all">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
                  YT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      YouTube Data API v3
                    </span>
                    {hasCredentialsForPlatform(credentials, 'youtube') && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        API Configurada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Extracción de hasta 100 comentarios de videos y Shorts oficiales
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedNetwork(expandedNetwork === 'youtube' ? null : 'youtube')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-500 text-slate-700 dark:text-slate-200 cursor-pointer flex items-center gap-1"
              >
                <span>Configurar</span>
                {expandedNetwork === 'youtube' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {expandedNetwork === 'youtube' && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    API Key de YouTube:
                  </label>
                  <input
                    type="password"
                    value={credentials.youtube?.apiKey || ''}
                    onChange={(e) => {
                      const updated = {
                        ...credentials,
                        youtube: { ...credentials.youtube, apiKey: e.target.value },
                      };
                      setCredentials(updated);
                    }}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleTest('youtube')}
                    disabled={isTesting || !credentials.youtube?.apiKey}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 cursor-pointer disabled:opacity-40"
                  >
                    Probar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TikTok Connection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-cyan-400 flex items-center justify-center font-black text-cyan-400 text-sm shadow-xs">
                TT
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    TikTok Creator &amp; Business
                  </span>
                  {connections.tiktokConnected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {t.connected}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monitoreo de videos, comentarios virales y transmisión Live
                </p>
              </div>
            </div>

            <button
              onClick={() => onToggleConnection('tiktokConnected')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                connections.tiktokConnected
                  ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 hover:bg-slate-300'
                  : 'bg-black text-cyan-300 hover:bg-slate-900 border border-cyan-400'
              }`}
            >
              {connections.tiktokConnected ? t.disconnectBtn : t.connectBtn}
            </button>
          </div>

          {/* Facebook Connection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
                FB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Facebook Pages &amp; Ads
                  </span>
                  {connections.facebookConnected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {t.connected}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Publicaciones comunitarias, comentarios de anuncios y grupos
                </p>
              </div>
            </div>

            <button
              onClick={() => onToggleConnection('facebookConnected')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                connections.facebookConnected
                  ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 hover:bg-slate-300'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {connections.facebookConnected ? t.disconnectBtn : t.connectBtn}
            </button>
          </div>
        </div>

        {testResult && (
          <div className={`mt-3 p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            testResult.success
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-800 dark:text-rose-300'
          }`}>
            {testResult.success ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Security & Intelligence Badge */}
        <div className="mt-5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{t.apiKeyNote}</span>
        </div>

      </div>
    </div>
  );
};
