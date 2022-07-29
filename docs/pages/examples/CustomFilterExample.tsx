import { MultiSelect } from '@mantine/core';
import { DataGrid, DataGridFilterFn } from '../../../src';
import CodeDemo from '../../components/CodeDemo';
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
    <CodeDemo code={custom_filter}>
      <DataGrid
        data={demoData.slice(0, 10)}
        withColumnFilters
        columns={[
          {
            accessorKey: 'cat',
            filterFn: catFilter,
          },
        ]}
      />
    </CodeDemo>
  );
}

const custom_filter = `
import { DataGrid, DataGridFilterFn } from 'mantine-data-grid';

// custom filter function
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
            withColumnFilters
            value={filter || []}
            onChange={onFilterChange}
            placeholder="Filter value"
        />
    );
};

// data grid
function Demo() {
    return (
        <DataGrid
            data={data}
            columns={[
                {
                    accessorKey: 'cat',
                    filterFn: catFilter,
                }
            ]}
        />
    );
}
`;
