import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Badge from '@/components/Badge';
import { NextPage } from 'next';
import { TABLE_CRYPTO_HEADER, TAGS } from '@/constants';
import {
  IToken, ISymbol, ITag, ITicker,
} from '@/interfaces';
import SearchBox from '@/components/SearchBox';
import Table, { ITableHeader } from '@/components/Table';
import Token from '@/components/Token';
import { useSymbolList } from '@/hooks/useSymbolList';
import { useTickerList } from '@/hooks/useTickerList';

const Home: NextPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [prevTicker, setPrevTicker] = useState<ITicker[]>();

  const symbolList = useSymbolList();
  const tickerList = useTickerList();

  // Function to handle if the Ticker suddenly fails in the middle
  useEffect(() => {
    if (tickerList !== undefined && tickerList.isSuccess) {
      setPrevTicker(tickerList.data);
    }
  }, [tickerList]);

  useEffect(() => {
    setSearchKey('');
  }, [selectedBadge]);

  const combinedData = useMemo(() => {
    if (symbolList === undefined) {
      return [];
    }

    const symbols = symbolList.data?.data.map((item: ISymbol) => ({
      symbol: item.symbol,
      name: item.name,
      fullName: item.fullName,
      logo: item.logo,
      price: item.price,
      volume: item.volume,
      rank: item.rank,
      tags: item.tags,
    })) as ISymbol[];

    const tickers = tickerList !== undefined && tickerList.isSuccess === true
      ? tickerList.data.map((item: ITicker) => ({
        symbol: item.symbol,
        priceChange: item.priceChange,
        priceChangePercent: item.priceChangePercent,
        lastPrice: item.lastPrice,
        volume: item.volume,
        highPrice: item.highPrice,
        lowPrice: item.lowPrice,
      })) as ITicker[] : null;

    const result = symbols?.map((item: ISymbol) => {
      const ticker = tickers !== null
        ? tickers?.filter((p) => p.symbol === item.symbol)[0]
        : prevTicker?.filter((p) => p.symbol === item.symbol)[0];
      return {
        symbol: item.symbol,
        name: item.name,
        fullName: item.fullName,
        logo: item.logo,
        price: ticker?.lastPrice,
        volume: item.volume,
        rank: item.rank,
        tags: item.tags,
        priceChangePercent: ticker?.priceChangePercent,
        highPrice: ticker?.highPrice,
        lowPrice: ticker?.lowPrice,
      };
    }) as IToken[];
    return result;
  }, [symbolList, tickerList]);

  if (combinedData !== undefined) {
    combinedData?.sort((a, b) => {
      if (a.rank === null) return 1;
      if (b.rank === null) return -1;
      return a.rank < b.rank ? -1 : 1;
    });
  }

  const finalData = combinedData === undefined ? [] : combinedData?.filter((p) => {
    if (searchKey === '' && selectedBadge === '') return combinedData;
    if (selectedBadge === '') return (p.name.toLowerCase().includes(searchKey.toLowerCase()) || p.fullName.toLowerCase().includes(searchKey.toLowerCase()));

    return (p.name.toLowerCase().includes(searchKey.toLowerCase())
    || p.fullName.toLowerCase().includes(searchKey.toLowerCase()))
    && p.tags.includes(selectedBadge);
  });

  const renderHeader = () => (
    <div className="flex m-4 items-center">
      <div className="font-semibold md:text-2xl lg:text-3xl text-xl text-left mr-2">
        Harga Crypto dalam Rupiah Hari Ini
      </div>
      <div className="ml-auto">
        <SearchBox value={searchKey} setSearchKey={setSearchKey} />
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="flex m-4 justify-start mt-8 pb-4 overflow-x-auto scrollbar">
      {TAGS.map((item: ITag) => (
        <Badge
          key={item.tag}
          text={item.name}
          tag={item.tag}
          setSelectedBadge={setSelectedBadge}
        />
      ))}
    </div>
  );

  const renderTable = () => {
    if (!symbolList.isLoading && !tickerList.isLoading) {
      const tableHeader = TABLE_CRYPTO_HEADER as ITableHeader[];
      const tableRow = (!symbolList.isLoading && !tickerList.isLoading)
      && finalData.map((item: IToken) => (
        <Token key={item.name} row={item} />
      ));
      return (
        <div className="m-4">
          <Table headerList={tableHeader} data={tableRow} />
        </div>
      );
    }
    return <div />;
  };

  const renderLoading = () => (
    <div className="text-center p-8">
      Loading...
    </div>
  );

  return (
    <>
      <Head>
        <title>Pintu</title>
        <meta name="description" content="Created By : Steven" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        {renderHeader()}
        {renderBadges()}
        {renderTable()}
        {(symbolList.isLoading || tickerList.isLoading) && renderLoading()}
      </main>

    </>
  );
};

export default Home;
