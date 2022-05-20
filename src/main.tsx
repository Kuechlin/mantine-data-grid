import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { dateColumn, numberColumn, stringColumn } from './components/columns';
import DataGrid from './components/DataGrid';
import { faker } from '@faker-js/faker';

type Data = {
    text: string;
    value: number;
    date: Date;
};

var data: Data[] = new Array(10000).fill({}).map((i) => ({
    text: faker.name.findName(),
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
            <div style={{ height: '500px', width: '500px' }}>
                <DataGrid
                    data={data}
                    columns={[
                        stringColumn<Data>({
                            value: (d) => d.text,
                            width: 100,
                            label: 'Full Name ',
                        }),
                        numberColumn<Data>({
                            value: (d) => d.value,
                            width: 200,
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
        </MantineProvider>
    </React.StrictMode>
);
