# PROGRESS

SIRADAKİ ADIM: Fable 5.1 ajanları çalışıyor (dil katmanı, ETH-a/b, FSA-r1/r2, EQ-r1, FI-r1, QM-b, reviewer R1, araştırma birleştirme). Bitenler commit'lenecek; sonra kuyruk: FI 10-13 & 16-19, EQ 08-12, FSA 11-12, QM 01-05, ECO, CI, DER, AI, PM, etik vakaları+formüller+BA II Plus; her paket için reviewer. Ajan sayısını ≤10 tut (20 paralel ajan kotayı 30 dk'da bitirdi).

## Nasıl devam edilir (yeni oturum için)
- İçerik kuralları: `docs/CONTENT_SPEC.md`; üretici görev şablonu: `docs/GEN_PROMPT.md`; denetçi: `docs/REVIEW_SPEC.md`.
- Bir modül paketi `content/L1/<TOPIC>/<MODULE_ID>.json` dosyasında yoksa → üretilmemiş. Varsa ve öğelerde `verified:false` → reviewer bekliyor.
- `npm run validate-content`, `npm run verify-numeric`, `npm run build-content` (uygulamaya yalnızca doğrulanmışlar girer), `npm test`.

## Durum
- [x] Faz 0 ham araştırma: docs/research/A_lojistik (57 kaynak), B_turkiye_spk (+spk_map.json), C_mufredat (+L1/L2/L3.json, 2027: 102 modül/340 LOS), D_strateji+D_kesifler (~72 kaynak). Birleştirme (RESEARCH/SOURCES/REHBER) YAPILMADI.
- [x] Faz 1 — Expo SDK 58 iskeleti, zod şeması, FSRS, skor/mock, kelime eşleme, glossary lint, dışa aktarma, 23 birim testi
- [x] Faz 2 altyapı — validate/build/ngram (scripts/content.ts), verify_numeric.py
- [~] Faz 2 içerik — üretici ajanlar başlatıldı: FSA, FI, EQ, ETH, QM, ECO, CI, DER, AI, PM (tüm 102 modül) + glossary/GEN kelime/soru kalıpları + etik vakaları/formüller/BA II Plus. Oturum kesildiğinde ~172 soru diskteydi, hepsi verified:false.
- [~] Faz 3 — ekranlar yazıldı (Bugün, Konular, Soru, Kelimeler, Daha fazla; quiz, review, mock, lesson, topic, stats, settings, formulas, calculator, exam-info, patterns, ethics); tsc temiz; web'de test edildi (soru akışı, KaTeX, kelime popup'ı, flip kart, kalıcı kayıt); PWA offline doğrulandı; GitHub Actions hazır (repo remote'u yok)
- [ ] Milestone A / B / C

## Metrikler
(npm run build-content → reports/metrics.md)
