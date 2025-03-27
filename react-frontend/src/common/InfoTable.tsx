import React from "react";

interface InfoTableProps {
  data: (string | number)[][];
}

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
