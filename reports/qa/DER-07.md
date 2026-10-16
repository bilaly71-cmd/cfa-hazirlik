# DER-07 doğrulama raporu (2026-10-16)

Tüm sorular, ders ve kelimeler verified (şema, verify_numeric, ngram temiz). Ayrıntılı toplu rapor: reports/qa/DER.md

Satır: | DER-07 | 10 | 8 | 2 (1 sayısal, 1 stil) | 0 |

| id | sorun türü | düzeltildi mi |
|---|---|---|
| DER-07-b-q03 | numeric: verilen iskonto çarpanları (0,9524/0,9070) %5,0 başabaş swap faizine karşılık gelir, soruda %4,8 yazıyordu (veri tutarsız). Faiz %5,0 yapıldı: doğru 185.940 (A), B 200.000 (iskontosuz), C 90.700 (yalnız son yıl); ifade, çözüm adımları, tuşlar, açıklama ve dersteki örnek (4,8→5,0; 80.000→100.000; 148.752→185.940) güncellendi. | evet |
| DER-07-lesson (example) | numeric: yukarıdaki tutarsızlığın dersteki kopyası | evet |
| DER-07-b-q04 | style: şık biçimi binlik ayraçsız (TRY 1000000) | evet |
