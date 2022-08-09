import { ComponentType } from 'react';
import { BASE_URL } from '../../constants';
import AsyncExample from './AsyncExample';
import CustomFilterExample from './CustomFilterExample';
import DefaultExample from './DefaultExample';
import EmptyExample from './EmptyExample';
import InitialStateExample from './InitialStateExample';
import OnRowClickExample from './OnRowClickExample';
import StateExample from './StateExample';
import StylesExample from './StylesExample';

export type Example = {
  label: string;
  path: string;
  element: ComponentType;
};
const ex = (o: Example) => o;

export const examples = {
  default: ex({
    label: 'Default',
    path: BASE_URL + '/example',
    element: DefaultExample,
  }),
  customFilter: ex({
    label: 'Custom Filter',
    path: BASE_URL + '/example/custom-filter',
    element: CustomFilterExample,
  }),
  async: ex({
    label: 'Async data',
    path: BASE_URL + '/example/async',
    element: AsyncExample,
  }),
  initialState: ex({
    label: 'Initial State',
    path: BASE_URL + '/example/initial-state',
    element: InitialStateExample,
  }),
  onRowClick: ex({
    label: 'On row click',
    path: BASE_URL + '/example/on-row-click',
    element: OnRowClickExample,
  }),
  filters: ex({
    label: 'Column Filters',
    path: BASE_URL + '/example/filters',
    element: CustomFilterExample,
  }),
  empty: ex({
    label: 'Empty Grid',
    path: BASE_URL + '/example/empty',
    element: EmptyExample,
  }),
  state: ex({
    label: 'Table State',
    path: BASE_URL + '/example/state',
    element: StateExample,
  }),
  styles: ex({
    label: 'Custom Styles',
    path: BASE_URL + '/example/styles',
    element: StylesExample,
  }),
};
