import {
    Button,
    Group,
    Popover,
    Select,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { Column, FilterFn, TableInstance } from '@tanstack/react-table';
import { useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';

export const ColumnFilter = ({
    column,
    instance,
}: {
    column: Column<any>;
    instance: TableInstance<any>;
}) => {
    const [state, setState] = useState({
        opened: false,
        value: null as any,
    });

    const firstValue = instance
        ?.getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const open = () =>
        setState({
            opened: true,
            value: column.getFilterValue() || {
                op: StringFilter.Includes,
                value: '',
            },
        });

    const close = () =>
        setState({
            opened: false,
            value: {},
        });

    const valueChange = (value: any) =>
        setState((state) => ({ ...state, value: { ...state.value, value } }));

    const operatorChange = (op: string) =>
        setState((state) => ({ ...state, value: { ...state.value, op } }));

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        column.setFilterValue(state.value);
        close();
    };

    const filterFn = column.filterFn.toString();

    const isFiltered = column.getIsFiltered();

    return (
        <Popover
            opened={state.opened}
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
            <Stack>
                <Select
                    data={Object.entries(StringFilter).map(
                        ([label, value]) => ({
                            value,
                            label,
                        })
                    )}
                    value={state.value?.op || StringFilter.Includes}
                    onChange={operatorChange}
                />

                <TextInput
                    value={state.value?.value}
                    onChange={(e) => valueChange(e.target.value)}
                    placeholder="Filter value"
                    rightSection={<Filter />}
                />

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
        </Popover>
    );
};

export enum StringFilter {
    Includes = 'in',
    NotIncludes = 'nin',
    Equals = 'eq',
    NotEquals = 'neq',
    StartsWith = 'start',
    EndsWith = 'end',
}
export const stringFilterFn: FilterFn<any> = (row, columnId, filter) => {
    const rowValue = String(row.getValue(columnId)).toLowerCase();
    const op = filter.op || StringFilter.Includes;
    const filterValue = String(filter.value).toLowerCase();
    switch (op) {
        case StringFilter.Includes:
            return rowValue.includes(filterValue);
        case StringFilter.NotIncludes:
            return !rowValue.includes(filterValue);
        case StringFilter.Equals:
            return rowValue === filterValue;
        case StringFilter.NotEquals:
            return rowValue !== filterValue;
        case StringFilter.StartsWith:
            return rowValue.startsWith(filterValue);
        case StringFilter.EndsWith:
            return rowValue.endsWith(filterValue);
        default:
            return true;
    }
};
stringFilterFn.autoRemove = (val) => !val;

export const canFilter = (filterFn: any) => {
    return filterFn === 'stringFilterFn';
};
