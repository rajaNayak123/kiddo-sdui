import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import { AnyBlock } from '../types';
import { resolveBlockComponent } from '../registry/componentRegistry';
import { useTheme } from '../context/ThemeContext';
import { useCampaign } from '../context/CampaignContext';
import CampaignOverlay from './overlay/CampaignOverlay';
import CampaignSwitcher from './common/CampaignSwitcher';
import CartIcon from './common/CartIcon';

interface BlockRendererProps {
  block: AnyBlock;
}

const BlockRenderer = memo(({ block }: BlockRendererProps) => {
  const Component = resolveBlockComponent(block.type);
  if (!Component) return null;
  return <Component block={block} />;
});


const keyExtractor = (block: AnyBlock) => block.id;

const ItemSeparator = memo(() => <View style={styles.separator} />);

const renderItem = ({ item }: ListRenderItemInfo<AnyBlock>) => (
  <BlockRenderer block={item} />
);


const ListHeader = memo(() => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.primary }]}>
      <Text style={styles.headerLogo}>kiddo 🐣</Text>
      <CartIcon />
    </View>
  );
});


interface Props {
  blocks: AnyBlock[];
}

const SDUIRenderer = ({ blocks }: Props) => {
  const theme = useTheme();
  const { activeCampaign } = useCampaign();

  const validatedBlocks = useMemo(() => blocks.filter(Boolean), [blocks]);

  const ListHeaderComponent = useCallback(() => (
    <>
      <ListHeader />
      <CampaignSwitcher />
    </>
  ), []);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      <FlatList<AnyBlock>
        data={validatedBlocks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nothing to show yet 🐣</Text>
          </View>
        }
      />

      {activeCampaign ? <CampaignOverlay campaign={activeCampaign} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  listContent: { paddingBottom: 40 },
  separator: { height: 4 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  headerLogo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: { fontSize: 16, color: '#AAA' },
});

export default memo(SDUIRenderer);
