import { Divider, Group, Select, Text,
  Pagination as MantinePagination,
  Stack} from "@mantine/core";
import { useEffect } from "react";

export const DEFAULT_PAGE_OPTIONS = ["10", "25", "50", "100"];
export const DEFAULT_INITIAL_PAGE = 0;
export const DEFAULT_INITIAL_SIZE = 10;

export function Pagination({ table, onPageChange, initialPageIndex = DEFAULT_INITIAL_PAGE, initialPageSize = DEFAULT_INITIAL_SIZE }) {

  useEffect(() => {
    if (initialPageIndex !== DEFAULT_INITIAL_PAGE) {
      table.setPageIndex(Number(initialPageIndex) - 1);
    }

    if (initialPageSize !== DEFAULT_INITIAL_SIZE) {
      table.setPageSize(Number(initialPageSize));
    }
  }, []);

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

  const getPageRecordInfo = () => {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const pageCount = table.getPageCount();

    const firstRowNum = pageIndex * pageSize + 1;

    const currLastRowNum = (pageIndex + 1) * pageSize;
    const lastRowNum = currLastRowNum < pageCount ? currLastRowNum : pageCount;
    return `${firstRowNum} - ${lastRowNum} of ${pageCount}`;
  };

  return (
    <Stack>
      <Group position="right">
        <Text size="sm">Rows per page: </Text>
        <Select
          style={{ width: "72px" }}
          variant="filled"
          data={DEFAULT_PAGE_OPTIONS}
          value={`${table.getState().pagination.pageSize}`}
          onChange={handlePageSizeChange}
        />
        <Divider orientation="vertical" />

        <Text size="sm">{getPageRecordInfo()}</Text>
        <Divider orientation="vertical" />

        <MantinePagination
          page={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
          onChange={handlePageChange}
        />
      </Group>
    </Stack>
  )
}