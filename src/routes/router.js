import React from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import IndexPage from '../components/IndexPage';

const {ConnectedRouter}=routerRedux;
function RouterConfig({ history }) {
  return (
      <ConnectedRouter history={history}>
          <Route path="/" component={IndexPage} />
      </ConnectedRouter>

  );
}

export default RouterConfig;
