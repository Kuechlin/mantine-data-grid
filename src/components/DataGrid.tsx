import { ReactNode, useRef, useState } from 'react';
import {
    GridChildComponentProps,
    ListChildComponentProps,
    VariableSizeGrid,
    VariableSizeList,
} from 'react-window';
import { Button, createStyles } from '@mantine/core';
import { CaretDown } from 'tabler-icons-react';
import AutoSizer from 'react-virtualized-auto-sizer';

export type ColumnOption<T> = {
    width?: number;
    height?: number;
    label: ReactNode;
    sort: (a: T, b: T) => number;
    render: (record: T) => ReactNode;
};

export type DataGridProps<T> = {
    data: T[];
    columns: ColumnOption<T>[];
};

type SortState = {
    column: number;
    direction: 'asc' | 'desc';
};

type CellData<T> = {
    sort: SortState | null;
    columnCount: number;
    rowCount: number;
    getColumn(i: number): ColumnOption<T>;
    getItem(i: number): T;
    toggleSort(i: number): void;
};

export default function DataGrid<T>({ columns, data }: DataGridProps<T>) {
    const headerRef = useRef<VariableSizeList>(null);
    const [sort, setSort] = useState<SortState | null>(null);

    const dataSource = [...data];
    // sort data
    if (sort) {
        dataSource.sort(columns[sort.column].sort);
        if (sort.direction === 'desc') {
            dataSource.reverse();
        }
    }

    // create cell context
    const cellData: CellData<T> = {
        sort,
        columnCount: columns.length,
        rowCount: dataSource.length,
        getColumn: (i) => columns[i],
        getItem: (i) => dataSource[i],
        toggleSort: (i) =>
            setSort((s) => {
                if (!s) return { column: i, direction: 'asc' };
                if (s.column === i && s.direction === 'asc')
                    return {
                        column: i,
                        direction: 'desc',
                    };
                else return null;
            }),
    };

    return (
        <AutoSizer>
            {({ height, width }) => (
                <>
                    <VariableSizeList<CellData<T>>
                        ref={headerRef}
                        itemData={cellData}
                        children={Th}
                        height={48}
                        itemSize={(index) => columns[index].width || 100}
                        width={width - 17}
                        itemCount={columns.length}
                        layout="horizontal"
                        style={{ overflow: 'hidden' }}
                    />
                    <VariableSizeGrid<CellData<T>>
                        itemData={cellData}
                        children={Td}
                        columnCount={columns.length}
                        columnWidth={(index) => columns[index].width || 100}
                        rowCount={dataSource.length}
                        rowHeight={() => 48}
                        height={height - 48}
                        width={width}
                        onScroll={({ scrollLeft }) =>
                            headerRef.current?.scrollTo(scrollLeft)
                        }
                    />
                </>
            )}
        </AutoSizer>
    );
}

const useCellStyles = createStyles(
    (theme, params: { last?: boolean; even?: boolean }) => ({
        cell: {
            ...theme.fn.fontStyles(),

            padding: theme.spacing.sm,

            // cell border
            borderRightColor: theme.colors.dark[4],
            borderRightStyle: 'solid',
            borderRightWidth: params.last ? '0px' : '1px',
        },
        header: {
            fontWeight: 'bold',
            backgroundColor: theme.colors.dark[8],
            borderBottom: `4px solid ${theme.fn.themeColor('teal', 6)}`,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
        },
        content: {
            backgroundColor: params.even ? theme.colors.dark[6] : 'transparent',
        },
        slot: {
            // text overflow
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    })
);

function Th<T>({ data, index, style }: ListChildComponentProps<CellData<T>>) {
    const { classes, cx } = useCellStyles({});

    const column = data.getColumn(index);

    // header
    return (
        <div
            style={style}
            className={cx(classes.cell, classes.header)}
            onClick={() => data.toggleSort(index)}
        >
            <div className={classes.slot}>{column.label}</div>
            {data.sort?.column === index && (
                <Button
                    children={<CaretDown />}
                    variant="subtle"
                    compact
                    size="xs"
                    px={0}
                    color="gray"
                    style={{
                        transition: 'transform 0.25s',
                        transform: `rotate(${
                            data.sort.direction === 'asc' ? '180' : '0'
                        }deg)`,
                    }}
                />
            )}
        </div>
    );
}

function Td<T>({
    data,
    rowIndex,
    columnIndex,
    style,
}: GridChildComponentProps<CellData<T>>) {
    const { classes, cx } = useCellStyles({
        last: columnIndex === data.columnCount - 1,
        even: !!(rowIndex % 2),
    });

    const column = data.getColumn(columnIndex);
    const item = data.getItem(rowIndex);

    return (
        <div
            style={style}
            className={cx(classes.cell, classes.content, classes.slot)}
        >
            {column.render(item)}
        </div>
    );
}
