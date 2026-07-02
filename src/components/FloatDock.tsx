import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { palette, round } from '../theme/palette';

export type DockItem = {
  key: string;
  emoji: string;
  label: string;
};

type FloatDockProps = {
  activeKey: string;
  bottom: number;
  items: DockItem[];
  onChange: (key: string) => void;
};

export function FloatDock({ activeKey, bottom, items, onChange }: FloatDockProps) {
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rise, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [rise]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          bottom,
          opacity: rise,
          transform: [
            {
              translateY: rise.interpolate({
                inputRange: [0, 1],
                outputRange: [26, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.rail}>
        {items.map(item => {
          const active = item.key === activeKey;

          return (
            <DockButton
              active={active}
              accessibilityLabel={item.label}
              emoji={item.emoji}
              key={item.key}
              onPress={() => onChange(item.key)}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

function DockButton({
  accessibilityLabel,
  active,
  emoji,
  onPress,
}: {
  accessibilityLabel: string;
  active: boolean;
  emoji: string;
  onPress: () => void;
}) {
  const pulse = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(pulse, {
      toValue: active ? 1 : 0,
      friction: 7,
      tension: 110,
      useNativeDriver: true,
    }).start();
  }, [active, pulse]);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={styles.hit}
    >
      <Animated.View
        style={[
          styles.bubble,
          active && styles.bubbleActive,
          {
            transform: [
              {
                scale: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.13],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={[styles.icon, active && styles.iconActive]}>{emoji}</Text>
      </Animated.View>
      {active ? <View style={styles.underline} /> : <View style={styles.placeholder} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    left: 16,
    right: 16,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
  },
  rail: {
    minHeight: 78,
    width: '100%',
    maxWidth: 430,
    borderRadius: round.dock,
    backgroundColor: palette.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  hit: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleActive: {
    backgroundColor: 'rgba(255,79,134,0.2)',
  },
  icon: {
    fontSize: 22,
    color: palette.ink,
    textAlign: 'center',
  },
  iconActive: {
    color: palette.roseDark,
  },
  underline: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: palette.roseDark,
    marginTop: 1,
  },
  placeholder: {
    width: 22,
    height: 2,
    marginTop: 1,
  },
});
