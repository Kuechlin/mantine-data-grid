import React, { useMemo } from 'react';
import { DefaultProps, MantineSize, Selectors, Stack } from '@mantine/core';
import {
    ColumnPinningColumnDef,
    ColumnSizingColumnDef,
    ColumnSizingInfoState,
    CoreColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    GroupingColumnDef,
    PaginationState,
    RowData,
    SortingColumnDef,
    useReactTable,
    VisibilityColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import useStyles from './DataGrid.styles';

import { GlobalFilter } from './GlobalFilter';
import { ColumnSorter } from './ColumnSorter';
import { ColumnFilter, DataGridFilterFns } from './ColumnFilter';
import { DataGridFilterFn } from './ColumnFilter/ColumnFilter';
import { Pagination, DEFAULT_INITIAL_PAGE, DEFAULT_INITIAL_SIZE } from './Pagination';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type DataGridFiltersColumnDef<TData extends RowData> = {
    filterFn?: DataGridFilterFns | DataGridFilterFn<TData>;
    enableColumnFilter?: boolean;
    enableGlobalFilter?: boolean;
};
export type DataGridColumnDef<TData extends RowData> = CoreColumnDef<TData> &
    VisibilityColumnDef &
    ColumnPinningColumnDef &
    DataGridFiltersColumnDef<TData> &
    SortingColumnDef<TData> &
    GroupingColumnDef<TData> &
    ColumnSizingColumnDef;

export type PaginationArg = {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
};

export interface DataGridProps<TData extends RowData>
    extends DefaultProps<DataGridStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
    columns: DataGridColumnDef<TData>[];
    data: TData[];
    withGlobalFilter?: boolean;
    noEllipsis?: boolean;
    spacing?: MantineSize;
    pagination?: {
        initialPageIndex: number;
        initialPageSize: number;
    };
    onPageChange?: ({ pageIndex, pageSize }: PaginationArg) => void;
}

export function DataGrid<TData extends RowData>({
    data,
    columns,
    classNames,
    styles,
    sx,
    spacing = 'sm',
    noEllipsis,
    withGlobalFilter,
    pagination,
    onPageChange,
    ...others
}: DataGridProps<TData>) {
    const { classes, cx } = useStyles(
        { spacing },
        {
            classNames,
            styles,
            name: 'DataGrid',
        }
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [columnSizingInfo, setColumnSizingInfo] =
        useState<ColumnSizingInfoState>({} as any);

    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: pagination ? pagination.initialPageIndex || DEFAULT_INITIAL_PAGE : DEFAULT_INITIAL_PAGE,
            pageSize: pagination ? pagination.initialPageSize || DEFAULT_INITIAL_SIZE : DEFAULT_INITIAL_SIZE,
        });

    const paginationMemo = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const pageCount = useMemo(
        () => {
            return Math.floor(data.length / pageSize) ?? -1
        },
        [data, pageSize]
    )

    const table = useReactTable<TData>({
        data: data,
        columns: columns as any,
        columnResizeMode: 'onChange',
        enableColumnFilters: true,
        enableColumnResizing: true,
        state: {
            globalFilter,
            columnSizingInfo,
            // For pagination
            pagination: paginationMemo,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnSizingInfoChange: setColumnSizingInfo,

        // Pagination feature
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: pageCount,
        onPaginationChange: setPagination,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <Stack {...others} spacing={spacing}>
            {withGlobalFilter && (
                <GlobalFilter
                    globalFilter={globalFilter}
                    onGlobalFilterChange={setGlobalFilter}
                    className={classes.globalFilter}
                />
            )}
            <div className={classes.table} role="table">
                <div className={classes.header} role="rowgroup">
                    {table
                        .getHeaderGroups()
                        .map((group, groupIndex, headerGroups) => (
                            <div
                                key={group.id}
                                className={classes.row}
                                role="row"
                            >
                                {group.headers.map((header, headerIndex) => (
                                    <div
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
                                                        [classes.ellipsis]:
                                                            !noEllipsis,
                                                    })}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </div>
                                                <div
                                                    className={
                                                        classes.headerCellButtons
                                                    }
                                                >
                                                    {header.column.getCanSort() && (
                                                        <ColumnSorter
                                                            className={
                                                                classes.sorter
                                                            }
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    )}
                                                    {header.column.getCanFilter() && (
                                                        <ColumnFilter
                                                            className={
                                                                classes.filter
                                                            }
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                {header.column.getCanResize() && (
                                                    <div
                                                        className={
                                                            classes.resizer
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
                <div className={classes.body} role="rowgroup">
                    {table.getRowModel().rows.map((row) => (
                        <div key={row.id} className={classes.row} role="row">
                            {row.getVisibleCells().map((cell) => (
                                <div
                                    key={cell.id}
                                    style={{
                                        width: cell.column.getSize(),
                                    }}
                                    className={cx(classes.dataCell, {
                                        [classes.ellipsis]: !noEllipsis,
                                    })}
                                    children={flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    role="gridcell"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                table={table}
                onPageChange={onPageChange}
            />
        </Stack>
    );
}
