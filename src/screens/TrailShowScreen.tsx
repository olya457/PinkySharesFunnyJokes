import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { useCompactLayout } from '../theme/layout';
import { palette, round } from '../theme/palette';

type TrailShowScreenProps = {
  onDone: () => void;
};

const slides = [
  {
    image: gallery.pinkySpark,
    title: "Hello, I'm Pinky!",
    body: "I'm your funny friend. Here we'll laugh together, discover funny stories and find jokes that will definitely lift your spirits.",
    button: 'Hello!',
  },
  {
    image: gallery.storybookBubbles,
    title: 'Jokes for any mood',
    body: "Choose a category or trust the chance. I'll always have a joke that will make you smile.",
    button: 'Next',
  },
  {
    image: gallery.scrollGiggle,
    title: 'Even more fun',
    body: 'Read funny stories, discover funny facts, and try to finish the joke faster than I can.',
    button: 'Continue',
  },
  {
    image: gallery.nametagStar,
    title: 'Create your funny nickname',
    body: "Enter your name, choose a character, and I'll come up with a good, cute and unique nickname for you.",
    button: 'Cool!',
  },
  {
    image: gallery.keeperFolder,
    title: 'Your favorites are always there',
    body: 'Save your best jokes and stories to come back to them anytime. So, ready to laugh with me?',
    button: 'Always ready!',
  },
];

export function TrailShowScreen({ onDone }: TrailShowScreenProps) {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const compact = useCompactLayout();
  const { height, width } = useWindowDimensions();
  const slide = slides[index];
  const top = Platform.OS === 'android' ? insets.top + 30 : Math.max(insets.top + 12, 26);
  const bottom = Platform.OS === 'android' ? insets.bottom + 30 : insets.bottom + 20;
  const artSize = useMemo(
    () => Math.min(width * (compact.isTiny ? 0.66 : 0.82), Math.max(compact.isTiny ? 168 : 205, height * (compact.isShort ? 0.3 : 0.38))),
    [compact.isShort, compact.isTiny, height, width],
  );
  const last = index === slides.length - 1;

  const next = () => {
    if (last) {
      onDone();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <ImageBackground resizeMode="cover" source={gallery.plumCurtain} style={styles.fill}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: compact.isShort ? Math.max(top - 10, 14) : top,
            paddingBottom: bottom + (compact.isTiny ? 10 : 16),
            paddingHorizontal: compact.gutter,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.artWrap, compact.isShort && styles.compactArtWrap]}>
          <Image resizeMode="contain" source={slide.image} style={{ width: artSize, height: artSize }} />
        </View>
        <View style={[styles.copyCard, compact.isShort && styles.compactCopyCard]}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.copyTitle}>
            {slide.title}
          </Text>
          <Text style={styles.copyText}>{slide.body}</Text>
        </View>
        <ActionButton
          onPress={next}
          style={[styles.button, compact.isShort && styles.compactButton]}
          title={slide.button}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: palette.deepPlum,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  artWrap: {
    flex: 1,
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactArtWrap: {
    minHeight: 178,
  },
  copyCard: {
    borderRadius: round.panel,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.nightGlass,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginBottom: 20,
  },
  compactCopyCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
  },
  copyTitle: {
    color: palette.white,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  copyText: {
    color: palette.white,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '60%',
    minWidth: 210,
  },
  compactButton: {
    width: '68%',
    minWidth: 184,
  },
});
