# QA raporu — FSA-06 (Analysis of Inventories)

Denetçi: reviewer-agent (R2) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-06.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 7 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q02 190 · a-q03 30 · a-q04 22 (LCM: tavan 190, taban 178, RC 170 → piyasa 178) · b-q01 3.160 · b-q02 1.470 · b-q04 120 · b-q05 4.170 — hepsi anahtarla eşleşiyor, çeldiriciler tolerans dışında |
| BA II Plus tuşları | Chain modunda soldan sağa doğru sonucu veriyor (6/6; STO/RCL kullanımı doğru) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 6 · B 6 · C 6 |
| Dil / glossary lint | Uyarı yok; TR doğal, sayılar iki dilde aynı (ondalık virgül/nokta doğru) |
| Kavramsal | IAS 2/TMS 2 LIFO yasağı, LCNRV ve US GAAP LCM (yalnızca LIFO/perakende) kuralı, IFRS iptal üst sınırı, LIFO rezervi ile FIFO'ya çevirme (SMM'de değişim, özkaynakta vergi sonrası), LIFO tasfiyesi, LIFO'ya geçişin ileriye dönük uygulanması, düşen fiyatlarda etkilerin tersine dönmesi, dipnot kalemleri ve stok bileşimi yorumu doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok |
| Kelime | Tanımsız 17 kimlik `content/vocab/FSA-06.json` dosyasına eklendi (cost-of-sales, current-ratio, ending-inventory, finished-goods, freight, goods-available, gross-margin, lifo-reserve, lower-of, net-realizable-value, pledged, raw-materials, replacement-cost, security, tax-rate, work-in-progress, write-down) |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| — | — | Düzeltme gerekmedi |

## Geçen öğeler
Ders `FSA-06-lesson` ve 18 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- `FSA-06-a-q05`: "stok devir hızı yükselir" yalnızca değer düşüklüğü SMM'ye yazıldığında ve ortalama stok azaldığında geçerlidir; soru metni "kaydedildiği yıl" dediği için tutarlı.
- Ders örneği (100@10, 200@12, 100@15, 280 satış) b-q01/b-q02 ile aynı veri setini kullanıyor; bu kasıtlı pekiştirme, kopya değil.
