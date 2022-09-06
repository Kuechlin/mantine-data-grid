import { ComponentType } from 'react';
import AsyncExample from './AsyncExample';
import CustomFilterExample from './CustomFilterExample';
import DefaultExample from './DefaultExample';
import EmptyExample from './EmptyExample';
import InitialStateExample from './InitialStateExample';
import LocaleExample from './LocaleExample';
import OnRowClickExample from './OnRowExample';
import OverrideExample from './ExternalFilterExample';
import RowSelectionExample from './RowSelectionExample';
import StateExample from './StateExample';
import StylesExample from './StylesExample';
import ExternalFilterExample from './ExternalFilterExample';

export type Example = {
  label: string;
  path: string;
  element: ComponentType;
};
const ex = (o: Example) => o;

export const examples = {
  default: ex({
    label: 'Default',
    path: '/example',
    element: DefaultExample,
  }),
  customFilter: ex({
    label: 'Custom Filter',
    path: '/example/custom-filter',
    element: CustomFilterExample,
  }),
  async: ex({
    label: 'Async data',
    path: '/example/async',
    element: AsyncExample,
  }),
  initialState: ex({
    label: 'Initial State',
    path: '/example/initial-state',
    element: InitialStateExample,
  }),
  onRowClick: ex({
    label: 'On row / On cell',
    path: '/example/on-row-click',
    element: OnRowClickExample,
  }),
  filters: ex({
    label: 'Column Filters',
    path: '/example/filters',
    element: CustomFilterExample,
  }),
  empty: ex({
    label: 'Empty Grid',
    path: '/example/empty',
    element: EmptyExample,
  }),
  state: ex({
    label: 'Table State',
    path: '/example/state',
    element: StateExample,
  }),
  styles: ex({
    label: 'Custom Styles',
    path: '/example/styles',
    element: StylesExample,
  }),
  locale: ex({
    label: 'Locale i18n',
    path: '/example/locale',
    element: LocaleExample,
  }),
  rowSelection: ex({
    label: 'Row selection',
    path: '/example/rowselection',
    element: RowSelectionExample,
  }),
  override: ex({
    label: 'External filter',
    path: '/example/externalfilter',
    element: ExternalFilterExample,
  }),
};
