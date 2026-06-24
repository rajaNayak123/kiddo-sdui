import React, { ComponentType } from 'react';
import { AnyBlock } from '../types';
import BannerHero from '../components/blocks/BannerHero';
import ProductGrid2x2 from '../components/blocks/ProductGrid2x2';
import DynamicCollection from '../components/blocks/DynamicCollection';
import FullScreenOverlay from '../components/blocks/FullScreenOverlay';

type BlockComponent = ComponentType<{ block: AnyBlock }>;

const COMPONENT_REGISTRY: Readonly<Record<string, BlockComponent>> = {
  BANNER_HERO: BannerHero as BlockComponent,
  PRODUCT_GRID_2X2: ProductGrid2x2 as BlockComponent,
  DYNAMIC_COLLECTION: DynamicCollection as BlockComponent,
  FULL_SCREEN_OVERLAY: FullScreenOverlay as BlockComponent,
};

export function resolveBlockComponent(type: string): BlockComponent | null {
  const component = COMPONENT_REGISTRY[type];
  if (!component) {
    console.warn(
      `[ComponentRegistry] Unregistered block type: "${type}" — dropping node gracefully.`,
    );
    return null;
  }
  return component;
}

export function registerComponent(type: string, component: BlockComponent): void {
  (COMPONENT_REGISTRY as Record<string, BlockComponent>)[type] = component;
}

export default COMPONENT_REGISTRY;
