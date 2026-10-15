# D — CFA Seviye 1 Hazırlık Stratejisi ve Topluluk Bilgisi

> Faz 0-D araştırma çıktısı. Erişim tarihi: aksi belirtilmedikçe **2026-10-15/16**.
> Kapsam: **yalnızca strateji/meta**. Gerçek sınav sorusu hatırlatmaları ("brain dump", "sınavda şu çıktı" türü paylaşımlar) **bilinçli olarak toplanmamıştır**. CFA Institute Standard VII(A) rehberine göre sınavın soruları, *test edilen ya da edilmeyen geniş konu alanları ve formüller* de gizli sayılır ([cfainstitute.org – Standard VII(A)](https://www.cfainstitute.org/standards/professionals/code-ethics-standards/standards-of-practice-vii-a)). Bu yüzden belirli bir sınav dönemi sonrasında adayların "hangi konu ağır geldi" paylaşımlarını derleyen yazılar (örn. AnalystPrep "Feb 2026 hardest topics") **kullanılmadı**. "Zor konular" bölümü yalnızca genel, döneme bağlı olmayan algı anketlerine dayanıyor.
> Etiketler: **[RESMİ]** = CFA Institute'un kendi sayfası, **[ÜÇÜNCÜ TARAF]** = sağlayıcı/blog, **UNVERIFIED** = birincil kaynakla doğrulanamadı.

---

## 1. Taranan kaynaklar ve yöntem

| Kaynak grubu | Durum | Not |
|---|---|---|
| CFA Institute resmi sayfaları | Tarandı | Seviye 1 sınav sayfası, tarih/ücret, Practice Pack, sınav günü rehberi, Standard VII(A). |
| Reddit r/CFA | **Doğrudan erişilemedi** | reddit.com bu ajanın araçlarına kapalı (WebFetch engelli, arama alan adını reddediyor, curl 403). Reddit içeriği yalnızca ikincil özetlerden (300hours forum yorumları, studycardsai özeti) dolaylı alındı ve düşük güvenle işaretlendi. Hesap/çerez gerektiren yollar kurallar gereği kullanılmadı. |
| AnalystForum / AnalystNotes forumları | Kısmen | AnalystNotes forum başlıkları arama özetlerinden. AnalystForum'un kendisi sonuçlarda belirmedi. |
| 300hours (blog + forum) | Tarandı | En zengin meta kaynak (hazırlık, ipuçları, 10 kural, 2027 değişiklikleri, uygulamalar, hesap makinesi). |
| X/Twitter | **Taranmadı** | Oturum açmadan okunabilir içerik yok. Çerezli CLI kullanmak "hesap/oturum yok" kuralına aykırı. |
| YouTube | Dolaylı | Kanallar ve sağlayıcı ücretsiz içerikleri, aday yorumları ve sağlayıcı sayfaları üzerinden değerlendirildi. Video dökümü alınmadı (yt-dlp çalışmıyor). |
| LinkedIn aday deneyimleri | Dolaylı | Arama motoru LinkedIn gönderilerini neredeyse hiç indekslemiyor. Bir Malezyalı aday profili dışında içerik yok. |
| Türkçe kaynaklar (ekşi sözlük, Medium, CFA Society Istanbul) | Kısmen | Ekşi'de yalnızca eski bir "cfa" girdisi bulundu (kâğıt sınav döneminden, güncel değil). Türkçe Medium deneyim yazısı bulunamadı. CFA Society Istanbul (Türkiye, Azerbaycan ve Gürcistan'dan sorumlu) bilgileri alındı. |
| Sağlayıcı sayfaları | Tarandı | Kaplan Schweser (403 verdi, fiyatlar ikincil kaynaktan), UWorld (Wiley/Efficient Learning dahil), AnalystPrep, IFT, Mark Meldrum, Bloomberg, PrepNuggets, Soleadea. |
| Akademik | Tarandı | Dunlosky ve ark. (2013), Cambridge English rehberli öğrenme saatleri. |

**Önemli bulgu (diğer ajanlarla çapraz kontrol edilmeli):** 2027 konu ağırlıkları **değişti**. CFA Institute'un resmi Seviye 1 sayfası 2027 için Ethics %10–15 (2026'da %15–20) ve Quant %11–14 (2026'da %6–9) gösteriyor ([RESMİ](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam), 2026-10-15). 300hours da 14 Eki 2026 tarihli güncellemesinde aynı tabloyu veriyor. AnalystPrep, Soleadea ve Quintedge gibi kaynaklar ise "2027'de ağırlık değişmedi" diyor. Bu kaynaklar **eskimiş**. Uygulama ağırlıkları resmi sayfadan almalı.

---

## 2. Resmi çerçeve (CFA Institute) — strateji açısından önemli olanlar

- **Biçim:** 180 çoktan seçmeli soru, her biri 90 soruluk 135 dakikalık **2 oturum**, soru başına ~**90 saniye**. Sorular eşit ağırlıklı ve **yanlış cevap puan götürmüyor**, yani boş bırakmak mantıksız ([RESMİ](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam)). Seviye 1'de **3 seçenek** (A/B/C) var ([300hours](https://300hours.com/how-to-prepare-cfa-level-1/)).
- **Sınav günü akışı [RESMİ]:** giriş, Candidate Pledge ve yazılım eğitimi 19 dk, 1. oturum 135 dk, isteğe bağlı mola 31 dk, 2. oturum 135 dk, anket 8 dk. 30 dk erken gelmek gerekiyor ve geç kalan alınmayabilir ([exam-day guide](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-day-preparation-guide)).
- **Oturumlar arası:** 1. oturum bitince ona geri dönülemez. Oturum içinde ileri-geri gidilebiliyor ([UWorld topics](https://finance.uworld.com/blog/cfa/what-topics-are-covered-on-the-cfa-level-1-exam/), [ÜÇÜNCÜ TARAF]).
- **Hesap makinesi [RESMİ]:** yalnızca TI BA II Plus (Professional dahil) ve HP 12C ailesi.
- **FSA:** Aksi belirtilmedikçe sorular **IFRS** esaslı, US GAAP ise soruda belirtilir [RESMİ]. Bu, TFRS'ye (IFRS'nin Türkçesi) alışkın bir Türk aday için avantaj.
- **2027 ağırlıkları [RESMİ]** (Şubat 2027 ve sonrası pencereler için. Pencere eşleşmesi resmi sayfada yazmıyor ama 300hours ve UWorld "Feb 2027'den itibaren" diyor):

| Oturum | Konu (2027 adı) | 2027 | 2026 |
|---|---|---|---|
| 1 | Ethical & Professional Standards | 10–15% | 15–20% |
| 1 | Quantitative Methods | **11–14%** | 6–9% |
| 1 | Economics | 6–9% | 6–9% |
| 1 | Financial Statement Analysis | 11–14% | 11–14% |
| 1 | Corporate Finance (eski Corporate Issuers) | 6–9% | 6–9% |
| 2 | Equities (eski Equity Investments) | 11–14% | 11–14% |
| 2 | Fixed Income | 11–14% | 11–14% |
| 2 | Derivatives and Risk Management | 6–9% | 5–8% |
| 2 | Alternative Investments | 6–9% | 7–10% |
| 2 | Portfolio Construction (eski Portfolio Mgmt) | 8–12% | 8–12% |

- **Müfredat değişimi (2027):** 93 → 102 öğrenme modülü. Quant ve Equities tamamen yenilendi, Ethics standartları ayrı modüllere bölündü ([300hours, 14 Eki 2026](https://300hours.com/cfa-curriculum-changes-2027/)). Soleadea'ya göre yeni bir AI/finansal veri bilimi okuması var ([soleadea](https://soleadea.org/cfa-level-1/ai-module-2027), arama özeti, UNVERIFIED). **Uygulama içeriği 2027 müfredatına göre yazılmalı.**
- **Çalışma süresi [RESMİ]:** "Başarılı adaylar her seviye için ortalama 300 saatin üzerinde çalıştığını bildiriyor." 2019 aday anketinde Seviye 1 ortalaması 303 saatti ([300hours](https://300hours.com/how-to-prepare-cfa-level-1/), anketin kendisi görülmedi).
- **Ücret [RESMİ]:** "From USD 1,140 / exam" (yerel vergiler hariç). Seviye bazlı erken/standart kırılım etkileşimli araçta yüklenmedi ([dates-fees](https://www.cfainstitute.org/programs/cfa-program/dates-fees)). Ayrıntıları A ajanı (lojistik) doğrulamalı.
- **Pencereler [RESMİ]:** genelde Şubat, Mayıs, Ağustos ve Kasım. Spesifik 2027 tarihleri sayfada yüklenmedi.
- **Learning Ecosystem (LES):** Kayıtla birlikte gelen dijital müfredat, pratik sorular, deneme sınavları, flashcard'lar ve sözlük oyunları. Mobil erişim Canvas Student uygulaması üzerinden ([300hours apps, 30 Tem 2026](https://300hours.com/top-cfa-apps/)).
- **Practice Pack (Mayıs 2027) [RESMİ]:** **USD 299**. İçinde +1.000 soru, +5 mock, 1 Prometric yazılımında mock ve indirilebilir müfredat var. Erişim sınav tarihinde bitiyor ([sayfa](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/practice-pack/cfa-program-practice-pack-level-i-may-2027)).
- **Geçme oranları:** Şubat 2026 %45, Mayıs 2026 %39 ([UWorld](https://finance.uworld.com/cfa/pass-rates-scores/), [PW](https://www.pw.live/cfa/exams/cfa-level-1-pass-rate-2026)), Ağustos 2026 %43 ([300hours](https://300hours.com/cfa-pass-rates/), resmi PDF görülmedi, UNVERIFIED). 10 yıllık ortalama ~%40–41.
- **MPS ve etik ayarı:** CFA Institute minimum geçme puanını açıklamıyor. Sınırdaki adaylarda Ethics performansı sonucu artı ya da eksi yönde etkileyebiliyor ("ethics adjustment") ([300hours forum](https://300hours.com/f/cfa/general/t/can-someone-please-explain-what-ethics-adjustment-is/), [UWorld](https://finance.uworld.com/blog/cfa/ethics-adjustment-can-i-pass-with-a-low-ethics-score/)). 300hours'un Seviye 1 için %67–69 MPS tahmini **resmi değil**.

---

## 3. Çalışma planları (saat, hafta)

| Kaynak | Toplam saat | Süre | Haftalık | Yapı |
|---|---|---|---|---|
| CFA Institute [RESMİ] | 300+ (2019 ort. 303) | — | — | — |
| 300hours, "How to prepare" | 300 min., yazar ~350 (tam zamanlı çalışırken) | ~6 ay | ~11,5 sa | Ay 1 hızlı gözden geçirme → Ay 2–3 detaylı okuma ve bölüm sonu sorular → Ay 4–5 soru bankası ve zayıf konular → son 1–2 hafta izin alıp mock |
| 300hours, "10 kural" (2 Ağu 2026) | ~300 ("250 yetmez") | 5–6 ay | kademeli artış | Ethics sona saklanır, mock'lar son 4–6 haftada |
| AnalystPrep 6 aylık plan | 300 | 6 ay | 12–13 sa | — |
| Schweser (tam zamanlı çalışan) | ~56 sa/ay | ~6 ay | hafta içi 2 sa/gece + hafta sonu 3+3 sa | geriye doğru planlama |
| Arama özetindeki bir YouTube "90th percentile" anlatımı | — | — | 16–20 sa | haftada en fazla 3 okuma ([videohighlight](https://videohighlight.com/v/9LRP2KJec8c), kanal bilinmiyor, düşük güven) |
| Reddit özetleri (ikincil) | 300–450 | 3,5–6 ay | — | son ~25 gün yalnızca mock (tek kullanıcı anekdotu, [studycardsai](https://studycardsai.com/blog/how-long-to-study-for-cfa-level-1-reddit), düşük güven) |
| Tekrar girenler | 350–400 önerilir | — | — | [300hours](https://300hours.com/how-to-prepare-cfa-level-1/) |

**Ortak örüntü (konsensüs):**
1. 5–6 ay önceden başla ve **kademeli** artır. Hızlı başlangıç tükenmişlik yapıyor.
2. Öğrenme → bölüm sonu sorular → soru bankası → mock. Zamanın yarısını **soru çözmeye** ayırmayı öneren sağlayıcılar var ([learnsignal](https://www.learnsignal.com/blog/how-to-pass-cfa-level-1/), arama özeti).
3. Konu bazında **yüzde skorları kaydet** ve zayıfa dön.
4. Ethics'i atlama. Birkaç kaynak "sona sakla, ama erken bir kez oku" diyor.
5. Son 1–2 haftayı mümkünse izinle mock ve tekrara ayır.

**Bilimsel dayanak:** Dunlosky ve ark. (2013) incelediği 10 teknikten yalnızca **pratik test** (practice testing) ve **aralıklı tekrar** (distributed practice) için "yüksek fayda" verdi. Yeniden okuma, özetleme ve altını çizme "düşük fayda" aldı. Ara karıştırma (interleaving), kendine açıklama ve detaylandırıcı sorgulama "orta fayda" aldı ([APS basın bülteni](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html), DOI 10.1177/1529100612453266). Uygulamanın çekirdeği buna dayanmalı.

---

## 4. En zor konular (genel algı, döneme bağlı değil)

| Kaynak | En zor bulunanlar |
|---|---|
| Soleadea (Eyl 2025 güncelleme) | Fixed Income, Derivatives, FSA ([link](https://soleadea.org/cfa-level-1/hardest-topics)) |
| Efficient Learning anketi (2013–2014) | Fixed Income ve Derivatives (üçte ikiden fazlası "zor" dedi). Ethics şaşırtıcı biçimde zor ([link](https://www.efficientlearning.com/blog/hardest-parts-of-cfa-exam), eski) |
| AnalystPrep aday anketi (tarih belirsiz) | Financial Reporting (FSA), Ethics, Fixed Income |
| 300hours | FSA, Fixed Income, Quant, Derivatives, Economics |
| 300hours yorumcuları | FRA/FSA ve Quant |

**Sentez:** FSA ve Fixed Income hemen her listede var. Derivatives ve Ethics bunları izliyor. **2027'de Quant'ın ağırlığı yaklaşık iki katına çıktığı için** (%11–14) Quant artık "düşük ağırlıklı, idare et" konusu değil.
**Bu kullanıcı için:** SPK Düzey 3 ve Türev lisansı, Derivatives, Equities, Portfolio ve Fixed Income temellerinde Türkçe bilgi avantajı sağlıyor. Asıl risk, terimlerin İngilizce karşılıkları ve IFRS ayrıntıları (FSA), istatistik/regresyon (yeni Quant) ve Ethics'in vaka diliyle ilgili. (Değerlendirme: ajan çıkarımı.)

---

## 5. Sınav günü taktikleri ve zaman yönetimi

- **Tempo:** 135 dk / 90 soru = 90 sn. **Kontrol noktaları** (hesap): 30. soru ≈ 45. dk, 60. soru ≈ 90. dk, 90. soru ≈ 135. dk. Kavram sorularında 45–60 sn harcanıp kalan süre hesaplamalara aktarılmalı. Bir soruya **en fazla 3 dk** ayrılmalı, sonra en iyi tahmin işaretlenip geçilmeli ([300hours tips](https://300hours.com/cfa-level-1-tips/), 2 Ağu 2026).
- **Boş bırakma yok:** Ceza olmadığı için her soruya cevap verilmeli. İşaretlenen (flag) sorulara oturum sonunda dönülür.
- **Prometric araçları:** işaretleme (flag), seçenek üstünü çizme (strikethrough), metin vurgulama (highlight), bölüm özeti (Current/Attempted/Unattempted/Flagged). Zamanlayıcı 30, 15 ve 5 dk kala uyarıyor. Karalama kâğıdı veriliyor ve dolunca değiştiriliyor ([UWorld arayüz](https://finance.uworld.com/blog/cfa/getting-familiar-with-the-cfa-exam-online-interface/), [300hours CBT](https://www.300hours.com/articles/cfa-exam-computer-based-testing-for-all-levels-from-2021)). Prometric'in CFA eğitim modülü sınavdan önce de açılabiliyor. **Uygulamanın mock modu bu araçları taklit etmeli.**
- **Mola:** 31 dk isteğe bağlı [RESMİ]. Yiyecek dolapta kalıyor, şeffaf ve etiketsiz su şişesine izin var [RESMİ]. Atıştırmalık için AnalystPrep meyve ve protein bar öneriyor.
- **Lojistik:** Pasaport geçerliliği, sınav merkezine rota (mümkünse önceden git) ve iki özdeş hesap makinesi ile yedek pil hazırlanmalı ([300hours 10 kural](https://300hours.com/cfa-level-i-the-10-commandments)). Gözetmen kurallarına uyulmalı. Sınavdan sonra soruları tartışmak ya da yeniden oluşturmak yasak.
- **Oturum stratejisi:** 1. oturuma dönülemediği için işaretli sorular 1. oturum bitmeden kapatılmalı.

---

## 6. Anadili İngilizce olmayan adaylar için tavsiyeler

**Gereken dil düzeyi:** CFA Institute bir CEFR seviyesi şart koşmuyor (bulunamadı). Yerel dernek CFA UK kendi sınavları için **B2** istiyor ve anadil gerekçesiyle **ek süre vermiyor** ([CFA UK politika PDF](https://www.cfauk.org/-/media/pdf-main/education/all-qualifications/policy---use-of-english-language-in-cfa-uk-assessments.pdf); CFA Institute sınavı için doğrudan bağlayıcı değil ama iyi bir referans). İngilizcesi ikinci dil olan bir charterholder'a göre dinleme ve konuşma gerekmiyor, ancak **orta düzey okuma** şart ([Advisor Perspectives](https://www.advisorperspectives.com/articles/2022/09/13/the-four-keys-to-passing-the-cfa-exam), 403 verdi, arama özetinden).

**Soru dilindeki tuzaklar** (bu ifadeler genel CFA soru kalıplarıdır, gerçek soru değil):
| İfade | Ne demek | Taktik |
|---|---|---|
| *least likely* / *NOT* / *EXCEPT* / *incorrect* | Yanlış olanı ya da en az uyanı bul (olumsuzlama) | Kelimeyi vurgula. Her seçeneğe Doğru/Yanlış yaz ve **Yanlış** olanı seç. |
| *most likely* / *best describes* | En iyi uyanı bul | Önce soruyu kendin cevapla, sonra seçeneklere bak. |
| *closest to* | Hesapla, sonra en yakın sayıyı seç | Yuvarlama farkına takılma. Seçenekler birbirine çok yakınsa bir adımı tekrar kontrol et. |
| *overstate / understate*, *increase / decrease*, *higher / lower* | Yön sorusu | Yönü karalama kâğıdına ok (↑ ↓) olarak yaz. |
| *all else equal*, *compared with X, Y is…* | Karşılaştırma yönü | Hangisinin hangisine göre sorulduğunu not et. |

- Bir hazırlık sitesine göre "least likely", "except", "understate" gibi tek bir kelimeyi kaçırmak, konu bilgisi tam olsa bile soruyu tersine çeviriyor. **Önce soru kökündeki isteğin altı çizilmeli, seçenekler sonra okunmalı** ([cleveracademy.vn](https://cleveracademy.vn/en/blog/what-level-of-english-do-you-need-for-cfa/)).
- Anadili İngilizce olan bir forum kullanıcısı bile "least likely … negatively related" kalıbını yeniden ayrıştırırken zaman kaybettiğini yazıyor. Çözümü bol mock ([AnalystNotes forum](https://analystnotes.com/cfa-topic-thoughts-on-how-to-pass-level-1.html), arama özeti).
- **Kelime öğrenimi:** Alfabetik değil **modül bazında**, izole kelime değil **ifade ve kavram** olarak, her terim bir finans örneğine bağlanarak öğrenilmeli. Benzer terimleri ayıran kişisel sözlük tutulmalı (risk/uncertainty/volatility/variance). Yeni başlayanlar önce ana dilde kavrayıp sonra İngilizce terime dönmeli ([cleveracademy.vn](https://cleveracademy.vn/en/blog/what-level-of-english-do-you-need-for-cfa/)).
- **Hata günlüğü** etiketleri: kelime eksikliği, kaçırılan olumsuzlama, gözden kaçan veri, bilinmeyen terim. Mock sonrası "kavramdan mı, okumadan mı yanlış yaptım?" ayrımı yapılmalı.
- **Kaynak üslubu:** İngilizcesi ikinci dil olan bir aday, CFA Institute'un kendi sorularını sağlayıcı sorularından "çok daha zor" bulmuş, çünkü üslup farklı ([300hours forum](https://300hours.com/f/cfa/general/t/some-comments-on-results-analysis/), arama özeti). Sonuç: **resmi soruların üslubuna erkenden alışmak** gerekiyor (LES ve Practice Pack).
- **Video desteği:** Okuma yükünü azaltmak için açıklamalı soru, flashcard ve video kullanılmalı (Advisor Perspectives özeti). IFT uygulamasında Seviye 1 videoları için **İngilizce altyazı** var ([300hours apps](https://300hours.com/top-cfa-apps/)). Mark Meldrum'da 0,5x–2,0x hız ve sesli mod var.
- **Okuma hızı hedefi:** Sayısal bir kelime/dakika hedefi veren güvenilir bir kaynak **bulunamadı** (UNVERIFIED). Öneri: zamanlı mini setlerde "soru başına ortalama süre"yi ve "misread" etiketli hataların oranını izlemek.
- **Ek süre:** Anadil gerekçesiyle ek süre yok (CFA UK açıkça belirtiyor; CFA Institute için kanıt bulunamadı → UNVERIFIED).

---

## 7. Hesap makinesi ipuçları (TI BA II Plus odaklı)

| Ayar ya da alışkanlık | Nasıl | Kaynak |
|---|---|---|
| Ondalık: kayan (floating) | `2nd FORMAT` → `9` → `ENTER` (bazıları 4 basamak tercih ediyor) | [300hours BA II Plus rehberi](https://300hours.com/ba-ii-plus-guide/), [CFALA PDF](https://www.cfala.org/files/Calculator_Tips-TI-2019.pdf) |
| AOS modu (işlem önceliği) | `2nd FORMAT` → aşağı kaydır → `2nd SET` ile CHN'den AOS'a geç. (Chain modunda 2+2×2=8, AOS'ta 6) | [Schweser](https://www.schweser.com/cfa/blog/how-to-pass-the-cfa-exam/ti-baii-plus-calculator-basics-for-the-cfa-exam) |
| P/Y = 1 | Eski cihazlarda varsayılan 12 olabiliyor; N ve I/Y elle ayarlanmalı | 300hours, Schweser, [Bionic Turtle](https://www.bionicturtle.com/forum/threads/ti-ba-ii-calculator-essential-settings-tiba-01.22264/) |
| Her hesaptan önce temizle | TVM: `2nd CLR TVM`; CF: `CF` → `2nd CLR WORK` | 300hours ("clear previous entries") |
| Hafıza registerları | `STO n` / `RCL n` ile uzun ondalıkları tekrar yazmadan kullan | Schweser |
| `2nd RESET` dikkat | Fabrika ayarına döner (ondalık ve AOS da gider) | Schweser |
| Gözetmen ayarı değiştirebilir | Ayarları 30 saniyede geri kurmayı ezberle | 300hours |
| 2 özdeş hesap makinesi ve yedek pil (+küçük tornavida) | — | 300hours 10 kural, [Efficient Learning](https://www.efficientlearning.com/?p=8040) |

**Uygulama fikri:** Telefon ekranında "tuş dizisi kartları" (örn. NPV/IRR, amortisman, bono fiyatı). Kart önce tuş sırasını sorar, kullanıcı fiziksel hesap makinesinde dener ve sonucu girer. Gerçek bir hesap makinesi emülatörü gerekmez.

---

## 8. Deneme sınavı (mock) stratejisi

- **Kaç tane:** 4–8, ideal ~6 ([Soleadea, 3 Ağu 2026](https://soleadea.org/cfa-exam/mock-exam-strategy); 300hours da ~6 set diyor). UWorld'e göre çoğu aday 4–6 kullanıyor ([UWorld](https://finance.uworld.com/blog/cfa/how-to-use-cfa-level-1-mock-exams-for-maximum-score-gain/)).
- **Ne zaman:** İlk tanı amaçlı mock sınavdan 5–6 hafta önce (Soleadea), 8–10 hafta önce (UWorld) ya da 4–6 hafta önce (300hours). Konsensüs: **ilk tam tur bittikten sonra, sınavdan ~6–8 hafta önce.**
- **Soleadea'nın 6 haftalık takvimi:** H6 Mock 1 ve analiz, H5 onarım (mock yok), H4 Mock 2, H3–H2 Mock 3–6 (her birinin ardından bir analiz günü), H1 hata günlüğü ve formüller. Son 2 günde yeni mock yok.
- **Hedef skorlar (resmi değil):** ilk denemelerin ortalaması **%70+ = yolunda**, %65–70 sınırda, <%65 risk. ~%50'de mock tekrarlanmamalı, önce ağırlığı yüksek zayıf konular onarılmalı. Yalnızca **ilk deneme** ve **ortalama** sayılır, en iyi skor değil (Soleadea; 300hours'un "%70 tutarlı skor" verisi de tescilli ve doğrulanmamış).
- **Analiz yöntemi:** Her hata üç kovadan birine konur: *bilmiyordum / biliyordum ama acele ettim / süre yetmedi*. Şans eseri doğruların açıklaması da okunur. Hatalar 3–4 gün sonra yeniden çözülür. Analize oturum süresi kadar zaman ayrılır.
- **Resmi ve sağlayıcı mock'ları:** Resmi mock'lar üslup olarak gerçek sınava en yakın olanlar. Schweser mock'ları daha zor ve hesaba ağırlıklı olarak anılıyor, düşük skor paniğe yol açmamalı. Önerilen sıra: önce resmi, sonra üçüncü taraf (Soleadea).
- **Koşullar:** Son mock'lar **gerçek sürede** yapılmalı (2×135 dk, mola ile, tek oturuşta). Telefonda değil; 300hours'un uygulama incelemesi de mock için dizüstü öneriyor.

---

## 9. Hazırlık sağlayıcıları karşılaştırması

> Fiyatlar USD, Seviye 1. Erişim 2026-10-15/16. "Resmi sayfa" = sağlayıcının kendi sayfası. Fiyatlar kampanyayla sık değişiyor.

| Sağlayıcı | Fiyat (kaynak, tarih) | Güçlü yanlar | Zayıf yanlar | Bütçeli ve anadili İngilizce olmayan aday için |
|---|---|---|---|---|
| **CFA Institute LES** (kayıtla gelir) | Sınav ücretine dahil ("from USD 1,140/exam", [RESMİ](https://www.cfainstitute.org/programs/cfa-program/dates-fees)) | Asıl kaynak ve üslup. 1.000+ soru, mock, flashcard, 7 sözlük oyunu, ilerleme takibi, planlayıcı | Çok uzun okumalar. Mobilde vurgulama yok, oturum kopmaları bildiriliyor ([300hours apps](https://300hours.com/top-cfa-apps/)) | **Zorunlu temel.** Uzun metinler A2–B1 okur için ağır. |
| **CFA Institute Practice Pack** | **USD 299** ([RESMİ](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/practice-pack/cfa-program-practice-pack-level-i-may-2027)) | +1.000 soru, +5 resmi mock, 1 Prometric yazılımında mock | Sınav günü erişim biter. Yalnızca kayıtlı aday alabilir. | **Yüksek öncelik.** Resmi üsluba alışmak için en iyi yatırım. |
| **Kaplan Schweser** | Resmi aralık $429–$1,499 (schweser.com arama özeti; sayfa 403). Kademe kırılımı Basic $429 / Essential $799 / Premium $1,099 / Ultimate $1,499 ([Katalyst, Haz 2026](https://katalystprep.com/cfa/reviews/kaplan/)), seviye eşleşmesi doğrulanmadı → **kademe fiyatları UNVERIFIED**. Ayrı mock $119–$299 (arama özeti, UNVERIFIED) | Kısa özet notlar (SchweserNotes) endüstri standardı. Prometric benzeri sınav simülasyonu, büyük topluluk, PassProtection (üst paketler) | Pahalı. Videolar kuru. Uygulama puanları düşük, Play Store'da bulunamama ve senkron gecikmesi bildiriliyor | Notlar kısa olduğu için okuma yükü az, bu artı. Ama bütçeyi zorlar. |
| **UWorld** (2023'te Wiley/Efficient Learning'i satın aldı ([Wiley basın bülteni](https://newsroom.wiley.com/press-releases/press-release-details/2023/UWorld-Acquires-Wileys-Efficient-Learning-Test-Prep-Portfolio-Expanding-its-Offerings-in-Finance-and-Accounting/default.aspx))) | QBank **$389/pencere** ([App Store](https://apps.apple.com/app/id1496004382), Şub 2026 penceresi). Core $299, Advanced $399–499, Elite $699–899 (UWorld blog, arama özeti) → **UNVERIFIED**. Resmi paket sayfasında fiyat alanları boş | **Her seçenek için ayrıntılı açıklama** ve görseller. Aralıklı tekrar flashcard'ları (ReadyDecks), Prometric'e benzeyen arayüz, kararlı uygulama, Face ID. Elite'te StudyPass (geçene kadar erişim). Efficient Learning'den gelen FreshStart (başka sağlayıcıdan geçişe %50) | "ESL için ideal" iddiası pazarlama. Video ve mock yalnızca üst paketlerde | **Güçlü aday.** Açıklama kalitesi dil desteği açısından değerli. QBank-only paket bütçeye uygun. |
| **Wiley (eski)** | Gold $995 / Platinum $895 ([ais-cpa](https://ais-cpa.com/wiley-cfa-exam-review/)), **eski ve UNVERIFIED**. efficientlearning.com artık UWorld'e yönlendiriyor | — | Ayrı marka olarak sona eriyor | Değerlendirme dışı, UWorld'e bakılmalı. |
| **AnalystPrep** | Practice $349 / Learn+Practice $499 / Unlimited (3 seviye, ömür boyu) $799 ([resmi pricing](https://analystprep.com/pricing), 2026-10-15). Not: Eski kaynaklarda $249/$399/$699 geçiyor | En ucuz kapsamlı seçeneklerden. 12 ay erişim, QBank, CBT tarzı mock, video, notlar | Açıklamalar kısa ve öz, ön bilgi varsayabiliyor. Kendi karşılaştırma yazıları taraflı | **Bütçe dostu.** Kısa açıklamalar A2–B1 okura hem avantaj hem risk. |
| **IFT** | 2027 Premium **$775** ([resmi ürün](https://ift.world/product/l1-premium-package/)). 2027 Basic $299→$269 indirimli (arama özeti, UNVERIFIED). 2026 Basic $249 / Plus $439 / Premium $729 (arama özeti). **Ücretsiz paket "tüm okumaları kapsıyor"** ([ift.world](https://ift.world/product-category/level-1/)) | 140+ saat video, video sonrası quiz, okuma testleri, ~2.000 soru, 4 mock, High-Yield kurs, **İngilizce altyazı**, sorunsuz uygulama ve çevrimdışı mod | 2027 Equities videoları Mayıs–Temmuz 2027'ye kadar yükleniyor. Canlı ders ayrı ücretli | **Çok uygun.** Ücretsiz paket, altyazı ve kısa quizler A2–B1 için ideal. |
| **Mark Meldrum** | 2027: Self-Study **$440**, +Applied Analysis $750, Instructor-Led $1,310, +AA $1,630 ([resmi](https://markmeldrum.com/subscriptions)) | Kavramı en iyi anlatan diye övülüyor ([300hours forum](https://300hours.com/f/cfa/level-1/t/mark-meldrums-video-and-strategy-for-level-i/)). Sesli mod, 0,5–2x hız, çevrimdışı, "One-Fee-To-Pass" (geçene kadar güncel içerik). Seçilmiş ücretsiz videolar ve YouTube | QBank sınırlı (yalnızca bazı okumalar). Bazı küçük konular eksik kalıyor. Video ağırlıklı, uzun | Konuşma hızı ayarlanabildiği için dinleme pratiği de olur. Zor konular için ücretsiz videolar yeterli. |
| **Bloomberg Exam Prep** | $499–$1,999 ([300hours](https://300hours.com/bloomberg-cfa-exam-prep/), tarihsiz). Schweser karşılaştırması $699 / $1,199 / $1,999 diyor → **UNVERIFIED** | Uyarlamalı mikro dersler, "sıradaki önerilen konu", mobil, 10'a kadar mock | Karışık yorumlar: hatalar, ilerlemenin sıfırlanması, %95 tamamlama şartlı garanti. Hâlâ faaliyette olup olmadığı doğrulanmadı | Mikro ders modeli ilham verici, ama ürün olarak önerilmez. |
| **PrepNuggets** (ek) | Premium PLUS $319 (eski 2024/25 ilanı), L1+L2 Essentials combo $359 → **UNVERIFIED** | Kısa ve animasyonlu videolar, Ethics podcast'i, AI tutor | Fiyatlar tutarsız, iade sınırlı | Ses ve kısa format telefon için iyi. |
| **Soleadea** (ek) | "Ne kadar ödeyebilirsen" modeli, kısıtlı ücretsiz plan ([link](https://soleadea.org/free-cfa-study-materials)) | 34 ücretsiz video, 300+ formül flashcard'ı, çalışma planlayıcı, 1.800+ soru | Ücretsiz kısım zaman ve erişim olarak kısıtlı, hesap gerekiyor | Bütçe sıfırsa denenebilir. |

**Özet (bu profil için):** Asgari set **LES + Practice Pack ($299)**. Buna bir soru bankası eklenmeli: açıklama kalitesi öncelikse **UWorld QBank ($299–389)**, fiyat öncelikse **AnalystPrep Practice ($349)**. Konu anlatımı için **IFT ücretsiz paket ve altyazılı videolar**, zor kavramlar için Mark Meldrum'un ücretsiz videoları kullanılabilir. Bizim uygulama bunların üstüne **Türkçe açıklama, terim köprüsü, aralıklı tekrar ve soru dili antrenmanı** katmanı olur. Tahmini toplam: sınav ücreti ve kayıt hariç ~$600–700.

---

## 10. Bu kullanıcı için somut öneri

**Profil:** Türk, aracı kurumda çalışıyor, SPK Düzey 3 + Türev lisansı var, İngilizcesi A2-orta, telefonda 5–15 dk'lık kısa seanslarla çalışıyor.

### 10.1 Hedef pencere
- Bugün 2026-10-16. 300+ saat CFA içeriği ve ek İngilizce hazırlık için **~10 ay** gerçekçi. **Hedef: Ağustos 2027**, yedek Kasım 2027. Şubat ve Mayıs 2027 bu profilde kısa kalır (ajan değerlendirmesi). Kayıt tarihleri ve ücretler A ajanından teyit edilmeli.
- Ağustos 2027 penceresi **2027 müfredatı ve ağırlıkları** ile yapılır (§2). Eski 2026 materyali (özellikle Quant ve Equities) kullanılmamalı.

### 10.2 Saat bütçesi (tahmin; kaynak dayanakları belirtildi)
| Kalem | Saat | Dayanak |
|---|---|---|
| CFA içeriği: öğrenme, soru, tekrar | **300–330** | CFA Institute ortalaması 303 sa. Finans bilgisi bir miktar kazandırıyor, yavaş okuma bir miktar kaybettiriyor (net etki, ajan tahmini) |
| Finans İngilizcesi (terim ve okuma hızı, soru dili) | **+80–120** | Cambridge'e göre bir CEFR seviyesi ≈ 200 rehberli saat ([Cambridge](https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours)). Burada genel İngilizce değil, yalnızca alan okuması hedefleniyor. Ayrıca İngilizce CFA çalışmasının kendisi de pratik sayılıyor (ajan tahmini) |
| Mock'lar ve analiz | **~40–50** (dahil) | 6 mock × (4,5 sa + ~3–4 sa analiz) |
| **Toplam** | **~400–450 sa** | 42 hafta → **~10–11 sa/hafta** |

### 10.3 Faz planı (Ağustos 2027 hedefli)
| Dönem | Hafta | Odak | Haftalık |
|---|---|---|---|
| Eki–Kas 2026 | 6 | **Dil ve terim temeli:** SPK bilgisini İngilizce terimlerle eşleştirme (~1.000–1.500 terim, modül bazlı), soru dili kalıpları, BA II Plus kurulumu ve temel tuşlar | 8–9 sa |
| Ara 2026 – Nis 2027 | 20 | **Konu turu** (2027 ağırlıkları): önce Quant (artık ağır ve diğer konuların altyapısı) → FSA → Fixed Income → Equities → Corporate Finance → Economics → Derivatives/Alts (Türev lisansı avantajı) → Portfolio Construction → **Ethics en sonda ama Aralık'ta bir kez okunup aralıklı tekrara eklenmeli.** Her modülden sonra soru seti. | 11–12 sa |
| May–Haz 2027 | 8 | **Soru bankası ve zayıf konular**, karışık (interleaved) setler, ilk tanı mock'u ~Haziran sonu | 12 sa |
| Tem–Ağu 2027 | 6 | **Mock dönemi** (§8 takvimi): 5 resmi + 1–2 üçüncü taraf, hata günlüğü. Son 1–2 hafta yıllık izin. | 12–15 sa |

Önerilen konu saati dağılımı (~300 sa öğrenme ve soru, mock hariç): Quant 38, FSA 42, Fixed Income 40, Equities 32, Ethics 36, Portfolio 24, Economics 22, Corporate Finance 20, Derivatives 18, Alts 18, birikimli tekrar 10. Ağırlık orta noktası ile profile göre ayarlandı; Derivatives ve Equities'te SPK/Türev avantajı nedeniyle düşük tutuldu (ajan tahmini).

### 10.4 Telefon dostu alışkanlıklar (5–15 dk)
- **Hafta içi 5–7 mikro seans × ~10 dk ≈ 1–1,2 sa/gün:** sabah 10 dk aralıklı tekrar kartları (terim ve formül), öğle 15 dk 8–10 soruluk zamanlı mini set (90 sn/soru), akşam 10 dk yanlışları yeniden çözme ve 5 dk "soru dili" drili. Yolda sesli içerik (Meldrum ya da IFT videolarının sesi, TTS terim tekrarı).
- **Hafta sonu 1–2 masa bloğu (90–150 dk):** hesap makinesi çalışması, uzun FSA ve Fixed Income hesapları, ayda bir yarım mock (90 soru / 135 dk).
- **Kural:** Yeni konu → aynı gün mini quiz → 1, 3, 7 ve 21 gün sonra aralıklı tekrar (FSRS otomatik planlar).
- **Ölçüm:** Konu bazında % doğruluk, ortalama sn/soru ve "misread" oranı. Hedef: Haziran'dan itibaren karışık setlerde %70+.
- **Okuma stratejisi:** Soru kökünü önce oku (ne isteniyor?), olumsuzlama ve yön kelimesini vurgula, seçeneklere sonra geç. "Least likely" sorularında D/Y yöntemi.
- **Etik:** Gerçek sınav sorusu paylaşan foruma ya da "dump" sitesine girilmemeli. Hem Candidate Pledge'e aykırı hem de bu siteler sıklıkla korsan ya da zararlı içerik barındırıyor. (Arama sonuçlarında bu tür "dump" siteleri çıktı, hiçbiri açılmadı.)

---

## Kaynaklar

| URL | Tür | Lisans | Güvenilirlik (1-5) | Katkı verdiği konular |
|---|---|---|---|---|
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam | resmi | yalnızca referans | 5 | Biçim, 2026/2027 ağırlıkları, 300+ saat, hesap makinesi, IFRS |
| https://www.cfainstitute.org/programs/cfa-program/dates-fees | resmi | yalnızca referans | 5 | Ücret "from USD 1,140", pencere ayları |
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/practice-pack/cfa-program-practice-pack-level-i-may-2027 | resmi | yalnızca referans | 5 | Practice Pack $299 ve içeriği |
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-day-preparation-guide | resmi | yalnızca referans | 5 | Sınav günü akışı, mola 31 dk, izinli eşyalar |
| https://www.cfainstitute.org/standards/professionals/code-ethics-standards/standards-of-practice-vii-a | resmi | yalnızca referans | 5 | Gizlilik, brain dump yasağı (kapsam kuralı) |
| https://www.cfainstitute.org/programs/learning-ecosystem | resmi | yalnızca referans | 4 | LES özellikleri (flashcard, sözlük oyunları) |
| https://300hours.com/how-to-prepare-cfa-level-1/ | blog | yalnızca referans | 4 | 303 saat, faz planı, mock sayısı, %67 hedef mantığı |
| https://300hours.com/cfa-level-1-tips/ | blog | yalnızca referans | 4 | Tempo (45–60 sn / 3 dk), Ethics, lojistik |
| https://300hours.com/cfa-level-i-the-10-commandments | blog | yalnızca referans | 4 | 10 kural, %70 hedef, 2 hesap makinesi |
| https://300hours.com/cfa-curriculum-changes-2027/ | blog | yalnızca referans | 4 | 2027 değişiklikleri, 102 modül, ağırlıklar |
| https://300hours.com/top-cfa-apps/ | blog | yalnızca referans | 4 | Rakip uygulama özellikleri |
| https://300hours.com/ba-ii-plus-guide/ | blog | yalnızca referans | 4 | BA II Plus ayarları |
| https://300hours.com/bloomberg-cfa-exam-prep/ | blog | yalnızca referans | 3 | Bloomberg fiyat aralığı ve özellikleri |
| https://300hours.com/cfa-pass-rates/ | blog | yalnızca referans | 3 | Ağustos 2026 %43 (resmi değil), tarihsel ortalamalar |
| https://300hours.com/f/cfa/level-1/t/mark-meldrums-video-and-strategy-for-level-i/ | forum | yalnızca referans | 3 | Meldrum aday yorumları |
| https://300hours.com/f/cfa/general/t/can-someone-please-explain-what-ethics-adjustment-is/ | forum | yalnızca referans | 3 | Etik ayarı ve MPS politikası |
| https://300hours.com/f/cfa/general/t/some-comments-on-results-analysis/ | forum | yalnızca referans | 2 | Anadil dışı zorluk anekdotları |
| https://www.300hours.com/articles/cfa-exam-computer-based-testing-for-all-levels-from-2021 | blog | yalnızca referans | 3 | CBT araçları, karalama kâğıdı |
| https://soleadea.org/cfa-exam/mock-exam-strategy | ticari | yalnızca referans | 4 | Mock takvimi, skor bantları, 3 kova analizi |
| https://soleadea.org/cfa-level-1/hardest-topics | ticari | yalnızca referans | 3 | Zor konu algısı |
| https://soleadea.org/free-cfa-study-materials | ticari | yalnızca referans | 3 | Ücretsiz videolar, formül kartları |
| https://analystprep.com/pricing | ticari | yalnızca referans | 4 | AnalystPrep fiyatları |
| https://analystprep.com/blog/cfa-level-1-6-month-study-plan/ | ticari | yalnızca referans | 3 | 6 ay / 12–13 sa plan |
| https://analystprep.com/blog/analystprep-vs-uworld-cfa/ | ticari | yalnızca referans | 2 | Açıklama üslubu karşılaştırması (taraflı) |
| https://analystprep.com/blog/cfa-level-1-february-2026-hardest-topics/ | ticari | yalnızca referans | — | **Kapsam dışı bırakıldı** (sınav sonrası konu derlemesi, VII(A) riski) |
| https://finance.uworld.com/cfa/ | ticari | yalnızca referans | 4 | UWorld paket içerikleri |
| https://apps.apple.com/app/id1496004382 | ticari | yalnızca referans | 4 | UWorld QBank $389 |
| https://finance.uworld.com/cfa/pass-rates-scores/ | ticari | yalnızca referans | 3 | 2025–2026 geçme oranları |
| https://finance.uworld.com/blog/cfa/how-to-use-cfa-level-1-mock-exams-for-maximum-score-gain/ | ticari | yalnızca referans | 3 | Mock zamanlaması |
| https://finance.uworld.com/blog/cfa/getting-familiar-with-the-cfa-exam-online-interface/ | ticari | yalnızca referans | 3 | Prometric arayüzü, zamanlayıcı uyarıları |
| https://finance.uworld.com/blog/cfa/best-cfa-prep-for-international-students/ | ticari | yalnızca referans | 2 | ESL iddiaları (pazarlama) |
| https://newsroom.wiley.com/press-releases/press-release-details/2023/UWorld-Acquires-Wileys-Efficient-Learning-Test-Prep-Portfolio-Expanding-its-Offerings-in-Finance-and-Accounting/default.aspx | haber | yalnızca referans | 5 | Wiley → UWorld satın alması |
| https://www.efficientlearning.com/cfa/ | ticari | yalnızca referans | 3 | Efficient Learning'in UWorld'e geçişi, FreshStart |
| https://ais-cpa.com/wiley-cfa-exam-review/ | blog | yalnızca referans | 2 | Eski Wiley fiyatları |
| https://katalystprep.com/cfa/reviews/kaplan/ | blog | yalnızca referans | 3 | Schweser kademe fiyatları (Haz 2026) |
| https://katalystprep.com/cfa/guides/best-prep-courses/ | blog | yalnızca referans | 2 | Başlangıç fiyatları (tutarsız) |
| https://markmeldrum.com/subscriptions | ticari | yalnızca referans | 5 | Meldrum 2027 fiyat ve içerikleri |
| https://ift.world/product/l1-premium-package/ | ticari | yalnızca referans | 5 | IFT 2027 Premium $775 |
| https://ift.world/product-category/level-1/ | ticari | yalnızca referans | 3 | Ücretsiz paket, eski fiyatlar |
| https://www.schweser.com/cfa/blog/how-to-pass-the-cfa-exam/ti-baii-plus-calculator-basics-for-the-cfa-exam | ticari | yalnızca referans | 4 | AOS/Chain, RESET uyarısı, hafıza |
| https://www.cfala.org/files/Calculator_Tips-TI-2019.pdf | akademik | yalnızca referans | 3 | Ondalık ayarı alternatifi |
| https://cleveracademy.vn/en/blog/what-level-of-english-do-you-need-for-cfa/ | ticari | yalnızca referans | 3 | Anadil dışı aday stratejileri, hata günlüğü |
| https://www.advisorperspectives.com/articles/2022/09/13/the-four-keys-to-passing-the-cfa-exam | haber | yalnızca referans | 3 | İngilizcesi ikinci dil olan charterholder tavsiyeleri (403, arama özeti) |
| https://www.cfauk.org/-/media/pdf-main/education/all-qualifications/policy---use-of-english-language-in-cfa-uk-assessments.pdf | resmi | yalnızca referans | 4 | B2 şartı, ek süre yok (CFA UK) |
| https://www.efinancialcareers.com/news/2019/09/the-real-reason-the-cfa-pass-rate-is-so-low | haber | yalnızca referans | 2 | Dil ve zorluk görüşü |
| https://analystnotes.com/cfa-topic-thoughts-on-how-to-pass-level-1.html | forum | yalnızca referans | 2 | "least likely" zaman kaybı anekdotu |
| https://www.analystnotes.com/cfa-topic-how-i-passed-levels-1-and-2-on-my-1st-try.html | forum | yalnızca referans | 2 | ~350 saat anekdotu |
| https://studycardsai.com/blog/how-long-to-study-for-cfa-level-1-reddit | blog | yalnızca referans | 1 | Reddit özeti (ikincil, SEO) |
| https://videohighlight.com/v/9LRP2KJec8c | video | yalnızca referans | 2 | YouTube "90th percentile" planı |
| https://www.learnsignal.com/blog/how-to-pass-cfa-level-1/ | ticari | yalnızca referans | 2 | Zamanın yarısı soruya |
| https://www.pw.live/cfa/exams/cfa-level-1-pass-rate-2026 | blog | yalnızca referans | 3 | Geçme oranları |
| https://eksisozluk.com/entry/5172404 | sosyal | yalnızca referans | 1 | Eski Türk aday görüşü (güncel değil) |
| https://community.cfainstitute.org/istanbul/about-us | resmi | yalnızca referans | 4 | CFA Society Istanbul (TR/AZ/GE), burs sayfası |
| https://higherlogicdownload.s3.amazonaws.com/CFAI/e45e9956-7f48-49ab-a6f7-7481e2b572db/UploadedImages/CFA__2026_Ocak_-_Haziran_Newsletter.pdf | resmi | yalnızca referans | 4 | Dernek 550+ üye, etkinlikler |
| https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html | akademik | yalnızca referans | 5 | Pratik test ve aralıklı tekrar = yüksek fayda |
| https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours | resmi | yalnızca referans | 5 | CEFR seviye başına ~200 saat |
| https://soleadea.org/cfa-level-1/ai-module-2027 | ticari | yalnızca referans | 2 | 2027 AI modülü iddiası (arama özeti) |
| https://testprepinsight.com/resources/cfa-level-1-ethics/ | blog | yalnızca referans | 2 | MPS ölçekli puan (1600) iddiası |
| https://www.reddit.com/r/CFA/ | forum | yalnızca referans | — | **Erişilemedi** (araçlara kapalı) |

Tabloda **59 satır** var: **57'si değerlendirildi**, 1'i kapsam dışı bırakıldı (AnalystPrep Feb 2026), 1'ine erişilemedi (Reddit). D_kesifler.md'de bunlara ek ~15 açık lisans ve veri kaynağı var (OpenStax, OpenIntro, Saylor, Touro, MIT OCW, KGK, World Bank, FRED, ts-fsrs vb.).
