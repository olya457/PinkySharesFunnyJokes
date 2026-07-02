import { Platform } from 'react-native';

export const palette = {
  ink: '#2a001c',
  plum: '#4a002f',
  deepPlum: '#2b001d',
  white: '#fff9fb',
  blush: '#f794b0',
  blushSoft: '#fac4d1',
  blushLine: '#ffd2dc',
  rose: '#ff4f86',
  roseDark: '#b80776',
  banana: '#ffdf95',
  grape: '#f1a8f3',
  spring: '#75c86a',
  springDark: '#1d5724',
  glass: 'rgba(255,255,255,0.92)',
  nightGlass: 'rgba(43,0,29,0.88)',
  line: 'rgba(255,255,255,0.36)',
  shadow: 'rgba(35,0,24,0.36)',
};

export const round = {
  panel: 8,
  pill: 28,
  dock: 34,
};

export const platformGap = {
  screenTop: Platform.OS === 'android' ? 30 : 14,
  dockBottom: Platform.OS === 'android' ? 30 : 20,
};
