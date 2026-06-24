import React, { useEffect, useRef, memo } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const COLORS = ['#FF6B9D', '#FFD700', '#FF4500', '#4ECDC4', '#A855F7', '#FFB347', '#00BCD4'];
const NUM_PIECES = 32;

interface PieceConfig {
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  startRotation: number;
}

const pieceConfigs: PieceConfig[] = Array.from({ length: NUM_PIECES }, (_, i) => ({
  x: (W / NUM_PIECES) * i + Math.random() * (W / NUM_PIECES),
  color: COLORS[i % COLORS.length] ?? '#FF6B9D',
  size: 8 + Math.random() * 8,
  duration: 2600 + Math.random() * 1800,
  delay: Math.random() * 2200,
  startRotation: Math.random() * 360,
}));

interface PieceProps extends PieceConfig {}

const ConfettiPiece = memo(({ x, color, size, duration, delay, startRotation }: PieceProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const run = () => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => run());
    };
    run();
    return () => anim.stopAnimation();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-20, H + 20] });
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [`${startRotation}deg`, `${startRotation + 720}deg`],
  });
  const opacity = anim.interpolate({ inputRange: [0, 0.08, 0.88, 1], outputRange: [0, 1, 1, 0] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: x,
        width: size,
        height: size * 0.5,
        backgroundColor: color,
        borderRadius: 2,
        opacity,
        transform: [{ translateY }, { rotate }],
      }}
    />
  );
});

const ConfettiOverlay = () => (
  <View
    style={styles.container}
    pointerEvents="none"
  >
    {pieceConfigs.map((p, i) => (
      <ConfettiPiece key={i} {...p} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
    overflow: 'hidden',
  },
});

export default memo(ConfettiOverlay);
