import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CollectionItem as CollectionItemType } from '../../types';
import { handleAction } from '../../dispatcher/actionDispatcher';
import { useProductCartCount, useCartActions } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  item: CollectionItemType;
}

const CollectionItemCard = ({ item }: Props) => {
  const theme = useTheme();
  const count = useProductCartCount(item.id);
  const { addToCart, removeFromCart } = useCartActions();

  const onPress = useCallback(() => {
    handleAction(item.action, {
      addToCart,
      productMeta: {
        id: item.id,
        name: item.title,
        price: item.price ?? 0,
        imageUrl: item.imageUrl,
      },
    });
  }, [item, addToCart]);

  const onDecrement = useCallback(() => {
    removeFromCart(item.id);
  }, [item.id, removeFromCart]);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface ?? '#FFFFFF' }]}>
      {item.badge ? (
        <View style={[styles.badge, { backgroundColor: theme.primary }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      ) : null}

      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {item.price != null ? (
          <Text style={[styles.price, { color: theme.primary }]}>
            ₹{item.price}
          </Text>
        ) : null}

        {count > 0 ? (
          <View style={[styles.qtyRow, { borderColor: theme.primary }]}>
            <TouchableOpacity
              onPress={onDecrement}
              style={[styles.qtyBtn, { backgroundColor: theme.primary }]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={[styles.qtyCount, { color: theme.primary }]}>{count}</Text>
            <TouchableOpacity
              onPress={onPress}
              style={[styles.qtyBtn, { backgroundColor: theme.primary }]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
            onPress={onPress}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 110,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 4,
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  addBtn: {
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  qtyBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  qtyCount: {
    fontSize: 13,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default memo(CollectionItemCard);
