# L2-B denetim raporu (FI-01..05, PM-01..06, ETH-01..09) - 2026-10-16

20 vignette, 100 soru. Sonuç: tamamı doğrulandı (verified yazıldı); açık sorun yok (verified:false kalan öğe yok).
`npm run validate-content` hata 0 / uyarı 0, `verify_numeric.py` 11 sayısal dosyada 0 hatalı, `npm run ngram-check` şüpheli 0.
Not: ETH sorularında doğru şık çoğunlukla en uzun şıktır (üslup riski); içerik doğruluğunu etkilemez, ileride kısaltılabilir.

| id | sorun türü | düzeltildi mi |
|---|---|---|
| L2-FI-01-v01-q3 (çözüm adımları) | numeric (105/1,035^2 = 98,0231 yazılmış; doğrusu 98,0186; P1 = 102,873, P0 = 102,867) | evet |
| L2-FI-01-v01-q2 (adım) | numeric (5/1,035^2 = 4,6677 -> 4,6676) | evet |
| L2-FI-02-v01-q3 (adım) | translation/style ("values of 100" yerine 1 birimin değeri; TR'de "1 TL") | evet |
| L2-FI-03-v01-q2 (TR adım) | vocab/translation (glossary: "Çağrı opsiyonu" -> "Alım opsiyonu") | evet |
| L2-FI-03-v01-q5 | vignette bağımsız (kavramsal) | evet: gövde senaryo fiyatlarına (101,52 / 101,13 / 100,58) bağlandı |
| L2-FI-04-v01-q1, q2 (TR) | translation (glossary: "temerrüt halinde kayıp") | evet |
| L2-PM-02-v01 (vocab) | vocab ("assume", "therefore" alakasız) | evet: tracking-error, sharpe-ratio, active eklendi |
| L2-PM-03-v01 (vignette, q1, q2, q4) | ambiguous (kapanış fiyatı 52,70 ama orta fiyat 52,50; prim için hangi fiyat belirsiz) | evet: orta fiyat 52,70 yapıldı; q1 C ve q2 A çeldiricileri, q4 ifadesi güncellendi |
| L2-PM-04-v01-q1 | key/style (şık 10,72 ama açıklama 10,73; değer 10,725) | evet: şık 10,73 |
| L2-PM-04-v01 (vocab) | vocab ("assume" alakasız) | evet |
| L2-PM-06-v01-q4 | numeric (açıklama 0,49, şık 0,48; değer 0,48497) | evet |
| L2-PM-06-v01-q3 | style (şık "0,00 milyon" değer 0,0012) | evet: 0,0012 |
| L2-PM-06-v01-q5 | translation (A şıkkı TR belirsiz) | evet |
| L2-ETH-01-v01-q1 | style/key (açıklama VI(B)'ye atıf yapmıyordu) | evet |
| L2-ETH-01-v01-q4 | ambiguous ("... bildirim politikası olmadığı için bildirmek" mantık hatası) | evet: "politikası olmasa bile" |
| L2-ETH-01-v01-q5 | ambiguous (soru "Aras'ın planı" diyordu; öneren Aras, işlemi yapacak Selim) | evet |
| L2-ETH-02-v01-q5 | vignette bağımsız (genel I(A) bilgisi) | evet: vignette'e yerel yasanın hediye/atıf kuralı olmadığı bilgisi eklendi, gövde bağlandı |
| L2-ETH-03-v01-q1 | ambiguous ("Cemre'nin kaynağı"nın açıklaması belirsiz) | evet: "Delta Perakende'yi açıklamaya teşvik" |
| L2-ETH-03-v01-q4 | key/ambiguous (izleme/kısıtlı liste ayrımı) | evet: "uyumun yönettiği izleme veya kısıtlı liste" |
| L2-ETH-03-v01-q5 | ambiguous (ipucunu duymuş analistin yayını) | evet: "uyuma danıştıktan sonra, belgelenmiş araştırmaya dayanarak" |
| L2-ETH-04-v01 (TR) | translation ("portföy yönetimi yetkili" = discretionary) | evet: "takdir yetkili (discretionary)" |
| L2-ETH-05-v01 (vignette, q5) | ambiguous (veri tabanını hem kullanacak hem kullanmayacak; TV işinin çatışma bağı belirsiz) | evet: alternatif plan olarak yeniden yazıldı; TV yorumlarının fonların hisselerini ele alacağı eklendi |
| L2-ETH-07-v01-q3, q4 | ambiguous ("firmanın politikası" vignette'te yok; q4 şık dili) | evet |
| L2-ETH-07-v01 (TR) | translation (discretionary) | evet |
| L2-ETH-08-v01 (Pınar) | ambiguous ("art arda yıllarda geçti" VII(B) kapsamında tartışmalı ima) | evet: ifade çıkarıldı |
| L2-ETH-09-v01 (TR) | translation (discretionary) | evet |
