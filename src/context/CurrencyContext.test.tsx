import { renderHook, act } from '@testing-library/react';
import { CurrencyProvider, useCurrency } from './CurrencyContext';

global.fetch = jest.fn();

describe('CurrencyContext', () => {
  it('fetches and sets currencies', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        response: [
          { short_code: 'USD', name: 'US Dollar', code: '840' },
          { short_code: 'EUR', name: 'Euro', code: '978' },
        ],
      }),
    });

    const { result } = renderHook(() => useCurrency(), { wrapper: CurrencyProvider });

    await act(async () => {
      await result.current.fetchCurrencies();
    });

    expect(result.current.currencies).toHaveLength(2);
    expect(result.current.currencies[0].code).toBe('USD');
  });

  it('sets error when API fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

    const { result } = renderHook(() => useCurrency(), { wrapper: CurrencyProvider });

    await act(async () => {
      await result.current.fetchCurrencies();
    });

    expect(result.current.error).toBe('Failed to load currencies. Please try again.');
  });
});
