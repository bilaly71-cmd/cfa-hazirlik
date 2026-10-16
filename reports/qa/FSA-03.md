# QA raporu — FSA-03 (Analyzing Balance Sheets)

Denetçi: reviewer-agent (R7) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-03.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 9 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q02 25 · b-q01 150 (900 − 750) · b-q05 80 (500 − 420; müşteri listesi belirlenebilir) · c-q02 5 (GUD-DKG: faiz K/Z, GUD farkı DKG) · d-q02 7,59 (ihraç 94,85 × %8) · e-q01 1,80 · e-q02 0,85 · e-q03 0,474 · e-q05 2,25 — hepsi anahtarla eşleşiyor |
| BA II Plus tuşları | TVM (d-q02: 3 N, 8 I/Y, 6 PMT, 100 FV → PV −94,85) ve chain/STO-RCL adımları doğru (9/9) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu |
| Denge (A/B/C) | Önce A 10 · B 9 · C 6 → iki soruda şık sırası değiştirildi → A 8 · B 9 · C 8 |
| Dil / glossary lint | Uyarı yok; TR doğal |
| Kavramsal | Belirlenebilir/belirlenemeyen maddi olmayan varlık, Ar-Ge farkı, sınırsız ömür (itfa yok, yıllık test), şerefiye = bedel − GUD net belirlenebilir varlık (defter değeri önemsiz), şerefiye değer düşüklüğü nakit dışı ve iptal edilmez, IFRS 9 sınıfları (itfa edilmiş maliyet / GUD-DKG / GUD-KZ; özkaynak için geri alınamaz DKG seçimi, recycling yok) ve US GAAP özkaynak araçları net kâr, ertelenmiş vergi yükümlülüğü IAS 1'de her zaman uzun vadeli, efektif faiz yöntemi (primli tahvilde defter değeri ve gider düşer), covenant ihlali → kısa vadeli, likidite/ödeme gücü oranları doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok |
| Kelime | Tanımsız kimlik yok. `content/vocab/FSA-03.json`: EQ-07'de doğrulanmış `book-value` ve GEN'deki `residual` çift tanımları çıkarıldı (ders vocab_ids'inde `residual` → mevcut `excess`); kalan 35 terim lexical-review ile doğrulandı |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-03-a-q04 | style (denge: doğru şık A → C, şık sırası ve wrong_option_reasons güncellendi) | evet |
| FSA-03-d-q05 | style (denge: doğru şık A → C) | evet |
| FSA-03-lesson | vocab (`residual` → `excess`; GEN'deki `residual` istatistik anlamında) | evet |
| vocab/FSA-03.json | vocab (çift tanım: book-value, residual) | evet |

## Geçen öğeler
Ders `FSA-03-lesson` ve 25 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- d-q02 kalkülatör notu PV'nin negatif çıktığını ve mutlak değerle çarpılacağını belirtiyor; işaret kuralı tutarlı.
- e-q01/e-q02/e-q03 yalnızca 3 vocab_id taşıyor (alt sınır içinde).
