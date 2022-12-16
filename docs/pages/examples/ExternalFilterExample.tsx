import { Card, Group, Stack, Text } from '@mantine/core';
import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  ExternalColumnFilter,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
  useDataGrid,
} from '../../../src';
import { Data, demoData } from '../../demoData';

export default function ExternalFilterExample() {
  const [table, setRef] = useDataGrid<Data>();

  return (
    <>
      {table && (
        <Group>
          <Card>
            <Stack>
              <Text>Text Filter:</Text>
              <ExternalColumnFilter column={table.getColumn('text')} />
            </Stack>
          </Card>
        </Group>
      )}
      <DataGrid
        data={demoData.splice(0, 25)}
        tableRef={setRef}
        options={{
          enableFilters: true,
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
    </>
  );
}
