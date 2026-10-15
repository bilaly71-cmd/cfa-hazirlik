// Kelime defteri dışa aktarma (Telegram kelime botu için): JSON ve CSV.
export type ExportRow = { term_en: string; tr: string; example_en: string; example_tr: string; topic: string };

export const EXPORT_FIELDS: (keyof ExportRow)[] = ['term_en', 'tr', 'example_en', 'example_tr', 'topic'];

export function toJson(rows: ExportRow[]) {
  return JSON.stringify(rows.map((r) => Object.fromEntries(EXPORT_FIELDS.map((f) => [f, r[f]]))), null, 2);
}

function csvCell(v: string) {
  return /[",\n\r;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** RFC 4180 CSV, UTF-8 BOM ile (Excel Türkçe karakterleri doğru açsın). */
export function toCsv(rows: ExportRow[], bom = true) {
  const lines = [EXPORT_FIELDS.join(','), ...rows.map((r) => EXPORT_FIELDS.map((f) => csvCell(r[f] ?? '')).join(','))];
  return (bom ? '﻿' : '') + lines.join('\r\n') + '\r\n';
}
