import { Radio, RadioGroup } from '@mantine/core';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

export enum BooleanFilter {
    Equals = 'eq',
}

export const booleanFilterFn: DataGridFilterFn<any> = (
    row,
    columnId,
    filter
) => {
    const rowValue = Boolean(row.getValue(columnId));
    const op = filter.op || BooleanFilter.Equals;
    const filterValue = Boolean(filter.value);
    switch (op) {
        case BooleanFilter.Equals:
            return rowValue === filterValue;
        default:
            return true;
    }
};
booleanFilterFn.autoRemove = (val) => !val;

booleanFilterFn.init = () => ({
    op: BooleanFilter.Equals,
    value: true,
});

booleanFilterFn.element = function ({
    filter,
    onFilterChange,
}: DataGridFilterProps) {
    const handleValueChange = (value: any) =>
        onFilterChange({ ...filter, value: value === 'true' ? true : false });

    return (
        <>
            <RadioGroup
                value={filter.value ? 'true' : 'false'}
                onChange={handleValueChange}
            >
                <Radio value="true" label="true" />
                <Radio value="false" label="false" />
            </RadioGroup>
        </>
    );
};
