import { DataGrid } from '../../../src';
import { demoData } from '../../demoData';

export default function StylesExample() {
  return (
    <DataGrid
      data={demoData.slice(0, 2)}
      styles={(theme) => ({
        thead: {
          '::after': {
            backgroundColor: theme.colors.teal[4],
          },
        },
      })}
      columns={[
        {
          accessorKey: 'text',
          header: 'Text',
        },
      ]}
    />
  );
}
