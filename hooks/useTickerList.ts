import { API, REFETCH_INTERVAL } from '@/constants';
import { ITicker } from '@/interfaces';
import { useQuery } from 'react-query';

const fetchTickerList = async () => {
  const response = await fetch(API.ticker);
  if (!response.ok) {
    throw new Error('Failed to fetch Ticker List');
  }
  const result = await response.json();
  return result as ITicker[];
};

export const useTickerList = () => useQuery('tickerList', fetchTickerList, {
  refetchInterval: REFETCH_INTERVAL,
});
