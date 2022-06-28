import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { FilterFn } from '@tanstack/react-table';
import { Filter, X, Check } from 'tabler-icons-react';
import { DataGridFilterProps, DataGridFitler } from './ColumnFilter';

export enum StringFilter {
    Includes = 'in',
    NotIncludes = 'nin',
    Equals = 'eq',
    NotEquals = 'neq',
    StartsWith = 'start',
    EndsWith = 'end',
}

const stringFilterFn: FilterFn<any> = (row, columnId, filter) => {
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

function StringFilterElement<T>({
    filter,
    onFilterChange,
}: DataGridFilterProps<{ op: string; value: string }>) {
    const handleValueChange = (value: any) =>
        onFilterChange({ ...filter, value });

    const handleOperatorChange = (op: string) =>
        onFilterChange({ ...filter, op });

    return (
        <>
            <Select
                data={Object.entries(StringFilter).map(([label, value]) => ({
                    value,
                    label,
                }))}
                value={filter.op || StringFilter.Includes}
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

export const stringFilter: DataGridFitler<any> = {
    init: () => ({
        op: StringFilter.Includes,
        value: '',
    }),
    filterFn: stringFilterFn,
    element: StringFilterElement,
};
