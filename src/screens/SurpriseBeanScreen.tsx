import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { randomJokes } from '../data/giggleAtlas';
import { useCompactLayout } from '../theme/layout';
import { palette, round } from '../theme/palette';

export function SurpriseBeanScreen() {
  const [jokeIndex, setJokeIndex] = useState<number | null>(null);
  const compact = useCompactLayout();
  const joke = jokeIndex === null ? null : randomJokes[jokeIndex];

  const pick = () => {
    setJokeIndex(current => {
      if (randomJokes.length === 1) {
        return 0;
      }

      let next = Math.floor(Math.random() * randomJokes.length);
      while (next === current) {
        next = Math.floor(Math.random() * randomJokes.length);
      }
      return next;
    });
  };

  if (joke) {
    const message = `${joke.setup}\n${joke.punchline}`;
    return (
      <Stage onBack={() => setJokeIndex(null)} title="Random Joke">
        <Image resizeMode="contain" source={gallery.jokeMedallion} style={[styles.badge, compact.isShort && styles.compactBadge]} />
        <View style={[styles.jokeCard, compact.isShort && styles.compactJokeCard]}>
          <Text style={styles.jokeText}>{message}</Text>
          <ShareButton message={message} />
        </View>
        <ActionButton onPress={pick} style={[styles.button, compact.isShort && styles.compactButton]} title="Give me another joke!" />
      </Stage>
    );
  }

  return (
    <Stage title="Random Joke">
      <Image resizeMode="contain" source={gallery.pinkyPointdown} style={[styles.pinky, compact.isShort && styles.compactPinky]} />
      <View style={[styles.introCard, compact.isShort && styles.compactIntroCard]}>
        <Text adjustsFontSizeToFit numberOfLines={3} style={styles.introText}>Tap the button and I'll tell you something funny.</Text>
      </View>
      <ActionButton onPress={pick} style={[styles.button, compact.isShort && styles.compactButton]} title="Tell a joke!" />
    </Stage>
  );
}

const styles = StyleSheet.create({
  pinky: {
    width: 330,
    height: 300,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  compactPinky: {
    width: 238,
    height: 218,
  },
  badge: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  compactBadge: {
    width: 226,
    height: 226,
    marginBottom: 10,
  },
  introCard: {
    borderRadius: round.panel,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.nightGlass,
    paddingHorizontal: 26,
    paddingVertical: 26,
    alignItems: 'center',
  },
  compactIntroCard: {
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  introText: {
    color: palette.white,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '700',
    textAlign: 'center',
  },
  compactJokeCard: {
    paddingHorizontal: 16,
    paddingVertical: 17,
  },
  jokeCard: {
    borderRadius: round.panel,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.nightGlass,
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  compactButton: {
    marginTop: 14,
  },
  jokeText: {
    color: palette.white,
    fontSize: 19,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    alignSelf: 'center',
    width: '86%',
    marginTop: 20,
  },
});
