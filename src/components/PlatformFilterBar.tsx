import React from 'react';
import { Platform } from '../types';

interface PlatformFilterBarProps {
  selectedPlatform: Platform;
  onSelectPlatform: (p: Platform) => void;
  counts: {
    all: number;
    tiktok: number;
    instagram: number;
    facebook: number;
  };
  labels: {
    all: string;
    tiktok: string;
    instagram: string;
    facebook: string;
  };
}

export const PlatformFilterBar: React.FC<PlatformFilterBarProps> = ({
  selectedPlatform,
  onSelectPlatform,
  counts,
  labels,
}) => {
  return (
    <div className="w-full flex items-center justify-between flex-wrap gap-3 py-2 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
        
        {/* All Platforms */}
        <button
          onClick={() => onSelectPlatform('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedPlatform === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>{labels.all}</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedPlatform === 'all'
                ? 'bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-800'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {counts.all}
          </span>
        </button>

        {/* TikTok */}
        <button
          onClick={() => onSelectPlatform('tiktok')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedPlatform === 'tiktok'
              ? 'bg-black text-white dark:bg-black dark:text-cyan-300 ring-2 ring-cyan-400 shadow-sm shadow-cyan-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span>{labels.tiktok}</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedPlatform === 'tiktok'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {counts.tiktok}
          </span>
        </button>

        {/* Instagram */}
        <button
          onClick={() => onSelectPlatform('instagram')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedPlatform === 'instagram'
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm shadow-rose-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
          <span>{labels.instagram}</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedPlatform === 'instagram'
                ? 'bg-rose-950/80 text-rose-200'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {counts.instagram}
          </span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => onSelectPlatform('facebook')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedPlatform === 'facebook'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          <span>{labels.facebook}</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedPlatform === 'facebook'
                ? 'bg-blue-900 text-blue-200'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {counts.facebook}
          </span>
        </button>

      </div>
    </div>
  );
};
