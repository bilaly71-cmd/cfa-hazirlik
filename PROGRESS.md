# PROGRESS

YAYINDA: https://bilaly71-cmd.github.io/cfa-hazirlik/ (her main push'ta CI doğrular + Pages'e dağıtır). DURUM: L1'in 102 modülü / 340 LOS yazıldı VE doğrulandı: 1764 soru, 102 ders, 1775 doğrulanmış kelime, 219 formül, 19 hesap rehberi, 19 kalıp, 44 etik vakası. Milestone A ✓; Milestone B ≈ (1800 soru hedefi için ~66 ek soru CI/AI'ye yazılıyor+denetlenecek; 2 mock uygulamada dinamik 2×90). SIRADAKİ ADIM: ek soruları denetle+build+push; 50 soruluk bağımsız örnekleme raporu (reports/error_sample.md); özgünlük taraması için content/_reference/*.txt referans parçacıkları (ngram-check şu an referanssız=boş); Milestone C (≥3000 soru, 4 mock, L2 ilk 300 vignette soru, L3 iskelet — L2/L3.json zaten modül düzeyinde var); docs/FINAL_REPORT.md. DONE dosyası YALNIZCA Milestone C bitince.

## Nasıl devam edilir (yeni oturum için)
- İçerik kuralları: `docs/CONTENT_SPEC.md`; üretici görev şablonu: `docs/GEN_PROMPT.md`; denetçi: `docs/REVIEW_SPEC.md`.
- Bir modül paketi `content/L1/<TOPIC>/<MODULE_ID>.json` dosyasında yoksa → üretilmemiş. Varsa ve öğelerde `verified:false` → reviewer bekliyor.
- `npm run validate-content`, `npm run verify-numeric`, `npm run build-content` (uygulamaya yalnızca doğrulanmışlar girer), `npm test`.

## Durum
- [x] Faz 0 ham araştırma: docs/research/A_lojistik (57 kaynak), B_turkiye_spk (+spk_map.json), C_mufredat (+L1/L2/L3.json, 2027: 102 modül/340 LOS), D_strateji+D_kesifler (~72 kaynak). Birleştirildi: docs/RESEARCH.md, SOURCES.md (182 tekil kaynak), CFA_REHBERI_TR.md, KESIFLER.md, content/exam_info/info.json.
- [x] Faz 1 — Expo SDK 58 iskeleti, zod şeması, FSRS, skor/mock, kelime eşleme, glossary lint, dışa aktarma, 23 birim testi
- [x] Faz 2 altyapı — validate/build/ngram (scripts/content.ts), verify_numeric.py
- [~] Faz 2 içerik — üretici ajanlar başlatıldı: FSA, FI, EQ, ETH, QM, ECO, CI, DER, AI, PM (tüm 102 modül) + glossary/GEN kelime/soru kalıpları + etik vakaları/formüller/BA II Plus. Oturum kesildiğinde ~172 soru diskteydi, hepsi verified:false.
- [~] Faz 3 — ekranlar yazıldı (Bugün, Konular, Soru, Kelimeler, Daha fazla; quiz, review, mock, lesson, topic, stats, settings, formulas, calculator, exam-info, patterns, ethics); tsc temiz; web'de test edildi (soru akışı, KaTeX, kelime popup'ı, flip kart, kalıcı kayıt); PWA offline doğrulandı; GitHub Actions hazır (repo remote'u yok)
- [ ] Milestone A / B / C

## Metrikler
(npm run build-content → reports/metrics.md)
