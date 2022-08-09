import { Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { examples } from '../pages/examples';

export const See = ({ ex }: { ex: keyof typeof examples }) => {
  return (
    <span>
      {'(example: '}

      <Anchor component={Link} to={examples[ex].path}>
        {examples[ex].label}
      </Anchor>

      {')'}
    </span>
  );
};
