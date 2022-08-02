import { ActionIcon } from '@mantine/core';
import { Column } from '@tanstack/react-table';
import { ChevronDown, Selector } from 'tabler-icons-react';

export interface ColumnSorterProps {
  column: Column<any, any>;
  className: string;
  color: string;
}

export const ColumnSorter = ({ column, className, color }: ColumnSorterProps) => {
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
      children={sorted ? <ChevronDown size={16} /> : <Selector size={16} />}
    />
  );
};
