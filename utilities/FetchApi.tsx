
import { useQuery } from 'react-query';

const getSymbolList = async () => {
  await (await fetch("https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list")).json();
}
const getTicker = async () => {
  await (await fetch("https://api.binance.com/api/v3/ticker/24hr")).json();
}

const FetchApi = {
  getSymbolList,
  getTicker
}
export default FetchApi;