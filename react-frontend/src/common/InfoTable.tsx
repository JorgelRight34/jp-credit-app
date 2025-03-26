interface InfoTableProps {
  data: string[][];
}

const InfoTable = ({ data }: InfoTableProps) => {
  return (
    <div className="table-wrapper border rounded-3 shadow-sm">
      <table className="w-100">
        <tbody>
          {data.map((row) => (
            <tr>
              {row.map((col, key) => (
                <>{key % 2 == 0 ? <th>{col}</th> : <td>{col}</td>}</>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
