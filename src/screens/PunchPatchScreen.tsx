import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { PinkyNote } from '../components/PinkyNote';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { finishCards } from '../data/giggleAtlas';
import { palette, round } from '../theme/palette';

export function PunchPatchScreen() {
  const [cardIndex, setCardIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const card = finishCards[cardIndex];
  const selectedEnding = choice === null ? '' : card.endings[choice];
  const fullJoke = `${card.setup.replace('...', '.')} ${selectedEnding}`;

  const next = () => {
    setCardIndex(current => (current + 1) % finishCards.length);
    setChoice(null);
    setRevealed(false);
  };

  if (revealed) {
    return (
      <Stage onBack={() => setRevealed(false)} title="Finish the joke">
        <Image resizeMode="contain" source={gallery.pinkyLaugh} style={styles.resultArt} />
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Your joke:</Text>
          <Text style={styles.resultText}>{fullJoke}</Text>
          <ShareButton message={fullJoke} />
        </View>
        <ActionButton onPress={next} style={styles.nextButton} title="Next joke" />
      </Stage>
    );
  }

  return (
    <Stage title="Finish the joke">
      <PinkyNote message="Keep the joke going, let's laugh together!" />
      <View style={styles.setupCard}>
        <Text style={styles.setupText}>{card.setup}</Text>
      </View>
      <View style={styles.choiceCard}>
        <Text style={styles.choiceTitle}>Choose the funniest ending</Text>
        {card.endings.map((ending, index) => {
          const selected = choice === index;
          return (
            <Pressable
              accessibilityRole="button"
              key={ending}
              onPress={() => setChoice(index)}
              style={[styles.choiceButton, selected && styles.choiceSelected]}
            >
              <Text style={styles.choiceText}>{`${String.fromCharCode(65 + index)}) ${ending}`}</Text>
            </Pressable>
          );
        })}
      </View>
      <ActionButton
        disabled={choice === null}
        onPress={() => setRevealed(true)}
        style={styles.nextButton}
        title="See results"
      />
    </Stage>
  );
}

const styles = StyleSheet.create({
  setupCard: {
    marginTop: 16,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  setupText: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  choiceCard: {
    marginTop: 16,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    padding: 14,
  },
  choiceTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  choiceButton: {
    minHeight: 53,
    borderRadius: round.panel,
    borderWidth: 3,
    borderColor: palette.blushLine,
    backgroundColor: palette.blushSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  choiceSelected: {
    borderColor: palette.roseDark,
  },
  choiceText: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: '86%',
  },
  resultArt: {
    alignSelf: 'center',
    width: 300,
    height: 290,
    marginTop: -14,
    marginBottom: 4,
  },
  resultCard: {
    borderRadius: round.panel,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.nightGlass,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  resultTitle: {
    color: palette.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 22,
  },
  resultText: {
    color: palette.white,
    fontSize: 19,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 16,
  },
});
