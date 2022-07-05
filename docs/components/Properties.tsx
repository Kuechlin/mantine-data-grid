import { Stack, Table, Title, Text } from '@mantine/core';

const Required = () => (
    <Text style={{ display: 'inline' }} color="red" children="*" />
);

export default function Properties() {
    return (
        <Stack p="md">
            <Title order={2} style={{ display: 'flex' }}>
                {'DataGrid<'}
                <Text
                    inherit
                    inline
                    color="orange"
                    children="T extends object = any"
                />
                {'> component props'}
            </Title>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            columns
                            <Required />
                        </td>
                        <td>
                            <Text
                                color="orange"
                                children="(table: Table) => ColumnDef[]"
                            />
                        </td>
                        <td>DataGrid column factory</td>
                    </tr>
                    <tr>
                        <td>
                            data
                            <Required />
                        </td>
                        <td>
                            <Text color="orange" children="Array<T>" />
                        </td>
                        <td>Grid data</td>
                    </tr>
                    <tr>
                        <td>filterFns</td>
                        <td>
                            <Text
                                color="orange"
                                children="Record<string, DataGridFilterFn>"
                            />
                        </td>
                        <td>Custom filter functions</td>
                    </tr>
                    <tr>
                        <td>withGlobalFilter</td>
                        <td>
                            <Text color="orange" children="boolean" />
                        </td>
                        <td>Show global filter</td>
                    </tr>
                    <tr>
                        <td>noEllipsis</td>
                        <td>
                            <Text color="orange" children="boolean" />
                        </td>
                        <td>Disable text ellipsis</td>
                    </tr>
                    <tr>
                        <td>spacing</td>
                        <td>
                            <Text
                                color="orange"
                                children='number | "xs" | "sm" | "md" | "lg" | "xl"'
                            />
                        </td>
                        <td>Space between elements</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    );
}
