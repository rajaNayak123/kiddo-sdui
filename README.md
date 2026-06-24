# Kiddo SDUI — Server-Driven UI Renderer

A production-ready, configuration-driven React Native homepage renderer for **Kiddo**, a Q-commerce platform for kids & baby essentials.

---

## Architecture Overview

```
App.tsx
├── CartProvider          (useSyncExternalStore — zero tree re-renders)
│   └── CampaignProvider  (active campaign state)
│       └── AppInner
│           └── ThemeProvider  (OTA theme injection from payload/campaign)
│               └── SDUIRenderer
│                   ├── FlatList (single vertical virtualized feed)
│                   │   ├── BlockRenderer (memo-isolated per block)
│                   │   │   ├── BannerHero
│                   │   │   ├── ProductGrid2x2 → ProductCard (memo + per-product cart sub)
│                   │   │   └── DynamicCollection → horizontal FlatList → CollectionItemCard
│                   │   └── CampaignSwitcher
│                   └── CampaignOverlay (pointerEvents="none" — non-occluding)
```

---

## Key Engineering Decisions

### 1. Component Registry — Factory Pattern
`src/registry/componentRegistry.ts` uses a **hash-map** (`Record<string, ComponentType>`) instead of switch/if-else chains. O(1) lookup. Unknown types return `null` and are silently dropped — no crash, view tree preserved.

### 2. Cart State — Zero Re-Render Architecture
`CartContext.tsx` uses `useSyncExternalStore` against a **ref-based store living completely outside React's tree**. Mutating one product card's quantity triggers re-renders **only** in:
- That specific `ProductCard` (subscribed to its own product's count)
- The cart header icon (subscribed to total count)
No other of the 30+ blocks re-renders.

### 3. Nested Scroll Decoupling
`DynamicCollection` uses:
- `directionalLockEnabled` on horizontal FlatList
- Scroll event tracking via `useRef` (not `useState` — no re-render)
- `disableScrollViewPanResponder={false}` on parent to correctly route gestures

### 4. OTA Runtime Theming
`ThemeContext` wraps the root engine. Campaign activation swaps the entire theme in one `useMemo` computation in `AppInner`. All child components read via `useTheme()` — no prop drilling.

### 5. Universal Action Dispatcher
`actionDispatcher.ts` is a centralized pure module. Components call `handleAction(action, deps)` — they have **zero knowledge** of business logic. New action types are added to the handler map without touching any component.

### 6. Resilience
Every unknown `block.type` is logged with a warning and returns `null` from `resolveBlockComponent`. The `BlockRenderer` wraps this safely — view tree stability is never compromised.

---

## Setup

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`

### Install & Run

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

### Type Check
```bash
npx tsc --noEmit
```

---

## Project Structure

```
kiddo-sdui/
├── App.tsx                          # Root: context providers + AppInner
├── app.json                         # Expo config
├── tsconfig.json                    # TypeScript strict mode
├── babel.config.js
├── package.json
└── src/
    ├── types/
    │   └── index.ts                 # All TypeScript interfaces & types
    ├── data/
    │   ├── homepagePayload.ts       # Mock SDUI JSON payload (10+ blocks)
    │   └── campaigns.ts             # 3 campaign configs (Back to School, Summer, Carnival)
    ├── context/
    │   ├── ThemeContext.tsx          # OTA theme injection via React Context
    │   ├── CartContext.tsx           # useSyncExternalStore cart — zero cascade re-renders
    │   └── CampaignContext.tsx       # Active campaign state management
    ├── registry/
    │   └── componentRegistry.ts     # Factory Pattern hash-map — graceful unknown type handling
    ├── dispatcher/
    │   └── actionDispatcher.ts      # Centralized handleAction() — decoupled from components
    ├── hooks/
    │   └── useSDUIPayload.ts        # Payload loading, validation, error handling
    └── components/
        ├── SDUIRenderer.tsx         # Core engine: single FlatList, memo boundaries
        ├── blocks/
        │   ├── BannerHero.tsx       # Full-width hero banner
        │   ├── ProductGrid2x2.tsx   # 2x2 grid with ProductCard
        │   └── DynamicCollection.tsx # Horizontal carousel with nested FlatList
        ├── common/
        │   ├── ProductCard.tsx      # Memo-isolated, per-product cart subscription
        │   ├── CollectionItemCard.tsx # Carousel item card
        │   ├── CartIcon.tsx         # Header cart icon with badge
        │   └── CampaignSwitcher.tsx # Live campaign switcher UI
        └── overlay/
            ├── CampaignOverlay.tsx  # Full-screen campaign overlay dispatcher
            └── ConfettiOverlay.tsx  # Mystery Carnival confetti (pointerEvents="none")
```

---

## Campaigns

| Campaign | Theme | Overlay |
|---|---|---|
| Back to School | Yellow + Blue | Lottie (paper planes / pencils) |
| Summer Playhouse | Ocean Blue | WebP (water splash / beach ball) |
| Mystery Gift Carnival | Carnival Red | Confetti burst canvas |

Switch campaigns using the chip selector at the top of the homepage.  
In production, `activeCampaign` is driven by the server payload.

---

## Production Notes

- Replace `lottie-react-native` placeholder renders with actual `LottieView` components once native build is set up
- Replace `picsum.photos` image URLs with CDN-hosted product images
- Connect `DEEP_LINK` / `OPEN_CATEGORY` actions to your navigation solution (Expo Router / React Navigation)
- Add Flipper / Reactotron for performance profiling in staging builds
