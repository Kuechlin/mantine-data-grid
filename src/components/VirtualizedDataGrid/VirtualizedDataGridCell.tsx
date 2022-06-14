import { Cell } from '@tanstack/react-table';
import { GridChildComponentProps } from 'react-window';
import { DataTableGenerics } from '../types';
import useStyles from './VirtualizedDataGrid.styles';

export type DataGridCellData<T> = {
    getCell(column: number, row: number): Cell<DataTableGenerics<T>>;
};

export type DataGridCellProps<T> = GridChildComponentProps<DataGridCellData<T>>;

export function DataGridCell<T>({
    columnIndex,
    rowIndex,
    style,
    data: { getCell },
}: DataGridCellProps<T>) {
    const { classes, cx } = useStyles();

    const cell = getCell(columnIndex, rowIndex);

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
}
