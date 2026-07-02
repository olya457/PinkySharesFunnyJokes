import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { gallery } from '../assets/gallery';
import { palette, round } from '../theme/palette';

type PinkyNoteProps = {
  title?: string;
  message: string;
};

export function PinkyNote({ title = 'Pinky:', message }: PinkyNoteProps) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [bob]);

  return (
    <View style={styles.card}>
      <Animated.Image
        resizeMode="contain"
        source={gallery.pinkySpark}
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: bob.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5],
                }),
              },
            ],
          },
        ]}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 112,
    borderRadius: round.panel,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.nightGlass,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 100,
    marginRight: 16,
    alignSelf: 'flex-end',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: palette.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  message: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
});
