# BAĞIMSIZ DOĞRULAMA SPESİFİKASYONU (reviewer ajanlar için)

Sen içeriği üreten ajandan bağımsız bir denetçisin. Amaç: yalnızca doğru, tutarlı ve özgün içeriğin uygulamada görünmesi.
Önce `docs/CONTENT_SPEC.md` ve `src/lib/schema.ts` dosyalarını oku.

## Her modül paketi (`content/L1/<TOPIC>/<MODULE_ID>.json`) için
1. **Şema:** `npm run validate-content -- --file <yol>` hatasız olmalı.
2. **Sayısal:** `python scripts/verify_numeric.py <yol>` → her sayısal soruda ifade doğru şıkla tolerans içinde eşleşmeli,
   diğer şıklar tolerans dışında olmalı. Başarısızsa ifadeyi/şıkları/çözümü düzelt.
3. **Bağımsız çözüm:** Her soruyu cevap anahtarına BAKMADAN önce kendin çöz (sayısallarda python ile hesapla),
   sonra anahtarla karşılaştır. Tek doğru şık olmalı; belirsiz ya da iki doğrulu sorular düzeltilir.
4. **Tutarlılık:** answer, explanation, solution_steps, calculator tuşları ve wrong_option_reasons birbiriyle tutarlı.
   BA II Plus tuşları gerçekten o sonucu verir mi (işaret kuralı, P/Y, BGN/END)?
5. **Denge:** modülde A/B/C dağılımı ~1/3; hiçbir harf %45'i geçmez (gerekirse şıkların sırasını değiştir ve
   wrong_option_reasons/explanation'daki harf atıflarını güncelle).
6. **Dil:** EN sade ve sınav terminolojisine uygun; TR doğal ve EN ile anlamca eşdeğer; `content/glossary/glossary.json`
   karşılıklarına uyuyor. Sayılar iki dilde aynı.
7. **Kavramsal doğruluk:** CFA L1 kapsamına ve güncel standartlara (IFRS/US GAAP farkları, Standards of Practice) uygun.
8. **Özgünlük:** Bilinen sağlayıcı/resmi soru metinlerine benzeyen ifade varsa yeniden yaz. `npm run ngram-check` çıktısını kontrol et.
9. **Kelime:** her soruda 3-8 `vocab_ids`; tanımlanmamış kimlik kalmamalı (gerekirse `content/vocab/<TOPIC>.json`'a ekle,
   tanım/okunuş/IPA doğru olmalı).

## Sonuç yazımı
- Geçen her öğeye: `"verified": {"by": "reviewer-agent", "method": "independent-solve+numeric-script+bilingual-check", "date": "YYYY-MM-DD"}`
  (ders için method: `"content-review+bilingual-check"`, kelime için `"lexical-review"`).
- Düzeltemediğin öğe `verified: false` kalır; nedeni `reports/qa/<MODULE_ID>.md` dosyasına yazılır
  (öğe kimliği, sorun, denenen düzeltme). Düzelttiklerini de kısaca listele (bulunan hata oranı metriği için):
  `| id | sorun türü (key/numeric/ambiguous/translation/vocab/style) | düzeltildi mi |`.
- Yalnızca atandığın dosyalara yaz. git çalıştırma.
