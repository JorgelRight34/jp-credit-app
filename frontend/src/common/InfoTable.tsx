import React, { ReactNode } from "react";

interface InfoTableProps {
  data: (string | number | ReactNode)[][];
}

/**
 * InfoTable component displays a table with alternating header and data cells.
 * @param {InfoTableProps} props - Props containing the data to be displayed in the table.
 * @returns {JSX.Element} - A JSX element representing the InfoTable.
 */
const InfoTable = ({ data }: InfoTableProps) => {
  return (
    <div className="table-wrapper border rounded-3 shadow-sm">
      <table className="w-100">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((col, key) => (
                <React.Fragment key={key}>
                  {key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
