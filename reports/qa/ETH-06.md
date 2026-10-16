# QA raporu — ETH-06 (Guidance for Standard IV)

Denetçi: reviewer-agent (RS1) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-06.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | Tüm sorular anahtarla uyumlu; her vakada tek savunulabilir doğru şık |
| Tutarlılık | answer / explanation / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 4 · B 6 · C 5 (en yüksek %40) |
| Dil | EN sade, TR doğal ve eşdeğer |
| Kavramsal | IV(A) rakip bağımsız çalışma, ayrılma/müşteri çekme/işveren mülkiyeti, ihbar; IV(B) yazılı onay, geçmiş performans hediyesi; IV(C) gözetmen sorumluluğu, devir, makul çaba |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle yazılmış; Handbook örneğine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | Şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| (yok) | - | - |

- `promote` kelimesine ikinci anlam eklendi (tanıtmak/pazarlamak; ETH-10 kullanımı için), `whistleblowing` okunuşu düzeltildi.

Tüm ders, soru ve kelime öğeleri `verified` ile işaretlendi; başarısız öğe yok.
