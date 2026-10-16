# QA raporu — ETH-03 (Guidance for Standard I: Professionalism)

Denetçi: reviewer-agent (R4) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-03.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | 15/15 soru anahtarla uyumlu; her soruda tek savunulabilir doğru şık |
| Tutarlılık (answer/explanation/wrong_option_reasons) | Uyumlu (yeniden yazılan 3 soruda şık/gerekçe/vocab birlikte güncellendi) |
| Denge (A/B/C) | A 5 · B 5 · C 5 (yeniden yazımlarda cevap harfleri korundu) |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | I(A) daha katı kural + dissociate, I(B) hediye ölçütü ("makul ölçüde zedeleyebilecek"; müşteri hediyesi → işverene bildirim), I(C) intihal/garanti/atlama, I(D) dürüstlükle ilgisiz kişisel sorunlar kapsam dışı, I(E) yetkinlik; V(C) 7 yıl önerisi doğru |
| Standards of Practice Handbook benzerliği | 3 senaryo Handbook örneklerine fazla benziyordu (özel jet + tatil köyüyle tesis ziyareti; restoran iflası → kişisel iflas; ihraççının toplantıya davet etmeme tehdidi) → yeniden yazıldı (aşağıda) |
| Özgünlük (`ngram-check`) | ETH için şüpheli eşleşme yok |
| Kelime | 4-6 vocab_ids/soru; tanımsız 29 kimlik için `content/vocab/ETH-03.json` oluşturuldu (7'si ETH-01/02'de tanımlandı; eş zamanlı `GEN.json`'da tanımlanan 16 kimlik tekrar tanımlanmamak için çıkarıldı) → son durumda 6 terim; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| ETH-03-lesson (example bölümü, Vaka 1) | style/özgünlük (Handbook benzeri "özel jet + tatil köyü" senaryosu → saha turu + analistler ve eşlerine ücretsiz tatil teklifi) | evet |
| ETH-03-a-q02 | style/özgünlük (aynı senaryo; şıklar ve gerekçeler yeniden yazıldı, cevap B korundu; vocab: `commercial-flight` → `spouse`, `host`) | evet |
| ETH-03-a-q04 | style/özgünlük (restoran iflası → hastalık sonrası taşıt kredisinin yeniden yapılandırılması; I(D) sonucu aynı, cevap A korundu; vocab: `bankruptcy` → `illness`, `restructure`) | evet |
| ETH-03-c-q01 | style/özgünlük (ihraççının "toplantıya davet etmeme" baskısı → tahvil ihracını başka kuruma verme tehdidi + araştırma müdürü baskısı; I(B) ihlali, cevap B korundu; A şıkkı "işverene sadakat" çeldiricisi olarak güncellendi) | evet |

## Geçen öğeler
Ders `ETH-03-lesson` ve 15 soru `verified` objesi aldı. Başarısız/`verified: false` kalan öğe yok.

## Notlar
- Hata oranı: 3/15 soruda yalnızca özgünlük/üslup (senaryo yeniden yazımı); anahtar/kavram hatası 0.
