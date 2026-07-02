import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gallery } from '../assets/gallery';

type GlowGateScreenProps = {
  onDone: () => void;
};

const loaderHtml = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progress {
        background-color: #ffffff;
        width: 220px;
        height: 20px;
        overflow: hidden;
        backface-visibility: hidden;
        transform: skew(150deg);
      }
      .inner {
        background-image: linear-gradient(to right bottom, #1d2671, #4b2776, #6d2677, #8c2674, #a62a6f, #a73071, #a93572, #aa3a74, #943e7b, #7c417e, #65437c, #4e4376);
        height: 100%;
        transform-origin: left;
        transform: skew(-150deg);
        animation: progress 1.8s infinite;
      }
      @keyframes progress {
        0% {
          transform: scaleX(10%) translateX(-10%);
        }
        100% {
          transform: scaleX(90%) translateX(150%);
        }
      }
    </style>
  </head>
  <body>
    <div class="progress"><div class="inner"></div></div>
  </body>
</html>`;

export function GlowGateScreen({ onDone }: GlowGateScreenProps) {
  const insets = useSafeAreaInsets();
  const logoMotion = useRef(new Animated.Value(0)).current;
  const loaderBottom = Platform.OS === 'android' ? insets.bottom + 30 : insets.bottom + 20;

  useEffect(() => {
    const timer = setTimeout(onDone, 5000);
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(logoMotion, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(logoMotion, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    floatLoop.start();

    return () => {
      clearTimeout(timer);
      floatLoop.stop();
    };
  }, [logoMotion, onDone]);

  return (
    <ImageBackground resizeMode="cover" source={gallery.sunriseField} style={styles.fill}>
      <View style={styles.center}>
        <Animated.Image
          resizeMode="contain"
          source={gallery.pinkyOrbit}
          style={[
            styles.logo,
            {
              transform: [
                {
                  translateY: logoMotion.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
                {
                  scale: logoMotion.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.035],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ html: loaderHtml }}
        style={[styles.web, { bottom: loaderBottom }]}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#f0387a',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    transform: [{ translateY: 52 }],
  },
  logo: {
    width: 250,
    height: 250,
    maxWidth: '76%',
  },
  web: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: 'transparent',
  },
});
