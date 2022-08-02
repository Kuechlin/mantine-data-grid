import { Routes as RRRoutes, Route } from 'react-router-dom';

import { BASE_URL } from '../constants';
import Demo from './Demo';
import GettingStarted from './GettingStarted';
import Properties from './Properties';
import Styles from './Styles';

import MainExample from './examples/MainExample';
import CustomFilterExample from './examples/CustomFilterExample';
import AsyncExample from './examples/AsyncExample';
import InitialStateExample from './examples/InitialStateExample';
import OnRowClickExample from './examples/OnRowClickExample';

export default function Routes() {
  return (
    <RRRoutes>
      <Route path={BASE_URL + '/'} element={<Demo />} />
      <Route path={BASE_URL + '/getting-started'} element={<GettingStarted />} />
      <Route path={BASE_URL + '/properties'} element={<Properties />} />
      <Route path={BASE_URL + '/styles'} element={<Styles />} />
      <Route path={BASE_URL + '/example'} element={<MainExample />} />
      <Route path={BASE_URL + '/example/custom-filter'} element={<CustomFilterExample />} />
      <Route path={BASE_URL + '/example/async'} element={<AsyncExample />} />
      <Route path={BASE_URL + '/example/initial-state'} element={<InitialStateExample />} />
      <Route path={BASE_URL + '/example/initial-state'} element={<InitialStateExample />} />
      <Route path={BASE_URL + '/example/on-row-click'} element={<OnRowClickExample />} />
    </RRRoutes>
  );
}
