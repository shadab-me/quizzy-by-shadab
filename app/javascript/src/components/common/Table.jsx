import { useTable } from "react-table";
import React from "react";
export default function TableUI({ quizzes }) {
  console.log(quizzes);
  const data = React.useMemo(() => quizzes, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "",
        accessor: "id",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table-fixed">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="bg-gray-200 border border-gray-400 hover:transition-all"
                  >
                    <a href=""> {cell.render("Cell")} </a>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
