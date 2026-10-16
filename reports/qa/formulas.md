# QA: content/formulas/L1.json ve content/calculator/ba2plus.json (2026-10-16, reviewer-agent)

## Formüller: 223 -> 219 (219 doğrulandı)
- KaTeX: 223 formülün tamamı hatasız render edildi.
- Matematik/CFA L1 kapsamı elle ve python ile sınandı (implied g, min-varyans ağırlığı, margin call, binomial, swap vb.).
| id | sorun | sonuç |
|---|---|---|
| EQ-f-total-return-eq | QM-f-holding-period-return ile birebir yinelenen | silindi |
| PM-f-real-return-pm | QM-f-real-return ile aynı | silindi |
| PM-f-sharpe-port | QM-f-sharpe ile aynı | silindi |
| PM-f-required-return | QM-f-solve-rate ile aynı | silindi |
| PM-f-after-tax | gösterim: r_{vs} belirsiz | r_{at} yapıldı |
| DER-f-fx-forward | ECO-f-fx-forward ile ilişkisi belirsiz | not eklendi (bileşik/basit faiz farkı) |
| AI-f-nvt | kapsam belirsiz | not eklendi (kavramsal) |

## BA II Plus / HP 12C rehberleri: 22 (19 doğrulandı, 3 verified=false)
Sayısal örnekler python ile doğrulandı: FV 1469.33, annuity due 285.94 / ordinary 272.32, EAR 12.6825, NPV 227.65, IRR 21.65, PMT 860.66, AMORT anapara 4925.19 / faiz 238.79, 1-V stat (10; 3.1623; 2.8284), LIN (b 0.35, a -0.30, r 0.8489), tahvil 97.327, aylık taksit 599.55, N 11.90, I/Y 9.05, e^0.08 1.0833, ln1.1 0.0953.
| id | sorun | durum |
|---|---|---|
| ba-iconv | ICONV ekran sırası NOM, EFF, C/Y'dir; eski tuşlar C/Y yerine EFF'ye giriyordu | düzeltildi |
| ba-bond | RV'den sonra gün sayım (ACT/360) satırı da var; 2/Y 1/Y adımı eksikti | düzeltildi, "cihazında dene" notu |
| ba-tvm-isaret | Error 5 ifadesi fazla genel | düzeltildi |
| ba-hafiza | STO/RCL/MEM büyük olasılıkla doğru, kesin değil | notlandı, verified |
| ba-sik-hatalar | Error 7 ICONV ile ilişkilendirilmişti | düzeltildi, kılavuza yönlendirme notu |
| ba-yuzde-degisim | Δ% tuşu doğrulanamadı | verified=false (genel yöntem doğru; uydurma tuş yok) |
| ba-stat-wmean | 1-V'de Y'nin frekans olup olmadığı doğrulanamadı; LIN ΣXY/ΣY yöntemi doğru | verified=false |
| hp-bond | 12C PRICE/YTM tuş sırası ve giriş (PV) cihazda doğrulanamadı; yarıyıllık varsayım doğru (≈97.29) | verified=false |
