import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolateColor,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.8;
const SWIPE_WIDTH = BUTTON_WIDTH - 60;

export default function SwipeButton({ onSwipeSuccess }) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const newX = Math.min(
        Math.max(ctx.startX + event.translationX, 0),
        SWIPE_WIDTH,
      );
      translateX.value = newX;
    },
    onEnd: () => {
      if (translateX.value > SWIPE_WIDTH * 0.9) {
        translateX.value = withSpring(SWIPE_WIDTH, {}, () => {
          runOnJS(onSwipeSuccess)();
          translateX.value = withSpring(0);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  // Fills the slider track based on swipe
  const trackFillStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + 50, // slightly more than knob size for better fill look
    };
  });

  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Slide to Continue</Text>
      <View style={styles.swipeTrack}>
        {/* Track fill (under knob) */}
        <Animated.View style={[styles.trackFill, trackFillStyle]} />

        {/* Swipe knob */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.swipeButton, knobStyle]}>
            <Text style={styles.arrow}>➡️</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#444',
  },
  swipeTrack: {
    width: BUTTON_WIDTH,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  trackFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 30,
    zIndex: 0,
    left: 0,
  },
  swipeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  arrow: {
    fontSize: 20,
    color: '#fff',
  },
});
