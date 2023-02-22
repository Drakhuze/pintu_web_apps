import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PillText from '@/components/PillText';
import { useQuery } from 'react-query';
import { NextPage } from 'next';
import {
  API, REFETCH_INTERVAL, TABLE_CRYPTO_HEADER, TAGS,
} from '@/constants';
import {
  IFinalData, ISymbol, ITag, ITicker,
} from '@/interfaces';
import SearchBox from '@/components/SearchBox';
import DataTable, { ITableHeader } from '@/components/DataTable';
import TableTokenRow from '@/components/TableTokenRow';

const getSymbolList = async () => (await fetch(API.symbolList)).json();
const getTickerList = async () => (await fetch(API.ticker)).json();

const Home: NextPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedPill, setSelectedPill] = useState('');

  const symbolList = useQuery('symbolList', getSymbolList);
  const tickerList = useQuery('tickerList', getTickerList, {
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    setSearchKey('');
  }, [selectedPill]);

  const combinedData = useMemo(() => {
    if (symbolList === undefined && tickerList === undefined) {
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

    const tickers = tickerList.data?.map((item: ITicker) => ({
      symbol: item.symbol,
      priceChange: item.priceChange,
      priceChangePercent: item.priceChangePercent,
      lastPrice: item.lastPrice,
      volume: item.volume,
      highPrice: item.highPrice,
      lowPrice: item.lowPrice,
    })) as ITicker[];

    const result = symbols?.map((item: ISymbol) => {
      const ticker = tickers?.filter((p) => p.symbol === item.symbol)[0];
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
    }) as IFinalData[];
    return result;
  }, [symbolList, tickerList]);

  // const combinedData = (symbolList.isSuccess && tickerList.isSuccess) ? getCombinedData() : [];
  if (combinedData !== undefined) {
    combinedData?.sort((a, b) => {
      if (a.rank === null) return 1;
      if (b.rank === null) return -1;
      return a.rank < b.rank ? -1 : 1;
    });
  }

  const finalData = combinedData === undefined ? [] : combinedData?.filter((p) => {
    if (searchKey === '' && selectedPill === '') return combinedData;
    if (selectedPill === '') return (p.name.toLowerCase().includes(searchKey.toLowerCase()) || p.fullName.toLowerCase().includes(searchKey.toLowerCase()));

    return (p.name.toLowerCase().includes(searchKey.toLowerCase())
    || p.fullName.toLowerCase().includes(searchKey.toLowerCase()))
    && p.tags.includes(selectedPill);
  });

  const renderHeader = () => (
    <div className="flex m-4 items-center">
      <div className="font-bold text-2xl text-left mr-2">
        Harga Crypto dalam Rupiah Hari Ini
      </div>
      <div className="ml-auto">
        <SearchBox value={searchKey} setSearchKey={setSearchKey} />
      </div>
    </div>
  );

  const renderPillList = () => (
    <div className="flex m-4 justify-start mt-8 pb-4 overflow-x-auto scrollbar">
      {TAGS.map((item: ITag) => (
        <PillText
          key={item.tag}
          text={item.name}
          tag={item.tag}
          setSelectedPill={setSelectedPill}
        />
      ))}
    </div>
  );

  const renderTable = () => {
    if (!symbolList.isLoading && !tickerList.isLoading) {
      const tableHeader = TABLE_CRYPTO_HEADER as ITableHeader[];
      const tableRow = (!symbolList.isLoading && !tickerList.isLoading)
      && finalData.map((item: IFinalData) => (
        <TableTokenRow key={item.name} row={item} />
      ));
      return (
        <div className="m-4">
          <DataTable headerList={tableHeader} data={tableRow} />
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
        {renderPillList()}
        {(symbolList.isLoading || tickerList.isLoading) && renderLoading()}
        {renderTable()}
      </main>

    </>
  );
};

export default Home;
