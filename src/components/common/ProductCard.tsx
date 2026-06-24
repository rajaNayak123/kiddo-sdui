import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product } from '../../types';
import { handleAction } from '../../dispatcher/actionDispatcher';
import { useProductCartCount, useCartActions } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - 48) / 2;

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const theme = useTheme();
  const count = useProductCartCount(product.id);
  const { addToCart, removeFromCart } = useCartActions();

  const onAddToCart = useCallback(() => {
    handleAction(product.action, {
      addToCart,
      productMeta: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    });
  }, [product, addToCart]);

  const onDecrement = useCallback(() => {
    removeFromCart(product.id);
  }, [product.id, removeFromCart]);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface ?? '#FFFFFF' }]}>
      {product.badge ? (
        <View style={[styles.badge, { backgroundColor: theme.primary }]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      ) : null}

      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {product.rating != null ? (
          <Text style={styles.rating}>⭐ {product.rating}</Text>
        ) : null}

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.primary }]}>
            ₹{product.price}
          </Text>
          {product.originalPrice ? (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          ) : null}
          {discount ? (
            <Text style={[styles.discount, { color: theme.accent ?? '#4ECDC4' }]}>
              {discount}% off
            </Text>
          ) : null}
        </View>

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
              onPress={onAddToCart}
              style={[styles.qtyBtn, { backgroundColor: theme.primary }]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
            onPress={onAddToCart}
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
    width: CARD_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 130,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 3,
    lineHeight: 18,
  },
  rating: {
    fontSize: 11,
    color: '#888',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: 12,
    color: '#AAA',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 11,
    fontWeight: '700',
  },
  addBtn: {
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  qtyBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  qtyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  qtyCount: {
    fontSize: 14,
    fontWeight: '800',
    minWidth: 24,
    textAlign: 'center',
  },
});

export default memo(ProductCard);
