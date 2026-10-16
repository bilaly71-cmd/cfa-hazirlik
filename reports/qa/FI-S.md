# QA raporu — FI-S (FI-07, 10, 11, 12, 13, 16, 17, 18, 19)

Denetçi: reviewer-agent · Tarih: 2026-10-16

## Kontroller (tüm paketler)
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | 9 dosyada hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 44 sayısal soru (07:6, 10:6, 11:4, 12:9, 13:6, 16:5, 17:0, 18:2, 19:6), 0 hatalı; ayrıca IRR/YTM/YTC, EAR, Macaulay/ModDur, konveksite, EffDur, KRD, CPR/SMM, PMT, recovery, DSCR değerleri python ile bağımsız yeniden hesaplandı |
| Bağımsız çözüm | 135 soru cevap anahtarına bakılmadan çözüldü; tek doğru şık, anahtarla uyumlu |
| BA II Plus | TVM dizileri (N, I/Y, PV, PMT, FV, CPT; CLR TVM) doğrulandı. Zincir (Chn) modunda yanlış sonuç verecek karışık işlem (× sonrası +/−) dizileri STO/RCL ile yeniden yazıldı. Belirsiz "..." / yer tutucu tuş kaldırıldı |
| Denge (A/B/C) | 07: 3/4/3 · 10: 5/5/5 · 11: 3/4/3 · 12: 5/5/5 · 13: 7/7/6 · 16: 5/5/5 · 17: 4/3/3 · 18: 6/7/7 · 19: 7/6/7 (en yüksek %35) |
| Kelime | Tanımsız kimlik yok (0). FI-07..19 konu kelime dosyalarındaki 112 terim lexical-review ile verified yapıldı; başka dosyada tanımlı kimlik tekrar tanımlanmadı |
| Özgünlük | `ngram-check`: bu paketler için eşleşme yok |
| TR/EN | Sayılar iki dilde aynı (otomatik tarama + okuma); terimler sözlükle uyumlu |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FI-07-b-q05 | style (C şık gerekçesi: dönüştürme opsiyonu "standart değil" zayıf gerekçesi; yatırımcı opsiyonu → OAS > Z-spread olarak düzeltildi) | evet |
| FI-07-b-q02 | numeric (BA II Plus dizisine `[2ND] [CLR TVM]` eklendi) | evet |
| FI-10-a-q02 | numeric (açıklama/adımlar ≈%5,07 diyordu; doğru şık ve hesap %5,05) | evet |
| FI-10-c-q01 | numeric (calculator "[×] 2 ..." eksik dizisi tam tuş dizisine çevrildi) | evet |
| FI-11-lesson | translation (common_traps_tr: parasal durasyon maddesi anlamsızdı) | evet |
| FI-12-lesson | style (örnek başlığı "100 bp" iken örnek 80 bp) | evet |
| FI-12-a-q02 | style (C şık metni "0.0" iken değer 0,0024) | evet |
| FI-12-b-q01, b-q02, b-q03, b-q05, c-q01, c-q03, c-q05 | numeric (BA II Plus Chn modunda yanlış çıkan karışık işlem dizileri; STO/RCL ile yeniden yazıldı) | evet |
| FI-13-lesson + FI-13-b-q01 | key (konveksite +39,2 olan fiyatlar "callable" bono diye veriliyordu; callable negatif konveksite ile çelişiyordu → "gömülü opsiyonlu"; vocab `callable-bond` → `embedded-option`) | evet |
| FI-13-b-q03, b-q04, c-q02 | numeric (calculator dizileri Chn modunda yanlıştı; STO/RCL) | evet |
| FI-16-c-q03 | style (W A: "eşit dağıtır" → alacak oranında/pro rata) | evet |
| FI-19-lesson + FI-19-b-q03 | numeric (taksit 18.756,03 iken metinde 18.755 / anapara 755; 18.756 / 756 yapıldı, calculator TVM zinciriyle yazıldı) | evet |

## Geçen öğeler
Tüm ders (9) ve soru (135) öğeleri `verified` objesi aldı. Kelime dosyaları (FI-07, 10, 11, 12, 13, 16, 17, 18, 19; 112 terim) `lexical-review` aldı (FI-19/loan-to-value örneğinde "öz sermaye" → "özkaynak"). Başarısız öğe yok.
