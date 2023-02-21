export interface ITicker {
  symbol: string,
  priceChange: string,
  priceChangePercent: string,
  lastPrice: number,
  volume: string
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
}

