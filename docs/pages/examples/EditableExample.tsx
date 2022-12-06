import { TextInput } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { booleanFilterFn, DataGrid, dateFilterFn, numberFilterFn, stringFilterFn } from '../../../src';
import { Data, demoData } from '../../demoData';

export default function EditableExample() {
  const [data, setData] = useState(demoData.slice(0, 25));

  const handleChange = useCallback(
    (index: number, key: keyof Data, value: string) => {
      setData((state) => {
        const next = [...state];
        next[index] = {
          ...state[index],
          [key]: value,
        };
        return next;
      });
    },
    [setData]
  );

  return (
    <DataGrid
      data={data}
      striped
      highlightOnHover
      withGlobalFilter
      withPagination
      withColumnFilters
      withSorting
      withColumnResizing
      columns={[
        {
          accessorKey: 'text',
          header: 'Text that is too long for a Header',
          filterFn: stringFilterFn,
          size: 300,
          cell: (cell) => <CellInput {...cell} onChange={handleChange} />,
        },
        {
          header: 'Animal',
          columns: [
            { accessorKey: 'cat', filterFn: stringFilterFn },
            {
              accessorKey: 'fish',
              filterFn: stringFilterFn,
            },
          ],
        },
        {
          accessorKey: 'city',
          filterFn: stringFilterFn,
        },
        { accessorKey: 'value', filterFn: numberFilterFn },
        {
          accessorKey: 'date',
          cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
          filterFn: dateFilterFn,
        },
        {
          accessorKey: 'bool',
          filterFn: booleanFilterFn,
        },
      ]}
    />
  );
}

// https://tanstack.com/table/v8/docs/examples/react/editable-data
function CellInput<T>({
  getValue,
  onChange,
  row: { index },
  column: { id },
}: CellContext<T, unknown> & { onChange(rowIndex: number, columnId: string, value: unknown): void }) {
  const initialValue = getValue<string>();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const hanldeBlur = () => {
    onChange(index, id, value);
  };

  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} onBlur={hanldeBlur} />;
}
