import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { palette, round } from '../theme/palette';

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export function ActionButton({ title, onPress, disabled, style }: ActionButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      friction: 6,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          if (!disabled) {
            animateScale(0.965);
          }
        }}
        onPressOut={() => animateScale(1)}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.disabled,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 62,
    borderRadius: round.pill,
    backgroundColor: palette.spring,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    shadowColor: palette.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  disabled: {
    backgroundColor: '#7f8a64',
  },
  pressed: {
    opacity: 0.94,
  },
  title: {
    color: palette.springDark,
    fontSize: 25,
    fontWeight: '700',
  },
});
