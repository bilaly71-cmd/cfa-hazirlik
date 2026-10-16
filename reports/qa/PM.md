# QA raporu: PM-01..PM-06 (2026-10-16, reviewer-agent)

Kontroller: şema (6 paket + 6 vocab dosyası hatasız), `verify_numeric.py` (50 sayısal soru, 0 hatalı), her soru cevap anahtarına bakmadan çözüldü (portföy varyansı, kovaryans/korelasyon, GMV ağırlığı, CAL/CML, beta, CAPM, SML, Sharpe, Treynor, Jensen, M², VaR, NAV, gerekli getiri python/elle bağımsız hesaplandı), TR/EN sayı eşdeğerliği, wrong_option_reasons harf atıfları, A/B/C dengesi, vocab sayısı (3-8) ve tanımsız vocab kimliği (yok), ngram-check (PM için uyarı yok). 201 soru, 6 ders, 82 kelime verified yapıldı; hiçbir öğe verified:false kalmadı.

| paket | soru | geçen (değişmeden) | düzeltilen | başarısız |
|---|---|---|---|---|
| PM-01 | 35 | 29 | 6 | 0 |
| PM-02 | 45 | 40 | 5 | 0 |
| PM-03 | 30 | 25 | 5 | 0 |
| PM-04 | 40 | 35 | 5 | 0 |
| PM-05 | 15 | 14 | 1 | 0 |
| PM-06 | 36 | 30 | 6 | 0 |

(Düzeltilen = en az bir alanı değişen soru; sadece vocab_ids değişenler dahil.)

## Düzeltmeler

| id | sorun türü | düzeltildi mi |
|---|---|---|
| PM-01-d-q01 | style/calculator (BA II Plus tuş dizisi kaba: "...", 2ND 8 ile Sx; 1-V ekranı, Y01 sıklık atlaması yok) | evet: [2ND][STAT] 1-V, [2ND][DATA], [2ND][CLR WORK], X girişi ([ENTER][↓][↓]), Sx, [x²] adımlarıyla yeniden yazıldı |
| PM-01-d-q02 | style/calculator (2-V LIN adımları eksik, "2ND ENTER ile 2-V LIN" yanlış) | evet: [2ND][STAT] + [2ND][SET] ile LIN, X/Y çift girişi, Sx/Sy/r okuma, Cov = r·Sx·Sy |
| PM-01-d-q03 | style/calculator (aynı) | evet: LIN modu, veri girişi, r satırı |
| PM-02-e-q04 | style/calculator (regresyon beta, "2ND 8 ile LIN seç" yanlış) | evet: LIN modu, X=piyasa Y=hisse, a=−0,4 ve b=1,7 okuma |
| PM-04-c-q03 | numeric/key tutarsızlığı (C şıkkı 24,0 iken açıklaması 1,30/1,05−1 = %23,8 veriyor) | evet: şık 23,8 (EN/TR/value) ve wrong_option_reason güncellendi; cevap B sabit |
| PM-02-f-q04 | ambiguous/style (şık B "... rather than ..." karışık ifade, soru kökü belirsiz) | evet: soru kökü iki varlığı tanımlıyor, şıklar sadelendi (EN+TR) |
| PM-02-i-q01 | style (wrong_option_reason B muğlak) | evet: 0,28 = 7/25 net anlatıldı |
| PM-01 lesson traps | conceptual/style ("düşük korelasyon yalnızca ağırlıklar aynı kalıyorsa yardımcı olur" yanıltıcı) | evet (EN+TR): korelasyon düştükçe fayda artar, yalnızca ρ=+1'de kaybolur |
| PM-01-a-q03, PM-02-c-q01, PM-03-b-q02, PM-03-d-q02, PM-04-g-q01, PM-04-c-q02, PM-05-b-q02, PM-06-a-q01, PM-06-g-q04, PM-02-h-q03 | vocab (kimlik başka dosyada farklı anlamla tanımlı: future=vadeli işlem sözleşmesi, strike=opsiyon kullanım fiyatı, trading=alım-satım amaçlı menkul kıymet, options=opsiyonlar, target=hedef sermaye yapısı, measure=önlem, distribution=fon dağıtımı, hurdle-rate=carry eşiği) | evet: soru bağlamına uymayan kimlikler çıkarıldı ya da uygun eşdeğerle değiştirildi (transaction-cost, security); sayı 3-8 içinde |
| PM-01-b-q01, PM-01-b-q05 | vocab (risk-neutral = DER-10 risk nötr fiyatlama; burada "riske karşı nötr yatırımcı") | evet: yeni `risk-neutral-investor` terimi (PM-01 vocab) eklendi ve yönlendirildi |
| PM-03-b-q05 | vocab (management = "şirket yönetimi") | evet: yeni `portfolio-management` (PM-03 vocab) |
| PM-03-b-q03, PM-03-c-q03, PM-04-b-q04, PM-04-g-q05, PM-06-c-q04, PM-06-c-q05 | vocab (policy = muhasebe politikası; management = şirket yönetimi) | evet: liquidity / constraint / ips / risk-governance / risk-management |
| PM-06-f-q02, PM-06-f-q05 | vocab (credit = kredi/alacak kaydı) | evet: credit-risk |
| vocab mutual-fund, fiduciary | translation/style (örnek cümle zayıf: "holds 60 shares"; fiduciary tr "güvenilir sorumluluk") | evet |

## Notlar

- Üreticinin işaretleri: (1) vocab_ids 201 soruda tek tek denetlendi; liste "alakasız" kalan soru yoktu, yalnızca yukarıdaki anlam uyuşmazlıkları ve kopuk kimlikler düzeltildi (çoğu bayraklı kelime stem'de geçen gerçek terimdi). (2) BA II Plus stat/regresyon tuşları yeniden yazıldı, `calculator` kaldırılmadı. Tuş adımları çıkarım değil, cihaz akışına göre (STAT çalışma sayfası, DATA, SET ile 1-V/LIN, ↓ ile n/X̄/Sx/σx/.../a/b/r) yazıldı; cihazda denenmemiştir, v2 donanım denemesi önerilir. (3) Python doğrulaması: tüm sayısal sorular ve ara değerler (örn. σp=12,59; kov=30,5; r=0,9896; GMV wA=14,29; beta=1,7; CAPM 44,4/7,2/9,69; Sharpe 0,44; Treynor 8,46; Jensen +1,9; M²=0,92; VaR 7,25; NAV 23,6; gerekli getiri 8,38/7,18/36,5/8,0) beklenenle eşleşti. (4) PM-06 tek LOS'ta 6 soru (g) sorun değil, 5 koşulu aşıyor.
- Dağılım: PM-01 12/11/12; PM-02 15/15/15; PM-03 10/10/10; PM-04 13/14/13; PM-05 5/5/5; PM-06 12/12/12.
- Kavramsal bayraklar (hepsi düzeltme gerektirmedi): aşırı güven bu müfredatta duygusal önyargı (PM-05) doğru; planlama adımı IPS + SAA'yı kapsar (PM-03-b-q01) doğru; VaR toplanabilirliği (PM-06-e-q03) "genelde" düzeyinde doğru; PM-06-f-q01/f-q05 hukuki/düzenleyici riskin finansal olmayan sınıflandırması müfredata uygun.
- Kelime: 82 PM terimi (80 mevcut + 2 yeni) tanım/okunuş/IPA/TR karşılıkları gözden geçirilip verified "lexical-review" yapıldı. Başka dosyada tanımlı kimlikler tekrar tanımlanmadı. Bazı kimlikler başka konuların dar anlamıyla tanımlı (policy, premium, units, exposure, significant); anlam bağlamı bozmadığı yerde bırakıldı.
- ngram-check PM paketleri için uyarı üretmedi.
