import { DataGrid } from '../../../src';
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
          },
          {
            accessorKey: 'fish',
          },
          {
            accessorKey: 'city',
          },
        ]}
        onRow={(row) => ({
          onDoubleClick: () => alert(`You clicked on row ${row.index}`),
        })}
        onCell={(cell) =>
          cell.column.id === 'fish'
            ? {
                onClick: () => alert(`You clicked on cell ${cell.getValue()}`),
              }
            : {}
        }
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
          },
          {
            accessorKey: 'fish',
          },
          {
            accessorKey: 'city',
          },
        ]}
        onRow={(row) => ({
          onDoubleClick: () => alert(\`You clicked on row \${row.index}\`),
        })}
        onCell={(cell) =>
          cell.column.id === 'fish'
            ? {
                onClick: () => alert(\`You clicked on cell \${cell.getValue()}\`),
              }
            : {}
        }
      />
    );
}
`;
