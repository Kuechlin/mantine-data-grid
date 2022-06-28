import { DataGridFilterFn } from './ColumnFilter';
import { dateFilterFn } from './dateFilter';
import { numberFilterFn } from './numberFilter';
import { stringFilterFn } from './stringFilter';

export { ColumnFilter } from './ColumnFilter';
export type { DataGridFilterFn } from './ColumnFilter';

export const dataGridfilterFns = {
    stringFilterFn,
    numberFilterFn,
    dateFilterFn,
};

export type DataGridFilterFns = Record<
    keyof typeof dataGridfilterFns,
    DataGridFilterFn
>;
