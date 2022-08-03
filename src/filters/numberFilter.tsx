import { NumberInput, Select, Text } from '@mantine/core';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: NumberFilterOperator;
  value: number;
};

export enum NumberFilterOperator {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
}

export type NumberFilterOptions = {
  title?: string;
  fixedOperator?: NumberFilterOperator;
  labels?: Partial<Record<NumberFilterOperator, string>>;
  placeholder?: string;
};
export const createNumberFilter = ({
  title,
  fixedOperator,
  labels,
  placeholder = 'Filter value',
}: NumberFilterOptions) => {
  const filterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter) => {
    const rowValue = Number(row.getValue(columnId));
    const op = filter.op || NumberFilterOperator.Equals;
    const filterValue = Number(filter.value);
    switch (op) {
      case NumberFilterOperator.Equals:
        return rowValue === filterValue;
      case NumberFilterOperator.NotEquals:
        return rowValue !== filterValue;
      case NumberFilterOperator.GreaterThan:
        return rowValue > filterValue;
      case NumberFilterOperator.GreaterThanOrEquals:
        return rowValue >= filterValue;
      case NumberFilterOperator.LowerThan:
        return rowValue < filterValue;
      case NumberFilterOperator.LowerThanOrEquals:
        return rowValue <= filterValue;
      default:
        return true;
    }
  };
  filterFn.autoRemove = (val) => !val;
  filterFn.init = () => ({
    op: fixedOperator || NumberFilterOperator.GreaterThan,
    value: 0,
  });
  filterFn.element = function NumberFilter({ filter, onFilterChange }: DataGridFilterProps) {
    return (
      <>
        {title && <Text>{title}</Text>}

        {!fixedOperator && (
          <Select
            data={Object.entries(NumberFilterOperator).map(([label, value]) => ({
              value,
              label: (labels && labels[value]) || label,
            }))}
            value={filter.op || NumberFilterOperator.Equals}
            onChange={(op) => onFilterChange({ ...filter, op })}
          />
        )}

        <NumberInput
          value={filter.value}
          onChange={(value) => onFilterChange({ ...filter, value })}
          placeholder={placeholder}
          rightSection={<Filter />}
        />
      </>
    );
  };
  return filterFn;
};

export const numberFilterFn = createNumberFilter({});
