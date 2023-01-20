import { Button } from '@mantine/core';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { DataGrid, numberFilterFn, stringFilterFn } from '../../../src';
import { demoData } from '../../demoData';

export default function SingleRowSelectionExample() {
  const [data, setData] = useState(demoData);
  const [selected, setSelected] = useState<RowSelectionState>({});

  const removeSelected = () => {
    const next = data.filter((_, i) => !selected[i]);
    setSelected({});
    setData(next);
  };

  return (
    <>
      <Button onClick={removeSelected}>Remove Selected</Button>
      <DataGrid
        data={data}
        striped
        highlightOnHover
        height={500}
        withSorting
        withColumnResizing
        withFixedHeader
        withRowSelection
        options={{
          enableMultiRowSelection: false,
        }}
        state={{
          rowSelection: selected,
        }}
        onRowSelectionChange={setSelected}
        columns={[
          { accessorKey: 'city', filterFn: stringFilterFn },
          { accessorKey: 'value', filterFn: numberFilterFn },
        ]}
      />
    </>
  );
}
