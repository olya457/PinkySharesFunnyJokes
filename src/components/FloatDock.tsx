import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCompactLayout } from '../theme/layout';
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
  const compact = useCompactLayout();

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
          left: compact.dockSide,
          right: compact.dockSide,
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
      <View
        style={[
          styles.rail,
          styles.railPadding,
          compact.isTiny && styles.tinyRailPadding,
          {
            minHeight: compact.dockHeight,
          },
        ]}
      >
        {items.map(item => {
          const active = item.key === activeKey;

          return (
            <DockButton
              active={active}
              accessibilityLabel={item.label}
              emoji={item.emoji}
              isTiny={compact.isTiny}
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
  isTiny,
  onPress,
}: {
  accessibilityLabel: string;
  active: boolean;
  emoji: string;
  isTiny: boolean;
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
      style={[styles.hit, isTiny && styles.tinyHit]}
    >
      <Animated.View
        style={[
          styles.bubble,
          active && styles.bubbleActive,
          isTiny && styles.tinyBubble,
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
        <Text style={[styles.icon, isTiny && styles.tinyIcon, active && styles.iconActive]}>
          {emoji}
        </Text>
      </Animated.View>
      {active ? <View style={styles.underline} /> : <View style={styles.placeholder} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
  },
  rail: {
    width: '100%',
    maxWidth: 430,
    borderRadius: round.dock,
    backgroundColor: palette.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  railPadding: {
    paddingHorizontal: 14,
  },
  tinyRailPadding: {
    paddingHorizontal: 10,
  },
  hit: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyHit: {
    width: 37,
  },
  bubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyBubble: {
    width: 31,
    height: 31,
    borderRadius: 16,
  },
  bubbleActive: {
    backgroundColor: 'rgba(255,79,134,0.2)',
  },
  icon: {
    fontSize: 22,
    color: palette.ink,
    textAlign: 'center',
  },
  tinyIcon: {
    fontSize: 19,
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
