###Structure

```
src/
│
├── App.tsx
├── main.tsx
├── index.css
│
├── pages/                # Route-level pages
│   ├── Home.tsx
│   ├── Coin.tsx
│   ├── About.tsx
│   ├── NotFound.tsx
│   │
│   └── home/
│       └── homePresets.ts
│
├── components/
│   │
│   ├── Layout.tsx        # App-level / shared layout
│   ├── ErrorBoundary.tsx
│   ├── AsyncState.tsx
│   ├── Loader.tsx
│   │
│   ├── CoinCard.tsx      # Shared UI components
│   ├── LimitSelector.tsx
│   ├── FilterInput.tsx
│   ├── SortSelector.tsx
│   │
│   ├── skeletons/        # Loading states
│   │   ├── CoinCardSkeleton.tsx
│   │   ├── CoinCardSkeletonGrid.tsx
│   │   ├── CoinDetailsSkeleton.tsx
│   │   └── CoinChartSkeleton.tsx
│   │
│   ├── coin/             # Coin domain components
│   │   ├── CoinHeader.tsx
│   │   ├── CoinStats.tsx
│   │   ├── CoinChartSection.tsx
│   │   └── CoinLinks.tsx
│   │
│   ├── coin-chart/       # Chart domain (isolated feature)
│   │   ├── CoinChart.container.tsx
│   │   ├── CoinChartView.tsx
│   │   ├── CoinChartRange.tsx
│   │   ├── chartPresets.ts
│   │   └── coinChart.utils.ts
│   │
│   └── saved-views/      # Saved views feature
│       ├── SavedViewsPanel.tsx
│       ├── SavedViewItem.tsx
│       └── SavedViewsEmpty.tsx
│
├── hooks/                # Custom hooks
│   ├── useCoins.ts
│   ├── useCoin.ts
│   ├── useCoinChart.ts
│   ├── useSavedViews.ts
│   ├── useHomeSearchParams.ts
│   ├── useChartSearchParams.ts
│   ├── useSyncedSearchParam.ts
│   └── useDebouncedValue.ts
│
├── services/             # Data access & mapping
│   ├── cryptoApi.ts
│   ├── coinMapper.ts
│   └── chartMapper.ts
│
├── types/                # Domain models
│   ├── coin.ts
│   ├── coin-details.ts
│   ├── coin-chart.ts
│   └── home.ts
│
└── lib/                  # Pure utilities
    ├── coinList.utils.ts
    └── chart.ts

```
