import {
    Button,
    Group,
    NumberInput,
    Popover,
    Select,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { BuiltInFilterFn, Column, TableInstance } from '@tanstack/react-table';
import React, { useState } from 'react';
import { Check, Filter, Search, X } from 'tabler-icons-react';
import { DataGridFilterComponent, DataGridInstance } from './DataGrid';

const StringFilterInput: DataGridFilterComponent<string> = ({
    value,
    onChange,
}) => (
    <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search value"
        rightSection={<Search />}
    />
);
const NumberRangeFilter: DataGridFilterComponent<
    [number | undefined, number | undefined]
> = ({ value = [undefined, undefined], onChange }) => (
    <Group grow spacing="xs">
        <NumberInput
            placeholder="Min"
            value={value[0]}
            onChange={(e: number) => onChange([e, value[1]])}
            hideControls
        />
        <NumberInput
            placeholder="Max"
            value={value[1]}
            onChange={(e: number) => onChange([value[0], e])}
        />
    </Group>
);

const defaultFilters: Record<string, DataGridFilterComponent> = {
    auto: StringFilterInput,
    includesString: StringFilterInput,
    includesStringSensitive: StringFilterInput,
    equalsString: StringFilterInput,
    arrIncludes: StringFilterInput,
    arrIncludesAll: StringFilterInput,
    arrIncludesSome: StringFilterInput,
    equals: StringFilterInput,
    weakEquals: StringFilterInput,
    inNumberRange: NumberRangeFilter,
};

export const DataGridFilter = ({ column }: { column: Column<any> }) => {
    const [state, setState] = useState({
        opened: false,
        value: null as any,
    });

    const open = () =>
        setState({
            opened: true,
            value: column.getFilterValue(),
        });

    const close = () =>
        setState({
            opened: false,
            value: null,
        });

    const change = (value: any) => setState((state) => ({ ...state, value }));

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        column.setFilterValue(state.value);
        close();
    };

    const renderEmpty = () => <Text>filter not found</Text>;

    const filterFn = column.filterFn.toString();

    const isFiltered = column.getIsFiltered();

    const Element = defaultFilters[filterFn] || renderEmpty;

    return (
        <Popover
            opened={state.opened}
            position="bottom"
            placement="center"
            withArrow
            withCloseButton
            transition="pop-top-right"
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
                <Text>{filterFn}</Text>
                <Element value={column.getFilterValue()} onChange={change} />
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

/*
todo:
arrIncludes;
arrIncludesAll;
arrIncludesSome;
equals;
weakEquals;
inNumberRange;
*/
