# Hata örneklemi (RS14) - 2026-10-16

Yöntem: `random.seed(20261016)`; 1.764 doğrulanmış sorudan konu başına 3 (30) + kalan havuzdan 20 rastgele = 50 soru. Cevap anahtarı görülmeden yalnızca `stem_en` + `options` ile çözüldü (sayısallar python/elle hesaplandı), sonra anahtar, TR çeviri, açıklama ve `solution_steps` ile karşılaştırıldı. Örneklemdeki tüm sorular 3 şıklı (mcq3); hiçbirinde ayrı BA II Plus tuş listesi yok (yalnızca QM-04-b-q05 `values` ile N/PV/PMT/FV veriyor, doğru).

| soru id | konu | benim cevabım | anahtar | uyuşuyor mu | sorun türü |
|---|---|---|---|---|---|
| QM-04-b-q05 | QM | A | A | evet | yok (hesap: BEY = 6,8236%, EAR 6,94%; tuş dizisi N=12, PV=-960, PMT=30, FV=1000, CPT I/Y doğru) |
| QM-10-b-q01 | QM | C | C | evet | yok |
| QM-09-c-q01 | QM | B | B | evet | yok |
| ECO-05-f-q01 | ECO | A | A | evet | yok |
| ECO-08-a-q01 | ECO | A | A | evet | yok |
| ECO-04-d-q01 | ECO | C | C | evet | yok (not: "çıktı" etkisi belirsiz ama C yalnızca faiz/harcama bileşimini söylüyor; tek doğru C) |
| CI-04-c-q02 | CI | C | C | evet | yok |
| CI-02-b-q03 | CI | A | A | evet | yok |
| CI-01-c-q03 | CI | B | B | evet | yok |
| FSA-12-a-q03 | FSA | C | C | evet | yok (not: amortisman SG&A/SMM dışında ayrı kalem varsayımı soruda açık; kabul edilebilir) |
| FSA-06-a-q03 | FSA | B | B | evet | yok |
| FSA-12-a-q05 | FSA | B | B | evet | yok |
| EQ-05-b-q05 | EQ | A | A | evet | yok |
| EQ-02-a-q03 | EQ | C | C | evet | yok |
| EQ-03-d-q04 | EQ | B | B | evet | yok |
| FI-03-c-q02 | FI | B | B | evet | yok |
| FI-01-a-q02 | FI | C | C | evet | yok |
| FI-18-d-q02 | FI | C | C | evet | yok |
| DER-05-a-q01 | DER | A | A | evet | yok |
| DER-07-b-q03 | DER | A | A | evet | yok |
| DER-05-b-q03 | DER | A | A | evet | yok |
| AI-06-c-q01 | AI | B | B | evet | yok |
| AI-06-b-q03 | AI | A | A | evet | yok |
| AI-06-b-q02 | AI | C | C | evet | yok |
| PM-03-c-q03 | PM | B | B | evet | yok |
| PM-05-a-q02 | PM | B | B | evet | yok |
| PM-03-e-q01 | PM | C | C | evet | yok |
| ETH-07-a-q05 | ETH | C | C | evet | yok |
| ETH-01-g-q01 | ETH | B | B | evet | yok |
| ETH-06-c-q01 | ETH | C | C | evet | yok (not: hediye normalde I(B) kapsamında; A/B zaten yanlış, C tek doğru) |
| FSA-10-e-q05 | FSA | C | C | evet | yok |
| FI-04-b-q03 | FI | C | C | evet | yok (not: "haircut" tanımı (teminat−nakit)/teminat varsayımıyla 111,1%; soru tanımı belirtmiyor ama B/A ayırt edici) |
| ETH-03-a-q01 | ETH | A | A | evet | yok |
| CI-02-a-q03 | CI | C | C | evet | yok |
| FI-16-b-q02 | FI | C | C | evet | yok |
| FSA-07-c-q06 | FSA | C | C | evet | yok |
| EQ-01-b-q01 | EQ | B | B | evet | yok |
| FSA-12-b-q02 | FSA | A | A | evet | yok |
| PM-02-h-q03 | PM | B | B | evet | yok |
| AI-04-d-q03 | AI | B | B | evet | yok |
| FI-12-c-q04 | FI | A | A | evet | yok |
| ECO-07-c-q04 | ECO | C | C | evet | yok |
| FSA-02-e-q05 | FSA | B | B | evet | yok |
| FI-17-b-q05 | FI | A | A | evet | yok |
| EQ-11-c-q01 | EQ | C | C | evet | yok |
| PM-06-e-q01 | PM | C | C | evet | yok |
| DER-09-a-q02 | DER | B | B | evet | yok |
| PM-06-g-q02 | PM | C | C | evet | yok |
| DER-07-a-q05 | DER | C | C | evet | yok |
| EQ-04-b-q02 | EQ | C | C | evet | yok |

## Özet
- Anahtar hatası: **0 / 50 (%0,0)**
- Belirsiz / iki doğrulu soru: 0 / 50
- Sayısal hata (cevap veya açıklama aritmetiği): 0 / 50 (12 sayısal soru yeniden hesaplandı, hepsi tutuyor)
- EN-TR anlam farkı: 0 / 50
- Açıklama-anahtar tutarsızlığı: 0 / 50
- Hesap makinesi tuş dizisi sorunu: 0 / 50
- Kalite sorunu (kritik olmayan): 0; yalnızca aşağıdaki 4 küçük not (düzeltme gerektirmez).
- Not: n=50 ile %95 üst sınır yaklaşık %5,8 (0/50 için "3/n" kuralı); gerçek hata oranının düşük olduğu söylenebilir ama 0 olduğu kanıtlanmaz.

## Konu bazında
| konu | örnek sayısı | anahtar hatası | kalite sorunu |
|---|---|---|---|
| QM | 3 | 0 | 0 |
| ECO | 4 | 0 | 0 |
| CI | 4 | 0 | 0 |
| FSA | 7 | 0 | 0 |
| EQ | 6 | 0 | 0 |
| FI | 7 | 0 | 0 |
| DER | 5 | 0 | 0 |
| AI | 4 | 0 | 0 |
| PM | 6 | 0 | 0 |
| ETH | 4 | 0 | 0 |

## Gerçek hatalar ve düzeltme önerileri
Gerçek hata bulunmadı; düzeltme gerekmiyor.

## İsteğe bağlı küçük iyileştirmeler (hata değil)
1. FSA-12-a-q03: gövdeye "(amortisman SG&A'ya dahil değildir)" eklenirse amortismanın ayrı kalem olduğu tartışmasız olur.
2. FI-04-b-q03: gövdede haircut tanımı ("kesinti = (teminat - nakit) / teminat") belirtilirse 111,1% tek yorumlu olur; açıklama zaten bunu kullanıyor.
3. ECO-04-d-q01: açıklamaya çıktı etkisinin belirsiz olduğu, sorunun yalnızca faiz ve harcama bileşimini sorduğu eklenebilir.
4. ETH-06-c-q01: hediye konusu esasen I(B) kapsamındadır; açıklamada I(B)'ye (açıklama + makul değer) atıf yapılması standart eşlemesini netleştirir.
