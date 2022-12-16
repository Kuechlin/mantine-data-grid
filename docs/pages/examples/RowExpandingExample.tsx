import {
  booleanFilterFn,
  DataGrid,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from '../../../src';
import { demoData } from '../../demoData';

export default function RowExpandingExample() {
  return (
    <DataGrid
      data={demoData.slice(0, 25)}
      highlightOnHover
      withRowExpanding
      renderSubComponent={(row) => <pre children={JSON.stringify(row.original, null, 2)} />}
      getRowCanExpand={() => true}
      onRow={(row) => {
        return row.getCanExpand()
          ? {
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' },
            }
          : {};
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
