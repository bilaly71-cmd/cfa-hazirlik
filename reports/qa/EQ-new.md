# QA raporu — EQ yeni sorular (EQ-01..EQ-12, 111 soru)

Denetçi: reviewer-agent · Tarih: 2026-10-17 · Kapsam: `content/L1/EQ/EQ-01..12.json` içindeki `verified: false` sorular

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (12 dosya) | Hata 0, uyarı 0 |
| Sayısal (verify_numeric) | Tüm dosyalar 0 hatalı |
| Bağımsız çözüm | 111/111 anahtarla uyumlu; tek doğru şık |
| Denge (A/B/C) | Her modülde hiçbir harf %45'i geçmiyor (en yüksek EQ-03 A %39) |
| Şık uzunluğu yanlılığı | Sayısal olmayan sorularda doğru şık tek başına belirgin en uzun değil |
| Kelime | Tüm vocab_ids tanımlı, soru başına 3-8 |
| Özgünlük | ngram-check: şüpheli 0 (düzeltme sonrası); 2 iç kopya düzeltildi |
| Doğrulanamayan | Yok; 111/111 verified nesnesi aldı |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| EQ-03-c-q07 | numeric/style: ters oran çeldiricisi "%125" yanlış etiketli (gerçek 12.500%); gerekçede soruda olmayan 270 milyon | evet |
| EQ-04-c-q06 | numeric/style: ters oran çeldiricisi "%25" yanlış etiketli; yerine toplam getiri (−%1,0) çeldiricisi | evet |
| EQ-04-c-q07 | numeric: tuş dizisi yüzdeye çevirmiyordu (×100 eklendi) | evet |
| EQ-06-b-q07 | numeric/style: BA II zincir modunda yanlış sonuç veren tuş sırası; ayrıca QM-04-b-q04 ile çakışma, sayılar ve çözüm yeniden yazıldı | evet |
| EQ-06-d-q08 | numeric: tuş dizisi yalnız dönüşüm değerini veriyordu (sade değer eklendi); TR soru kökü düzeltildi | evet |
| EQ-06-a-q08 | translation: "özsermaye sermaye yükü" | evet |
| EQ-06-b-q08 | translation: açıklamada "BD" kısaltması | evet |
| EQ-07-a-q06 | numeric/style: çeldirici etiketi "0,3" iken değer 0,35 | evet |
| EQ-07-d-q07 | numeric/style: çeldirici etiketi "0,1x" iken değer 0,125 | evet |
| EQ-07-a-q07, a-q08 | translation: sözlüğe aykırı "payout"/"tutma oranı" → "dağıtım oranı"/"alıkoyma oranı" | evet |
| EQ-08-c-q08 | ambiguous: C şık gerekçesi karışıktı (%25 = g'nin göreli değişimi) | evet |
| EQ-09-c-q06 | numeric/style: ters oran çeldiricisi "%6,7" yanlış etiketli (666,7%) | evet |
| EQ-09-b-q07 | translation: "payout" → "dağıtım oranı" | evet |
| EQ-09-c-q08 | style/originality: ECO-01-e-q02 ile aynı HHI payları (%85 örtüşme); paylar 50/30/10/10 yapıldı | evet |
| EQ-11-c-q08 | translation/key: B şıkkında "para birimi seçimi" ile yanlış çerçeveleme tanımı | evet |
| EQ-11-a-q07 | translation: "franchise" → "imtiyaz" (imtiyazlı payla karışır) | evet |
| EQ-12-a-q06 | style: EQ-12-a-q01 ile aynı kalıp; beta'yı geri çözen soru olarak yeniden yazıldı (cevap B kaldı) | evet |
| EQ-12-b-q07 | numeric: zincir modunda yanlış sonuç veren tuş sırası (STO/RCL ile düzeltildi) | evet |
