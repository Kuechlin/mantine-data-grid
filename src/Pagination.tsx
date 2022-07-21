import {
  Divider,
  Group,
  Select,
  Text,
  Pagination as MantinePagination,
  Stack
} from "@mantine/core";

import { OnPageChangeCallback } from "./types";

export const DEFAULT_PAGE_SIZES = ["10", "25", "50", "100"];
export const DEFAULT_INITIAL_PAGE = 0;
export const DEFAULT_INITIAL_SIZE = 10;

export function Pagination({ table, onPageChange, className = 'pagination', pageSizes = DEFAULT_PAGE_SIZES }: { table: any, onPageChange: OnPageChangeCallback, className: string, pageSizes?: string[] }) {

  const { rows: allRows } = table.getCoreRowModel();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const firstRowNum = pageIndex * pageSize + 1;

  const currLastRowNum = (pageIndex + 1) * pageSize;
  const lastRowNum = currLastRowNum < allRows.length ? currLastRowNum : allRows.length;

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
    const pageCount = table.getPageCount();

    if (onPageChange) {
      onPageChange({
        pageIndex: table.getState().pagination.pageIndex,
        pageSize: Number(value),
        pageCount
      })
    }
  }

  const handlePageChange = (pageNum: number) => {
    table.setPageIndex(Number(pageNum) - 1);
    const pageCount = table.getPageCount();
    if (onPageChange) {
      onPageChange({
        pageIndex: Number(pageNum) - 1,
        pageSize: table.getState().pagination.pageSize,
        pageCount
      })
    }
  };

  return (
    <Stack className={className}>
      <Group position="apart">
        <Text size="sm" className={`${className}-info`}>
          Showing <b>{firstRowNum}</b> - <b>{lastRowNum}</b> of <b>{allRows.length}</b> result
        </Text>
        <Group >
          <Text size="sm">Rows per page: </Text>
          <Select
            style={{ width: "72px" }}
            variant="filled"
            data={pageSizes}
            value={`${table.getState().pagination.pageSize}`}
            onChange={handlePageSizeChange}
            className={`${className}-size`}
          />
          <Divider orientation="vertical" />
          <MantinePagination
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            onChange={handlePageChange}
            className={`${className}-page`}
          />
        </Group>
      </Group>
    </Stack>
  )
}