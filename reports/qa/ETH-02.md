# QA raporu — ETH-02 (Code of Ethics and Standards of Professional Conduct)

Denetçi: reviewer-agent (R4) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-02.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | 15/15 soru anahtarla uyumlu; her soruda tek savunulabilir doğru şık |
| Tutarlılık (answer/explanation/wrong_option_reasons) | Uyumlu |
| Denge (A/B/C) | A 5 · B 5 · C 5 |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | PCP süreci (öz beyan, şikâyet, kamuya açık bilgi, gözetmen raporu; uyarı mektubu/yaptırım önerisi/duruşma paneli; kınama, askıya alma, unvan iptali, aday için men), Etik Kuralların 6 bileşeni, 7 Standart ve alt başlıkları (I(A)-(E), II(A)-(B), III(A)-(E), IV(A)-(C), V(A)-(C), VI(A)-(C), VII(A)-(B)) doğru; "daha katı kural" ilkesi, dissociate ≠ bildirim zorunluluğu, VI(B) öncelik sırası, VII(B) kısmi unvan yasağı doğru |
| Standards of Practice Handbook benzerliği | Senaryolar genel kalıplar (hediye/yerel kural, IV(C) yazılı ret, kartvizit); Handbook örneklerine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | ETH için şüpheli eşleşme yok |
| Kelime | 3-6 vocab_ids/soru; tanımsız 29 kimlik için `content/vocab/ETH-02.json` oluşturuldu (6'sı ETH-01'de tanımlandı; eş zamanlı `GEN.json`'da tanımlanan 11 kimlik tekrar tanımlanmamak için çıkarıldı) → son durumda 12 terim; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| — | Düzeltme gerektiren öğe yok | — |

## Geçen öğeler
Ders `ETH-02-lesson` ve 15 soru `verified` objesi aldı. Başarısız/`verified: false` kalan öğe yok.

## Notlar
- `ETH-02-c-q01` (Hakan, saat hediyesi) ders bölümündeki örnekle aynı senaryoyu kullanıyor; dış kaynak kopyası değil, paket içi tekrar. Öğrenme değeri açısından ileride farklılaştırılabilir; hata sayılmadı.
- Hata oranı: 0/15.
