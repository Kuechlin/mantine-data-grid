import { Badge, Group } from '@mantine/core';
import { DataGrid, stringFilterFn } from '../../../src';

const data = [
  {
    name: 'First',
    items: [
      { name: '2001', role: 'test' },
      { name: '2002', role: 'testing' },
    ],
  },
  {
    name: 'Second',
    items: [
      { name: '2001', role: 'test' },
      { name: '2003', role: 'other' },
    ],
  },
];

export default function NestedExample() {
  return (
    <DataGrid<(typeof data)[0]>
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
          accessorKey: 'name',
          header: 'name',
          filterFn: stringFilterFn,
          size: 100,
        },
        {
          header: 'Years',
          accessorFn: (v) => JSON.stringify(v.items),
          cell: ({ row }) => (
            <Group>
              {row.original.items.map((role, i) => {
                return (
                  <Badge key={i} size="sm" radius="sm">
                    {role.name}
                  </Badge>
                );
              })}
            </Group>
          ),
        },
      ]}
    />
  );
}
