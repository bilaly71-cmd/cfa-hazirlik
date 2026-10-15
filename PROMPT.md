**# GÖREV: CFA Hazırlık Mobil Uygulaması (EN/TR çift dilli) — uçtan uca, otonom**



**## 0. ## 0.5 ESNEKLİK VE KEŞİF**

**- Bu prompt bir harita, kafes değil. Kırmızı çizgiler (bölüm 2) dışındaki her şeyi**

&#x20; **değiştirebilirsin: teknoloji, veri şeması, özellik listesi, fazların sırası,**

&#x20; **milestone içerikleri. Daha iyi bir yol bulursan uygula ve gerekçesini**

&#x20; **DECISIONS.md'ye bir satırla yaz.**

**- Hedeflerdeki sayılar taban, tavan değil. Aşabiliyorsan aş.**

**- Araştırırken yolda gördüğün ilginç şeylere bak: bir kaynağın linklediği başka bir**

&#x20; **kaynak, bir forumda bahsedilen bir çalışma tekniği, bir rakip uygulamadaki iyi bir**

&#x20; **özellik, açık lisanslı bir soru bankası. Değerliyse projeye kat.**

**- Keşiflerini docs/KESIFLER.md'ye yaz: ne buldun, nerede buldun, projeye nasıl**

&#x20; **kattın (ya da neden katmadın).**

**- Benim aklıma gelmeyen ama sınavı geçmeme ya da İngilizcemi geliştirmeme yarayacak**

&#x20; **bir fikir bulursan sormadan ekle.**

**- Tek dengeleyici kural: bir keşif ana hattı uzun süre durduruyorsa onu**

&#x20; **KESIFLER.md'ye "sonra" notuyla park et ve ana hatta dön. Çalışan sürümü**

&#x20; **geciktirmeye değecek bir yan yol nadirdir.**

**ÇALIŞMA MODU**



**- Ben ekranda değilim. Bana soru sorma, onay bekleme. Belirsizlikte en makul kararı ver,**

&#x20; **gerekçesini docs/DECISIONS.md'ye tek satırla yaz ve devam et.**

**- Her anlamlı adımdan sonra git commit at. PROGRESS.md'yi her zaman güncel tut: ne bitti,**

&#x20; **ne kaldı, sıradaki adım ve metrikler. Oturum kesilirse (context veya kullanım limiti),**

&#x20; **yeni oturumda "PROGRESS.md'yi oku, kaldığın yerden devam et" dediğimde hiçbir şey**

&#x20; **kaybetmeden devam edebilmelisin.**

**- Ağır işleri subagent'lara böl (örneğin her konunun içeriğini paralel üret). Doğrulamayı ise**

&#x20; **içeriği üreten ajandan BAĞIMSIZ bir reviewer ajana yaptır.**

**- Çalışan bir sürümü erken çıkar (Milestone A), sonra genişlet. Mükemmeli beklerken elimde**

&#x20; **hiçbir şeyin olmaması kabul edilemez.**



**## 1. BEN KİMİM (tasarım kararlarını buna göre ver)**

**- Türkiye'de bir aracı kurumda çalışıyorum. SPK Düzey 3 ve Türev Araçlar lisanslarım var.**

&#x20; **Finans kavramlarını Türkçe biliyorum; eksiğim İngilizce ve CFA'ya özgü derinlik.**

**- İngilizcem A2 ortası seviyesinde. CFA sorularını İngilizce anlamakta zorlanacağım.**

&#x20; **Uygulama hem sınavı hem finans İngilizcesini öğretmeli.**

**- Uygulamayı ağırlıklı olarak telefonda, kısa aralıklarla (5-15 dk) kullanacağım.**

&#x20; **Offline çalışması şart.**

**- Arayüz Türkçe, içerik çift dilli olacak.**



**## 2. KIRMIZI ÇİZGİLER (asla ihlal etme)**

**1. Telif: CFA Institute'un resmi müfredat metinlerini ve resmi practice/mock sorularını,**

&#x20;  **ayrıca Kaplan Schweser, Wiley, AnalystPrep, UWorld, IFT gibi sağlayıcıların soru ve**

&#x20;  **metinlerini birebir ya da yakın parafrazla KOPYALAMA. Bunları yalnızca kapsam, yapı,**

&#x20;  **zorluk kalibrasyonu ve "bu konu nasıl soruluyor" bilgisi için referans al. Uygulamadaki**

&#x20;  **tüm soru ve anlatımlar özgün olacak. Açık lisanslı kaynakları (OpenStax, CC lisanslı**

&#x20;  **içerikler vb.) lisans şartlarına uyarak ve atıf vererek kullanabilirsin.**

**2. Brain dump yasak: Forumlarda veya sosyal medyada paylaşılan "gerçek sınavda çıkan**

&#x20;  **soruları" (recalled exam questions) ASLA toplama, kullanma, kaydetme. Bu CFA Candidate**

&#x20;  **Pledge ihlalidir ve adayın diskalifiye edilmesine yol açar. Böyle bir içeriğe**

&#x20;  **rastlarsan atla.**

**3. Korsan PDF veya kitap indirme, paywall aşma yok.**

**4. Hiçbir sitede hesap açma, giriş yapma, form gönderme, ödeme yapma, kişisel bilgi**

&#x20;  **girme yok. Webde yalnızca okuma yap.**

**5. Proje klasörü dışındaki dosyalara dokunma. Sistem ayarlarını değiştirme.**

**6. Kaynağını gösteremediğin olgusal bilgiyi (ücret, tarih, ağırlık, kural) uydurma.**

&#x20;  **Doğrulayamadıklarını UNVERIFIED olarak işaretle.**



**## 3. FAZ 0 — DERİN ARAŞTIRMA → docs/RESEARCH.md**

**Kaynak hiyerarşisi: önce resmi kaynak (cfainstitute.org), sonra en az 2 bağımsız kaynakla**

**çapraz doğrulama. Her bilginin yanına kaynak URL'si ve erişim tarihi yaz. Siteleri**

**WebFetch ile okuyamazsan tarayıcıyı kullan.**



**A) Sınav lojistiği**

**- Her seviye için güncel ücretler (early ve standard), rescheduling ücreti.**

&#x20; **Access Scholarship ve diğer burslar: şartlar, indirim miktarı, başvuru dönemleri.**

**- 2026-2028 sınav pencereleri ve kayıt son tarihleri (L1, L2, L3 ayrı ayrı).**

**- Türkiye'deki test merkezleri: hangi şehirler, sağlayıcı hangisi.**

&#x20; **Türkiye'den kayıt ve ödeme pratikleri. Güncel USD/TRY kuruyla TL maliyet tablosu.**

**- Uygunluk şartları: L1 için eğitim/iş deneyimi ve pasaport şartı. Charter için iş**

&#x20; **deneyimi saati, üyelik ve referans şartları, yıllık aidatlar (CFA Institute ve**

&#x20; **CFA Society Turkey).**

**- Seviye bazında son 10 yılın geçme oranları, tahmini MPS (minimum geçme skoru),**

&#x20; **önerilen çalışma saatleri, sonuçların açıklanma süresi.**

**- Sınavda izin verilen hesap makineleri (TI BA II Plus / Professional, HP 12C) ve**

&#x20; **sınav günü kuralları.**

**- L3 pathway'leri ve Practical Skills Modules: hâlâ geçerliler mi, sınava etkileri ne.**

**- 2027 müfredat değişiklikleri: hangi pencereden itibaren geçerli, hangi modüller**

&#x20; **eklendi, çıkarıldı veya değişti. İçerik versiyonlu olacak (curriculum\_year alanı);**

&#x20; **hedef müfredat 2027 ve sonrası.**



**B) Türkiye ve SPK bağlamı**

**- CFA'nın Türkiye'deki hukuki statüsü: SPK lisanslarının yerine geçer mi? SPL lisans**

&#x20; **sınavlarında CFA sahiplerine muafiyet veya denklik var mı? Birincil kaynak olarak**

&#x20; **SPK/SPL mevzuatını kullan.**

**- CFA Society Turkey'in faaliyetleri. CFA'nın Türkiye'de portföy yönetimi ve araştırma**

&#x20; **kariyerindeki değeri.**

**- CFA L1, L2, L3 konularının SPK Düzey 3 sınav konularıyla eşleşme tablosu**

&#x20; **("bunu Düzey 3'ten zaten biliyorsun" / "bu konu yeni").**



**C) Müfredat iskeleti**

**- L1'in 10 konu alanı, ağırlık aralıkları, learning module listesi ve LOS (Learning**

&#x20; **Outcome Statement) seviyesinde konu ağacı. LOS'ları kendi cümlelerinle özetle,**

&#x20; **resmi metni kopyalama. Çıktı: content/syllabus/L1.json**

**- L2 ve L3 için aynı iskelet (ilk etapta konu ve modül düzeyinde).**

**- Her konu için kritik formüller, en sık yapılan hatalar ve tipik soru tuzakları.**



**D) Hazırlık stratejisi ve topluluk bilgisi**

**- Taranacak yerler: Reddit r/CFA, AnalystForum, 300hours, X/Twitter, YouTube**

&#x20; **(Mark Meldrum, IFT ve sağlayıcıların ücretsiz içerikleri), LinkedIn'deki aday**

&#x20; **deneyimleri, Türkçe blog ve forumlar.**

**- Çıkarılacak bilgi: çalışma planları, en zor konular, sınav günü taktikleri ve ana dili**

&#x20; **İngilizce olmayan adayların tavsiyeleri. Buralardan YALNIZCA strateji ve meta bilgi**

&#x20; **al (bkz. kırmızı çizgi 2).**

**- Hazırlık sağlayıcılarının karşılaştırması: fiyat, güçlü ve zayıf yanlar. Bu tablo,**

&#x20; **satın alma kararını vermem için.**



**E) Kaynak envanteri → docs/SOURCES.md**

**- Her kaynak için: URL, tür (resmi / akademik / forum / sosyal medya / video),**

&#x20; **lisans durumu (içerik kullanılabilir mi, yalnızca referans mı), 1-5 arası**

&#x20; **güvenilirlik puanı, katkı verdiği konular.**

**- En az 80 kaynak değerlendir.**



**F) Türkçe rehber → docs/CFA\_REHBERI\_TR.md**

**- Faz 0'ın okunur bir Türkçe özeti: TL ve USD maliyet tablosu, takvim önerisi ve**

&#x20; **benim profilime göre gerçekçi bir yol haritası. Yol haritasında İngilizce hazırlık**

&#x20; **süresini de hesaba kat.**



**## 4. FAZ 1 — MİMARİ**

**- Teknoloji: Expo (React Native) + TypeScript + expo-router.**

&#x20; **- iOS ve Android'de Expo Go ile çalışmalı.**

&#x20; **- Ayrıca `expo export --platform web` ile PWA olarak çıkmalı; mağazaya gerek kalmadan**

&#x20;   **telefonumun ana ekranına ekleyebilmeliyim.**

&#x20; **- PWA'yı GitHub Pages'e deploy eden bir GitHub Actions workflow'u hazırla.**

&#x20;   **Repo varsayılan olarak private olsun.**

**- Tamamen offline çalışmalı:**

&#x20; **- İçerik JSON olarak uygulamayla birlikte paketlenecek.**

&#x20; **- İlerleme cihazda tutulacak (SQLite veya AsyncStorage).**

&#x20; **- Backend, API key ve ücretli servis yok.**

**- Formüller LaTeX ile yazılıp offline render edilecek (KaTeX vb.). Tablolar mobilde**

&#x20; **yatay kaydırılabilir olacak.**

**- İngilizce sesli okuma için TTS (expo-speech, hız ayarlı).**



**Veri şeması (genişletebilirsin, ama bu alanlar mutlaka olsun):**



**Question {**

&#x20; **id, level, topic, module\_id, los\_id, curriculum\_year,**

&#x20; **type: "mcq3" | "item\_set" | "constructed\_response",**

&#x20; **difficulty: 1-3,**

&#x20; **cognitive: "recall" | "apply" | "analyze",**

&#x20; **stem\_en, stem\_tr,**

&#x20; **options: \[{ key, en, tr }],**

&#x20; **answer,**

&#x20; **explanation\_en, explanation\_tr,**

&#x20; **wrong\_option\_reasons: { \[key]: { en, tr } },**

&#x20; **solution\_steps: \[{ en, tr, formula\_latex?, values? }],**

&#x20; **calculator: { device, keystrokes: \[], note\_tr },**

&#x20; **vocab\_ids: \[],**

&#x20; **spk\_link?,                // Düzey 3'teki karşılığı**

&#x20; **source\_basis: "original",**

&#x20; **verified: { by, method, date }**

**}**



**Lesson {**

&#x20; **id, los\_ids,**

&#x20; **sections: \[{ en, tr, key\_terms, formula\_latex?, example? }],**

&#x20; **summary\_en, summary\_tr,**

&#x20; **common\_traps\_tr**

**}**



**VocabTerm {**

&#x20; **id, term\_en, pronunciation\_tr, ipa, tr,**

&#x20; **definition\_en\_simple,     // A2-B1 seviyesinde sade İngilizce**

&#x20; **definition\_tr,**

&#x20; **example\_en, example\_tr,**

&#x20; **cefr\_level, topic,**

&#x20; **everyday\_meaning          // günlük İngilizcedeki anlamı: yield, security, premium, issue gibi**

**}**



**## 5. FAZ 2 — İÇERİK ÜRETİM HATTI (asıl iş burada)**

**Her LOS için aşağıdaki paket üretilecek:**



**1. Konu anlatımı**

&#x20;  **- İngilizcesi sade olacak ama sınav terminolojisini kullanacak; yanında Türkçesi olacak.**

&#x20;  **- Sıralama: önce sezgi (bu kavram neden var, gerçek hayatta nerede karşıma çıkar;**

&#x20;    **mümkünse BIST veya Türkiye'den örnek), sonra tanım, formül, sayısal örnek ve**

&#x20;    **tuzaklar.**



**2. Sorular**

&#x20;  **- CFA formatında olacak (L1 için 3 şıklı tek soru).**

&#x20;  **- Her LOS için en az 5 soru.**

&#x20;  **- Zorluk dağılımı: yaklaşık %30 kolay, %50 orta, %20 zor.**

&#x20;  **- Hesaplama içeren LOS'larda soruların çoğu sayısal olacak.**



**3. Manuel çözüm**

&#x20;  **- Sayısal sorularda adım adım: (a) ne isteniyor, (b) hangi formül ve neden,**

&#x20;    **(c) değerlerin yerine konması, (d) ara sonuçlar, (e) sonuç ve birimi.**

&#x20;  **- Ayrıca BA II Plus tuş sırası (gerektiğinde HP 12C).**

&#x20;  **- Kavramsal sorularda doğru şıkkın gerekçesi ve her yanlış şıkkın neden yanlış**

&#x20;    **olduğu (çeldiricinin mantığı).**



**4. Kelime katmanı**

&#x20;  **- Her soruda ve anlatımda, A2 seviyesindeki birinin takılacağı 3-8 kelime veya**

&#x20;    **ifade işaretlenecek.**

&#x20;  **- Bunlar yalnızca finans terimleri değil; genel İngilizce kelimeler de dahil.**



**5. CFA soru kalıpları modülü**

&#x20;  **- "least likely", "is closest to", "most appropriate", "all else equal",**

&#x20;    **"which of the following is NOT" gibi kalıplar ayrı bir modül olacak.**

&#x20;  **- Bu kalıpları yanlış okumak, ana dili İngilizce olmayan adayların en sık yaptığı**

&#x20;    **hatalardan biri; her kalıp için örnek ve Türkçe açıklama olsun.**



**Çeviri kuralları**

**- Türkçe terminoloji SPK/SPL lisans kitapları ve TSPB kullanımıyla tutarlı olacak.**

**- content/glossary\_tr.json tek doğruluk kaynağı (single source of truth). Tüm içerik**

&#x20; **buna uymak zorunda; bunu bir lint script'i kontrol edecek.**

**- Bir terim Türkçe metinde ilk geçtiğinde İngilizcesi parantez içinde yazılacak:**

&#x20; **"durasyon (duration)".**

**- Çeviriler doğal Türkçe olacak, makine çevirisi kokmayacak.**



**Doğrulama (her pakette, üreticiden bağımsız reviewer ajan yapacak)**

**- Tüm sayısal cevaplar Python ile yeniden hesaplanacak (scripts/verify\_numeric.py).**

&#x20; **Şıklardan yalnızca biri doğru olmalı; yuvarlama farkları tolerans içinde kalmalı.**

**- Cevap anahtarı, açıklama ve çözüm adımları birbiriyle tutarlı olmalı.**

**- Doğru şıkların dağılımı dengeli olmalı (her seferinde B çıkmamalı).**

**- İngilizce ve Türkçe metinler anlamca eşdeğer olmalı ve glossary'ye uymalı.**

**- Telif kontrolü: araştırmada kaydettiğin referans parçacıklarıyla n-gram benzerlik**

&#x20; **taraması yap; yakın kopya çıkan içerik reddedilir.**

**- Doğrulamadan geçemeyen içerik verified:false olarak kalır ve uygulamada gösterilmez.**

&#x20; **Bu içerikler reports/qa\_failures.md'ye yazılır ve düzeltilir.**



**Öncelik sırası**

**- Konu ağırlığına göre: önce Etik, FSA, Equity ve Fixed Income.**

**- Etik için vaka tabanlı ayrı bir modül olacak: Standards I-VII'nin her biri için**

&#x20; **özgün senaryolar.**



**## 6. FAZ 3 — UYGULAMA ÖZELLİKLERİ**

**Zorunlu özellikler:**



**- Flip kart**

&#x20; **- Ön yüz İngilizce. Dokununca 3D animasyonla dönüp Türkçe tarafı gösterir.**

&#x20; **- Anlatımda paragraf paragraf, sorularda ise soru kökü ve her şık ayrı ayrı**

&#x20;   **çevrilebilir.**



**- Kelime popup'ı**

&#x20; **- Herhangi bir kelimeye dokununca küçük bir pencere açılır: Türkçe anlam, okunuş,**

&#x20;   **sesli telaffuz, örnek cümle ve "kelime defterime ekle" butonu.**



**- Türkçe destek seviyesi (benim için en kritik özellik)**

&#x20; **- Seviye 3: Türkçe her yerde hazır görünür.**

&#x20; **- Seviye 2: Türkçe yalnızca kart çevrilince görünür.**

&#x20; **- Seviye 1: Yalnızca kelime popup'ı var.**

&#x20; **- Seviye 0: Sınav modu, tamamen İngilizce.**

&#x20; **- Uygulama performansıma bakarak seviyeyi düşürmemi önermeli. Amaç, sınava girdiğimde**

&#x20;   **Türkçe desteğe hiç ihtiyaç duymamam.**



**- Soru modları**

&#x20; **- Konu veya LOS bazlı çalışma.**

&#x20; **- Karışık sorular.**

&#x20; **- Yalnızca yanlış yaptıklarım.**

&#x20; **- Zamanlı mod: soru başına 90 saniye.**

&#x20; **- Tam mock exam: 2 oturum × 90 soru, oturum başına 2 saat 15 dakika, konu ağırlıklarına**

&#x20;   **uygun dağılım. Sonunda konu bazlı skor ve zayıf alan raporu.**



**- Aralıklı tekrar (FSRS veya SM-2)**

&#x20; **- Yanlış yaptığım sorular ve kelimeler için.**

&#x20; **- Günlük hedef ve "bugün tekrar edilecekler" ekranı.**



**- Konu anlatımı ekranı**

&#x20; **- LOS listesi ve "okundu" işaretleme.**

&#x20; **- Her bölümün sonunda 2-3 mini kontrol sorusu.**



**- Formül kartları ve BA II Plus rehberi**

&#x20; **- Özgün bir L1 formül özeti.**

&#x20; **- BA II Plus kullanım rehberi: TVM, CF/NPV/IRR, istatistik, amortisman ve tahvil**

&#x20;   **fonksiyonları.**



**- İstatistik paneli**

&#x20; **- Konu bazlı doğruluk oranı ve ortalama cevaplama süresi.**

&#x20; **- Konu ağırlıklarıyla hesaplanmış tahmini hazırlık skoru.**

&#x20; **- Sınava kalan gün sayacı ve günlük çalışma planı.**



**- "SPK köprüsü" etiketi**

&#x20; **- Düzey 3'ten bildiğim konular işaretlenecek, böylece oralara daha az süre ayıracağım.**



**- Sınav bilgisi bölümü**

&#x20; **- RESEARCH.md'nin uygulama içi Türkçe özeti: ücretler, tarihler, kurallar, kaynak**

&#x20;   **linkleri ve "son doğrulama tarihi".**



**- Kullanım kolaylığı**

&#x20; **- Karanlık mod, büyük font seçeneği, tek elle kullanılabilir arayüz.**



**- Kelime defteri dışa aktarma**

&#x20; **- JSON ve CSV formatında; alanlar: term\_en, tr, example\_en, example\_tr, topic.**

&#x20; **- Bu dosyayı Telegram kelime botuma besleyeceğim.**



**Olursa güzel olur:**

**- Günün sorusu ve çalışma serisi (streak).**

**- 5 dakikalık kısa "otobüs modu".**

**- Anlatımları İngilizce TTS ile dinleme modu.**



**## 7. HEDEFLER (Definition of Done — "mükemmel" bu ölçülere göre tanımlanır)**



**Milestone A (MVP, erken çıkar)**

**- L1'in 10 konusunun hepsi için temel anlatım.**

**- En az 400 doğrulanmış soru ve 500 kelime.**

**- Flip kart, kelime popup'ı, quiz ve aralıklı tekrar çalışıyor.**

**- Uygulama telefonumda açılıyor.**



**Milestone B**

**- L1'in tüm LOS'ları için anlatım.**

**- En az 1.800 doğrulanmış soru (her LOS için en az 5).**

**- 180'er soruluk 2 özgün mock exam.**

**- En az 1.500 kelime ve soru kalıpları modülü.**

**- Etik vaka modülü tamamlanmış.**



**Milestone C**

**- L1 için en az 3.000 soru ve 4 mock exam.**

**- L2 iskeleti ve vignette (item set) formatında ilk 300 soru.**

**- L3 iskeleti.**



**Kaynak hedefi**

**- SOURCES.md'de en az 80 değerlendirilmiş kaynak.**

**- Her konu için en az 3 güvenilir referans.**



**Takip kuralları**

**- Her milestone sonunda PROGRESS.md'ye metrik tablosu yaz: konu, soru sayısı,**

&#x20; **doğrulanmış oran, kelime sayısı.**

**- Bir milestone bitince durma, sıradakine geç.**



**## 8. KALİTE VE TEST**

**- Unit testler: aralıklı tekrar algoritması, skor hesaplama, mock dağılımı, içerik şema**

&#x20; **validasyonu (zod), glossary lint.**

**- `npm run validate-content` komutu tüm JSON dosyalarını şemaya ve kurallara göre**

&#x20; **kontrol etsin. GitHub Actions bunu her push'ta çalıştırsın.**

**- 50 soruluk rastgele bir örneklemi kendin çözüp hata oranını raporla.**

**- Web build'ini mobil viewport'ta açıp ekran görüntüsü al. Flip animasyonunu, LaTeX**

&#x20; **render'ını ve kelime popup'ını görsel olarak kontrol et.**



**## 9. TESLİM — bitince docs/FINAL\_REPORT.md'yi yaz ve son mesajında özetle**

**1. Ne yapıldı: özet ve metrik tablosu.**

**2. Telefonumda nasıl açarım: Expo Go adımları ve PWA kurulumu, iPhone ve Android için**

&#x20;  **ayrı ayrı.**

**3. Sorun çıkabilecek noktalar: içerik doğruluğu riski yüksek konular ve teknik açıdan**

&#x20;  **kırılgan yerler.**

**4. Gerçek test checklist'i: bu riskli noktaları elle nasıl kontrol edeceğim, madde madde.**

**5. Sınav lojistiği özeti: güncel maliyet (USD ve TL), önerdiğin sınav penceresi ve kayıt**

&#x20;  **son tarihi.**

**6. İçerik genişletmeye nasıl devam ederim: tek komutla "devam et" akışı.**





**## 10. OTOMATİK DEVAM DÖNGÜSÜ**

**- Bu proje bir döngü script'iyle çalışıyor. Kullanım limitin dolduğunda ya da**

&#x20; **oturum bittiğinde script seni otomatik olarak yeniden başlatacak.**

**- Her yeni başlangıçta önce PROGRESS.md'yi ve DECISIONS.md'yi oku, sonra**

&#x20; **kaldığın yerden devam et. Yaptığın bir işi tekrar yapma.**

**- Limit her an gelebilir, bu yüzden işi küçük parçalara böl:**

&#x20; **- Her parça bitince commit at ve PROGRESS.md'yi güncelle.**

&#x20; **- PROGRESS.md'nin en üstünde her zaman bir "SIRADAKİ ADIM:" satırı olsun.**

**- Yarım kalan bir içerik paketi verified:false olarak kalsın; sonraki oturum onu**

&#x20; **tamamlar.**

**- Milestone C tamamlanıp FINAL\_REPORT.md yazıldığında proje köküne DONE adında**

&#x20; **boş bir dosya oluştur. Döngü bu dosyayı görünce durur. Bu dosyayı başka hiçbir**

&#x20; **koşulda oluşturma.**

**Başla: önce Faz 0. Bana soru sorma.**

