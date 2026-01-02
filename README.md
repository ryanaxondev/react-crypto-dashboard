###Structure

```
src/
│
├── pages/
│   ├── Home.tsx
│   ├── Coin.tsx
│   ├── About.tsx
│   ├── NotFound.tsx
│   │
│   └── home/
│       └── homePresets.ts
│
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
│   ├── ChartRangeSelector.tsx
│   │
│   ├── skeletons/
│   │   ├── CoinDetailsSkeleton.tsx
│   │   ├── CoinCardSkeletonGrid.tsx
│   │   ├── CoinCardSkeleton.tsx
│   │   └── CoinChartSkeleton.tsx
│   │
│   ├── coin/
│   │   ├── CoinHeader.tsx
│   │   ├── CoinStats.tsx
│   │   ├── CoinChartSection.tsx
│   │   └── CoinLinks.tsx
│   │
│   └── coin-chart/
│       ├── CoinChart.container.tsx
│       ├── CoinChartView.tsx
│       ├── CoinChartRange.tsx
│       ├── chartPresets.ts
│       └── coinChart.utils.ts
│
│
├── services/
│   ├── cryptoApi.ts
│   ├── chartMapper.ts
│   └── coinMapper.ts
│
├── hooks/
│   ├── useCoinChart.ts
│   ├── useCoins.ts
│   ├── useChartSearchParams.ts
│   ├── useSyncedSearchParam.ts
│   ├── useDebouncedValue.ts
│   ├── useHomeSearchParams.ts
│   ├── useSavedViews.ts
│   └── useCoin.ts
│
├── types/
│   ├── coin.ts
│   ├── coin-chart.ts
│   ├── coin-details.ts
│   └── home.ts
│
├── lib/
│   ├── coinList.utils.ts
│   └── chart.ts
│
├── App.tsx
├── main.tsx
└── index.css

```
