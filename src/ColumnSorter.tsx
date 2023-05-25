import { ActionIcon } from '@mantine/core';
import { IconChevronDown, IconSelector } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';

export interface ColumnSorterProps {
  column: Column<any, any>;
  className: string;
  color: string;
}

export const DefaultColumnSorter = ({ column, className, color }: ColumnSorterProps) => {
  const sorted = column.getIsSorted();
  return (
    <ActionIcon
      size="xs"
      onClick={column.getToggleSortingHandler()}
      className={className}
      style={{
        transition: 'transform 0.25s',
        transform: `rotate(${sorted === 'asc' ? '180' : '0'}deg)`,
      }}
      variant={sorted ? 'light' : 'transparent'}
      color={sorted ? color : 'gray'}
      children={sorted ? <IconChevronDown size={16} /> : <IconSelector size={16} />}
    />
  );
};
