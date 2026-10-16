# QA raporu — ETH-04 (Guidance for Standard II: Integrity of Capital Markets)

Denetçi: reviewer-agent (R4) · Tarih: 2026-10-16 · Dosya: `content/L1/ETH/ETH-04.json`

## Kontroller
| Kontrol | Sonuç |
|---|---|
| Şema (`validate-content --file`) | Hata 0, uyarı 0 |
| Sayısal (`verify_numeric.py`) | Sayısal soru yok (0/0) |
| Bağımsız çözüm | 15/15 soru anahtarla uyumlu; her soruda tek savunulabilir doğru şık |
| Tutarlılık (answer/explanation/wrong_option_reasons) | Uyumlu |
| Denge (A/B/C) | A 5 · B 5 · C 5 |
| Dil / glossary lint | Uyarı yok |
| Kavramsal | II(A) önemlilik + kamuya açıklanmamış olma testleri, kaynağın önemsizliği (kulak misafiri), seçici açıklama ≠ kamuya açıklama, geniş yayımlanmış haber = kamuya açık, mozaik teorisi, makro veri (enflasyon) MNPI olabilir, "cause others to act" (tüyo); II(B) bilgiye/işleme dayalı manipülasyon, niyet ölçütü, kapanışı boyama, açıklanmış piyasa yapıcılığı meşru; önleyici araçlar (bilgi duvarı, gizli watch list vs restricted list, ön onay/bildirim, gözetim) doğru. SPKn m.106/107 (bilgi suistimali / piyasa dolandırıcılığı) atfı doğru |
| Standards of Practice Handbook benzerliği | Senaryolar kurgusal Türk şirketleri ve farklı mekaniklerle kurulmuş; Handbook örneklerine birebir benzeyen yok |
| Özgünlük (`ngram-check`) | ETH için şüpheli eşleşme yok |
| Kelime | 5-7 vocab_ids/soru; tanımsız kimlik 0. `content/vocab/ETH-04.json` (66 terim, üretici `verified: false`) sözlüksel olarak incelendi: tanım/okunuş/IPA doğru; 1 IPA düzeltmesi (`net-asset-value` /ˈvælju/ → /ˈvæljuː/); tüm terimler `lexical-review` ile doğrulandı |

## Düzeltmeler
| id | sorun türü | düzeltildi mi |
|---|---|---|
| vocab `net-asset-value` | vocab (IPA uzun ünlü) | evet |

## Geçen öğeler
Ders `ETH-04-lesson`, 15 soru ve 66 kelime `verified` objesi aldı. Başarısız/`verified: false` kalan öğe yok.

## Notlar
- `ETH-04-a-q03` `pattern_ids` `most-accurate` (spesifikasyon listesinde yok; ETH-01 aynı kalıp için `most-likely` kullanıyor). Uygulama kalıp kimliklerini doğrulamıyor; değiştirilmedi.
- `content/vocab/FSA-02.json` (`generate`, `fine`) ve `FSA-07.json` (`acquire`) ETH-04'te önceden tanımlı kelimeleri tekrar tanımlıyor; bu dosyalar bana atanmadığı için dokunulmadı, ilgili denetçiye not.
- Hata oranı: 0/15 soru.
