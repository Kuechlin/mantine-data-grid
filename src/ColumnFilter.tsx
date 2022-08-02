import { ActionIcon, Button, Group, Menu, Stack } from '@mantine/core';
import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import { Check, Filter, X } from 'tabler-icons-react';
import { isDataGridFilter } from './types';

export interface ColumnFilterProps {
  column: Column<any, any>;
  className: string;
  color: string;
}

export const ColumnFilter = ({ column, className, color }: ColumnFilterProps) => {
  const [state, setState] = useState(null as null | { value: any });

  const filterFn = column.columnDef.filterFn;

  if (!isDataGridFilter(filterFn)) return null;

  const { element: Element, init } = filterFn;

  const open = () =>
    setState({
      value: column.getFilterValue() || init(),
    });

  const close = () => setState(null);

  const change = (value: any) => setState({ value });

  const clear = () => {
    column.setFilterValue(undefined);
    close();
  };

  const save = () => {
    if (!state) return;
    column.setFilterValue(state.value);
    close();
  };

  return (
    <Menu
      opened={!!state}
      position="bottom"
      withArrow
      transition="scale-y"
      shadow="xl"
      onClose={close}
      closeOnClickOutside={false}
      width="256px"
    >
      <Menu.Target>
        <ActionIcon
          size="xs"
          children={<Filter size={16} />}
          onClick={open}
          className={className}
          variant={column.getIsFiltered() ? 'light' : 'transparent'}
          color={column.getIsFiltered() ? color : 'gray'}
        />
      </Menu.Target>
      <Menu.Dropdown>
        {!!state && (
          <Stack p="xs">
            <Element filter={state.value} onFilterChange={change} />

            <Group position="apart">
              <Button children={<X />} color="gray" onClick={clear} compact />
              <Button children={<Check />} onClick={save} compact variant="outline" />
            </Group>
          </Stack>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
