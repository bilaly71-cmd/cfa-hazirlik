# QA raporu — ETH-10 (Application of the Code and Standards)

Denetçi: reviewer-agent (RS1) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-10.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | Tüm sorular anahtarla uyumlu; her vakada tek savunulabilir doğru şık |
| Tutarlılık | answer / explanation / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 4 · B 4 · C 4 |
| Dil | EN sade, TR doğal ve eşdeğer |
| Kavramsal | Entegre vakalar: I(B) hediye, III(C), I(B)/ücret yapısı, II(A) içsel bilgi, IV(C), I(A) katı kural, V(A)/(B), IV(A), I(C) intihal, IV(B)+VI(A) ayrı yükümlülükler, VII(B), VI(B) |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle yazılmış; Handbook örneğine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | Şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| (yok) | - | - |

- Tanımsız 37 kelime kimliği: 13 mevcut eşdeğere yönlendirildi (stricter, statistics-office, quarterly, gift, bound-by, board-of-directors, downgrade, legal, stable, statement, prominent, source, leverage), 24 yeni terim `content/vocab/ETH-10.json` dosyasına eklendi (lexical-review). Dersin ve soruların vocab_ids listeleri güncellendi.

Tüm ders, soru ve kelime öğeleri `verified` ile işaretlendi; başarısız öğe yok.
