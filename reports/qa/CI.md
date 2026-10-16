# QA raporu: CI-01..CI-07 (2026-10-16, reviewer-agent)

Şema, sayısal betik, bağımsız çözüm (NPV/IRR/WACC/MM/DIO/DSO/CCC/oranlar python ile yeniden hesaplandı), TR/EN sayı eşdeğerliği, wrong_option_reasons anahtarları, A/B/C dengesi, vocab sayısı (3-8) ve tanımsız vocab kimliği (yok) kontrol edildi. Hiçbir soru başarısız değil; 115 soru, 7 ders ve 51 kelime verified yapıldı.

| id | sorun türü | düzeltildi mi |
|---|---|---|
| CI-04-b-q04 | style (şık A "0.0 days" 0,0077 değerini anlamsız gösteriyordu) | evet: "0.01 days / 0,01 gün" |
| CI-06-a-q03 | ambiguous/style (TL faiz varsayımı belirtilmemiş; "%30 maliyetli %30 borç" belirsiz) | evet: "hypothetical lira rates" ve yüzde yapısı açıklandı (EN+TR) |
| CI-01-b-q03, CI-04-a/b/c, CI-05-b, CI-06-a/c (şık TR sayıları) | translation (TR şıklarda EN ondalık/binlik biçimi: 227.6, %21.7, 675,000) | evet: TR biçimine çevrildi (227,6; %21,7; 675.000) |
| CI-03 vocab principal-agent | translation (definition_tr bozuk cümle) | evet |

Notlar
- Kavramsal bayrak noktaları: CI-02 TSRS/BIST Sürdürülebilirlik Endeksi ifadesi genel ve doğru; CI-03 SPK "comply or explain" ve bağımsız üye ifadesi genel, kesin sayı yok; CI-06 TL oranları artık varsayımsal olarak belirtildi.
- Dağılım: CI-01..04 5/5/5; CI-05, CI-06 7/7/6; CI-07 4/3/3.
- Kelime: tüm CI vocab kimlikleri tanımlı. Bazı eski kimlikler term_en slug'ıyla birebir değil (principal-agent, days-inventory, days-payable, irr, roic, target, market-value, channel, razor-and-blade); başka yerlerde atıf olduğu için yeniden adlandırılmadı, işlevsel sorun yok. Vocab dosyaları (CI-01..07) verified "lexical-review" yapıldı.
- ngram-check CI dosyaları için uyarı üretmedi.
