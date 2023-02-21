export const Api = {
  symbolList: 'https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list',
  ticker: 'https://api.binance.com/api/v3/ticker/24hr',
};

export const TAGS = [
  { tag: '', name: 'Terbaru' },
  { tag: 'defi', name: 'DeFi' },
  { tag: 'NFT', name: 'NFT' },
  { tag: 'Gaming', name: 'Gaming' },
  { tag: 'innovation-zone', name: 'Innovation' },
  { tag: 'fan_token', name: 'Fan Token' },
  { tag: 'storage-zone', name: 'Storage' },
  { tag: 'Polkadot', name: 'Polkadot' },
  { tag: 'pos', name: 'POS' },
  { tag: 'pow', name: 'POW' },
  { tag: 'Launchpad', name: 'Launchpad' },
  { tag: 'Launchpool', name: 'Launchpool' },
  { tag: 'BSC', name: 'BSC' },
  { tag: 'ETF', name: 'ETF' },
];

export const TABLE_CRYPTO_HEADER = [
  {
    id: 1, title: '', width: '10%', itemAlign: 'left',
  },
  {
    id: 2, title: 'Crypto', width: '20%', itemAlign: 'left',
  },
  {
    id: 3, title: '', width: '10%', itemAlign: 'left',
  },
  {
    id: 4, title: 'Harga', width: '15%', itemAlign: 'left',
  },
  {
    id: 5, title: '24 Jam', width: '12%', itemAlign: 'right',
  },
  {
    id: 6, title: 'Low Price', width: '15%', itemAlign: 'right',
  },
  {
    id: 7, title: 'High Price', width: '15%', itemAlign: 'right',
  },
];

export const USD_TO_IDR_DEFAULT = 15197.10;
