import { MultiSelect } from '@mantine/core';
import { DataGrid, DataGridFilterFn } from '../../../src';
import CodeDemo from '../CodeDemo';
import { demoData } from '../../demoData';

const catFilter: DataGridFilterFn<any> = (row, columnId, filter) => {
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

export default function OnRowClickExample() {
  return (
    <CodeDemo code={grid_usage}>
      <DataGrid
        data={demoData.slice(0, 10)}
        columns={[
          {
            accessorKey: 'cat',
            filterFn: catFilter,
          },
        ]}
        onRowClick={(event, row) => {
          alert(`You clicked on ${row.original.cat}`);
        }}
      />
    </CodeDemo>
  );
}
const grid_usage = `
import { MultiSelect } from '@mantine/core';
import { DataGrid, DataGridFilterFn } from '../../../src';
import CodeDemo from '../CodeDemo';
import { demoData } from '../../demoData';


function Demo() {
    return (
      <DataGrid
      data={demoData.slice(0, 10)}
      columns={[
        {
          accessorKey: 'cat',
          filterFn: catFilter,
        },
      ]}
      onRowClick={(event, row) => {
        alert(\`You clicked on \${row.original.cat}\`);
      }}
    />
    );
}
`;
