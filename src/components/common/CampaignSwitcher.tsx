import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CampaignId } from '../../types';
import { useCampaign } from '../../context/CampaignContext';

const CAMPAIGN_OPTIONS: { id: CampaignId; label: string; emoji: string }[] = [
  { id: null, label: 'Default', emoji: '🏠' },
  { id: 'back_to_school', label: 'Back to School', emoji: '🎒' },
  { id: 'summer_playhouse', label: 'Summer', emoji: '☀️' },
  { id: 'mystery_carnival', label: 'Carnival', emoji: '🎪' },
];

const CampaignSwitcher = () => {
  const { activeCampaign, setCampaign } = useCampaign();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Live Campaign:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {CAMPAIGN_OPTIONS.map((opt) => {
          const isActive = activeCampaign?.id === opt.id;
          return (
            <TouchableOpacity
              key={String(opt.id)}
              style={[
                styles.chip,
                isActive && styles.chipActive,
              ]}
              onPress={() => setCampaign(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.chipText}>
                {opt.emoji} {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F8F0FF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#EEE',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#FF6B9D22',
    borderColor: '#FF6B9D',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
});

export default memo(CampaignSwitcher);
