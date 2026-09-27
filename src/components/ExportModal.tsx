import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  FileSpreadsheet,
  FileCheck,
  Check,
  Filter,
} from 'lucide-react';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';
import { AnalysisSummary, SocialComment, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: SocialComment[];
  summary: AnalysisSummary | null;
  currentLanguage: SupportedLanguage;
  activePost?: any;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  comments,
  summary,
  currentLanguage,
  activePost,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLanguage];
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const prefix = activePost?.author ? `sentisocial_${activePost.author}` : 'sentisocial';

    if (format === 'csv') {
      exportToCSV(comments, `${prefix}_comments_${timestamp}.csv`);
      setDownloadSuccess('CSV');
    } else if (format === 'excel') {
      exportToExcel(comments, summary, `${prefix}_report_${timestamp}.xlsx`);
      setDownloadSuccess('Excel');
    } else if (format === 'pdf') {
      exportToPDF(comments, summary, `${prefix}_executive_report_${timestamp}.pdf`, currentLanguage);
      setDownloadSuccess('PDF');
    }

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.exportModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.exportSubtitle}
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

        {/* Dataset Summary Pill */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Registros listos para exportar:
            </span>
            <span className="font-bold text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {comments.length} comentarios
            </span>
          </div>
          {activePost && (
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="truncate">
                Publicación activa: @{activePost.author} (Solo se exportan los comentarios de esta búsqueda)
              </span>
            </div>
          )}
        </div>

        {/* Export Options Grid */}
        <div className="space-y-3">
          
          {/* PDF Option */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-900 transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Reporte Ejecutivo en PDF (.pdf)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Formato ejecutivo con gráficos, resumen de IA y hallazgos clave
                </p>
              </div>
            </div>

            <button
              onClick={() => handleExport('pdf')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs cursor-pointer transition-all shrink-0"
            >
              {downloadSuccess === 'PDF' ? (
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Descargado</span>
              ) : (
                'Descargar PDF'
              )}
            </button>
          </div>

          {/* Excel Option */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-900 transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Libro de Trabajo Excel (.xlsx)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hojas separadas: Comentarios, Métricas IA y Recomendaciones
                </p>
              </div>
            </div>

            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer transition-all shrink-0"
            >
              {downloadSuccess === 'Excel' ? (
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Descargado</span>
              ) : (
                'Descargar Excel'
              )}
            </button>
          </div>

          {/* CSV Option */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-900 transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Archivo Plano CSV (.csv)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compatible con PowerBI, Tableau, Google Sheets y Python
                </p>
              </div>
            </div>

            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs cursor-pointer transition-all shrink-0"
            >
              {downloadSuccess === 'CSV' ? (
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Descargado</span>
              ) : (
                'Descargar CSV'
              )}
            </button>
          </div>

        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{t.exportSuccess}</span>
          </div>
        )}

      </div>
    </div>
  );
};
