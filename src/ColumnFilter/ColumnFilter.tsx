import { ActionIcon, Button, Group, Popover, Stack } from '@mantine/core';
import { Column, FilterFn, RowData } from '@tanstack/react-table';
import { ComponentType, useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';
import { dataGridfilterFns } from '.';

export type DataGridFilterFn<TData extends RowData> = FilterFn<TData> & {
    element: ComponentType<DataGridFilterProps>;
    init(): any;
};
export function isDataGridFilter(val: any): val is DataGridFilterFn<any> {
    return typeof val === 'function' && 'element' in val && 'init' in val;
}

export type DataGridFilterProps = {
    filter: any;
    onFilterChange(value: any): void;
};

export interface ColumnFilterProps {
    column: Column<any>;
    className: string;
}

export const ColumnFilter = ({ column, className }: ColumnFilterProps) => {
    const [state, setState] = useState(null as null | { value: any });

    const filterFn = column.columnDef.filterFn;

    const filter = isDataGridFilter(filterFn)
        ? filterFn
        : typeof filterFn === 'string' && filterFn in dataGridfilterFns
        ? dataGridfilterFns[filterFn as keyof typeof dataGridfilterFns]
        : null;

    if (filter === null) return null;

    const { element: Element, init } = filter;

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
            closeOnClickOutside={false}
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
