import { DefaultProps, MantineColor, MantineNumberSize, Selectors } from '@mantine/core';
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ExpandedState,
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
import { ComponentPropsWithoutRef, ComponentType, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import { ColumnFilterProps } from './ColumnFilter';
import { ColumnSorterProps } from './ColumnSorter';
import useStyles from './DataGrid.styles';
import { PaginationProps } from './Pagination';
import {
  DataGridBodyCellProps,
  DataGridBodyRowProps,
  DataGridBodyWrapperProps,
  DataGridHeaderCellProps,
  DataGridHeaderRowProps,
  DataGridHeaderWrapperProps,
} from './TableComponents';

export type DataGridStylesNames = Selectors<typeof useStyles>;

export type OnChangeCallback<T> = (arg0: T) => void;

export type DataGridSortingState = SortingState;
export type DataGridPaginationState = PaginationState;
export type DataGridFiltersState = ColumnFiltersState;
export type DataGridColumnOrderState = ColumnOrderState;
export type DataGridRowSelectionState = RowSelectionState;
export type DataGridExpandedState = ExpandedState;
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
  /** If true react-table debug log is enabled */
  debug?: boolean;
  /** If true every odd row of table will have gray background color */
  striped?: boolean;
  /** If true table has a border */
  withBorder?: boolean;
  /** If true columns have a border */
  withColumnBorders?: boolean;
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
  onRowSelectionChange?: OnChangeCallback<DataGridRowSelectionState>;

  /** Enables row expanding */
  withRowExpanding?: boolean;
  /**
   * Allows you to determining whether a row can be expanded.
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /**
   * Render sub component for expanded row
   */
  renderSubComponent?: (row: Row<TData>) => ReactNode;
  /**
   * Callback when expanded rows change
   */
  onExpandedChange?: OnChangeCallback<DataGridExpandedState>;

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

  /**
   * Component overrides
   */
  components?: Partial<DataGridComponents<TData>>;

  /**
   * Table Options overrides
   */
  options?: DataGridOptionsOverride<TData>;
}

export type DataGridOptionsOverride<TData> = Partial<
  Omit<
    TableOptions<TData>,
    | 'data'
    | 'columns'
    | 'initialState'
    | 'state'
    | 'pageCount'
    | 'onGlobalFilterChange'
    | 'onColumnFiltersChange'
    | 'onSortingChange'
    | 'onPaginationChange'
    | 'onRowSelectionChange'
    | 'onExpandedChange'
  >
>;

// component types
export type DataGridComponents<TData> = {
  headerWrapper: ComponentType<DataGridHeaderWrapperProps<TData>>;
  headerRow: ComponentType<DataGridHeaderRowProps<TData>>;
  headerCell: ComponentType<DataGridHeaderCellProps<TData>>;
  bodyWrapper: ComponentType<DataGridBodyWrapperProps<TData>>;
  bodyRow: ComponentType<DataGridBodyRowProps<TData>>;
  bodyCell: ComponentType<DataGridBodyCellProps<TData>>;
  pagination: ComponentType<PaginationProps<TData>>;
  columnFilter: ComponentType<ColumnFilterProps>;
  columnSorter: ComponentType<ColumnSorterProps>;
};
