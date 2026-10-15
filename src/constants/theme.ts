import { Platform } from 'react-native';

export const Palette = {
  light: {
    bg: '#F6F7F9',
    card: '#FFFFFF',
    cardAlt: '#EEF1F5',
    text: '#14171C',
    sub: '#5B6470',
    border: '#DCE1E8',
    primary: '#1F5FBF',
    primaryText: '#FFFFFF',
    good: '#1E8E4F',
    goodBg: '#E3F5EA',
    bad: '#C23B33',
    badBg: '#FBE7E5',
    warn: '#B26B00',
    warnBg: '#FFF2DC',
    mark: '#7A4DD8',
    tr: '#0E6E73',
  },
  dark: {
    bg: '#0F1115',
    card: '#191C22',
    cardAlt: '#22262E',
    text: '#ECEFF3',
    sub: '#A1A9B5',
    border: '#2E333C',
    primary: '#6EA4FF',
    primaryText: '#0B1220',
    good: '#4CC983',
    goodBg: '#14301F',
    bad: '#FF7B72',
    badBg: '#3A1A18',
    warn: '#F2B04C',
    warnBg: '#3A2A10',
    mark: '#B79CFF',
    tr: '#5CC8CE',
  },
} as const;

export type Colors = { [K in keyof typeof Palette.light]: string };

export const Fonts = Platform.select({
  web: { mono: 'ui-monospace, Menlo, Consolas, monospace' },
  default: { mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
})!;

export const MaxContentWidth = 720;
