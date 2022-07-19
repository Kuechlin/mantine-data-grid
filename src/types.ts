import React from 'react';
import {
    DefaultProps,
    MantineNumberSize,
    MantineSize,
    Selectors,
} from '@mantine/core';
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
    /** Gird column definitions */
    columns: DataGridColumnDef<TData>[];
    /** Grid Data */
    data: TData[];
    /** Enable global search filter */
    withGlobalFilter?: boolean;
    /** Text overflow ellipsis is disabled*/
    noEllipsis?: boolean;
    /** If true react-table debug log is enabled */
    debug?: boolean;
    /** If true every odd row of table will have gray background color */
    striped?: boolean;
    /** If true row will have hover color */
    highlightOnHover?: boolean;
    /** Horizontal cells spacing from theme.spacing or number to set value in px */
    horizontalSpacing?: MantineNumberSize;
    /** Vertical cells spacing from theme.spacing or number to set value in px */
    verticalSpacing?: MantineNumberSize;
    /** Sets font size of all text inside table */
    fontSize?: MantineNumberSize;
    /** Enables pagination */
    withPagination?: boolean;
    pagination?: {
        initialPageIndex: number;
        initialPageSize: number;
    };
    onPageChange?: OnPageChangeCallback;
}
