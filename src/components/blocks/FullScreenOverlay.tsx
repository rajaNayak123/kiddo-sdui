import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions, Easing, Text } from 'react-native';
import { Image } from 'expo-image';
import { AnyBlock, FullScreenOverlayBlock } from '../../types';
import { useCampaign } from '../../context/CampaignContext';
import ConfettiOverlay from '../overlay/ConfettiOverlay';

let LottieView: React.ComponentType<{
  source: { uri: string } | number;
  autoPlay: boolean;
  loop: boolean;
  style: object;
  resizeMode?: 'cover' | 'contain' | 'center';
  cacheComposition?: boolean;
}> | null = null;

try {
  LottieView = require('lottie-react-native').default;
} catch {
  LottieView = null;
}

interface Props {
  block: AnyBlock;
}

const FullScreenOverlay = ({ block }: Props) => {
  const data = block as FullScreenOverlayBlock;
  const { activeCampaign } = useCampaign();

  const resolveType = (): 'lottie' | 'webp' | 'confetti' => {
    if (data.overlay_type) return data.overlay_type;
    if (activeCampaign?.overlayType) return activeCampaign.overlayType;
    const url = data.animation_url ?? '';
    if (url.endsWith('.json')) return 'lottie';
    if (url.endsWith('.webp')) return 'webp';
    return 'confetti';
  };

  const type = resolveType();
  const url = data.animation_url ?? activeCampaign?.overlayAnimationUrl ?? '';

  switch (type) {
    case 'confetti':
      return <ConfettiOverlay />;

    case 'lottie':
      if (!LottieView || !url) {
        return (
          <View style={styles.fill} pointerEvents="none">
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✏️ ✈️ 📚</Text>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.fill} pointerEvents="none">
          <LottieView
            source={{ uri: url }}
            autoPlay
            loop
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            cacheComposition
          />
        </View>
      );

    case 'webp':
      if (!url) return null;
      return (
        <View style={styles.fill} pointerEvents="none">
          <Image
            source={{ uri: url }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            cachePolicy="memory-disk"
            autoplay
            transition={300}
          />
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 998,
    elevation: 998,
  },
  badge: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  badgeText: { fontSize: 20 },
});

export default memo(FullScreenOverlay);
