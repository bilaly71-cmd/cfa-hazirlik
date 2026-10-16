# QA raporu — FSA-08 (Topics in Long-Term Liabilities and Equity)

Denetçi: reviewer-agent (R7) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-08.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 7 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q02 331.213 (4 yıl, %8, END; BGN → 357.710 çeldirici) · a-q03 26.497 · a-q04 109.300 (26.497 + 82.803) · a-q05 73.503 (US GAAP faaliyet: 100.000 − faiz) · a-q07 51.213 (satış tipi kâr) · b-q02 80 (net yükümlülük) · b-q04 2.000.000 (hibe tarihi GUD 6 × 1 mn / 3) — hepsi anahtarla eşleşiyor |
| BA II Plus tuşları | TVM (4 N, 8 I/Y, 100000 PMT, 0 FV → PV −331.213), % tuşu ve STO/RCL adımları doğru (7/7) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 8 · B 8 · C 6 |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | IFRS 16 tek kiracı modeli (ROU + yükümlülük = PV; faiz + doğrusal itfa, öne yüklü; anapara finansman), US GAAP finansal/faaliyet ayrımı (5 ölçüt; faaliyette tek doğrusal gider, tüm ödeme CFO, itfa = denkleştirici), kiraya veren (faaliyet: varlık kalır; satış tipi: PV hasılat − defter değeri), DC/DB planları, fonlama durumu net sunum, IAS 19 (hizmet maliyeti + net faiz K/Z; yeniden ölçümler DKG, recycling yok) ile US GAAP (beklenen getiri; DKG'den itfa) farkı, hisse bazlı ödeme (hibe tarihi GUD, hak ediş süresine yayma, toplam özkaynak değişmez; nakit ödemeli SAR = yükümlülük), kısa vadeli kısım, borç/kira/emeklilik/opsiyon dipnotları, sabit faizli tahvilin GUD'u doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok |
| Kelime | 36 tanımsız kimlik vardı. 3'ü mevcut eşdeğere yönlendirildi (`derecognize` → `derecognition`, `maturity-analysis` → `maturity-schedule`, `vest` çıkarıldı — aynı soruda `vesting-period` var). Kalan 34 terim yeni `content/vocab/FSA-08.json` dosyasına eklendi (lease, lessee, lessor, right-of-use-asset, lease-liability, front-loaded, incremental-borrowing-rate, operating-lease, sales-type-lease, selling-profit, economic-life, purchase-option, ordinary-annuity, defined-contribution-plan, defined-benefit-plan, contribution, funded-status, underfunded, service-cost, actuarial, remeasurement, expected-return, grant-date, vesting-period, equity-settled, cash-settled, volatility, risk-free-rate, dividend-yield, current-portion, non-current, fixed-rate, maturity-schedule, refinancing-risk) — verified: lexical-review |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-08-a-q09 | vocab (`derecognize` → mevcut `derecognition`) | evet |
| FSA-08-b-q04 | vocab (`vest` çıkarıldı; `vesting-period` zaten var) | evet |
| FSA-08-c-q03 | vocab (`maturity-analysis` → `maturity-schedule`) | evet |
| FSA-08-lesson + 20 soru | vocab (34 tanımsız kimlik tanımlandı) | evet |

## Geçen öğeler
Ders `FSA-08-lesson` ve 22 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- Ders örneği (Pamukkale Tekstil, 331.213) a-q02…a-q07 ile aynı veri setini kullanıyor; kasıtlı pekiştirme.
- a-q03 kalkülatör: `331213 [×] 8 [%] [=]` BA II Plus'ta doğrudan 26.497,04 verir; AMORT alternatifi notta.
