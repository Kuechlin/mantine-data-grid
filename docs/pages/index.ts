import { IconBook, IconFilter, IconPaint, IconRocket, IconStar } from '@tabler/icons-react';
import { ComponentType } from 'react';
import Demo from './Demo';
import Filters from './Filters';
import GettingStarted from './GettingStarted';
import Properties from './Properties';
import Styles from './Styles';

export { examples } from './examples';

export type Page = {
  color: string;
  icon: ComponentType<{ size?: number | string }>;
  label: string;
  path: string;
  element: ComponentType;
};

export const pages: Page[] = [
  {
    color: 'orange',
    icon: IconStar,
    label: 'Demo',
    path: '/',
    element: Demo,
  },
  {
    color: 'teal',
    icon: IconRocket,
    label: 'Getting started',
    path: '/getting-started',
    element: GettingStarted,
  },
  {
    color: 'red',
    icon: IconBook,
    label: 'Properties',
    path: '/properties',
    element: Properties,
  },
  {
    color: 'indigo',
    icon: IconPaint,
    label: 'Styles',
    path: '/styles',
    element: Styles,
  },
  {
    color: 'yellow',
    icon: IconFilter,
    label: 'Filters',
    path: '/filters',
    element: Filters,
  },
];
