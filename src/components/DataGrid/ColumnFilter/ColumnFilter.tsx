import { ActionIcon, Button, Group, Popover, Stack } from '@mantine/core';
import { Column, FilterFn } from '@tanstack/react-table';
import { ComponentType, useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';
import { dateFilter } from './dateFilter';
import { numberFilter } from './numberFilter';
import { stringFilter } from './stringFilter';

export const dataGridfilter = {
    stringFilter,
    numberFilter,
    dateFilter,
};
export type DataGridFilterFn = keyof typeof dataGridfilter;
export type DataGridFilterFns = Record<DataGridFilterFn, FilterFn<any>>;
export const dataGridfilterFns: DataGridFilterFns = {
    stringFilter: stringFilter.filterFn,
    numberFilter: numberFilter.filterFn,
    dateFilter: dateFilter.filterFn,
};

export type DataGridFitler<T> = {
    filterFn: FilterFn<any>;
    element: ComponentType<DataGridFilterProps<T>>;
    init(): any;
};

export type DataGridFilterProps<T = any> = {
    filter: T;
    onFilterChange(value: T): void;
};

export interface ColumnFilterProps {
    column: Column<any>;
    className: string;
}

export const ColumnFilter = ({ column, className }: ColumnFilterProps) => {
    const [state, setState] = useState(null as null | { value: any });

    const filterFn = column.filterFn.toString() as DataGridFilterFn;
    if (!dataGridfilterFns[filterFn]) return null;

    const { element: Element, init } = dataGridfilter[filterFn];

    const open = () =>
        setState({
            value: column.getFilterValue() || init(),
        });

    const close = () => setState(null);

    const change = (value: any) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    return (
        <Popover
            opened={!!state}
            position="bottom"
            placement="center"
            withArrow
            withCloseButton
            transition="scale-y"
            shadow="xl"
            onClose={close}
            target={
                <ActionIcon
                    size="xs"
                    children={<Filter size={16} />}
                    onClick={open}
                    className={className}
                    color={column.getIsFiltered() ? 'blue' : 'gray'}
                />
            }
            width="256px"
        >
            {!!state && (
                <Stack>
                    <Element filter={state.value} onFilterChange={change} />

                    <Group position="apart">
                        <Button
                            children={<X />}
                            color="gray"
                            onClick={clear}
                            compact
                        />
                        <Button
                            children={<Check />}
                            onClick={save}
                            compact
                            variant="outline"
                        />
                    </Group>
                </Stack>
            )}
        </Popover>
    );
};
