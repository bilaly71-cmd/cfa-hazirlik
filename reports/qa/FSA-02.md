# QA raporu — FSA-02 (Analyzing Income Statements)

Denetçi: reviewer-agent (R7) · Tarih: 2026-10-16 · Dosya: `content/L1/FSA/FSA-02.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | 13 soru, 0 hatalı |
| Bağımsız çözüm (python) | a-q03 15 · a-q04 50 · b-q04 720.000 · d-q01 4,09 (45/11) · d-q02 13.750.000 · d-q03 2,61 (30/11,5) · d-q04 2,857 (hazine payı, ortalama fiyat 32) · d-q05 1,20 (tahvil 3,00/pay > 1,20 → sulandırma karşıtı) · d-q06 2,27 (opsiyon zararda, dışarıda) · e-q01 %35 · e-q02 %15 · e-q03 %9,33 · e-q06 %25 — hepsi anahtarla eşleşiyor; çeldiriciler tipik hatalardan türetilmiş ve tolerans dışında |
| BA II Plus tuşları | Chain modunda soldan sağa doğru sonucu veriyor (13/13); ara değerlerin elle hazırlandığı yerler notta belirtilmiş |
| Tutarlılık | explanation / solution_steps / wrong_option_reasons uyumlu; şık harfi atfı yok |
| Denge (A/B/C) | A 11 · B 9 · C 10 |
| Dil / glossary lint | Uyarı yok; TR doğal, ondalık ayırıcı iki dilde doğru |
| Kavramsal | IFRS 15/ASC 606 beş adım, kontrol devri, asıl işletme/aracı (brüt/net), değişken bedel kısıtı (IFRS "highly probable" / US GAAP "probable"), aktifleştirme etkileri (CFO yatırım faaliyetine kayar), Ar-Ge farkı (IAS 38 geliştirme; US GAAP yazılım istisnası), durdurulan faaliyet (vergi sonrası, altta), olağanüstü kalem yasağı, politika/tahmin/hata ayrımı, adi–sulandırılmış EPS (if-converted, hazine payı, sulandırma karşıtlığı testi, bölünmenin geriye dönük uygulanması), dikey analiz ve efektif vergi oranı doğru |
| Özgünlük | `ngram-check`: bu modül için şüpheli eşleşme yok |
| Kelime | Tanımsız kimlik yok (3-8/soru). `content/vocab/FSA-02.json`: ETH-04'te zaten tanımlı `generate` ve `fine` tekrarları çıkarıldı; kalan 73 terim lexical-review ile doğrulandı |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| FSA-02-d-q06 | vocab (soruda geçmeyen `respectively` → `exercise-price`) | evet |
| vocab/FSA-02.json | vocab (ETH-04 ile çift tanım: generate, fine) | evet |

## Geçen öğeler
Ders `FSA-02-lesson` ve 30 soru `verified` objesi aldı. Başarısız öğe yok.

## Notlar
- e-q03: şık etiketi %9,3, `value` 9,33 — ifade 9,333 ile tolerans içinde; sorun değil.
- Ders örneği (Kuzey Lojistik) ile d-q03/d-q04 farklı sayılar kullanıyor; kopya yok.
