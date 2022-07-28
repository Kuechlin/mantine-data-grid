import { Stack, Table, Title, Text, createStyles } from '@mantine/core';
import { Fragment } from 'react';

const Required = () => <Text style={{ display: 'inline' }} color="red" children="*" />;

const useStyles = createStyles((t) => ({
  title: {
    borderBottom: '2px solid ' + t.colors.dark[2] + ' !important',
  },
  subtile: {
    borderBottom: '1px solid ' + t.colors.dark[2] + ' !important',
  },
}));

export default function Properties() {
  const { classes } = useStyles();
  return (
    <Stack p="md">
      <Title order={2} style={{ display: 'flex' }}>
        {'DataGrid<'}
        <Text inherit inline color="orange" children="T extends object = any" />
        {'> component props'}
      </Title>
      <Table>
        <thead>
          <tr>
            <th className={classes.title}>Name</th>
            <th className={classes.title}>Type</th>
            <th className={classes.title}>Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((group) => (
            <Fragment key={group.group}>
              <tr>
                <td colSpan={3} className={classes.subtile}>
                  <Text weight="bold" size="xs" color="dimmed">
                    {group.group}
                  </Text>
                </td>
              </tr>
              {group.children.map((child) => (
                <tr key={child.name}>
                  <td>
                    {child.name}
                    {child.required && <Required />}
                  </td>
                  <td>
                    <Text size="sm" color="orange" children={child.type} />
                  </td>
                  <td>{child.description}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}

const properties = [
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
        description: 'Total number of items for external data',
      },
      {
        name: 'tableRef',
        type: 'Ref<Table<TData>>',
        description: 'Table instance ref',
      },
      {
        name: 'initialState',
        type: 'InitialTableState',
        description: 'The initial table state',
      },
    ],
  },
  {
    group: 'Styles',
    children: [
      { name: 'height', type: 'number', description: 'Table body height' },

      { name: 'withFixedHeader', type: 'boolean', description: 'Enable fixed header' },
      {
        name: 'noEllipsis',
        type: 'boolean',
        description: 'Text overflow ellipsis is disable',
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
        description: 'Sets of string for page size (rows per page) selections.\nDefault is `["10", "25", "50", "100"]`',
      },
      {
        name: 'initialPageIndex',
        type: 'number',
        description: 'An initial current page index.\nDefault is `0` ',
      },
      {
        name: 'initialPageSize',
        type: 'number',
        description: 'An initial current page size (rows per page).\nDefault is `10`  ',
      },
      {
        name: 'onPageChange',
        type: 'OnChangeCallback<DataGridPaginationState>',
        description: 'Callback when page index or page size changed',
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
];
