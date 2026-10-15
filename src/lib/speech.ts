import * as Speech from 'expo-speech';

import { getState } from '@/state/store';

/** İngilizce sesli okuma (cihaz TTS, offline). */
export function speakEn(text: string, onDone?: () => void) {
  Speech.stop();
  Speech.speak(text, { language: 'en-US', rate: getState().settings.ttsRate, onDone, onStopped: onDone });
}

export function stopSpeech() {
  Speech.stop();
}
