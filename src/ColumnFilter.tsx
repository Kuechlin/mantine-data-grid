import { ActionIcon, Button, Group, Menu, Stack } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { IconCheck, IconFilter, IconX } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';
import { createElement, useState } from 'react';
import { DataGridFilterFn, isDataGridFilter } from './filters/types';

export interface ColumnFilterProps {
  column: Column<any, unknown>;
  filterFn: DataGridFilterFn<unknown>;
  className: string;
  color: string;
}

export const DefaultColumnFilter = function ColumnFilter({ column, className, color, filterFn }: ColumnFilterProps) {
  const [state, setState] = useSetState({ open: false, value: null as unknown });

  const handleOpen = () =>
    setState({
      open: true,
      value: column.getFilterValue() || filterFn.init(),
    });

  const handleChange = (value: unknown) => setState({ value });

  const handleClose = () => {
    setState({ open: false });
  };

  const handleClear = () => {
    column.setFilterValue(undefined);
    handleClose();
  };

  const handleSave = () => {
    column.setFilterValue(state.value);
    handleClose();
  };

  const { element: Element } = filterFn;

  return (
    <Menu
      opened={state.open}
      position="bottom"
      withArrow
      transitionProps={{
        transition: 'scale-y',
      }}
      shadow="xl"
      onClose={handleClose}
      width="256px"
      withinPortal
    >
      <Menu.Target>
        <ActionIcon
          size="xs"
          children={<IconFilter size={16} />}
          onClick={handleOpen}
          className={className}
          variant={column.getIsFiltered() ? 'light' : 'transparent'}
          color={column.getIsFiltered() ? color : 'gray'}
        />
      </Menu.Target>
      <Menu.Dropdown>
        {!!state && (
          <Stack p="xs">
            <Element filter={state.value} onFilterChange={handleChange} />

            <Group position="apart">
              <Button
                children={<IconX />}
                color="gray"
                onClick={handleClear}
                compact
                type="reset"
                aria-label="Reste Filter"
              />
              <Button
                children={<IconCheck />}
                onClick={handleSave}
                compact
                variant="outline"
                type="submit"
                aria-label="Save Filter"
              />
            </Group>
          </Stack>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export interface ExternalColumnFilterProps {
  column: Column<any, any>;
}

export const ExternalColumnFilter = ({ column }: ExternalColumnFilterProps) => {
  const filterFn = column.columnDef.filterFn;
  const [value, setValue] = useState(
    column.getFilterValue() || (isDataGridFilter(filterFn) ? filterFn.init() : { value: null })
  );

  if (!isDataGridFilter(filterFn)) return null;

  const handleChange = (value: any) => {
    column.setFilterValue(value);
    setValue(value);
  };

  return createElement(filterFn.element, { filter: value, onFilterChange: handleChange });
};
