import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { gallery } from '../assets/gallery';
import { ActionButton } from '../components/ActionButton';
import { PinkyNote } from '../components/PinkyNote';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { nicknamePool } from '../data/giggleAtlas';
import { useCompactLayout } from '../theme/layout';
import { palette, round } from '../theme/palette';

type MoodId = 'happy' | 'calm' | 'stormy';

const moods: Array<{ id: MoodId; emoji: string; label: string }> = [
  { id: 'happy', emoji: '😄', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'stormy', emoji: '🌩️', label: 'Grumpy' },
];

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const nameLimit = 20;

export function NameFountainScreen() {
  const [name, setName] = useState('');
  const [mood, setMood] = useState<MoodId | null>(null);
  const [nickname, setNickname] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const compact = useCompactLayout();
  const cleanName = name.trim();
  const ready = cleanName.length > 0 && mood !== null;
  const shareMessage = cleanName ? `${cleanName}'s funny nickname is ${nickname}.` : `My funny nickname is ${nickname}.`;

  const selectedMoodIndex = useMemo(
    () => Math.max(0, moods.findIndex(item => item.id === mood)),
    [mood],
  );

  const generate = () => {
    setKeyboardVisible(false);
    const score = cleanName
      .toLowerCase()
      .split('')
      .reduce((sum, letter) => sum + letter.charCodeAt(0), selectedMoodIndex * 7);
    setNickname(nicknamePool[score % nicknamePool.length]);
  };

  const addNameLetter = (letter: string) => {
    setName(current => {
      if (current.length >= nameLimit) {
        return current;
      }

      const nextLetter =
        current.length === 0 || current.endsWith(' ')
          ? letter
          : letter.toLowerCase();
      return `${current}${nextLetter}`;
    });
  };

  const addNameSpace = () => {
    setName(current => {
      if (!current || current.endsWith(' ') || current.length >= nameLimit) {
        return current;
      }

      return `${current} `;
    });
  };

  const removeNameLetter = () => {
    setName(current => current.slice(0, -1));
  };

  if (nickname) {
    return (
      <Stage onBack={() => setNickname('')} title="Results">
        <Image
          resizeMode="contain"
          source={gallery.pinkyTilt}
          style={[styles.resultArt, compact.isShort && styles.compactResultArt]}
        />
        <View style={[styles.resultCard, compact.isShort && styles.compactResultCard]}>
          <Text style={styles.resultTitle}>Your nickname:</Text>
          <View style={styles.nickPill}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.nickText}>
              {nickname}
            </Text>
          </View>
          <ShareButton message={shareMessage} />
        </View>
        <ActionButton
          onPress={() => setNickname('')}
          style={[styles.mainButton, compact.isShort && styles.compactMainButton]}
          title="Generate again"
        />
      </Stage>
    );
  }

  return (
    <Stage title="Nickname Generator">
      <PinkyNote message="Let's come up with a funny nickname for you!" />
      <View style={[styles.inputCard, compact.isShort && styles.compactInputCard]}>
        <Text style={styles.sectionTitle}>Enter your name</Text>
        <TextInput
          autoCapitalize="words"
          caretHidden={keyboardVisible}
          contextMenuHidden
          onChangeText={setName}
          onFocus={() => setKeyboardVisible(true)}
          onPressIn={() => setKeyboardVisible(true)}
          placeholder="Write here..."
          placeholderTextColor="rgba(42,0,28,0.45)"
          returnKeyType="done"
          showSoftInputOnFocus={false}
          style={styles.input}
          value={name}
        />
        <NameKeyboard
          onBackspace={removeNameLetter}
          onDone={() => setKeyboardVisible(false)}
          onLetter={addNameLetter}
          onSpace={addNameSpace}
          visible={keyboardVisible}
        />
      </View>
      <View style={[styles.moodCard, compact.isShort && styles.compactMoodCard]}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <View style={styles.moods}>
          {moods.map(item => {
            const selected = mood === item.id;
            return (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                onPress={() => setMood(item.id)}
                style={[styles.moodButton, compact.isShort && styles.compactMoodButton, selected && styles.moodSelected]}
              >
                <Text style={styles.moodEmoji}>{item.emoji}</Text>
                <Text style={styles.moodLabel}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <ActionButton
        disabled={!ready}
        onPress={generate}
        style={[styles.mainButton, compact.isShort && styles.compactMainButton]}
        title="Generate Nickname"
      />
    </Stage>
  );
}

function NameKeyboard({
  onBackspace,
  onDone,
  onLetter,
  onSpace,
  visible,
}: {
  onBackspace: () => void;
  onDone: () => void;
  onLetter: (letter: string) => void;
  onSpace: () => void;
  visible: boolean;
}) {
  const motion = useRef(new Animated.Value(0)).current;
  const compact = useCompactLayout();

  useEffect(() => {
    Animated.timing(motion, {
      toValue: visible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [motion, visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.keyboard,
        {
          maxHeight: motion.interpolate({
            inputRange: [0, 1],
            outputRange: [0, compact.isShort ? 154 : 188],
          }),
          marginTop: motion.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10],
          }),
          opacity: motion,
          transform: [
            {
              translateY: motion.interpolate({
                inputRange: [0, 1],
                outputRange: [-8, 0],
              }),
            },
          ],
        },
      ]}
    >
      {keyboardRows.map((row, rowIndex) => (
        <View
          key={row}
          style={[
            styles.keyRow,
            compact.isShort && styles.compactKeyRow,
            rowIndex === 2 && styles.shortKeyRow,
            compact.isTiny && rowIndex === 2 && styles.tinyShortKeyRow,
          ]}
        >
          {row.split('').map(letter => (
            <KeyboardKey compact={compact.isShort} key={letter} label={letter} onPress={() => onLetter(letter)} />
          ))}
        </View>
      ))}
      <View style={[styles.commandRow, compact.isShort && styles.compactCommandRow]}>
        <KeyboardKey compact={compact.isShort} label="⌫" onPress={onBackspace} wide />
        <KeyboardKey compact={compact.isShort} label="Space" onPress={onSpace} grow />
        <KeyboardKey compact={compact.isShort} label="Done" onPress={onDone} wide />
      </View>
    </Animated.View>
  );
}

function KeyboardKey({
  compact,
  grow,
  label,
  onPress,
  wide,
}: {
  compact: boolean;
  grow?: boolean;
  label: string;
  onPress: () => void;
  wide?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.key,
        compact && styles.compactKey,
        wide && styles.wideKey,
        grow && styles.growKey,
        pressed && styles.keyPressed,
      ]}
    >
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.keyText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    marginTop: 16,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    padding: 14,
  },
  compactInputCard: {
    marginTop: 12,
    padding: 11,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  input: {
    minHeight: 54,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blushSoft,
    color: palette.ink,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  keyboard: {
    overflow: 'hidden',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 6,
  },
  compactKeyRow: {
    gap: 3,
    marginBottom: 5,
  },
  shortKeyRow: {
    paddingHorizontal: 24,
  },
  tinyShortKeyRow: {
    paddingHorizontal: 14,
  },
  commandRow: {
    flexDirection: 'row',
    gap: 6,
  },
  compactCommandRow: {
    gap: 5,
  },
  key: {
    flex: 1,
    minHeight: 34,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: palette.blushLine,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    shadowColor: palette.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  compactKey: {
    minHeight: 29,
    borderWidth: 1,
  },
  wideKey: {
    flex: 1.25,
  },
  compactMoodCard: {
    marginTop: 14,
    padding: 11,
  },
  growKey: {
    flex: 2.8,
  },
  compactMoodButton: {
    minHeight: 88,
  },
  keyPressed: {
    backgroundColor: palette.rose,
    borderColor: palette.roseDark,
    transform: [{ scale: 0.96 }],
  },
  keyText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '900',
  },
  moodCard: {
    marginTop: 24,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    padding: 14,
  },
  moods: {
    flexDirection: 'row',
    gap: 14,
  },
  moodButton: {
    flex: 1,
    minHeight: 116,
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blushSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  moodSelected: {
    borderColor: palette.roseDark,
  },
  moodEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  moodLabel: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '600',
  },
  mainButton: {
    alignSelf: 'center',
    width: '86%',
    marginTop: 22,
  },
  compactMainButton: {
    marginTop: 14,
  },
  resultArt: {
    alignSelf: 'center',
    width: 270,
    height: 260,
    marginTop: 18,
    marginBottom: -4,
  },
  compactResultArt: {
    width: 214,
    height: 208,
    marginTop: 4,
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
  compactResultCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  resultTitle: {
    color: palette.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 14,
  },
  nickPill: {
    minHeight: 54,
    width: '86%',
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blushSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  nickText: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '600',
  },
});
