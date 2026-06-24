import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { BannerHeroBlock, AnyBlock } from '../../types';
import { handleAction } from '../../dispatcher/actionDispatcher';
import { useTheme } from '../../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  block: AnyBlock;
}

const BannerHero = ({ block }: Props) => {
  const data = block as BannerHeroBlock;
  const theme = useTheme();

  const onPress = useCallback(() => {
    handleAction(data.action);
  }, [data.action]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: data.backgroundColor ?? theme.background },
      ]}
    >
      <Image
        source={{ uri: data.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
        {data.subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {data.subtitle}
          </Text>
        ) : null}
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: theme.primary }]}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>{data.ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 200,
    marginBottom: 12,
    overflow: 'hidden',
    borderRadius: 16,
    marginHorizontal: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.32)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default memo(BannerHero);
