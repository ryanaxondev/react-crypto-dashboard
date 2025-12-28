// components/coin/CoinHeader.tsx
import type { CoinDetails } from '../../types/coin-details';

type Props = {
  coin: CoinDetails;
};

const CoinHeader = ({ coin }: Props) => {
  return (
    <div className="space-y-4">
      {coin.image && (
        <img
          src={coin.image}
          alt={coin.name}
          className="w-24 h-24"
        />
      )}

      <h1 className="text-3xl font-bold">
        {coin.name} ({coin.symbol})
      </h1>

      <p className="text-gray-300">
        {coin.description}
      </p>
    </div>
  );
};

export default CoinHeader;
