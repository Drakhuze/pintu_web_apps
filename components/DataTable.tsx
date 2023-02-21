import React from 'react';

export interface ITableHeader {
  id: number,
  title: string,
  width?: string,
  itemAlign?: 'left' | 'center' | 'right' | '',
}

interface Props {
  headerList: ITableHeader[],
  data: any
}

function DataTable({ headerList, data }: Props) {
  return (
    <div>
      <table className="datatable w-full table-fixed">
        <thead className="hidden lg:table-header-group">
          <tr>
            {headerList.map((item: ITableHeader) => (
              <th key={item.id} className={`text-${item.itemAlign}`} style={{ width: `${item.width}` }}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0
            && (
              <tr>
                <td className="p-4 text-center" colSpan={7}>No Data</td>
              </tr>
            )
          }
          {data.length > 0 && data.map((item: JSX.Element) => item)}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
