import {
  Badge,
  CheckIcon,
  ColorSwatch,
  createStyles,
  Grid,
  Group,
  MantineSize,
  MultiSelect,
  Slider,
  Space,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';

import {
  createBooleanFilter,
  createDateFilter,
  createStringFilter,
  DataGrid,
  DataGridFiltersState,
  DataGridPaginationState,
  DataGridSortingState,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
  stringOperators,
} from '../../src';
import { createOperatorFilter } from '../../src/filters/createOperatorFilter';
import { Data, demoData } from '../demoData';

const sizeMap = new Map<string | number, string | number>([
  ['xs', 0],
  ['sm', 25],
  ['md', 50],
  ['lg', 75],
  ['xl', 100],
  [0, 'xs'],
  [25, 'sm'],
  [50, 'md'],
  [75, 'lg'],
  [100, 'xl'],
]);

const catFilter = createOperatorFilter<string, string[]>({
  init: () => [],
  operators: [
    {
      op: 'select',
      filterFn: (rowValue, filterValue) => filterValue.includes(rowValue),
      element: ({ onChange, value, ...rest }) => (
        <MultiSelect
          {...rest}
          data={[
            { value: 'Peterbald', label: 'Peterbald' },
            { value: 'Chartreux', label: 'Chartreux' },
            { value: 'Highlander', label: 'Highlander' },
            { value: 'Savannah', label: 'Savannah' },
            { value: 'Birman', label: 'Birman' },
            { value: 'Burmese', label: 'Burmese' },
            { value: 'Siberian', label: 'Siberian' },
          ]}
          value={value}
          onChange={onChange}
        />
      ),
    },
  ],
});

const useStyles = createStyles((theme) => ({
  gridWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  gridProps: {
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.colors.gray[6],
  },
}));

export default function Demo() {
  const { classes, theme } = useStyles();

  const [state, setState] = useState({
    horizontalSpacing: 'xs' as MantineSize,
    verticalSpacing: 'xs' as MantineSize,
    fontSize: 'md' as MantineSize,
    height: '',
    width: '',
    withFixedHeader: false,
    withGlobalFilter: true,
    withPagination: true,
    withColumnFilters: true,
    withSorting: true,
    withRowSelection: true,
    withRowExpanding: true,
    noFlexLayout: false,
    withColumnResizing: true,
    striped: true,
    withBorder: false,
    withColumnBorders: false,
    highlightOnHover: true,
    loading: false,
    showEmpty: false,
    iconColor: theme.primaryColor,
    paginationCompactMode: false,
    autoResetPageIndex: true,
  });

  const onPageChange = (e: DataGridPaginationState) => {
    console.log(`pageIndex: ${e.pageIndex}, pageSize: ${e.pageSize}`);
  };

  const onFilter = (e: DataGridFiltersState) => {
    console.group('filter');
    console.log(e);
    console.groupEnd();
  };
  const onSearch = (e: string) => {
    console.log(`search: ${e}`);
  };
  const onSort = (e: DataGridSortingState) => {
    console.log(e.length ? `sorting: ${e[0].id} ${e[0].desc}` : 'no sorting');
  };

  const update = (next: Partial<typeof state>) => {
    setState((last) => ({ ...last, ...next }));
  };

  return (
    <Grid className={classes.gridWrapper}>
      <Grid.Col span={10} p="md">
        <DataGrid<Data>
          debug
          data={state.showEmpty ? [] : state.withPagination ? demoData : demoData.slice(0, 30)}
          horizontalSpacing={state.horizontalSpacing}
          verticalSpacing={state.verticalSpacing}
          fontSize={state.fontSize}
          height={state.height}
          width={state.width}
          withFixedHeader={state.withFixedHeader}
          withGlobalFilter={state.withGlobalFilter}
          withPagination={state.withPagination}
          withColumnFilters={state.withColumnFilters}
          withSorting={state.withSorting}
          withColumnResizing={state.withColumnResizing}
          withRowSelection={state.withRowSelection}
          {...(state.withRowExpanding
            ? {
                withRowExpanding: true,
                getRowCanExpand: () => true,
                renderSubComponent: (row) => (
                  <pre
                    style={{
                      width: row.getVisibleCells().reduce((prev, curr) => prev + curr.column.getSize(), 0),
                      overflow: 'auto',
                    }}
                    children={JSON.stringify(row.original, null, 2)}
                  />
                ),
                onRow: (row) => ({
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }),
              }
            : {})}
          noFlexLayout={state.noFlexLayout}
          striped={state.striped}
          withBorder={state.withBorder}
          withColumnBorders={state.withColumnBorders}
          highlightOnHover={state.highlightOnHover}
          loading={state.loading}
          iconColor={state.iconColor}
          autoResetPageIndex={state.autoResetPageIndex}
          onPageChange={onPageChange}
          onSort={onSort}
          onFilter={onFilter}
          onSearch={onSearch}
          paginationMode={state.paginationCompactMode ? 'compact' : 'default'}
          columns={[
            {
              accessorKey: 'id',
              header: 'No',
              minSize: 64,
            },
            {
              accessorKey: 'text',
              header: 'Text that is too long for a Header',
              filterFn: createStringFilter({
                title: 'Filter with Title',
              }),
              size: 200,
              minSize: 100,
              maxSize: 400,
              cell: highlightFilterValue,
            },
            {
              header: 'Animal',
              columns: [
                { accessorKey: 'cat', filterFn: catFilter },
                {
                  accessorKey: 'fish',
                  filterFn: createStringFilter({
                    title: 'Filter with only includes operator',
                    operators: [stringOperators.includes()],
                  }),
                },
              ],
            },
            {
              accessorKey: 'city',
              filterFn: stringFilterFn,
            },
            {
              accessorKey: 'value',
              filterFn: numberFilterFn,
            },
            {
              accessorKey: 'date',
              cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
              filterFn: createDateFilter({
                title: 'Date Filter',
              }),
            },
            {
              accessorKey: 'bool',
              cell: (cell) => {
                if (cell.getValue()) {
                  return <Badge color="teal">true</Badge>;
                }
                return <Badge color="red">false</Badge>;
              },
              filterFn: createBooleanFilter({
                title: 'Boolean filter',
                trueLabel: 'Ja',
                falseLabel: 'Nein',
              }),
            },
          ]}
        />
      </Grid.Col>
      <Grid.Col span={2} p="md" className={classes.gridProps}>
        <Stack>
          <Title order={2}>Properties</Title>
          <Text color="dimmed">Features</Text>
          <Switch
            label="With global filter"
            checked={state.withGlobalFilter}
            onChange={(e) =>
              update({
                withGlobalFilter: e.target.checked,
              })
            }
          />
          <Switch
            label="With column filters"
            checked={state.withColumnFilters}
            onChange={(e) =>
              update({
                withColumnFilters: e.target.checked,
              })
            }
          />
          <Switch
            label="With sorting"
            checked={state.withSorting}
            onChange={(e) =>
              update({
                withSorting: e.target.checked,
              })
            }
          />
          <Switch
            label="With pagination"
            checked={state.withPagination}
            onChange={(e) =>
              update({
                withPagination: e.target.checked,
              })
            }
          />
          <Switch
            label="With column resizing"
            checked={state.withColumnResizing}
            onChange={(e) =>
              update({
                withColumnResizing: e.target.checked,
              })
            }
          />
          <Switch
            label="With row selection"
            checked={state.withRowSelection}
            onChange={(e) =>
              update({
                withRowSelection: e.target.checked,
              })
            }
          />
          <Switch
            label="With row expanding"
            checked={state.withRowExpanding}
            onChange={(e) =>
              update({
                withRowExpanding: e.target.checked,
              })
            }
          />
          <Text color="dimmed">Styles</Text>
          <Switch
            label="No flex layout"
            checked={state.noFlexLayout}
            onChange={(e) =>
              update({
                noFlexLayout: e.target.checked,
              })
            }
          />
          <TextInput
            label="Table height"
            value={state.height}
            placeholder="css size value"
            onChange={(e) =>
              update({
                height: e.target.value,
              })
            }
          />
          <TextInput
            label="Table width"
            value={state.width}
            placeholder="css size value"
            onChange={(e) =>
              update({
                width: e.target.value,
              })
            }
          />
          <Switch
            label="With fixed Header"
            checked={state.withFixedHeader}
            onChange={(e) =>
              update({
                withFixedHeader: e.target.checked,
              })
            }
          />
          <Switch
            label="Striped"
            checked={state.striped}
            onChange={(e) =>
              update({
                striped: e.target.checked,
              })
            }
          />
          <Switch
            label="With Border"
            checked={state.withBorder}
            onChange={(e) =>
              update({
                withBorder: e.target.checked,
              })
            }
          />
          <Switch
            label="With Column Borders"
            checked={state.withColumnBorders}
            onChange={(e) =>
              update({
                withColumnBorders: e.target.checked,
              })
            }
          />
          <Switch
            label="Highlight on hover"
            checked={state.highlightOnHover}
            onChange={(e) =>
              update({
                highlightOnHover: e.target.checked,
              })
            }
          />
          <Switch
            label="Loading"
            checked={state.loading}
            onChange={(e) =>
              update({
                loading: e.target.checked,
              })
            }
          />
          <Switch
            label="Empty State"
            checked={state.showEmpty}
            onChange={(e) =>
              update({
                showEmpty: e.target.checked,
              })
            }
          />
          {state.withPagination && (
            <>
              <Switch
                label="Compact pagination"
                checked={state.paginationCompactMode}
                onChange={(e) =>
                  update({
                    paginationCompactMode: e.target.checked,
                  })
                }
              />
              <Switch
                label="Auto reset page index"
                checked={state.autoResetPageIndex}
                onChange={(e) =>
                  update({
                    autoResetPageIndex: e.target.checked,
                  })
                }
              />
            </>
          )}
          <div>
            <Text weight="bold">Font Size</Text>
            <Slider
              step={25}
              label={(value) => sizeMap.get(value)}
              marks={[...sizeMap.entries()]
                .filter((x) => typeof x[0] === 'number')
                .map(([value, label]) => ({
                  value: +value,
                  label,
                }))}
              value={+(sizeMap.get(state.fontSize) || 0)}
              onChange={(e) =>
                update({
                  fontSize: sizeMap.get(e)?.toString() as MantineSize,
                })
              }
            />
          </div>
          <Space />
          <div>
            <Text weight="bold">Vertical Spacing</Text>
            <Slider
              step={25}
              label={(value) => sizeMap.get(value)}
              marks={[...sizeMap.entries()]
                .filter((x) => typeof x[0] === 'number')
                .map(([value, label]) => ({
                  value: +value,
                  label,
                }))}
              value={+(sizeMap.get(state.verticalSpacing) || 0)}
              onChange={(e) =>
                update({
                  verticalSpacing: sizeMap.get(e)?.toString() as MantineSize,
                })
              }
            />
          </div>
          <Space />
          <div>
            <Text weight="bold">Horizontal Spacing</Text>
            <Slider
              step={25}
              label={(value) => sizeMap.get(value)}
              marks={[...sizeMap.entries()]
                .filter((x) => typeof x[0] === 'number')
                .map(([value, label]) => ({
                  value: +value,
                  label,
                }))}
              value={+(sizeMap.get(state.horizontalSpacing) || 0)}
              onChange={(e) =>
                update({
                  horizontalSpacing: sizeMap.get(e)?.toString() as MantineSize,
                })
              }
            />
          </div>
          <Space />
          <div>
            <Text weight="bold">Icon Color</Text>
            <Group spacing="xs">
              {Object.keys(theme.colors).map((color) => (
                <ColorSwatch
                  component="button"
                  key={color}
                  color={theme.colors[color][6]}
                  onClick={() =>
                    update({
                      iconColor: color,
                    })
                  }
                  sx={{ color: '#fff', cursor: 'pointer' }}
                >
                  {state.iconColor === color && <CheckIcon width={10} />}
                </ColorSwatch>
              ))}
            </Group>
          </div>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
