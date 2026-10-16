# QA raporu — FSA-07 (Analysis of Long-Term Assets)

Denetçi: reviewer-agent (R7) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-07.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 11 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q02 600.000 (US GAAP yazılım: teknolojik fizibilite sonrası) · a-q03 250 (marka 1.100 içinde) · b-q01 120.000 (RA = maks(620, 680)) · b-q02 70.000 (iki adım: 500 > 480 → CA − FV) · b-q04 kazanç 70.000 · b-q05 80.000 (iptal tavanı 380.000) · b-q07 100.000 (400.000 azalış − 300.000 DKG fazlası) · c-q01 3,75 · c-q02 7,5 · c-q03 12,5 · c-q06 1,50 — hepsi anahtarla eşleşiyor |
| BA II Plus tuşları | Chain / STO-RCL adımları doğru (11/11) |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu |
| Denge (A/B/C) | A 6 · B 8 · C 7 |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | IAS 38 araştırma/geliştirme, US GAAP yazılım istisnası (satılacak yazılım: teknolojik fizibilite; iç kullanım: uygulama geliştirme aşaması), birleşmede edinilen süregelen Ar-Ge (her iki çerçevede aktif, tamamlanana kadar itfa yok), şerefiye (itfa yok, yıllık test), IFRS değer düşüklüğü (RA = maks(FVLCS, VIU)), US GAAP iki adım (iskonto edilmemiş NA testi, zarar = CA − FV), iptal kuralları (IFRS tavanlı; şerefiyede ve US GAAP kullanımda tutulanlarda yok), yeniden değerleme modeli (fazla DKG, fazlayı aşan kısım K/Z), yaş/ömür tahminleri ve varsayımları, capex/amortisman oranı doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok |
| Kelime | Tanımsız kimlik yok. `content/vocab/FSA-07.json`: ETH-04'te doğrulanmış `acquire` tekrarı çıkarıldı; `turnover` tanımı hem aktif devir hızını hem hisse devir hızını kapsayacak biçimde genişletildi (EQ-03 bu kimliği kullanıyor); kalan 59 terim lexical-review ile doğrulandı |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-07-c-q06 | numeric/style (B çeldiricisi 2,20 veriden türemiyordu → 0,50 = (660 − 440)/440, gerekçe güncellendi) | evet |
| vocab/FSA-07.json | vocab (çift tanım: acquire; turnover tanımı genişletildi) | evet |

## Geçen öğeler
Ders `FSA-07-lesson` ve 21 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- a-q03 ve FSA-03-b-q01 benzer şerefiye kurgusu kullanıyor (farklı sayılar/tuzak: marka dahil mi); modüller arası pekiştirme, kopya değil.
