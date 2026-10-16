# DECISIONS — tek satırlık kararlar (tarih · karar · gerekçe)

- 2026-10-15 · Drive'daki `projeler/cfa/DEVAM.md` oluşturulmadı; süreklilik PROGRESS.md ile sağlanıyor · PROMPT kırmızı çizgi 5 (proje klasörü dışına dokunma) global nottan önceliklidir.
- 2026-10-15 · Faz 0 araştırması paralel ajanlara bölündü, uygulama iskeleti aynı anda kuruluyor · "Çalışan sürümü erken çıkar" ilkesi; iskelet araştırma sonucuna bağlı değil.
- 2026-10-16 · Kullanıcı isteğiyle tüm arka plan ajanları (üretici/denetçi) Fable 5.1 modeline geçirildi; Opus ile başlamış ajanlar durdurulup aynı atamalarla yeniden başlatıldı · kullanıcı talebi.
- 2026-10-16 · Web çıktısı `output: single` (SPA) + scripts/pwa.mjs ile service worker/manifest/404.html · GitHub Pages statik barındırma ve tam offline için en basit yol; doğrulandı (sunucu kapalıyken açılıyor).
- 2026-10-16 · KaTeX CSS fontları base64 gömülü tek TS modülünde (src/components/katex-css.ts); web'de <style>, native'de WebView · offline formül render, font yolu sorunu yok.
- 2026-10-16 · Not: private repoda GitHub Pages için GitHub Pro (veya org planı) gerekir; yoksa Pages'i public repo ile ya da Expo Go/yerel ağ ile kullan · GitHub kısıtı.
- 2026-10-16 · `build-content --preview` doğrulanmamış içeriği yalnızca yerel UI testi için pakete alır; commit edilen bundle daima yalnızca doğrulanmış içerik içerir.
- 2026-10-16 · Kullanıcı isteğiyle ajanlar Sonnet 5.5'e (maliyet) geçirildi, aynı anda ≤3 ajan · kota tasarrufu.
- 2026-10-16 · Repo public yapıldı, GitHub Pages ile yayın: https://bilaly71-cmd.github.io/cfa-hazirlik/ · Kullanıcı önceliği "önce yayınla"; Cloudflare Pages hesap açmayı gerektirdiği için (kırmızı çizgi 4) kullanılamadı. Yayın öncesi gizli bilgi taraması temiz.
- 2026-10-16 · KAPSAM: Yalnızca Level I. L2/L3 çalışması durduruldu (kullanıcı talebi); L2 vignette içeriği (51 vignette/262 soru) ve ekranı kodda kalır ama menüden kaldırıldı, bundan sonra genişletilmez · Kullanıcı yalnızca L1 sınavına girecek. Milestone C'nin L2/L3 maddeleri iptal; kalan hedef L1 soru havuzunu genişletmek.
- 2026-10-16 · Tasarım kuralı: sadelik, netlik, pratiklik (kullanıcı). Bugün ekranı 9 → 5 karta indirildi (otobüs modu, günün sorusu, TR seviye kartı, içerik uyarısı kaldırıldı; hepsi ilgili sekmelerde zaten var) · gereksiz kalabalık.
