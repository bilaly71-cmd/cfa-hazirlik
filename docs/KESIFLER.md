# KESIFLER — Faz 0'da bulunan, uygulamaya yarayan şeyler

> Kaynak: `docs/research/D_kesifler.md` (ana liste) + A/B/C/D dosyalarındaki keşifler. Erişim 2026-10-15/16. Her satır: **Ne · Nerede · Projeye nasıl katıldı / neden katılmadı / sonra**.
> Durum etiketleri: **KATILDI** (içerik/kod/veri olarak kullanıldı veya kullanılacak), **REFERANS** (yalnız bakılır, kopyalanmaz), **SONRA** (Faz 1+'da değerlendirilecek), **HAYIR** (bilinçli dışlandı).

---

## 0. Kritik lisans uyarıları (önce bunu okuyun)

1. **OpenStax güncel sürümleri CC BY değil.** Görev metninde "CC BY" diye geçen *Principles of Finance*, *Introductory Statistics 2e*, *Principles of Economics 3e* kitaplarının güncel sürümleri **CC BY-NC-SA 4.0** (OpenStax sayfa metaverisindeki `license.url` ile 2026-10-16'da doğrulandı). **Eski sürümler hâlâ CC BY 4.0**: Introductory Statistics **1e**, Principles of Economics **2e** (Macro/Micro 2e dahil), Introductory Business Statistics **1e**. CC lisansı geri alınamaz → eski sürümlerin CC BY'ı geçerli. *Principles of Finance* ve *Principles of Accounting Vol. 1*'in CC BY sürümü yok (1e de NC-SA).
2. **Kural:** Uygulama ticari olabileceği için **içerik kaynağı olarak yalnız CC BY sürümler** (atıfla, Türkçe uyarlama serbest). **NC-SA** içerik yalnız kesin ticari olmayan sürümde ve türev içerik de NC-SA olarak yayımlanmak zorunda. **NC** (Touro, Deakin, MIT OCW) yalnız referans. **ND** (Open Risk Manual) hiç türetilmez. **SA** (OpenIntro CC BY-SA, Vikipedi CC BY-SA) kullanılırsa türev içerik aynı lisansla paylaşılmalı; içerik paketi ayrı lisanslanırsa uygulama kodu etkilenmez.
3. C_mufredat.md'nin Kaynaklar tablosu OpenStax için "CC BY 4.0" yazıyor; bu **eski/hatalı**; esas alınan D_kesifler'in doğrudan kontrolü (bkz. `docs/SOURCES.md` lisans çelişkileri).
4. **Telifli ve kopyalanmayacaklar:** CFA Institute müfredatı, LES sözlüğü/flashcard'ları, resmi ve sağlayıcı soruları (Schweser, UWorld, AnalystPrep, IFT, Soleadea); SPL çalışma notları ("izinsiz çoğaltılamaz"); Investopedia/CFI sözlükleri; topluluk Anki desteleri (lisans belirsiz). Yalnız olgu/rakam atıfla kullanılır.
5. **Mevzuat:** Türk mevzuatı (Tebliğ, RG) FSEK m.31 ile serbest. KGK'nın TMS/TFRS Türkçe metinleri RG'de Kurul Kararı olarak yayımlanıyor ama IFRS Vakfı telif ilişkisi belirsiz → yalnız **terim eşleştirme**, uzun alıntı yok.
6. **Veri:** World Bank Open Data CC BY 4.0 (+ onay ima etmeme, logo yok). FRED: ML eğitimi, toplu indirme ve scraping yasak (2024) → uygulamaya veri gömme. SEC Investor.gov sözlüğü muhtemelen kamu malı (17 U.S.C. §105) ama sitede doğrulanmadı → UNVERIFIED.

---

## A. Açık lisanslı metin ve soru kaynakları

| # | Ne | Nerede | Lisans | Durum / nasıl kullanılıyor |
|---|---|---|---|---|
| A1 | **OpenStax Introductory Statistics 1e** — olasılık, dağılımlar, hipotez testi, regresyon; bölüm sonu soruları | https://openstax.org/books/introductory-statistics/pages/preface | **CC BY 4.0** | **KATILDI** — 2027'de ağırlığı artan Nicel Yöntemler için kavram metni ve soru ilhamı; CFA tarzına (3 şık) uyarlanıp Türkçeye çevrilerek, atıfla |
| A2 | OpenStax Introductory Statistics 2e (2023) | https://openstax.org/books/introductory-statistics-2e/pages/preface | CC BY-NC-SA 4.0 | **REFERANS** — 1e tercih edildi |
| A3 | **OpenStax Principles of Economics 2e** (+ Macro/Micro 2e) | https://openstax.org/books/principles-economics-2e/pages/preface | **CC BY 4.0** | **KATILDI** — Ekonomi: arz-talep, esneklik, piyasa yapıları, para politikası, kur; Türkçe özet kartları |
| A4 | OpenStax Principles of Economics 3e | https://openstax.org/books/principles-economics-3e/pages/preface | CC BY-NC-SA 4.0 | **REFERANS** — 2e yeterli |
| A5 | **OpenStax Principles of Finance** (1e/2e) — TVM, tahvil/hisse değerleme, risk-getiri, sermaye bütçelemesi, opsiyonlar; bazı bölümlerde CFA L1 öğrenme çıktılarına bağ | https://openstax.org/books/principles-finance/pages/preface ; https://openstax.org/books/principles-finance-2e/pages/preface | **CC BY-NC-SA 4.0** | **REFERANS** — kapsam en uygun olan ama NC-SA; ticari planda yalnız konu haritası ve formül doğrulama (C dosyası böyle kullandı). Ticari olmayan sürüm olursa KATILDI'ya döner |
| A6 | OpenStax Principles of Accounting Vol. 1 Financial | https://openstax.org/books/principles-financial-accounting/pages/preface | CC BY-NC-SA 4.0 | **REFERANS** — FSA temeli (tahakkuk, stok, duran varlık); formül doğrulama |
| A7 | **OpenStax Introductory Business Statistics 1e** | https://openstax.org/books/introductory-business-statistics/pages/preface | **CC BY 4.0** | **KATILDI** — Nicel için iş/finans örnekli alternatif |
| A8 | **OpenIntro Statistics 4e** — ücretsiz PDF, kaynak GitHub'da, veri setleri | https://www.openintro.org/book/os/ | CC BY-SA (3.0) | **SONRA** — Nicel soru/açıklama kaynağı; türev içerik SA ile paylaşılmalı → içerik paketi lisansı kararına bağlı |
| A9 | Saylor BUS202 Principles of Finance (TVM, oran analizi, sermaye bütçelemesi, sermaye yapısı) | https://learn.saylor.org/course/view.php?id=60 | CC BY 3.0 (site); bağlantılı materyaller ayrı | **SONRA** — Kurumsal Finans / FSA oran kartları için; her materyalin lisansı tek tek kontrol |
| A10 | Bigel, *Corporate Finance* ve *Fixed Income Mathematics* (Touro Pressbooks) | https://touro.pressbooks.pub/corporatefinance/ ; https://touro.pressbooks.pub/fixedincomemathematics/ | CC BY-NC 4.0 (arama motoru yanlışlıkla "CC BY" demişti) | **REFERANS** — Sabit Getirili problem fikirleri; kopyalanmaz |
| A11 | MIT OCW 15.401 Finance Theory I (Lo, 2008) | https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/ | CC BY-NC-SA; örnek sınavlar "izinle" | **REFERANS** — konu sezgisi; örnek sınavlar kapsam dışı |
| A12 | LibreTexts Business | https://biz.libretexts.org/ | Sayfa sayfa değişir | **SONRA** — her sayfanın etiketi okunarak; toplu kopyalama yok |
| A13 | Business Finance (Deakin) | https://deakin.pressbooks.pub/corporatefinance/ | CC BY-NC 4.0 | **REFERANS** |
| A14 | Open Risk Manual | https://www.openriskmanual.org/ | CC BY-NC-ND 4.0; giriş gerekiyor | **HAYIR** — ND ve oturum kuralı |

**Boşluk:** Hiçbir açık kaynak CFA müfredatını birebir karşılamıyor. **Etik standartları, Alternatif Yatırımlar, CFA'ya özgü terminoloji ve IFRS/US GAAP ayrıntıları** için özgün içerik yazılacak (SOURCES.md: Alternatif Yatırımlar için CFA Institute dışı bağımsız kaynak yok → Faz 1'de aranacak).

---

## B. Sözlük, terminoloji, veri

| # | Ne | Nerede | Lisans | Durum / kullanım |
|---|---|---|---|---|
| B1 | Vikipedi (EN/TR) finans maddeleri | https://en.wikipedia.org/wiki/Wikipedia:Copyrights | CC BY-SA 4.0 (sürüm UNVERIFIED) | **REFERANS/SONRA** — TR↔EN terim eşleştirme ve tanım taslağı; tanımlar özgün yazılır; C dosyası durasyon, put-call paritesi, MM için formül çapraz kontrolünde kullandı |
| B2 | SEC Investor.gov sözlüğü | https://www.investor.gov/introduction-investing/investing-basics/glossary | Muhtemelen kamu malı (UNVERIFIED) | **SONRA** — basit İngilizce tanımlar (A2–B1 okura uygun) |
| B3 | **KGK TMS/TFRS Türkçe metinleri** (ör. TMS 2 Stoklar, 2026 Mavi Kitap) | https://www.kgk.gov.tr/Portalv2Uploads/files/Duyurular/v2/TMS_TFRS_Setleri/2026/Mavi_Kitap/TMS/TMS%202.pdf | Mevzuat; IFRS Vakfı telif ilişkisi belirsiz | **KATILDI (terim düzeyinde)** — FSA için resmi Türkçe karşılıklar ("inventories = stoklar", "net realisable value = net gerçekleşebilir değer"); kullanıcı bunları pratikten tanıyor |
| B4 | SPK mevzuatı ve lisanslama terminolojisi | https://www.spk.gov.tr ; https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=19974&MevzuatTur=9&MevzuatTertip=5 | Mevzuat serbest (FSEK m.31); SPL notları telifli | **KATILDI** — "köprü" kartları: kullanıcının bildiği Türkçe terim ↔ CFA İngilizce terimi; `content/syllabus/spk_map.json` (B dosyası) |
| B5 | World Bank Open Data | https://www.worldbank.org/en/about/legal/terms-of-use-for-datasets | CC BY 4.0 + ek şartlar | **SONRA** — Ekonomi sorularında gerçek Türkiye verisi (enflasyon, cari açık) |
| B6 | FRED | https://fred.stlouisfed.org/legal/terms_of_use.html | Ticari olmayan; scraping/ML yasak | **HAYIR (gömme)** — yalnız referans |
| B7 | Investopedia, CFI, sağlayıcı sözlükleri | — | Telifli | **HAYIR** |
| B8 | CFA Institute LES sözlüğü/flashcard'ları | LES içi | Telifli | **HAYIR (kopya)** — kullanıcıya "LES sözlük oyunlarını da kullan" yönlendirmesi |
| B9 | **TCMB gösterge kur XML'i** — günlük USD/TRY (15.10.2026 satış 49,4204) | https://www.tcmb.gov.tr/kurlar/today.xml | Kamuya açık veri | **KATILDI** — maliyet tablosu; uygulamada kur parametrik + "son doğrulama tarihi" ile (A dosyası) |
| B10 | C dosyasının Türkçe terim tablosu (equity → pay, duration → durasyon, WACC → AOSM, hedge fund → serbest fon…) | `docs/research/C_mufredat.md` §4 | özgün | **KATILDI** — glossary ve terim köprüsü tohumu |

---

## C. Açık kaynak yazılım ve arayüz fikirleri

| # | Ne | Nerede | Lisans | Durum / kullanım |
|---|---|---|---|---|
| C1 | **ts-fsrs** — FSRS v6 TypeScript (createEmptyCard, scheduler.next) | https://github.com/open-spaced-repetition/ts-fsrs | MIT | **KATILDI (plan)** — flashcard ve "yanlış soru" tekrar planlaması; Node ≥20 yalnız derleme; **React Native/Expo uyumu ilk spike'ta test edilmeli** (UNVERIFIED) |
| C2 | Prometric CFA eğitim modülü (fikir) | Prometric aday sayfası (URL doğrulanmadı) | — | **REFERANS** — mock ekranı işlevleri: flag, strikethrough, highlight, bölüm özeti, 30/15/5 dk uyarıları; arayüz taklit edilmez |
| C3 | A dosyası: resmi geçme oranı PDF'inin kolon koordinatıyla ayrıştırılması | https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/candidate-resources/1963-current-candidate-examination-results.pdf | Resmi, referans | **KATILDI (veri)** — 2016–2026 tablo; yıllık güncellenecek |
| C4 | C dosyası: 2026/2027 topic outline PDF'lerinin otomatik ayrıştırılması (LM = "The candidate should be able to", LOS = □ maddeleri) | https://www.cfainstitute.org/sites/default/files/2027levelitopicoutline_online.pdf | Resmi ("not for distribution") | **KATILDI (yapı)** — `content/syllabus/L1.json` 102 modül / 340 LOS özgün cümlelerle; LOS metni kopyalanmadı; küçük sayım hatası olasılığı |

---

## D. Çalışma teknikleri (kanıta dayalı) → uygulama kuralları

| # | Ne | Kaynak | Uygulamada |
|---|---|---|---|
| D1 | Pratik test ve aralıklı tekrar "yüksek fayda"; yeniden okuma/altını çizme "düşük" | Dunlosky ve ark. 2013 — https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html | **KATILDI** — her mikro seans soruyla başlar; okuma yalnız soru sonrası açıklama; FSRS tekrar |
| D2 | Interleaving ve kendine açıklama "orta fayda" | aynı | **KATILDI** — Haziran'dan itibaren karışık setler; yanlıştan sonra "neden? (1 cümle Türkçe)" alanı |
| D3 | Hata günlüğü, 3 kova (bilmiyordum/acele/süre) + "misread" etiketi | https://soleadea.org/cfa-exam/mock-exam-strategy ; https://cleveracademy.vn/en/blog/what-level-of-english-do-you-need-for-cfa/ | **KATILDI** — tek dokunuş etiket; haftalık "dil kaynaklı hata %" |
| D4 | Modül bazlı, ifade olarak terim öğrenimi; benzer terimleri ayıran sözlük | cleveracademy.vn | **KATILDI** — terim kartı = EN + TR + örnek cümle + "karıştırılan terim" |
| D5 | Tempo: 90 sn ortalama, kavram 45–60 sn, en fazla 3 dk | https://300hours.com/cfa-level-1-tips/ | **KATILDI** — soru sayacı, 3. dk "tahmin et ve geç" |
| D6 | Mock hedefi %70+ (ilk deneme ortalaması) — resmi değil | Soleadea, 300hours | **KATILDI** — hazırlık göstergesi, "resmi değil" notuyla |
| D7 | Soru dili tuzakları (*least likely, closest to, overstate…*) ve D/Y yöntemi | D dosyası §6 | **KATILDI** — "soru dili" drili modülü |
| D8 | BA II Plus ayarları (AOS, P/Y=1, kayan ondalık, CLR TVM) | https://300hours.com/ba-ii-plus-guide/ ; Schweser blog; CFALA PDF | **KATILDI** — tuş dizisi kartları; emülatör yok |
| D9 | CEFR seviye ≈ 200 rehberli saat | https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours | **KATILDI** — İngilizce bütçesi 80–120 sa (alan okuması) |
| D10 | Resmi soru stili kuralları (3 şık, olumsuz kök yok, "most likely", sıralı seçenekler, "hepsi/hiçbiri" yok) | https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam | **KATILDI** — soru üretim şablonu (`docs/GEN_PROMPT.md` ile uyumlu olmalı) |

---

## E. Rakip uygulamalardan alınan iyi özellikler

| Özellik | Kimde | Bizim uyarlama | Durum |
|---|---|---|---|
| Her seçenek için ayrı açıklama, görsel/tablo | UWorld | Her seçeneğe Türkçe "neden doğru/yanlış" + basit İngilizce özet | KATILDI |
| Aralıklı tekrar flashcard'ları (hazır + kişisel) | UWorld | FSRS + hazır terim/formül desteleri + yanlıştan otomatik kart | KATILDI |
| Sözlük oyunları, paylaşılabilir kart setleri | CFA LES | 60 sn EN↔TR terim eşleştirme oyunu | SONRA |
| Sesli mod, arka plan, 0,5–2x, çevrimdışı | Mark Meldrum | TTS "dinle" modu; çevrimdışı içerik paketi | SONRA |
| Video sonrası quiz, İngilizce altyazı, kaldığın yerden devam | IFT | Her mikro dersten sonra 3 soruluk kontrol; senkron "kaldığın yer" | KATILDI (quiz) / SONRA (video dış bağlantı) |
| Prometric benzeri simülasyon (flag, skip, filtre) | Schweser, UWorld | Mock modu: flag, üstünü çizme, vurgulama, özet, zamanlayıcı uyarıları | KATILDI (plan) |
| Uyarlamalı "sıradaki önerilen konu", mikro ders | Bloomberg | Ağırlık × zayıflık ile "bugünün 10 dakikası"; ilerleme asla sıfırlanmaz | KATILDI |
| 300+ formül kartı, planlayıcı | Soleadea | Formül kartı = formül + Türkçe değişken + BA II Plus tuşları | KATILDI |
| Ethics podcast, kısa animasyon, AI tutor | PrepNuggets | Etik vakalarının sesli kısa Türkçe anlatımı; asistan SONRA | SONRA |
| Pass protection / One-Fee-To-Pass | Schweser, UWorld, Meldrum | İş modeli fikri: geçene kadar güncel içerik | SONRA |
| Dark mode, yazı boyutu, Face ID | Schweser, UWorld | Büyük punto ve satır aralığı (A2 okur), erişilebilirlik temel | KATILDI |
| Bilinen şikâyetler: oturum kopması, mobilde vurgulama yok, senkron gecikmesi, değiştirilemeyen tek dokunuş cevap | LES, Schweser | Cevap öncesi onay; çevrimdışı öncelikli mimari; kalıcı kayıt (bkz. commit ebf31ba) | KATILDI |

Kaynak: https://300hours.com/top-cfa-apps/ ; https://finance.uworld.com/cfa/ ; https://ift.world/product/l1-premium-package/ ; https://300hours.com/kaplan-schweser-exam-sim ; https://300hours.com/bloomberg-cfa-exam-prep/ ; https://soleadea.org/free-cfa-study-materials ; https://prepnuggets.com/ (15–16.10.2026).

---

## F. Lojistik ve Türkiye'ye özgü keşifler (A, B dosyalarından)

| # | Ne | Nerede | Durum / kullanım |
|---|---|---|---|
| F1 | **Access bursu başvuru açılış günleri kayıt açılış günleriyle aynı** (5 May, 12 Ağu, 3 Kas, 9 Şub) → Ağu 2027 kaydının 3 Kas 2026'da açılacağına dolaylı resmi kanıt | https://www.cfainstitute.org/programs/cfa-program/scholarships/access | **KATILDI** — takvim ve info.json; resmi tablo etkileşimli olduğundan tek resmi dayanak |
| F2 | Resmi "Dates & Fees" tablosu AJAX ile yükleniyor; statik HTML'de yok → toplamlar (3.520–4.570) ile seviye kırılımı çapraz doğrulandı | https://www.cfainstitute.org/programs/cfa-program/dates-fees | **KATILDI (yöntem)** — gelecek güncellemelerde aynı teknik |
| F3 | Resmi test merkezi PDF'i (Türkiye: Ankara, İstanbul, İzmir; dosya 14 May 2026) | https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/cfa-pogram-exam-test-center-locations.pdf | **KATILDI** — Türkiye kartı |
| F4 | Ücretli erteleme (449 USD) Şubat 2027'den itibaren kaldırıldı; 14 gün iade kuralı | https://www.cfainstitute.org/about/press-room/2026/deferral-policies-update ; https://www.cfainstitute.org/about/governance/policies/cfa-program-refund-policy | **KATILDI** — "kayıt = taahhüt" uyarısı ve 14 gün hatırlatıcısı |
| F5 | Lisanslama Tebliği Ek-2: CFA L1/L2/L3 → Düzey 1/2/"3 ve/veya Türev"; Md. 10 fark sınavı; Md. 26 yabancı/yurt dışı 3 yıl | mevzuat.gov.tr ; https://spl.com.tr/yabanci-belgeler-ve-denkligi-kabul-edilen-calisma-hakki-verilen-lisanslar/ | **KATILDI** — SPK köprüsü kartı; "CFA lisans yerine geçmez" uyarısı |
| F6 | SPL notlarında anahtar kelime taraması ("hipotez" 0, "Monte Carlo" 0, "US GAAP" 0, "Ertelenmiş Vergi" 0) → nesnel "yeni konu" kanıtı | SPL PDF'leri (telifli) | **KATILDI (yöntem)** — `spk_map.json` known/partial/new etiketleri |
| F7 | SPL–CISI 2019 mutabakatı: Düzey 3 → CISI UK Financial Regulation muafiyeti (CFA için benzeri yok) | https://www.ekonomim.com/finans/haberler/splden-uluslararasi-is-birligi-haberi-457454 | **REFERANS** — "ters yön muafiyet yok" bağlamı |
| F8 | LinkedIn ilanları: SPK lisansı "zorunlu", CFA "tercih" | tr.linkedin.com/jobs (geçici) | **REFERANS** — kariyer değeri kartı; ilanlar kalıcı değil |
| F9 | TMS 29 enflasyon muhasebesi (Türk şirketleri 31/12/2023'ten itibaren) CFA L1'de yok | https://www.kgk.gov.tr/Portalv2Uploads/files/Duyurular/v2/Diger/Enf_%20Muh_%20Duyuru_ESEB.pdf | **SONRA** — "Türk pratiğinden farklı" uyarı notu olarak FSA'ya |
| F10 | CFA Society Istanbul (TR/AZ/GE, 550+ üye, işveren ziyaretleri, 19 affiliated üniversite) | https://community.cfainstitute.org/istanbul/about-us ; 2026 H1 bülteni | **KATILDI** — "Türkiye'de CFA" kartı (bağlantıyla, içerik kopyalamadan) |
| F11 | IFT ücretsiz paket (tüm okumalar) ve altyazılı videolar; Meldrum ücretsiz videolar | https://ift.world/product-category/level-1/ ; markmeldrum.com | **KATILDI (dış bağlantı)** — "bu konunun videosu" bağlantısı, gömme yok |
| F12 | Türkçe CFA deneyim/strateji içeriği neredeyse yok (ekşi'de tek eski girdi, Türkçe Medium yazısı yok) | https://eksisozluk.com/entry/5172404 | **KATILDI (konumlandırma)** — pazar boşluğu; uygulamanın ayırt edici yanı |
| F13 | 2027 ağırlıklarının değiştiği, birçok 3. taraf sitenin eskidiği | https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam | **KATILDI** — ağırlıklar yalnız resmi sayfadan; `last_verified` alanı |
| F14 | Prometric'in CFA sınavlarını yürüttüğü; Türkiye merkez adresleri yalnız randevu ekranında | https://www.prometric.com/success-stories/modernizing-cfa-exam-experience/ | **SONRA** — kullanıcı randevu alınca adres girilir |

---

## G. Bilinçli dışlananlar

- **"CFA exam dumps" / "recalled questions" siteleri** (ör. spoto.net, cciedump.spoto.net): açılmadı, kullanılmadı — Candidate Pledge / Standard VII(A) ihlali, korsan ve zararlı içerik riski.
- **Sınav sonrası "hangi konular zordu" derlemeleri** (AnalystPrep "Feb 2026 hardest topics"): Standard VII(A) "test edilen geniş konu alanları"nı da gizli saydığı için dışarıda.
- **Topluluk Anki desteleri:** lisans belirsiz, çoğu telifli notlardan türetilmiş.
- **Sağlayıcıların ücretsiz soru PDF'leri** (freefellow, finquiz vb.): telifli.
- **Reddit r/CFA, X/Twitter:** erişilemedi / oturum gerektiriyor; yalnız ikincil özetler düşük güvenle.
- **thewealthadvisor.com "%39 L3"** makalesi: yanlış tarihli eski içerik.
- **Bloomberg Exam Prep:** ürün olarak önerilmez (karışık yorumlar, ilerleme sıfırlanması); yalnız mikro ders fikri alındı.
