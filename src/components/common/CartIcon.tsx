import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCartState } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const CartIcon = () => {
  const { totalCount } = useCartState();
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Text style={styles.icon}>🛒</Text>
      {totalCount > 0 ? (
        <View style={[styles.badge, { backgroundColor: theme.primary }]}>
          <Text style={styles.badgeText}>{totalCount > 99 ? '99+' : totalCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    padding: 4,
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default memo(CartIcon);
