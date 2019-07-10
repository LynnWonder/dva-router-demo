import {routerRedux} from 'dva/router';
import React from "react";
import routes from './config'
import Home from '../components/Home';

const {ConnectedRouter}=routerRedux;
function RouterConfig({ history }) {
  console.info('history',history);
  return (
    // ConnectedRouter 可以理解为一个类似于browserHistory一样的路由器组件
    <ConnectedRouter history={history}>
      <Home routes={routes}>
      </Home>
    </ConnectedRouter>

  );
}
export default RouterConfig
