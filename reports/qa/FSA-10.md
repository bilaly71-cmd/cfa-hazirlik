# QA raporu — FSA-10 (Financial Reporting Quality)

Denetçi: reviewer-agent (R2) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-10.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 3 soru, 0 hatalı |
| Bağımsız çözüm (python) | f-q03 53,0 (50 + 12×0,75 − 8×0,75) · g-q04 60.000 (160.000 − 100.000) · h-q02 52,5 gün (210/1.460×365) · h-q03 CFO/NK 0,92 → 0,62 → 0,34 — hepsi anahtarla eşleşiyor, çeldiriciler tolerans dışında |
| BA II Plus tuşları | Chain modunda soldan sağa doğru sonucu veriyor (3/3; STO/RCL kullanımı doğru) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu; 37 kavramsal soruda tek doğru şık |
| Denge (A/B/C) | A 14 · B 13 · C 13 |
| Dil / glossary lint | Uyarı yok; TR doğal (covenant, kanal doldurma, kurabiye kavanozu, büyük temizlik karşılıkları tutarlı) |
| Kavramsal | Raporlama kalitesi / kazanç kalitesi ayrımı ve "düşük RK → KK değerlendirilemez", 6 seviyeli yelpaze, agresif/ihtiyatlı taraflılık ve tahakkukların tersine dönmesi, hile üçgeni (motivasyon/fırsat/haklı gösterme), disiplin mekanizmaları ve sınırları (piyasa, düzenleyici, denetçi makul güvence, özel sözleşme), GAAP dışı ölçü mutabakat/belirginlik kuralı, IFRS'te faiz sınıflama esnekliği, tahmin değişiklikleri (faydalı ömür, şüpheli alacak, değerleme karşılığı), kanal doldurma, borç uzatma, DSO ve CFO/NK taraması, Beneish M-skoru doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok; şirket adları kurgusal |
| Kelime | Tanımsız 44 kimlikten 3'ü (gross-margin, net-realizable-value, write-down) FSA-06 incelemesinde tanımlandı; kalan 41'i `content/vocab/FSA-10.json` dosyasına eklendi |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| — | — | Düzeltme gerekmedi |

## Geçen öğeler
Ders `FSA-10-lesson` ve 40 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- `FSA-10-d-q01` ve `FSA-10-e-q04` için `pattern_ids` boş; alan isteğe bağlı olduğundan bırakıldı.
- `FSA-10-f-q05`: IFRS'te ödenen faizin finansman bölümüne alınabilmesi doğru; IFRS 18 sonrası bu seçeneğin çoğu şirket için daraldığı notu derste değil, FSA-05 dersinde var; L1 kapsamı için yeterli.
