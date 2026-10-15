# C — Müfredat Araştırması (CFA Level I, 2027)

> Hazırlayan: Faz 0 araştırma ajanı C · Erişim tarihi: 2026-10-15
> Kapsam: Level I konularının kritik formülleri, sık yapılan hatalar, tipik soru tuzakları, sınavda nasıl ölçüldüğü (yalnızca meta düzey) ve 2027 müfredat değişiklikleri.
> Telif notu: Bu belgede CFA Institute müfredat metni, resmi örnek/deneme soruları veya hazırlık kurumlarının (Kaplan Schweser, Wiley, AnalystPrep, UWorld, IFT) metin ya da soruları **kopyalanmamıştır**. Formüller finansın genel bilgisi olup kendi gösterimimizle yazılmıştır; hata/tuzak listeleri kendi değerlendirmemizdir. Gerçek sınav sorusu hatırlatması ("brain dump") toplanmamıştır.

İlgili dosyalar: `content/syllabus/L1.json` (102 modül / 340 LOS, kendi cümlelerimizle), `L2.json` (51 modül), `L3.json` (çekirdek 28 modül + 3 uzmanlık yolu).

---

## 0. Hangi müfredat? (karar)

- CFA Institute'un Level I sayfasında hem **2026** hem **2027** konu taslağı (topic outline) ve ağırlık tablosu yayımlanmış durumda. Uygulama **2027 müfredatını** esas alır (`curriculum_year: 2027`).
- 2027 müfredatının **hangi sınav penceresinden itibaren** geçerli olduğu resmi Level I sayfasında açıkça yazmıyor. İkincil kaynaklar (AnalystPrep, Top-Finance, soleadea) **Şubat 2027 Level I penceresini** ilk 2027 penceresi olarak gösteriyor; Ağustos ve Kasım 2026 pencereleri 2026 müfredatıyla yapılıyor. → **UNVERIFIED (resmi teyit yok)**. Uygulamada kullanıcıya sınav tarihini sorup 2026/2027 seçimini buna göre yapmak doğru olur.
- Şubat 2027 Level I penceresi ikincil kaynaklara göre 22–28 Şubat 2027 (UNVERIFIED).

## 1. Sınav biçimi (meta)

Kaynak: CFA Institute Level I ve Exam sayfaları (2026-10-15).

- 180 çoktan seçmeli soru, her biri 135 dakikalık iki oturum. Her soruda **üç seçenek** (A/B/C).
- Soru kökü ya cümle tamamlama ya doğrudan soru biçimindedir; "hariç / değildir / doğru / yanlış" gibi olumsuz kökler kullanılmaz, bunun yerine "en olası (most likely)", "en iyi tanımlanan (best described)" gibi niteleyiciler kullanılır. Her kök tek bir soruyu destekler (Level I'de vaka/vignette yok).
- "Hepsi / hiçbiri / belirlenemez" seçenekleri hiç yoktur. Sözel seçenekler kısadan uzuna, sayısal seçenekler küçükten büyüğe sıralanır.
- Tüm sorular eşit ağırlıklıdır, **yanlış cevap puan götürmez** → boş bırakmak hiçbir zaman mantıklı değildir.
- Hesap makinesi: yalnızca TI BA II Plus (Professional dahil) veya HP 12C.
- Level II: vaka (vignette) destekli çoktan seçmeli; Level III: vaka destekli kompozisyon + çoktan seçmeli, adayın seçtiği uzmanlık yolu ile.

**Uygulama tasarımına etkisi:** soru üretiminde 3 seçenek, olumsuz kök yok, "most likely/best" niteleyicisi, seçenekler sıralı, "hepsi/hiçbiri" yok. Sayısal çeldiriciler tipik hatalardan türetilmeli (aşağıdaki "tuzak" listeleri bunun için).

### Konu ağırlıkları → yaklaşık soru sayısı (180 soru üzerinden)

| Konu (2027 adı) | 2026 ağırlık | 2027 ağırlık | ≈ Soru (2027) |
|---|---|---|---|
| Etik ve Mesleki Standartlar | %15–20 | **%10–15** | 18–27 |
| Kantitatif Yöntemler | %6–9 | **%11–14** | 20–25 |
| İktisat | %6–9 | %6–9 | 11–16 |
| Finansal Tablo Analizi | %11–14 | %11–14 | 20–25 |
| Kurumsal Finansman (eski: Corporate Issuers) | %6–9 | %6–9 | 11–16 |
| Pay Senetleri (eski: Equity Investments) | %11–14 | %11–14 | 20–25 |
| Sabit Getirili | %11–14 | %11–14 | 20–25 |
| Türev Araçlar ve Risk Yönetimi (eski: Derivatives) | %5–8 | **%6–9** | 11–16 |
| Alternatif Yatırımlar | %7–10 | **%6–9** | 11–16 |
| Portföy Oluşturma (eski: Portfolio Management) | %8–12 | %8–12 | 14–22 |

Kaynak: CFA Institute Level I sayfası (iki tablo yan yana), erişim 2026-10-15. Soru sayıları basit çarpımdır (180 × ağırlık), resmi değildir.

---

## 2. Konu konu analiz

Her konu için: **(a) kritik formüller**, **(b) sık yapılan hatalar**, **(c) tipik soru tuzakları**, **(d) nasıl ölçülür (meta)**.

### 2.1 Kantitatif Yöntemler (QM) — %11–14, 11 modül / 30 LOS

**(a) Kritik formüller**

- Elde tutma dönemi getirisi: $HPR = \dfrac{P_1 - P_0 + D_1}{P_0}$
- Geometrik ortalama: $\bar R_G = \left[\prod_{t=1}^{T}(1+R_t)\right]^{1/T} - 1$ ; harmonik ortalama: $\bar X_H = \dfrac{n}{\sum 1/X_i}$ (ortalama maliyet / TL bazlı düzenli alım)
- Yıllıklandırma: $r_{yıllık} = (1+r_{dönem})^{c} - 1$ ( $c$ = yıldaki dönem sayısı)
- Sürekli bileşik getiri: $r_{cc} = \ln(1+HPR)$ ; çok dönem için toplanabilir: $r_{cc,0\to T} = \sum r_{cc,t}$
- Reel getiri: $1+r_{reel} = \dfrac{1+r_{nominal}}{1+\pi}$
- Para ağırlıklı getiri (MWR) = nakit akışlarının İVO'su: $\sum_t \dfrac{CF_t}{(1+MWR)^t} = 0$ ; zaman ağırlıklı getiri: $TWR = \left[\prod(1+HPR_i)\right]^{1/n} - 1$
- Fiyat ağırlıklı endeks: $V = \dfrac{\sum P_i}{D}$ ; piyasa değeri ağırlıklı: $w_i = \dfrac{Q_iP_i}{\sum Q_jP_j}$
- Bugünkü değer / sürekli bileşik: $PV = \dfrac{FV}{(1+r)^N}$, $PV = FV\,e^{-rN}$ ; sınırsız ödeme (perpetuity): $PV = \dfrac{A}{r}$
- Zımni forward faiz: $(1+S_2)^2 = (1+S_1)(1+f_{1,1})$ ; forward kur: $F = S\,\dfrac{1+i_{fiyat}}{1+i_{baz}}$
- Örnek varyans/standart sapma: $s^2 = \dfrac{\sum (X_i-\bar X)^2}{n-1}$ ; değişim katsayısı $CV = s/\bar X$
- Hedef yarı sapma: $s_{hedef} = \sqrt{\dfrac{\sum_{X_i \le B}(X_i - B)^2}{n-1}}$
- Kovaryans/korelasyon: $\rho_{XY} = \dfrac{Cov(X,Y)}{s_X s_Y}$
- Bayes: $P(A\mid B) = \dfrac{P(B\mid A)\,P(A)}{P(B)}$ ; toplam olasılık: $P(B) = \sum_i P(B\mid A_i)P(A_i)$
- Standart hata: $s_{\bar X} = s/\sqrt{n}$ ; güven aralığı: $\bar X \pm z_{\alpha/2}\,s/\sqrt n$ (küçük örnek / bilinmeyen σ → $t$)
- Test istatistiği: $t = \dfrac{\bar X - \mu_0}{s/\sqrt n}$ ; korelasyon testi: $t = \dfrac{r\sqrt{n-2}}{\sqrt{1-r^2}}$
- İki varlıklı portföy: $\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho_{12}\sigma_1\sigma_2$
- Basit regresyon: $\hat b_1 = \dfrac{Cov(X,Y)}{Var(X)}$, $\hat b_0 = \bar Y - \hat b_1 \bar X$ ; $R^2 = \dfrac{SSR}{SST}$ ; $F = \dfrac{MSR}{MSE}$ ; $SEE = \sqrt{MSE} = \sqrt{\dfrac{SSE}{n-2}}$ ; eğim testi $t = \dfrac{\hat b_1 - B_1}{s_{\hat b_1}}$
- CAPM regresyonu: $R_i - R_f = \alpha_i + \beta_i (R_m - R_f) + \varepsilon$

**(b) Sık yapılan hatalar**
- Örnek varyansında $n$ yerine $n-1$ kullanmamak (ya da tersi: anakütle sorusunda $n-1$).
- MWR ile TWR'yi karıştırmak: yöneticinin kontrolü dışındaki para giriş-çıkışı varsa yönetici performansı için TWR doğrudur.
- Geometrik ortalamayı çok dönemli "beklenen tek dönem getirisi" olarak kullanmak (tek dönem beklentisi için aritmetik).
- Sürekli bileşik getiriyi doğrudan çarpmak / HPR'leri toplamak (log getiriler toplanır, HPR'ler çarpılır).
- Bayes'te paydadaki toplam olasılığı eksik hesaplamak.
- I. tip hata ($\alpha$, doğru $H_0$'ı reddetme) ile II. tip hatayı ($\beta$) karıştırmak; testin gücü $= 1-\beta$.
- Tek kuyruk/çift kuyruk kritik değerini karıştırmak.
- $R^2$'yi korelasyonun kendisi sanmak (basit regresyonda $R^2 = r^2$).

**(c) Tipik soru tuzakları**
- Para ağırlıklı getiri sorusunda dönem başı/sonu nakit akışı işaretlerinin (yatırımcı açısından) ters girilmesi.
- Yıllıklandırmada 52 hafta / 365 gün / 12 ay farkı.
- Hipotez testinde "reddedemedik" ile "kabul ettik" ifadeleri; p-değeri < α ise ret.
- Parametrik olmayan test ne zaman? (aykırı değer, sıralı veri, normal dağılım varsayımı sağlanmıyor).
- Lognormal dağılımın fiyatlar, normal dağılımın (log) getiriler için kullanılması.
- Simülasyon yöntemleri: tarihsel simülasyon geçmişte olmayan senaryoyu üretemez; bootstrap yine geçmiş veriden yeniden örnekler; Monte Carlo varsayılan dağılıma bağımlıdır.

**(d) Nasıl ölçülür (meta)**
- Ağırlık 2027'de neredeyse iki katına çıktı; hesap ağırlıklı (LOS'ların ~%73'ü hesap gerektiriyor). Hesap makinesi akıcılığı (TVM, CF/NPV/IRR, istatistik modu) belirleyici.
- Yeni modüller (simülasyon, finansal veri bilimi) büyük ihtimalle kavramsal "hangisi en uygundur" sorularıyla ölçülür.
- Portföy matematiği hem QM-08'de hem Portföy Oluşturma'da var → çapraz konu sorusu ihtimali yüksek.

### 2.2 İktisat (ECO) — %6–9, 8 modül / 30 LOS

**(a) Kritik formüller**
- Kâr maksimizasyonu: $MR = MC$ ; tam rekabette $P = MR = MC$
- Başabaş: $P = ATC$ ; kısa dönem faaliyet durdurma: $P < AVC$ ; uzun dönem çıkış: $P < ATC$
- Herfindahl-Hirschman endeksi: $HHI = \sum_{i=1}^{N} s_i^2$ ; N-firma yoğunlaşma oranı $=\sum_{i=1}^{N} s_i$
- Talep esnekliği: $\varepsilon = \dfrac{\%\Delta Q}{\%\Delta P}$ ; monopol fiyatlaması $P\left(1 - \dfrac{1}{|\varepsilon|}\right) = MC$
- Çapraz kur: $\dfrac{A}{C} = \dfrac{A}{B}\times\dfrac{B}{C}$ (kotasyon yönüne dikkat)
- Karşılanmış faiz paritesi: $F_{f/d} = S_{f/d}\,\dfrac{1 + i_f\,\frac{gün}{360}}{1 + i_d\,\frac{gün}{360}}$ ; forward puanı $= (F - S)\times 10^4$
- Kurun yüzde değişimi: baz para birimi için $\dfrac{S_1}{S_0} - 1$; fiyat para birimi için $\dfrac{S_0}{S_1} - 1$
- Reel kur: $q_{d/f} = S_{d/f}\,\dfrac{P_f}{P_d}$
- (Maliye) Harcama çarpanı: $\dfrac{1}{1 - c(1-t)}$ ; denk bütçe çarpanı = 1 (kavramsal)

**(b) Sık yapılan hatalar**
- Kur kotasyonunda baz/fiyat para birimini ters okumak (A/B = 1 birim B'nin A cinsinden fiyatı mı, değil mi — CFA gösteriminde "fiyat/baz").
- Bir para biriminin değer kazanma yüzdesini diğerinin değer kaybıyla aynı sanmak (simetrik değil).
- Kırık talep eğrisi, baskın firma, Cournot ve Stackelberg modellerinin sonuçlarını karıştırmak.
- Monopolcü rekabette uzun dönemde ekonomik kârın sıfıra indiğini unutmak.
- Öncü/eşanlı/gecikmeli göstergeleri karıştırmak.

**(c) Tipik soru tuzakları**
- "Faaliyeti sürdürmeli mi?" sorusunda sabit maliyetlerin kısa dönemde batık sayılması.
- HHI'yi yüzde (×100) mi ondalık mı alındığına dikkat.
- Forward primi/iskontosunun hangi para birimine ait olduğu.
- Genişletici para + daraltıcı maliye bileşiminin faiz ve büyümeye etkisi gibi politika bileşimi tabloları.
- Jeopolitik risk türleri (olay, egzojen, tematik) ve araçların (ulusal güvenlik, ekonomik, finansal) eşleştirilmesi.

**(d) Nasıl ölçülür (meta)**
- Çoğunlukla kavramsal; hesap ağırlığı döviz hesaplamaları ve piyasa yapısı (başabaş/HHI) ile sınırlı. 2027'de içerik 2026 ile aynı.

### 2.3 Kurumsal Finansman (CI) — %6–9, 7 modül / 22 LOS

**(a) Kritik formüller**
- Nakit dönüşüm süresi: $CCC = DIO + DSO - DPO$ ; $DIO = \dfrac{365}{\text{Stok devir hızı}}$, $DSO = \dfrac{365}{\text{Alacak devir hızı}}$, $DPO = \dfrac{365}{\text{Borç devir hızı}}$
- Ticari kredinin (iskontodan vazgeçmenin) maliyeti: $\left(1 + \dfrac{d}{1-d}\right)^{365/(N - N_d)} - 1$
- NBD: $NPV = \sum_{t=0}^{N} \dfrac{CF_t}{(1+r)^t}$ ; İVO: $NPV(IRR)=0$
- Yatırılan sermaye getirisi: $ROIC = \dfrac{NOPAT}{\text{Ortalama yatırılan sermaye}}$, $NOPAT = EBIT(1-t)$
- AOSM: $WACC = w_d\,r_d(1-t) + w_p\,r_p + w_e\,r_e$
- MM (vergili): $V_L = V_U + tD$ ; MM II (vergili): $r_e = r_0 + (r_0 - r_d)(1-t)\dfrac{D}{E}$ ; vergisiz: $r_e = r_0 + (r_0 - r_d)\dfrac{D}{E}$

**(b) Sık yapılan hatalar**
- AOSM'de borç maliyetini vergi düzeltmesiz kullanmak; defter değeri yerine piyasa değeri ağırlıkları kullanılmalı.
- NBD ile İVO çeliştiğinde İVO'yu seçmek (karşılıklı dışlayan projelerde NBD esastır; İVO yeniden yatırımı İVO'dan varsayar).
- Batık maliyeti / finansman maliyetini proje nakit akışına katmak (finansman iskonto oranında yer alır).
- MM önermelerinin varsayımlarını (vergi yok, iflas maliyeti yok, simetrik bilgi) unutmak.

**(c) Tipik soru tuzakları**
- Alacaklı ile pay sahibinin getiri profili asimetrisi: pay sahibi riskli projeyi sever (opsiyon benzeri getiri).
- Paydaş çatışması türleri: pay sahibi–yönetici, hâkim–azınlık pay sahibi, pay sahibi–alacaklı.
- Reel opsiyon türleri (zamanlama, ölçek/büyütme-küçültme, esneklik, temel) eşleştirmesi.
- Likiditenin birincil ve ikincil kaynakları; "baskı/çekiş" (drag/pull) kavramları.

**(d) Nasıl ölçülür (meta)**
- Kavramsal ağırlıklı, az sayıda hesap (CCC, NBD/İVO, AOSM, MM). İçerik 2026 ile aynı; yalnızca konu adı değişti.

### 2.4 Finansal Tablo Analizi (FSA) — %11–14, 12 modül / 53 LOS

**(a) Kritik formüller**
- Adi pay başına kazanç: $EPS = \dfrac{NI - \text{İmtiyazlı temettü}}{\text{Ağırlıklı ortalama pay sayısı}}$
- Sulandırılmış PBK (if-converted + hazine payı yöntemi): $\dfrac{NI - \text{İmt. temettü} + \text{Dönüşebilir imt. temettü} + \text{Dönüşebilir borç faizi}(1-t)}{WASO + \text{dönüşümden yeni paylar} + \text{opsiyonlardan net yeni paylar}}$ ; hazine payı yöntemi net pay: $n - \dfrac{n \cdot K}{\bar P}$ (yalnız $K < \bar P$ ise sulandırıcı)
- Dolaylı yöntemle işletme nakit akışı: $CFO = NI + \text{nakit dışı giderler} - \text{kazançlar} + \text{kayıplar} - \Delta\text{İşletme varlıkları} + \Delta\text{İşletme yükümlülükleri}$
- $FCFF = CFO + Int(1-t) - FCInv$ ; $FCFE = CFO - FCInv + \text{Net borçlanma}$
- Stok: $COGS = BS + Alışlar - KS$ ; $\text{Stok}_{FIFO} = \text{Stok}_{LIFO} + \text{LIFO rezervi}$ ; $COGS_{FIFO} = COGS_{LIFO} - \Delta \text{LIFO rezervi}$
- Ortalama yaş $= \dfrac{\text{Birikmiş amortisman}}{\text{Amortisman gideri}}$ ; kalan ömür $= \dfrac{\text{Net MDV}}{\text{Amortisman gideri}}$ ; toplam ömür $= \dfrac{\text{Brüt MDV}}{\text{Amortisman gideri}}$
- Vergi gideri $= \text{Ödenecek vergi} + \Delta DTL - \Delta DTA$ ; efektif vergi oranı $= \dfrac{\text{Vergi gideri}}{\text{Vergi öncesi kâr}}$
- DuPont (3'lü): $ROE = \dfrac{NI}{Satış}\times\dfrac{Satış}{TA}\times\dfrac{TA}{E}$ ; (5'li): $ROE = \dfrac{NI}{EBT}\times\dfrac{EBT}{EBIT}\times\dfrac{EBIT}{Satış}\times\dfrac{Satış}{TA}\times\dfrac{TA}{E}$
- Likidite: cari oran $=\dfrac{DV}{KVY}$, asit-test $=\dfrac{Nakit+KV yatırımlar+Alacaklar}{KVY}$ ; faiz karşılama $=\dfrac{EBIT}{Faiz}$

**(b) Sık yapılan hatalar**
- Dolaylı yöntemde işletme sermayesi değişimlerinin işaretini ters almak (varlık artışı → nakit azalışı).
- UFRS/US GAAP sınıflandırma farkı: US GAAP'te ödenen faiz ve alınan temettü/faiz CFO; ödenen temettü CFF. UFRS'de seçenek var.
- Sulandırma karşıtı (antidilutive) menkul kıymeti sulandırılmış PBK'ya katmak.
- Enflasyonist ortamda LIFO'nun daha düşük kâr, daha düşük vergi, daha yüksek CFO; FIFO'nun daha gerçekçi bilanço verdiğini karıştırmak.
- Ertelenmiş vergide geçici fark ile kalıcı farkı karıştırmak (kalıcı fark ETR'yi yasal orandan saptırır, DTL/DTA yaratmaz).
- Değer düşüklüğü testinin UFRS (tek adım, geri kazanılabilir tutar) ve US GAAP (iki adım, geri dönüş yok) farkı.

**(c) Tipik soru tuzakları**
- "Kazanç kalitesi düşüklüğünün en olası işareti" tipi: CFO'nun net kârın sürekli altında kalması, alacak devir süresinin uzaması, tekrarlanmayan kalemlerin sürekli tekrarı.
- Aktifleştirme vs giderleştirme: aktifleştirme ilk yıllarda kârı ve CFO'yu artırır, CFI'yı azaltır.
- Kiralama: kiracıda UFRS 16 tek model; US GAAP'te finansal/faaliyet kiralaması ayrımı gelir tablosu etkisini değiştirir.
- Stokta değer düşüklüğü iptali UFRS'de mümkün, US GAAP'te (LIFO/perakende dışında) değil.
- Ortak büyüklük tablolarda payda (satışlar mı, toplam varlık mı) seçimi.

**(d) Nasıl ölçülür (meta)**
- En geniş LOS'lu konu (53). Hem hesap (PBK, CFO, stok, vergi, oranlar) hem kavramsal (UFRS–US GAAP farkları, raporlama kalitesi) sorular. İçerik 2026 ile aynı.

### 2.5 Pay Senetleri (EQ) — %11–14, 12 modül / 37 LOS

**(a) Kritik formüller**
- Toplam getiri: $R = \dfrac{P_1 - P_0 + D_1}{P_0}$ ; fiyat getirisi: $\dfrac{P_1 - P_0}{P_0}$
- Sabit büyüme (Gordon): $V_0 = \dfrac{D_1}{r - g} = \dfrac{D_0(1+g)}{r-g}$ ; sürdürülebilir büyüme $g = b \times ROE$
- Çok aşamalı: $V_0 = \sum_{t=1}^{n}\dfrac{D_t}{(1+r)^t} + \dfrac{V_n}{(1+r)^n}$, $V_n = \dfrac{D_{n+1}}{r-g_L}$
- İmtiyazlı pay (vadesiz, sabit temettü): $V_0 = \dfrac{D}{r}$
- FCFE ile değer: $V_0 = \dfrac{FCFE_1}{r-g}$ ; FCFF ile firma değeri: $V_F = \dfrac{FCFF_1}{WACC - g}$
- Gerekçeli (justified) ileri F/K: $\dfrac{P_0}{E_1} = \dfrac{1-b}{r-g}$ ; gerekçeli PD/DD: $\dfrac{ROE - g}{r - g}$
- Firma değeri: $EV = \text{Piyasa değeri} + \text{Borç} + \text{İmtiyazlı pay} + \text{Azınlık payları} - \text{Nakit ve benzerleri}$
- CAPM: $E(R_i) = R_f + \beta_i\,[E(R_m) - R_f]$ ; APT: $E(R) = R_f + \sum_j \beta_{j}\lambda_j$
- Fiili dolaşım (free float) = Dolaşımdaki pay − kontrol eden / kilitli paylar ; ortalama günlük hacim

**(b) Sık yapılan hatalar**
- Gordon modelinde $D_0$ yerine $D_1$ kullanmamak; $r \le g$ iken modeli uygulamak.
- Çok aşamalı modelde son değeri ($V_n$) yanlış yıla iskonto etmek ($n$ yerine $n+1$).
- FCFF'yi özkaynak maliyetiyle, FCFE'yi AOSM ile iskonto etmek (tutarsızlık).
- EV çarpanında payı EV, paydayı özkaynağa ait bir ölçü (ör. net kâr) seçmek.
- Temettü tarihlerinde hak kullanım tarihi (ex-date) ile hak sahipliği tespit tarihini (record date) karıştırmak.

**(c) Tipik soru tuzakları**
- Pay bölünmesi / bedelsiz: piyasa değeri değişmez, pay başına değerler değişir.
- Geri alım: PBK'yı artırabilir ama değer yaratmayabilir (geri alımın finansman maliyeti vs kazanç verimi).
- Geçmiş (trailing) vs ileri (forward) F/K karşılaştırması; emsal grubunun yanlış seçimi.
- Sell-side ile buy-side raporunun amacı ve olası çıkar çatışması.
- Aynı model, farklı varsayımlar → farklı değer: hangi varsayımın değeri en çok değiştirdiği (duyarlılık).

**(d) Nasıl ölçülür (meta)**
- 2027'de **yeniden yazıldı** (8 → 12 modül). Değerleme hesabı (İNA, çarpanlar) ağırlığı arttı; piyasa yapısı/kaldıraçlı işlem ve piyasa etkinliği modülleri L1'den çıktı. Yeni "analist raporu" modülü kavramsal sorular üretir.

### 2.6 Sabit Getirili (FI) — %11–14, 19 modül / 51 LOS

**(a) Kritik formüller**
- Tahvil fiyatı: $P = \sum_{t=1}^{N}\dfrac{PMT}{(1+r)^t} + \dfrac{FV}{(1+r)^N}$
- Kupon arası: $PV^{Full} = PV\,(1+r)^{t/T}$ ; birikmiş faiz $AI = \dfrac{t}{T}\times PMT$ ; temiz fiyat $= PV^{Full} - AI$
- Bileşik sıklık dönüşümü: $\left(1 + \dfrac{APR_m}{m}\right)^m = \left(1 + \dfrac{APR_n}{n}\right)^n$ ; cari getiri $= \dfrac{\text{Yıllık kupon}}{\text{Temiz fiyat}}$
- Para piyasası: iskonto esaslı $PV = FV\left(1 - \dfrac{Gün}{Yıl}\,DR\right)$ ; ekleme esaslı $PV = \dfrac{FV}{1 + \frac{Gün}{Yıl}\,AOR}$
- Değişken faizli: $PV = \sum \dfrac{\frac{(Ref + QM)\,FV}{m}}{\left(1+\frac{Ref + DM}{m}\right)^t} + \dfrac{FV}{(1+\frac{Ref+DM}{m})^N}$
- Spot/forward: $(1+S_{A+B})^{A+B} = (1+S_A)^A(1+f_{A,B})^B$
- Macaulay durasyonu: $MacDur = \sum_t t\,\dfrac{PV(CF_t)}{P}$ ; düzeltilmiş: $ModDur = \dfrac{MacDur}{1+r}$ ; yaklaşık: $ApproxModDur = \dfrac{PV_- - PV_+}{2\,\Delta y\,PV_0}$
- Parasal durasyon: $MoneyDur = ModDur \times PV^{Full}$ ; $PVBP = \dfrac{PV_- - PV_+}{2}$ (1 bp için)
- Konvekslik: $ApproxCon = \dfrac{PV_- + PV_+ - 2PV_0}{(\Delta y)^2\,PV_0}$
- Fiyat değişimi: $\%\Delta P \approx -ModDur\,\Delta y + \tfrac{1}{2}\,Convexity\,(\Delta y)^2$
- Efektif durasyon: $EffDur = \dfrac{PV_- - PV_+}{2\,\Delta Curve\,PV_0}$
- Beklenen kayıp: $EL = PD \times LGD$, $LGD = EAD\times(1 - RR)$ ; getiri farkı ≈ $EL$ (yaklaşık, risk-nötr)
- Repo faizi $= \text{Repo tutarı} \times \text{Repo oranı} \times \dfrac{Gün}{360}$

**(b) Sık yapılan hatalar**
- Yarı yıllık kuponlu tahvilde dönem sayısı ve dönemsel getiri ($r/2$) dönüşümünü unutmak.
- Durasyon tahminini konvekslik terimi olmadan büyük getiri değişimlerine uygulamak; konvekslik terimindeki ½ katsayısını veya bp/ondalık birimini karıştırmak ($\Delta y$ = 0,01 vs 100).
- Macaulay ile düzeltilmiş durasyonu karıştırmak; opsiyonlu tahvilde getiri esaslı durasyon kullanmak (efektif durasyon gerekir).
- G-spread (devlet tahvili), I-spread (swap), Z-spread (spot eğri boyunca sabit), OAS (= Z − opsiyon maliyeti) ayrımları.
- Pozitif eğimli eğride forward > spot > par sıralamasını ters kurmak.

**(c) Tipik soru tuzakları**
- Yatırım ufku = Macaulay durasyonu ise fiyat riski ve yeniden yatırım riski birbirini dengeler; ufuk > MacDur → yeniden yatırım riski baskın.
- Geri çağrılabilir tahvilde negatif konvekslik; satma opsiyonlu tahvilde konvekslik artar.
- Teminatlı tahvil (covered bond) ile ABS farkı: çifte başvuru hakkı, dinamik teminat havuzu.
- Erken ödeme: faiz düşünce kısalma (contraction), faiz yükselince uzama (extension) riski.
- Kredi notu "notching": ihraççı notu ile ihraç notu farkı, öncelik sırası.

**(d) Nasıl ölçülür (meta)**
- En çok modüllü konu (19); hesap yoğun (fiyat/getiri/durasyon). İçerik 2026 ile aynı. Hesap makinesi TVM ve tarih fonksiyonları önemli.

### 2.7 Türev Araçlar ve Risk Yönetimi (DER) — %6–9, 10 modül / 22 LOS

**(a) Kritik formüller**
- Forward fiyatı (ayrık): $F_0(T) = S_0(1+r)^T$ ; taşıma maliyeti/getirisiyle: $F_0(T) = [S_0 - PV(I) + PV(C)](1+r)^T$ ; sürekli: $F_0 = S_0\,e^{(r + c - i)T}$
- Uzun forward değeri (ömür içinde): $V_t = S_t - PV_t[F_0(T)]$ ; vadede: $V_T = S_T - F_0(T)$
- FRA / zımni forward faiz: $(1 + r_{B}\,t_B) = (1 + r_A\,t_A)(1 + f\,(t_B - t_A))$ (basit faiz, gün/360)
- Opsiyon getirisi: alım $c_T = \max(0, S_T - X)$ ; satım $p_T = \max(0, X - S_T)$ ; kâr = getiri − prim (uzun)
- Kullanım (içsel) değeri ve zaman değeri: $c = \max(0, S - X) + \text{zaman değeri}$
- Avrupa alım alt sınırı: $c_0 \ge \max[0, S_0 - X(1+r)^{-T}]$
- Alım-satım paritesi: $S_0 + p_0 = c_0 + \dfrac{X}{(1+r)^T}$ ; forward ile: $\dfrac{F_0(T)}{(1+r)^T} + p_0 = c_0 + \dfrac{X}{(1+r)^T}$
- Tek dönemli binom: $q = \dfrac{1 + r - d}{u - d}$ ; $c_0 = \dfrac{q\,c^+ + (1-q)\,c^-}{1+r}$ ; korunma oranı $h = \dfrac{c^+ - c^-}{S^+ - S^-}$

**(b) Sık yapılan hatalar**
- Forward **fiyatı** ile forward **değeri**ni karıştırmak (başlangıçta değer 0, fiyat ≠ 0).
- Kâr hesabında primi unutmak veya kısa pozisyonun işaretini ters almak.
- Risk-nötr olasılığı gerçek olasılık sanmak; binomda beklenen getiri yerine risksiz faizle iskonto edilir.
- Futures'ın günlük uzlaşma nedeniyle değerinin her gün sıfırlandığını unutmak.
- Swap oranı (başlangıçta değer 0 yapan sabit oran) ile swap değerini karıştırmak.

**(c) Tipik soru tuzakları**
- Opsiyon değerinin belirleyicileri: oynaklık ↑ → hem alım hem satım ↑; faiz ↑ → alım ↑, satım ↓; taşıma getirisi ↑ → alım ↓, satım ↑.
- Faiz ile dayanak fiyatı pozitif korelasyonluysa futures fiyatı forward'dan yüksek olur (yeniden yatırım avantajı).
- Sentetik pozisyonlar: korumalı alım (covered call) ≈ kısa satım opsiyonu; koruyucu satım (protective put) ≈ uzun alım + tahvil.
- Kesin yükümlülük (forward/futures/swap) vs şarta bağlı hak (opsiyon, CDS) sınıflandırması.

**(d) Nasıl ölçülür (meta)**
- İçerik 2026 ile aynı; konu adı "Derivatives and Risk Management" oldu, ağırlık %5–8 → %6–9. Formül uygulaması + "hangi sentetik pozisyon" tipi kavramsal sorular. (Kullanıcının SPK Türev Araçlar lisansı burada avantaj sağlar; ancak CFA gösterimi ve forward değerleme yaklaşımı farklı olabilir.)

### 2.8 Alternatif Yatırımlar (AI) — %6–9, 7 modül / 22 LOS

**(a) Kritik formüller**
- Yönetim ücreti: $AUM \times \text{oran}$ (dönem başı mı, sonu mu — soruya göre)
- Performans ücreti: $\max[0, (\text{Dönem sonu değer} - \text{Eşik/HWM}) \times \text{oran}]$ ; yönetim ücretinden sonra ya da bağımsız hesaplanabilir
- Net getiri: $R_{net} = \dfrac{\text{Dönem sonu değer} - \text{Ücretler}}{\text{Dönem başı değer}} - 1$
- Yatırılan sermaye çarpanı: $MOIC = \dfrac{\text{Gerçekleşen + Gerçekleşmemiş değer}}{\text{Yatırılan sermaye}}$
- Emtia vadeli getirisi $\approx$ spot getiri + devir (roll) getirisi + teminat getirisi
- Gayrimenkul: kapitalizasyon oranı $cap\ rate = \dfrac{NOI}{Değer}$ → $Değer = \dfrac{NOI}{cap\ rate}$

**(b) Sık yapılan hatalar**
- Yüksek su işareti (high-water mark) ve eşik getiri (hurdle; yumuşak vs sert) uygulamasını karıştırmak.
- Ücretlerin sırası: performans ücretinin yönetim ücreti düşüldükten sonra mı, önce mi hesaplandığını okumamak.
- Raporlanan alternatif yatırım getirilerindeki yumuşatma (smoothing) nedeniyle oynaklığın ve korelasyonun olduğundan düşük göründüğünü unutmak; hayatta kalma ve geriye dönük doldurma (backfill) yanlılıkları.

**(c) Tipik soru tuzakları**
- Contango'da devir getirisi negatif, backwardation'da pozitif.
- Doğrudan yatırım / ortak yatırım (co-investment) / fon yatırımı arasında ücret–kontrol–çeşitlendirme ödünleşimi.
- Dağıtım şelalesi (waterfall): Avrupa tipi (tüm fon bazında) vs Amerikan tipi (işlem bazında) ve geri alma (clawback).
- Dijital varlıklar: izinli/izinsiz defter, iş ispatı vs hisse ispatı, saklama riski.

**(d) Nasıl ölçülür (meta)**
- Ağırlık %7–10 → %6–9; içerik 2026 ile aynı. Hesap az (ücret/getiri), çoğu kavramsal karşılaştırma.

### 2.9 Portföy Oluşturma (PM) — %8–12, 6 modül / 40 LOS

**(a) Kritik formüller**
- Portföy beklenen getirisi: $E(R_p) = \sum_i w_i E(R_i)$ ; varyans (iki varlık): bkz. QM
- Fayda: $U = E(R) - \tfrac{1}{2}A\sigma^2$ (A = riskten kaçınma katsayısı)
- Sermaye tahsis doğrusu: $E(R_p) = R_f + \dfrac{E(R_T) - R_f}{\sigma_T}\,\sigma_p$ ; CML'de $T$ = piyasa portföyü
- Beta: $\beta_i = \dfrac{Cov(R_i,R_m)}{\sigma_m^2} = \rho_{i,m}\dfrac{\sigma_i}{\sigma_m}$ ; toplam varyans $= \beta_i^2\sigma_m^2 + \sigma_\varepsilon^2$
- CAPM/SML: $E(R_i) = R_f + \beta_i[E(R_m) - R_f]$
- Sharpe $= \dfrac{R_p - R_f}{\sigma_p}$ ; Treynor $= \dfrac{R_p - R_f}{\beta_p}$ ; $M^2 = (R_p - R_f)\dfrac{\sigma_m}{\sigma_p} - (R_m - R_f)$ ; Jensen alfası $\alpha_p = R_p - [R_f + \beta_p(R_m - R_f)]$
- Gerekli getiri (IPS): ör. $\dfrac{\text{Yıllık harcama ihtiyacı}}{\text{Portföy}}$ + enflasyon (toplamsal ya da çarpımsal — soruya göre)

**(b) Sık yapılan hatalar**
- CML (toplam risk, σ) ile SML'yi (sistematik risk, β) karıştırmak; SML'nin üstünde kalan varlık düşük değerlenmiştir.
- Sharpe'ı iyi çeşitlendirilmemiş portföyde, Treynor'u tek başına tutulan portföyde kullanmak (tersi doğrudur).
- $M^2$'yi yüzde getiri farkı yerine oran gibi yorumlamak.
- Risk alma isteği ile kapasitesi çeliştiğinde daha **düşük** olanı esas almamak.

**(c) Tipik soru tuzakları**
- Korelasyon +1 değilse çeşitlendirme faydası vardır; +1'de portföy σ'sı ağırlıklı ortalamadır.
- Tanımlanmış katkı planında riski çalışan, tanımlanmış fayda planında işveren taşır.
- Davranışsal önyargıların bilişsel (inanç sürdürme + bilgi işleme) / duygusal ayrımı: bilişseller eğitimle düzeltilir, duygusallar genelde uyarlanır.
- Risk yönetişimi ile risk yönetimi; risk bütçesi; finansal olmayan riskler (operasyonel, model, uyum).

**(d) Nasıl ölçülür (meta)**
- Konu adı değişti (Portfolio Management → Portfolio Construction), modüller ve LOS'lar 2026 ile aynı. Portföy matematiği QM-08 ile örtüşüyor; CAPM hem PM-02'de hem EQ-12'de.

### 2.10 Etik ve Mesleki Standartlar (ETH) — %10–15, 10 modül / 33 LOS

**(a) Kritik yapı (formül yerine)**
- Etik Kurallar (Code) 6 bileşen; Mesleki Davranış Standartları 7 ana başlık:
  - **I. Profesyonellik:** (A) Yasaları bilme, (B) Bağımsızlık ve tarafsızlık, (C) Yanlış beyan, (D) Uygunsuz davranış, (E) Yetkinlik
  - **II. Sermaye piyasalarının bütünlüğü:** (A) Kamuya açıklanmamış önemli bilgi, (B) Piyasa manipülasyonu
  - **III. Müşterilere karşı yükümlülükler:** (A) Sadakat, basiret ve özen, (B) Adil davranma, (C) Uygunluk, (D) Performans sunumu, (E) Gizliliğin korunması
  - **IV. İşverenlere karşı yükümlülükler:** (A) Sadakat, (B) Ek ücret düzenlemeleri, (C) Yöneticilerin sorumlulukları
  - **V. Yatırım analizi, tavsiyeler ve işlemler:** (A) Özen ve makul dayanak, (B) Müşterilerle iletişim, (C) Kayıtların saklanması
  - **VI. Çıkar çatışmaları:** (A) Çatışmaların açıklanması, (B) İşlem önceliği, (C) Yönlendirme ücretleri
  - **VII. CFA Institute üyesi/adayı olarak sorumluluklar:** (A) Programlardaki davranış, (B) CFA Institute'a, unvana ve programa atıf
- Kural: yerel yasa ile Standartlardan **daha katı olanı** uygulanır.
- İşlem önceliği sırası: müşteri → işveren → kişisel hesap.

**(b) Sık yapılan hatalar**
- "Yasa izin veriyor" diye Standartları daha gevşek uygulamak.
- Önemli + kamuya açıklanmamış bilginin iki koşulunu ayrı ayrı test etmemek; mozaik teorisi (kamuya açık + önemsiz özel bilgilerin birleşimi ihlal değildir).
- Tarafsızlık (I.B) ile çıkar açıklamasını (VI.A) karıştırmak — açıklama yapmak bağımsızlık ihlalini ortadan kaldırmaz.
- Kayıt saklama (V.C) için yerel kural yoksa önerilen asgari süreyi bilmemek (Standartlar rehberinde 7 yıl önerilir).
- "CFA Level I'i geçtim" demek vs "CFA Level II adayıyım" ifadesi; "CFA" kısaltmasının isim gibi kullanılması.

**(c) Tipik soru tuzakları**
- "En olası ihlal edilen standart hangisi?" sorusunda birden fazla makul seçenek → **en spesifik/doğrudan** olanı seçmek.
- Yönetici sorumluluğu (IV.C): uyum sistemi yoksa yetki devri bile sorumluluğu kaldırmaz.
- Adil davranma (III.B) "eşit" değil "adil" davranmaktır; tavsiyelerin aynı anda tüm müşterilere iletilmesi.
- Performans sunumu (III.D): simüle sonuçların açıklanmadan gösterilmesi.
- Uygunluk (III.C): müşteri IPS'i ve portföy bütünü bağlamında değerlendirme.

**(d) Nasıl ölçülür (meta)**
- Ağırlık %15–20 → **%10–15**'e indi; modül sayısı arttı (her standart ayrı modül). GIPS Level I'dan çıktı. Kısa senaryolar üzerinden "ihlal var mı / hangi standart / hangi önerilen prosedür" soruları. Puan sınırında olan adaylarda etik puanının ayırt edici olabileceği yaygın görüştür; resmi bir "etik düzeltmesi" kuralı varlığı **UNVERIFIED**.

---

## 3. 2027 müfredat değişiklikleri (özet)

**Geçerlilik penceresi:** Resmi Level I sayfası 2026 ve 2027 taslaklarını birlikte yayımlıyor ama pencere eşlemesi vermiyor. İkincil kaynaklara göre **Şubat 2027 Level I** ilk 2027 penceresi; Ağustos/Kasım 2026 = 2026 müfredatı (UNVERIFIED, resmi teyit bekliyor).

**Level I — modül sayısı 93 → 102** (2026 ve 2027 resmi taslakların karşılaştırması; 300hours ile tutarlı)

| Konu | 2026 modül | 2027 modül | Değişiklik |
|---|---|---|---|
| Kantitatif Yöntemler | 11 | 11 | **Tamamen yeniden yazıldı.** Çıkan: Rates and Returns, Time Value of Money in Finance, Statistical Measures of Asset Returns, Probability Trees and Conditional Expectations, Portfolio Mathematics, Simulation Methods, Estimation and Inference, Hypothesis Testing, Parametric and Non-Parametric Tests of Independence, Simple Linear Regression, Introduction to Big Data Techniques. Gelen: Returns of Financial Assets and Instruments, Types of Financial Returns, Benchmarking Returns (endeks yapımı buraya taşındı), The Time Value of Money in Finance, Statistical Characteristics of Asset Returns, Statistical Distributions…, Estimation and Hypothesis Testing, The Return and Risk of a Financial Portfolio, Simulation of Financial Asset Prices and Returns (tarihsel simülasyon, bootstrap, Monte Carlo), Applications of Simple Linear Regression in Finance (CAPM tahmini dahil), Introduction to Financial Data Science (YZ/büyük dil modelleri). Ağırlık %6–9 → %11–14. LOS 38 → 30. |
| İktisat | 8 | 8 | Değişiklik yok |
| Kurumsal Finansman | 7 | 7 | Yalnızca ad: Corporate Issuers → Corporate Finance |
| Finansal Tablo Analizi | 12 | 12 | Değişiklik yok |
| Pay Senetleri | 8 | 12 | **Yeniden yapılandırıldı.** Çıkan: Market Organization and Structure (kaldıraç/emir türleri), Security Market Indexes (QM'ye taşındı), **Market Efficiency (L1'den çıktı)**, Overview of Equity Securities, Company Analysis: Past and Present, Company Analysis: Forecasting, Equity Valuation: Concepts and Basic Tools. Kalan: Industry and Competitive Analysis (LOS 5 → 4). Gelen: Equity Instrument Features; Equity Jurisdictions, Classes, and the Voting Process; Equity Issuance and Trading; Sources of Equity Returns; Introduction to Equity Valuation; DCF and Growth Models; Relative Value Equity Valuation Approaches; Financial Statement Forecasting in Equity Valuation; Company Analysis: Past, Present, and Future; Equity Analyst Research Reports; CAPM, Market Model, and Other Factor-Based Equity Models. Ad: Equity Investments → Equities. |
| Sabit Getirili | 19 | 19 | Değişiklik yok |
| Türevler | 10 | 10 | İçerik aynı; ad: Derivatives → Derivatives and Risk Management (resmi sayfada); ağırlık %5–8 → %6–9 |
| Alternatif Yatırımlar | 7 | 7 | İçerik aynı; ağırlık %7–10 → %6–9 |
| Portföy Oluşturma | 6 | 6 | İçerik aynı; ad: Portfolio Management → Portfolio Construction |
| Etik | 5 | 10 | "Guidance for Standards I–VII" tek modülü 7 ayrı modüle bölündü; **GIPS modülü L1'den çıktı** (yalnız L3); "Ethics Application" → "Application of the Code and Standards: Level I". Ağırlık %15–20 → %10–15 |

**Level II:** 45 → 51 modül; tek değişiklik Etik'in 7 standart modülüne bölünmesi + "Application of the Code and Standards: Level II". Diğer modül ve LOS sayıları aynı (taslaklar karşılaştırıldı). Konu adları L1 ile uyumlu hale getirildi (Corporate Finance, Equities, Portfolio Construction). Ağırlıklarda değişiklik yok (300hours; resmi sayfa tek tablo gösteriyor).

**Level III:** Uzmanlık yolları (Portfolio Management, Private Markets, Private Wealth) 2027'de de sürüyor; yollar için birleşik ağırlık %30–35. Etik yine 7 standart modülüne bölündü ("Application of the Code and Standards: Level III" + Asset Manager Code). PM yolu 2026 taslağıyla karşılaştırıldığında başka değişiklik yok. (300hours'un SSS bölümünde L3 için QM/Equities değişikliğinden bahsedilmesi, kendi ana metniyle çelişiyor; resmi L3 taslağında QM/Equities konusu yok → bu iddia geçersiz sayıldı.)

**Uygulama için sonuçlar**
1. 2026 müfredatıyla Ağustos/Kasım 2026'ya girecek kullanıcı için ayrı bir "2026 modu" gerekebilir (özellikle QM, Equities, GIPS, piyasa etkinliği). Varsayılan 2027.
2. 2026 QM/Equities için yazılmış üçüncü taraf içerikler 2027 LOS'larıyla birebir eşleşmez; soru bankası LOS kimliklerine (`L1.json`) bağlanmalı.
3. Etik soruları standart bazında etiketlenebilir (ETH-03…ETH-09 = Standart I…VII).

---

## 4. Türkçe terim notları (SPK uyumu)

| İngilizce | Türkçe (kullanılan) |
|---|---|
| equity / share | özkaynak / pay (senedi) |
| bond | tahvil; fixed income → sabit getirili menkul kıymet / borçlanma aracı |
| discount rate / discounting | iskonto oranı / iskonto etme |
| cash flow (CFO/CFI/CFF) | nakit akışı (işletme / yatırım / finansman faaliyetlerinden) |
| duration / convexity | durasyon / konvekslik |
| yield curve / term structure | getiri eğrisi / vade yapısı |
| derivative, forward, futures, option, swap | türev araç, forward, vadeli işlem (futures), opsiyon, swap |
| call / put | alım opsiyonu / satım opsiyonu |
| WACC | ağırlıklı ortalama sermaye maliyeti (AOSM) |
| NPV / IRR | net bugünkü değer (NBD) / iç verim oranı (İVO) |
| EPS | pay başına kazanç (PBK) |
| free float | fiili dolaşımdaki pay |
| hedge fund | serbest fon |
| ETF | borsa yatırım fonu (BYF) |
| material nonpublic information | kamuya açıklanmamış önemli bilgi (içsel bilgi) |
| IFRS | UFRS / TFRS (Türkiye uyarlaması, KGK) |

---

## Kaynaklar

| URL | Tür | Lisans | Güvenilirlik 1-5 | Katkı verdiği konular |
|---|---|---|---|---|
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam | Resmi (CFA Institute) sayfa | Telifli; yalnız olgu (ağırlık, biçim) kullanıldı | 5 | 2026/2027 ağırlıkları, soru biçimi, hesap makinesi, konu adları |
| https://www.cfainstitute.org/sites/default/files/2027levelitopicoutline_online.pdf | Resmi 2027 L1 konu taslağı (PDF) | Telifli; yalnız kapsam/yapı için, LOS metni kopyalanmadı | 5 | L1.json modül/LOS kapsamı, 2027 değişiklik analizi |
| https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/2026-l1-topics-combined.pdf | Resmi 2026 L1 konu taslağı (PDF) | Telifli; karşılaştırma için | 5 | 2026→2027 modül farkları |
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam | Resmi sayfa | Telifli; olgu | 5 | L2 ağırlıkları, taslak bağlantıları |
| https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/2027-cfa_l2_topic_outline.pdf | Resmi 2027 L2 taslağı | Telifli; yapı için | 5 | L2.json |
| https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/2026-l2-topics-combined.pdf | Resmi 2026 L2 taslağı | Telifli; karşılaştırma | 5 | L2 değişiklik analizi |
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-iii-exam | Resmi sayfa | Telifli; olgu | 5 | L3 ağırlıkları, uzmanlık yolları |
| https://www.cfainstitute.org/sites/default/files/2027leveliii-portfolio-management-pathwaytopicoutline_online.pdf | Resmi 2027 L3 (PM yolu) | Telifli; yapı için | 5 | L3.json çekirdek + PM yolu |
| https://www.cfainstitute.org/sites/default/files/2027leveliii-private-markets-pathwaytopicoutline_online.pdf | Resmi 2027 L3 (Özel Piyasalar) | Telifli; yapı için | 5 | L3.json Private Markets yolu |
| https://www.cfainstitute.org/sites/default/files/2027leveliii-private-wealth-pathwaytopicoutline_online.pdf | Resmi 2027 L3 (Özel Varlık) | Telifli; yapı için | 5 | L3.json Private Wealth yolu |
| https://www.cfainstitute.org/sites/default/files/docs/programs/cfa-program/2026leveliii-portfolio-management-pathwaytopicoutline_online.pdf | Resmi 2026 L3 (PM yolu) | Telifli; karşılaştırma | 5 | L3 değişiklik analizi |
| https://www.cfainstitute.org/programs/cfa-program/exam | Resmi sayfa | Telifli; olgu | 5 | L1/L2/L3 sınav biçimi ve süreleri |
| https://www.cfainstitute.org/programs/cfa-program/curriculum | Resmi sayfa | Telifli; olgu | 4 | Müfredatın düzenli güncellenmesi, PSM şartı (2027 ayrıntısı yok) |
| https://www.cfainstitute.org/standards/professionals/code-ethics-standards | Resmi sayfa (Etik Kurallar ve Standartlar) | Telifli; başlıklar referans | 5 | Etik: 7 standart ve alt başlıkları |
| https://www.cfainstitute.org/programs/cfa-program/candidate-resources/practical-skills-modules | Resmi sayfa | Telifli | 4 | PSM gerekliliği (bağlam) |
| https://300hours.com/cfa-curriculum-changes-2027/ | Üçüncü taraf blog (14.10.2026) | Telifli; yalnız olgu | 3 | 2027 değişiklik özeti, modül sayıları (93→102, L2 +6) |
| https://ift.world/cfa-level-i-big-changes-in-2027/ | Hazırlık kurumu blogu (IFT) | Telifli; yalnız olgu, metin kopyalanmadı | 3 | GIPS'in L1'den çıkması, QM/Equities yeniden yapılanması |
| https://analystprep.com/blog/2027-cfa-curriculum-changes-levels-1-2-3/ | Hazırlık kurumu blogu (AnalystPrep) | Telifli; yalnız olgu | 3 | Şubat 2027 ilk pencere iddiası (UNVERIFIED) |
| https://openstax.org/details/books/principles-finance | Açık ders kitabı (OpenStax) | CC BY 4.0 | 4 | QM (TVM, getiri), CI (NBD/İVO, AOSM), EQ (DDM), FI (tahvil fiyatı) formül doğrulaması |
| https://openstax.org/details/books/introductory-statistics-2e | Açık ders kitabı (OpenStax) | CC BY 4.0 | 4 | QM istatistik: güven aralığı, hipotez testi, regresyon |
| https://openstax.org/details/books/principles-economics-3e | Açık ders kitabı (OpenStax) | CC BY 4.0 | 4 | ECO: piyasa yapıları, maliye/para politikası, ticaret |
| https://openstax.org/details/books/principles-financial-accounting | Açık ders kitabı (OpenStax) | CC BY-NC-SA 4.0 | 4 | FSA: stok yöntemleri, nakit akış tablosu, oranlar |
| https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ | Standart belirleyici (IFRS Vakfı) | Telifli; özet sayfa | 5 | FSA stok: maliyet ile NGD'den düşük olan |
| https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/ | Standart belirleyici | Telifli; özet sayfa | 5 | FSA nakit akışı sınıflandırma (faiz/temettü) |
| https://www.ifrs.org/issued-standards/list-of-standards/ias-12-income-taxes/ | Standart belirleyici | Telifli; özet sayfa | 5 | FSA ertelenmiş vergi |
| https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/ | Standart belirleyici | Telifli; özet sayfa | 5 | FSA kiralama (kiracı tek model) |
| https://en.wikipedia.org/wiki/Bond_duration | Ansiklopedi | CC BY-SA 4.0 | 3 | FI durasyon/konvekslik formül çapraz kontrolü |
| https://en.wikipedia.org/wiki/Put%E2%80%93call_parity | Ansiklopedi | CC BY-SA 4.0 | 3 | DER alım-satım paritesi |
| https://en.wikipedia.org/wiki/Modigliani%E2%80%93Miller_theorem | Ansiklopedi | CC BY-SA 4.0 | 3 | CI MM önermeleri |
| https://spk.gov.tr | Türk düzenleyici (SPK) | Kamu kurumu sitesi | 5 | Türkçe terminoloji (pay, borçlanma aracı, içsel bilgi, serbest fon) |
| https://www.kgk.gov.tr | Türk standart belirleyici (KGK) | Kamu kurumu sitesi | 5 | TFRS Türkçe muhasebe terimleri |
| https://www.tspb.org.tr | Sektör birliği (TSPB) | Telifli | 3 | Sermaye piyasası Türkçe terim kullanımı |

Not: "Güvenilirlik" puanı içeriğin bu araştırmadaki kullanım amacı için verilmiştir (resmi = 5, açık ders kitabı/standart = 4–5, üçüncü taraf blog = 3). Üçüncü taraf hazırlık kurumlarının yalnızca olgusal iddiaları (sayılar, tarih) not edildi, metinleri veya soruları kullanılmadı.
