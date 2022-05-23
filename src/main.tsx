import {
    Anchor,
    Button,
    Center,
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

type Data = {
    text: string;
    animal: string;
    city: string;
    value: number;
    date: Date;
};

var data: Data[] = new Array(10000).fill({}).map((i) => ({
    text: faker.name.findName(),
    animal: faker.animal.cat(),
    city: faker.address.city(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
}));

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
                <div
                    style={{
                        height: '500px',
                        width: '500px',
                        margin: 'auto',
                    }}
                >
                    <DataGrid
                        data={data}
                        columns={[
                            stringColumn<Data>({
                                value: (d) => d.text,
                                label: 'Full Name ',
                            }),
                            stringColumn<Data>({
                                value: (d) => d.animal,
                                label: 'Animal',
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
            </Stack>
        </MantineProvider>
    </React.StrictMode>
);
