import { Select, Text } from '@mantine/core';
import { useMemo } from 'react';
import { DataGridFilterElementProps, DataGridFilterFn, DataGridFilterOperator, DataGridFilterState } from './types';

export type OperatorFilterOptions<TRowValue, TFilterValue> = {
  title?: string;
  placeholder?: string;
  init: (op: string, last?: TFilterValue) => TFilterValue;
  operators: DataGridFilterOperator<TRowValue, TFilterValue>[];
};
/**
 * create a DataGrid filter function with multiple operators
 * @param {OperatorFilterOptions} options Filter options with operators
 * @returns DataGrid filter function
 */
export function createOperatorFilter<TRowValue, TFilterValue>({
  title,
  placeholder = 'Filter value',
  init,
  operators,
}: OperatorFilterOptions<TRowValue, TFilterValue>) {
  if (operators.length === 0) throw new Error('no filter operator');
  const operatorsMap = Object.fromEntries(operators.map((x) => [x.op, x])) as Record<
    string,
    DataGridFilterOperator<TRowValue, TFilterValue>
  >;
  // builder filer function
  const filterFn: DataGridFilterFn<any, DataGridFilterState<TFilterValue>> = (row, columnId, filter) => {
    // get filter operator
    const op = operatorsMap[filter.op];
    if (!op) return true;
    // get values
    const rowValue = row.getValue<TRowValue>(columnId);
    const filterValue = filter.value;
    // call filter function
    return op.filterFn(rowValue, filterValue);
  };
  filterFn.autoRemove = (val) => !val;
  // init filer state, first operator is default
  filterFn.init = () => ({
    op: operators[0].op,
    value: init(operators[0].op),
  });
  // add filter element with operator select
  filterFn.element = function Filter({
    filter,
    onFilterChange,
  }: DataGridFilterElementProps<DataGridFilterState<TFilterValue>>) {
    const Operator = useMemo(() => operatorsMap[filter?.op]?.element, [filter?.op]);

    const handleOperatorChange = (op: string) => {
      onFilterChange({ op: op, value: init(op, filter.value) });
    };

    return (
      <>
        {title && <Text>{title}</Text>}

        {operators.length > 1 && (
          <Select
            data={operators.map(({ op, label }) => ({
              value: op,
              label: label ?? op,
            }))}
            value={filter.op}
            onChange={handleOperatorChange}
            withinPortal
            aria-label="Filter Operator select"
          />
        )}

        {Operator && (
          <Operator
            value={filter.value}
            onChange={(value) => onFilterChange({ ...filter, value })}
            placeholder={placeholder}
            aria-label="Filter Value"
          />
        )}
      </>
    );
  };
  return filterFn;
}
