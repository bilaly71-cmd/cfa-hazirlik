# QA raporu — FSA-01 (Introduction to Financial Statement Analysis)

Denetçi: reviewer-agent (R1) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-01.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | 27/27 soru anahtarla uyumlu; tek doğru şık |
| Tutarlılık (answer/explanation/wrong_option_reasons) | Uyumlu |
| Denge (A/B/C) | A 9 · B 8 · C 10 (en yüksek %37) |
| Dil / glossary lint | Uyarı yok; 2 soruda TR üslup düzeltmesi |
| Kavramsal | Altı adımlı çerçeve, denetim görüşleri, KAM, IASB/FASB vs SEC/SPK, LIFO/geliştirme maliyeti/yeniden değerleme farkları, UFRS 18 (1.1.2027), TMS 29 (KGK, 31.12.2023 sonrası) doğru |
| Özgünlük (`ngram-check`) | Bu modülde şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru sağlanıyor; tanımsız 90 kimlik `content/vocab/FSA-01.json`'a eklendi (başka dosyalarda sonradan tanımlananlar çıkarıldı; son durumda 48 terim bu dosyada) |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-01-c-q03 | style (stem_tr "en olası olarak" → "büyük olasılıkla") | evet |
| FSA-01-e-q04 | style (stem_tr "en olası olarak" → "büyük olasılıkla") | evet |

## Geçen öğeler
Ders `FSA-01-lesson` ve 27 soru `verified` objesi aldı. Başarısız/`verified: false` kalan öğe yok.

## Notlar
- `FSA-01-a-q01` pattern_ids `best-describes` (soru "which step comes first"); içerik doğru, değiştirilmedi.
- Hata oranı: 2/27 soruda yalnızca üslup; anahtar/kavram hatası 0.
