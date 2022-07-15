import faker from '@faker-js/faker';
import {
    Box,
    Divider,
    MultiSelect,
    Paper,
    Slider,
    Space,
    Stack,
    Switch,
    Text,
    Title,
} from '@mantine/core';
import { useHash } from '@mantine/hooks';
import { useState } from 'react';
import { useQuery } from 'react-query'

import { DataGrid, DataGridFilterFn, PaginationArg } from '../../src';
import { fetchDataFaker } from './fetchDataFaker'
import { PaginationState } from '@tanstack/react-table';

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

export default function Demo() {
    const [state, setState] = useState({
        spacing: 'sm',
        ellipsis: false,
        withGlobalFilter: true,
        pagination: {
            pageIndex: 0,
            pageSize: 10,
        }
    });

    const fetchDataOptions = {
        pageIndex: state.pagination.pageIndex,
        pageSize: state.pagination.pageSize,
    };

    const onPageChange = (e: PaginationArg) => {
        console.log(`[onPageChange] -> pageIndex: ${e.pageIndex}, pageSize: ${e.pageSize}, pageCount: ${e.pageCount}`);

        setState((last) => ({ ...last, pagination: {
            pageIndex: e.pageIndex,
            pageSize: e.pageSize,
        } }));
    }

    const dataQuery = useQuery(
        ['data', fetchDataOptions],
        () => fetchDataFaker(fetchDataOptions),
        { keepPreviousData: true }
    );

    const update = (next: Partial<typeof state>) =>
        setState((last) => ({ ...last, ...next }));

    return (
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <Box p="md" style={{ flexGrow: 1 }}>
                <DataGrid
                    data={dataQuery.data?.rows ?? []}
                    pagination={{...state.pagination, pageCount: dataQuery.data?.pageCount ?? -1}}
                    onPageChange={onPageChange}
                    columns={[
                        {
                            accessorKey: 'text',
                            header: 'Text that is too long for a Header',
                            filterFn: 'stringFilterFn',
                            minSize: 300,
                        },
                        {
                            header: 'Animal',
                            columns: [
                                { accessorKey: 'cat', filterFn: catFilter },
                                {
                                    accessorKey: 'fish',
                                    filterFn: 'stringFilterFn',
                                },
                            ],
                        },
                        {
                            accessorKey: 'city',
                            filterFn: 'stringFilterFn',
                        },
                        { accessorKey: 'value', filterFn: 'numberFilterFn' },
                        {
                            accessorKey: 'date',
                            cell: (cell) =>
                                cell.getValue()?.toLocaleDateString(),
                            filterFn: 'dateFilterFn',
                        },
                    ]}
                    spacing={state.spacing as any}
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
                        <Text weight="bold">Spacing</Text>
                        <Slider
                            step={25}
                            label={(value) => sizeMap.get(value)}
                            marks={[...sizeMap.entries()]
                                .filter((x) => typeof x[0] === 'number')
                                .map(([value, label]) => ({
                                    value: +value,
                                    label,
                                }))}
                            value={+(sizeMap.get(state.spacing) || 0)}
                            onChange={(e) =>
                                update({
                                    spacing: sizeMap.get(e)?.toString(),
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
    );
}
