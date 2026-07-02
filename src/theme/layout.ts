import { useWindowDimensions } from 'react-native';

export function useCompactLayout() {
  const { height, width } = useWindowDimensions();
  const isNarrow = width <= 375;
  const isShort = height <= 700;
  const isTiny = width <= 340 || height <= 600;

  return {
    isNarrow,
    isShort,
    isTiny,
    gutter: isTiny ? 12 : isNarrow ? 14 : 16,
    panelGap: isTiny ? 10 : isShort ? 12 : 16,
    dockHeight: isTiny ? 62 : isShort ? 68 : 78,
    dockSide: isTiny ? 12 : 16,
    compactButtonHeight: isTiny ? 48 : isShort ? 54 : 62,
    compactCardPadding: isTiny ? 12 : isShort ? 14 : 16,
  };
}
