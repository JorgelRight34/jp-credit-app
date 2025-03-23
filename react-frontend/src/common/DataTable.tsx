import { ReactNode } from "react";
import "./dataTable.css";

interface DataTableProps {
  children: ReactNode;
  headers: string[];
}

const DataTable = ({ children, headers }: DataTableProps) => {
  return (
    <table className="border w-100 shadow-sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default DataTable;
