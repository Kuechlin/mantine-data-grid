import { Select, Text } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: DateFilterOperator;
  value: string | null | [string | null, string | null];
};

export enum DateFilterOperator {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
  Range = 'range',
}

type DateInputProps = DataGridFilterProps<FilterState> & {
  placeholder: string;
};

function toValue(value: string | null): Date | null;
function toValue(value: [string | null, string | null]): [Date | null, Date | null];
function toValue(value: FilterState['value']): Date | null | [Date | null, Date | null];
function toValue(value: FilterState['value']): Date | null | [Date | null, Date | null] {
  if (Array.isArray(value)) {
    return [toValue(value[0]), toValue(value[1])];
  }
  if (!value) return null;
  const time = Date.parse(value);
  if (isNaN(time)) return null;
  return new Date(time);
}

function toString(value: Date | null): string | null;
function toString(value: [Date | null, Date | null]): [string | null, string | null];
function toString(value: Date | null | [Date | null, Date | null]): FilterState['value'] {
  if (Array.isArray(value)) {
    return [toString(value[0]), toString(value[1])];
  } else {
    return value?.toISOString() || null;
  }
}

const DateInput = ({ filter, onFilterChange, placeholder }: DateInputProps) => (
  <DatePicker
    value={Array.isArray(filter.value) ? null : toValue(filter.value)}
    onChange={(value) => onFilterChange({ ...filter, value: toString(value) })}
    placeholder={placeholder}
    rightSection={<Filter size={20} />}
    allowFreeInput
  />
);

const DateRangeInput = ({ filter, onFilterChange, placeholder }: DateInputProps) => (
  <DateRangePicker
    value={Array.isArray(filter.value) ? toValue(filter.value) : [null, null]}
    onChange={(value) => onFilterChange({ ...filter, value: toString(value) })}
    placeholder={placeholder}
    rightSection={<Filter size={20} />}
  />
);

export type DateFilterOptions = {
  title?: string;
  fixedOperator?: DateFilterOperator;
  labels?: Partial<Record<DateFilterOperator, string>>;
  placeholder?: string;
};
export const createDateFilter = ({ title, fixedOperator, labels, placeholder = 'Filter value' }: DateFilterOptions) => {
  const filterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter: FilterState) => {
    if (!filter.value) return true;
    const rowValue = new Date(row.getValue(columnId));
    const op = filter.op || DateFilterOperator.Equals;
    const value = toValue(filter.value);
    if (
      op === DateFilterOperator.Range &&
      Array.isArray(value) &&
      value.length === 2 &&
      value[0] instanceof Date &&
      value[1] instanceof Date
    ) {
      return value[0] <= rowValue && rowValue <= value[1];
    } else if (value instanceof Date) {
      switch (op) {
        case DateFilterOperator.Equals:
          return rowValue === value;
        case DateFilterOperator.NotEquals:
          return rowValue !== value;
        case DateFilterOperator.GreaterThan:
          return rowValue > value;
        case DateFilterOperator.GreaterThanOrEquals:
          return rowValue >= value;
        case DateFilterOperator.LowerThan:
          return rowValue < value;
        case DateFilterOperator.LowerThanOrEquals:
          return rowValue <= value;
      }
    }
    return true;
  };
  filterFn.autoRemove = (val) => !val;

  filterFn.init = () => ({
    op: fixedOperator || DateFilterOperator.GreaterThan,
    value: null,
  });

  filterFn.element = function DateFilter({ filter, onFilterChange }: DataGridFilterProps<FilterState>) {
    return (
      <>
        {title && <Text>{title}</Text>}

        {!fixedOperator && (
          <Select
            data={Object.entries(DateFilterOperator).map(([label, value]) => ({
              value,
              label: (labels && labels[value]) || label,
            }))}
            value={filter.op || DateFilterOperator.Equals}
            onChange={(op: DateFilterOperator) => onFilterChange({ ...filter, op })}
            withinPortal
          />
        )}

        {filter.op === DateFilterOperator.Range ? (
          <DateRangeInput filter={filter} placeholder={placeholder} onFilterChange={onFilterChange} />
        ) : (
          <DateInput filter={filter} placeholder={placeholder} onFilterChange={onFilterChange} />
        )}
      </>
    );
  };

  return filterFn;
};

export const dateFilterFn = createDateFilter({});
