import {
    Button,
    createStyles,
    Group,
    MantineColor,
    Space,
    TextInputProps,
} from '@mantine/core';
import {
    BuiltInFilterFn,
    Column,
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    HeaderGroup,
    ReactTableGenerics,
    Table,
    TableInstance,
    useTableInstance,
} from '@tanstack/react-table';
import React, {
    ComponentType,
    FC,
    forwardRef,
    memo,
    useCallback,
    useRef,
    useState,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
    GridOnScrollProps,
    VariableSizeGrid,
    VariableSizeList,
} from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars';
import useStyles from './DataGrid.styles';

import { DataGridHeader, DataGridHeaderData } from './DataGridHeader';
import { DataGridCell, DataGridCellData } from './DataGridCell';
import { GlobalFilter } from '../GlobalFilter';

const isLast = (arr: any[], i: number) => {
    return arr.length - 1 === i;
};

export interface DataTableGenerics<T> extends ReactTableGenerics {
    Row: T;
}

export type DataGridInstance<T = any> = TableInstance<DataTableGenerics<T>>;

export type DataGridProps<T, F = BuiltInFilterFn> = {
    table: Table<DataTableGenerics<T>>;
    columns: ColumnDef<DataTableGenerics<T>>[];
    data: T[];
};

export type DataGridFilterProps<T = any> = {
    value: T;
    onChange(value: T): void;
};
export type DataGridFilterComponent<T = any> = ComponentType<
    DataGridFilterProps<T>
>;

export function DataGrid<T>({ table, columns, data }: DataGridProps<T>) {
    const [globalFilter, setGlobalFilter] = useState('');
    const { classes, cx } = useStyles();
    const headerRefs = useRef<VariableSizeList[]>([]);
    const bodyRef = useRef<VariableSizeGrid>(null);
    const instance = useTableInstance(table, {
        data,
        columns,
        columnResizeMode: 'onChange',
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

    const headerGroups = instance.getHeaderGroups();
    const rows = instance.getRowModel().rows;
    const visible = instance.getVisibleLeafColumns();

    const onScroll = ({ scrollLeft }: GridOnScrollProps) => {
        for (const ref of headerRefs.current) {
            ref.scrollTo(scrollLeft);
        }
    };

    return (
        <AutoSizer>
            {({ width, height }) => (
                <div className={classes.table} style={{ width, height }}>
                    <GlobalFilter
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                    />

                    {headerGroups.map((group, i) => (
                        <VariableSizeList<DataGridHeaderData<T>>
                            ref={(ref) => ref && (headerRefs.current[i] = ref)}
                            key={group.id}
                            direction="horizontal"
                            itemCount={group.headers.length}
                            itemSize={(i) => group.headers[i].getSize()}
                            width={width}
                            height={48}
                            style={{ overflow: 'hidden' }}
                            itemData={{
                                group: group,
                                isLastGroup: headerGroups.length - 1 === i,
                            }}
                            children={DataGridHeader}
                        />
                    ))}

                    <VariableSizeGrid<DataGridCellData<T>>
                        ref={bodyRef}
                        outerElementType={ScrollArea}
                        columnCount={visible.length}
                        columnWidth={(index) => visible[index].getSize()}
                        rowCount={rows.length}
                        rowHeight={() => 48}
                        height={height - 36 - 48 * headerGroups.length}
                        width={width}
                        onScroll={onScroll}
                        style={{ overflow: 'hidden' }}
                        itemData={{
                            getCell: (col, row) =>
                                rows[row].getVisibleCells()[col],
                        }}
                        children={DataGridCell}
                    />
                </div>
            )}
        </AutoSizer>
    );
}

const ScrollArea = forwardRef<any, any>((props, ref) => {
    const { classes } = useStyles();
    return (
        <Scrollbars
            {...props}
            ref={ref}
            renderThumbVertical={(p) => (
                <div {...p} className={classes.thumb} />
            )}
            renderThumbHorizontal={(p) => (
                <div {...p} className={classes.thumb} />
            )}
        />
    );
});
