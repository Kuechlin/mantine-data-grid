import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Check, Search, X } from 'tabler-icons-react';
import { DataGridFilterProps, DataGridFilterComponent } from './DataGrid';

const DataGridFitlerWrapper = ({
    element: Element,
    onChange,
    value: filterValue,
}: DataGridFilterProps & {
    element: DataGridFilterComponent;
}) => {
    const [value, setValue] = useState(filterValue || '');
    useEffect(() => {
        setValue(filterValue);
    }, [filterValue]);

    return (
        <Stack>
            <Text weight="bold">Includes</Text>
            <Element value={value} onChange={(e) => setValue(e.target.value)} />
            <Group position="apart">
                <Button
                    children={<X />}
                    color="gray"
                    onClick={() => onChange('')}
                    compact
                />
                <Button
                    children={<Check />}
                    onClick={() => onChange(value)}
                    compact
                    variant="outline"
                />
            </Group>
        </Stack>
    );
};

const StringFilterInput: DataGridFilterComponent = ({ value, onChange }) => (
    <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search value"
        rightSection={<Search />}
    />
);

export const IncludesStringFilter: DataGridFilterComponent = (props) => (
    <DataGridFitlerWrapper {...props} element={StringFilterInput} />
);

export const IncludesStringSensitiveFilter: DataGridFilterComponent = (
    props
) => <DataGridFitlerWrapper {...props} element={StringFilterInput} />;

export const EqualsStringFilter: DataGridFilterComponent = (props) => (
    <DataGridFitlerWrapper {...props} element={StringFilterInput} />
);

/*
todo:
arrIncludes;
arrIncludesAll;
arrIncludesSome;
equals;
weakEquals;
inNumberRange;
*/
