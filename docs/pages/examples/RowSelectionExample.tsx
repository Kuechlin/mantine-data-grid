import { Button } from '@mantine/core';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import { demoData } from '../../demoData';

export default function RowSelectionExample() {
  const [data, setData] = useState(demoData);
  const [selected, setSelected] = useState<RowSelectionState>({});

  const removeSelected = () => {
    const next = data.filter((_, i) => !selected[i]);
    setSelected({});
    setData(next);
  };

  return (
    <>
      <Button onClick={removeSelected}>Remove Selected</Button>
      <DataGrid
        data={data}
        striped
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        withColumnResizing
        withRowSelection
        state={{
          rowSelection: selected,
        }}
        onRowSelectionChange={setSelected}
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
    </>
  );
}
