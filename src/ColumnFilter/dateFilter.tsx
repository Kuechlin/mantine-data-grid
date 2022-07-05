import { Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FilterFn } from '@tanstack/react-table';
import { Filter } from 'tabler-icons-react';
import { DataGridFilterFn, DataGridFilterProps } from './ColumnFilter';

export enum DateFilter {
    Equals = 'eq',
    NotEquals = 'neq',
    GreaterThan = 'gt',
    GreaterThanOrEquals = 'gte',
    LowerThan = 'lt',
    LowerThanOrEquals = 'lte',
}

export const dateFilterFn: DataGridFilterFn<any> = (row, columnId, filter) => {
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

dateFilterFn.init = () => ({
    op: DateFilter.GreaterThan,
    value: '',
});

dateFilterFn.element = function ({
    filter,
    onFilterChange,
}: DataGridFilterProps) {
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

            <DatePicker
                value={filter.value ? new Date(filter.value) : null}
                onChange={(e) => handleValueChange(e?.toISOString())}
                placeholder="Filter value"
                rightSection={<Filter />}
            />
        </>
    );
};
