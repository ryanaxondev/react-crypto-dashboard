// components/coin/CoinLinks.tsx
import type { CoinDetails } from '../../types/coin-details';

type Props = {
  coin: CoinDetails;
};

const CoinLinks = ({ coin }: Props) => {
  return (
    <div className="space-y-2">
      {coin.website && (
        <a
          href={coin.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:underline"
        >
          🌐 Official Website
        </a>
      )}

      {coin.explorer && (
        <a
          href={coin.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:underline"
        >
          🧩 Blockchain Explorer
        </a>
      )}

      {coin.categories.length > 0 && (
        <p className="text-xs text-gray-400">
          Categories: {coin.categories.join(', ')}
        </p>
      )}
    </div>
  );
};

export default CoinLinks;
