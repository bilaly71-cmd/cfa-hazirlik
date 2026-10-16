# L2-A denetim raporu (FSA-01..06, EQ-01..06, CI-01..04) - 2026-10-16

16 vignette, 80 soru. Sonuç: tamamı doğrulandı (verified yazıldı); açık sorun yok. `npm run validate-content` hata 0, `verify_numeric.py` 0 hatalı.

| id | sorun türü | düzeltildi mi |
|---|---|---|
| L2-FSA-02-v01-q5 | ambiguous/vignette bağımsız (kavramsal, veri olmadan çözülüyordu) | evet: 7% iskonto oranıyla P/L maliyeti sayısal soruya çevrildi (vignette metni de uyumlandı) |
| L2-FSA-03-v01-q5 | vignette bağımsız (genel kavram, EuroPak'ta satış verisi yok) | evet: çevrilmiş ÖKK sayısal soruya çevrildi |
| L2-EQ-01-v01-q5 | vignette bağımsız (bottom-up tanımı) | evet: SOTP değerinin fiyatı aşma yüzdesi |
| L2-EQ-02-v01-q5 | vignette bağımsız (tutma-değer kavramı) | evet: %60 tutma ile gerekçeli F/K = 20 sayısal soru |
| L2-FSA-05-v01 (vignette) | ambiguous (ekipmanın yaşı belirsiz, ömür uzatma etkisi) | evet: "2026 başında alınmış" eklendi |
| L2-FSA-01-v01-q5 | style (şıkta ipucu parantezi "0.80 (versus 0.67)") | evet |
| L2-FSA-04-v01-q4 | key/style (şık "22%" değeri 22.5) | evet: 22.5% |
| L2-EQ-05-v01-q4 | numeric (açıklamada "yaklaşık %12"; fiyat modelin %13 üstünde) | evet |
| L2-CI-02-v01 | style (EN "excluded" zaman uyumsuz) | evet |
| L2-CI-03-v01-q4 | translation (AOSM ilk geçişte açılmamış) | evet |
| FSA-04/05, EQ-03/06, CI-02/04 şıkları (TR) | translation (ondalık nokta / binlik virgül karışık, "%-10,8") | evet: TR sayı biçimi (virgül ondalık, nokta binlik) |
