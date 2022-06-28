import {
    Button,
    Card,
    Center,
    Divider,
    Grid,
    Group,
    MantineProvider,
    Stack,
    Title,
    Switch,
    Box,
    Paper,
    Slider,
    Text,
    Space,
    InputWrapper,
} from '@mantine/core';
import React, { CSSProperties, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { faker } from '@faker-js/faker';
import { BrandGithub } from 'tabler-icons-react';
import { DataGrid, DataGridColumnsFactory } from './components';

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

const createColumns: DataGridColumnsFactory<Data> = (table) => [
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

const sizeMap = new Map<string | number, string | number>([
    ['xs', 0],
    ['sm', 25],
    ['md', 50],
    ['lg', 75],
    ['xl', 100],
    [0, 'xs'],
    [25, 'sm'],
    [50, 'md'],
    [75, 'lg'],
    [100, 'xl'],
]);

function Demo() {
    const [state, setState] = useState({
        size: 'sm',
        ellipsis: false,
        withGlobalFilter: true,
    });
    const update = (next: Partial<typeof state>) =>
        setState((last) => ({ ...last, ...next }));

    return (
        <Center p="lg">
            <Stack align="center">
                <Title>Mantine Data Grid</Title>
                <Button
                    leftIcon={<BrandGithub />}
                    component="a"
                    href="https://github.com/Kuechlin/mantine-data-grid"
                    target="_blank"
                    color="gray"
                    children="Github"
                />
                <Paper withBorder>
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <Box p="md">
                            <DataGrid<Data>
                                columns={createColumns}
                                data={data}
                                size={state.size as any}
                                noEllipsis={state.ellipsis}
                                withGlobalFilter={state.withGlobalFilter}
                            />
                        </Box>
                        <div>
                            <Divider orientation="vertical" />
                        </div>
                        <Box p="md">
                            <Stack>
                                <Title order={2}>Properties</Title>
                                <div>
                                    <Text weight="bold">Size</Text>
                                    <Slider
                                        step={25}
                                        label={(value) => sizeMap.get(value)}
                                        marks={[...sizeMap.entries()]
                                            .filter(
                                                (x) => typeof x[0] === 'number'
                                            )
                                            .map(([value, label]) => ({
                                                value: +value,
                                                label,
                                            }))}
                                        value={+(sizeMap.get(state.size) || 0)}
                                        onChange={(e) =>
                                            update({
                                                size: sizeMap
                                                    .get(e)
                                                    ?.toString(),
                                            })
                                        }
                                    />
                                </div>
                                <Space />
                                <Switch
                                    label="No Text ellipsis"
                                    checked={state.ellipsis}
                                    onChange={(e) =>
                                        update({
                                            ellipsis: e.target.checked,
                                        })
                                    }
                                />
                                <Switch
                                    label="With global Filter"
                                    checked={state.withGlobalFilter}
                                    onChange={(e) =>
                                        update({
                                            withGlobalFilter: e.target.checked,
                                        })
                                    }
                                />
                            </Stack>
                        </Box>
                    </div>
                </Paper>
            </Stack>
        </Center>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider
            theme={{ colorScheme: 'dark' }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Demo />
        </MantineProvider>
    </React.StrictMode>
);
