import { useTable } from "react-table";
import React from "react";
import Button from "components/Button";
export default function TableUI({ quizzes, handleDelete }) {
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
          <tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column} {...column.getHeaderProps()}>
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
            <tr key={row.original.id} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    key={row.original.id}
                    {...cell.getCellProps()}
                    className="bg-gray-200 hover:transition-all flex justify-between"
                  >
                    <div className="title">
                      <a href="" className="p-3 text-lg text-blue-600">
                        {" "}
                        {cell.render("Cell")}{" "}
                      </a>
                    </div>
                    <div className="flex justify-between items-center gap-x-2">
                      <Button
                        size="small"
                        type="link"
                        path={`/quizzes/${row.original.id}/edit`}
                        buttonText="Edit"
                      />
                      <Button
                        size="small"
                        onClick={() => handleDelete(row.original.id)}
                        buttonText="Delete"
                      />
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
