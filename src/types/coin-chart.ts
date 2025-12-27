export type CoinChartPoint = {
  timestamp: number;
  price: number;
};

export type CoinChartData = {
  points: CoinChartPoint[];
};

export type ChartRange = 7 | 30 | 365;
