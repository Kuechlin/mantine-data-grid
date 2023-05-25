import { Button, Stack } from '@mantine/core';
import { useState } from 'react';
import {
  DataGrid,
  DataGridFiltersState,
  booleanFilterFn,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import { demoData } from '../../demoData';

export default function ResetDefaultExample() {
  const [filter, setFilter] = useState<DataGridFiltersState>([]);

  return (
    <Stack>
      <Button disabled={filter.length === 0} onClick={() => setFilter([])}>
        Reset Filters
      </Button>
      <DataGrid
        data={demoData}
        striped
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        withColumnResizing
        state={{
          columnFilters: filter,
        }}
        onFilter={setFilter}
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
    </Stack>
  );
}
