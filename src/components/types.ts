import {
    ColumnDef,
    FilterFn,
    ReactTableGenerics,
    Table,
    TableInstance,
    Overwrite,
    createTable,
} from '@tanstack/react-table';
import { ComponentType, useRef } from 'react';
import { stringFilterFn } from './ColumnFilter';

export type DataTableGenerics<T> = Overwrite<
    ReactTableGenerics,
    {
        Row: T;
        FilterFns: {
            stringFilterFn: FilterFn<any>;
        };
    }
>;

export type DataTableInstance<T = any> = TableInstance<DataTableGenerics<T>>;

export type ColumnsFactory<T> = (
    table: Table<DataTableGenerics<T>>
) => ColumnDef<DataTableGenerics<T>>[];

export type DataTableProps<T> = {
    columns: ColumnsFactory<T>;
    data: T[];
};

export type DataTableFilterProps<T = any> = {
    value: T;
    onChange(value: T): void;
};
export type DataTableFilterComponent<T = any> = ComponentType<
    DataTableFilterProps<T>
>;

export function useReactTable<T>() {
    const { current: table } = useRef(
        createTable().setRowType<T>().setOptions({
            filterFns: {
                stringFilterFn,
            },
        }) as Table<DataTableGenerics<T>>
    );
    return table;
}
