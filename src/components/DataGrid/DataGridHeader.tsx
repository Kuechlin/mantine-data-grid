import { Button, Group } from '@mantine/core';
import { HeaderGroup } from '@tanstack/react-table';
import { ListChildComponentProps } from 'react-window';
import { ChevronDown, Selector } from 'tabler-icons-react';
import { DataGridInstance, DataTableGenerics } from './DataGrid';
import { DataGridFilter } from './DataGridFilter';
import useStyles from './DataGrid.styles';

export type DataGridHeaderData<T> = {
    group: HeaderGroup<DataTableGenerics<T>>;
    isLastGroup: boolean;
};
export type DataGridHeaderProps<T> = ListChildComponentProps<
    DataGridHeaderData<T>
>;

export function DataGridHeader<T>({
    index,
    style,
    data: { group, isLastGroup },
}: DataGridHeaderProps<T>) {
    const { classes, cx } = useStyles();
    const header = group.headers[index];
    const isSorted = header.column.getIsSorted();
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
                {canFitler && <DataGridFilter column={header.column} />}
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
        </div>
    );
}
