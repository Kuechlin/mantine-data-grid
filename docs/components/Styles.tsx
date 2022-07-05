import { Stack, Table, Title, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';

export default function Styles() {
    return (
        <Stack p="md">
            <Title order={2}>Mantine styles API</Title>
            Mantine components support styling of individual elements by adding
            your classes or inline styles to any element inside component.
            <Prism withLineNumbers language="tsx" children={override_styles} />
            <Title order={2}>DataGrid styles API</Title>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>table</td>
                        <td>table element</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>table header</td>
                    </tr>
                    <tr>
                        <td>body</td>
                        <td>table body</td>
                    </tr>
                    <tr>
                        <td>row</td>
                        <td>table row</td>
                    </tr>
                    <tr>
                        <td>headerCell</td>
                        <td>table header cell</td>
                    </tr>
                    <tr>
                        <td>headerCellActions</td>
                        <td>table header cell actions</td>
                    </tr>
                    <tr>
                        <td>dataCell</td>
                        <td>table data cell</td>
                    </tr>
                    <tr>
                        <td>ellipsis</td>
                        <td>text ellipsis</td>
                    </tr>
                    <tr>
                        <td>resizer</td>
                        <td>resizer handle</td>
                    </tr>
                    <tr>
                        <td>sorter</td>
                        <td>sorter handle</td>
                    </tr>
                    <tr>
                        <td>filter</td>
                        <td>filter handle</td>
                    </tr>
                    <tr>
                        <td>globalFilter</td>
                        <td>global filter</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    );
}

const override_styles = `
import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            styles={(theme) => ({
                header: {
                    borderColor: theme.colors.teal[4],
                },
            })}            
            columns={[
                {
                    accessorKey: 'text'
                    header: 'Text'
                }
            ]}
        />
    );
}
`;
