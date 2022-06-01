import {
    Button,
    createStyles,
    Group,
    MantineColor,
    ScrollArea,
    Space,
    Table as MantineTable,
    TextInput,
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
    useEffect,
    useRef,
    useState,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
    GridChildComponentProps,
    GridOnScrollProps,
    ListChildComponentProps,
    VariableSizeGrid,
    VariableSizeList,
} from 'react-window';
import { ChevronDown, Search, Selector } from 'tabler-icons-react';
import { Scrollbars } from 'react-custom-scrollbars';
import useStyles from './DataTable.styles';

import { DataTableFilter } from './DataTableFilter';
import { DataTableHeader } from './DataTableHeader';
import { DataTableCell } from './DataTableCell';
import { GlobalFilter } from '../GlobalFilter';

const isLast = (arr: any[], i: number) => {
    return arr.length - 1 === i;
};

export interface DataTableGenerics<T> extends ReactTableGenerics {
    Row: T;
}

export type DataTableInstance<T = any> = TableInstance<DataTableGenerics<T>>;

export type DataTableProps<T> = {
    table: Table<DataTableGenerics<T>>;
    columns: ColumnDef<DataTableGenerics<T>>[];
    data: T[];
};

export type DataTableFilterProps<T = any> = {
    value: T;
    onChange(value: T): void;
};
export type DataTableFilterComponent<T = any> = ComponentType<
    DataTableFilterProps<T>
>;

export function DataTable<T>({ table, columns, data }: DataTableProps<T>) {
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
        <>
            <GlobalFilter
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />
            <Space h="md" />
            <ScrollArea style={{ width: '100%', height: 'calc(100% - 52px)' }}>
                <MantineTable striped>
                    <thead>
                        {headerGroups.map((group, groupIndex) => (
                            <tr key={group.id} className={classes.row}>
                                {group.headers.map((header, headerIndex) => (
                                    <DataTableHeader<T>
                                        key={header.column.id}
                                        index={headerIndex}
                                        header={header}
                                        group={group}
                                        isLastGroup={
                                            headerGroups.length - 1 ===
                                            groupIndex
                                        }
                                    />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className={classes.row}>
                                {row.getVisibleCells().map((cell) => (
                                    <DataTableCell key={cell.id} cell={cell} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </MantineTable>
            </ScrollArea>
        </>
    );
}
