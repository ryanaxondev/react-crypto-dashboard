type Range = 7 | 30 | 365;

const ranges: { label: string; value: Range }[] = [
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '1Y', value: 365 },
];

type Props = {
  value: Range;
  onChange: (value: Range) => void;
};

export default function ChartRangeSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`px-3 py-1 rounded text-sm transition
            ${
              value === r.value
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
