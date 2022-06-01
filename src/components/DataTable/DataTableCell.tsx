import { Cell } from '@tanstack/react-table';
import { DataTableGenerics } from './DataTable';
import useStyles from './DataTable.styles';

export type DataTableCellProps<T> = {
    cell: Cell<DataTableGenerics<T>>;
};

export function DataTableCell<T>({ cell }: DataTableCellProps<T>) {
    const { classes, cx } = useStyles();

    return (
        <td
            key={cell.id}
            style={{
                width: cell.column.getSize(),
            }}
            className={classes.cell}
            children={
                <span className={classes.slot} children={cell.renderCell()} />
            }
        />
    );
}
