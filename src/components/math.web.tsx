import katex from 'katex';
import { createElement, useMemo } from 'react';
import { ScrollView } from 'react-native';

import { KATEX_CSS } from './katex-css';
import { useColors, useFont } from '@/hooks/use-theme';

let injected = false;
function injectCss() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = KATEX_CSS;
  document.head.appendChild(el);
  injected = true;
}

/** LaTeX formül (web: KaTeX DOM). Uzun formüller yatay kaydırılır. */
export function MathView({ latex, block = true }: { latex: string; block?: boolean }) {
  injectCss();
  const c = useColors();
  const f = useFont();
  const html = useMemo(() => katex.renderToString(latex, { throwOnError: false, displayMode: block, output: 'html' }), [latex, block]);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: block ? 6 : 0 }}>
      {createElement('div', { style: { color: c.text, fontSize: f(17), padding: '2px 4px' }, dangerouslySetInnerHTML: { __html: html } })}
    </ScrollView>
  );
}
