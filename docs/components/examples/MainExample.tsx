import {
    booleanFilterFn,
    DataGrid,
    dateFilterFn,
    highlightFilterValue,
    numberFilterFn,
    stringFilterFn,
} from '../../../src';
import CodeDemo from '../CodeDemo';
import { demoData } from '../../demoData';

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

export default function MainExample() {
    return (
        <CodeDemo code={grid_usage}>
            <DataGrid
                data={demoData}
                striped
                highlightOnHover
                withGlobalFilter
                withPagination
                withColumnFilters
                withSorting
                columns={[
                    {
                        accessorKey: 'text',
                        header: 'Text that is too long for a Header',
                        filterFn: stringFilterFn,
                        size: 300,
                        cell: highlightFilterValue,
                    },
                    {
                        header: 'Animal',
                        columns: [
                            { accessorKey: 'cat', filterFn: stringFilterFn },
                            {
                                accessorKey: 'fish',
                                filterFn: stringFilterFn,
                            },
                        ],
                    },
                    {
                        accessorKey: 'city',
                        filterFn: stringFilterFn,
                    },
                    { accessorKey: 'value', filterFn: numberFilterFn },
                    {
                        accessorKey: 'date',
                        cell: (cell) => cell.getValue()?.toLocaleDateString(),
                        filterFn: dateFilterFn,
                    },
                    {
                        accessorKey: 'bool',
                        filterFn: booleanFilterFn,
                    },
                ]}
            />
        </CodeDemo>
    );
}
const grid_usage = `
import { 
    DataGrid,
    booleanFilterFn,
    dateFilterFn,
    highlightFilterValue,
    numberFilterFn,
    stringFilterFn,
} from 'mantine-data-grid';

function Demo() {
    return (
        <DataGrid
            data={data}
            striped
            highlightOnHover
            withGlobalFilter
            withPagination
            withColumnFilters
            withSorting
            columns={[
                {
                    accessorKey: 'text',
                    header: 'Text that is too long for a Header',
                    filterFn: stringFilterFn,
                    size: 300,
                    cell: highlightFilterValue,
                },
                {
                    header: 'Animal',
                    columns: [
                        { accessorKey: 'cat', filterFn: stringFilterFn },
                        {
                            accessorKey: 'fish',
                            filterFn: stringFilterFn,
                        },
                    ],
                },
                {
                    accessorKey: 'city',
                    filterFn: stringFilterFn,
                },
                { accessorKey: 'value', filterFn: numberFilterFn },
                {
                    accessorKey: 'date',
                    cell: (cell) =>
                        cell.getValue()?.toLocaleDateString(),
                    filterFn: dateFilterFn,
                },
                {
                    accessorKey: 'bool',
                    filterFn: booleanFilterFn,
                },
            ]}
        />
    );
}
`;