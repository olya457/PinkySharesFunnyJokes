import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { randomJokes } from '../data/giggleAtlas';
import { palette, round } from '../theme/palette';

export function SurpriseBeanScreen() {
  const [jokeIndex, setJokeIndex] = useState<number | null>(null);
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
        <Image resizeMode="contain" source={gallery.jokeMedallion} style={styles.badge} />
        <View style={styles.jokeCard}>
          <Text style={styles.jokeText}>{message}</Text>
          <ShareButton message={message} />
        </View>
        <ActionButton onPress={pick} style={styles.button} title="Give me another joke!" />
      </Stage>
    );
  }

  return (
    <Stage title="Random Joke">
      <Image resizeMode="contain" source={gallery.pinkyPointdown} style={styles.pinky} />
      <View style={styles.introCard}>
        <Text style={styles.introText}>Tap the button and I'll tell you something funny.</Text>
      </View>
      <ActionButton onPress={pick} style={styles.button} title="Tell a joke!" />
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
  badge: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 18,
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
  introText: {
    color: palette.white,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '700',
    textAlign: 'center',
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
