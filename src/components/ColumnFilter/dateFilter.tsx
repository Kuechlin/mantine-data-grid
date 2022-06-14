import { Select, TextInput } from '@mantine/core';
import { FilterFn } from '@tanstack/react-table';
import { Filter } from 'tabler-icons-react';
import { DataTableFilterProps, DataTableFitler } from '../types';

export enum DateFilter {
    Equals = 'eq',
    NotEquals = 'neq',
    GreaterThan = 'gt',
    GreaterThanOrEquals = 'gte',
    LowerThan = 'lt',
    LowerThanOrEquals = 'lte',
}

const dateFilterFn: FilterFn<any> = (row, columnId, filter) => {
    const rowValue = new Date(row.getValue(columnId));
    const op = filter.op || DateFilter.Equals;
    const filterValue = new Date(filter.value);
    switch (op) {
        case DateFilter.Equals:
            return rowValue === filterValue;
        case DateFilter.NotEquals:
            return rowValue !== filterValue;
        case DateFilter.GreaterThan:
            return rowValue > filterValue;
        case DateFilter.GreaterThanOrEquals:
            return rowValue >= filterValue;
        case DateFilter.LowerThan:
            return rowValue < filterValue;
        case DateFilter.LowerThanOrEquals:
            return rowValue <= filterValue;
        default:
            return true;
    }
};
dateFilterFn.autoRemove = (val) => !val;

function DateFilterElement<T>({
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
                data={Object.entries(DateFilter).map(([label, value]) => ({
                    value,
                    label,
                }))}
                value={filter.op || DateFilter.Equals}
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

export const dateFilter: DataTableFitler<any> = {
    init: () => ({
        op: DateFilter.GreaterThan,
        value: '',
    }),
    filterFn: dateFilterFn,
    element: DateFilterElement,
};
