import {routerRedux} from 'dva/router';
import React from "react";
import routes from './config'
import Home from '../components/Home';
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
