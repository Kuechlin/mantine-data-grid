import { ActionIcon, Button, Group, Popover, Stack } from '@mantine/core';
import { Column, FilterFn, TableGenerics } from '@tanstack/react-table';
import { ComponentType, useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';
import { DataGridGenerics } from '../DataGrid';

export type DataGridFilterFn = FilterFn<any> & {
    element: ComponentType<DataGridFilterProps>;
    init(): any;
};

export type DataGridCustomFilterFns<TGenerics extends TableGenerics> = Record<
    string,
    FilterFn<TGenerics>
>;

export type DataGridFilterProps = {
    filter: any;
    onFilterChange(value: any): void;
};

export interface ColumnFilterProps {
    column: Column<any>;
    className: string;
    filterFns: Record<string, DataGridFilterFn>;
}

export const ColumnFilter = ({
    column,
    className,
    filterFns,
}: ColumnFilterProps) => {
    const [state, setState] = useState(null as null | { value: any });

    const filterFn = column.filterFn.toString();

    if (!(filterFn in filterFns)) return null;

    const { element: Element, init } = filterFns[filterFn];

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
