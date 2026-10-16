# FINAL_REPORT — CFA Hazırlık (EN/TR)

Durum tarihi: 2026-10-16 · Kapsam: **Milestone A ve B tamam, Milestone C başlamadı** (bu yüzden `DONE` dosyası oluşturulmadı).
Canlı uygulama: **https://bilaly71-cmd.github.io/cfa-hazirlik/** · Kaynak: https://github.com/bilaly71-cmd/cfa-hazirlik

## 1. Ne yapıldı

| Konu | Soru | Doğrulanmış | Ders | LOS (≥5 soru) | Kelime |
|---|---|---|---|---|---|
| Quant (QM) | 167 | 167 | 11/11 | 30/30 | 191 |
| Ekonomi (ECO) | 150 | 150 | 8/8 | 30/30 | 94 |
| Kurumsal Finansman (CI) | 154 | 154 | 7/7 | 22/22 | 51 |
| Finansal Tablolar (FSA) | 292 | 292 | 12/12 | 53/53 | 302 |
| Hisse (EQ) | 192 | 192 | 12/12 | 37/37 | 222 |
| Sabit Getirili (FI) | 265 | 265 | 19/19 | 51/51 | 298 |
| Türevler (DER) | 110 | 110 | 10/10 | 22/22 | 162 |
| Alternatifler (AI) | 132 | 132 | 7/7 | 22/22 | 126 |
| Portföy (PM) | 201 | 201 | 6/6 | 40/40 | 82 |
| Etik (ETH) | 167 | 167 | 10/10 | 33/33 | 129 |
| **Toplam** | **1.830** | **1.830** | **102/102** | **340/340** | **2.549 (1.775 doğrulanmış)** |

Diğer: 219 formül kartı, 19 hesap makinesi rehberi (BA II Plus + HP 12C), 19 CFA soru kalıbı (+ alıştırmalar), 44 etik vakası (22 alt standart × 2). Müfredat: CFA Institute'un 2027 L1 taslağına göre 102 modül / 340 LOS (LOS'lar kendi cümlelerimizle özetlendi).
Araştırma: `docs/RESEARCH.md`, `docs/SOURCES.md` (182 tekil kaynak), `docs/CFA_REHBERI_TR.md`, `docs/KESIFLER.md`.

Hedef karşılaştırması: **Milestone A** ✓ (≥400 soru, ≥500 kelime, flip kart/popup/quiz/SRS çalışıyor). **Milestone B** ✓ soru/LOS/kelime/etik/kalıp hedefleri; mock sınavlar uygulamada soru havuzundan 2×90 dinamik üretiliyor (ayrı sabit "2 özgün mock" yok). **Milestone C** ✗ (3.000 soru, 4 mock, L2 vignette soruları, L3 iskeleti). L2/L3 için yalnızca modül düzeyinde iskelet (`content/syllabus/L2.json`, `L3.json`) var.

Kalite süreci: her paket, içeriği üreten ajandan bağımsız bir denetçi ajan tarafından kontrol edildi (anahtara bakmadan çözüm, Python ile sayısal yeniden hesap, iki dil kontrolü, iç kopya taraması). Denetçiler gerçek hatalar yakaladı (ör. DER-07 swap faizi, FI-06 fiyat, FI-13 callable konveksite, PM-04 şık, ECO-05 var olmayan kurum, CI/ETH Handbook'a benzeyen 8 senaryo). **50 soruluk bağımsız örnekleme: 0/50 hata** (`reports/error_sample.md`); bu, gerçek oranın %95 güvenle ~%5,8'in altında olduğunu söyler, sıfır olduğunu kanıtlamaz.
Otomasyon: 506 sayısal soru Python ile yeniden hesaplandı (0 hata), 23 birim testi, `npm run validate-content` (zod şeması + glossary lint + vocab/LOS çapraz kontrol), GitHub Actions her push'ta çalışır.

## 2. Telefonunda nasıl açarsın
**PWA (önerilen, mağazasız, internetsiz çalışır):** https://bilaly71-cmd.github.io/cfa-hazirlik/
- **Android (Chrome):** adresi aç → ⋮ menüsü → "Ana ekrana ekle" / "Uygulamayı yükle". İlk açılıştan sonra çevrimdışı çalışır.
- **iPhone (Safari):** adresi aç → Paylaş → "Ana Ekrana Ekle". (iPhone'da yalnızca Safari ana ekrana ekleyebilir.)
- İlerleme yalnızca o cihazda saklanır (sunucu yok). Aynı verinin başka cihaza taşınması yok; "İlerlemeyi sıfırla" Ayarlar'da.
**Expo Go (geliştirme):** PC'de `npm install` → `npx expo start` → telefonda Expo Go ile QR kodu okut (aynı Wi-Fi). Native tarafta formüller WebView'da KaTeX ile render edilir; bu yol web kadar test edilmedi.

## 3. Sorun çıkabilecek noktalar
**İçerik doğruluğu riski yüksek konular:**
- Etik: vaka sorularında "tek savunulabilir cevap" yargısı; Standartların ince ayrımları. 8 senaryo Handbook benzerliği nedeniyle yeniden yazıldı; tam telif güvencesi yok (aşağıya bak).
- Türkiye olguları (SPK/TCMB/TSRS/BIST kuralları): bilerek genel tutuldu; kesin tarih/oran iddiası verilen yerleri kaynak doğrulamasından geçir. SPK–CFA denklik "fark konuları" listesi yayımlanmamış (UNVERIFIED).
- Türevler/Sabit Getirili/FSA: çok adımlı hesaplar ve IFRS–US GAAP farkları (bağımsız çözüm + Python ile doğrulandı ama gerçek sınavdaki varsayım farkları olabilir).
- BA II Plus tuş dizileri hafızadan yazıldı, **gerçek cihazda denenmedi**; tümü AOS modunu varsayar (cihazın Chn modunda a×b+c×d dizileri farklı sonuç verir). 3 rehber (yüzde değişim, ağırlıklı ortalama, HP 12C tahvil) doğrulanamadığı için uygulamada gizli.
- Ücret/tarih verisi (examinfo): 2026-10-15'te derlendi; resmi "Dates & Fees" tablosu etkileşimli olduğu için bazı değerler resmi toplamlar + bağımsız kaynaklarla çapraz teyit edildi. Ağustos 2027 erken/standart tarihleri ve Kasım 2027 UNVERIFIED.
**Teknik kırılgan yerler:**
- Özgünlük (n-gram) taraması bu depoda **referanssız** çalışıyor (sağlayıcı metni kaydetmediğimiz için): gerçek koruma iç kopya taraması + denetçilerin elle okuması + yeniden yazımlar. Sağlayıcı kalıbı bilen biri kontrol etmeli.
- Native (Expo Go) akışı ve KaTeX WebView'ı; web/PWA dışında sınırlı test.
- Kelime defteri JSON/CSV dışa aktarma: webde indirme, native'de paylaşım menüsü; native'de denenmedi.
- Kota nedeniyle birkaç kez kesilen ajan çıktıları sonradan yeniden üretilip denetlendi; ~60 kelime kimliği iki dosyada tanımlı (ilki kullanılır).
- Repo public (Pages için); içerik özgün ama herkese açık.

## 4. Gerçek test checklist'i (elle)
1. PWA'yı telefona ekle, uçak modunda aç → "Bugün" ekranı geliyor mu?
2. Ayarlar → Türkçe destek 3/2/1/0 değiştir; bir soruda her seviyede metin/flip kart/popup doğru mu?
3. Bir sorudaki kelimeye dokun → popup (anlam, okunuş, ses, ekle); defterden JSON/CSV indir, Telegram botuna yükle.
4. 10 sayısal soru çöz; BA II Plus tuşlarını **kendi cihazında** dene (özellikle CF/NPV/IRR, STAT, BOND, AMORT); tutmayanları not al.
5. Formül kartlarında ∑/kesir/üs gösterimi doğru mu (küçük ekranda yatay kaydırma)?
6. Zamanlı mod: 90 sn sayacı; mock: oturum sayacı/gezinme/işaretleme; sonda konu bazlı rapor.
7. Aralıklı tekrar: bir soruyu yanlış yap → ertesi gün "Tekrar" listesinde mi?
8. Etik vakalarından 5'ini oku: analiz sana da savunulabilir mi? Standart numaraları doğru mu?
9. Sınav bilgisi ekranındaki ücret/tarihleri resmi cfainstitute.org sayfasıyla karşılaştır.
10. Karanlık mod, büyük yazı boyutu, tek elle kullanım.

## 5. Sınav lojistiği özeti (2026-10-15 verisi; ayrıntı: uygulamada "Sınav bilgisi", `docs/CFA_REHBERI_TR.md`)
- **Ücret (TCMB satış kuru 49,4204):** L1 erken **1.140 USD ≈ 56.339 TL**, standart **1.490 USD ≈ 73.636 TL**; tek seferlik 350 USD kayıt ücreti Nisan 2025'te kaldırıldı; randevu değişikliği 250 USD; Practice Pack 299 USD.
- **Pencereler (2027, L1):** Şubat 22–28 Şub (son kayıt 5 Kas 2026) · Mayıs 11–17 May (standart son 10 Şub 2027) · **Ağustos 15–22 Ağu** (kayıt 3 Kas 2026'da açılıyor; standart son 29 Nis 2027 — UNVERIFIED) · Kasım 13–19 Kas. 2027 müfredatı Şubat 2027 penceresinden itibaren.
- **Öneri:** Ağustos 2027 penceresi (yedek: Kasım 2027): ~400–450 saat (300–330 saat CFA içeriği + 80–120 saat finans İngilizcesi), haftada ~10–11 saat. Erken kayıt avantajı için Ocak 2027 civarını takip et; Access burs başvurusu 3–23 Kas 2026 (Ağustos 2027 için).
- **Türkiye:** merkezler İstanbul/Ankara/İzmir (Prometric). SPK: CFA lisansın yerine otomatik geçmez; Tebliğ VII-128.7 denklik yolu var, fark sınavı gerekir.
- **Geçme oranları:** 10 yıllık resmi ortalama L1 ~%40; topluluk deneyimine göre mock'larda istikrarlı %70+ "yolunda" (resmi eşik değil).

## 6. İçerik genişletmeye devam
- Tek komutla: proje klasöründe `claude -p "PROGRESS.md'yi oku, PROMPT.md'deki görevi kaldığın yerden sürdür. Bana soru sorma."` ya da `devam.ps1` (limit dolunca kendini yeniden başlatır; Fable 5.1 ile ayarlı).
- Kurallar: `docs/CONTENT_SPEC.md` (üretici), `docs/GEN_PROMPT.md`, `docs/REVIEW_SPEC.md` (denetçi). Hat: üret → `npm run validate-content` + `python scripts/verify_numeric.py` → bağımsız denetçi → `npm run build-content` → push (CI siteyi günceller).
- Sıradaki: Milestone C (≥3.000 soru, 4 mock, L2 vignette ilk 300 soru, L3 iskelet); çalışılmayan 4 öneri (FSA-12-a-q03, FI-04-b-q03, ECO-04-d-q01, ETH-06-c-q01 netleştirmeleri); BA II Plus tuşlarının cihazda doğrulanması.
