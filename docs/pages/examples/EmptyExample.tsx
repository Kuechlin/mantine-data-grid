import { DataGrid } from '../../../src';
import { Data } from '../../demoData';

export default function EmptyExample() {
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
