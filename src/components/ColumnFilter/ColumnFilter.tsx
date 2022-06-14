import { Button, Group, Popover, Stack } from '@mantine/core';
import { Column, TableInstance } from '@tanstack/react-table';
import { useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';
import { dataGridfilterFns } from '.';

type ColumnFilterProps = {
    column: Column<any>;
    instance: TableInstance<any>;
};

export const ColumnFilter = ({ column, instance }: ColumnFilterProps) => {
    const [state, setState] = useState(null as null | { value: any });

    const filterFn =
        column.filterFn.toString() as keyof typeof dataGridfilterFns;
    if (!dataGridfilterFns[filterFn]) return null;

    const { element: Element, init } = dataGridfilterFns[filterFn];

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

    const isFiltered = column.getIsFiltered();

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
                <Button
                    children={<Filter size={16} />}
                    variant={isFiltered ? 'gradient' : 'subtle'}
                    compact
                    size="xs"
                    px={0}
                    color="gray"
                    gradient={
                        isFiltered ? { from: 'teal', to: 'lime' } : undefined
                    }
                    onClick={open}
                />
            }
            onClick={(e) => e.stopPropagation()}
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
