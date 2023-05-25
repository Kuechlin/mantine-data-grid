import { TextInput } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { createOperatorFilter, OperatorFilterOptions } from './createOperatorFilter';
import { DataGridFilterInput, DataGridFilterOperator } from './types';

const format = (val: string) => String(val).toLowerCase();

export const StringFilterInput: DataGridFilterInput<string> = ({ onChange, ...rest }) => (
  <TextInput
    {...rest}
    onChange={(e) => onChange(e.target.value)}
    rightSection={<IconFilter size={20} />}
    aria-label="Filter value"
  />
);

export const stringOperators = {
  includes: (label = 'includes'): DataGridFilterOperator<string, string> => ({
    op: 'in',
    label,
    filterFn: (rowValue, filterValue) => format(rowValue).includes(format(filterValue)),
    element: StringFilterInput,
  }),
  notIncludes: (label = 'not includes'): DataGridFilterOperator<string, string> => ({
    op: 'nin',
    label,
    filterFn: (rowValue, filterValue) => !format(rowValue).includes(format(filterValue)),
    element: StringFilterInput,
  }),
  equals: (label = 'equals'): DataGridFilterOperator<string, string> => ({
    op: 'eq',
    label,
    filterFn: (rowValue, filterValue) => format(rowValue) === format(filterValue),
    element: StringFilterInput,
  }),
  notEquals: (label = 'not equals'): DataGridFilterOperator<string, string> => ({
    op: 'neq',
    label,
    filterFn: (rowValue, filterValue) => format(rowValue) !== format(filterValue),
    element: StringFilterInput,
  }),
  startsWith: (label = 'starts with'): DataGridFilterOperator<string, string> => ({
    op: 'start',
    label,
    filterFn: (rowValue, filterValue) => format(rowValue).startsWith(format(filterValue)),
    element: StringFilterInput,
  }),
  endsWith: (label = 'ends with'): DataGridFilterOperator<string, string> => ({
    op: 'end',
    label,
    filterFn: (rowValue, filterValue) => format(rowValue).endsWith(format(filterValue)),
    element: StringFilterInput,
  }),
};

export function createStringFilter(options?: Partial<OperatorFilterOptions<string, string>>) {
  return createOperatorFilter({
    init: (_op, last) => last ?? '',
    operators: [
      stringOperators.includes(),
      stringOperators.notIncludes(),
      stringOperators.equals(),
      stringOperators.notEquals(),
      stringOperators.startsWith(),
      stringOperators.endsWith(),
    ],
    ...options,
  });
}

export const stringFilterFn = createStringFilter();
