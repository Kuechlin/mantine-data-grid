import {
    Box,
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
    createTable,
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
import useStyles from './DataGrid.styles';

import { DataTableHeader } from './DataGridHeader';
import { DataTableCell } from './DataGridCell';
import { GlobalFilter } from '../GlobalFilter';
import { DataTableGenerics, DataTableProps, useReactTable } from '../types';

export function DataTable<T>({
    data,
    columns: createColumns,
}: DataTableProps<T>) {
    const { classes, cx } = useStyles();
    const headerRefs = useRef<VariableSizeList[]>([]);
    const bodyRef = useRef<VariableSizeGrid>(null);

    const table = useReactTable<T>();
    const { current: columns } = useRef(createColumns(table));

    const [globalFilter, setGlobalFilter] = useState('');

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
        <Box>
            <GlobalFilter
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />
            <Space h="md" />
            <MantineTable striped>
                <thead>
                    {headerGroups.map((group, groupIndex) => (
                        <tr key={group.id} className={classes.row}>
                            {group.headers.map((header, headerIndex) => (
                                <DataTableHeader<T>
                                    key={header.column.id}
                                    index={headerIndex}
                                    header={header}
                                    instance={instance}
                                    isLastGroup={
                                        headerGroups.length - 1 === groupIndex
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
        </Box>
    );
}
