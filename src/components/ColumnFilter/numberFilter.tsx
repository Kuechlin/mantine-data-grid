import { Select, TextInput } from '@mantine/core';
import { FilterFn } from '@tanstack/react-table';
import { Filter } from 'tabler-icons-react';
import { DataTableFilterProps, DataTableFitler } from '../types';

export enum NumberFilter {
    Equals = 'eq',
    NotEquals = 'neq',
    GreaterThan = 'gt',
    GreaterThanOrEquals = 'gte',
    LowerThan = 'lt',
    LowerThanOrEquals = 'lte',
}

const numberFilterFn: FilterFn<any> = (row, columnId, filter) => {
    const rowValue = Number(row.getValue(columnId));
    const op = filter.op || NumberFilter.Equals;
    const filterValue = Number(filter.value);
    switch (op) {
        case NumberFilter.Equals:
            return rowValue === filterValue;
        case NumberFilter.NotEquals:
            return rowValue !== filterValue;
        case NumberFilter.GreaterThan:
            return rowValue > filterValue;
        case NumberFilter.GreaterThanOrEquals:
            return rowValue >= filterValue;
        case NumberFilter.LowerThan:
            return rowValue < filterValue;
        case NumberFilter.LowerThanOrEquals:
            return rowValue <= filterValue;
        default:
            return true;
    }
};
numberFilterFn.autoRemove = (val) => !val;

function NumberFilterElement<T>({
    filter,
    onFilterChange,
}: DataTableFilterProps<{ op: string; value: string }>) {
    const handleValueChange = (value: any) =>
        onFilterChange({ ...filter, value });

    const handleOperatorChange = (op: string) =>
        onFilterChange({ ...filter, op });

    return (
        <>
            <Select
                data={Object.entries(NumberFilter).map(([label, value]) => ({
                    value,
                    label,
                }))}
                value={filter.op || NumberFilter.Equals}
                onChange={handleOperatorChange}
            />

            <TextInput
                value={filter.value}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="Filter value"
                rightSection={<Filter />}
            />
        </>
    );
}

export const numberFilter: DataTableFitler<any> = {
    init: () => ({
        op: NumberFilter.GreaterThan,
        value: 0,
    }),
    filterFn: numberFilterFn,
    element: NumberFilterElement,
};
