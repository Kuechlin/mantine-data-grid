import { createStyles, INPUT_SIZES, MantineNumberSize } from '@mantine/core';

export default createStyles((theme, { size }: { size: MantineNumberSize }) => ({
    table: {},
    header: {
        borderBottom: `4px solid ${theme.colors.dark[5]}`,
    },
    body: {},
    row: {
        display: 'flex',
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
    },
    headerCell: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.fn.size({ size, sizes: theme.spacing }),
    },
    headerCellButtons: {
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
    },
    dataCell: {
        padding: theme.fn.size({ size, sizes: theme.spacing }),
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
    /*
    table: {},
    cell: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
        padding: theme.fn.size({ size, sizes: theme.spacing }),
    },
    row: {
        display: 'flex',
        borderBottom: `1px solid ${theme.colors.dark[6]}`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',

        '&.sort': {
            cursor: 'pointer',
            userSelect: 'none',
        },

        '&.lastGroup': {
            borderBottom: `4px solid ${theme.colors.dark[5]}`,
        },
    },
    slot: {
        // text overflow
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    drag: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 4,
        cursor: 'col-resize',
        ':hover': {
            backgroundColor: theme.colors.dark[4],
        },
    },
    */
}));
