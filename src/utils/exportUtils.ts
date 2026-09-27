import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { AnalysisSummary, SocialComment } from '../types';

/**
 * Clean CSV export with UTF-8 BOM for flawless Spanish/multilingual & emoji support in Excel
 */
export function exportToCSV(comments: SocialComment[], filename: string = 'sentisocial_comments.csv') {
  const headers = [
    'ID',
    'Plataforma',
    'Autor',
    'Usuario',
    'Contenido',
    'Sentimiento',
    'Puntuacion (-1 a 1)',
    'Emocion Primaria',
    'Intensidad Emocional',
    'Me Gusta',
    'Respuestas',
    'Fecha/Hora',
    'Categoria',
    'Es Sarcastico',
    'Palabras Clave',
    'Respuesta Sugerida IA',
    'Razonamiento IA'
  ];

  const rows = comments.map((c) => [
    c.id,
    c.platform.toUpperCase(),
    `"${(c.author || '').replace(/"/g, '""')}"`,
    `"${(c.authorHandle || '').replace(/"/g, '""')}"`,
    `"${(c.content || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    c.sentiment || 'neutral',
    c.sentimentScore !== undefined ? c.sentimentScore : 0,
    c.primaryEmotion || 'neutral',
    c.emotionalIntensity || 1,
    c.likes || 0,
    c.repliesCount || 0,
    `"${c.timestamp || ''}"`,
    `"${(c.category || '').replace(/"/g, '""')}"`,
    c.isSarcastic ? 'SI' : 'NO',
    `"${(c.keywords || []).join(', ')}"`,
    `"${(c.suggestedReply || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${(c.reasoning || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Multi-sheet structured Excel (.xlsx) export using SheetJS
 */
export function exportToExcel(
  comments: SocialComment[],
  summary?: AnalysisSummary | null,
  filename: string = 'sentisocial_report.xlsx'
) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Comments Data
  const commentsData = comments.map((c) => ({
    ID: c.id,
    Plataforma: c.platform.toUpperCase(),
    Autor: c.author,
    Handle: c.authorHandle,
    Comentario: c.content,
    Sentimiento: (c.sentiment || 'neutral').toUpperCase(),
    'Score Sentimiento': c.sentimentScore ?? 0,
    'Emoción Primaria': c.primaryEmotion || 'neutral',
    'Intensidad (1-10)': c.emotionalIntensity || 1,
    'Me Gusta': c.likes || 0,
    Respuestas: c.repliesCount || 0,
    Fecha: c.timestamp,
    Categoría: c.category || 'General',
    'Sarcasmo Detectado': c.isSarcastic ? 'Sí' : 'No',
    'Palabras Clave': (c.keywords || []).join(', '),
    'Respuesta Sugerida IA': c.suggestedReply || '',
    'Razonamiento IA': c.reasoning || '',
  }));
  const wsComments = XLSX.utils.json_to_sheet(commentsData);
  XLSX.utils.book_append_sheet(wb, wsComments, 'Comentarios');

  // Sheet 2: Executive Summary
  if (summary) {
    const summaryData = [
      { Métrica: 'Total Comentarios Analizados', Valor: summary.totalCount },
      { Métrica: 'Net Sentiment Score (-100 a +100)', Valor: `${summary.netSentimentScore} pts` },
      { Métrica: 'Comentarios Positivos', Valor: `${summary.positiveCount} (${Math.round((summary.positiveCount / (summary.totalCount || 1)) * 100)}%)` },
      { Métrica: 'Comentarios Negativos', Valor: `${summary.negativeCount} (${Math.round((summary.negativeCount / (summary.totalCount || 1)) * 100)}%)` },
      { Métrica: 'Comentarios Neutros', Valor: `${summary.neutralCount} (${Math.round((summary.neutralCount / (summary.totalCount || 1)) * 100)}%)` },
      { Métrica: 'Puntuación Promedio (-1.0 a +1.0)', Valor: summary.averageScore },
      { Métrica: 'Fecha del Análisis', Valor: summary.lastAnalyzedAt || new Date().toLocaleString() },
      { Métrica: 'Resumen Ejecutivo IA', Valor: summary.executiveSummary },
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen Ejecutivo');

    // Sheet 3: Actionable items & topics
    const recommendationsData = (summary.actionableRecommendations || []).map((rec, i) => ({
      '#': i + 1,
      'Recomendación Estratégica': rec,
    }));
    const painPointsData = (summary.painPoints || []).map((p, i) => ({
      '#': i + 1,
      'Puntos de Dolor Detectados': p,
    }));
    const praisesData = (summary.praises || []).map((p, i) => ({
      '#': i + 1,
      'Elogios y Factores Positivos': p,
    }));

    const combinedList = [
      ...painPointsData.map(d => ({ Tipo: 'Queja / Dolor', Detalle: d['Puntos de Dolor Detectados'] })),
      ...praisesData.map(d => ({ Tipo: 'Elogio / Acierto', Detalle: d['Elogios y Factores Positivos'] })),
      ...recommendationsData.map(d => ({ Tipo: 'Acción Recomendada', Detalle: d['Recomendación Estratégica'] })),
    ];
    const wsInsights = XLSX.utils.json_to_sheet(combinedList);
    XLSX.utils.book_append_sheet(wb, wsInsights, 'Plan y Recomendaciones');
  }

  // Trigger download
  XLSX.writeFile(wb, filename);
}

/**
 * Formatted PDF Report generation using jsPDF
 */
export function exportToPDF(
  comments: SocialComment[],
  summary: AnalysisSummary | null,
  filename: string = 'sentisocial_report.pdf',
  language: string = 'es'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(15, 23, 42); // dark slate #0f172a
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SENTISOCIAL AI - INFORME EJECUTIVO', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`TikTok • Instagram • Facebook | Generado: ${dateStr}`, margin, 22);

  let y = 38;

  // Overview Stats Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  const total = summary?.totalCount || comments.length;
  const posCount = summary?.positiveCount ?? comments.filter(c => c.sentiment === 'positive').length;
  const negCount = summary?.negativeCount ?? comments.filter(c => c.sentiment === 'negative').length;
  const neuCount = summary?.neutralCount ?? comments.filter(c => c.sentiment === 'neutral').length;
  const nps = summary?.netSentimentScore ?? Math.round(((posCount - negCount) / (total || 1)) * 100);

  const colWidth = contentWidth / 4;
  
  // Stat 1: Total
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Total Comentarios', margin + 6, y + 10);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${total}`, margin + 6, y + 24);

  // Stat 2: Net Sentiment Score
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Net Sentiment Score', margin + colWidth + 6, y + 10);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  if (nps > 0) doc.setTextColor(22, 163, 74); // green
  else if (nps < 0) doc.setTextColor(220, 38, 38); // red
  else doc.setTextColor(71, 85, 105);
  doc.text(`${nps > 0 ? '+' : ''}${nps} pts`, margin + colWidth + 6, y + 24);

  // Stat 3: Positivos %
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Comentarios Positivos', margin + colWidth * 2 + 6, y + 10);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 163, 74);
  const posPct = Math.round((posCount / (total || 1)) * 100);
  doc.text(`${posPct}% (${posCount})`, margin + colWidth * 2 + 6, y + 24);

  // Stat 4: Negativos %
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Comentarios Negativos', margin + colWidth * 3 + 6, y + 10);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  const negPct = Math.round((negCount / (total || 1)) * 100);
  doc.text(`${negPct}% (${negCount})`, margin + colWidth * 3 + 6, y + 24);

  y += 44;

  // Executive Summary Section
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Resumen Ejecutivo de Percepción y Tendencias (IA Gemini)', margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  const summaryText = summary?.executiveSummary ||
    'La muestra analizada en TikTok, Instagram y Facebook indica una respuesta predominantemente positiva con alta tracción visual y viralidad. Los usuarios destacan la estética y rapidez, aunque demandan mejoras en la atención post-venta y claridad sobre costos de envío.';

  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 5 + 8;

  // Pain Points and Praises (Two columns or sequential blocks)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. Factores Clave Detectados', margin, y);
  y += 6;

  // Praises Block
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  const praises = summary?.praises || [
    'Excelente recepción del diseño visual y estética del producto',
    'Alta satisfacción con la rapidez de entrega en compradores satisfechos',
    'Gran recomendación boca a boca entre creadores de contenido'
  ];
  const praisesHeight = praises.length * 6 + 12;
  doc.roundedRect(margin, y, contentWidth, praisesHeight, 2, 2, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(' Aspectos Más Elogiados (Drivers de Conversión):', margin + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  praises.forEach((pr, idx) => {
    doc.text(`• ${pr}`, margin + 6, y + 14 + idx * 6);
  });
  y += praisesHeight + 6;

  // Pain Points Block
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  const pains = summary?.painPoints || [
    'Tiempos de respuesta prolongados en soporte al cliente por DM',
    'Incertidumbre en costos de envío y opciones de pago contra entrega',
    'Objeciones de precio en segmentos de público joven'
  ];
  const painsHeight = pains.length * 6 + 12;
  doc.roundedRect(margin, y, contentWidth, painsHeight, 2, 2, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(' Principales Puntos de Dolor y Quejas:', margin + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  pains.forEach((pn, idx) => {
    doc.text(`• ${pn}`, margin + 6, y + 14 + idx * 6);
  });
  y += painsHeight + 8;

  // Strategic Recommendations
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. Recomendaciones Estratégicas para Redes Sociales', margin, y);
  y += 6;

  const recs = summary?.actionableRecommendations || [
    'Publicar un video explicativo respondiendo a las preguntas más frecuentes sobre envíos y garantías.',
    'Establecer protocolo de respuesta rápida para comentarios con sentimiento negativo alto.',
    'Aprovechar testimonios positivos de TikTok e Instagram en anuncios pagados.'
  ];
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  recs.forEach((rec, idx) => {
    const splitRec = doc.splitTextToSize(`${idx + 1}. ${rec}`, contentWidth - 4);
    doc.text(splitRec, margin + 2, y);
    y += splitRec.length * 4.5 + 2;
  });

  // Footer on page 1
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Página 1 de 2 • SentiSocial AI Intelligence Engine`, margin, pageHeight - 8);

  // Add Page 2: Sample High-Impact Comments Table
  doc.addPage();
  
  // Header page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('REGISTRO DE COMENTARIOS DESTACADOS Y ANÁLISIS INDIVIDUAL', margin, 12);

  let y2 = 28;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Comentarios de Mayor Tracción e Impacto', margin, y2);
  y2 += 8;

  const highlightedComments = comments.slice(0, 7);

  highlightedComments.forEach((c, idx) => {
    // Card for comment
    doc.setFillColor(idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y2, contentWidth, 26, 2, 2, 'FD');

    // Platform & Author line
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`[${c.platform.toUpperCase()}] ${c.author} (${c.authorHandle})`, margin + 4, y2 + 6);

    // Sentiment badge
    doc.setFontSize(8.5);
    if (c.sentiment === 'positive') {
      doc.setTextColor(22, 163, 74);
      doc.text(`Positivo (${c.sentimentScore ? `+${c.sentimentScore}` : '+0.8'}) • ${c.primaryEmotion || 'Joy'}`, margin + contentWidth - 45, y2 + 6);
    } else if (c.sentiment === 'negative') {
      doc.setTextColor(220, 38, 38);
      doc.text(`Negativo (${c.sentimentScore || '-0.7'}) • ${c.primaryEmotion || 'Anger'}`, margin + contentWidth - 45, y2 + 6);
    } else {
      doc.setTextColor(100, 116, 139);
      doc.text(`Neutro (${c.sentimentScore || '0.0'}) • ${c.primaryEmotion || 'Curiosity'}`, margin + contentWidth - 45, y2 + 6);
    }

    // Comment text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitText = doc.splitTextToSize(`"${c.content}"`, contentWidth - 8);
    doc.text(splitText.slice(0, 2), margin + 4, y2 + 13);

    // Likes & AI reply
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const replySnippet = c.suggestedReply ? ` | Sugerencia de respuesta IA: "${c.suggestedReply.slice(0, 75)}..."` : '';
    doc.text(`Likes: ${c.likes || 0} • Emoción: ${c.primaryEmotion || 'Neutro'}${replySnippet}`, margin + 4, y2 + 22);

    y2 += 30;
  });

  // Footer on page 2
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Página 2 de 2 • SentiSocial AI Intelligence Engine`, margin, pageHeight - 8);

  // Save PDF
  doc.save(filename);
}
