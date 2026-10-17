// Sayısal olmayan sorularda "doğru şık tek başına en uzun" oranını konu bazında ölçer (şans ≈ %33).
// Kullanım: node scripts/len_bias.js
const q = require('../src/content/bundle/questions.json');
const by = {};
for (const x of q) {
  if (x.numeric) continue;
  const L = x.options.map((o) => o.en.length);
  const a = x.options.findIndex((o) => o.key === x.answer);
  const mx = Math.max(...L);
  const longest = L[a] === mx && L.filter((v) => v === mx).length === 1;
  const t = (by[x.topic] ??= [0, 0]);
  t[0] += longest ? 1 : 0;
  t[1] += 1;
}
let T = [0, 0];
for (const [k, [a, b]] of Object.entries(by)) {
  T[0] += a;
  T[1] += b;
  console.log(k, `${a}/${b}`, `${Math.round((a / b) * 100)}%`);
}
console.log('toplam', `${T[0]}/${T[1]}`, `${Math.round((T[0] / T[1]) * 100)}% (şans ≈ 33%)`);
