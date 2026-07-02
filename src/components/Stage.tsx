import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gallery } from '../assets/gallery';
import { palette } from '../theme/palette';

type StageProps = {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  onBack?: () => void;
  scroll?: boolean;
  title?: string;
};

export function useStageChrome() {
  const insets = useSafeAreaInsets();
  const top = Platform.OS === 'android' ? insets.top + 30 : Math.max(insets.top + 12, 26);
  const dockBottom = Platform.OS === 'android' ? insets.bottom + 30 : insets.bottom + 20;
  const dockHeight = 78;

  return {
    top,
    dockBottom,
    dockHeight,
    contentBottom: dockBottom + dockHeight + 28,
  };
}

export function Stage({ children, contentStyle, onBack, scroll = true, title }: StageProps) {
  const chrome = useStageChrome();
  const appear = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const titleSize = Math.min(32, Math.max(26, width * 0.075));
  const content = [
    styles.content,
    {
      paddingTop: chrome.top,
      paddingBottom: chrome.contentBottom,
    },
    contentStyle,
  ];
  const appearStyle = {
    opacity: appear,
    transform: [
      {
        translateY: appear.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 340,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [appear]);

  return (
    <ImageBackground resizeMode="cover" source={gallery.plumCurtain} style={styles.fill}>
      {scroll ? (
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollFill}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[content, appearStyle]}>
            {title ? <StageHeader onBack={onBack} title={title} titleSize={titleSize} /> : null}
            {children}
          </Animated.View>
        </ScrollView>
      ) : (
        <Animated.View style={[content, appearStyle]}>
          {title ? <StageHeader onBack={onBack} title={title} titleSize={titleSize} /> : null}
          {children}
        </Animated.View>
      )}
    </ImageBackground>
  );
}

function StageHeader({
  onBack,
  title,
  titleSize,
}: {
  onBack?: () => void;
  title: string;
  titleSize: number;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.backSlot}>
        {onBack ? (
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        ) : null}
      </View>
      <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.heading, { fontSize: titleSize }]}>
        {title}
      </Text>
      <View style={styles.backSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: palette.deepPlum,
  },
  scrollFill: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backSlot: {
    width: 44,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: palette.white,
    fontSize: 38,
    lineHeight: 38,
    fontWeight: '400',
  },
  heading: {
    flex: 1,
    color: palette.white,
    fontWeight: '900',
    textAlign: 'center',
  },
});
