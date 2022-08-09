import { ComponentType } from 'react';
import { Book, Filter, Paint, Rocket, Star } from 'tabler-icons-react';
import { BASE_URL } from '../constants';
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
    path: BASE_URL + '/',
    element: Demo,
  },
  {
    color: 'teal',
    icon: Rocket,
    label: 'Getting started',
    path: BASE_URL + '/getting-started',
    element: GettingStarted,
  },
  {
    color: 'red',
    icon: Book,
    label: 'Properties',
    path: BASE_URL + '/properties',
    element: Properties,
  },
  {
    color: 'indigo',
    icon: Paint,
    label: 'Styles',
    path: BASE_URL + '/styles',
    element: Styles,
  },
  {
    color: 'yellow',
    icon: Filter,
    label: 'Filters',
    path: BASE_URL + '/filters',
    element: Filters,
  },
];
