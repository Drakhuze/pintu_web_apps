import React, { useLayoutEffect, useState } from 'react';
import { IToken } from '@/interfaces';
import { formatCurrency, usdToIdr } from '@/utilities';

interface Props {
  row: IToken
}

function Token({ row }: Props) {
  const [price, setPrice] = useState(row.price);
  const [lowPrice, setLowPrice] = useState(row.lowPrice);
  const [highPrice, setHighPrice] = useState(row.highPrice);

  const [changePriceColor, setChangePriceColor] = useState('text-white');
  const [changeLowPriceColor, setChangeLowPriceColor] = useState('text-white');
  const [changeHighPriceColor, setChangeHighPriceColor] = useState('text-white');

  const isChangePrice = Number(price) !== Number(row.price);
  const isChangeLowPrice = Number(lowPrice) !== Number(row.lowPrice);
  const isChangeHighPrice = Number(highPrice) !== Number(row.highPrice);

  const formattedPrice = formatCurrency(usdToIdr(Number(row.price)));
  const formattedLowPrice = formatCurrency(usdToIdr(Number(row.lowPrice)));
  const formattedHighPrice = formatCurrency(usdToIdr(Number(row.highPrice)));

  const percentColor = Number(row.priceChangePercent) === 0 ? 'text-white' : Number(row.priceChangePercent) > 0 ? 'text-green-500' : 'text-red-500';
  const transition = 'transition ease-linear duration-500';

  useLayoutEffect(() => {
    setPrice(row.price);
    setLowPrice(row.lowPrice);
    setHighPrice(row.highPrice);

    if (isChangePrice) {
      if (Number(price) < Number(row.price)) {
        setChangePriceColor('text-green-500');
      } else if (Number(price) > Number(row.price)) {
        setChangePriceColor('text-red-500');
      }
      setTimeout(() => {
        setChangePriceColor(`text-white ${transition}`);
      }, 500);
    }
    if (isChangeLowPrice) {
      if (Number(lowPrice) < Number(row.lowPrice)) {
        setChangeLowPriceColor('text-green-500');
      } else if (Number(lowPrice) > Number(row.lowPrice)) {
        setChangeLowPriceColor('text-red-500');
      }
      setTimeout(() => {
        setChangeLowPriceColor(`text-white ${transition}`);
      }, 500);
    }
    if (isChangeHighPrice) {
      if (Number(highPrice) < Number(row.highPrice)) {
        setChangeHighPriceColor('text-green-500');
      } else if (Number(highPrice) > Number(row.highPrice)) {
        setChangeHighPriceColor('text-red-500');
      }
      setTimeout(() => {
        setChangeHighPriceColor(`text-white ${transition}`);
      }, 500);
    }
  }, [row]);

  return (
    <>
      <tr key={row.name} className="token token-lg hidden lg:table-row hover:bg-slate-900 cursor-pointer">
        <td className="">
          <div
            className="h-10 w-10 rounded-full mx-auto"
            style={{
              backgroundImage: `url('${row.logo}')`,
              backgroundSize: 'contain',
            }}
          />
        </td>
        <td className="">{row.fullName}</td>
        <td className="text-neutral-500">{row.name}</td>
        <td className="text-left">
          <span className={changePriceColor}>
            {formattedPrice}
          </span>
        </td>
        <td className="text-right">
          <span className={`${percentColor}`}>
            {Number(row.priceChangePercent).toFixed(2)}
            %
          </span>
        </td>
        <td className="text-right">
          <span className={`${changeLowPriceColor}`}>
            {formattedLowPrice}
          </span>
        </td>
        <td className="text-right">
          <span className={`${changeHighPriceColor}`}>
            {formattedHighPrice}
          </span>
        </td>
      </tr>

      <tr className="token token-sm flex lg:hidden items-center transtition ease-in-out duration-200 hover:bg-slate-900 cursor-pointer">
        <td className="p-0">
          <div
            className="h-10 w-10 "
            style={{
              backgroundImage: `url('${row.logo}')`,
              backgroundSize: 'contain',
            }}
          />
        </td>
        <td className="flex flex-col">
          <span>{row.fullName}</span>
          <span className="text-neutral-500">{row.name}</span>
        </td>
        <td className="flex flex-col ml-auto text-right">
          <div>
            <span className={`${changePriceColor}`}>
              {formattedPrice}
            </span>
          </div>
          <div>
            <span className={`${percentColor} flex justify-end`}>
              {Number(row.priceChangePercent).toFixed(2)}
              %
            </span>
          </div>
        </td>
      </tr>
    </>
  );
}

export default Token;
