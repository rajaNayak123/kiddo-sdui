export type ActionType =
  | 'ADD_TO_CART'
  | 'DEEP_LINK'
  | 'OPEN_CATEGORY'
  | 'APPLY_MYSTERY_GIFT_COUPON'
  | 'BOOK_EVENT'
  | 'OPEN_PRODUCT_DETAIL';

export interface ActionPayload {
  id?: string;
  url?: string;
  categoryId?: string;
  couponCode?: string;
  eventId?: string;
  [key: string]: unknown;
}

export interface Action {
  type: ActionType;
  payload: ActionPayload;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
  rating?: number;
  action: Action;
}

export type SDUIComponentType =
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY';

export interface BaseBlock {
  id: string;
  type: SDUIComponentType | string; // string allows unknown types — handled gracefully
}

export interface BannerHeroBlock extends BaseBlock {
  type: 'BANNER_HERO';
  imageUrl: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  action: Action;
  backgroundColor?: string;
}

export interface ProductGridBlock extends BaseBlock {
  type: 'PRODUCT_GRID_2X2';
  title: string;
  products: Product[];
}

export interface CollectionItem {
  id: string;
  title: string;
  imageUrl: string;
  price?: number;
  badge?: string;
  action: Action;
}

export interface DynamicCollectionBlock extends BaseBlock {
  type: 'DYNAMIC_COLLECTION';
  title: string;
  theme?: string;
  items: CollectionItem[];
}

export interface FullScreenOverlayBlock extends BaseBlock {
  type: 'FULL_SCREEN_OVERLAY';
  animation_url: string;
  overlay_type?: 'lottie' | 'webp' | 'confetti';
}

export type KnownBlock =
  | BannerHeroBlock
  | ProductGridBlock
  | DynamicCollectionBlock
  | FullScreenOverlayBlock;
export type AnyBlock = KnownBlock | BaseBlock;

export interface ThemeConfig {
  primary: string;
  secondary?: string;
  background: string;
  surface?: string;
  text?: string;
  accent?: string;
}

export type CampaignId = 'back_to_school' | 'summer_playhouse' | 'mystery_carnival' | null;

export interface Campaign {
  id: CampaignId;
  name: string;
  theme: ThemeConfig;
  overlayAnimationUrl: string;
  overlayType: 'lottie' | 'webp' | 'confetti';
}

export interface HomepagePayload {
  version: string;
  theme: ThemeConfig;
  activeCampaign?: CampaignId;
  blocks: AnyBlock[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalCount: number;
}
