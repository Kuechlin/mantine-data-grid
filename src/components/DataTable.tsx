import { createStyles } from '@mantine/core';
import {
    ColumnDef,
    createTable,
    getCoreRowModel,
    Overwrite,
    ReactTableGenerics,
    Table,
    TableGenerics,
    useTableInstance,
} from '@tanstack/react-table';
import { useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
    GridOnScrollProps,
    VariableSizeGrid,
    VariableSizeList,
} from 'react-window';
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
    const scrollbarWidth = getScrollbarWidth();
    const { classes, cx } = useStyles();
    const headerRefs = useRef<VariableSizeList[]>([]);
    const bodyRef = useRef<VariableSizeGrid>(null);
    const instance = useTableInstance(table, {
        data,
        columns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
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
                    {headerGroups.map((group, i) => (
                        <VariableSizeList
                            ref={(ref) => ref && (headerRefs.current[i] = ref)}
                            key={group.id}
                            direction="horizontal"
                            itemCount={group.headers.length}
                            itemSize={(i) => group.headers[i].getSize()}
                            width={width - scrollbarWidth}
                            height={48}
                            style={{ overflow: 'hidden' }}
                            children={({ index, style }) => {
                                const header = group.headers[index];
                                return (
                                    <div
                                        style={style}
                                        className={cx(
                                            classes.header,
                                            classes.cell,
                                            { last: isLast(headerGroups, i) }
                                        )}
                                    >
                                        {!header.isPlaceholder &&
                                            header.renderHeader()}
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
                        height={height - 48 * headerGroups.length}
                        width={width}
                        onScroll={onScroll}
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
