# DER-01..DER-10 bağımsız doğrulama raporu (2026-10-16)

Yöntem: her soru cevap anahtarına bakmadan çözüldü (türev formülleri python ile ayrıca doğrulandı: forward, taşıma maliyeti, FRA, forward faiz, swap oranı/değeri, put-call ve put-call-forward paritesi, binom). Şema, verify_numeric ve ngram-check temiz. Hiçbir soru verified:false kalmadı.

| Paket | Soru | Geçen (değişmeden) | Düzeltilen | Başarısız |
|---|---|---|---|---|
| DER-01 | 10 | 10 | 0 | 0 |
| DER-02 | 15 | 15 | 0 | 0 |
| DER-03 | 10 | 9 | 1 | 0 |
| DER-04 | 10 | 9 | 1 (stil) | 0 |
| DER-05 | 10 | 8 | 2 (stil) | 0 |
| DER-06 | 10 | 8 | 2 (stil) | 0 |
| DER-07 | 10 | 8 | 2 (1 sayısal, 1 stil) | 0 |
| DER-08 | 15 | 15 | 0 | 0 |
| DER-09 | 10 | 10 | 0 | 0 |
| DER-10 | 10 | 9 | 1 (stil) | 0 |

Cevap dengesi: tüm modüllerde A/B/C ~1/3 (10 soruluklarda 4/3/3, 15 soruluklarda 5/5/5); değişiklik gerekmedi.

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| DER-03-a-q05 | key/ambiguous: USD/TRY düşünce forward (alıcı şirket) zararda; zarardaki tarafın karşı taraf kredi riski yoktur, "banka batıyor" senaryosu karşı taraf riskini göstermiyordu. Kur yükselişi + forward kazancı + bankanın ödeyememesi olarak yeniden yazıldı; şıklar aynı. | evet |
| DER-07-b-q03 | numeric: verilen iskonto çarpanları (0,9524/0,9070) %5,0 başabaş swap faizine karşılık gelir, soruda %4,8 yazıyordu (veri tutarsız). Faiz %5,0 yapıldı: doğru 185.940 (A), B 200.000 (iskontosuz), C 90.700 (yalnız son yıl); ifade, çözüm adımları, tuşlar, açıklama ve dersteki örnek (4,8→5,0; 80.000→100.000; 148.752→185.940) güncellendi. | evet |
| DER-07-lesson (example) | numeric: yukarıdaki tutarsızlığın dersteki kopyası | evet |
| DER-07-b-q04 | style: şık biçimi binlik ayraçsız (TRY 1000000) | evet |
| DER-04-b-q04 | style: şık biçimi binlik ayraçsız | evet |
| DER-05-a-q04 | style/translation: "one-year-style risk-free rates" belirsiz; "annual ... (annual compounding)" ve TR "Yıllık risksiz faizler" yapıldı | evet |
| DER-05-b-q04 | style: şık biçimi binlik ayraçsız | evet |
| DER-05-b-q02 | style: hesap makinesi tuşu "1.06 [x²] 1.1236" hatalı yazımı düzeltildi | evet |
| DER-06-a-q02, DER-06-a-q04 | style: şık biçimi binlik ayraçsız | evet |
| DER-10-a-q04 | style: calculator.note_tr ondalık noktası virgüle çevrildi | evet |

## Kelime
- Tanımsız vocab_ids: yok (tüm kimlikler mevcut dosyalarda tanımlı).
- DER-02'deki `commodity` AI-05'te zaten tanımlı olduğu için DER-02 vocab dosyasından silindi (tekrar tanım).
- Okunuş düzeltmeleri: notional (nou-şı-nıl), compound (kım-paund), plain-vanilla (peyn va-ni-lı), at-the-money (et dhı ma-ni), hedge-ratio (hec rey-şi-o), risk-neutral (risk nyu-tırıl).
- DER-01..10 vocab dosyalarındaki tüm terimler `lexical-review` ile verified yapıldı.

## Notlar
- 3. maddedeki (sayısal) kontrol: yanlış şıkların tamamı doğru değerden >%0,5 uzak; verify_numeric 0 hata.
- Dersler (10) `content-review+bilingual-check` ile verified.
