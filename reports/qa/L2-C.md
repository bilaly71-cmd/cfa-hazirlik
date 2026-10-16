# L2-C denetim raporu (QM-01..07, ECO-01..02, DER-01..02, AI-01..04) — 2026-10-16

Sonuç: 15 vignette, 82 soru ve 14 L2 kelime dosyası geçti (doğrulanmamış öğe yok). validate-content hata 0; verify_numeric tüm dosyalarda 0 hatalı.

| id | sorun türü | düzeltildi mi |
|---|---|---|
| L2-QM-01-v01-q4 | translation/style (şık "0.0" ama değer 0.04) | evet ("0.04"/"0,04") |
| L2-QM-05-v01-q1 | style (şık "0.3%" ama değer 0.35) | evet ("0.35%") |
| L2-QM-06-v01-q1 | style (şık "0.95" ama değer 0.955) | evet |
| L2-QM-06-v01 (vignette, q3) | translation (TR binlik "1,000") | evet ("1.000") |
| L2-QM-07-v01 (vignette, q3) | translation (TR "1,000") | evet |
| L2-ECO-01-v01 (vignette, q4) | translation (TR binlik virgül: 1,000 / 40,000 / 58,000 / 1,115,4 / 1,045) | evet |
| L2-ECO-01-v01-q3 | numeric/ambiguous (TL'nin "%31 değer kaybı"; doğrusu USD +%31, TL USD değeri -%24) | evet (EN+TR açıklama) |
| L2-DER-02-v01 (vignette, q2) | ambiguous/leak (vignette 13,23 çağrı değerini veriyordu; q2 bunu soruyor) | evet (cümle çıkarıldı; q3 sapı değeri veriyor) |
| L2-DER-02-v01 (q4, vignette) | translation (TR "2,000", "1111,1") | evet |
| L2-AI-03-v01-q3, q5 | translation (TR "1,733,3", "1,058,3", "1,875") | evet |
| content/vocab/L2-*.json | vocab (okunuş: collateral, front-month, arbitrage, adjusted, dummy, smoothing, stemming vb.) | evet |

Notlar: vignette tablo hücreleri tek dilli (şema gereği); AI-02 tablosunda "TRY 12,000,000" biçimi TR görünümde kalır (şema sınırı).
Bağımsız çözüm: tüm sayısallar python ile yeniden hesaplandı (t, F, adj-R2, VIF, DW, BP, lojistik olasılık/odds/LR, AR(1), DF, RMSE, ARCH, CIP, PPP, carry, binom, FRA, swap, NOI/DSCR, FFO/AFFO/NAV, hurdle ücretleri).
