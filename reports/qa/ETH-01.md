# QA raporu — ETH-01 (Ethics and Trust in the Investment Profession)

Denetçi: reviewer-agent (R4) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-01.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | 40/40 soru anahtarla uyumlu; her soruda tek savunulabilir doğru şık |
| Tutarlılık (answer/explanation/wrong_option_reasons) | Uyumlu |
| Denge (A/B/C) | A 12 · B 13 · C 15 (en yüksek %37,5) |
| Dil / glossary lint | Uyarı yok; 1 soruda TR terim düzeltmesi |
| Kavramsal | Etik tanımı, meslek özellikleri, bilgi asimetrisi, üç engel (aşırı güven / durumsal etki / kısa vade), etik-hukuk ayrımı, 4 adımlı çerçeve (identify–consider–decide and act–reflect) müfredatla uyumlu |
| Standards of Practice Handbook benzerliği | Bu modül Standart vakası içermiyor; senaryolar özgün (kurgusal Türk firmaları) |
| Özgünlük (`ngram-check`) | ETH için şüpheli eşleşme yok |
| Kelime | 3-8 vocab_ids/soru sağlanıyor; tanımsız 31 kimlik `content/vocab/ETH-01.json`'a eklendi; eş zamanlı olarak `GEN.json`/`FSA-10.json`/`FI-15.json` içinde tanımlananlar (20 kimlik) tekrar tanımlanmamak için çıkarıldı → son durumda 11 terim bu dosyada; tanımsız kimlik 0 |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| ETH-01-d-q05 | translation (A şıkkı TR "daha yüksek beklenen getiri" → "daha yüksek getiri talebi"; EN "higher required returns") | evet |

## Geçen öğeler
Ders `ETH-01-lesson` ve 40 soru `verified` objesi aldı. Başarısız/`verified: false` kalan öğe yok.

## Notlar
- "most accurate" kalıplı sorularda (a-q03, e-q04, e-q05, f-q04, g-q01, h-q05) `pattern_ids` `most-likely`; ETH-04'te aynı kalıp için `most-accurate` kullanılmış. Spesifikasyon listesinde `most-accurate` yok; içerik doğru, değiştirilmedi.
- Hata oranı: 1/40 soruda yalnızca çeviri; anahtar/kavram hatası 0.
