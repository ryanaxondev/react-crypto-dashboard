import { Link } from 'react-router-dom';
import type { Coin } from '../types/coin';

type CoinCardProps = {
  coin: Coin;
};

const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <Link to={`/coin/${coin.id}`} className="block">
      <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3 hover:bg-gray-700 transition">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8"
          />
          <div>
            <h2 className="font-semibold">
              {coin.name}
            </h2>
            <p className="text-sm text-gray-400">
              {coin.symbol.toUpperCase()}
            </p>
          </div>
        </div>

        <p>
          Price: ${coin.current_price.toLocaleString()}
        </p>

        <p
          className={
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          }
        >
          24h Change:{' '}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>

        <p className="text-sm text-gray-300">
          Market Cap: ${coin.market_cap.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default CoinCard;
