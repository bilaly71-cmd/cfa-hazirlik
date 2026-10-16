import { router, type Href } from 'expo-router';

import { Card, H, Row, Screen, T } from '@/components/ui';

const ITEMS: { href: Href; icon: string; title: string; sub: string }[] = [
  { href: '/stats', icon: '📊', title: 'İstatistik', sub: 'Konu doğruluğu, süre, hazırlık skoru, mock geçmişi' },
  { href: '/formulas', icon: '∑', title: 'Formül kartları', sub: 'Özgün L1 formül özeti' },
  { href: '/calculator', icon: '🧮', title: 'BA II Plus rehberi', sub: 'TVM, CF/NPV/IRR, istatistik, amortisman, tahvil' },
  { href: '/english', icon: '🎮', title: 'İngilizce oyunları', sub: 'Anlam, boşluk doldurma, eşleştirme' },
  { href: '/exam-info', icon: 'ℹ️', title: 'Sınav bilgisi', sub: 'Ücretler, tarihler, kurallar, kaynaklar' },
  { href: '/patterns', icon: '🧩', title: 'Soru kalıpları', sub: 'least likely, closest to, NOT …' },
  { href: '/ethics', icon: '⚖️', title: 'Etik vakaları', sub: 'Standards I–VII' },
  { href: '/settings', icon: '⚙️', title: 'Ayarlar', sub: 'Türkçe destek, karanlık mod, yazı boyutu, sınav tarihi' },
];

export default function More() {
  return (
    <Screen>
      <H>Araçlar</H>
      {ITEMS.map((it) => (
        <Card key={String(it.href)} onPress={() => router.push(it.href)}>
          <Row>
            <T size={22}>{it.icon}</T>
            <Row style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
              <T weight="700">{it.title}</T>
              <T size={13} sub>
                {it.sub}
              </T>
            </Row>
          </Row>
        </Card>
      ))}
      <T size={11} sub center style={{ marginTop: 16 }}>
        Tüm sorular ve anlatımlar bu uygulama için özgün olarak yazılmıştır; CFA Institute ile bağlantılı değildir. CFA® ve Chartered Financial
        Analyst® CFA Institute'un tescilli markalarıdır.
      </T>
    </Screen>
  );
}
