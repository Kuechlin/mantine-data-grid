import { NumberInput, Select, Text } from '@mantine/core';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: NumberFilterOperator;
  value?: number[];
};

export enum NumberFilterOperator {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
  Between = 'bet',
  BetweenOrEquals = 'beteq',
  NotBetween = 'nbet',
  NotBetweenOrEquals = 'neqbet',
}

const betweenFilters = [
  NumberFilterOperator.Between,
  NumberFilterOperator.BetweenOrEquals,
  NumberFilterOperator.NotBetweenOrEquals,
  NumberFilterOperator.NotBetween,
];

const isBetweenFilter = (op: NumberFilterOperator) => {
  return betweenFilters.includes(op);
};

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
    const firstFilterValue = Number(filter.value[0]);
    const secondFilterValue = Number(filter.value[1]);
    switch (op) {
      case NumberFilterOperator.Equals:
        return rowValue === firstFilterValue;
      case NumberFilterOperator.NotEquals:
        return rowValue !== firstFilterValue;
      case NumberFilterOperator.GreaterThan:
        return rowValue > firstFilterValue;
      case NumberFilterOperator.GreaterThanOrEquals:
        return rowValue >= firstFilterValue;
      case NumberFilterOperator.LowerThan:
        return rowValue < firstFilterValue;
      case NumberFilterOperator.LowerThanOrEquals:
        return rowValue <= firstFilterValue;
      case NumberFilterOperator.Between:
        return rowValue > firstFilterValue && rowValue < secondFilterValue;
      case NumberFilterOperator.BetweenOrEquals:
        return rowValue >= firstFilterValue && rowValue <= secondFilterValue;
      case NumberFilterOperator.NotBetween:
        return rowValue > secondFilterValue || rowValue < firstFilterValue;
      case NumberFilterOperator.NotBetweenOrEquals:
        return rowValue >= secondFilterValue || rowValue <= firstFilterValue;
      default:
        return true;
    }
  };
  filterFn.autoRemove = (val) => !val;
  filterFn.init = () => ({
    op: fixedOperator || NumberFilterOperator.GreaterThan,
    value: [0, 0],
  });
  filterFn.element = function NumberFilter({ filter, onFilterChange }: DataGridFilterProps<FilterState>) {
    if (!filter.value) filter.value = [0, 0];
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
            onChange={(op) => onFilterChange({ ...filter, op: op as NumberFilterOperator })}
          />
        )}

        <NumberInput
          value={filter.value[0]}
          onChange={(value) => {
            onFilterChange({ ...filter, value: [value ?? 0, filter.value?.at(1) ?? 0] });
          }}
          placeholder={placeholder}
          rightSection={<Filter />}
        />
        {isBetweenFilter(filter.op) && (
          <NumberInput
            value={filter.value[1]}
            onChange={(value) => onFilterChange({ ...filter, value: [filter.value?.at(0) ?? 0, value ?? 0] })}
            placeholder={placeholder}
            rightSection={<Filter />}
          />
        )}
      </>
    );
  };
  return filterFn;
};

export const numberFilterFn = createNumberFilter({});
