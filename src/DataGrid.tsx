import { useCallback, useEffect, useImperativeHandle } from 'react';
import { LoadingOverlay, ScrollArea, Stack, Table as MantineTable, Text } from '@mantine/core';
import {
  ColumnFiltersState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  RowData,
} from '@tanstack/react-table';
import { BoxOff } from 'tabler-icons-react';
import useStyles from './DataGrid.styles';

import { GlobalFilter, globalFilterFn } from './GlobalFilter';
import { ColumnSorter } from './ColumnSorter';
import { ColumnFilter } from './ColumnFilter';
import { DEFAULT_INITIAL_SIZE, Pagination } from './Pagination';
import { DataGridProps } from './types';

export function DataGrid<TData extends RowData>({
  // data
  columns,
  data,
  total,
  // styles
  classNames,
  styles,
  height,
  withFixedHeader,
  noEllipsis,
  striped,
  highlightOnHover,
  horizontalSpacing,
  verticalSpacing = 'xs',
  fontSize,
  loading,
  // features
  withGlobalFilter,
  withColumnFilters,
  withSorting,
  withPagination,
  pageSizes,
  initialPageIndex,
  initialPageSize,
  debug = false,
  // callbacks
  onPageChange,
  onSearch,
  onFilter,
  onSort,
  // table ref
  tableRef,
  initialState,
  state,
  onRow,
  onCell,
  iconColor,
  empty,
  // common props
  ...others
}: DataGridProps<TData>) {
  const { classes, cx, theme } = useStyles(
    {},
    {
      classNames,
      styles,
      name: 'DataGrid',
    }
  );
  const color = iconColor || theme.primaryColor;

  const table = useReactTable<TData>({
    data,
    columns,
    enableGlobalFilter: !!withGlobalFilter,
    globalFilterFn,
    enableColumnFilters: !!withColumnFilters,
    enableSorting: !!withSorting,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    manualPagination: !!total, // when external data, handle pagination manually

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug,

    initialState,
    state,
  });

  useImperativeHandle(tableRef, () => table);

  const handleGlobalFilterChange: OnChangeFn<string> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.globalFilter || '');
        onSearch && onSearch(next);
        return {
          ...state,
          globalFilter: next,
        };
      }),
    [onSearch]
  );

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.sorting);
        onSort && onSort(next);
        return {
          ...state,
          sorting: next,
        };
      }),
    [onSort]
  );

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.columnFilters);
        onFilter && onFilter(next);
        return {
          ...state,
          columnFilters: next,
        };
      }),
    [onFilter]
  );

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (arg0) => {
      const pagination = table.getState().pagination;
      const next = functionalUpdate(arg0, pagination);
      if (next.pageIndex !== pagination.pageIndex || next.pageSize !== pagination.pageSize) {
        onPageChange && onPageChange(next);
        table.setState((state) => ({
          ...state,
          pagination: next,
        }));
      }
    },
    [onPageChange]
  );

  const pageCount = withPagination && total ? Math.ceil(total / table.getState().pagination.pageSize) : undefined;

  table.setOptions((prev) => ({
    ...prev,
    pageCount,
    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
  }));

  useEffect(() => {
    if (withPagination) {
      table.setPageSize(initialPageSize || DEFAULT_INITIAL_SIZE);
    } else {
      table.setPageSize(data.length);
    }
  }, [withPagination]);

  return (
    <Stack {...others} spacing={verticalSpacing}>
      {withGlobalFilter && (
        <GlobalFilter table={table} globalFilter={table.getState().globalFilter} className={classes.globalFilter} />
      )}
      <ScrollArea
        style={{
          position: 'relative',
          height: height ? height + 'px' : '',
        }}
      >
        <LoadingOverlay visible={loading || false} overlayOpacity={0.8} />
        <MantineTable
          striped={striped}
          highlightOnHover={highlightOnHover}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          fontSize={fontSize}
          className={classes.table}
        >
          <thead
            className={cx(classes.header, {
              [classes.headerFixed]: !!withFixedHeader,
            })}
            role="rowgroup"
          >
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} className={classes.row} role="row">
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                    className={cx(classes.headerCell)}
                    role="columnheader"
                  >
                    {!header.isPlaceholder && (
                      <>
                        <div
                          className={cx({
                            [classes.ellipsis]: !noEllipsis,
                          })}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div className={classes.headerCellButtons}>
                          {header.column.getCanSort() && (
                            <ColumnSorter className={classes.sorter} column={header.column} color={color} />
                          )}
                          {header.column.getCanFilter() && (
                            <ColumnFilter className={classes.filter} column={header.column} color={color} />
                          )}
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            className={classes.resizer}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                          />
                        )}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classes.body} role="rowgroup">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr {...(onRow && onRow(row))} key={row.id} className={classes.row} role="row">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      {...(onCell && onCell(cell))}
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      className={cx(classes.dataCell, {
                        [classes.ellipsis]: !noEllipsis,
                      })}
                      children={flexRender(cell.column.columnDef.cell, cell.getContext())}
                      role="cell"
                    />
                  ))}
                </tr>
              ))
            ) : (
              <tr className={classes.row} role="row">
                <td style={{ width: '100%' }}>
                  <Stack align="center" spacing="xs">
                    {empty || (
                      <>
                        <BoxOff size={64} />
                        <Text weight="bold">No Data</Text>
                      </>
                    )}
                  </Stack>
                </td>
              </tr>
            )}
          </tbody>
        </MantineTable>
      </ScrollArea>
      {withPagination && (
        <Pagination
          totalRows={data.length}
          table={table}
          pageSizes={pageSizes}
          fontSize={fontSize}
          color={color}
          classes={[classes.pagination, classes.pagination_info, classes.pagination_size, classes.pagination_page]}
        />
      )}
    </Stack>
  );
}
