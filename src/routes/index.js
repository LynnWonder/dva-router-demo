import IndexPage from '../components/IndexPage';
import Home from '../components/Home';
import {routerRedux} from 'dva/router';
import React from "react";
import routes from './config'
const {ConnectedRouter}=routerRedux;
function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Home routes={routes}>
      </Home>
    </ConnectedRouter>

  );
}
export default RouterConfig
