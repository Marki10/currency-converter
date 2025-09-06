'use client';

import { useCurrency } from '@/context/CurrencyContext';

export default function AmountInput() {
  const { amount, setAmount } = useCurrency();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
