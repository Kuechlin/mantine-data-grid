import { Group, NumberInput, Select, Text } from '@mantine/core';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: NumberFilterOperator;
  value?: number | number[];
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
  NotBetweenOrEquals = 'nbeteq',
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
    const leftFilterValue = Array.isArray(filter.value) ? Number(filter.value[0]) : Number(filter.value);
    const rightFilterValue = Array.isArray(filter.value) ? Number(filter.value[1]) : 0;
    switch (op) {
      case NumberFilterOperator.Equals:
        return rowValue === leftFilterValue;
      case NumberFilterOperator.NotEquals:
        return rowValue !== leftFilterValue;
      case NumberFilterOperator.GreaterThan:
        return rowValue > leftFilterValue;
      case NumberFilterOperator.GreaterThanOrEquals:
        return rowValue >= leftFilterValue;
      case NumberFilterOperator.LowerThan:
        return rowValue < leftFilterValue;
      case NumberFilterOperator.LowerThanOrEquals:
        return rowValue <= leftFilterValue;
      case NumberFilterOperator.Between:
        return rowValue > leftFilterValue && rowValue < rightFilterValue;
      case NumberFilterOperator.BetweenOrEquals:
        return rowValue >= leftFilterValue && rowValue <= rightFilterValue;
      case NumberFilterOperator.NotBetween:
        return !(rowValue > leftFilterValue && rowValue < rightFilterValue);
      case NumberFilterOperator.NotBetweenOrEquals:
        return !(rowValue >= leftFilterValue && rowValue <= rightFilterValue);
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
    const handleFilterChange = (op: NumberFilterOperator) => {
      if (isBetweenFilter(op)) {
        onFilterChange({
          op,
          value: Array.isArray(filter.value) ? filter.value : 0,
        });
      } else {
        onFilterChange({
          op,
          value: Array.isArray(filter.value) ? 0 : filter.value,
        });
      }
    };
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
            onChange={handleFilterChange}
            withinPortal
          />
        )}

        <Group noWrap grow>
          <NumberInput
            value={Array.isArray(filter.value) ? filter.value[0] : filter.value}
            onChange={(value) => {
              onFilterChange({
                ...filter,
                value: Array.isArray(filter.value) ? [value ?? 0, filter.value.at(1) ?? 0] : value ?? 0,
              });
            }}
            placeholder={placeholder}
            rightSection={isBetweenFilter(filter.op) ? null : <Filter size={20} />}
            hideControls
          />
          {isBetweenFilter(filter.op) && (
            <NumberInput
              value={Array.isArray(filter.value) ? filter.value[1] : 0}
              onChange={(value) =>
                onFilterChange({
                  ...filter,
                  value: Array.isArray(filter.value) ? [filter.value.at(0) ?? 0, value ?? 0] : 0,
                })
              }
              placeholder={placeholder}
              hideControls
            />
          )}
        </Group>
      </>
    );
  };
  return filterFn;
};

export const numberFilterFn = createNumberFilter({});
