import { Highlight, Select, Text, TextInput } from '@mantine/core';
import { CellContext, RowData } from '@tanstack/react-table';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: StringFilterOperator;
  value: string;
};

export enum StringFilterOperator {
  Includes = 'in',
  NotIncludes = 'nin',
  Equals = 'eq',
  NotEquals = 'neq',
  StartsWith = 'start',
  EndsWith = 'end',
}

export type StringFilterOptions = {
  title?: string;
  fixedOperator?: StringFilterOperator;
  labels?: Partial<Record<StringFilterOperator, string>>;
  placeholder?: string;
};
export const createStringFilter = ({
  title,
  fixedOperator,
  labels,
  placeholder = 'Filter value',
}: StringFilterOptions) => {
  const filterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter) => {
    const rowValue = String(row.getValue(columnId)).toLowerCase();
    const op = filter.op || StringFilterOperator.Includes;
    const filterValue = String(filter.value).toLowerCase();
    switch (op) {
      case StringFilterOperator.Includes:
        return rowValue.includes(filterValue);
      case StringFilterOperator.NotIncludes:
        return !rowValue.includes(filterValue);
      case StringFilterOperator.Equals:
        return rowValue === filterValue;
      case StringFilterOperator.NotEquals:
        return rowValue !== filterValue;
      case StringFilterOperator.StartsWith:
        return rowValue.startsWith(filterValue);
      case StringFilterOperator.EndsWith:
        return rowValue.endsWith(filterValue);
      default:
        return true;
    }
  };
  filterFn.autoRemove = (val) => !val;
  filterFn.init = () => ({
    op: fixedOperator || StringFilterOperator.Includes,
    value: '',
  });
  filterFn.element = function ({ filter, onFilterChange }: DataGridFilterProps<FilterState>) {
    return (
      <>
        {title && <Text>{title}</Text>}

        {!fixedOperator && (
          <Select
            data={Object.entries(StringFilterOperator).map(([label, value]) => ({
              value,
              label: (labels && labels[value]) || label,
            }))}
            value={filter.op || StringFilterOperator.Includes}
            onChange={(op) => onFilterChange({ ...filter, op: op as StringFilterOperator })}
            withinPortal
          />
        )}

        <TextInput
          value={filter.value}
          onChange={(e) => onFilterChange({ ...filter, value: e.target.value })}
          placeholder={placeholder}
          rightSection={<Filter size={20} />}
        />
      </>
    );
  };
  return filterFn;
};

export const stringFilterFn = createStringFilter({});

export const highlightFilterValue = <TData extends RowData>({
  renderValue,
  column,
  table,
}: CellContext<TData, any>) => {
  const highlight = [];
  const filter = column.getFilterValue() as FilterState;
  if (filter && filter.value) {
    highlight.push(filter.value);
  }

  const globalFilter = table.getState().globalFilter;
  if (globalFilter) {
    highlight.push(globalFilter);
  }

  return (
    <Highlight highlight={highlight} children={renderValue()} style={{ display: 'inline', fontSize: 'inherit' }} />
  );
};
