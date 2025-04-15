import { ReactEventHandler, useEffect, useState } from "react";
import "./dataTable.css";
import DataTableNavigation from "./DataTableNavigation";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: TData) => void;
  navigateCallback?: (page: number) => void;
}

/**
 * DataTable component using React Table library.
 * It displays a table with sortable columns and pagination.
 * @param {Array<TData>} data - The data to be displayed in the table.
 * @param {Array<ColumnDef<TData>>} columns - The column definitions for the table.
 * @param {function} onRowClick - Optional callback function to handle row clicks.
 */
const DataTable = <TData,>({
  data,
  columns,
  onRowClick,
  navigateCallback,
}: DataTableProps<TData>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    manualPagination: navigateCallback ? true : false,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (!navigateCallback) return;
    const fetchMore = async () => navigateCallback(pagination.pageIndex + 1);
    fetchMore();
  }, [pagination]);

  return (
    <div className="border rounded-3 shadow-sm">
      <div className="table-wrapper">
        <table className="w-100">
          {/* Header */}
          <thead className="rounded-3">
            {/* Get all header groups from table */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer hover"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <FontAwesomeIcon className="ms-2" icon={faSort} />
                      )}
                    </div>
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
                  onRowClick
                    ? (event: React.MouseEvent) => {
                        console.log("hey");
                        event.stopPropagation();
                        onRowClick(row.original);
                      }
                    : undefined
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
      <div className="border p-0">
        <DataTableNavigation table={table} total={data.length} />
      </div>
    </div>
  );
};

export default DataTable;
