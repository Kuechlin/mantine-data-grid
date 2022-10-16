import { ActionIcon, Box, Button } from '@mantine/core';
import { ColumnOrderState, TableOptions } from '@tanstack/react-table';
import { ComponentPropsWithoutRef, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { GridDots } from 'tabler-icons-react';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DataGrid, DataGridProps } from '../../../src';
import { Data, demoData } from '../../demoData';

type FetchResponse = {
  list: Data[];
  total: number;
};

function fetchData(page: number, pageSize: number, search: string): Promise<FetchResponse> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const data = demoData.filter(
        (x) => x.text.includes(search) || x.cat.includes(search) || x.fish.includes(search) || x.city.includes(search)
      );
      resolve({
        list: data.slice(page * pageSize, page * pageSize + pageSize),
        total: data.length + 2,
      });
    }, 1000)
  );
}

export default function MinimalExample() {
  const columns: TableOptions<Data>['columns'] = [
    { id: 'cat', accessorFn: (row) => row.cat },
    { id: 'fish', accessorFn: (row) => row.fish },
    { id: 'city', accessorFn: (row) => row.city },
    { id: 'value', accessorFn: (row) => row.value },
  ];
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );

  const resetOrder = () => setColumnOrder(columns.map((column) => column.id as string));
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
  console.log(columnOrder);

  return (
    <>
      <Button onClick={resetOrder}>Reset column order</Button>
      <DndContext
        sensors={sensors}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            setColumnOrder((data) => {
              const oldIndex = columnOrder.indexOf(String(active.id));
              const newIndex = columnOrder.indexOf(String(over.id));
              return arrayMove(data, oldIndex, newIndex);
            });
          }

          setActiveId(null);
        }}
        onDragStart={(e) => setActiveId(String(e.active.id))}
        onDragCancel={() => setActiveId(null)}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
      >
        <DragOverlay>{activeId}</DragOverlay>
        <DataGrid
          data={demoData}
          columns={columns}
          withPagination
          //
          state={{ columnOrder }}
          tableOptions={{ onColumnOrderChange: setColumnOrder }}
          HeaderWrapper={({ children, ...props }) => (
            <thead {...props}>
              <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                {children}
              </SortableContext>
            </thead>
          )}
          HeaderRowWrapper={({ children, header, ...props }) => (
            <DraggableColumnHeader {...props} header={header}>
              {children}
            </DraggableColumnHeader>
          )}
        />
      </DndContext>
    </>
  );
}
const DraggableColumnHeader = ({
  children,
  header,
  ...props
}: ComponentPropsWithoutRef<NonNullable<DataGridProps<any>['HeaderRowWrapper']>>) => {
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
    id: header.column.id,
  });

  return (
    <th
      {...props}
      ref={setNodeRef}
      style={{
        ...props?.style,
        transform: CSS.Transform.toString(transform),
        transition: transition,
        color: isDragging ? 'red' : undefined,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {children}
        <ActionIcon ml="auto">
          <GridDots {...attributes} {...listeners} />
        </ActionIcon>
      </Box>
    </th>
  );
};
