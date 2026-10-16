# DECISIONS — tek satırlık kararlar (tarih · karar · gerekçe)

- 2026-10-15 · Drive'daki `projeler/cfa/DEVAM.md` oluşturulmadı; süreklilik PROGRESS.md ile sağlanıyor · PROMPT kırmızı çizgi 5 (proje klasörü dışına dokunma) global nottan önceliklidir.
- 2026-10-15 · Faz 0 araştırması paralel ajanlara bölündü, uygulama iskeleti aynı anda kuruluyor · "Çalışan sürümü erken çıkar" ilkesi; iskelet araştırma sonucuna bağlı değil.
- 2026-10-16 · Kullanıcı isteğiyle tüm arka plan ajanları (üretici/denetçi) Fable 5.1 modeline geçirildi; Opus ile başlamış ajanlar durdurulup aynı atamalarla yeniden başlatıldı · kullanıcı talebi.
- 2026-10-16 · Web çıktısı `output: single` (SPA) + scripts/pwa.mjs ile service worker/manifest/404.html · GitHub Pages statik barındırma ve tam offline için en basit yol; doğrulandı (sunucu kapalıyken açılıyor).
- 2026-10-16 · KaTeX CSS fontları base64 gömülü tek TS modülünde (src/components/katex-css.ts); web'de <style>, native'de WebView · offline formül render, font yolu sorunu yok.
- 2026-10-16 · Not: private repoda GitHub Pages için GitHub Pro (veya org planı) gerekir; yoksa Pages'i public repo ile ya da Expo Go/yerel ağ ile kullan · GitHub kısıtı.
- 2026-10-16 · `build-content --preview` doğrulanmamış içeriği yalnızca yerel UI testi için pakete alır; commit edilen bundle daima yalnızca doğrulanmış içerik içerir.
- 2026-10-16 · Kullanıcı isteğiyle ajanlar Sonnet 5.5'e (maliyet) geçirildi, aynı anda ≤3 ajan · kota tasarrufu.
