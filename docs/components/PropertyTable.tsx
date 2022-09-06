import { createStyles, Table, Text } from '@mantine/core';
import { Fragment, ReactNode } from 'react';

export type PropertyGroup = {
  group: string;
  children: PropertyDefinition[];
};
export type PropertyDefinition = {
  name: string;
  required?: boolean;
  type: string;
  description: ReactNode;
};

const Required = () => <Text style={{ display: 'inline' }} color="red" children="*" />;

const useStyles = createStyles((t) => ({
  title: {
    borderBottom: '2px solid ' + t.colors.dark[2] + ' !important',
  },
  subtile: {
    borderBottom: '1px solid ' + t.colors.dark[2] + ' !important',
    paddingTop: `${t.spacing.lg}px !important`,
  },
  cell: { whiteSpace: 'pre-wrap' },
}));

type PropertyTableProps = {
  groups?: PropertyGroup[];
  items?: PropertyDefinition[];
};
export const PropertyTable = ({ groups, items }: PropertyTableProps) => {
  const { classes } = useStyles();

  const renderRow = (def: PropertyDefinition) => (
    <tr key={def.name}>
      <td>
        {def.name}
        {def.required && <Required />}
      </td>
      <td>
        <Text size="sm" color="orange" children={def.type} />
      </td>
      <td className={classes.cell}>{def.description}</td>
    </tr>
  );
  const renderGroup = (group: PropertyGroup) => (
    <Fragment key={group.group}>
      <tr>
        <td colSpan={3} className={classes.subtile}>
          <Text weight="bold" size="md" color="dimmed">
            {group.group}
          </Text>
        </td>
      </tr>
      {group.children.map(renderRow)}
    </Fragment>
  );

  return (
    <Table>
      <thead>
        <tr>
          <th className={classes.title}>Name</th>
          <th className={classes.title}>Type</th>
          <th className={classes.title}>Description</th>
        </tr>
      </thead>
      <tbody>
        {items && items.map(renderRow)}
        {groups && groups.map(renderGroup)}
      </tbody>
    </Table>
  );
};
