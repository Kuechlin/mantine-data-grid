import {
    Divider,
    Group,
    Select,
    Text,
    Pagination as MantinePagination,
    Stack,
} from '@mantine/core';
import { Table } from '@tanstack/react-table';

export const DEFAULT_PAGE_SIZES = ['10', '25', '50', '100'];
export const DEFAULT_INITIAL_PAGE = 0;
export const DEFAULT_INITIAL_SIZE = 10;

export function Pagination({
    table,
    className = 'pagination',
    pageSizes = DEFAULT_PAGE_SIZES,
}: {
    table: Table<any>;
    className: string;
    pageSizes?: string[];
}) {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const allRows = table.getPageCount() * pageSize;

    const firstRowNum = pageIndex * pageSize + 1;

    const currLastRowNum = (pageIndex + 1) * pageSize;
    const lastRowNum = currLastRowNum < allRows ? currLastRowNum : allRows;

    const handlePageSizeChange = (value: string) => {
        table.setPageSize(Number(value));
    };

    const handlePageChange = (pageNum: number) => {
        table.setPageIndex(Number(pageNum) - 1);
    };

    return (
        <Stack className={className}>
            <Group position="apart">
                <Text size="sm" className={`${className}-info`}>
                    Showing <b>{firstRowNum}</b> - <b>{lastRowNum}</b> of{' '}
                    <b>{allRows}</b> result
                </Text>
                <Group>
                    <Text size="sm">Rows per page: </Text>
                    <Select
                        style={{ width: '72px' }}
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
    );
}
