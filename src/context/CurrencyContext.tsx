'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

type Currency = {
  code: string;
  name: string;
};

type CurrencyContextType = {
  from: string;
  to: string;
  amount: number;
  result: number | null;
  autoConvert: boolean;
  currencies: Currency[];
  error: string;
  loading: boolean;
  setFrom: (val: string) => void;
  setTo: (val: string) => void;
  setAmount: (val: number) => void;
  setAutoConvert: (val: boolean) => void;
  fetchCurrencies: () => Promise<void>;
  convert: () => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [autoConvert, setAutoConvert] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!autoConvert) {
      setResult(null);
    }
  }, [from, to, autoConvert, amount]);

  const fetchCurrencies = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch(
        `https://api.currencybeacon.com/v1/currencies?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      const list = (data.response || []).map((c: any) => ({
        code: c.short_code,
        name: c.name,
        numericCode: c.code,
        precision: c.precision,
        subunit: c.subunit,
        symbol: c.symbol,
        symbolFirst: c.symbol_first,
        decimal: c.decimal_mark,
        thousands: c.thousands_separator,
      }));

      setCurrencies(list);

      if (list.length > 1) {
        setFrom(list[0].code);
        setTo(list[1].code);
      }
    } catch (err) {
      console.error('Error fetching currencies', err);
      setError('Failed to load currencies. Please try again.');
      setCurrencies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const convert = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch(
        `https://api.currencybeacon.com/v1/convert?api_key=${process.env.NEXT_PUBLIC_API_KEY}&from=${from}&to=${to}&amount=${amount}`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setResult(data?.response?.value ?? null);
    } catch (err) {
      console.error('Conversion error', err);
      setError('Failed to convert currency. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [from, to, amount]);

  useEffect(() => {
    if (autoConvert) {
      convert();
    }
  }, [from, to, amount, autoConvert, convert]);

  return (
    <CurrencyContext.Provider
      value={{
        from,
        to,
        amount,
        result,
        autoConvert,
        currencies,
        error,
        loading,
        setFrom,
        setTo,
        setAmount,
        setAutoConvert,
        fetchCurrencies,
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
