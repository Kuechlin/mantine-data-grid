import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FilterFn, Table } from '@tanstack/react-table';
import { isValidElement, useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { DataGridLocale } from './types';

type GlobalFilterProps<TData> = {
  table: Table<TData>;
  className: string;
  locale?: DataGridLocale;
};

export function GlobalFilter<TData>({ table, className, locale }: GlobalFilterProps<TData>) {
  const globalFilter = table.getState().globalFilter;
  const [value, setValue] = useState(globalFilter || '');

  useEffect(() => {
    setValue(globalFilter || '');
  }, [globalFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(value);
    }, 200);

    return () => clearTimeout(timeout);
  }, [table, value]);

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={locale?.globalSearch || 'Search...'}
      rightSection={<IconSearch />}
      className={className}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalFilterFn: FilterFn<any> = (row, columnId: string, filterValue: string) => {
  const value = row.getValue<string>(columnId);
  if (!value) return false;

  // if is a react element, then render it to string, so it can be searched
  if (isValidElement(value)) {
    const htmlString = renderToString(value);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return (doc.body.textContent || doc.body.innerText).toLowerCase().includes(filterValue.toLowerCase());
  }

  return value.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
};
