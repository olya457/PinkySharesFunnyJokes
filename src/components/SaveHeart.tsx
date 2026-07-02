import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { palette } from '../theme/palette';

type SaveHeartProps = {
  active: boolean;
  onPress: () => void;
  size?: number;
};

export function SaveHeart({ active, onPress, size = 28 }: SaveHeartProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.hit}>
      <Text style={[styles.heart, { fontSize: size }, active && styles.active]}>
        {active ? '♥' : '♡'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    color: palette.ink,
    fontWeight: '900',
  },
  active: {
    color: palette.roseDark,
  },
});
