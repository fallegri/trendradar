import React from 'react';
import {
  Sparkles,
  Download,
  Share2,
  PlusCircle,
  Radio,
  Globe,
  RefreshCw,
  Sun,
  Moon,
  Activity,
  Key,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenImport: () => void;
  onOpenExport: () => void;
  onOpenIntegrations: () => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  liveActive: boolean;
  onToggleLive: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenImport,
  onOpenExport,
  onOpenIntegrations,
  onRunAnalysis,
  isAnalyzing,
  liveActive,
  onToggleLive,
  darkMode,
  onToggleDarkMode,
}) => {
  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 shadow-md shadow-purple-500/20 text-white font-bold text-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-900 dark:from-white dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent">
                  SentiSocial
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI v3.8
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400 font-medium">
                TikTok • Instagram • Facebook
              </p>
            </div>
          </div>

          {/* Center Actions / Live Status */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200 dark:border-slate-800">
            <button
              onClick={onToggleLive}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
                liveActive
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
              title={liveActive ? 'Pausar simulador en vivo' : 'Activar simulador en vivo'}
            >
              <Radio className={`w-3.5 h-3.5 ${liveActive ? 'animate-pulse' : ''}`} />
              <span>{t.liveSync}: {liveActive ? t.liveActive : t.liveInactive}</span>
            </button>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <button
              onClick={onOpenIntegrations}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.tabCredentials}</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Run Analysis Button */}
            <button
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="relative inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isAnalyzing ? t.analyzing : t.runAnalysis}
              </span>
              <span className="sm:hidden">{isAnalyzing ? 'IA...' : 'Analizar'}</span>
            </button>

            {/* Ingest / Import Button */}
            <button
              onClick={onOpenImport}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              title={t.importComments}
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              <span className="hidden md:inline">{t.importComments}</span>
              <span className="md:hidden">Recopilar</span>
            </button>

            {/* Export Button */}
            <button
              onClick={onOpenExport}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              title={t.exportData}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
              <span className="hidden lg:inline">{t.exportData}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-1"
                  aria-label="Seleccionar idioma"
                >
                  <option value="es" className="dark:bg-slate-900">🇪🇸 ES</option>
                  <option value="en" className="dark:bg-slate-900">🇺🇸 EN</option>
                  <option value="pt" className="dark:bg-slate-900">🇧🇷 PT</option>
                  <option value="fr" className="dark:bg-slate-900">🇫🇷 FR</option>
                </select>
              </div>
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
