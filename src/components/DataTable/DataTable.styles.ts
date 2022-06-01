import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    table: {},
    cell: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    row: {
        display: 'flex',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',

        '&.sort': {
            cursor: 'pointer',
            userSelect: 'none',
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
}));
