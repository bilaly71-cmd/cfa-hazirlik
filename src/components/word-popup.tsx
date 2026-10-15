import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Chip, Row, T } from './ui';
import { vocabById } from '@/content';
import { useColors } from '@/hooks/use-theme';
import { speakEn } from '@/lib/speech';
import { actions, useStore } from '@/state/store';

type Target = { word: string; vocabId?: string } | null;
const Ctx = createContext<(word: string, vocabId?: string) => void>(() => {});

export const useWordPopup = () => useContext(Ctx);

export function WordPopupProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<Target>(null);
  const open = useCallback((word: string, vocabId?: string) => setTarget({ word, vocabId }), []);
  return (
    <Ctx.Provider value={open}>
      {children}
      <Modal visible={!!target} transparent animationType="fade" onRequestClose={() => setTarget(null)}>
        {target ? <Sheet target={target} onClose={() => setTarget(null)} /> : null}
      </Modal>
    </Ctx.Provider>
  );
}

function Sheet({ target, onClose }: { target: NonNullable<Target>; onClose: () => void }) {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const v = target.vocabId ? vocabById.get(target.vocabId) : undefined;
  const customId = useMemo(() => 'custom-' + target.word.toLowerCase().replace(/[^a-z0-9]+/g, '-'), [target.word]);
  const id = v?.id ?? customId;
  const saved = useStore((s) => !!s.notebook[id]);
  return (
    <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Kapat">
      <Pressable
        onPress={() => {}}
        style={[styles.sheet, { backgroundColor: c.card, borderColor: c.border, paddingBottom: 16 + insets.bottom }]}>
        <ScrollView style={{ maxHeight: 420 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <T size={22} weight="700">
                {v?.term_en ?? target.word}
              </T>
              {v ? (
                <T sub size={14}>
                  {v.pronunciation_tr} · /{v.ipa.replace(/^\/|\/$/g, '')}/ {v.pos ? `· ${v.pos}` : ''}
                </T>
              ) : null}
            </View>
            <Button small kind="secondary" title="🔊" onPress={() => speakEn(v?.term_en ?? target.word)} accessibilityLabel="Sesli telaffuz" />
          </Row>
          {v ? (
            <>
              <T size={18} weight="600" color={c.tr} style={{ marginTop: 10 }}>
                {v.tr}
              </T>
              <T size={15} style={{ marginTop: 6 }}>
                {v.definition_en_simple}
              </T>
              <T size={14} sub>
                {v.definition_tr}
              </T>
              <View style={[styles.example, { backgroundColor: c.cardAlt }]}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <T size={15} style={{ flex: 1 }}>
                    “{v.example_en}”
                  </T>
                  <Pressable onPress={() => speakEn(v.example_en)} hitSlop={10}>
                    <T>🔊</T>
                  </Pressable>
                </Row>
                <T size={14} sub style={{ marginTop: 4 }}>
                  {v.example_tr}
                </T>
              </View>
              {v.everyday_meaning ? (
                <View style={[styles.example, { backgroundColor: c.warnBg }]}>
                  <T size={13} weight="700" color={c.warn}>
                    Günlük İngilizcede
                  </T>
                  <T size={14}>{v.everyday_meaning}</T>
                </View>
              ) : null}
              <Row style={{ marginTop: 8 }}>
                <Chip label={v.cefr_level} />
                <Chip label={v.topic} />
              </Row>
            </>
          ) : (
            <T sub style={{ marginTop: 10 }}>
              Bu kelime uygulama sözlüğünde yok. Telaffuzunu dinleyebilir ve kelime defterine ekleyebilirsin (Türkçe karşılığını dışa aktarımda doldurabilirsin).
            </T>
          )}
        </ScrollView>
        <Row style={{ marginTop: 12 }}>
          <Button
            style={{ flex: 1 }}
            kind={saved ? 'secondary' : 'primary'}
            title={saved ? 'Defterden çıkar' : 'Kelime defterime ekle'}
            onPress={() =>
              saved
                ? actions.removeWord(id)
                : actions.addWord(id, v ? undefined : { term_en: target.word, tr: '' })
            }
          />
          <Button kind="ghost" title="Kapat" onPress={onClose} />
        </Row>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18, borderWidth: StyleSheet.hairlineWidth, width: '100%', maxWidth: 720, alignSelf: 'center' },
  example: { borderRadius: 10, padding: 10, marginTop: 10 },
});
