import {
    Anchor,
    Button,
    Center,
    Divider,
    Grid,
    Group,
    MantineProvider,
    Stack,
    Title,
} from '@mantine/core';
import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import { faker } from '@faker-js/faker';
import { BrandGithub } from 'tabler-icons-react';
import { createTable } from '@tanstack/react-table';
import { DataGrid, DataTable } from './components';

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

const table = createTable().setRowType<Data>();

const columns = [
    table.createDataColumn('text', {
        header: () => 'Text that is too long for a Header',
    }),
    table.createGroup({
        header: 'Animal',
        columns: [
            table.createDataColumn('cat', {
                filterFn: 'includesString',
            }),
            table.createDataColumn('fish', {}),
        ],
    }),
    table.createDataColumn('city', {}),
    table.createDataColumn('value', {
        filterFn: 'inNumberRange',
    }),
    table.createDataColumn('date', {}),
];

const cell: CSSProperties = {
    height: '500px',
    //border: '1px solid red',
};

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
                <Grid justify="space-around" p="md">
                    <Grid.Col span={5}>
                        <Title>Data Table</Title>
                        <Divider my="md" />
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Title>Virtualized Data Grid</Title>
                        <Divider my="md" />
                    </Grid.Col>
                    <Grid.Col span={5} style={cell}>
                        <DataTable<Data>
                            table={table}
                            columns={columns}
                            data={data}
                        />
                    </Grid.Col>
                    <Grid.Col span={5} style={cell}>
                        <DataGrid<Data>
                            table={table}
                            columns={columns}
                            data={data}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
        </MantineProvider>
    </React.StrictMode>
);
