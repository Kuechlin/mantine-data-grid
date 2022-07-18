import { RowData, ColumnDef, FilterFn } from '@tanstack/react-table';
import { DataGridColumnDef } from '../types';
import { booleanFilterFn } from './booleanFilter';
import { dateFilterFn } from './dateFilter';
import { numberFilterFn } from './numberFilter';
import { stringFilterFn } from './stringFilter';
export { highlightFilterValue } from './stringFilter';

export { ColumnFilter } from './ColumnFilter';
export type { DataGridFilterFn } from './ColumnFilter';

export const dataGridfilterFns = {
    stringFilterFn,
    numberFilterFn,
    dateFilterFn,
    booleanFilterFn,
};

export function injectFilterFn<TData extends RowData>(
    col: DataGridColumnDef<TData>
): ColumnDef<TData> {
    let filterFn = col.filterFn;
    if (typeof filterFn === 'string' && dataGridfilterFns[filterFn]) {
        filterFn = dataGridfilterFns[filterFn];
    }
    let columns = col.columns;
    if (columns) {
        columns = columns.map((x) => injectFilterFn<TData>(x as any));
    }
    return {
        ...col,
        filterFn: filterFn as FilterFn<TData>,
        columns,
    };
}

export type DataGridFilterFns = keyof typeof dataGridfilterFns;
