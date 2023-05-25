import { Group, NumberInput } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { OperatorFilterOptions, createOperatorFilter } from './createOperatorFilter';
import { DataGridFilterInput, DataGridFilterOperator } from './types';

type NumberFilterValue = number | [number, number];

export const NumberFilterInput: DataGridFilterInput<NumberFilterValue> = ({ onChange, value, ...rest }) =>
  Array.isArray(value) ? (
    <Group noWrap grow>
      <NumberInput {...rest} value={value[0]} onChange={(val) => onChange([Number(val) ?? 0, value[1]])} hideControls />
      <NumberInput {...rest} value={value[1]} onChange={(val) => onChange([value[0], Number(val) ?? 0])} hideControls />
    </Group>
  ) : (
    <NumberInput
      {...rest}
      value={value}
      onChange={(val) => onChange(Number(val) ?? 0)}
      rightSection={<IconFilter size={20} />}
      hideControls
    />
  );

const getLeftValue = (value: NumberFilterValue) => (Array.isArray(value) ? value[0] : Number.MIN_VALUE);
const getRightValue = (value: NumberFilterValue) => (Array.isArray(value) ? value[1] : Number.MAX_VALUE);

export const numberOperators = {
  equals: (label = 'equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'eq',
    label,
    filterFn: (rowValue, filterValue) => rowValue === getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  notEquals: (label = 'not equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'neq',
    label,
    filterFn: (rowValue, filterValue) => rowValue !== getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  greaterThan: (label = 'greater than'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'gt',
    label,
    filterFn: (rowValue, filterValue) => rowValue > getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  greaterThanOrEquals: (label = 'greater than or equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'gte',
    label,
    filterFn: (rowValue, filterValue) => rowValue >= getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  lowerThan: (label = 'lower than'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'lt',
    label,
    filterFn: (rowValue, filterValue) => rowValue < getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  lowerThanOrEquals: (label = 'lower than or equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'lte',
    label,
    filterFn: (rowValue, filterValue) => rowValue <= getLeftValue(filterValue),
    element: NumberFilterInput,
  }),
  between: (label = 'between'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'bet',
    label,
    filterFn: (rowValue, filterValue) => rowValue > getLeftValue(filterValue) && rowValue < getRightValue(filterValue),
    element: NumberFilterInput,
  }),
  betweenOrEquals: (label = 'between or equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'beteq',
    label,
    filterFn: (rowValue, filterValue) =>
      rowValue >= getLeftValue(filterValue) && rowValue <= getRightValue(filterValue),
    element: NumberFilterInput,
  }),
  notBetween: (label = 'not between'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'nbet',
    label,
    filterFn: (rowValue, filterValue) =>
      !(rowValue > getLeftValue(filterValue) && rowValue < getRightValue(filterValue)),
    element: NumberFilterInput,
  }),
  notBetweenOrEquals: (label = 'not between or equals'): DataGridFilterOperator<number, NumberFilterValue> => ({
    op: 'nbeteq',
    label,
    filterFn: (rowValue, filterValue) =>
      !(rowValue >= getLeftValue(filterValue) && rowValue <= getRightValue(filterValue)),
    element: NumberFilterInput,
  }),
};

const betweenFilters = ['bet', 'beteq', 'nbet', 'nbeteq'];
const isBetweenFilter = (op: string) => {
  return betweenFilters.includes(op);
};

export const initNumberFilterValue = (op: string, last?: NumberFilterValue): NumberFilterValue => {
  if (isBetweenFilter(op)) {
    return last && Array.isArray(last) ? last : [0, 0];
  } else {
    return last && !Array.isArray(last) ? last : 0;
  }
};

export function createNumberFilter(options?: Partial<OperatorFilterOptions<number, NumberFilterValue>>) {
  return createOperatorFilter<number, NumberFilterValue>({
    init: initNumberFilterValue,
    operators: [
      numberOperators.equals(),
      numberOperators.notEquals(),
      numberOperators.greaterThan(),
      numberOperators.greaterThanOrEquals(),
      numberOperators.lowerThan(),
      numberOperators.lowerThanOrEquals(),
      numberOperators.between(),
      numberOperators.betweenOrEquals(),
      numberOperators.notBetween(),
      numberOperators.notBetweenOrEquals(),
    ],
    ...options,
  });
}

export const numberFilterFn = createNumberFilter();
