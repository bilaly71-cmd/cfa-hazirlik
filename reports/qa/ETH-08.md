# QA raporu — ETH-08 (Guidance for Standard VI)

Denetçi: reviewer-agent (RS1) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-08.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | Tüm sorular anahtarla uyumlu; her vakada tek savunulabilir doğru şık |
| Tutarlılık | answer / explanation / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 5 · B 5 · C 5 |
| Dil | EN sade, TR doğal ve eşdeğer |
| Kavramsal | VI(A) açıklama (somut, belirgin, sade), yönetim kurulu üyeliği; VI(B) front-running, yararlanıcı hesap, aile hesabı eşit muamele, ön onay/blackout/IPO kısıtı; VI(C) yönlendirme ücreti (nakdi/ayni) |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle yazılmış; Handbook örneğine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | Şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| ETH-08-b-q05 | ambiguous/style | şık C: "referral fees be accepted only from advisers" -> "paid only to advisers" (ücreti Taurus ödüyor; EN+TR) | evet |

Tüm ders, soru ve kelime öğeleri `verified` ile işaretlendi; başarısız öğe yok.
