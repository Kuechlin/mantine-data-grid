import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    table: {
        overflow: 'hidden',
        borderRadius: theme.radius.md,
    },
    cell: {
        ...theme.fn.fontStyles(),
        position: 'relative',
        padding: theme.spacing.sm,
    },
    header: {
        fontWeight: 'bold',
        borderBottom: `1px solid ${theme.colors.dark[4]}`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',

        '&.lastGroup': {
            borderBottom: `4px solid ${theme.colors.teal[5]}`,
        },

        '&.sort': {
            cursor: 'pointer',
            userSelect: 'none',
        },
    },
    even: {
        backgroundColor: theme.colors.dark[6],
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
    thumb: {
        backgroundColor: theme.colors.dark[1],
        borderRadius: theme.radius.sm,
    },
}));
