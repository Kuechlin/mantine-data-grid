import {
    Button,
    createStyles,
    ScrollArea,
    TextInput,
    TextInputProps,
} from '@mantine/core';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    ReactTableGenerics,
    Table,
    useTableInstance,
} from '@tanstack/react-table';
import {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
    GridOnScrollProps,
    VariableSizeGrid,
    VariableSizeList,
} from 'react-window';
import { CaretDown, Filter, Search } from 'tabler-icons-react';
import { getScrollbarWidth } from './utils';

const useStyles = createStyles((theme) => ({
    cell: {
        ...theme.fn.fontStyles(),
        position: 'relative',
        padding: theme.spacing.sm,
        paddingRight: theme.spacing.xs,

        // cell border
        borderRightColor: theme.colors.dark[4],
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
    },
    header: {
        fontWeight: 'bold',
        backgroundColor: theme.colors.dark[8],
        borderBottom: `1px solid ${theme.colors.dark[4]}`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',

        '&.last': {
            borderBottom: `4px solid ${theme.colors.teal[6]}`,
        },

        '&.sort': {
            cursor: 'pointer',
            userSelect: 'none',
        },
    },
    even: {
        backgroundColor: theme.colors.dark[6],
    },
    slot: {
        // text overflow
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    drag: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 4,
        cursor: 'col-resize',
        ':hover': {
            backgroundColor: theme.colors.dark[4],
        },
    },
}));

const isLast = (arr: any[], i: number) => {
    return arr.length - 1 === i;
};

/*
- Default Filter

  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  weakEquals,
  inNumberRange,
*/

interface DataTableGenerics<T> extends ReactTableGenerics {
    Row: T;
}

export type DataTableProps<T> = {
    table: Table<DataTableGenerics<T>>;
    columns: ColumnDef<DataTableGenerics<T>>[];
    data: T[];
};
export default function DataTable<T>({
    table,
    columns,
    data,
}: DataTableProps<T>) {
    const [globalFilter, setGlobalFilter] = useState('');
    const scrollbarWidth = getScrollbarWidth();
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
                <>
                    <DebouncedTextInput
                        value={globalFilter}
                        onChange={setGlobalFilter}
                        style={{ width }}
                        placeholder="Search"
                        rightSection={<Search />}
                        styles={{
                            root: {
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 0,
                            },
                        }}
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
                            children={({ index, style }) => {
                                const header = group.headers[index];
                                const isSorted = header.column.getIsSorted();
                                const isLastGroup = isLast(headerGroups, i);
                                const canSort =
                                    isLastGroup && header.column.getCanSort();
                                const canFitler =
                                    isLastGroup && header.column.getCanFilter();
                                return (
                                    <div
                                        style={style}
                                        className={cx(
                                            classes.header,
                                            classes.cell,
                                            {
                                                last: isLastGroup,
                                                sort: canSort,
                                            }
                                        )}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className={classes.slot}>
                                            {!header.isPlaceholder &&
                                                header.renderHeader()}
                                        </div>
                                        {canSort && isSorted && (
                                            <Button
                                                children={<CaretDown />}
                                                variant="subtle"
                                                compact
                                                size="xs"
                                                px={0}
                                                color="gray"
                                                style={{
                                                    transition:
                                                        'transform 0.25s',
                                                    transform: `rotate(${
                                                        isSorted === 'asc'
                                                            ? '180'
                                                            : '0'
                                                    }deg)`,
                                                }}
                                            />
                                        )}
                                        {canFitler && (
                                            <Button
                                                children={<Filter />}
                                                variant="subtle"
                                                compact
                                                size="xs"
                                                px={0}
                                                color="gray"
                                            />
                                        )}
                                        <div
                                            className={classes.drag}
                                            onClick={(e) => e.stopPropagation()}
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            style={{
                                                transform:
                                                    header.column.getIsResizing()
                                                        ? `translateX(${
                                                              instance.getState()
                                                                  .columnSizingInfo
                                                                  .deltaOffset
                                                          }px)`
                                                        : '',
                                            }}
                                        />
                                    </div>
                                );
                            }}
                        />
                    ))}

                    <VariableSizeGrid
                        ref={bodyRef}
                        columnCount={visible.length}
                        columnWidth={(index) => visible[index].getSize()}
                        rowCount={rows.length}
                        rowHeight={() => 48}
                        height={height - 36 - 48 * headerGroups.length}
                        width={width}
                        onScroll={onScroll}
                        style={{ overflow: 'hidden' }}
                        children={({ style, columnIndex, rowIndex }) => {
                            const cell =
                                rows[rowIndex].getVisibleCells()[columnIndex];

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
                        }}
                    />
                </>
            )}
        </AutoSizer>
    );
}

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
