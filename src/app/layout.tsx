import './globals.css';
import type { Metadata } from 'next';
import { CurrencyProvider } from '@/context/CurrencyContext';

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Take-home assessment project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
