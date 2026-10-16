# QA raporu — ETH-07 (Guidance for Standard V)

Denetçi: reviewer-agent (RS1) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-07.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | Tüm sorular anahtarla uyumlu; her vakada tek savunulabilir doğru şık |
| Tutarlılık | answer / explanation / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 4 · B 6 · C 5 (en yüksek %40) |
| Dil | EN sade, TR doğal ve eşdeğer |
| Kavramsal | V(A) makul dayanak, 3. taraf araştırma, nicel model, dış yönetici seçimi; V(B) süreç değişikliği açıklaması, gerçek-görüş ayrımı, kısa form; V(C) kayıt (7 yıl yalnızca yasa yoksa; yerel yasa katıysa o) |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle yazılmış; Handbook örneğine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | Şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| ETH-07-c-q04 | style/translation | dilbilgisi: "an Eurobond" -> "a Eurobond" | evet |

Tüm ders, soru ve kelime öğeleri `verified` ile işaretlendi; başarısız öğe yok.
