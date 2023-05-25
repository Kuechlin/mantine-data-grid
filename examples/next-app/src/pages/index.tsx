import { Button, Group, Stack, Title, useMantineColorScheme } from '@mantine/core';
import {
  DataGrid,
  booleanFilterFn,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from 'mantine-data-grid';
import { useEffect, useState } from 'react';
import { Data, demoData } from '../data/demoData';

export default function Home({}) {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => setData(demoData), []);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Stack p="md">
      <Group position="apart">
        <Title>next example</Title>
        <Button variant="outline" onClick={(e) => toggleColorScheme()}>
          {colorScheme}
        </Button>
      </Group>
      <DataGrid
        data={data}
        striped
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        withColumnResizing
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
