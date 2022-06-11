import { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilter from './globalFilter';

export const RepoTable = ({ repoAPI }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => repoAPI, [repoAPI]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      {/* eslint-disable react/jsx-key */}
      {/* the jsx key is provided in the .get*Props() spreads, but eslint doesn't believe me. */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default RepoTable;
