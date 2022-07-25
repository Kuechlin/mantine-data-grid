import React, { ComponentType } from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/core';
import {
    ColumnDef,
    ColumnFiltersState,
    ColumnSort,
    FilterFn,
    OnChangeFn,
    PaginationState,
    RowData,
} from '@tanstack/react-table';
import useStyles from './DataGrid.styles';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type OnChangeCallback<T> = (arg0: T) => void;

export type DataGridSortingState = ColumnSort | null;
export type DataGridPaginationState = PaginationState;
export type DataGridFiltersState = ColumnFiltersState;

export interface DataGridProps<TData extends RowData>
    extends DefaultProps<DataGridStylesNames>,
        React.ComponentPropsWithoutRef<'div'> {
    /** Gird column definitions */
    columns: ColumnDef<TData, any>[];
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
    /** Pagination additional setup */
    pagination?: {
        /**
         * An initial current page index.
         * Default is `0` */
        initialPageIndex?: number;
        /**
         * An initial current page size (rows per page).
         * Default is `10`  */
        initialPageSize?: number;
        /**
         * Sets of string for page size (rows per page) selections.
         * Default is `["10", "25", "50", "100"]`
         * */
        pageSizes?: string[];
        /**
         * Sets the total count for external data
         */
        total?: number;
    };
    /**
     * Callback when page index or page size changed
     * */
    onPageChange?: OnChangeCallback<DataGridPaginationState>;
    /**
     * Callback when global filter changed
     */
    onSearch?: OnChangeCallback<string>;
    /**
     * Callback when column filter changed
     */
    onFilter?: OnChangeCallback<DataGridFiltersState>;
    /**
     * Callback when sorting changed
     */
    onSort?: OnChangeCallback<DataGridSortingState>;
}

export type DataGridFilterFn<TData extends RowData> = FilterFn<TData> & {
    element: ComponentType<DataGridFilterProps>;
    init(): any;
};

export function isDataGridFilter(val: any): val is DataGridFilterFn<any> {
    return typeof val === 'function' && 'element' in val && 'init' in val;
}

export type DataGridFilterProps = {
    filter: any;
    onFilterChange(value: any): void;
};
