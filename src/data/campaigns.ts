import { Campaign } from '../types';

export const CAMPAIGNS: Record<string, Campaign> = {
  back_to_school: {
    id: 'back_to_school',
    name: 'Back to School Mega-Sale',
    theme: {
      primary: '#1565C0',
      secondary: '#FFD600',
      background: '#E3F2FD',
      surface: '#FFFFFF',
      text: '#0D2137',
      accent: '#FFD600',
    },
    overlayAnimationUrl: 'https://assets.lottiefiles.com/packages/lf20_u8yhsf3k.json',
    overlayType: 'lottie',
  },
  summer_playhouse: {
    id: 'summer_playhouse',
    name: 'Summer Playhouse Festival',
    theme: {
      primary: '#0277BD',
      secondary: '#80DEEA',
      background: '#E1F5FE',
      surface: '#FFFFFF',
      text: '#01579B',
      accent: '#F9A825',
    },
    overlayAnimationUrl: 'https://assets.lottiefiles.com/packages/lf20_xlky4kvh.json',
    overlayType: 'webp',
  },
  mystery_carnival: {
    id: 'mystery_carnival',
    name: 'Mystery Gift Carnival',
    theme: {
      primary: '#C62828',
      secondary: '#F8BBD9',
      background: '#FFF8F8',
      surface: '#FFFFFF',
      text: '#37001E',
      accent: '#FFD600',
    },
    overlayAnimationUrl: 'https://assets.lottiefiles.com/packages/lf20_obhph3t0.json',
    overlayType: 'confetti',
  },
};

export const NO_CAMPAIGN_THEME = {
  primary: '#FF6B9D',
  secondary: '#FFB347',
  background: '#FFF9FC',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  accent: '#4ECDC4',
};
