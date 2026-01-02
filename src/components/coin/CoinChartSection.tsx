import CoinChart from '@/components/CoinChart';

type Props = {
  coinId: string;
};

const CoinChartSection = ({ coinId }: Props) => {
  return (
    <div className="mt-8">
      <CoinChart coinId={coinId} />
    </div>
  );
};

export default CoinChartSection;
