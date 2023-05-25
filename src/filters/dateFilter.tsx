import { DatePickerInput } from '@mantine/dates';
import { IconFilter } from '@tabler/icons-react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { createOperatorFilter, OperatorFilterOptions } from './createOperatorFilter';
import { DataGridFilterInput, DataGridFilterOperator } from './types';

// eslint-disable-next-line import/no-named-as-default-member
const { extend } = dayjs;

extend(isSameOrBefore);
extend(isSameOrAfter);

type DateValue = string | null | [string | null, string | null];

function parseDate(value: string | null) {
  if (!value) return null;
  const date = dayjs(value);
  return date.isValid() ? date.toDate() : null;
}
function toString(value: Date | null): string | null {
  return value?.toISOString() || null;
}

const getLeftValue = (value: DateValue) => (Array.isArray(value) ? dayjs(value[0]) : dayjs(Number.MIN_VALUE));
const getRightValue = (value: DateValue) => (Array.isArray(value) ? dayjs(value[1]) : dayjs(Number.MAX_VALUE));

function combineTimeAndDate(time: Date | null, date: Date | null) {
  if (!time && !date) return null;
  if (!time) return date;
  if (!date) return time;
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const dateAndTime = dayjs(date).hour(hour).minute(minute);
  return dateAndTime.toDate();
}

export function createDateFilterInput(withTime = false): DataGridFilterInput<DateValue> {
  return function DateFilterInput({ value, onChange, ...rest }) {
    if (Array.isArray(value)) {
      return (
        <>
          <DatePickerInput
            type="range"
            {...rest}
            value={[parseDate(value[0]), parseDate(value[1])]}
            onChange={(value) => onChange([toString(value[0]), toString(value[1])])}
            rightSection={<IconFilter size={20} />}
          />
          {/*withTime && (
            <TimeRangeInput
              value={filterValue}
              onChange={(value) =>
                onFilterChange({ ...filter, value: toString(arrayToValue(value, filterValue, true)) })
              }
            />
            )*/}
        </>
      );
    } else {
      return (
        <>
          <DatePickerInput
            {...rest}
            value={parseDate(value)}
            onChange={(value) => onChange(toString(value))}
            rightSection={<IconFilter size={20} />}
          />
          {/*withTime && (
            <TimeInput
              value={filterValue}
              onChange={(value) =>
                onFilterChange({ ...filter, value: toString(combineTimeAndDate(value, filterValue)) })
              }
            />
            )*/}
        </>
      );
    }
  };
}

export const dateOperators = {
  equals: (label = 'equals', withTime = false): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'eq',
    label,
    filterFn: (rowValue, filterValue) => dayjs(rowValue).isSame(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  notEquals: (label = 'not equals', withTime = false): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'neq',
    label,
    filterFn: (rowValue, filterValue) =>
      !dayjs(rowValue).isSame(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  greaterThan: (label = 'GreaterThan', withTime = false): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'gt',
    label,
    filterFn: (rowValue, filterValue) =>
      dayjs(rowValue).isAfter(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  greaterThanOrEquals: (
    label = 'GreaterThanOrEquals',
    withTime = false
  ): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'gte',
    label,
    filterFn: (rowValue, filterValue) =>
      dayjs(rowValue).isSameOrAfter(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  lowerThan: (label = 'LowerThan', withTime = false): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'lt',
    label,
    filterFn: (rowValue, filterValue) =>
      dayjs(rowValue).isBefore(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  lowerThanOrEquals: (
    label = 'LowerThanOrEquals',
    withTime = false
  ): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'lte',
    label,
    filterFn: (rowValue, filterValue) =>
      dayjs(rowValue).isSameOrBefore(getLeftValue(filterValue), withTime ? 'minute' : 'day'),
    element: createDateFilterInput(withTime),
  }),
  range: (label = 'Range', withTime = false): DataGridFilterOperator<string | Date | Dayjs, DateValue> => ({
    op: 'range',
    label,
    filterFn: (rowValue, filterValue) => {
      const rowDate = dayjs(rowValue);
      return (
        getLeftValue(filterValue).isSameOrBefore(rowDate, withTime ? 'minute' : 'day') &&
        rowDate.isSameOrBefore(getRightValue(filterValue), withTime ? 'minute' : 'day')
      );
    },
    element: createDateFilterInput(withTime),
  }),
};

export const initDateFilterValue = (op: string, last?: DateValue): DateValue => {
  if (op === 'range') {
    return last && Array.isArray(last) ? last : [null, null];
  } else {
    return last && !Array.isArray(last) ? last : null;
  }
};

export function createDateFilter(options?: Partial<OperatorFilterOptions<string | Date | Dayjs, DateValue>>) {
  return createOperatorFilter({
    init: initDateFilterValue,
    operators: [
      dateOperators.equals(),
      dateOperators.notEquals(),
      dateOperators.greaterThan(),
      dateOperators.greaterThanOrEquals(),
      dateOperators.lowerThan(),
      dateOperators.lowerThanOrEquals(),
      dateOperators.range(),
    ],
    ...options,
  });
}

export const dateFilterFn = createDateFilter();
