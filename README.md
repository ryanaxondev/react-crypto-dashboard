###Structure

```
src/
│
├── pages/
│   ├── Home.tsx
│   ├── Coin.tsx
│   ├── About.tsx
│   └── NotFound.tsx
│
├── components/
│   ├── Layout.tsx
│   ├── CoinCard.tsx
│   ├── LimitSelector.tsx
│   ├── FilterInput.tsx
│   ├── SortSelector.tsx
│   ├── ErrorBoundary.tsx
│   ├── Loader.tsx
│   ├── AsyncState.tsx
│   ├── CoinChart.tsx
│   │
│   └── skeletons/
│       ├── CoinDetailsSkeleton.tsx
│       ├── CoinCardSkeletonGrid.tsx
│       ├── CoinCardSkeleton.tsx
│       └── CoinChartSkeleton.tsx
│
├── services/
│   ├── cryptoApi.ts
│   ├── chartMapper.ts
│   └── coinMapper.ts
│
├── hooks/
│   ├── useCoinChart.ts
│   └── useCoin.ts
│
├── types/
│   ├── coin.ts
│   ├── coin-chart.ts
│   └── coin-details.ts
│
├── lib/
│   └── chart.ts
│
├── App.tsx
├── main.tsx
└── index.css

```
