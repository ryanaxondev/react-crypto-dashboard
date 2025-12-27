export type CoinChartPoint = {
  timestamp: number;
  price: number;
};

export type CoinChartData = {
  points: CoinChartPoint[];
};
