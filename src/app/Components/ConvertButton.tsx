'use client';

import { useCurrency } from '@/context/CurrencyContext';

export default function ConvertButton() {
  const { convert } = useCurrency();

  return (
    <button
      onClick={convert}
      className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      Convert
    </button>
  );
}
