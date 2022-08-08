import { Group, Select, Text, Pagination as MantinePagination, Box, MantineNumberSize } from '@mantine/core';
import { Table } from '@tanstack/react-table';

export const DEFAULT_PAGE_SIZES = ['10', '25', '50', '100'];
export const DEFAULT_INITIAL_PAGE = 0;
export const DEFAULT_INITIAL_SIZE = 10;

export function Pagination<TData>({
  table,
  classes,
  totalRows,
  fontSize = 'md',
  pageSizes = DEFAULT_PAGE_SIZES,
  color = '', // Empty color will follow the primary button color
}: {
  table: Table<TData>;
  classes: string[];
  totalRows: number;
  pageSizes?: string[];
  fontSize?: MantineNumberSize;
  color: string;
}) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const firstRowNum = pageIndex * pageSize + 1;

  const currLastRowNum = (pageIndex + 1) * pageSize;
  const lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows;

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
  };

  const handlePageChange = (pageNum: number) => {
    table.setPageIndex(Number(pageNum) - 1);
  };

  return (
    <Box className={classes[0]}>
      <Text size={fontSize} className={classes[1]}>
        Showing <b>{firstRowNum}</b> - <b>{lastRowNum}</b> of <b>{totalRows}</b> result
      </Text>

      <Group>
        <Box className={classes[2]}>
          <Text size={fontSize}>Rows per page: </Text>
          <Select
            data={pageSizes}
            value={`${table.getState().pagination.pageSize}`}
            onChange={handlePageSizeChange}
            sx={() => ({
              width: '72px',
            })}
          />
        </Box>
        <MantinePagination
          size={fontSize}
          /** Read: https://github.com/mantinedev/mantine/discussions/2001 */
          sx={() => ({
            '> button': {
              height: '36px',
              minWidth: '36px',
            },
          })}
          page={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
          onChange={handlePageChange}
          className={classes[3]}
          siblings={1}
          color={color}
        />
      </Group>
    </Box>
  );
}
