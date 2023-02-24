import { API, REFETCH_INTERVAL } from '@/constants';
import { ISymbol, ITicker } from '@/interfaces';
import { useQuery } from 'react-query';

const fetchTickerList = async (symbolList?: ISymbol[]) => {
  const response = await fetch(API.ticker);
  if (!response.ok) {
    throw new Error('Failed to fetch Ticker List');
  }
  const tickerResponse = await response.json() as ITicker[];
  const symbols = symbolList?.map((item) => item.symbol);
  const result = tickerResponse.filter((p) => symbols?.includes(p.symbol));

  return result;
};

export const useTickerList = (isSuccess: boolean, symbolList?: ISymbol[]) => useQuery('tickerList', () => fetchTickerList(symbolList), {
  refetchInterval: REFETCH_INTERVAL,
  enabled: isSuccess && symbolList !== undefined,
});
