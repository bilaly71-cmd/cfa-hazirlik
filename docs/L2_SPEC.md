# L2 vignette (item set) üretim şablonu

Önce `docs/CONTENT_SPEC.md` (genel kurallar, kırmızı çizgiler) ve `src/lib/schema.ts` (Vignette, Question) oku. L2 modül listesi: `content/syllabus/L2.json` (konu/modül kimlikleri, LOS boş).

## Dosya
`content/L2/<TOPIC>/<MODULE_ID>.json` (kimlik L2.json'daki modül kimliği, ör. FSA-03):
```json
{ "module_id": "FSA-03",
  "vignettes": [ { Vignette } ],
  "questions": [ { Question } ] }
```
(Ders yok. Boş `lesson` yazma.)

## Vignette
- `id`: `L2-<MODULE_ID>-v<NN>` · `level: "L2"` · `curriculum_year: 2027` · `topic`, `module_id` · `source_basis: "original"` · `verified: false`.
- `title_en/tr` kısa; `text_en/tr`: 150-300 kelimelik özgün olay metni (kurgusal şirket/kişi, Türkiye bağlamı olabilir), gerçek dünyadaki gibi veri içerir (rakamlar, varsayımlar, analist notları). Metin sade B1-B2 İngilizce; TR doğal.
- `tables`: gerekirse 1-2 küçük tablo (`headers`, `rows` hücreleri string).
- `question_ids`: set içindeki soruların kimlikleri (4-6 soru).

## Sorular
- `type: "item_set"`, `set_id` = vignette id, `level: "L2"`, `module_id`, `los_id: "<MODULE_ID>-set"`, `id: "<vignette id>-q<N>"`.
- 3 şık (A,B,C) — L2'de de 3 şıklı; doğru şık dağılımı dengeli. Zorluk 2-3 ağırlıklı, `cognitive` apply/analyze.
- Sorular vignette verisini KULLANMALI (metindeki rakam/olgular olmadan çözülemesin); bir soru tek başına çözülebiliyorsa vignette kullanmıyor demektir.
- Tüm Question alanları zorunlu kurallarla aynı: `stem_en/tr`, `options[].en/tr`, `explanation_en/tr`, `wrong_option_reasons` (her yanlış şık), `solution_steps` (sayısalda), `numeric` + `options[].value` (sayısalda; vignette rakamlarından python ifadesi), `calculator` (emin değilsen yazma), 3-8 `vocab_ids` (yalnızca `content/vocab/*.json` içinde tanımlı kimlikler; yeni kelime gerekirse `content/vocab/L2-<MODULE_ID>.json` — dikkat: kimlik başka dosyada varsa tekrar tanımlama).
- L2 kapsamı: modül başlığına göre (ör. çoklu regresyon, kur/ekonomi, finansal raporlama analizi, değerleme, türev/kredi, portföy/ETH vaka uygulaması). Uydurma olgu yok; CFA/sağlayıcı metin ve örneklerini kopyalama.

## Doğrulama
Dosya başına: `npm run validate-content -- --file <yol>` ve `python scripts/verify_numeric.py <yol>` hatasız olsun. Vignette/soru sayıları: `question_ids` ile `set_id`'si eşleşen soru sayısı birebir tutmalı.
