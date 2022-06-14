import { Button, Group } from '@mantine/core';
import {
    Column,
    Header,
    HeaderGroup,
    TableInstance,
} from '@tanstack/react-table';
import { ListChildComponentProps } from 'react-window';
import { ChevronDown, HeartRateMonitor, Selector } from 'tabler-icons-react';
import { ColumnFilter } from '../ColumnFilter';
import { DataTableGenerics } from '../types';
import useStyles from './DataGrid.styles';

export type DataTableHeaderProps<T> = {
    index: number;
    instance: TableInstance<DataTableGenerics<T>>;
    header: Header<DataTableGenerics<T>>;
    isLastGroup: boolean;
};

export function DataTableHeader<T>({
    index,
    header,
    instance,
    isLastGroup,
}: DataTableHeaderProps<T>) {
    const { classes, cx } = useStyles();
    const isSorted = header.column.getIsSorted();
    const canSort = isLastGroup && header.column.getCanSort();
    const canFitler = isLastGroup && header.column.getCanFilter();

    return (
        <th
            style={{
                width: header.column.getSize() * header.colSpan,
            }}
            colSpan={header.colSpan}
            className={cx(classes.header, classes.cell, {
                lastGroup: isLastGroup,
                first: index === 0,
                sort: canSort,
            })}
            onClick={header.column.getToggleSortingHandler()}
        >
            <span className={classes.slot}>
                {!header.isPlaceholder && header.renderHeader()}
            </span>
            <Group spacing="xs" noWrap>
                {canFitler && (
                    <ColumnFilter instance={instance} column={header.column} />
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
            />
        </th>
    );
}
