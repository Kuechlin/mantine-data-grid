import { Button, Divider, Popover, Switch } from "@mantine/core";
import { Table, } from "@tanstack/react-table";
import { useState } from "react";

type ToggleColumnsProps<TData> = {
  table: Table<TData>;

};
export default function ToggleColumns<TData>({table}:ToggleColumnsProps<TData>) {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
    <Popover.Target>
      <Button style={{width:'200px'}}>Toggle Columns</Button>
    </Popover.Target>
    <Popover.Dropdown>
      <Switch
        
          label={'Toggle All'}
          checked={table.getIsAllColumnsVisible()}
          onChange={table.getToggleAllColumnsVisibilityHandler()}
     
      />
      <Divider my={'xs'} />
      {table.getAllLeafColumns().map(column => (

        < Switch
          mb={'xs'}
          key={column.id}
          label={column.id}
          checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()}
        />

      ))}
    </Popover.Dropdown>
  </Popover>  )
}
