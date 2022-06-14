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
import { dataGridfilterFns } from './ColumnFilter';

export type DataTableFilterFns = Record<
    keyof typeof dataGridfilterFns,
    FilterFn<any>
>;

export type DataTableGenerics<T> = Overwrite<
    ReactTableGenerics,
    {
        Row: T;
        FilterFns: DataTableFilterFns;
    }
>;

export type DataTableInstance<T = any> = TableInstance<DataTableGenerics<T>>;

export type ColumnsFactory<T> = (
    table: Table<DataTableGenerics<T>>
) => ColumnDef<DataTableGenerics<T>>[];

export type DataTableProps<T> = {
    columns: ColumnsFactory<T>;
    data: T[];
    filters?: Record<string, DataTableFitler<T>>;
};

export type DataTableFitler<T> = {
    filterFn: FilterFn<any>;
    element: ComponentType<DataTableFilterProps<T>>;
    init(): any;
};

export type DataTableFilterProps<T = any> = {
    filter: T;
    onFilterChange(value: T): void;
};

export function useReactTable<T>() {
    const { current: table } = useRef(
        createTable()
            .setRowType<T>()
            .setOptions({
                filterFns: {
                    stringFilter: dataGridfilterFns.stringFilter.filterFn,
                    dateFilter: dataGridfilterFns.dateFilter.filterFn,
                    numberFilter: dataGridfilterFns.numberFilter.filterFn,
                },
            }) as Table<DataTableGenerics<T>>
    );
    return table;
}
