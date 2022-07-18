import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/core';
import {
    ColumnPinningColumnDef,
    ColumnSizingColumnDef,
    CoreColumnDef,
    GroupingColumnDef,
    RowData,
    SortingColumnDef,
    VisibilityColumnDef,
} from '@tanstack/react-table';
import useStyles from './DataGrid.styles';

import { DataGridFilterFns } from './ColumnFilter';
import { DataGridFilterFn } from './ColumnFilter/ColumnFilter';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type DataGridFiltersColumnDef<TData extends RowData> = {
    filterFn?: DataGridFilterFns | DataGridFilterFn<TData>;
    enableColumnFilter?: boolean;
    enableGlobalFilter?: boolean;
};

export type DataGridColumnDef<TData extends RowData> = CoreColumnDef<TData> &
    VisibilityColumnDef &
    ColumnPinningColumnDef &
    DataGridFiltersColumnDef<TData> &
    SortingColumnDef<TData> &
    GroupingColumnDef<TData> &
    ColumnSizingColumnDef;

export type PaginationArg = {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
};

export type OnPageChangeCallback = (arg0: PaginationArg) => void;

export interface DataGridProps<TData extends RowData>
    extends DefaultProps<DataGridStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
    columns: DataGridColumnDef<TData>[];
    data: TData[];
    withGlobalFilter?: boolean;
    noEllipsis?: boolean;
    spacing?: MantineSize;
    withPagination?: boolean;
    pagination?: {
        initialPageIndex: number;
        initialPageSize: number;
    };
    onPageChange?: OnPageChangeCallback;
}