import { LoadingOverlay, ScrollArea, Stack, Table as MantineTable, Text } from '@mantine/core';
import {
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Fragment, RefCallback, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { BoxOff } from 'tabler-icons-react';
import { ColumnFilter } from './ColumnFilter';
import { ColumnSorter } from './ColumnSorter';
import useStyles from './DataGrid.styles';
import { isDataGridFilter } from './filters';
import { GlobalFilter, globalFilterFn } from './GlobalFilter';
import { DEFAULT_INITIAL_SIZE, Pagination as DefaultPagination } from './Pagination';
import { getRowSelectionColumn } from './RowSelection';
import {
  DefaultBodyCell,
  DefaultBodyRow,
  DefaultBodyWrapper,
  DefaultHeaderCell,
  DefaultHeaderRow,
  DefaultHeaderWrapper,
} from './TableComponents';
import { DataGridProps } from './types';

export function useDataGrid<TData extends RowData>(): [Table<TData> | null, RefCallback<Table<TData>>] {
  const [state, setState] = useState<Table<TData> | null>(null);
  return [state, setState];
}

export function DataGrid<TData extends RowData>({
  // data
  columns,
  data,
  total,
  // styles
  classNames,
  styles,
  height,
  width,
  withFixedHeader,
  striped,
  withBorder,
  withColumnBorders,
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
  withColumnResizing,
  withRowSelection,
  withRowExpanding,
  renderSubComponent,
  getRowCanExpand,
  autoResetPageIndex,
  noFlexLayout,
  pageSizes,
  paginationMode = 'default',
  debug = false,
  // callbacks
  onPageChange,
  onSearch,
  onFilter,
  onSort,
  onRowSelectionChange,
  onExpandedChange,
  // table ref
  tableRef,
  // common props
  initialState,
  state,
  onRow,
  onCell,
  iconColor,
  empty,
  locale,
  // component overrides
  components: { headerWrapper, headerRow, headerCell, bodyWrapper, bodyRow, bodyCell, pagination } = {},
  // table option ovverides
  options,
  // rest
  ...others
}: DataGridProps<TData>) {
  const HeaderWrapper = headerWrapper ?? DefaultHeaderWrapper;
  const HeaderRow = headerRow ?? DefaultHeaderRow;
  const HeaderCell = headerCell ?? DefaultHeaderCell;
  const BodyWrapper = bodyWrapper ?? DefaultBodyWrapper;
  const BodyRow = bodyRow ?? DefaultBodyRow;
  const BodyCell = bodyCell ?? DefaultBodyCell;
  const Pagination = pagination ?? DefaultPagination;
  const { classes, theme, cx } = useStyles(
    {
      height,
      width,
      withFixedHeader,
      paginationMode,
    },
    {
      classNames,
      styles,
      name: 'DataGrid',
    }
  );
  const [tableWidth, setTableWidth] = useState<number | string>(width ?? '100%');

  const color = iconColor || theme.primaryColor;

  const table = useReactTable<TData>({
    data,
    columns: withRowSelection ? [getRowSelectionColumn(), ...columns] : columns,
    initialState,
    state,

    enableGlobalFilter: !!withGlobalFilter,
    globalFilterFn,
    enableColumnFilters: !!withColumnFilters,
    enableSorting: !!withSorting,
    enableColumnResizing: !!withColumnResizing,
    enableRowSelection: !!withRowSelection,
    enableExpanding: !!withRowExpanding,
    columnResizeMode: 'onChange',
    manualPagination: !!total, // when external data, handle pagination manually
    autoResetPageIndex: autoResetPageIndex,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      options?.enableFilters || withGlobalFilter || withColumnFilters ? getFilteredRowModel() : undefined,
    getPaginationRowModel: options?.enableFilters || withPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: options?.enableSorting || withSorting ? getSortedRowModel() : undefined,
    getExpandedRowModel: options?.enableExpanding || withRowExpanding ? getExpandedRowModel() : undefined,
    getRowCanExpand,

    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug,

    ...options,
  });
  useImperativeHandle(tableRef, () => table);

  const tableSize = table.getTotalSize();

  useEffect(() => {
    if (noFlexLayout) {
      setTableWidth(tableSize + 'px');
    } else if (width) {
      setTableWidth(width + 'px');
    } else {
      setTableWidth('100%');
    }
  }, [table, width, noFlexLayout, tableSize]);

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
    [table, onSearch]
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
    [table, onSort]
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
    [table, onFilter]
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
    [table, onPageChange]
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (arg0) => {
      table.setState(() => {
        const state = table.getState();
        const next = functionalUpdate(arg0, state.rowSelection);
        onRowSelectionChange && onRowSelectionChange(next);
        return {
          ...state,
          rowSelection: next,
        };
      });
    },
    [table, onRowSelectionChange]
  );

  const handleExpandedChange: OnChangeFn<ExpandedState> = useCallback(
    (arg0) => {
      table.setState((state) => {
        const next = functionalUpdate(arg0, state.expanded);
        onExpandedChange && onExpandedChange(next);
        return {
          ...state,
          expanded: next,
        };
      });
    },
    [table, onExpandedChange]
  );

  const pageCount = withPagination && total ? Math.ceil(total / table.getState().pagination.pageSize) : undefined;

  table.setOptions((prev) => ({
    ...prev,
    pageCount,
    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: handleRowSelectionChange,
    onExpandedChange: handleExpandedChange,
  }));

  const defaultPageSize = Number(pageSizes?.[0] ?? DEFAULT_INITIAL_SIZE);
  useEffect(() => {
    if (withPagination) {
      table.setPageSize(state?.pagination?.pageSize ?? initialState?.pagination?.pageSize ?? defaultPageSize);
    } else {
      table.setPageSize(data.length);
    }
  }, [
    table,
    withPagination,
    data.length,
    initialState?.pagination?.pageSize,
    defaultPageSize,
    state?.pagination?.pageSize,
  ]);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    getScrollElement: () => tableContainerRef.current,
    count: rows.length,
    estimateSize: () => 42,
    overscan: 4,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows?.[0]?.start || 0;
  const paddingBottom = totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0);
  const colSpan = rows?.[0]?.getVisibleCells().length ?? 1;

  return (
    <Stack {...others} spacing={verticalSpacing} className={classes.wrapper}>
      {withGlobalFilter && <GlobalFilter table={table} className={classes.globalFilter} locale={locale} />}
      <ScrollArea
        viewportRef={tableContainerRef}
        className={classes.scrollArea}
        styles={(theme) => {
          const border = `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`;
          return {
            viewport: {
              borderLeft: withBorder ? border : '',
              borderRight: withBorder ? border : '',
            },
          };
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
          style={{
            width: tableWidth,
          }}
          withBorder={withBorder}
          withColumnBorders={withColumnBorders}
        >
          <HeaderWrapper table={table} className={classes.thead} role="rowgroup">
            {table.getHeaderGroups().map((group) => (
              <HeaderRow key={group.id} table={table} headerGroup={group} className={classes.tr} role="row">
                {group.headers.map((header) => (
                  <HeaderCell
                    key={header.id}
                    table={table}
                    header={header}
                    style={{
                      flex: `${header.getSize()} 0 auto`,
                      width: header.getSize(),
                      maxWidth: header.column.columnDef.maxSize,
                      minWidth: header.column.columnDef.minSize,
                    }}
                    className={classes.th}
                    colSpan={header.colSpan}
                    role="columnheader"
                  >
                    {!header.isPlaceholder && (
                      <>
                        <div className={classes.headerCellContent}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div className={classes.headerCellButtons}>
                          {header.column.getCanSort() && (
                            <ColumnSorter className={classes.sorter} column={header.column} color={color} />
                          )}
                          {header.column.getCanFilter() && isDataGridFilter(header.column.columnDef.filterFn) && (
                            <ColumnFilter
                              className={classes.filter}
                              filterFn={header.column.columnDef.filterFn}
                              column={header.column}
                              color={color}
                            />
                          )}
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            className={cx(classes.resizer, { [classes.isResizing]: header.column.getIsResizing() })}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                          />
                        )}
                      </>
                    )}
                  </HeaderCell>
                ))}
              </HeaderRow>
            ))}
          </HeaderWrapper>
          <BodyWrapper table={table} className={classes.tbody} role="rowgroup">
            {paddingTop > 0 && virtualizerPlaceholder(paddingTop, colSpan, rowVirtualizer.range.startIndex % 2 === 0)}
            {virtualRows.length > 0 ? (
              virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<TData>;
                const rowProps = onRow ? onRow(row) : {};
                return (
                  <Fragment key={row.id}>
                    <BodyRow
                      {...rowProps}
                      table={table}
                      row={row}
                      className={cx(classes.tr, rowProps.className)}
                      role="row"
                    >
                      {row.getVisibleCells().map((cell) => {
                        const cellProps = onCell ? onCell(cell) : {};
                        return (
                          <BodyCell
                            {...cellProps}
                            key={cell.id}
                            table={table}
                            cell={cell}
                            style={{
                              flex: `${cell.column.getSize()} 0 auto`,
                              width: cell.column.getSize(),
                              maxWidth: cell.column.columnDef.maxSize,
                              minWidth: cell.column.columnDef.minSize,
                            }}
                            className={cx(classes.td, cellProps.className)}
                            role="cell"
                          >
                            <div className={classes.dataCellContent}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </BodyCell>
                        );
                      })}
                    </BodyRow>
                    {renderSubComponent && row.getIsExpanded() && (
                      <BodyRow table={table} row={row} className={cx(classes.tr, rowProps.className)} role="row">
                        <td colSpan={row.getVisibleCells().length}>{renderSubComponent(row)}</td>
                      </BodyRow>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <tr className={classes.tr} role="row">
                <td style={{ width: '100%' }}>
                  {empty || (
                    <Stack align="center" spacing="xs">
                      <BoxOff size={64} />
                      <Text weight="bold">No Data</Text>
                    </Stack>
                  )}
                </td>
              </tr>
            )}
            {paddingBottom > 0 && virtualizerPlaceholder(paddingBottom, colSpan)}
          </BodyWrapper>
        </MantineTable>
      </ScrollArea>

      {withPagination && (
        <Pagination
          table={table}
          total={total}
          pageSizes={pageSizes}
          fontSize={fontSize}
          color={color}
          classes={[classes.pagination, classes.pagination_info, classes.pagination_size, classes.pagination_page]}
          locale={locale}
          mode={paginationMode}
        />
      )}
    </Stack>
  );
}

const virtualizerPlaceholder = (padding: number, colSpan: number, isEven = false) =>
  isEven ? (
    <>
      <tr>
        <td style={{ height: `${padding / 2}px`, padding: 0 }} colSpan={colSpan} />
      </tr>
      <tr>
        <td style={{ height: `${padding / 2}px`, padding: 0 }} colSpan={colSpan} />
      </tr>
    </>
  ) : (
    <tr>
      <td style={{ height: `${padding}px`, padding: 0 }} colSpan={colSpan} />
    </tr>
  );
