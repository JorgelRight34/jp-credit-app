import { useState } from "react";
import "./dataTable.css";
import DataTableNavigation from "./DataTableNavigation";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: TData) => void;
}

const DataTable = <TData,>({
  data,
  columns,
  onRowClick,
}: DataTableProps<TData>) => {
  const [page, setPage] = useState(1);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="table-wrapper border rounded-3 shadow-sm mb-5">
        <table className="w-100">
          {/* Header */}
          <thead className="rounded-3">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={
                  onRowClick ? () => onRowClick(row.original) : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DataTableNavigation page={page} setPage={setPage} />
    </>
  );
};

export default DataTable;
