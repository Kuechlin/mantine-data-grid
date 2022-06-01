import { TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Search } from 'tabler-icons-react';

export function GlobalFilter({
    globalFilter,
    onGlobalFilterChange,
}: {
    globalFilter: string;
    onGlobalFilterChange(value: string): void;
}) {
    const [value, setValue] = useState(globalFilter);

    useEffect(() => {
        setValue(globalFilter);
    }, [globalFilter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onGlobalFilterChange(value);
        }, 300);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            rightSection={<Search />}
        />
    );
}
