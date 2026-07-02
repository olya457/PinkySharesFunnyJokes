import React from 'react';
import { Pressable, Share, StyleSheet, Text } from 'react-native';
import { palette, round } from '../theme/palette';

type ShareButtonProps = {
  message: string;
};

export function ShareButton({ message }: ShareButtonProps) {
  const share = () => {
    Share.share({ message });
  };

  return (
    <Pressable accessibilityRole="button" onPress={share} style={styles.button}>
      <Text style={styles.icon}>🔗</Text>
      <Text style={styles.text}>Share</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 34,
    borderRadius: round.pill,
    borderWidth: 2,
    borderColor: palette.blushLine,
    backgroundColor: palette.rose,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 17,
  },
  text: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '800',
  },
});
