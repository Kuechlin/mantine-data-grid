import { TextInput } from '@mantine/core';
import { FilterFn, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Search } from 'tabler-icons-react';

type GlobalFilterProps<TData> = {
  table: Table<TData>;
  globalFilter: string;
  className?: string;
};

export function GlobalFilter<TData>({ globalFilter, table, className }: GlobalFilterProps<TData>) {
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

export const globalFilterFn: FilterFn<any> = (row, columnId: string, filterValue: string) => {
  const value = row.getValue<string>(columnId);
  if (!value) return false;
  return value.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
};
