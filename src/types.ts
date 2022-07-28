import { ComponentPropsWithoutRef, ComponentType, Ref } from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/core';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  InitialTableState,
  PaginationState,
  RowData,
  SortingState,
  Table,
} from '@tanstack/react-table';
import useStyles from './DataGrid.styles';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type OnChangeCallback<T> = (arg0: T) => void;

export type DataGridSortingState = SortingState;
export type DataGridPaginationState = PaginationState;
export type DataGridFiltersState = ColumnFiltersState;

export interface DataGridProps<TData extends RowData>
  extends DefaultProps<DataGridStylesNames, object>,
    ComponentPropsWithoutRef<'div'> {
  /** Gird column definitions */
  columns: ColumnDef<TData, unknown>[];
  /** Grid Data */
  data: TData[];
  /**
   * Total number of items for external data
   */
  total?: number;
  /** Table instance reference */
  tableRef?: Ref<Table<TData>>;

  // Styles
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
  /** Show loading overlay */
  loading?: boolean;

  // Pagination
  /** Enables pagination */
  withPagination?: boolean;
  /**
   * Sets of string for page size (rows per page) selections.
   * Default is `["10", "25", "50", "100"]`
   * */
  pageSizes?: string[];
  /**
   * An initial current page index.
   * Default is `0` */
  initialPageIndex?: number;
  /**
   * An initial current page size (rows per page).
   * Default is `10`  */
  initialPageSize?: number;
  /**
   * Callback when page index or page size changed
   * */
  onPageChange?: OnChangeCallback<DataGridPaginationState>;

  /** Enable global search filter */
  withGlobalFilter?: boolean;
  /**
   * Callback when global filter changed
   */
  onSearch?: OnChangeCallback<string>;

  /** Enables column filters */
  withColumnFilters?: boolean;
  /**
   * Callback when column filter changed
   */
  onFilter?: OnChangeCallback<DataGridFiltersState>;

  /** Enables sorting */
  withSorting?: boolean;
  /**
   * Callback when sorting changed
   */
  onSort?: OnChangeCallback<DataGridSortingState>;

  /**
   * The intial table state
   */
  initialState?: InitialTableState;
}

export type DataGridFilterFn<TData extends RowData, TFilter = unknown> = FilterFn<TData> & {
  element: ComponentType<DataGridFilterProps<TFilter>>;
  init(): TFilter;
};

export function isDataGridFilter(val: unknown): val is DataGridFilterFn<unknown> {
  return typeof val === 'function' && 'element' in val && 'init' in val;
}

export type DataGridFilterProps<T = any> = {
  filter: T;
  onFilterChange(value: T): void;
};
