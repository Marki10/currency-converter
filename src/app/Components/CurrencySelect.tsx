'use client';

import { useCurrency } from '@/context/CurrencyContext';

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

export default function CurrencySelect({ label, value, onChange }: Props) {
  const { currencies } = useCurrency();

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} – {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
