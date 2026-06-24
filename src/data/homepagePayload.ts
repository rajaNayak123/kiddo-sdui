import { HomepagePayload } from '../types';

export const homepagePayload: HomepagePayload = {
  version: '2.2.0',
  theme: {
    primary: '#FF6B9D',
    secondary: '#FFB347',
    background: '#FFF9FC',
    surface: '#FFFFFF',
    text: '#1A1A2E',
    accent: '#4ECDC4',
  },
  activeCampaign: null,
  blocks: [

    {
      id: 'banner_001',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/kiddo-hero/800/400',
      title: 'Baby Essentials Delivered in Minutes',
      subtitle: 'Diapers, Formula & More — Under 10 Minutes',
      ctaLabel: 'Shop Now',
      backgroundColor: '#FFE4F0',
      action: { type: 'DEEP_LINK', payload: { url: '/category/baby-essentials' } },
    },

    {
      id: 'collection_summer_001',
      type: 'DYNAMIC_COLLECTION',
      title: '☀️ Summer Essentials',
      theme: 'summer',
      items: [
        {
          id: 'sc_001', title: 'Swim Diapers',
          imageUrl: 'https://picsum.photos/seed/swim-diaper/200/200',
          price: 299, badge: 'Best Seller',
          action: { type: 'ADD_TO_CART', payload: { id: 'sc_001' } },
        },
        {
          id: 'sc_002', title: 'Sunscreen SPF 50',
          imageUrl: 'https://picsum.photos/seed/sunscreen/200/200',
          price: 449,
          action: { type: 'ADD_TO_CART', payload: { id: 'sc_002' } },
        },
        {
          id: 'sc_003', title: 'Kids Pool Floats',
          imageUrl: 'https://picsum.photos/seed/pool-float/200/200',
          price: 899, badge: '20% Off',
          action: { type: 'ADD_TO_CART', payload: { id: 'sc_003' } },
        },
        {
          id: 'sc_004', title: 'Cooling Towel',
          imageUrl: 'https://picsum.photos/seed/cool-towel/200/200',
          price: 199,
          action: { type: 'ADD_TO_CART', payload: { id: 'sc_004' } },
        },
        {
          id: 'sc_005', title: 'Water Shoes',
          imageUrl: 'https://picsum.photos/seed/water-shoes/200/200',
          price: 599,
          action: { type: 'ADD_TO_CART', payload: { id: 'sc_005' } },
        },
        {
          id: 'sc_006', title: 'Petting Zoo Tickets',
          imageUrl: 'https://picsum.photos/seed/petting-zoo/200/200',
          price: 349, badge: '🐑 Event',
          action: { type: 'BOOK_EVENT', payload: { eventId: 'petting_zoo_summer_2024' } },
        },
      ],
    },

    {
      id: 'overlay_summer_001',
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets.lottiefiles.com/packages/lf20_xlky4kvh.json',
      overlay_type: 'webp',
    },

    {
      id: 'grid_001',
      type: 'PRODUCT_GRID_2X2',
      title: '🌟 Top Picks for Your Little One',
      products: [
        {
          id: 'pg_001', name: 'Pampers Newborn Diapers',
          price: 849, originalPrice: 999,
          imageUrl: 'https://picsum.photos/seed/pampers/300/300',
          badge: '15% Off', rating: 4.8,
          action: { type: 'ADD_TO_CART', payload: { id: 'pg_001' } },
        },
        {
          id: 'pg_002', name: 'Aptamil Stage 1 Formula',
          price: 1249, originalPrice: 1399,
          imageUrl: 'https://picsum.photos/seed/formula/300/300',
          badge: 'Bestseller', rating: 4.7,
          action: { type: 'ADD_TO_CART', payload: { id: 'pg_002' } },
        },
        {
          id: 'pg_003', name: 'Soft Baby Wipes (192 pcs)',
          price: 299,
          imageUrl: 'https://picsum.photos/seed/baby-wipes/300/300',
          rating: 4.6,
          action: { type: 'ADD_TO_CART', payload: { id: 'pg_003' } },
        },
        {
          id: 'pg_004', name: 'Baby Johnson Lotion',
          price: 189, originalPrice: 220,
          imageUrl: 'https://picsum.photos/seed/lotion/300/300',
          badge: 'New', rating: 4.5,
          action: { type: 'ADD_TO_CART', payload: { id: 'pg_004' } },
        },
      ],
    },

    {
      id: 'collection_snacks_001',
      type: 'DYNAMIC_COLLECTION',
      title: '🍪 Snacks under ₹99',
      theme: 'snacks',
      items: [
        {
          id: 'snk_001', title: 'Organic Puffs',
          imageUrl: 'https://picsum.photos/seed/organic-puffs/200/200',
          price: 79, badge: '₹79',
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_001' } },
        },
        {
          id: 'snk_002', title: 'Munchkin Crackers',
          imageUrl: 'https://picsum.photos/seed/crackers/200/200',
          price: 99,
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_002' } },
        },
        {
          id: 'snk_003', title: 'Rice Cakes',
          imageUrl: 'https://picsum.photos/seed/rice-cakes/200/200',
          price: 89,
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_003' } },
        },
        {
          id: 'snk_004', title: 'Fruit Puree Pouches',
          imageUrl: 'https://picsum.photos/seed/fruit-puree/200/200',
          price: 69, badge: 'Natural',
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_004' } },
        },
        {
          id: 'snk_005', title: 'Multigrain Stars',
          imageUrl: 'https://picsum.photos/seed/multigrain/200/200',
          price: 99,
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_005' } },
        },
        {
          id: 'snk_006', title: 'Baby Biscotti',
          imageUrl: 'https://picsum.photos/seed/biscotti/200/200',
          price: 85,
          action: { type: 'ADD_TO_CART', payload: { id: 'snk_006' } },
        },
      ],
    },

    {
      id: 'banner_002',
      type: 'BANNER_HERO',
      imageUrl: 'https://picsum.photos/seed/kiddo-banner2/800/400',
      title: '🎒 Back to School Sale',
      subtitle: 'Up to 40% off on stationery & lunchboxes',
      ctaLabel: 'Explore Deals',
      backgroundColor: '#FFF3CD',
      action: { type: 'DEEP_LINK', payload: { url: '/campaign/back-to-school' } },
    },

    {
      id: 'overlay_back_to_school_001',
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets.lottiefiles.com/packages/lf20_u8yhsf3k.json',
      overlay_type: 'lottie',
    },

    {
      id: 'collection_lunchboxes_001',
      type: 'DYNAMIC_COLLECTION',
      title: '🎒 Lunchboxes & Bags',
      theme: 'back_to_school',
      items: [
        {
          id: 'lb_001', title: 'Insulated Tiffin Box',
          imageUrl: 'https://picsum.photos/seed/tiffin/200/200',
          price: 599, badge: '25% Off',
          action: { type: 'ADD_TO_CART', payload: { id: 'lb_001' } },
        },
        {
          id: 'lb_002', title: 'Superhero Backpack',
          imageUrl: 'https://picsum.photos/seed/backpack/200/200',
          price: 1099, badge: 'Trending',
          action: { type: 'ADD_TO_CART', payload: { id: 'lb_002' } },
        },
        {
          id: 'lb_003', title: 'Water Bottle 600ml',
          imageUrl: 'https://picsum.photos/seed/water-bottle/200/200',
          price: 349,
          action: { type: 'ADD_TO_CART', payload: { id: 'lb_003' } },
        },
        {
          id: 'lb_004', title: 'Pencil Case Organizer',
          imageUrl: 'https://picsum.photos/seed/pencil-case/200/200',
          price: 199, badge: 'New',
          action: { type: 'ADD_TO_CART', payload: { id: 'lb_004' } },
        },
        {
          id: 'lb_005', title: 'Lunch Bag Set',
          imageUrl: 'https://picsum.photos/seed/lunch-bag/200/200',
          price: 449, badge: 'Popular',
          action: { type: 'ADD_TO_CART', payload: { id: 'lb_005' } },
        },
      ],
    },

    {
      id: 'grid_002',
      type: 'PRODUCT_GRID_2X2',
      title: '📦 School Stationery Bundles',
      products: [
        {
          id: 'st_001', name: 'Stationery Kit (10pc)',
          price: 299, originalPrice: 399,
          imageUrl: 'https://picsum.photos/seed/stationery/300/300',
          badge: '25% Off', rating: 4.9,
          action: { type: 'ADD_TO_CART', payload: { id: 'st_001' } },
        },
        {
          id: 'st_002', name: 'Colour Pencils (48 shades)',
          price: 349,
          imageUrl: 'https://picsum.photos/seed/colour-pencils/300/300',
          badge: 'Trending', rating: 4.7,
          action: { type: 'ADD_TO_CART', payload: { id: 'st_002' } },
        },
        {
          id: 'st_003', name: 'Geometry Box Set',
          price: 149, originalPrice: 199,
          imageUrl: 'https://picsum.photos/seed/geometry/300/300',
          rating: 4.6,
          action: { type: 'ADD_TO_CART', payload: { id: 'st_003' } },
        },
        {
          id: 'st_004', name: 'Art Sketchbook A4',
          price: 199,
          imageUrl: 'https://picsum.photos/seed/sketchbook/300/300',
          badge: 'New', rating: 4.4,
          action: { type: 'ADD_TO_CART', payload: { id: 'st_004' } },
        },
      ],
    },

    {
      id: 'collection_new_001',
      type: 'DYNAMIC_COLLECTION',
      title: '✨ New Arrivals',
      theme: 'new',
      items: [
        {
          id: 'na_001', title: 'Montessori Toy Set',
          imageUrl: 'https://picsum.photos/seed/montessori/200/200',
          price: 1499, badge: 'New',
          action: { type: 'ADD_TO_CART', payload: { id: 'na_001' } },
        },
        {
          id: 'na_002', title: 'Sensory Play Mat',
          imageUrl: 'https://picsum.photos/seed/play-mat/200/200',
          price: 2199,
          action: { type: 'ADD_TO_CART', payload: { id: 'na_002' } },
        },
        {
          id: 'na_003', title: 'Night Light Projector',
          imageUrl: 'https://picsum.photos/seed/projector/200/200',
          price: 899, badge: 'Popular',
          action: { type: 'ADD_TO_CART', payload: { id: 'na_003' } },
        },
        {
          id: 'na_004', title: 'Wooden Stacking Toy',
          imageUrl: 'https://picsum.photos/seed/stacking/200/200',
          price: 649,
          action: { type: 'ADD_TO_CART', payload: { id: 'na_004' } },
        },
        {
          id: 'na_005', title: 'Interactive Globe',
          imageUrl: 'https://picsum.photos/seed/globe/200/200',
          price: 1799,
          action: { type: 'ADD_TO_CART', payload: { id: 'na_005' } },
        },
      ],
    },

    {
      id: 'unknown_001',
      type: 'NEW_COMPONENT_V2',
    } as never,

    {
      id: 'grid_003',
      type: 'PRODUCT_GRID_2X2',
      title: '🧴 Health & Hygiene',
      products: [
        {
          id: 'hh_001', name: 'Digital Thermometer',
          price: 399, originalPrice: 499,
          imageUrl: 'https://picsum.photos/seed/thermometer/300/300',
          badge: '20% Off', rating: 4.8,
          action: { type: 'ADD_TO_CART', payload: { id: 'hh_001' } },
        },
        {
          id: 'hh_002', name: 'Nasal Aspirator',
          price: 299,
          imageUrl: 'https://picsum.photos/seed/aspirator/300/300',
          rating: 4.6,
          action: { type: 'ADD_TO_CART', payload: { id: 'hh_002' } },
        },
        {
          id: 'hh_003', name: 'Baby Nail Clipper Kit',
          price: 249,
          imageUrl: 'https://picsum.photos/seed/nail-clipper/300/300',
          badge: 'Safe', rating: 4.7,
          action: { type: 'ADD_TO_CART', payload: { id: 'hh_003' } },
        },
        {
          id: 'hh_004', name: 'Saline Nasal Drops',
          price: 149, originalPrice: 199,
          imageUrl: 'https://picsum.photos/seed/saline/300/300',
          rating: 4.5,
          action: { type: 'ADD_TO_CART', payload: { id: 'hh_004' } },
        },
      ],
    },

    {
      id: 'collection_mystery_001',
      type: 'DYNAMIC_COLLECTION',
      title: '🎪 Mystery Gift Carnival',
      theme: 'carnival',
      items: [
        {
          id: 'mg_001', title: 'Mystery Box — Classic',
          imageUrl: 'https://picsum.photos/seed/mystery-a/200/200',
          price: 999, badge: '🎁 Mystery',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'CARNIVAL_A', id: 'mg_001' } },
        },
        {
          id: 'mg_002', title: 'Mystery Box — Premium',
          imageUrl: 'https://picsum.photos/seed/mystery-b/200/200',
          price: 1499, badge: '🎁 Mystery',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'CARNIVAL_B', id: 'mg_002' } },
        },
        {
          id: 'mg_003', title: 'Lucky Dip Toy',
          imageUrl: 'https://picsum.photos/seed/mystery-c/200/200',
          price: 599, badge: '🍀 Lucky!',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'LUCKY_DIP', id: 'mg_003' } },
        },
        {
          id: 'mg_004', title: 'Surprise Hamper',
          imageUrl: 'https://picsum.photos/seed/mystery-d/200/200',
          price: 2499, badge: '👑 Premium',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'PREMIUM_HAMPER', id: 'mg_004' } },
        },
        {
          id: 'mg_005', title: 'Carnival Special Box',
          imageUrl: 'https://picsum.photos/seed/mystery-e/200/200',
          price: 799, badge: '🎪 Carnival',
          action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'CARNIVAL_SPECIAL', id: 'mg_005' } },
        },
      ],
    },

    {
      id: 'overlay_carnival_001',
      type: 'FULL_SCREEN_OVERLAY',
      animation_url: 'https://assets.example.com/confetti_carnival.json',
      overlay_type: 'confetti',
    },

  ],
};
