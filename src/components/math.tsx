import katex from 'katex';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { KATEX_CSS } from './katex-css';
import { useColors, useFont } from '@/hooks/use-theme';

/** LaTeX formül (native: KaTeX HTML'i, gömülü fontlarla WebView içinde; tamamen offline). */
export function MathView({ latex, block = true }: { latex: string; block?: boolean }) {
  const c = useColors();
  const f = useFont();
  const [h, setH] = useState(block ? 56 : 32);
  const html = useMemo(() => {
    const body = katex.renderToString(latex, { throwOnError: false, displayMode: block, output: 'html' });
    return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${KATEX_CSS}
      html,body{margin:0;padding:0;background:transparent;color:${c.text};font-size:${f(17)}px;overflow-x:auto;overflow-y:hidden}
      .wrap{display:inline-block;padding:2px 4px;white-space:nowrap}</style></head>
      <body><div class="wrap" id="w">${body}</div>
      <script>function s(){window.ReactNativeWebView.postMessage(String(document.getElementById('w').getBoundingClientRect().height))}
      window.onload=s;setTimeout(s,50);</script></body></html>`;
  }, [latex, block, c.text, f]);
  return (
    <View style={{ height: h + 6, marginVertical: block ? 6 : 0 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled
        onMessage={(e) => {
          const v = Number(e.nativeEvent.data);
          if (v > 0) setH(Math.ceil(v));
        }}
      />
    </View>
  );
}
