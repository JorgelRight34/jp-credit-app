import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

interface DataTableNavigationProps<TData> {
  table: Table<TData>;
  total: number;
}

/**
 * DataTableNavigation component provides pagination controls for a data table.
 *
 * It displays the number of currently visible rows and the total number of results.
 * The component also includes "Anterior" (Previous) and "Siguiente" (Next) buttons
 * to navigate between pages of the table.
 *
 * @template TData - The shape of the table data.
 *
 * @param {Object} props - Component props.
 * @param {Table<TData>} props.table - An instance of the TanStack Table that manages pagination state and navigation methods.
 * @param {number} props.total - The total number of results across all pages.
 *
 * @returns {JSX.Element} Pagination UI for navigating the data table.
 *
 * @example
 * <DataTableNavigation table={table} total={100} />
 */
const DataTableNavigation = <TData,>({
  table,
  total = 0,
}: DataTableNavigationProps<TData>) => {
  const rows = table.getRowModel().rows;
  const hasNext = useMemo(() => rows.length !== 0, [rows]);

  return (
    <div className="d-flex align-items-center p-3 justify-content-center">
      <span className="text-muted">
        Mostrando {table.getRowModel().rows.length} de {total} resultados de la
        página {table.getState().pagination.pageIndex}.
      </span>
      <div className="ms-auto">
        <button
          className="btn btn-accent shadow-sm me-5"
          onClick={table.previousPage}
          disabled={table.getState().pagination.pageIndex - 1 < 0}
        >
          Anterior
        </button>
        <button
          className="btn btn-accent shadow-sm"
          disabled={!hasNext}
          onClick={table.nextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DataTableNavigation;
