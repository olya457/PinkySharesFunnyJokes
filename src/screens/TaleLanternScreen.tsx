import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { SaveHeart } from '../components/SaveHeart';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { tales } from '../data/giggleAtlas';
import { KeepsakeItem } from '../storage/keepsakeStore';
import { useCompactLayout } from '../theme/layout';
import { palette, round } from '../theme/palette';

type TaleLanternScreenProps = {
  isKept: (id: string) => boolean;
  toggleKeep: (item: KeepsakeItem) => void;
};

export function TaleLanternScreen({ isKept, toggleKeep }: TaleLanternScreenProps) {
  const [index, setIndex] = useState(0);
  const compact = useCompactLayout();
  const tale = tales[index];
  const id = `story:${tale.id}`;
  const message = useMemo(() => `${tale.title}\n\n${tale.body}`, [tale]);

  const keepItem: KeepsakeItem = {
    id,
    kind: 'story',
    title: tale.title,
    body: tale.body,
    accent: 'pink',
    createdAt: Date.now(),
  };

  return (
    <Stage title="Stories">
      <View style={[styles.hero, compact.isShort && styles.compactHero]}>
        <View style={styles.heroCopy}>
          <Text style={styles.counter}>{`Story ${index + 1} of ${tales.length}`}</Text>
        </View>
        <Image
          resizeMode="contain"
          source={gallery.pinkySpark}
          style={[styles.pinky, compact.isShort && styles.compactPinky]}
        />
      </View>
      <View style={[styles.storyCard, compact.isShort && styles.compactStoryCard]}>
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.storyTitle}>
          {tale.title}
        </Text>
        <Text style={styles.storyText}>{tale.body}</Text>
        <View style={[styles.storyActions, compact.isShort && styles.compactStoryActions]}>
          <ActionButton
            disabled={index === 0}
            onPress={() => setIndex(current => Math.max(0, current - 1))}
            style={styles.smallButton}
            title="Back"
          />
          <SaveHeart active={isKept(id)} onPress={() => toggleKeep(keepItem)} />
          <ShareButton message={message} />
          <ActionButton
            onPress={() => setIndex(current => (current + 1) % tales.length)}
            style={styles.smallButton}
            title="Next"
          />
        </View>
      </View>
    </Stage>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 120,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 8,
  },
  compactHero: {
    minHeight: 92,
    marginBottom: 2,
  },
  heroCopy: {
    alignItems: 'center',
    marginTop: 10,
    marginRight: -18,
    zIndex: 2,
  },
  compactPinky: {
    width: 102,
    height: 104,
  },
  counter: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '800',
    backgroundColor: '#ffb331',
    borderWidth: 4,
    borderColor: palette.white,
    borderRadius: round.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  compactStoryCard: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  pinky: {
    width: 126,
    height: 128,
  },
  compactStoryActions: {
    marginTop: 14,
    gap: 8,
  },
  storyCard: {
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  storyTitle: {
    color: palette.ink,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  storyText: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  storyActions: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  smallButton: {
    minHeight: 44,
    width: 92,
    paddingHorizontal: 8,
  },
});
