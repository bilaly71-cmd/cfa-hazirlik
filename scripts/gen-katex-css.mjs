// KaTeX CSS'ini fontları base64 gömülü olarak tek bir TS modülüne çevirir (offline render için).
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve('node_modules/katex/dist');
let css = fs.readFileSync(path.join(dir, 'katex.min.css'), 'utf8');
css = css.replace(/src:([^;}]*)/g, (m, srcs) => {
  const woff2 = srcs.match(/url\((fonts\/[^)]+\.woff2)\)/);
  if (!woff2) return m;
  const b64 = fs.readFileSync(path.join(dir, woff2[1])).toString('base64');
  return `src:url(data:font/woff2;base64,${b64}) format("woff2")`;
});
fs.writeFileSync('src/components/katex-css.ts', `// Otomatik üretildi: node scripts/gen-katex-css.mjs\nexport const KATEX_CSS = ${JSON.stringify(css)};\n`);
console.log('katex-css.ts', Math.round(css.length / 1024), 'KB');
