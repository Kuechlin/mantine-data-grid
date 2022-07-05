import { Code, Stack, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';

export default function Docs() {
    return (
        <Stack p="md">
            <Title order={2}>Install</Title>
            <Text>With npm</Text>
            <Prism
                language="bash"
                children="npm i mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs"
            />
            <Text>With pnpm</Text>
            <Prism
                language="bash"
                children="pnpm add mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs"
            />
            <Title order={2}>Usage</Title>
            <Text>Table data for all examples</Text>
            <Prism withLineNumbers language="tsx" children={table_data} />
            <Text>Default DataGrid</Text>
            <Prism withLineNumbers language="tsx" children={grid_usage} />
            <Title order={2}>Custom Filter</Title>
            <Prism withLineNumbers language="tsx" children={custom_filter} />
        </Stack>
    );
}

const table_data = `
type Data = {
    text: string;
    cat: string;
    fish: string;
    city: string;
    value: number;
    date: Date;
};

var data: Data[] = new Array(100).fill({}).map((i) => ({
    text: faker.lorem.lines(),
    cat: faker.animal.cat(),
    fish: faker.animal.fish(),
    city: faker.address.city(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
}));
`;

const grid_usage = `
import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            size="md"
            withGlobalFilter
            columns={(table) => [
                table.createDataColumn('text', {
                    header: () => 'Text that is too long for a Header',
                    filterFn: 'stringFilterFn',
                }),
                table.createGroup({
                    header: 'Animal',
                    columns: [
                        table.createDataColumn('cat', {
                            filterFn: 'stringFilterFn',
                        }),
                        table.createDataColumn('fish', {
                            filterFn: 'stringFilterFn',
                        }),
                    ],
                }),
                table.createDataColumn('city', {
                    filterFn: 'stringFilterFn',
                }),
                table.createDataColumn('value', {
                    filterFn: 'numberFilterFn',
                }),
                table.createDataColumn('date', {
                    cell: ({ cell }) =>
                        cell.getValue().toLocaleDateString(),
                    filterFn: 'dateFilterFn',
                }),
            ]}
        />
    );
}
`;

const custom_filter = `
import { DataGrid, DataGridFilterFn } from 'mantine-data-grid';

// custom filter function
const catFilter: DataGridFilterFn = (row, columnId, filter) => {
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

// data grid
function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            filterFns={{
                catFilter,
            }}
            columns={(table) => [
                table.createDataColumn('cat', {
                    filterFn: 'catFilter',
                })
            ]}
        />
    );
}
`;
