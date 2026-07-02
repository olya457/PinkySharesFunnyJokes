import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Stage } from '../components/Stage';
import { PinkyNote } from '../components/PinkyNote';
import { SaveHeart } from '../components/SaveHeart';
import { ShareButton } from '../components/ShareButton';
import { giggleCategories, GiggleCategory } from '../data/giggleAtlas';
import { KeepsakeItem } from '../storage/keepsakeStore';
import { palette, round } from '../theme/palette';

type QuipHarborScreenProps = {
  isKept: (id: string) => boolean;
  toggleKeep: (item: KeepsakeItem) => void;
};

const tint = {
  pink: { card: palette.blush, button: palette.rose, border: palette.blushLine },
  yellow: { card: palette.banana, button: '#ffb331', border: '#fff0bd' },
  violet: { card: palette.grape, button: '#db55f6', border: '#ffd2ff' },
};

export function QuipHarborScreen({ isKept, toggleKeep }: QuipHarborScreenProps) {
  const [categoryId, setCategoryId] = useState<GiggleCategory['id'] | null>(null);
  const category = useMemo(
    () => giggleCategories.find(item => item.id === categoryId),
    [categoryId],
  );

  if (category) {
    return (
      <Stage onBack={() => setCategoryId(null)} title={category.title}>
        <Image resizeMode="contain" source={category.image} style={styles.detailArt} />
        <View style={styles.list}>
          {category.jokes.map((joke, index) => {
            const id = `joke:${category.id}:${index}`;
            return (
              <JokeCard
                accent={category.palette}
                index={index}
                isKept={isKept(id)}
                joke={joke}
                key={id}
                onToggle={() =>
                  toggleKeep({
                    id,
                    kind: 'joke',
                    title: category.title,
                    body: joke,
                    accent: category.palette,
                    createdAt: Date.now(),
                  })
                }
              />
            );
          })}
        </View>
      </Stage>
    );
  }

  return (
    <Stage title="Jokes">
      <PinkyNote message="Choose a category and start laughing!" />
      <View style={styles.cards}>
        {giggleCategories.map(categoryItem => (
          <Pressable
            accessibilityRole="button"
            key={categoryItem.id}
            onPress={() => setCategoryId(categoryItem.id)}
            style={({ pressed }) => [
              styles.categoryCard,
              {
                backgroundColor: tint[categoryItem.palette].card,
                borderColor: tint[categoryItem.palette].border,
              },
              pressed && styles.pressed,
            ]}
          >
            <Image resizeMode="contain" source={categoryItem.image} style={styles.categoryImage} />
            <View style={styles.categoryCopy}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.categoryTitle}>
                {categoryItem.title}
              </Text>
              <Text numberOfLines={3} style={styles.categoryText}>
                {categoryItem.description}
              </Text>
            </View>
            <View style={[styles.categoryArrow, { backgroundColor: tint[categoryItem.palette].button }]}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Stage>
  );
}

function JokeCard({
  accent,
  index,
  isKept,
  joke,
  onToggle,
}: {
  accent: GiggleCategory['palette'];
  index: number;
  isKept: boolean;
  joke: string;
  onToggle: () => void;
}) {
  return (
    <View
      style={[
        styles.jokeCard,
        {
          backgroundColor: tint[accent].card,
          borderColor: tint[accent].border,
        },
      ]}
    >
      <View style={styles.heartPlace}>
        <SaveHeart active={isKept} onPress={onToggle} />
      </View>
      <Text style={styles.jokeText}>{`${index + 1}. ${joke}`}</Text>
      <View style={styles.shareRow}>
        <ShareButton message={joke} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 14,
    marginTop: 16,
  },
  categoryCard: {
    minHeight: 106,
    borderRadius: round.panel,
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  categoryImage: {
    width: 118,
    height: 86,
    marginRight: 10,
  },
  categoryCopy: {
    flex: 1,
    paddingRight: 10,
  },
  categoryTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  categoryText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  categoryArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: palette.white,
    fontSize: 31,
    lineHeight: 30,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  detailArt: {
    alignSelf: 'center',
    width: 220,
    height: 140,
    marginBottom: 8,
  },
  list: {
    gap: 14,
  },
  jokeCard: {
    minHeight: 86,
    borderRadius: round.panel,
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  heartPlace: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
  },
  jokeText: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    paddingRight: 36,
  },
  shareRow: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
});
