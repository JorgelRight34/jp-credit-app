import { ReactNode, useEffect, useState } from "react";
import "./dataTable.css";
import DataTableNavigation from "./DataTableNavigation";

interface DataTableProps {
  children: ReactNode;
  headers: string[];
  callback?: (...args: any[]) => void;
}

const DataTable = ({ children, headers, callback }: DataTableProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    callback && callback(page);
  }, [page]);

  return (
    <>
      <div className="table-wrapper border rounded-3 shadow-sm mb-5">
        <table className="w-100">
          <thead className="rounded-3">
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <DataTableNavigation page={page} setPage={setPage} />
    </>
  );
};

export default DataTable;
