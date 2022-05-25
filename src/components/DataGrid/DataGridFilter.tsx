import { Button, Popover, Text } from '@mantine/core';
import { BuiltInFilterFn, Column } from '@tanstack/react-table';
import React from 'react';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterComponent } from './DataGrid';
import {
    EqualsStringFilter,
    IncludesStringFilter,
    IncludesStringSensitiveFilter,
} from './filtres';

const defaultFilters: Record<string, DataGridFilterComponent> = {
    auto: EqualsStringFilter,
    includesString: IncludesStringFilter,
    includesStringSensitive: IncludesStringSensitiveFilter,
    equalsString: EqualsStringFilter,
    arrIncludes: () => <div />,
    arrIncludesAll: () => <div />,
    arrIncludesSome: () => <div />,
    equals: () => <div />,
    weakEquals: () => <div />,
    inNumberRange: () => <div />,
};

export const DataGridFilter = ({
    column,
    onClick,
    onClose,
    opened,
}: {
    column: Column<any>;
    onClick(): void;
    onClose(): void;
    opened: boolean;
}) => {
    const renderEmpty = () => <Text>filter not found</Text>;

    const Element = defaultFilters[column.filterFn.toString()] || renderEmpty;

    return (
        <Popover
            opened={opened}
            position="bottom"
            placement="center"
            withArrow
            withCloseButton
            transition="pop-top-right"
            onClose={onClose}
            target={
                <Button
                    children={<Filter size={16} />}
                    variant="subtle"
                    compact
                    size="xs"
                    px={0}
                    color="gray"
                    onClick={onClick}
                />
            }
            onClick={(e) => e.stopPropagation()}
        >
            <Element
                value={column.getFilterValue()}
                onChange={(val) => {
                    column.setFilterValue(val);
                    onClose();
                }}
            />
        </Popover>
    );
};
