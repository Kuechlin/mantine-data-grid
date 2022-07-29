import { DataGrid, stringFilterFn } from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { demoData } from '../../demoData';

export default function OnRowClickExample() {
  return (
    <CodeDemo code={grid_usage}>
      <DataGrid
        data={demoData.slice(0, 10)}
        columns={[
          {
            accessorKey: 'cat',
            filterFn: stringFilterFn,
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
          filterFn: stringFilterFn,
        },
      ]}
      onRowClick={(event, row) => {
        alert(\`You clicked on \${row.original.cat}\`);
      }}
    />
    );
}
`;
