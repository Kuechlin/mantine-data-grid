import { Checkbox } from '@mantine/core';
import { ColumnDef, RowData } from '@tanstack/react-table';

export const getRowSelectionColumn = <TData extends RowData>(): ColumnDef<TData, unknown> => ({
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      indeterminate={table.getIsSomeRowsSelected()}
      checked={table.getIsAllRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
  size: 24,
});
