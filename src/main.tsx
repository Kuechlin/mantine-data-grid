import {
    Anchor,
    Button,
    Center,
    Group,
    MantineProvider,
    Stack,
    Title,
} from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { dateColumn, numberColumn, stringColumn } from './components/columns';
import DataGrid from './components/DataGrid';
import { faker } from '@faker-js/faker';
import { BrandGithub } from 'tabler-icons-react';
import { createTable } from '@tanstack/react-table';
import DataTable from './components/DataTable';

type Data = {
    text: string;
    cat: string;
    fish: string;
    city: string;
    value: number;
    date: Date;
};

var data: Data[] = new Array(10000).fill({}).map((i) => ({
    text: faker.name.findName(),
    cat: faker.animal.cat(),
    fish: faker.animal.fish(),
    city: faker.address.city(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
}));

const table = createTable().setRowType<Data>();

const columns = [
    table.createDataColumn('text', {
        header: () => 'Text',
    }),
    table.createGroup({
        header: 'Animal',
        columns: [
            table.createDataColumn('cat', {}),
            table.createDataColumn('fish', {}),
        ],
    }),
    table.createDataColumn('city', {}),
    table.createDataColumn('value', {}),
    table.createDataColumn('date', {}),
];

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider
            theme={{ colorScheme: 'dark' }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Stack>
                <Center>
                    <Title>Mantine Data Grid</Title>
                </Center>
                <Center>
                    <Button
                        leftIcon={<BrandGithub />}
                        component="a"
                        href="https://github.com/Kuechlin/mantine-data-grid"
                        target="_blank"
                        color="gray"
                        children="Github"
                    />
                </Center>
                <Group p="xl" position="center">
                    <div style={{ height: '500px', width: '500px' }}>
                        <DataGrid
                            data={data}
                            columns={[
                                stringColumn<Data>({
                                    value: (d) => d.text,
                                    label: 'Full Name ',
                                }),
                                stringColumn<Data>({
                                    value: (d) => d.cat,
                                    label: 'Cat',
                                }),
                                stringColumn<Data>({
                                    value: (d) => d.city,
                                    label: 'City',
                                }),
                                numberColumn<Data>({
                                    value: (d) => d.value,
                                    label: 'Value',
                                }),
                                dateColumn<Data>({
                                    value: (d) => d.date,
                                    label: 'Date',
                                    width: 200,
                                }),
                            ]}
                        />
                    </div>
                    <div style={{ height: '500px', width: '500px' }}>
                        <DataTable
                            table={table}
                            columns={columns}
                            data={data}
                        />
                    </div>
                </Group>
            </Stack>
        </MantineProvider>
    </React.StrictMode>
);
