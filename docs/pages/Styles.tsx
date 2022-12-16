import { Stack, Table, Title } from '@mantine/core';
import { See } from '../components/See';

export default function Styles() {
  return (
    <Stack p="md">
      <Title order={2}>Mantine styles API</Title>
      <p>
        Mantine components support styling of individual elements by adding your classes or inline styles to any element
        inside component. <See ex="styles" />
      </p>
      <Title order={3}>DataGrid styles API</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((x, i) => (
            <tr key={i}>
              <td>{x.name}</td>
              <td>{x.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}

const classes = [
  { name: 'wrapper', description: 'table wrapper' },
  { name: 'scrollArea', description: 'scroll area' },
  { name: 'table', description: 'table' },
  { name: 'thead', description: 'table head' },
  { name: 'tbody', description: 'table body' },
  { name: 'tr', description: 'table row' },
  { name: 'th', description: 'table header cell' },
  { name: 'td', description: 'table data cell' },
  { name: 'headerCellContent', description: 'header cell content' },
  { name: 'headerCellButtons', description: 'header cell buttons' },
  { name: 'dataCellContent', description: 'data cell content' },
  { name: 'resizer', description: 'resizer' },
  { name: 'sorter', description: 'sorter' },
  { name: 'filter', description: 'filter' },
  { name: 'globalFilter', description: 'global filter' },
  { name: 'pagination', description: 'pagination' },
  { name: 'pagination_info', description: 'pagination info' },
  { name: 'pagination_size', description: 'pagination size' },
  { name: 'pagination_page', description: 'pagination page' },
];
