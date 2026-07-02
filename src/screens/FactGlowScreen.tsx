import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PinkyNote } from '../components/PinkyNote';
import { SaveHeart } from '../components/SaveHeart';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { funFacts } from '../data/giggleAtlas';
import { KeepsakeItem } from '../storage/keepsakeStore';
import { palette, round } from '../theme/palette';

type FactGlowScreenProps = {
  isKept: (id: string) => boolean;
  toggleKeep: (item: KeepsakeItem) => void;
};

export function FactGlowScreen({ isKept, toggleKeep }: FactGlowScreenProps) {
  return (
    <Stage title="Fun facts">
      <PinkyNote message="Funny facts that will cheer you up!" />
      <View style={styles.list}>
        {funFacts.map((fact, index) => {
          const id = `fact:${index}`;
          return (
            <View key={id} style={styles.card}>
              <View style={styles.heartPlace}>
                <SaveHeart
                  active={isKept(id)}
                  onPress={() =>
                    toggleKeep({
                      id,
                      kind: 'fact',
                      title: 'Fun fact',
                      body: fact,
                      accent: 'pink',
                      createdAt: Date.now(),
                    })
                  }
                />
              </View>
              <Text style={styles.text}>{fact}</Text>
              <View style={styles.shareWrap}>
                <ShareButton message={fact} />
              </View>
            </View>
          );
        })}
      </View>
    </Stage>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
    marginTop: 16,
  },
  card: {
    minHeight: 104,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    paddingHorizontal: 26,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  heartPlace: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
  },
  text: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    paddingRight: 28,
  },
  shareWrap: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
});
