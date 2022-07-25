import { TextInput } from '@mantine/core';
import { Table } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { Search } from 'tabler-icons-react';

type GlobalFilterProps = {
    table: Table<any>;
    globalFilter: string;
    className?: string;
};

export function GlobalFilter({
    globalFilter,
    table,
    className,
}: GlobalFilterProps) {
    const [value, setValue] = useState(globalFilter);

    useEffect(() => {
        setValue(globalFilter);
    }, [globalFilter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            table.setGlobalFilter(value);
        }, 200);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
            rightSection={<Search />}
            className={className}
        />
    );
}
