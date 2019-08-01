import dva from 'dva';
import {createBrowserHistory as createHistory} from "history";
import models from './models/index';
import './index.less';
import 'antd-mobile/dist/antd-mobile.less';
import 'antd/dist/antd.less';
// 1. Initialize
const app = dva({
  history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// [...models].forEach((model) => {app.model(model.default||model);})

// 4. Router
app.router(require('./routes/index'));
[...models].forEach(model => app.model(model.default||model))
// 5. Start
app.start('#root');
