# PROGRESS

SIRADAKİ ADIM: (1) `npx tsc --noEmit` ve `npm test` temiz mi kontrol et, web'i `npx expo start --web` ile mobil viewport'ta aç, hataları düzelt. (2) Üretici ajanların yazdığı content/L1/**/*.json paketlerini commit et; eksik modülleri (dosyası olmayan) docs/GEN_PROMPT.md ile yeniden üret. (3) Her paket için docs/REVIEW_SPEC.md ile bağımsız reviewer ajan çalıştır → npm run build-content. (4) docs/research/A-D → RESEARCH.md, SOURCES.md, CFA_REHBERI_TR.md, KESIFLER.md ve content/exam_info/info.json birleştir. (5) PWA (public/manifest + sw, scripts/pwa.mjs), GitHub Actions (validate + Pages).

## Nasıl devam edilir (yeni oturum için)
- İçerik kuralları: `docs/CONTENT_SPEC.md`; üretici görev şablonu: `docs/GEN_PROMPT.md`; denetçi: `docs/REVIEW_SPEC.md`.
- Bir modül paketi `content/L1/<TOPIC>/<MODULE_ID>.json` dosyasında yoksa → üretilmemiş. Varsa ve öğelerde `verified:false` → reviewer bekliyor.
- `npm run validate-content`, `npm run verify-numeric`, `npm run build-content` (uygulamaya yalnızca doğrulanmışlar girer), `npm test`.

## Durum
- [x] Faz 0 ham araştırma: docs/research/A_lojistik (57 kaynak), B_turkiye_spk (+spk_map.json), C_mufredat (+L1/L2/L3.json, 2027: 102 modül/340 LOS), D_strateji+D_kesifler (~72 kaynak). Birleştirme (RESEARCH/SOURCES/REHBER) YAPILMADI.
- [x] Faz 1 — Expo SDK 58 iskeleti, zod şeması, FSRS, skor/mock, kelime eşleme, glossary lint, dışa aktarma, 23 birim testi
- [x] Faz 2 altyapı — validate/build/ngram (scripts/content.ts), verify_numeric.py
- [~] Faz 2 içerik — üretici ajanlar başlatıldı: FSA, FI, EQ, ETH, QM, ECO, CI, DER, AI, PM (tüm 102 modül) + glossary/GEN kelime/soru kalıpları + etik vakaları/formüller/BA II Plus. Oturum kesildiğinde ~172 soru diskteydi, hepsi verified:false.
- [~] Faz 3 — ekranlar yazıldı (Bugün, Konular, Soru, Kelimeler, Daha fazla; quiz, review, mock, lesson, topic, stats, settings, formulas, calculator, exam-info, patterns, ethics); tsc temiz, cihazda/web'de HENÜZ test edilmedi
- [ ] Milestone A / B / C

## Metrikler
(npm run build-content → reports/metrics.md)
