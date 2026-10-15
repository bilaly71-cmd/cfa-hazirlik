# PROGRESS

SIRADAKİ ADIM: Uygulama ekranlarını (src/app) yaz; dalga-1 üretici ajanlar (FSA a/b/c, FI a/b/c, EQ a/b, dil katmanı) bitince her paket için bağımsız reviewer ajan çalıştır; ETH/PM müfredatı bitince dalga-2 (ETH, QM, ECO, CI, DER, AI, PM) üreticilerini başlat.

## Nasıl devam edilir (yeni oturum için)
- İçerik kuralları: `docs/CONTENT_SPEC.md`; üretici görev şablonu: `docs/GEN_PROMPT.md`; denetçi: `docs/REVIEW_SPEC.md`.
- Bir modül paketi `content/L1/<TOPIC>/<MODULE_ID>.json` dosyasında yoksa → üretilmemiş. Varsa ve öğelerde `verified:false` → reviewer bekliyor.
- `npm run validate-content`, `npm run verify-numeric`, `npm run build-content` (uygulamaya yalnızca doğrulanmışlar girer), `npm test`.

## Durum
- [~] Faz 0 — araştırma: A (lojistik), B (Türkiye/SPK), C (müfredat; L1.json 2027 taslağı, 8/10 konu yazıldı), D (strateji/keşif) ajanları çalışıyor → sonra RESEARCH.md, SOURCES.md, CFA_REHBERI_TR.md birleştirilecek
- [x] Faz 1 — Expo SDK 58 iskeleti, zod şeması, FSRS, skor/mock, kelime eşleme, glossary lint, dışa aktarma, 23 birim testi
- [x] Faz 2 altyapı — validate/build/ngram (scripts/content.ts), verify_numeric.py
- [~] Faz 2 içerik — dalga-1: FSA-01..12, FI-01..19, EQ-01..12, glossary + GEN kelimeler + soru kalıpları
- [ ] Faz 3 — ekranlar
- [ ] Milestone A / B / C

## Metrikler
(npm run build-content → reports/metrics.md)
