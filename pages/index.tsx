import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Badge from '@/components/Badge';
import { NextPage } from 'next';
import { TABLE_CRYPTO_HEADER, TAGS, TOP_MOVERS_SIZE } from '@/constants';
import {
  IToken, ISymbol, ITag, ITicker,
} from '@/interfaces';
import SearchBox from '@/components/SearchBox';
import Table, { ITableHeader } from '@/components/Table';
import Token from '@/components/Token';
import { useSymbolList } from '@/hooks/useSymbolList';
import { useTickerList } from '@/hooks/useTickerList';
import _ from 'lodash';
import {
  convertPositive, formatCurrency, formatPercentage, usdToIdr,
} from '@/utilities';
import CaretUpIcon from '@/assets/CaretUpIcon';
import CaretDownIcon from '@/assets/CaretDownIcon';
import Skeleton from '@/components/Skeleton';

const Home: NextPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [prevTicker, setPrevTicker] = useState<ITicker[]>();

  const symbolList = useSymbolList();
  const tickerList = useTickerList(symbolList.isSuccess, symbolList.data?.data);

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
      ...item,
    })) as ISymbol[];

    const tickers = tickerList !== undefined && tickerList.isSuccess === true
      ? tickerList.data.map((item: ITicker) => ({
        ...item,
      })) as ITicker[] : null;

    const result = symbols?.map((item: ISymbol) => {
      const ticker = tickers !== null
        ? tickers?.filter((p) => p.symbol === item.symbol)[0]
        : prevTicker?.filter((p) => p.symbol === item.symbol)[0];
      return {
        ...item,
        price: ticker?.lastPrice,
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

  const topAllMovers = combinedData === undefined ? [] : _.cloneDeep(combinedData);
  topAllMovers.sort((a, b) => {
    if (a.priceChangePercent === null) return -1;
    if (b.priceChangePercent === null) return 1;
    return convertPositive(Number(a.priceChangePercent))
      < convertPositive(Number(b.priceChangePercent)) ? 1 : -1;
  });

  const finalData = combinedData === undefined ? [] : combinedData?.filter((p) => {
    if (searchKey === '' && selectedBadge === '') return combinedData; // i < 100 | combinedData
    if (selectedBadge === '') return (p.name.toLowerCase().includes(searchKey.toLowerCase()) || p.fullName.toLowerCase().includes(searchKey.toLowerCase()));
    return (p.name.toLowerCase().includes(searchKey.toLowerCase())
      || p.fullName.toLowerCase().includes(searchKey.toLowerCase()))
      && p.tags.includes(selectedBadge);
  });

  const renderHeader = () => (
    <div className="lg:flex m-4 mt-8 items-center">
      <div className="font-semibold md:text-2xl lg:text-3xl lg:pb-0 pb-4 text-xl text-left mr-2">
        Harga Crypto dalam Rupiah Hari Ini
      </div>
      <div className="ml-auto">
        <SearchBox value={searchKey} setSearchKey={setSearchKey} />
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="flex m-4 justify-start overflow-x-auto scrollbar">
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
    if (!symbolList.isLoading) {
      const tableHeader = TABLE_CRYPTO_HEADER as ITableHeader[];
      const tableRow = (!symbolList.isLoading)
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

  const renderStatus = () => (
    symbolList.isLoading
      ? (
        <div className="m-4 border border-neutral-800">
          <div className="text-center p-4">
            Loading...
          </div>
        </div>
      )
      : symbolList.isError
      && (
        <div className="m-4 border border-neutral-800">
          <div className="text-center p-4">
            Error when fetching the API...
          </div>
        </div>
      )
  );

  const renderTopMovers = () => {
    const topMovers = topAllMovers.slice(0, TOP_MOVERS_SIZE).map((item: IToken) => {
      const percentColor = Number(item.priceChangePercent) === 0 ? 'text-white' : Number(item.priceChangePercent) > 0 ? 'text-green-500' : 'text-red-500';

      const formattedPrice = formatCurrency(usdToIdr(Number(item.price)), 0);
      const formattedPercent = formatPercentage(Number(item.priceChangePercent), 2);

      return (
        <div className="p-2 m-2 ml-0 border border-neutral-800 flex-grow min-w-[150px] hover:bg-slate-900 cursor-pointer">
          <div className="flex items-center">
            <div
              className="min-h-[32px] min-w-[32px] rounded-full"
              style={{
                backgroundImage: `url('${item.logo}')`,
                backgroundSize: 'contain',
              }}
            />
            <div className="pl-2 overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">
              {item.name}
            </div>
          </div>
          <div className="flex items-center pt-1">
            <div className="font-light text-neutral-300 text-sm">
              {`Rp ${formattedPrice}`}
            </div>
          </div>
          <div className={`${percentColor} flex ml-auto items-center font-bold`}>
            {item.priceChangePercent !== undefined
              ? (
                <>
                  {Number(item.priceChangePercent) > 0
                    ? <CaretUpIcon className={`${percentColor} w-4`} /> : Number(item.priceChangePercent) < 0
                && <CaretDownIcon className={`${percentColor} w-4`} />}

                  {`${formattedPercent}%`}
                </>
              )
              : <Skeleton className="h-5 w-16" />}
          </div>
        </div>
      );
    });

    return (
      (symbolList.isSuccess && (tickerList.isSuccess || prevTicker !== undefined))
        && (
          <div className="m-4 mt-12">
            <span className="font-semibold text-xl">🔥 Top Movers (24 Jam)</span>
            <div className="flex justify-start mt-4 overflow-x-auto scrollbar">
              {topMovers}
            </div>
          </div>
        )
    );
  };

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
        {renderTopMovers()}
        {renderBadges()}
        {renderTable()}
        {renderStatus()}
      </main>

    </>
  );
};

export default Home;
