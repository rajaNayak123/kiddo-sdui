import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductGridBlock, AnyBlock } from '../../types';
import ProductCard from '../common/ProductCard';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  block: AnyBlock;
}

const ProductGrid2x2 = ({ block }: Props) => {
  const data = block as ProductGridBlock;
  const theme = useTheme();

  if (!data.products?.length) return null;

  const rows: typeof data.products[] = [];
  for (let i = 0; i < data.products.length; i += 2) {
    rows.push(data.products.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text ?? '#1A1A2E' }]}>
        {data.title}
      </Text>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {row.length < 2 ? <View style={styles.filler} /> : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  filler: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default memo(ProductGrid2x2);
