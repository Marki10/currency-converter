'use client';

import { useCurrency } from '@/context/CurrencyContext';

export default function ResultBox() {
  const { result, amount, from, to } = useCurrency();

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4 text-center">
      <p className="text-lg font-semibold">
        {result !== null ? `${amount} ${from} = ${result.toFixed(2)} ${to}` : '-'}
      </p>
    </div>
  );
}
