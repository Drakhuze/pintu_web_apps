import { USD_TO_IDR_DEFAULT } from '@/constants';

export const usdToIdr = (value: number): number => value * USD_TO_IDR_DEFAULT;

export const formatCurrency = (value: number): string => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
  return currencyFormatter.format(value);
};
