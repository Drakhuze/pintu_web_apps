import { API } from '@/constants';
import { ISymbol } from '@/interfaces';
import { useQuery } from 'react-query';

interface ISymbolListResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: ISymbol[];
}

const fetchSymbolList = async () => {
  const response = await fetch(API.symbolList);
  if (!response.ok) {
    throw new Error('Failed to fetch Ticker List');
  }
  const result = await response.json();
  return result as ISymbolListResponse;
};

export const useSymbolList = () => useQuery('symbolList', fetchSymbolList, {
  retryDelay: 5000,
});
