import {
    Anchor,
    Button,
    Center,
    Divider,
    Grid,
    Group,
    MantineProvider,
    ScrollArea,
    Stack,
    Title,
} from '@mantine/core';
import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import { faker } from '@faker-js/faker';
import { BrandGithub } from 'tabler-icons-react';
import { DataGrid, DataTable } from './components';
import { ColumnsFactory } from './components/types';

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

const createColumns: ColumnsFactory<Data> = (table) => [
    table.createDataColumn('text', {
        header: () => 'Text that is too long for a Header',
        filterFn: 'stringFilter',
    }),
    table.createGroup({
        header: 'Animal',
        columns: [
            table.createDataColumn('cat', {
                filterFn: 'stringFilter',
            }),
            table.createDataColumn('fish', {
                filterFn: 'stringFilter',
            }),
        ],
    }),
    table.createDataColumn('city', {
        filterFn: 'stringFilter',
    }),
    table.createDataColumn('value', {
        filterFn: 'numberFilter',
    }),
    table.createDataColumn('date', {
        cell: ({ cell }) => cell.getValue().toLocaleDateString(),
    }),
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
                        <ScrollArea style={{ width: '100%', height: '100%' }}>
                            <DataTable<Data>
                                columns={createColumns}
                                data={data}
                            />
                        </ScrollArea>
                    </Grid.Col>
                    <Grid.Col span={5} style={cell}>
                        <DataGrid<Data> columns={createColumns} data={data} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </MantineProvider>
    </React.StrictMode>
);
