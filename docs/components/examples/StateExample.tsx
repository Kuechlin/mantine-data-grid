import { useState } from 'react';
import {
  booleanFilterFn,
  DataGrid,
  DataGridPaginationState,
  DataGridSortingState,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import CodeDemo from '../CodeDemo';
import { demoData } from '../../demoData';

export default function StateExample() {
  const [pagination, setPagination] = useState<DataGridPaginationState>({
    pageIndex: 2,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<DataGridSortingState>([
    {
      id: 'value',
      desc: true,
    },
  ]);

  return (
    <CodeDemo code={grid_usage}>
      <DataGrid
        data={demoData}
        striped
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        columns={[
          {
            accessorKey: 'text',
            header: 'Text that is too long for a Header',
            filterFn: stringFilterFn,
            size: 300,
            cell: highlightFilterValue,
          },
          {
            header: 'Animal',
            columns: [
              { accessorKey: 'cat', filterFn: stringFilterFn },
              {
                accessorKey: 'fish',
                filterFn: stringFilterFn,
              },
            ],
          },
          {
            accessorKey: 'city',
            filterFn: stringFilterFn,
          },
          { accessorKey: 'value', filterFn: numberFilterFn },
          {
            accessorKey: 'date',
            cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
            filterFn: dateFilterFn,
          },
          {
            accessorKey: 'bool',
            filterFn: booleanFilterFn,
          },
        ]}
        onPageChange={setPagination}
        onSort={setSorting}
        state={{
          pagination,
          sorting,
        }}
      />
    </CodeDemo>
  );
}
const grid_usage = `
import {
  booleanFilterFn,
  DataGrid,
  DataGridPaginationState,
  DataGridSortingState,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import CodeDemo from '../CodeDemo';
import { demoData } from '../../demoData';
import { useState } from 'react';
import { PaginationState, SortingState } from '@tanstack/table-core';

function Demo() {
  return (
    <DataGrid
        data={demoData}
        striped
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        columns={[
          {
            accessorKey: 'text',
            header: 'Text that is too long for a Header',
            filterFn: stringFilterFn,
            size: 300,
            cell: highlightFilterValue,
          },
          {
            header: 'Animal',
            columns: [
              { accessorKey: 'cat', filterFn: stringFilterFn },
              {
                accessorKey: 'fish',
                filterFn: stringFilterFn,
              },
            ],
          },
          {
            accessorKey: 'city',
            filterFn: stringFilterFn,
          },
          { accessorKey: 'value', filterFn: numberFilterFn },
          {
            accessorKey: 'date',
            cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
            filterFn: dateFilterFn,
          },
          {
            accessorKey: 'bool',
            filterFn: booleanFilterFn,
          },
        ]}
        onPageChange={setPagination}
        onSort={setSorting}
        state={{
          pagination,
          sorting,
        }}
      />
  );
}
`;
