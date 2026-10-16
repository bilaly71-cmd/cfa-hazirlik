# QA raporu: AI-01..AI-07 (2026-10-16, reviewer-agent)

Şema, sayısal betik (0 hatalı), ngram-check (AI için uyarı yok), bağımsız çözüm (python: carry sert/yumuşak eşik, 2/20 ücret zinciri, yüksek su işareti, eşikli net getiri, TVPI/DPI/RVPI, NOI/cap rate, kaldıraçlı özkaynak getirisi, roll getirisi, net/brüt maruziyet, staking), TR/EN sayı eşdeğerliği, wrong_option_reasons anahtarları, A/B/C dengesi, vocab sayısı (3-8) ve tanımsız vocab kimliği (yok) kontrol edildi. Hiçbir soru başarısız değil; 100 soru, 7 ders ve 126 kelime verified yapıldı.

| paket | soru | geçen (değişiklik gerekmeyen) | düzeltilen | başarısız |
|---|---|---|---|---|
| AI-01 | 15 | 13 | 2 | 0 |
| AI-02 | 10 | 9 | 1 | 0 |
| AI-03 | 15 | 12 | 3 | 0 |
| AI-04 | 20 | 18 | 2 | 0 |
| AI-05 | 15 | 15 | 0 | 0 |
| AI-06 | 15 | 14 | 1 | 0 |
| AI-07 | 20 | 18 | 2 | 0 |

## Düzeltmeler

| id | sorun türü | düzeltildi mi |
|---|---|---|
| AI-04-b-q02 | numeric/ambiguous (şık B 3,5 hiçbir tipik hatadan türemiyordu, gerekçe belirsizdi) | evet: B = 3,60% (net gelir 3,6 / toplam varlık 100) ve gerekçesi yazıldı |
| AI-01-c-q02 | style (BA II Plus tuşları yanlış zincir: "30 [ENTER] 8 [-] 20 [%]" fark yerine %20 çıkarırdı); vocab (`exceed` metinde yok) | evet |
| AI-01-c-q03 | vocab (`all-else-equal` metinde yok; yerine `catch-up`); calculator ([=] fazlalığı) | evet |
| AI-02-b-q01 | style (calculator: BA II Plus'ta [ENTER] ile zincir kurulmaz) | evet |
| AI-03-a-q03 | translation ("değer silmeye uğrar" yerine "değerleri düşürülür") | evet |
| AI-03-b-q04 | vocab (`seniority` metinde yok, yerine `rank`) | evet |
| AI-03-c-q03 | vocab (`on-demand` metinde yok, yerine `distribution`) | evet |
| AI-03 ders (formula) | translation/style (EN'de TR'de olmayan "before and after fees depending on the data source" cümlesi kaldırıldı); olgusal ("mostly organized" yerine "often/çoğu zaman") | evet |
| AI-04-c-q02 | vocab (`likely` metinde yok, yerine `social-infrastructure`) | evet |
| AI-06-a-q03 | key/style (şık B'nin gerekçesi belirsizdi: %20 = (120−100)/100 olarak açıklandı) | evet |
| AI-07-a-q02 | vocab (`consensus` metinde yok, çıkarıldı; 5 kelime kaldı) | evet |
| AI-07-d-q05 | vocab (`jurisdiction` metinde yok, çıkarıldı; 4 kelime kaldı) | evet |
| vocab AI-01 `pooled` | translation (okunuş "pulid" -> "puld") | evet |

## Üreticinin işaretlediği noktalar

1. Vocab: her sorunun vocab_ids'i metinle karşılaştırıldı; ilgisiz kalanlar yukarıdaki gibi düzeltildi. Kalan istisnalar kavramsal olarak soru metnindedir: AI-05-c-q04 `currency-risk` (metinde "currency move"), AI-06-a-q05 `net-exposure` (metinde "net market exposure"). Yeni kelime eklenmedi; tüm kimlikler zaten tanımlı.
2. Türkiye ifadeleri (AI-06 serbest fonların nitelikli yatırımcıya sunulması; AI-07 kripto varlık hizmet sağlayıcılarının sermaye piyasası gözetimi ve dijital TL çalışması): genel ve doğru, kesin tarih/sayı/kanun numarası yok; değiştirilmedi. AI-03'teki GSYF/GSYO ve AI-04'teki KÖO (BOT) ifadeleri de genel; "mostly" yumuşatıldı.
3. Hesap doğrulaması: carry (4,4 / 6,0), 2/20 ücret zinciri (112,512 -> %12,51), eşikli net getiri (%11,8; çeldiriciler %10,8 ve %11,5), yüksek su işareti (2,0; çeldiriciler 5,0 ve 6,0), TVPI 1,50, cap rate değeri 120 (çeldiriciler 128,6 ve 162,9), kaldıraçlı özkaynak getirisi %9, roll -%2,5, net maruziyet %80, staking -%4,6 bağımsız olarak python ile yeniden hesaplandı; hepsi anahtarla eşleşti. Şelale (waterfall) sorusu AI-01-c-q05 kavramsaldır (tüm fon bazlı/Avrupa tipi LP lehine), doğru.

## Notlar
- Dağılım: AI-01 5/5/5; AI-02 4/3/3; AI-03 5/5/5; AI-04 7/7/6; AI-05 5/5/5; AI-06 5/5/5; AI-07 7/7/6.
- Kelime: 126 AI kelimesi (AI-01..07 vocab dosyaları) tanım/okunuş/IPA açısından gözden geçirildi, verified "lexical-review" yapıldı.
- Ders: 7 ders (içerik ve TR/EN eşdeğerliği) verified "content-review+bilingual-check" yapıldı.
