# PROGRESS

KAPSAM: YALNIZCA LEVEL I (kullanıcı kararı; L2/L3 YAPILMAYACAK, L2 vignette menüden kaldırıldı). YAYINDA: https://bilaly71-cmd.github.io/cfa-hazirlik/. DURUM: Milestone A ✓, B ✓ (1830 doğrulanmış L1 sorusu, 340/340 LOS ≥5 soru, 102 ders, 219 formül, 19 hesap rehberi, 19 kalıp, 44 etik vakası; 50 soruluk örnekleme 0/50). SIRADAKİ ADIM: kullanıcı geri bildirimine göre L1 soru havuzunu genişlet (hedef 3000; ağırlığı yüksek konular: FSA, FI, EQ, ETH, QM önce; LOS başına +3-4 soru, ajan=sonnet, ≤5 ajan, her pakete bağımsız denetçi); Etik şık uzunluğu iyileştirmesi (doğru şık çoğunlukla en uzun); 4 küçük netleştirme (FSA-12-a-q03, FI-04-b-q03, ECO-04-d-q01, ETH-06-c-q01); BA II Plus tuşlarını cihazda doğrulama (kullanıcı). Bitince FINAL_REPORT güncelle; DONE yalnızca L1 3000 soru hedefi bitince.

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

## Şık uzunluğu yanlılığı (2026-10-17)
Ölçüm: `node scripts/len_bias.js` (sayısal olmayan sorularda doğru şık tek başına en uzun oranı; şans ≈ %33). İlk durum %66. Yalnızca AI+CI+DER grubunun yaması uygulandı (227 soru; AI %0, CI %42, DER %69 kaldı). ETH/PM/FSA/ECO/EQ/FI/QM grupları YAPILMADI — kullanıcı kararıyla bırakıldı (öncelik değil). Araç: `scripts/apply_options_patch.py`. Yeni içerik üretiminde şartname §7: doğru şık en uzun olmasın.
