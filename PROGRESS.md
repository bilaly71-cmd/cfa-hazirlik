# PROGRESS

YAYINDA: https://bilaly71-cmd.github.io/cfa-hazirlik/ (her main push'ta CI doğrular + Pages'e dağıtır). DURUM: Milestone A ✓, Milestone B ✓ (1830 doğrulanmış soru, 340/340 LOS ≥5 soru, 102 ders, 1775 doğrulanmış kelime, 219 formül, 19 hesap rehberi, 19 kalıp, 44 etik vakası; 50 soruluk örnekleme 0/50 hata; docs/FINAL_REPORT.md yazıldı). SIRADAKİ ADIM: Milestone C — ≥3000 soru (≈+1170: her LOS +3-4 soru, ağırlığı yüksek konular önce), 4 mock, L2 ilk 300 vignette(item_set) soru (content/syllabus/L2.json iskeleti var; src/lib/schema Question.type='item_set' + set_id hazır, uygulamada vignette ekranı YOK), L3 iskelet; küçük netleştirmeler (FSA-12-a-q03, FI-04-b-q03, ECO-04-d-q01, ETH-06-c-q01); BA II Plus tuşlarını cihazda doğrulama (kullanıcı). Bitince FINAL_REPORT güncelle ve YALNIZCA o zaman DONE oluştur. ≤5 ajan, model sonnet.

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
