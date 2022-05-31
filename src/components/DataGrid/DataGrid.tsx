import {
    Button,
    createStyles,
    Group,
    MantineColor,
    Space,
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
import { CaretDown, ChevronDown, Search, Selector } from 'tabler-icons-react';
import { Scrollbars } from 'react-custom-scrollbars';
import useStyles from './DataGrid.styles';

import { DataGridFilter } from './DataGridFilter';

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
    instance: DataGridInstance;
    column: Column<any>;
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

    const renderHeader =
        (group: HeaderGroup<DataTableGenerics<T>>, groupIndex: number) =>
        ({ index, style }: ListChildComponentProps<any>) => {
            const header = group.headers[index];
            const isSorted = header.column.getIsSorted();
            const isLastGroup = isLast(headerGroups, groupIndex);
            const canSort = isLastGroup && header.column.getCanSort();
            const canFitler = isLastGroup && header.column.getCanFilter();

            return (
                <div
                    style={style}
                    className={cx(classes.header, classes.cell, {
                        lastGroup: isLastGroup,
                        first: index === 0,
                        sort: canSort,
                    })}
                    onClick={header.column.getToggleSortingHandler()}
                >
                    <div className={classes.slot}>
                        {!header.isPlaceholder && header.renderHeader()}
                    </div>
                    <Group spacing="xs">
                        {canFitler && (
                            <DataGridFilter
                                instance={instance}
                                column={header.column}
                            />
                        )}
                        {canSort && (
                            <Button
                                children={
                                    isSorted ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <Selector size={16} />
                                    )
                                }
                                variant="subtle"
                                compact
                                size="sm"
                                px={0}
                                color="gray"
                                style={{
                                    transition: 'transform 0.25s',
                                    transform: `rotate(${
                                        isSorted === 'asc' ? '180' : '0'
                                    }deg)`,
                                }}
                            />
                        )}
                    </Group>
                    <div
                        className={classes.drag}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={{
                            transform: header.column.getIsResizing()
                                ? `translateX(${
                                      instance.getState().columnSizingInfo
                                          .deltaOffset
                                  }px)`
                                : '',
                        }}
                    />
                </div>
            );
        };

    const renderCell = ({
        style,
        columnIndex,
        rowIndex,
    }: GridChildComponentProps<any>) => {
        const cell = rows[rowIndex].getVisibleCells()[columnIndex];

        return (
            <div
                key={cell.id}
                style={style}
                className={cx(classes.cell, classes.slot, {
                    [classes.even]: rowIndex % 2 === 0,
                })}
                children={cell.renderCell()}
            />
        );
    };

    return (
        <AutoSizer defaultHeight={400}>
            {({ width, height }) => (
                <div className={classes.table} style={{ width, height }}>
                    <DebouncedTextInput
                        value={globalFilter}
                        onChange={setGlobalFilter}
                        style={{ width }}
                        placeholder="Search"
                        rightSection={<Search />}
                    />
                    {headerGroups.map((group, i) => (
                        <VariableSizeList
                            ref={(ref) => ref && (headerRefs.current[i] = ref)}
                            key={group.id}
                            direction="horizontal"
                            itemCount={group.headers.length}
                            itemSize={(i) => group.headers[i].getSize()}
                            width={width}
                            height={48}
                            style={{ overflow: 'hidden' }}
                            children={renderHeader(group, i)}
                        />
                    ))}

                    <VariableSizeGrid
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
                        children={renderCell}
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

function DebouncedTextInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
} & Omit<TextInputProps, 'onChange'>) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <TextInput
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
