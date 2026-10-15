# İÇERİK ÜRETİM SPESİFİKASYONU (üretici ajanlar için)

Şema: `src/lib/schema.ts` (zod). Bu dosyayı oku; alan adları oradakiyle birebir aynı olmalı.
Müfredat iskeleti: `content/syllabus/L1.json` (konu → modül → LOS kimlikleri). Kimlikleri buradan al, uydurma.

## 1. Dosya düzeni
- Modül paketi: `content/L1/<TOPIC>/<MODULE_ID>.json`
  ```json
  { "module_id": "FI-01", "lesson": { ...Lesson }, "questions": [ ...Question ] }
  ```
- Konu kelimeleri: `content/vocab/<TOPIC>.json` → `VocabTerm[]`. Genel İngilizce kelimeler: `content/vocab/GEN.json`.
- Her şey UTF-8, 2 boşluk girintili JSON. Dosyayı yazdıktan sonra `npm run validate-content -- --file <yol>` ile doğrula.

## 2. Kimlikler
- Ders: `lesson.id = "<MODULE_ID>-lesson"` (ör. `FI-01-lesson`).
- Soru: `"<LOS_ID>-q<NN>"` (ör. `FI-01-a-q01`). Modül içinde benzersiz, sıra numarası iki hane.
- Kelime: `term_en`'in küçük harf slug'ı, boşluk yerine `-` (ör. `present-value`, `yield`, `whereas`).
  Başka konu dosyasında zaten olan bir kelimeyi tekrar tanımlama; tanımlanmamışsa kendi konu dosyana ekle.
- `curriculum_year`: L1.json'daki değer. `level: "L1"`. `source_basis: "original"`. `verified: false` (üretici asla true/obje yazmaz).

## 3. Ders (Lesson) — her modül için bir tane, modülün TÜM LOS'larını kapsar
Bölüm sırası (`sections[].kind`):
1. `intuition` — bu kavram neden var, gerçek hayatta nerede karşına çıkar. Mümkünse BIST/Türkiye örneği
   (TCMB faizi, DİBS, Eurobond, BIST 100, VİOP, TÜFE, enflasyon muhasebesi (TMS 29) gibi). Kurgusal şirket adları kullan.
2. `definition` — tanımlar, terimler.
3. `formula` — `formula_latex` (KaTeX uyumlu, `\frac`, `\sum`, `\left(` …), değişkenlerin açıklaması metinde.
4. `example` — sayısal örnek (`example.en/tr`, gerekirse `example.formula_latex`), ara sonuçlarla.
5. `traps` — sık hatalar ve soru tuzakları.
- Gerekirse birden çok definition/formula/example bölümü olabilir. Her bölüm 40-160 kelime (EN).
- `en`: sade İngilizce (B1 hedefi: kısa cümleler, yaygın kelimeler) AMA sınav terminolojisi aynen kullanılır.
- `tr`: doğal, akıcı Türkçe; SPK/sermaye piyasası terminolojisi (özkaynak, nakit akışı, iskonto oranı, durasyon,
  getiri eğrisi, vadeli işlem, opsiyon, kaldıraç, gerçeğe uygun değer, amortisman, itfa …). Makine çevirisi kokmasın.
- `key_terms`: bölümde geçen önemli EN terimler. `vocab_ids`: dersin işaretlediği 8-20 kelime kimliği.
- `common_traps_tr`: 3-6 madde. `summary_en/tr`: 3-5 cümle.
- Tablolar `table` alanında (mobilde yatay kaydırılır).

## 4. Sorular (Question)
- **Her LOS için en az 5 soru**; L1 tipi `mcq3` (tam 3 şık: A, B, C).
- Zorluk: ~%30 `1` (kolay), ~%50 `2`, ~%20 `3`. `cognitive`: recall / apply / analyze karışık.
- `calc: true` olan LOS'larda soruların çoğu sayısal olsun.
- Cevap anahtarı dengesi: modül dosyasında A/B/C her biri yaklaşık 1/3 (hiçbiri %45'i geçmesin).
- CFA kalıpları kullan: "is closest to", "least likely", "most likely", "most appropriate", "all else equal",
  "which of the following is NOT", "best describes", "is most consistent with". Kullandığın kalıbı `pattern_ids`'e yaz
  (kimlikler: `closest-to`, `least-likely`, `most-likely`, `most-appropriate`, `all-else-equal`, `not-question`,
  `best-describes`, `most-consistent`, `except`, `respectively`, `if-then`).
- `stem_tr`, `options[].tr`: soru ve şıkların doğal Türkçesi (sayılar aynı; ondalık ayırıcı EN metinde nokta, TR metinde virgül).
- `explanation_en/tr`: doğru şıkkın gerekçesi.
- `wrong_option_reasons`: doğru olmayan HER şık için `{en, tr}` — çeldiricinin mantığı (hangi hatayı yapan bunu seçer).
- Sayısal sorular:
  - `solution_steps` sırası: (a) ne isteniyor, (b) hangi formül ve neden, (c) değerlerin yerine konması,
    (d) ara sonuçlar, (e) sonuç ve birimi. Formül için `formula_latex`, değerler için `values`.
  - `calculator`: BA II Plus tuş sırası. Gösterim: `[2ND] [FV]` (CLR TVM), `5 [N]`, `8 [I/Y]`, `-1000 [PV]`, `[CPT] [PV]`,
    `[CF]`, `[NPV]`, `[IRR] [CPT]`, `[2ND] [7]` (DATA) vb. Her tuş adımı ayrı dizi elemanı. Gerekirse HP 12C.
  - `options[].value`: her şıkkın sayısal değeri (yüzde ise 5.25 gibi yüzde birimi, `numeric.unit: "%"`).
  - `numeric.expr`: doğru cevabı hesaplayan **Python ifadesi** (tek satır). Kullanılabilir: `math`, `sum`, `abs`, `min`,
    `max`, `round` ve `scripts/verify_numeric.py` yardımcıları: `pv(rate,n,pmt,fv=0,when=0)`, `fv(rate,n,pmt,pv=0,when=0)`,
    `pmt(rate,n,pv,fv=0,when=0)`, `npv(rate,[cf0,cf1,...])`, `irr([cf0,...])`, `mean(xs)`, `stdev_s(xs)`, `stdev_p(xs)`,
    `var_s(xs)`, `ear(apr,m)`, `bond_price(coupon_rate,ytm,n,face=100,freq=1)`, `macaulay(coupon_rate,ytm,n,freq=1)`,
    `mod_duration(coupon_rate,ytm,n,freq=1)`, `cov_s(xs,ys)`, `corr(xs,ys)`. İşaret kuralı Excel/BA II ile aynı
    (pv() pozitif pmt için negatif döner; ifadeyi `abs()` ile sar ya da işareti düşün).
  - Yanlış şıklar tipik hatalardan türetilsin ve doğru cevaptan tolerans (%0,5) dışında olsun.
- Kavramsal sorularda: doğru şıkkın gerekçesi + her yanlış şıkkın neden yanlış olduğu.
- `vocab_ids`: soruda A2 seviyesindeki birinin takılacağı **3-8** kelime/ifade (finans terimi + genel İngilizce:
  ör. `assume`, `whereas`, `respectively`, `exceed`, `subsequent`, `incur`, `prior`).
- `spk_link` (isteğe bağlı): `{status: "known"|"partial"|"new", note_tr}` — SPK Düzey 3 ile örtüşme.

## 5. Kelime (VocabTerm)
- Hem finans terimleri hem sınav metinlerinde geçen genel İngilizce kelimeler.
- `pronunciation_tr`: Türkçe okunuş (ör. "yiild", "prez-ınt vel-yu"). `ipa`: IPA.
- `definition_en_simple`: A2-B1 sade İngilizce tanım. `definition_tr`: Türkçe tanım.
- `example_en/tr`: finans bağlamında örnek cümle.
- `everyday_meaning`: günlük İngilizcedeki farklı anlamı varsa (yield = trafikte yol vermek, security = güvenlik,
  premium = sigorta primi/kaliteli, issue = sorun/sayı, interest = ilgi, share = paylaşmak, bond = bağ, return = geri dönmek).
- `forms`: çekimli biçimler (yields, yielded, yielding). `cefr_level`, `topic` (`GEN` = genel).

## 6. Kırmızı çizgiler
- CFA Institute müfredat metni, resmi soru/mock ve Kaplan Schweser, Wiley, AnalystPrep, UWorld, IFT vb. metin/sorularını
  birebir ya da yakın parafrazla KOPYALAMA. Senaryolar, sayılar, şirket adları özgün olsun.
- Forumlardaki "sınavda çıkan sorular" (brain dump) ASLA kullanılmaz.
- Olgusal bilgi (oran, tarih, kural) uydurma; emin değilsen genel tut.
- Yalnızca sana atanan dosyalara yaz. git çalıştırma.
