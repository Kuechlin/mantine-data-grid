import { Stack, Card, Text, Group } from '@mantine/core';
import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
  ExternalColumnFilter,
  useDataGrid,
} from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { Data, demoData } from '../../demoData';

export default function ExternalFilterExample() {
  const [table, setRef] = useDataGrid<Data>();

  return (
    <CodeDemo code={grid_usage}>
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

function Demo() {
    return (
        <DataGrid
            data={data}
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
                    cell: (cell) =>
                        cell.getValue<Date>()?.toLocaleDateString(),
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
