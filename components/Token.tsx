import React, { useLayoutEffect, useState } from 'react';
import { IToken } from '@/interfaces';
import { formatCurrency, formatPercentage, usdToIdr } from '@/utilities';
import CaretDownIcon from '@/assets/CaretDownIcon';
import CaretUpIcon from '@/assets/CaretUpIcon';

interface Props {
  row: IToken
}

function Token({ row }: Props) {
  const [price, setPrice] = useState(row.price);
  const [lowPrice, setLowPrice] = useState(row.lowPrice);
  const [highPrice, setHighPrice] = useState(row.highPrice);

  const [priceColor, setPriceColor] = useState('text-white');
  const [lowPriceColor, setLowPriceColor] = useState('text-white');
  const [highPriceColor, setHighPriceColor] = useState('text-white');

  const formattedPrice = formatCurrency(usdToIdr(Number(row.price)), 0);
  const formattedLowPrice = formatCurrency(usdToIdr(Number(row.lowPrice)), 0);
  const formattedHighPrice = formatCurrency(usdToIdr(Number(row.highPrice)), 0);
  const formattedPercent = formatPercentage(Number(row.priceChangePercent), 2);

  const percentColor = Number(row.priceChangePercent) === 0 ? 'text-white' : Number(row.priceChangePercent) > 0 ? 'text-green-500' : 'text-red-500';
  const transition = 'transition ease-linear duration-500';

  useLayoutEffect(() => {
    setPrice(row.price);
    setLowPrice(row.lowPrice);
    setHighPrice(row.highPrice);

    if (Number(price) !== Number(row.price)) {
      if (Number(price) < Number(row.price)) {
        setPriceColor('text-green-500');
      } else if (Number(price) > Number(row.price)) {
        setPriceColor('text-red-500');
      }
      setTimeout(() => {
        setPriceColor(`text-white ${transition}`);
      }, 500);
    }
    if (Number(lowPrice) !== Number(row.lowPrice)) {
      if (Number(lowPrice) < Number(row.lowPrice)) {
        setLowPriceColor('text-green-500');
      } else if (Number(lowPrice) > Number(row.lowPrice)) {
        setLowPriceColor('text-red-500');
      }
      setTimeout(() => {
        setLowPriceColor(`text-white ${transition}`);
      }, 500);
    }
    if (Number(highPrice) !== Number(row.highPrice)) {
      if (Number(highPrice) < Number(row.highPrice)) {
        setHighPriceColor('text-green-500');
      } else if (Number(highPrice) > Number(row.highPrice)) {
        setHighPriceColor('text-red-500');
      }
      setTimeout(() => {
        setHighPriceColor(`text-white ${transition}`);
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
          <span className={priceColor}>
            {`Rp ${formattedPrice}`}
          </span>
        </td>
        <td className="text-right">
          <span className={`${percentColor} flex justify-end items-center`}>
            {
              Number(row.priceChangePercent) > 0
                ? <CaretUpIcon className={`${percentColor} w-8`} /> : Number(row.priceChangePercent) < 0
                && <CaretDownIcon className={`${percentColor} w-8`} />
            }
            {`${formattedPercent}%`}
          </span>
        </td>
        <td className="text-right">
          <span className={`${lowPriceColor}`}>
            {`Rp ${formattedLowPrice}`}
          </span>
        </td>
        <td className="text-right">
          <span className={`${highPriceColor}`}>
            {`Rp ${formattedHighPrice}`}
          </span>
        </td>
      </tr>

      <tr className="token token-sm flex lg:hidden items-center transtition ease-in-out duration-200 hover:bg-slate-900 cursor-pointer">
        <td className="p-0">
          <div
            className="h-10 w-10 rounded-full"
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
            <span className={`${priceColor}`}>
              {`Rp ${formattedPrice}`}
            </span>
          </div>
          <div>
            <span className={`${percentColor} flex justify-end items-center`}>
              {
                Number(row.priceChangePercent) > 0
                  ? <CaretUpIcon className={`${percentColor} w-8`} /> : Number(row.priceChangePercent) < 0
                  && <CaretDownIcon className={`${percentColor} w-8`} />
              }
              {`${formattedPercent}%`}
            </span>
          </div>
        </td>
      </tr>
    </>
  );
}

export default Token;
