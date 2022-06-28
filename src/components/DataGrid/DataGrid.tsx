import {
    Button,
    DefaultProps,
    Group,
    MantineSize,
    Selectors,
    Stack,
} from '@mantine/core';
import {
    ColumnDef,
    createTable,
    FilterFn,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    Overwrite,
    ReactTableGenerics,
    Table,
    TableInstance,
    useTableInstance,
} from '@tanstack/react-table';
import { ComponentType, useRef, useState } from 'react';
import { VariableSizeGrid, VariableSizeList } from 'react-window';
import useStyles from './DataGrid.styles';

import { GlobalFilter } from './GlobalFilter';
import { ChevronDown, Filter, Selector } from 'tabler-icons-react';
import { ColumnSorter } from './ColumnSorter';
import {
    ColumnFilter,
    dataGridfilterFns,
    DataGridFilterFns,
} from './ColumnFilter';

export type DataGridGenerics<T> = Overwrite<
    ReactTableGenerics,
    {
        Row: T;
        FilterFns: DataGridFilterFns;
    }
>;

export type DataGridColumnsFactory<T> = (
    table: Table<DataGridGenerics<T>>
) => ColumnDef<DataGridGenerics<T>>[];

export type DataGridStylesNames = Selectors<typeof useStyles>;

export interface DataTableProps<T>
    extends DefaultProps<DataGridStylesNames>,
        React.ComponentPropsWithoutRef<'div'> {
    columns: DataGridColumnsFactory<T>;
    data: T[];
    withGlobalFilter?: boolean;
    noEllipsis?: boolean;
    size?: MantineSize;
}

export function DataGrid<T>({
    data,
    columns: createColumns,
    classNames,
    styles,
    sx,
    size = 'md',
    noEllipsis,
    withGlobalFilter,
    ...others
}: DataTableProps<T>) {
    const { classes, cx } = useStyles(
        { size },
        {
            classNames,
            styles,
            name: 'DataGrid',
        }
    );
    const headerRefs = useRef<VariableSizeList[]>([]);
    const bodyRef = useRef<VariableSizeGrid>(null);

    const { current: table } = useRef(
        createTable().setRowType<T>().setOptions({
            filterFns: dataGridfilterFns,
        }) as Table<DataGridGenerics<T>>
    );
    const { current: columns } = useRef(createColumns(table));

    const [globalFilter, setGlobalFilter] = useState('');

    const instance = useTableInstance(table, {
        data,
        columns,
        columnResizeMode: 'onChange',
        enableColumnFilters: true,
        enableColumnResizing: true,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onColumnSizingInfoChange(updater) {
            instance.setState((last) => ({
                ...last,
                columnSizingInfo:
                    typeof updater === 'function'
                        ? updater(last.columnSizingInfo)
                        : updater,
            }));
            bodyRef.current?.resetAfterColumnIndex(0);
            for (const ref of headerRefs.current) {
                ref.resetAfterIndex(0);
            }
        },

        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <Stack {...others} spacing={size}>
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
