import {
  ComponentPropsWithoutRef,
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { DefaultProps, MantineColor, MantineNumberSize, Selectors } from '@mantine/core';
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Header,
  InitialTableState,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  Table,
  TableOptions,
  TableState,
} from '@tanstack/react-table';
import useStyles from './DataGrid.styles';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type OnChangeCallback<T> = (arg0: T) => void;

export type DataGridSortingState = SortingState;
export type DataGridPaginationState = PaginationState;
export type DataGridFiltersState = ColumnFiltersState;
export type DataGridLocale = {
  pagination?: (firstRowNum: number, lastRowNum: number, maxRows: number) => ReactNode;
  pageSize?: ReactNode;
  globalSearch?: string;
};
export type PaginationMode = 'default' | 'compact';

export interface DataGridProps<TData extends RowData>
  extends DefaultProps<DataGridStylesNames, object>,
    ComponentPropsWithoutRef<'div'> {
  /** Gird column definitions */
  columns: ColumnDef<TData, unknown>[];
  /** Grid Data */
  data: TData[];
  /** react-table options */
  tableOptions?: Omit<TableOptions<TData>, 'getCoreRowModel' | 'data' | 'columns' | 'initialState' | 'state'>;
  /**
   * Total number of items for external data
   */
  total?: number;
  /** Table instance reference */
  tableRef?: Ref<Table<TData>>;

  // Styles
  /** Table body height */
  height?: string | number;
  /** Table body width */
  width?: string | number;
  /** Enable fixed header */
  withFixedHeader?: boolean;
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

  // Layout
  /** Disable flex layout */
  noFlexLayout?: boolean;

  /** Enables column resizing */
  withColumnResizing?: boolean;

  // Pagination
  /** Enables pagination */
  withPagination?: boolean;
  /**
   * Sets of string for page size (rows per page) selections.
   * Default is `["10", "25", "50", "100"]`
   * */
  pageSizes?: string[];
  /**
   * Mode of pagination: default or compact
   * */
  paginationMode?: PaginationMode;

  /**
   * If set to false, pagination will NOT be reset to the first page when page-altering state changes eg. data is updated, filters change, grouping changes, etc.
   */
  autoResetPageIndex?: boolean;

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

  /** Enables row selection */
  withRowSelection?: boolean;
  /**
   * Callback when selected rows change
   */
  onRowSelectionChange?: OnChangeCallback<RowSelectionState>;

  /**
   * The initial table state
   */
  initialState?: InitialTableState;

  /**
   * The state of table
   */
  state?: Partial<TableState>;

  /**
   * Callback to set props pre row
   */
  onRow?: (row: Row<TData>) => HTMLAttributes<HTMLTableRowElement>;

  /**
   * Callback to set props pre cell
   */
  onCell?: (cell: Cell<TData, unknown>) => HTMLAttributes<HTMLTableCellElement>;

  /**
   * Change Icon Color on Sort & Filter
   */
  iconColor?: MantineColor;

  /**
   * Empty table element
   */
  empty?: ReactElement;

  /**
   * The i18n text including pagination text, pageSize text, globalSearch placeholder, etc
   */
  locale?: DataGridLocale;

  /** defaults to rendering <thead> */
  HeaderWrapper?: (
    props: PropsWithChildren & { table: Table<TData>; className: string; role: 'rowgroup' }
  ) => JSX.Element;
  /** defaults to rendering <th> */
  HeaderRowWrapper?: (
    props: PropsWithChildren & {
      header: Header<TData, unknown>;
      style: CSSProperties;
      className: string;
      colSpan: number;
      role: 'columnheader';
    }
  ) => JSX.Element;
}

export type DataGridFilterFn<TData extends RowData, TFilter = unknown> = FilterFn<TData> & {
  element: ComponentType<DataGridFilterProps<TFilter>>;
  init(): TFilter;
};

export function isDataGridFilter(val: unknown): val is DataGridFilterFn<unknown> {
  return typeof val === 'function' && 'element' in val && 'init' in val;
}

export type DataGridFilterProps<T = unknown> = {
  filter: T;
  onFilterChange(value: T): void;
};
