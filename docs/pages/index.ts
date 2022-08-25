import { ComponentType } from 'react';
import { Book, Filter, Paint, Rocket, Star } from 'tabler-icons-react';
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
    icon: Star,
    label: 'Demo',
    path: '/',
    element: Demo,
  },
  {
    color: 'teal',
    icon: Rocket,
    label: 'Getting started',
    path: '/getting-started',
    element: GettingStarted,
  },
  {
    color: 'red',
    icon: Book,
    label: 'Properties',
    path: '/properties',
    element: Properties,
  },
  {
    color: 'indigo',
    icon: Paint,
    label: 'Styles',
    path: '/styles',
    element: Styles,
  },
  {
    color: 'yellow',
    icon: Filter,
    label: 'Filters',
    path: '/filters',
    element: Filters,
  },
];
