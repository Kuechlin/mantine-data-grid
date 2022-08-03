import { DataGrid } from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { Data } from '../../demoData';

export default function EmptyExample() {
  return (
    <CodeDemo code={grid_usage}>
      <DataGrid<Data>
        data={[]}
        columns={[
          {
            accessorKey: 'text',
            header: 'Text that is too long for a Header',
            size: 300,
          },
        ]}
        empty={<h1>Custom empty element</h1>}
      />
    </CodeDemo>
  );
}
const grid_usage = `
import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
      <DataGrid<Data>
        data={[]}
        columns={[
          {
            accessorKey: 'text',
            header: 'Text that is too long for a Header',
            size: 300,
          },
        ]}
        empty={<h1>Custom empty element</h1>}
      />
    );
}
`;
