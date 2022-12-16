import { Stack, Text, Title } from '@mantine/core';
import { PropertyTable } from '../components/PropertyTable';
import { See } from '../components/See';

export default function Properties() {
  return (
    <Stack p="md">
      <Title order={2} style={{ display: 'flex' }}>
        {'DataGrid<'}
        <Text inherit inline color="orange" children="TData extends object = any" />
        {'> component props'}
      </Title>
      <PropertyTable
        groups={[
          {
            group: 'Common',
            children: [
              {
                name: 'columns',
                required: true,
                type: 'ColumnDef<TData, any>[]',
                description: 'Gird column definitions',
              },
              {
                name: 'data',
                required: true,
                type: 'TData[]',
                description: 'Grid data',
              },
              {
                name: 'total',
                type: 'number',
                description: (
                  <>
                    Total number of items for external data. <See ex="async" />
                  </>
                ),
              },
              {
                name: 'tableRef',
                type: 'Ref<Table<TData>>',
                description: 'Table instance ref',
              },
              {
                name: 'initialState',
                type: 'InitialTableState',
                description: (
                  <>
                    The initial table state. <See ex="initialState" />
                  </>
                ),
              },
              {
                name: 'state',
                type: 'Partial<TableState>',
                description: (
                  <>
                    The partial state of the table. <See ex="state" />
                  </>
                ),
              },
              {
                name: 'onRow',
                type: '(row: Row<TData>) => HTMLAttributes<HTMLTableRowElement>',
                description: (
                  <>
                    Callback to set props pre row. <See ex="onRowClick" />
                  </>
                ),
              },
              {
                name: 'onCell',
                type: '(cell: Cell<TData, unknown>) => HTMLAttributes<HTMLTableCellElement>',
                description: (
                  <>
                    Callback to set props pre cell. <See ex="onRowClick" />
                  </>
                ),
              },
              {
                name: 'empty',
                type: 'ReactElement',
                description: (
                  <>
                    Empty table element. <See ex="empty" />
                  </>
                ),
              },
              {
                name: 'locale',
                type: 'DataGridLocale',
                description: (
                  <>
                    The i18n text including pagination text, pageSize text, globalSearch placeholder.
                    <See ex="locale" />
                  </>
                ),
              },
              {
                name: 'components',
                type: 'DataGridComponents<TData>',
                description: 'Component overrides',
              },
              {
                name: 'options',
                type: 'DataGridOptionsOverride<TData>',
                description: 'Table Options overrides',
              },
            ],
          },
          {
            group: 'Styles',
            children: [
              { name: 'height', type: 'number', description: 'Table height' },
              { name: 'width', type: 'number', description: 'Table width' },
              { name: 'withFixedHeader', type: 'boolean', description: 'Enable fixed header' },
              {
                name: 'noFlexLayout',
                type: 'boolean',
                description: 'Disable flex layout',
              },
              {
                name: 'debug',
                type: 'boolean',
                description: 'If true react-table debug log is enabled',
              },
              {
                name: 'striped',
                type: 'boolean',
                description: 'If true every odd row of table will have gray background color',
              },
              {
                name: 'highlightOnHover',
                type: 'boolean',
                description: 'If true row will have hover color',
              },
              {
                name: 'horizontalSpacing',
                type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
                description: 'Horizontal cells spacing from theme.spacing or number to set value in px',
              },
              {
                name: 'verticalSpacing',
                type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
                description: 'Vertical cells spacing from theme.spacing or number to set value in px',
              },
              {
                name: 'fontSize',
                type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
                description: 'Sets font size of all text inside table',
              },
              {
                name: 'loading',
                type: 'boolean',
                description: 'Show loading overlay',
              },
            ],
          },
          {
            group: 'Resizing',
            children: [{ name: 'withColumnResizing', type: 'boolean', description: 'Enables column resizing' }],
          },
          {
            group: 'Pagination',
            children: [
              {
                name: 'withPagination',
                type: 'boolean',
                description: 'Enables pagination',
              },
              {
                name: 'pageSizes',
                type: 'string[]',
                description:
                  'Sets of string for page size (rows per page) selections.\nDefault is `["10", "25", "50", "100"]`',
              },
              {
                name: 'onPageChange',
                type: 'OnChangeCallback<DataGridPaginationState>',
                description: 'Callback when page index or page size changed',
              },
              {
                name: 'paginationMode',
                type: '"default" | "compact"',
                description: '"compact" mode will only show pagination step without page size and current page info',
              },
              {
                name: 'autoResetPageIndex',
                type: 'boolean',
                description:
                  'If set to false, pagination will NOT be reset to the first page when page-altering state changes eg. data is updated, filters change, grouping changes, etc.',
              },
            ],
          },
          {
            group: 'Global filter',
            children: [
              {
                name: 'withGlobalFilter',
                type: 'boolean',
                description: 'Enables global search filter',
              },
              {
                name: 'onSearch',
                type: 'OnChangeCallback<string>',
                description: 'Callback when global filter changed',
              },
            ],
          },
          {
            group: 'Column filter',
            children: [
              {
                name: 'withColumnFilters',
                type: 'boolean',
                description: 'Enables column filters ',
              },
              {
                name: 'onFilter',
                type: 'OnChangeCallback<DataGridFiltersState>',
                description: 'Callback when column filter changed',
              },
            ],
          },
          {
            group: 'Sorting',
            children: [
              {
                name: 'withSorting',
                type: 'boolean',
                description: 'Enables sorting',
              },
              {
                name: 'onSort',
                type: 'OnChangeCallback<DataGridSortingState>',
                description: 'Callback when sorting changed',
              },
            ],
          },
          {
            group: 'Row Selection',
            children: [
              { name: 'withRowSelection', type: 'boolean', description: 'Enables row selection' },
              {
                name: 'onRowSelectionChange',
                type: 'OnChangeCallback<RowSelectionState>',
                description: 'Callback when row selection changed',
              },
            ],
          },
          {
            group: 'Row Expanding',
            children: [
              { name: 'withRowExpanding', type: 'boolean', description: 'Enables row expanding ' },
              {
                name: 'getRowCanExpand',
                type: '(row: Row<TData>) => boolean',
                description: 'Allows you to determining whether a row can be expanded.',
              },
              {
                name: 'renderSubComponent',
                type: '(row: Row<TData>) => ReactNode',
                description: 'Render sub component for expanded row',
              },
              {
                name: 'onExpandedChange',
                type: 'OnChangeCallback<DataGridExpandedState>',
                description: 'Callback when expanded rows change',
              },
            ],
          },
        ]}
      />
    </Stack>
  );
}
