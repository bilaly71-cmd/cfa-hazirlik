# QA raporu — QM-01..05, QM-11 ve FSA-09, FSA-11, FSA-12

Denetçi: reviewer-agent (RS11) · Tarih: 2026-10-16 · Dosyalar: `content/L1/QM/QM-01,02,03,04,05,11.json`, `content/L1/FSA/FSA-09,11,12.json` (+ aynı adlı `content/vocab/*.json`)

## Genel kontroller
| Kontrol | Sonuç |
|---|---|
| Şema | 9 dosyada hata 0, uyarı 0 (düzeltmelerden önce ve sonra) |
| Sayısal | verify_numeric.py: 0 hatalı. Getiri, TVM/IRR, istatistik, ertelenmiş vergi ve oran sorularının tümü python ile bağımsız yeniden hesaplandı (örn. IRR(-95,8,8,108)=%10,01; BEY=2×%3,41=%6,82, EAR %6,94; MWR=%-2,10; TWR 0,99 ve 1,09725; geometrik ort. %7,49 ve %14,35; kovaryans 19,7; r=0,55). Çeldiriciler tipik hatalardan türetilmiş ve tolerans dışı. |
| Bağımsız çözüm | 130/130 soru anahtara bakmadan çözüldü; hepsi anahtarla uyumlu, tek doğru şık. |
| Denge (A/B/C) | QM-01 4/3/3 · QM-02 2/2/1 · QM-03 4/3/3 · QM-04 5/5/5 · QM-05 7/7/6 · QM-11 2/2/1 · FSA-09 7/7/6 · FSA-11 10/10/10 · FSA-12 9/8/8. Hiçbir harf %45'i geçmiyor. |
| Dil / glossary | EN ve TR anlamca eşdeğer; EN-TR sayı karşılaştırması otomatik yapıldı (tek fark: FSA-09-d-q02'de "more likely than not" ↔ "yüzde 50'nin üzerinde", anlamca doğru). Glossary uyarısı yok. |
| Özgünlük | ngram-check: FSA-12-c-q01 ↔ EQ-09-d-q01 %86 iç kopya uyarısı vardı; soru yeniden yazıldı, son çalıştırmada şüpheli 0. |
| Kelime | Tanımsız vocab kimliği yok (tüm kimlikler mevcut vocab dosyalarında tanımlı, çift tanım yok). Her soruda 3-8 kimlik. 110 vocab terimi (QM-01:19, QM-02:3, QM-03:11, QM-04:9, QM-05:12, QM-11:20, FSA-09:17, FSA-11:11, FSA-12:8) gözden geçirilip `verified` (lexical-review) yapıldı. |

## Üreticinin işaretlediği noktalar
1. **BA II Plus medyan/kovaryans.** QM-05-a-q01 (medyan): `calculator` alanı yok, uydurma tuş yok; çözüm sıralama + orta değer. QM-05-a-q03 (örneklem SS) için DATA/STAT tuşları somutlaştırıldı (her girişten sonra iki kez [↓], LIN, Sx = 3. [↓]). QM-05-c-q03 (kovaryans): BA II Plus kovaryansı doğrudan vermez; tuşlar STAT ekranından Sx, Sy, r okuyup Kov = r × Sx × Sy yaklaşık hesabına çevrildi, nota "kesin değer için elle çarpım toplamı/(n-1)" eklendi. QM-05-c-q04: r doğrudan STAT'ta gösterilir, "..." içeren belirsiz tuşlar kaldırıldı.
2. **QM-03 MWR (a-q03).** Varsayım doğru: t=0 -100.000, t=1 -40.000 (110.000 değerli hesaba ekleme), t=2 +135.000. İki dönemli IRR çözümü %-2,10 (python ikili bölme ile doğrulandı); TWR (%-1,00) ve basit getiri (%-5) çeldiricileri uygun. Hata: BA II Plus CF tuş dizisi C01 yerine F01'e 40000 girdirirdi (fazladan [↓]); düzeltildi.
3. **FSA-09 IFRS/US GAAP farkları** bağımsız doğrulandı: DTA tanıma (UFRS: gelecekte vergilendirilebilir kâr muhtemel; US GAAP: tam DTA + gerçekleşmeme ihtimali %50'nin üzerindeyse değerleme karşılığı), vergi oranı (UFRS enacted/substantively enacted; US GAAP enacted), iskonto yasak (ikisinde de), bilançoda duran varlık/yükümlülük (UFRS ve ASU 2015-17 sonrası US GAAP). Ders tablosu, d-q01 ve d-q02 tutarlı; değişiklik gerekmedi.
4. **Vergi oranı varsayımsal.** Soru gövdelerinde oran verilen sayıdır (varsayım). Ders örneği "varsayımsal vergi oranı %25" olarak işaretlendi (EN/TR); vocab `statutory-tax-rate` örneği "bu örnekte ... varsayılmıştır" yapıldı.

Not: Tuş dizileri proje kuralına göre AOS modunu varsayar (`docs/RESEARCH.md`); zincir (Chn) modunda "a × b + c × d" biçimindeki dizilerin sonucu farklı çıkar. QM-01..04 ve FSA içinde bu kalıp AOS için doğrudur, değiştirilmedi.

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| QM-03-a-q03 | key (BA II Plus CF/IRR tuşları: fazladan [↓] ile 40000 F01'e girerdi) | evet |
| QM-05-a-q03 | key (STAT/DATA tuşları belirsiz, "..." ) | evet |
| QM-05-c-q03 | key (kovaryans tuşları belirsiz; doğrudan çıkmayan değer) | evet (Kov = r·Sx·Sy, nota eklendi) |
| QM-05-c-q04 | key (belirsiz "..." tuşları) | evet |
| FSA-11-b-q05 | key (CCC için "..." içeren tuş dizisi) | evet (tek satır AOS dizisi) |
| FSA-12-c-q01 | style/özgünlük (EQ-09-d-q01 ile %86 örtüşme) | evet (rekabet şiddeti sorusu olarak yeniden yazıldı: stem, şıklar, gerekçeler, vocab, pattern; zorluk 1→2; cevap B) |
| FSA-09-lesson (örnek) | style (vergi oranı varsayım olarak işaretli değildi) | evet |
| FSA-09 vocab `statutory-tax-rate` | style (oran gerçekmiş gibi) | evet |

## Paket sonuçları
| Paket | Geçen | Düzeltilen | Başarısız |
|---|---|---|---|
| QM-01 | 10 | 0 | 0 |
| QM-02 | 5 | 0 | 0 |
| QM-03 | 10 | 1 | 0 |
| QM-04 | 15 | 0 | 0 |
| QM-05 | 20 | 3 | 0 |
| QM-11 | 5 | 0 | 0 |
| FSA-09 | 20 | 0 (+ders/vocab örneği) | 0 |
| FSA-11 | 30 | 1 | 0 |
| FSA-12 | 25 | 1 | 0 |

Geçen sayılar toplam soru sayısıdır (düzeltilenler dahil); her paketin dersi `content-review+bilingual-check`, soruları `independent-solve+numeric-script+bilingual-check`, vocab terimleri `lexical-review` ile `verified` objesi aldı.
