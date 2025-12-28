// components/coin/CoinStats.tsx
import type { CoinDetails } from '../../types/coin-details';

type Props = {
  coin: CoinDetails;
};

const CoinStats = ({ coin }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 text-sm">
      <p>Rank: {coin.rank ?? 'N/A'}</p>

      <p>
        Price: $
        {coin.price?.toLocaleString() ?? 'N/A'}
      </p>

      <p>
        Market Cap: $
        {coin.marketCap?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        24h High: $
        {coin.high24h?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        24h Low: $
        {coin.low24h?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        24h Change:{' '}
        {coin.priceChange24h !== null
          ? `$${coin.priceChange24h.toFixed(
              2
            )}`
          : 'N/A'}{' '}
        (
        {coin.priceChangePercent24h !== null
          ? `${coin.priceChangePercent24h.toFixed(
              2
            )}%`
          : 'N/A'}
        )
      </p>

      <p>
        Circulating Supply:{' '}
        {coin.circulatingSupply?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        Total Supply:{' '}
        {coin.totalSupply?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        Max Supply:{' '}
        {coin.maxSupply?.toLocaleString() ??
          'N/A'}
      </p>

      <p>
        ATH: $
        {coin.ath?.toLocaleString() ?? 'N/A'} (
        {coin.athDate
          ? new Date(
              coin.athDate
            ).toLocaleDateString()
          : 'N/A'}
        )
      </p>

      <p>
        ATL: $
        {coin.atl?.toLocaleString() ?? 'N/A'} (
        {coin.atlDate
          ? new Date(
              coin.atlDate
            ).toLocaleDateString()
          : 'N/A'}
        )
      </p>

      <p>
        Last Updated:{' '}
        {coin.lastUpdated
          ? new Date(
              coin.lastUpdated
            ).toLocaleString()
          : 'N/A'}
      </p>
    </div>
  );
};

export default CoinStats;
