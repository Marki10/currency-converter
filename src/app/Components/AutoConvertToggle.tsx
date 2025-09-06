'use client';

import { useCurrency } from '@/context/CurrencyContext';

export default function AutoConvertToggle() {
  const { autoConvert, setAutoConvert } = useCurrency();

  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={autoConvert}
        onChange={(e) => setAutoConvert(e.target.checked)}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      Auto convert on change
    </label>
  );
}
