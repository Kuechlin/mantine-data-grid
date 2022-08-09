import { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';
import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { demoData } from '../../demoData';

export default function StateExample() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <CodeDemo code={grid_usage}>
      <DataGrid
        data={demoData.slice(0, 25)}
        striped
        highlightOnHover
        withColumnFilters
        onFilter={setColumnFilters}
        state={{
          columnFilters,
        }}
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
      />
    </CodeDemo>
  );
}
const grid_usage = `
import {
  DataGrid,
  booleanFilterFn,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from 'mantine-data-grid';

export function Demo() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <DataGrid
      data={demoData.slice(0, 25)}
      striped
      highlightOnHover
      withColumnFilters
      onFilter={setColumnFilters}
      state={{
        columnFilters,
      }}
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
    />
  );
}
`;
