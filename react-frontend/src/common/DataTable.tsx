import { ReactNode } from "react";
import "./dataTable.css";

interface DataTableProps {
  children: ReactNode;
  headers: string[];
}

const DataTable = ({ children, headers }: DataTableProps) => {
  return (
    <div className="table-wrapper border rounded-3 shadow-sm">
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
  );
};

export default DataTable;
