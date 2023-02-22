import React, { useEffect, useState } from 'react';
import { USD_TO_IDR_DEFAULT } from '@/constants';
import { IFinalData } from '@/interfaces';

interface Props {
  row: IFinalData
}

function TableTokenRow({ row }: Props) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const [price, setPrice] = useState(row.price);
  const [lowPrice, setLowPrice] = useState(row.lowPrice);
  const [highPrice, setHighPrice] = useState(row.highPrice);

  const [changePriceColor, setChangePriceColor] = useState('text-white');
  const [changeLowPriceColor, setChangeLowPriceColor] = useState('text-white');
  const [changeHighPriceColor, setChangeHighPriceColor] = useState('text-white');

  const isChangePrice = Number(price) !== Number(row.price);
  const isChangeLowPrice = Number(lowPrice) !== Number(row.lowPrice);
  const isChangeHighPrice = Number(highPrice) !== Number(row.highPrice);

  const rupiahPrice = (Number(row.price) * Number(USD_TO_IDR_DEFAULT));
  const rupiahLowPrice = (Number(row.lowPrice) * Number(USD_TO_IDR_DEFAULT));
  const rupiahHighPrice = (Number(row.highPrice) * Number(USD_TO_IDR_DEFAULT));

  const formattedPrice = currencyFormatter.format(rupiahPrice);
  const formattedLowPrice = currencyFormatter.format(rupiahLowPrice);
  const formattedHighPrice = currencyFormatter.format(rupiahHighPrice);

  const percentColor = Number(row.priceChangePercent) === 0 ? 'text-white' : Number(row.priceChangePercent) > 0 ? 'text-green-400' : 'text-red-400';

  useEffect(() => {
    setPrice(row.price);
    setLowPrice(row.lowPrice);
    setHighPrice(row.highPrice);

    if (isChangePrice) {
      if (Number(price) < Number(row.price)) {
        setChangePriceColor('text-green-400 transition ease-in-out duration-1000');
      } else if (Number(price) > Number(row.price)) {
        setChangePriceColor('text-red-400 transition ease-in-out duration-1000');
      }
      setTimeout(() => {
        setChangePriceColor('text-white transition ease-in-out duration-1000');
      }, 1000);
    }
    if (isChangeLowPrice) {
      if (Number(lowPrice) < Number(row.lowPrice)) {
        setChangeLowPriceColor('text-green-400 transition ease-in-out duration-1000');
      } else if (Number(lowPrice) > Number(row.lowPrice)) {
        setChangeLowPriceColor('text-red-400 transition ease-in-out duration-1000');
      }
      setTimeout(() => {
        setChangeLowPriceColor('text-white transition ease-in-out duration-1000');
      }, 1000);
    }
    if (isChangeHighPrice) {
      if (Number(highPrice) < Number(row.highPrice)) {
        setChangeHighPriceColor('text-green-400 transition ease-in-out duration-1000');
      } else if (Number(highPrice) > Number(row.highPrice)) {
        setChangeHighPriceColor('text-red-400 transition ease-in-out duration-1000');
      }
      setTimeout(() => {
        setChangeHighPriceColor('text-white transition ease-in-out duration-1000');
      }, 1000);
    }
  }, [row]);

  return (
    <>
      <tr key={row.name} className="table-token-row hidden lg:table-row transtition ease-in-out duration-200 hover:bg-slate-900">
        <td className="text-white transition ease-in-out duration-1000">
          <div
            className="h-10 w-10 rounded-full"
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

      <tr className="flex lg:hidden items-center table-token-row-sm transtition ease-in-out duration-200 hover:bg-slate-900">
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

export default TableTokenRow;
