import { USD_TO_IDR_DEFAULT } from '@/constants';

export const usdToIdr = (value: number): number => value * USD_TO_IDR_DEFAULT;

export const formatCurrency = (value: number, maxFraction: number): string => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: maxFraction,
  });
  return currencyFormatter.format(value);
};

export const formatPercentage = (value: number, maxFraction: number): string => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: maxFraction,
  });
  const result = value >= 0 ? value : value * -1;

  return currencyFormatter.format(result);
};

export const convertPositive = (value: number): number => (value >= 0 ? value : value * -1);
