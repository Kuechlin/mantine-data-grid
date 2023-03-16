import { Box, Group, MantineNumberSize, Pagination as MantinePagination, Select, Text } from '@mantine/core';
import { Table } from '@tanstack/react-table';
import { DataGridLocale, PaginationMode } from './types';

export const DEFAULT_PAGE_SIZES = ['10', '25', '50', '100'];
export const DEFAULT_INITIAL_PAGE = 0;
export const DEFAULT_INITIAL_SIZE = 10;

export type PaginationProps<TData> = {
  table: Table<TData>;
  classes: string[];
  pageSizes?: string[];
  fontSize?: MantineNumberSize;
  color: string;
  total?: number;
  locale?: DataGridLocale;
  mode?: PaginationMode;
};

export function Pagination<TData>({
  table,
  classes,
  fontSize = 'md',
  pageSizes = DEFAULT_PAGE_SIZES,
  color = '', // Empty color will follow the primary button color
  total,
  locale,
  mode = 'default',
}: PaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const maxRows = total ? total : table.getPrePaginationRowModel().rows.length;
  const currentRowAmount = table.getRowModel().rows.length;
  const firstRowNum = maxRows === 0 ? 0 : pageIndex * pageSize + 1;
  const lastRowNum = maxRows === 0 ? 0 : firstRowNum + currentRowAmount - 1;

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
  };

  const handlePageChange = (pageNum: number) => {
    table.setPageIndex(Number(pageNum) - 1);
  };

  return (
    <Box className={classes[0]}>
      {mode === 'default' ? (
        <Text size={fontSize} className={classes[1]}>
          {locale?.pagination ? (
            locale.pagination(firstRowNum, lastRowNum, maxRows)
          ) : (
            <>
              Showing <b>{firstRowNum}</b> - <b>{lastRowNum}</b> of <b>{maxRows}</b> result{maxRows === 1 ? '' : 's'}
            </>
          )}
        </Text>
      ) : null}

      <Group>
        <Box className={classes[2]}>
          {mode === 'default' ? (
            <>
              <Text size={fontSize}>{locale?.pageSize || 'Rows per page:'}</Text>
              <Select
                data={pageSizes}
                value={`${table.getState().pagination.pageSize}`}
                onChange={handlePageSizeChange}
                sx={() => ({
                  width: '72px',
                })}
              />
            </>
          ) : null}
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
          value={table.getState().pagination.pageIndex + 1}
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
