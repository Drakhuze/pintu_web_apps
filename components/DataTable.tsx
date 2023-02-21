import { IFinalData } from "@/interfaces";

export interface ITableHeader {
  title: string | JSX.Element,
  width?: string,
  itemAlign?: "left" | "center" | "right" | "",
}

interface Props {
  headerList: ITableHeader[],
  data: any,
}

const DataTable = (props: Props) => {
  return (
    <div>
      <table className="datatable w-full table-fixed">
        <thead className="hidden lg:table-header-group">
          <tr>
            {props.headerList.map((item: ITableHeader, index: number) => {
              return (
                <th key={index} className={`text-${item.itemAlign}`} style={{width: `${item.width}`}}>{item.title}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item: JSX.Element, index: number) => {
            return item;
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable;