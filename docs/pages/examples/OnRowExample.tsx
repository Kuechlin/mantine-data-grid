import { createStyles, Group, Notification } from '@mantine/core';
import { useState } from 'react';
import { DataGrid } from '../../../src';
import { demoData } from '../../demoData';

const useStyles = createStyles(() => ({
  highlightRow: {
    backgroundColor: 'rgba(0,255,0,0.2)',
  },
  highlightCell: {
    backgroundColor: 'rgba(0,0,255,0.2)',
  },
}));

export default function OnRowClickExample() {
  const { classes } = useStyles();
  const [highlighted, setHighlighted] = useState<string[]>([]);

  const handleClick = (id: string) =>
    setHighlighted((state) => {
      if (state.includes(id)) {
        return state.filter((x) => x !== id);
      } else {
        return state.concat(id);
      }
    });

  return (
    <>
      <Group>
        <Notification disallowClose title="click on row to highlight" />
        <Notification disallowClose title="hover over column fish to highlight cell" />
      </Group>
      <DataGrid
        data={demoData.slice(0, 10)}
        columns={[
          {
            accessorKey: 'cat',
          },
          {
            accessorKey: 'fish',
          },
          {
            accessorKey: 'city',
          },
        ]}
        onRow={(row) => ({
          onClick: () => handleClick(row.id),
          className: highlighted.includes(row.id) ? classes.highlightRow : undefined,
        })}
        onCell={(cell) =>
          cell.column.id === 'fish'
            ? {
                onMouseEnter: () => handleClick(cell.id),
                onMouseLeave: () => handleClick(cell.id),
                className: highlighted.includes(cell.id) ? classes.highlightCell : undefined,
              }
            : {}
        }
      />
    </>
  );
}
