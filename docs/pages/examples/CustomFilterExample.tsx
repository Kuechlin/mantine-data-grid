import { MultiSelect } from '@mantine/core';
import { DataGrid } from '../../../src';
import { createOperatorFilter } from '../../../src/filters/createOperatorFilter';
import { demoData } from '../../demoData';

const catFilter = createOperatorFilter<string, string[]>({
  init: () => [],
  operators: [
    {
      op: 'select',
      filterFn: (rowValue, filterValue) => filterValue.includes(rowValue),
      element: ({ onChange, value, ...rest }) => (
        <MultiSelect
          {...rest}
          data={[
            { value: 'Peterbald', label: 'Peterbald' },
            { value: 'Chartreux', label: 'Chartreux' },
            { value: 'Highlander', label: 'Highlander' },
            { value: 'Savannah', label: 'Savannah' },
            { value: 'Birman', label: 'Birman' },
            { value: 'Burmese', label: 'Burmese' },
            { value: 'Siberian', label: 'Siberian' },
          ]}
          value={value}
          onChange={onChange}
        />
      ),
    },
  ],
});

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
