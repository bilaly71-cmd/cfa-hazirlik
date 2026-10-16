# QA raporu — EQ-04, 05, 06, 08, 09, 10, 11, 12 (Equity Valuation)

Denetçi: reviewer-agent · Tarih: 2026-10-16 · Dosyalar: `content/L1/EQ/EQ-{04,05,06,08,09,10,11,12}.json` ve `content/vocab/EQ-{04..12}.json`

## Kontroller (hepsi için)
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content`) | 8/8 dosyada hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 40 sayısal soru, 0 hatalı (EQ-04: 6, 05: 3, 06: 8, 08: 4, 09: 5, 10: 6, 11: 2, 12: 6). Ek olarak DDM/Gordon, iki aşamalı, FCFE, FCFF+çıkış çarpanı, CAPM/APT, CAGR, EV, P/B, marj hesapları python ile elle yeniden hesaplandı; çeldirici şıkların türetimi (ör. D0/D1, 2/3 yerine 3/2, tek faktör) da kontrol edildi |
| Bağımsız çözüm | 125/125 anahtarla uyumlu, tek doğru şık |
| Denge A/B/C | 04: 5/5/5 · 05: 5/5/5 · 06: 7/6/7 · 08: 5/5/5 · 09: 7/6/7 · 10: 5/5/5 · 11: 5/5/5 · 12: 4/3/3 (hiçbiri %35'i geçmiyor) |
| Kelime | Tanımsız kimlik 0. `equity-risk-premium` EQ-12 ve QM-01'de çift tanımlıydı; EQ-12'deki kopya silindi. 111 EQ kelimesi `lexical-review` ile doğrulandı (WACC okunuşu, switching costs okunuşu, regression TR tanımı düzeltildi) |
| Özgünlük | `npm run ngram-check`: "Referans dosyası: 0, şüpheli: 0" (referans korpus yok); içerik elle okundu, bilinen sağlayıcı kalıbı görülmedi |
| Kavramsal | FCFF/WACC–FCFE/özkaynak maliyeti eşleşmesi, FCFE formülü, Gordon/çok aşamalı, sürdürülebilir büyüme, imtiyazlı pay (call/put/convertible), özkaynak köprüsü, Porter/PESTLE, GICS/NACE, CAPM/SML/APT doğru |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| EQ-05-b-q03 | key/style (A şıkkı gerekçesi "nakdi ekler" yanlış; 2.780 nakdi çıkarmayı unutur) | evet |
| EQ-05-a-q02 | translation (yanlış şık A gerekçesi "yüksek değerleme" belirsiz) | evet |
| EQ-06-a-q03 | key/style (C şıkkı 440 gerekçesi "net borçlanmayı çıkarır" yanlış; 440 net borçlanmayı hiç eklemez) | evet |
| EQ-06-b-q01 | translation (gerekçede "payda" yerine pay kısmı) | evet |
| EQ-06-d-q01 | numeric/style (B şıkkı 400 TL için mantıklı bir hata türevi yok; 625 TL = 5/0,008 ondalık kayması yapıldı) | evet |
| EQ-06-b-q03, EQ-08-c-q02, EQ-08-c-q04 | style (BA II Plus tuşu `[CLR`, `WORK]` ikiye bölünmüştü → `[CLR WORK]`) | evet |
| EQ-08-b-q04 | translation (C şıkkı "Boyunca sabit…" bozuk cümle) | evet |
| EQ-09 ders | translation ("Güçlü kuvvetler" → "Güçlü rekabet güçleri") | evet |
| EQ-09-c-q01 | style (0.33333333 yerine `3 [1/x]` tuşu) | evet |
| EQ-10 ders (example) | numeric (2,0 milyon adet × 150 TL = 300 ≠ 400 satış tutarsızlığı; birim/fiyat ifadesi kaldırıldı, EN+TR) | evet |
| EQ-10-b-q05 | ambiguous (A şıkkı "marj ve birim geliri düşer, hacim artmadıkça" mantık bulanıktı; yeniden yazıldı, açıklama güncellendi, EN+TR) | evet |
| EQ-04 ders | conceptual (Türkiye'de "kayıt günü sonunda" kesin hak tarihi iddiası; genel "hak sahipliği tarihi/MKK kayıtları" yapıldı, EN+TR) | evet |
| EQ-04-c-q02/c-q03, EQ-06-d-q02, EQ-12-a-q04 (TR şıklar) | translation (%-x → −%x) | evet |
| vocab `wacc`, `switching-costs`, `regression` | vocab (okunuş/TR tanım) | evet |
| vocab `equity-risk-premium` (EQ-12) | vocab (QM-01'de çift tanım; silindi) | evet |

## Geçen öğeler
8 ders (`content-review+bilingual-check`), 125 soru (`independent-solve+numeric-script+bilingual-check`), 111 kelime (`lexical-review`) `verified` objesi aldı. Başarısız öğe yok.

## Paket başına sonuç
| Paket | Geçen | Düzeltilen (öğe) | Başarısız |
|---|---|---|---|
| EQ-04 | 15 soru + ders | 4 | 0 |
| EQ-05 | 15 soru + ders | 2 | 0 |
| EQ-06 | 20 soru + ders | 5 | 0 |
| EQ-08 | 15 soru + ders | 3 | 0 |
| EQ-09 | 20 soru + ders | 2 | 0 |
| EQ-10 | 15 soru + ders | 2 | 0 |
| EQ-11 | 15 soru + ders | 0 | 0 |
| EQ-12 | 10 soru + ders | 1 (yalnız kelime) | 0 |
