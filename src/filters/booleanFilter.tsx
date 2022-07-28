import { SegmentedControl } from '@mantine/core';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: BooleanFilter;
  value: boolean;
};

export enum BooleanFilter {
  Equals = 'eq',
}

export const booleanFilterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter) => {
  const rowValue = Boolean(row.getValue(columnId));
  const op = filter.op || BooleanFilter.Equals;
  const filterValue = Boolean(filter.value);
  switch (op) {
    case BooleanFilter.Equals:
      return rowValue === filterValue;
    default:
      return true;
  }
};
booleanFilterFn.autoRemove = (val) => !val;

booleanFilterFn.init = () => ({
  op: BooleanFilter.Equals,
  value: true,
});

booleanFilterFn.element = function ({ filter, onFilterChange }: DataGridFilterProps<FilterState>) {
  const handleValueChange = (value: string) => onFilterChange({ ...filter, value: value === 'true' ? true : false });

  return (
    <SegmentedControl
      value={filter.value ? 'true' : 'false'}
      onChange={handleValueChange}
      data={[
        { label: 'true', value: 'true' },
        { label: 'false', value: 'false' },
      ]}
      fullWidth
      styles={{
        active: {
          // fix visual bug when opening filter dropdown
          height: 'calc(100% - 8px) !important',
        },
      }}
    />
  );
};
