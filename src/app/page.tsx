'use client';

import { useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import AmountInput from './Components/AmountInput';
import AutoConvertToggle from './Components/AutoConvertToggle';
import ConvertButton from './Components/ConvertButton';
import ResultBox from './Components/ResultBox';
import SearchableSelect from './Components/SearchableSelect';
import ErrorMessage from './Components/ErrorMessage';
import LoadingOverlay from './Components/LoadingOverlay';

export default function Home() {
  const { from, to, setFrom, setTo, fetchCurrencies, error, loading } = useCurrency();

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <LoadingOverlay show={loading} />

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">💱 Currency Converter</h1>

        <div className="space-y-4">
          <AmountInput />

          <div className="flex items-center gap-2">
            <SearchableSelect label="From" value={from} onChange={setFrom} />
            <span className="mt-6 text-xl">→</span>
            <SearchableSelect label="To" value={to} onChange={setTo} />
          </div>
        </div>

        <div className="space-y-3">
          <ConvertButton />
          <AutoConvertToggle />
          <ErrorMessage message={error} />
        </div>

        <ResultBox />
      </div>
    </main>
  );
}
