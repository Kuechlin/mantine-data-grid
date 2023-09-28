import { Checkbox } from '@mantine/core';
import { ColumnDef, RowData } from '@tanstack/react-table';

export type RowSelectionColumn<TData extends RowData> = ColumnDef<TData, unknown>;

export const getRowSelectionColumn = <TData extends RowData>(): RowSelectionColumn<TData> => ({
  id: 'select',
  header: ({ table }) =>
    table.options.enableMultiRowSelection !== false ? (
      <Checkbox
        indeterminate={table.getIsSomeRowsSelected()}
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ) : null,
  cell: ({ row }) => (
    <Checkbox disabled={!row.getCanSelect()} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
  ),
  size: 44,
  minSize: 44,
  maxSize: 44,
  enableResizing: false,
});
