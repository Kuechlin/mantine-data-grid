import { FilterFn, RowData } from '@tanstack/react-table';
import { ComponentType } from 'react';

// Data Grid Filters
export type DataGridFilterElementProps<T = unknown> = {
  filter: T;
  onFilterChange(value: T): void;
};

export type DataGridFilterElement<TFilter = unknown> = ComponentType<DataGridFilterElementProps<TFilter>>;

export type DataGridFilterFn<TData extends RowData, TFilter = unknown> = FilterFn<TData> & {
  element: DataGridFilterElement<TFilter>;
  init(): TFilter;
};

export function isDataGridFilter(val: unknown): val is DataGridFilterFn<unknown> {
  return typeof val === 'function' && 'element' in val && 'init' in val;
}

export type DataGridFilterState<TFilterValue> = {
  op: string;
  value: TFilterValue;
};

export type DataGridFilterInputProps<TFilterValue> = {
  placeholder?: string;
  value: TFilterValue;
  onChange(value: TFilterValue): void;
};

export type DataGridFilterInput<TFilterValue> = ComponentType<DataGridFilterInputProps<TFilterValue>>;

export type DataGridFilterOperator<TRowValue, TFilterValue> = {
  op: string;
  label?: string;
  filterFn: (rowValue: TRowValue, filterValue: TFilterValue) => boolean;
  element: DataGridFilterInput<TFilterValue>;
};
