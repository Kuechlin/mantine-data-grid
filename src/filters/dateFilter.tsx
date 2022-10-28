import { Checkbox, Select, Text } from '@mantine/core';
import { DatePicker, DateRangePicker, DateRangePickerValue, TimeInput, TimeRangeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Filter } from 'tabler-icons-react';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type DateNullArray = [Date | null, Date | null];

type FilterState = {
  op: DateFilterOperator;
  withTime?: boolean;
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
  withTime: boolean;
};

function toValue(value: string | null): Date | null;
function toValue(value: [string | null, string | null]): DateNullArray;
function toValue(value: FilterState['value']): Date | null | DateNullArray;
function toValue(value: FilterState['value']): Date | null | DateNullArray {
  if (Array.isArray(value)) {
    return [toValue(value[0]), toValue(value[1])];
  }
  if (!value) return null;
  const time = Date.parse(value);
  if (isNaN(time)) return null;
  return new Date(time);
}

function toString(value: Date | null): string | null;
function toString(value: DateNullArray): [string | null, string | null];
function toString(value: Date | null | DateNullArray): FilterState['value'] {
  if (Array.isArray(value)) {
    return [toString(value[0]), toString(value[1])];
  } else {
    return value?.toISOString() || null;
  }
}

function combineTimeAndDate(time: Date | null, date: Date | null) {
  if (!time && !date) return null;
  if (!time) return date;
  if (!date) return time;
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const dateAndTime = dayjs(date).hour(hour).minute(minute);
  return dateAndTime.toDate();
}

const DateInput = ({ filter, onFilterChange, placeholder, withTime }: DateInputProps) => {
  const filterValue = Array.isArray(filter.value) ? null : toValue(filter.value);
  return (
    <>
      <DatePicker
        value={filterValue}
        onChange={(value) => {
          onFilterChange({ ...filter, value: toString(combineTimeAndDate(filterValue, value)) });
        }}
        placeholder={placeholder}
        rightSection={<Filter size={20} />}
        allowFreeInput
      />
      {withTime && (
        <TimeInput
          value={filterValue}
          onChange={(value) => onFilterChange({ ...filter, value: toString(combineTimeAndDate(value, filterValue)) })}
        />
      )}
    </>
  );
};

const arrayToValue = (value: DateNullArray, old: DateNullArray, time: boolean): DateNullArray => {
  if (time) {
    return [combineTimeAndDate(value[0], old[0]), combineTimeAndDate(value[1], old[1])];
  } else {
    return [combineTimeAndDate(old[0], value[0]), combineTimeAndDate(old[1], value[1])];
  }
};

const DateRangeInput = ({ filter, onFilterChange, placeholder, withTime }: DateInputProps) => {
  const filterValue = Array.isArray(filter.value) ? toValue(filter.value) : ([null, null] as DateNullArray);

  return (
    <>
      <DateRangePicker
        value={filterValue}
        onChange={(value) => onFilterChange({ ...filter, value: toString(arrayToValue(value, filterValue, false)) })}
        placeholder={placeholder}
        rightSection={<Filter size={20} />}
      />
      {withTime && (
        <TimeRangeInput
          value={filterValue}
          onChange={(value) => onFilterChange({ ...filter, value: toString(arrayToValue(value, filterValue, true)) })}
        />
      )}
    </>
  );
};

export type DateFilterOptions = {
  title?: string;
  fixedOperator?: DateFilterOperator;
  labels?: Partial<Record<DateFilterOperator, string>>;
  placeholder?: string;
  timeLabel?: string;
};
export const createDateFilter = ({
  title,
  fixedOperator,
  labels,
  placeholder = 'Filter value',
  timeLabel = 'with Time',
}: DateFilterOptions) => {
  const filterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter: FilterState) => {
    if (!filter.value) return true;
    const rowValue = dayjs(row.getValue(columnId));
    const op = filter.op || DateFilterOperator.Equals;
    const value = toValue(filter.value);
    const filterOn = filter.withTime ? 'minute' : 'day';
    if (
      op === DateFilterOperator.Range &&
      Array.isArray(value) &&
      value.length === 2 &&
      value[0] instanceof Date &&
      value[1] instanceof Date
    ) {
      return dayjs(value[0]).isSameOrBefore(rowValue, filterOn) && rowValue.isSameOrBefore(dayjs(value[1]), filterOn);
    } else if (value instanceof Date) {
      switch (op) {
        case DateFilterOperator.Equals:
          return rowValue.isSame(value, filterOn);
        case DateFilterOperator.NotEquals:
          return !rowValue.isSame(value, filterOn);
        case DateFilterOperator.GreaterThan:
          return rowValue.isAfter(value, filterOn);
        case DateFilterOperator.GreaterThanOrEquals:
          return rowValue.isSameOrAfter(value);
        case DateFilterOperator.LowerThan:
          return rowValue.isBefore(value, filterOn);
        case DateFilterOperator.LowerThanOrEquals:
          return rowValue.isSameOrBefore(value, filterOn);
      }
    }
    return true;
  };
  filterFn.autoRemove = (val) => !val;

  filterFn.init = () => ({
    op: fixedOperator || DateFilterOperator.GreaterThan,
    withTime: false,
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

        <Checkbox
          label={timeLabel}
          checked={filter.withTime}
          onChange={(e) => onFilterChange({ ...filter, withTime: e.target.checked })}
        />

        {filter.op === DateFilterOperator.Range ? (
          <>
            <DateRangeInput
              filter={filter}
              placeholder={placeholder}
              onFilterChange={onFilterChange}
              withTime={filter.withTime ?? false}
            />
          </>
        ) : (
          <DateInput
            filter={filter}
            placeholder={placeholder}
            onFilterChange={onFilterChange}
            withTime={filter.withTime ?? false}
          />
        )}
      </>
    );
  };

  return filterFn;
};

export const dateFilterFn = createDateFilter({});
