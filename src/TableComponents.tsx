/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cell, Header, HeaderGroup, Row, Table } from '@tanstack/react-table';
import { ComponentType, CSSProperties, PropsWithChildren } from 'react';

export type DataGridHeaderWrapperProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  className: string;
  role: 'rowgroup';
}>;

export type DataGridHeaderRowProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  headerGroup: HeaderGroup<TData>;
  className: string;
  role: 'row';
}>;

export type DataGridHeaderCellProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  header: Header<TData, unknown>;
  className: string;
  style: CSSProperties;
  colSpan: number;
  role: 'columnheader';
}>;

export type DataGridBodyWrapperProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  className: string;
  role: 'rowgroup';
}>;

export type DataGridBodyRowProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  row: Row<TData>;
  className: string;
  role: 'row';
}>;

export type DataGridBodyCellProps<TData> = PropsWithChildren<{
  table: Table<TData>;
  cell: Cell<TData, unknown>;
  className: string;
  style: CSSProperties;
  role: 'cell';
}>;

export const DefaultHeaderWrapper: ComponentType<DataGridHeaderWrapperProps<any>> = ({ table, ...rest }) => (
  <thead {...rest} />
);
export const DefaultHeaderRow: ComponentType<DataGridHeaderRowProps<any>> = ({ table, headerGroup, ...rest }) => (
  <tr {...rest} />
);
export const DefaultHeaderCell: ComponentType<DataGridHeaderCellProps<any>> = ({ table, header, ...rest }) => (
  <th {...rest} />
);
export const DefaultBodyWrapper: ComponentType<DataGridBodyWrapperProps<any>> = ({ table, ...rest }) => (
  <tbody {...rest} />
);
export const DefaultBodyRow: ComponentType<DataGridBodyRowProps<any>> = ({ table, row, ...rest }) => <tr {...rest} />;
export const DefaultBodyCell: ComponentType<DataGridBodyCellProps<any>> = ({ table, cell, ...rest }) => (
  <td {...rest} />
);
