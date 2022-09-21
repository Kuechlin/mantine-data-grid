import { MultiSelect } from '@mantine/core';
import { DataGrid, DataGridFilterFn } from '../../../src';
import { Data, demoData } from '../../demoData';

const catFilter: DataGridFilterFn<Data, string[]> = (row, columnId, filter) => {
  const rowValue = String(row.getValue(columnId));
  return Array.isArray(filter) ? filter.includes(rowValue) : false;
};
catFilter.autoRemove = (val) => !val;
catFilter.init = () => [];
catFilter.element = function ({ filter, onFilterChange }) {
  return (
    <MultiSelect
      data={[
        { value: 'Peterbald', label: 'Peterbald' },
        { value: 'Chartreux', label: 'Chartreux' },
        { value: 'Highlander', label: 'Highlander' },
        { value: 'Savannah', label: 'Savannah' },
        { value: 'Birman', label: 'Birman' },
        { value: 'Burmese', label: 'Burmese' },
        { value: 'Siberian', label: 'Siberian' },
      ]}
      value={filter || []}
      onChange={onFilterChange}
      placeholder="Filter value"
    />
  );
};

export default function CustomFilterExample() {
  return (
    <DataGrid
      data={demoData.slice(0, 10)}
      withColumnFilters
      noFlexLayout
      columns={[
        {
          accessorKey: 'cat',
          filterFn: catFilter,
        },
      ]}
    />
  );
}
