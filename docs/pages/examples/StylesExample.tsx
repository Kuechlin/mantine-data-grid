import { DataGrid } from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { demoData } from '../../demoData';

export default function StylesExample() {
  return (
    <CodeDemo code={override_styles}>
      <DataGrid
        data={demoData.slice(0, 2)}
        styles={(theme) => ({
          header: {
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
    </CodeDemo>
  );
}

const override_styles = `
import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
      <DataGrid
        data={demoData.slice(0, 2)}
        styles={(theme) => ({
          header: {
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
`;
