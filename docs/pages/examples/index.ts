/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
import { ComponentType } from 'react';

import AsyncExample from './AsyncExample';
// @ts-ignore
import AsyncExampleCode from './AsyncExample.tsx?raw';

import CustomFilterExample from './CustomFilterExample';
// @ts-ignore
import CustomFilterExampleCode from './CustomFilterExample.tsx?raw';

import DefaultExample from './DefaultExample';
// @ts-ignore
import DefaultExampleCode from './DefaultExample.tsx?raw';

import EmptyExample from './EmptyExample';
// @ts-ignore
import EmptyExampleCode from './EmptyExample.tsx?raw';

import InitialStateExample from './InitialStateExample';
// @ts-ignore
import InitialStateExampleCode from './InitialStateExample.tsx?raw';

import LocaleExample from './LocaleExample';
// @ts-ignore
import LocaleExampleCode from './LocaleExample.tsx?raw';

import MinimalExample from './MinimalExample';
// @ts-ignore
import MinimalExampleCode from './MinimalExample.tsx?raw';

import OnRowClickExample from './OnRowExample';
// @ts-ignore
import OnRowClickExampleCode from './OnRowExample.tsx?raw';

import RowSelectionExample from './RowSelectionExample';
// @ts-ignore
import RowSelectionExampleCode from './RowSelectionExample.tsx?raw';

import StateExample from './StateExample';
// @ts-ignore
import StateExampleCode from './StateExample.tsx?raw';

import StylesExample from './StylesExample';
// @ts-ignore
import StylesExampleCode from './StylesExample.tsx?raw';

import ExternalFilterExample from './ExternalFilterExample';
// @ts-ignore
import ExternalFilterExampleCode from './ExternalFilterExample.tsx?raw';

export type Example = {
  label: string;
  path: string;
  element: ComponentType;
  code: string;
};
const ex = (o: Example) => o;

export const examples = {
  default: ex({
    label: 'Default',
    path: '/example',
    element: DefaultExample,
    code: DefaultExampleCode,
  }),
  minimal: ex({
    label: 'Minimal example',
    path: '/example/minimal',
    element: MinimalExample,
    code: MinimalExampleCode,
  }),
  customFilter: ex({
    label: 'Custom Filter',
    path: '/example/custom-filter',
    element: CustomFilterExample,
    code: CustomFilterExampleCode,
  }),
  async: ex({
    label: 'Async data',
    path: '/example/async',
    element: AsyncExample,
    code: AsyncExampleCode,
  }),
  initialState: ex({
    label: 'Initial State',
    path: '/example/initial-state',
    element: InitialStateExample,
    code: InitialStateExampleCode,
  }),
  onRowClick: ex({
    label: 'On row / On cell',
    path: '/example/on-row-click',
    element: OnRowClickExample,
    code: OnRowClickExampleCode,
  }),
  filters: ex({
    label: 'Column Filters',
    path: '/example/filters',
    element: CustomFilterExample,
    code: CustomFilterExampleCode,
  }),
  empty: ex({
    label: 'Empty Grid',
    path: '/example/empty',
    element: EmptyExample,
    code: EmptyExampleCode,
  }),
  state: ex({
    label: 'Table State',
    path: '/example/state',
    element: StateExample,
    code: StateExampleCode,
  }),
  styles: ex({
    label: 'Custom Styles',
    path: '/example/styles',
    element: StylesExample,
    code: StylesExampleCode,
  }),
  locale: ex({
    label: 'Locale i18n',
    path: '/example/locale',
    element: LocaleExample,
    code: LocaleExampleCode,
  }),
  rowSelection: ex({
    label: 'Row selection',
    path: '/example/rowselection',
    element: RowSelectionExample,
    code: RowSelectionExampleCode,
  }),
  override: ex({
    label: 'External filter',
    path: '/example/externalfilter',
    element: ExternalFilterExample,
    code: ExternalFilterExampleCode,
  }),
};
