import { Routes as RRRoutes, Route } from 'react-router-dom';

import Demo from '../components/Demo';
import GettingStarted from '../components/GettingStarted';
import Properties from '../components/Properties';
import Styles from '../components/Styles';

import MainExample from '../components/examples/MainExample';
import CustomFilterExample from '../components/examples/CustomFilterExample';
import AsyncExample from '../components/examples/AsyncExample';
import InitialStateExample from '../components/examples/InitialStateExample';
import OnRowClickExample from '../components/examples/OnRowClickExample';

import { BASE_URL } from '../constants';

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
