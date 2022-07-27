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
    DataGridFiltersState,
    DataGridPaginationState,
    DataGridSortingState,
    dateFilterFn,
    highlightFilterValue,
    numberFilterFn,
    stringFilterFn,
} from '../../src';
import { Data, demoData } from '../demoData';

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
        noEllipsis: false,
        withGlobalFilter: true,
        withPagination: true,
        withColumnFilters: true,
        withSorting: true,
        striped: true,
        highlightOnHover: true,
        loading: false,
    });

    const onPageChange = (e: DataGridPaginationState) => {
        console.log(`pageIndex: ${e.pageIndex}, pageSize: ${e.pageSize}`);
    };

    const onFilter = (e: DataGridFiltersState) => {
        console.group('filter');
        console.log(e);
        console.groupEnd();
    };
    const onSearch = (e: string) => {
        console.log(`search: ${e}`);
    };
    const onSort = (e: DataGridSortingState) => {
        console.log(
            e.length ? `sorting: ${e[0].id} ${e[0].desc}` : 'no sorting'
        );
    };

    const update = (next: Partial<typeof state>) => {
        setState((last) => ({ ...last, ...next }));
    };

    return (
        <Grid className={classes.gridWrapper}>
            <Grid.Col span={10} p="md">
                <DataGrid<Data>
                    {...state}
                    debug
                    data={
                        state.withPagination
                            ? demoData
                            : demoData.filter((x) => x.id < 25)
                    }
                    initialPageIndex={initialPageIndex}
                    initialPageSize={initialPageSize}
                    onPageChange={onPageChange}
                    headerFixed={true}
                    height={300}
                    onSort={onSort}
                    onFilter={onFilter}
                    onSearch={onSearch}
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
                    <Text color="dimmed">Features</Text>
                    <Switch
                        label="With global filter"
                        checked={state.withGlobalFilter}
                        onChange={(e) =>
                            update({
                                withGlobalFilter: e.target.checked,
                            })
                        }
                    />
                    <Switch
                        label="With column filters"
                        checked={state.withColumnFilters}
                        onChange={(e) =>
                            update({
                                withColumnFilters: e.target.checked,
                            })
                        }
                    />
                    <Switch
                        label="With sorting"
                        checked={state.withSorting}
                        onChange={(e) =>
                            update({
                                withSorting: e.target.checked,
                            })
                        }
                    />
                    <Switch
                        label="With pagination"
                        checked={state.withPagination}
                        onChange={(e) =>
                            update({
                                withPagination: e.target.checked,
                            })
                        }
                    />
                    <Text color="dimmed">Styles</Text>
                    <Switch
                        label="No Text ellipsis"
                        checked={state.noEllipsis}
                        onChange={(e) =>
                            update({
                                noEllipsis: e.target.checked,
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
                    <Switch
                        label="Loading"
                        checked={state.loading}
                        onChange={(e) =>
                            update({
                                loading: e.target.checked,
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
