# QA raporu — FSA-05 (Analyzing Statements of Cash Flows II)

Denetçi: reviewer-agent (R1) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-05.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 6 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q02 12,0 % · b-q02 467,5 · b-q03 480 · b-q04 10,0x · b-q05 173 · b-q06 4,00 — hepsi anahtarla eşleşiyor, çeldiriciler tolerans dışında |
| BA II Plus tuşları | Chain modunda soldan sağa doğru sonucu veriyor (6/6) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 4 · B 4 · C 3 |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | Common-size iki yaklaşım, IAS 7 faiz/temettü sınıflama seçenekleri ve US GAAP zorunluluğu, FCFF/FCFE formülleri, nakdi faiz karşılama, hisse başına nakit akışı doğru; IFRS 18'in seçenekleri daraltması notu doğru |
| Özgünlük | Şüpheli eşleşme yok |
| Kelime | Tanımsız 34 kimlik tanımlandı (20'si bu dosyada; diğerleri başka dosyalarda zaten vardı) |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| — | — | Düzeltme gerekmedi |

## Geçen öğeler
Ders `FSA-05-lesson` ve 11 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- `FSA-05-a-q02` B şıkkı (8,3 %) "rastgele taban" çeldiricisi zayıf ama yanlış ve tolerans dışında; bırakıldı.
