import React, { memo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { DynamicCollectionBlock, AnyBlock, CollectionItem } from '../../types';
import CollectionItemCard from '../common/CollectionItemCard';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  block: AnyBlock;
}

const renderCollectionItem = ({ item }: ListRenderItemInfo<CollectionItem>) => (
  <CollectionItemCard item={item} />
);

const keyExtractor = (item: CollectionItem) => item.id;

const getItemLayout = (_: unknown, index: number) => ({
  length: 150,
  offset: 150 * index,
  index,
});

const DynamicCollection = ({ block }: Props) => {
  const data = block as DynamicCollectionBlock;
  const theme = useTheme();

  const isHorizontalScrolling = useRef(false);

  const onScrollBeginDrag = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isHorizontalScrolling.current = true;
    },
    [],
  );

  const onScrollEndDrag = useCallback(
    (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isHorizontalScrolling.current = false;
    },
    [],
  );

  if (!data.items?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text ?? '#1A1A2E' }]}>
        {data.title}
      </Text>
      <FlatList<CollectionItem>
        data={data.items}
        renderItem={renderCollectionItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        getItemLayout={getItemLayout}
        directionalLockEnabled
        removeClippedSubviews={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 16,
    letterSpacing: -0.2,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});

export default memo(DynamicCollection);
