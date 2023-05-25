import { createStyles, CSSObject } from '@mantine/core';
import { PaginationMode } from './types';

export type DataGridStylesParams = {
  height?: string | number;
  width?: string | number;
  noEllipsis?: boolean;
  withFixedHeader?: boolean;
  paginationMode?: PaginationMode;
};

const ellipsis: CSSObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export default createStyles(
  (theme, { height, width, withFixedHeader, paginationMode = 'default' }: DataGridStylesParams) => ({
    wrapper: {
      height: height ? height + 'px' : undefined,
      width: width ? width + 'px' : undefined,
      overflow: 'hidden',
    },
    scrollArea: {
      position: 'relative',
      paddingBottom: theme.spacing.lg,
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderLeft: 'none',
      borderRight: 'none',
    },
    thead: {
      position: 'relative',
      '::after': {
        content: "' '",
        backgroundColor: theme.colors.dark[4],
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
      },
      ...(withFixedHeader && {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',
        zIndex: 2,
      }),
    },
    tbody: {
      minHeight: '160px',
    },
    tr: {
      display: 'flex',
    },
    th: { position: 'relative', display: 'flex', height: 'inherit', justifyContent: 'space-between' },
    td: { display: 'flex', justifyContent: 'space-between' },
    headerCellContent: ellipsis,
    headerCellButtons: {
      display: 'inline-flex',
      gap: '4px',
      alignItems: 'center',
    },
    dataCellContent: ellipsis,
    resizer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 4,
      borderRight: `1px dashed ${theme.colors.dark[5]}`,
      cursor: 'col-resize',
      ':hover': {
        backgroundColor: theme.colors.dark[5],
      },
    },
    isResizing: {
      userSelect: 'none',
      backgroundColor: theme.fn.primaryColor(theme.colorScheme),
    },
    sorter: {},
    filter: {},
    globalFilter: {},
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [`@media (min-width: ${theme.breakpoints.xl})`]: {
        justifyContent: paginationMode === 'default' ? 'space-between' : 'flex-end',
      },
    },

    pagination_info: {
      display: 'none',

      [`@media (min-width: ${theme.breakpoints.xl})`]: {
        display: 'inline-block',
      },
    },

    pagination_size: {
      display: 'none',

      [`@media (min-width: ${theme.breakpoints.xl})`]: {
        display: 'flex',
        alignItems: 'center',
        gap: `${theme.spacing.xs}px`,
      },
    },

    pagination_page: {},
  })
);
