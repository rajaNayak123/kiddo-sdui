import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Campaign } from '../../types';
import ConfettiOverlay from './ConfettiOverlay';

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
  campaign: Campaign;
}


const CampaignOverlay = ({ campaign }: Props) => {
  switch (campaign.overlayType) {

    case 'confetti':
      return <ConfettiOverlay />;

    case 'lottie':
      if (!LottieView) {
        return (
          <View style={styles.fill} pointerEvents="none">
            <View style={styles.lottieFallback}>
              <Text style={styles.fallbackText}>
                ✏️ ✈️ 📚  Back to School!
              </Text>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.fill} pointerEvents="none">
          <LottieView
            source={{ uri: campaign.overlayAnimationUrl }}
            autoPlay
            loop
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            cacheComposition
          />
        </View>
      );

    case 'webp':
      return (
        <View style={styles.fill} pointerEvents="none">
          <Image
            source={{ uri: campaign.overlayAnimationUrl }}
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
    zIndex: 999,
    elevation: 999,
  },
  lottieFallback: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,214,0,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,214,0,0.5)',
  },
  fallbackText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
});

export default memo(CampaignOverlay);
