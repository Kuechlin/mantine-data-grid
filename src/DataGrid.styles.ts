import { createStyles } from '@mantine/core';

export default createStyles((theme, _params: object) => ({
  table: {
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  header: {
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
  },
  headerFixed: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',
  },
  body: {
    minHeight: '160px',
  },
  row: {},
  headerCell: {
    position: 'relative',
  },
  headerCellContent: {
    display: 'flex',
    width: 'inherit',
    justifyContent: 'space-between',
  },
  headerCellButtons: {
    display: 'inline-flex',
    gap: '4px',
    alignItems: 'center',
  },
  dataCell: {},
  dataCellContent: {
    display: 'flex',
    width: 'inherit',
    justifyContent: 'space-between',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
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
  sorter: {},
  filter: {},
  globalFilter: {},
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      justifyContent: 'space-between',
    },
  },

  pagination_info: {
    display: 'none',

    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      display: 'inline-block',
    },
  },

  pagination_size: {
    display: 'none',

    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      display: 'flex',
      alignItems: 'center',
      gap: `${theme.spacing.xs}px`,
    },
  },

  pagination_page: {},
}));
