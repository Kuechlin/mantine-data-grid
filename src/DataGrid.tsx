import { DefaultProps, MantineSize, Selectors, Stack } from '@mantine/core';
import {
    ColumnDef,
    ColumnSizingInfoState,
    createTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    Overwrite,
    ReactTableGenerics,
    Table,
    useTableInstance,
} from '@tanstack/react-table';
import { useRef, useState } from 'react';
import useStyles from './DataGrid.styles';

import { GlobalFilter } from './GlobalFilter';
import { ColumnSorter } from './ColumnSorter';
import {
    ColumnFilter,
    dataGridfilterFns,
    DataGridFilterFns,
} from './ColumnFilter';
import { DataGridCustomFilterFns } from './ColumnFilter/ColumnFilter';

export type DataGridGenerics<
    TData,
    TFilters extends DataGridCustomFilterFns
> = Overwrite<
    ReactTableGenerics,
    {
        Row: TData;
        FilterFns: DataGridFilterFns & TFilters;
    }
>;

export type DataGridColumnsFactory<
    TData,
    TFilters extends DataGridCustomFilterFns
> = (
    table: Table<DataGridGenerics<TData, TFilters>>
) => ColumnDef<DataGridGenerics<TData, TFilters>>[];

export type DataGridStylesNames = Selectors<typeof useStyles>;

export interface DataGridProps<
    TData,
    TFilters extends DataGridCustomFilterFns = {}
> extends DefaultProps<DataGridStylesNames>,
        React.ComponentPropsWithoutRef<'div'> {
    columns: DataGridColumnsFactory<TData, TFilters>;
    data: TData[];
    filterFns?: TFilters;
    withGlobalFilter?: boolean;
    noEllipsis?: boolean;
    spacing?: MantineSize;
}

export function DataGrid<TData, TFilters extends DataGridCustomFilterFns = {}>({
    data,
    columns: createColumns,
    classNames,
    styles,
    sx,
    spacing = 'sm',
    noEllipsis,
    withGlobalFilter,
    filterFns: customFilters,
    ...others
}: DataGridProps<TData, TFilters>) {
    const { classes, cx } = useStyles(
        { spacing },
        {
            classNames,
            styles,
            name: 'DataGrid',
        }
    );

    const { current: filterFns } = useRef({
        ...dataGridfilterFns,
        ...customFilters,
    });
    const { current: table } = useRef(
        createTable().setRowType<TData>().setOptions({
            filterFns,
        }) as unknown as Table<DataGridGenerics<TData, TFilters>>
    );
    const { current: columns } = useRef(createColumns(table));

    const [globalFilter, setGlobalFilter] = useState('');
    const [columnSizingInfo, setColumnSizingInfo] =
        useState<ColumnSizingInfoState>({} as any);

    const instance = useTableInstance(table, {
        data,
        columns,
        columnResizeMode: 'onChange',
        enableColumnFilters: true,
        enableColumnResizing: true,
        state: {
            globalFilter,
            columnSizingInfo,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnSizingInfoChange: setColumnSizingInfo,

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
                    {instance
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
                                                    {header.renderHeader()}
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
                                                            filterFns={
                                                                filterFns
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
                    {instance.getRowModel().rows.map((row) => (
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
                                    children={cell.renderCell()}
                                    role="gridcell"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Stack>
    );
}
