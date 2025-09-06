'use client';

import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useCurrency } from '@/context/CurrencyContext';

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

export default function SearchableSelect({ label, value, onChange }: Props) {
  const { currencies } = useCurrency();
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? currencies
      : currencies.filter((c) => `${c.code} ${c.name}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
              displayValue={(code: string) => currencies.find((c) => c.code === code)?.code || ''}
              placeholder="Select currency..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white border shadow-lg">
            {filtered.length === 0 ? (
              <div className="p-2 text-gray-500">No results</div>
            ) : (
              filtered.map((c) => (
                <Combobox.Option
                  key={c.code}
                  value={c.code}
                  className={({ active }) =>
                    `cursor-pointer select-none p-2 ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {c.code} – {c.name}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
