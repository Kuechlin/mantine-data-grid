import { faker } from '@faker-js/faker';
import {
    Badge,
    createStyles,
    Grid,
    MantineSize,
    MultiSelect,
    Slider,
    Space,
    Stack,
    Switch,
    Text,
    Title,
} from '@mantine/core';
import { useState } from 'react';

import {
    booleanFilterFn,
    DataGrid,
    DataGridFilterFn,
    dateFilterFn,
    highlightFilterValue,
    numberFilterFn,
    PaginationArg,
    stringFilterFn,
} from '../../src';

type Data = {
    id: number;
    text: string;
    cat: string;
    fish: string;
    city: string;
    value: number;
    date: Date;
    bool: boolean;
};

function genFakerData(_: any, i: number) {
    return {
        id: i + 1,
        text: faker.lorem.lines(),
        cat: faker.animal.cat(),
        fish: faker.animal.fish(),
        city: faker.address.city(),
        value: faker.datatype.number(),
        date: faker.datatype.datetime(),
        bool: faker.datatype.boolean(),
    };
}

const data: Data[] = new Array(100).fill({}).map(genFakerData);

const dataForPagination: Data[] = new Array(1000).fill({}).map(genFakerData);

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

const catFilter: DataGridFilterFn<any> = (row, columnId, filter) => {
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

const useStyles = createStyles((theme) => ({
    gridWrapper: {
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        marginTop: theme.spacing.lg,
    },
    gridProps: {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.colors.gray[6],
    },
}));

export default function Demo() {
    const { classes } = useStyles();

    const initialPageIndex = 0;
    const initialPageSize = 10;

    const [state, setState] = useState({
        horizontalSpacing: 'xs' as MantineSize,
        verticalSpacing: 'xs' as MantineSize,
        fontSize: 'md' as MantineSize,
        ellipsis: false,
        withGlobalFilter: true,
        usePagination: false,
        striped: true,
        highlightOnHover: true,
    });

    const onPageChange = (e: PaginationArg) => {
        console.log(
            `pageIndex: ${e.pageIndex}, pageSize: ${e.pageSize}, pageCount: ${e.pageCount}`
        );
    };

    const update = (next: Partial<typeof state>) => {
        setState((last) => ({ ...last, ...next }));
    };

    return (
        <Grid className={classes.gridWrapper}>
            <Grid.Col span={10} p="md">
                <DataGrid<Data>
                    debug
                    striped={state.striped}
                    highlightOnHover={state.highlightOnHover}
                    noEllipsis={state.ellipsis}
                    withGlobalFilter={state.withGlobalFilter}
                    horizontalSpacing={state.horizontalSpacing}
                    verticalSpacing={state.verticalSpacing}
                    fontSize={state.fontSize}
                    data={state.usePagination ? dataForPagination : data}
                    withPagination={state.usePagination}
                    pagination={{
                        initialPageIndex,
                        initialPageSize,
                    }}
                    onPageChange={onPageChange}
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'No',
                            size: 60,
                        },
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
                                { accessorKey: 'cat', filterFn: catFilter },
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
                            cell: (cell) => {
                                if (cell.getValue()) {
                                    return <Badge color="teal">true</Badge>;
                                }
                                return <Badge color="red">false</Badge>;
                            },
                            filterFn: booleanFilterFn,
                        },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={2} p="md" className={classes.gridProps}>
                <Stack>
                    <Title order={2}>Properties</Title>

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
                    <Switch
                        label="Show pagination"
                        checked={state.usePagination}
                        onChange={(e) =>
                            update({
                                usePagination: e.target.checked,
                            })
                        }
                    />
                    <Switch
                        label="Striped"
                        checked={state.striped}
                        onChange={(e) =>
                            update({
                                striped: e.target.checked,
                            })
                        }
                    />
                    <Switch
                        label="Highlight on hover"
                        checked={state.highlightOnHover}
                        onChange={(e) =>
                            update({
                                highlightOnHover: e.target.checked,
                            })
                        }
                    />
                    <div>
                        <Text weight="bold">Font Size</Text>
                        <Slider
                            step={25}
                            label={(value) => sizeMap.get(value)}
                            marks={[...sizeMap.entries()]
                                .filter((x) => typeof x[0] === 'number')
                                .map(([value, label]) => ({
                                    value: +value,
                                    label,
                                }))}
                            value={+(sizeMap.get(state.fontSize) || 0)}
                            onChange={(e) =>
                                update({
                                    fontSize: sizeMap
                                        .get(e)
                                        ?.toString() as MantineSize,
                                })
                            }
                        />
                    </div>
                    <Space />
                    <div>
                        <Text weight="bold">Vertical Spacing</Text>
                        <Slider
                            step={25}
                            label={(value) => sizeMap.get(value)}
                            marks={[...sizeMap.entries()]
                                .filter((x) => typeof x[0] === 'number')
                                .map(([value, label]) => ({
                                    value: +value,
                                    label,
                                }))}
                            value={+(sizeMap.get(state.verticalSpacing) || 0)}
                            onChange={(e) =>
                                update({
                                    verticalSpacing: sizeMap
                                        .get(e)
                                        ?.toString() as MantineSize,
                                })
                            }
                        />
                    </div>
                    <Space />
                    <div>
                        <Text weight="bold">Horizontal Spacing</Text>
                        <Slider
                            step={25}
                            label={(value) => sizeMap.get(value)}
                            marks={[...sizeMap.entries()]
                                .filter((x) => typeof x[0] === 'number')
                                .map(([value, label]) => ({
                                    value: +value,
                                    label,
                                }))}
                            value={+(sizeMap.get(state.horizontalSpacing) || 0)}
                            onChange={(e) =>
                                update({
                                    horizontalSpacing: sizeMap
                                        .get(e)
                                        ?.toString() as MantineSize,
                                })
                            }
                        />
                    </div>
                </Stack>
            </Grid.Col>
        </Grid>
    );
}
