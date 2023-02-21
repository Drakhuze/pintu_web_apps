export interface ITicker {
  symbol: string,
  priceChange: string,
  priceChangePercent: string,
  lastPrice: number,
  volume: string,
  highPrice: number,
  lowPrice: number,
}

export interface ISymbol {
  symbol: string,
  name: string,
  fullName: string,
  logo: string,
  price: number,
  volume: string,
  rank: number,
  tags: string[],
}

export interface IFinalData {
  symbol: string,
  name: string,
  fullName: string,
  logo: string,
  price: number,
  volume: string,
  rank: number,
  tags: string[],
  priceChangePercent: string,
  highPrice: number,
  lowPrice: number,
}

export interface ITag {
  name: string,
  tag: string
}
