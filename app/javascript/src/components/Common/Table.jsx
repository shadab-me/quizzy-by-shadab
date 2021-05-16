import { useTable } from "react-table";
import React from "react";
export default function TableUI({ quizzes, handleDelete }) {
  console.log(quizzes);
  const data = React.useMemo(() => quizzes, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "All Quizzes",
        accessor: "title", // accessor is the "key" in the data
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="table-fixed p-5 mt-5 lg:w-1/2 rounded-md md:w-full sm:w-full"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <h1 className="text-4xl mt-12 mb-6">
                  {" "}
                  {column.render("Header")}
                </h1>
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
                    className="bg-gray-200 hover:transition-all flex justify-between"
                  >
                    <div className="title">
                      <a href="" className="p-3 text-lg text-blue-600">
                        {" "}
                        {cell.render("Cell")}{" "}
                      </a>
                    </div>
                    <div className="actions">
                      <button className="bg-blue-600 text-white text-lg p-1 rounded-sm focus:outline-none">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.original.id)}
                        className="bg-red-600 text-white text-lg p-1 rounded-sm focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
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
