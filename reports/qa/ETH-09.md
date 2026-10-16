# QA raporu — ETH-09 (Guidance for Standard VII)

Denetçi: reviewer-agent (RS1) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-09.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | Tüm sorular anahtarla uyumlu; her vakada tek savunulabilir doğru şık |
| Tutarlılık | answer / explanation / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 4 · B 3 · C 3 |
| Dil | EN sade, TR doğal ve eşdeğer |
| Kavramsal | VII(A) sınav içeriği gizliliği (konu dahil), görüş serbest, gönüllü/not verici; VII(B) aday/üye statüsü, "CFA (pending)" ihlal, lapse, unvan biçimi ve firma adı, abartı |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle yazılmış; Handbook örneğine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | Şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| (yok) | - | - |

- Düzeltme yok (10/10 anahtar uyumlu).

Tüm ders, soru ve kelime öğeleri `verified` ile işaretlendi; başarısız öğe yok.
