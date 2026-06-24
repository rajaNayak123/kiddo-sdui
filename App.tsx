import React, { useMemo } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { CampaignProvider, useCampaign } from './src/context/CampaignContext';
import SDUIRenderer from './src/components/SDUIRenderer';
import { useSDUIPayload } from './src/hooks/useSDUIPayload';
import { NO_CAMPAIGN_THEME } from './src/data/campaigns';
import { ThemeConfig } from './src/types';
const AppInner = () => {
  const { payload, blocks, isLoading, error, refresh } = useSDUIPayload();
  const { activeCampaign } = useCampaign();

  const activeTheme: ThemeConfig = useMemo(() => {
    if (activeCampaign) return activeCampaign.theme;
    if (payload?.theme) return payload.theme;
    return NO_CAMPAIGN_THEME;
  }, [activeCampaign, payload?.theme]);

  if (isLoading) {
    return (
      <ThemeProvider theme={NO_CAMPAIGN_THEME}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF6B9D" />
          <Text style={styles.loadingText}>Loading kiddo...</Text>
        </View>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={NO_CAMPAIGN_THEME}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>⚠️ Failed to load</Text>
          <Text style={styles.errorSub}>{error}</Text>
          <TouchableOpacity onPress={refresh} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <SDUIRenderer blocks={blocks} />
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <CartProvider>
      <CampaignProvider initialCampaign={null}>
        <AppInner />
      </CampaignProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9FC',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#FF6B9D',
    fontWeight: '600',
    marginTop: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C62828',
  },
  errorSub: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: '#FF6B9D',
    borderRadius: 24,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
