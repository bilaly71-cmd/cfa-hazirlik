# QA raporu — FSA-04 (Financial Statement Analysis: Statement of Cash Flows)

Denetçi: reviewer-agent (RS2) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-04.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal | 13 sayısal soru; 105 kapanış nakdi, dolaylı İNA=935, YNA=-260, FNA=150, tahsilat 2.340/4.850, tedarikçi ödemesi 1.550/2.970/2.450, faaliyet gideri 735, vergi 190, faiz 127, düzeltilmiş İNA=370 python ile yeniden hesaplandı. Ders örneği (dolaylı 275 = doğrudan 275) elle doğrulandı. IFRS/US GAAP sınıflandırma kuralları (faiz, temettü, vergi, kredili mevduat) doğru. |
| Bağımsız çözüm | 23/23 soru anahtara bakmadan çözüldü, hepsi anahtarla uyumlu; tek doğru şık |
| Tutarlılık | answer / explanation / solution_steps / calculator tuşları (BA II Plus: zincir modu notları, [2ND][LN] = eˣ, [√x] sırası, TVM işaretleri) / wrong_option_reasons birbiriyle tutarlı |
| Denge (A/B/C) | A 8 · B 8 · C 7 (hiçbir harf %45'i geçmiyor; değişiklik gerekmedi) |
| Dil / glossary | EN sade ve sınav terminolojisine uygun; TR doğal; sayılar iki dilde aynı; glossary uyarısı yok |
| Kavramsal | CFA L1 kapsamı ve güncel standartlarla uyumlu |
| Özgünlük | ngram-check: şüpheli yok (en yüksek kök örtüşmesi %18). |
| Kelime | Tanımsız kimlik yok. Dosyadaki mevcut 30 kelime (FSA-04.json) tanım/okunuş/IPA açısından gözden geçirildi, `verified` (lexical-review) işaretlendi. |

## Ders
Nakit akış tablosu dersi (bağlantı, doğrudan/dolaylı, IFRS-US GAAP) doğrulandı.

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-04-a-q05 | key/style (şık A=45 ile wrong_option_reasons["A"] (-150 hesabı) tutarsızdı; A "30 (nakit değişimi, açılış bakiyesi unutulmuş)" çeldiricisine dönüştürüldü, anahtar B=105 aynı) | evet |

## Geçen öğeler
Ders `FSA-04-lesson` ve 23 soru `verified` objesi aldı (düzeltilenler dahil). Başarısız öğe yok.
