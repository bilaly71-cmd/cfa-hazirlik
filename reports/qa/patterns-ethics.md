# QA: question_patterns.json (19 kalıp) ve standards.json (44 vaka)
Tarih: 2026-10-16, denetçi: reviewer-agent. Zod `safeParse`: 19/19 kalıp, 44/44 vaka geçti. Başarısız (verified:false) öğe yok.

## Kalıplar
| id | sorun türü | düzeltildi mi |
|---|---|---|
| tüm kalıplar (77 drill) | key/denge: doğru cevap indeksi 0=42, 1=30, 2=5 (aşırı sol-yanlı) | evet: harf-şıklı 6 drill hariç şıklar yeniden dizildi, dağılım 26/26/25 |
| which-combination | style: "ögenin" yazım hatası | evet |
| which-combination | ambiguous/style: tuzak örneği ve D2 totolojik (faiz = getiri) | evet: fiyat/kupon ödemesi çiftiyle yeniden yazıldı |
| if-then D1 | style: "Only on Mondays" gülünç çeldirici | evet |
| best-describes | style: tuzak örneğinde vade/durasyon ayrımı belirsizdi | evet |

## Etik vakaları (standart numaraları I(A)..VII(B) tek tek doğrulandı, hepsi doğru)
| id | sorun türü | düzeltildi mi |
|---|---|---|
| ETH-I-A-01, I-D-02, IV-A-02 | translation: "Kurallar/Davranış Kuralları" glossary ("etik kural") ile tutarsız | evet |
| ETH-II-A-01, II-A-02 | translation: "kamuya açık olmayan" yerine glossary'deki "kamuya açıklanmamış" | evet |
| ETH-III-C-02 | key: "en az yılda bir" kesin ifade; Handbook "düzenli, örn. yıllık" der | evet |
| ETH-IV-A-02 | ambiguous: "olabilir" kararsız sonuç | evet: sonuç netleştirildi |
| ETH-V-C-01 | style/translation: saklama süresi cümlesi belirsiz | evet |
| ETH-VII-A-01 | özgünlük: Handbook'taki sınav içeriği paylaşma örneğine yakın | evet: yeniden yazıldı |
| ETH-VII-A-02 | style: "invigilator" B1 dışı | evet: "exam supervisor" |

Not: tüm vakalarda `question_ids` boş (şema varsayılanı); kapsam sorunu değil. `npm run validate-content` bu iki dosya türünü saymıyor, doğrulama scratchpad `RS10/val.ts` ile yapıldı.
