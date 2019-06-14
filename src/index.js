import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from "history";
import models from './models/index'
// 1. Initialize
const app = dva({
  history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
[...models].forEach((model) => {app.model(model.default||model);})

// 4. Router
app.router(require('./routes/index'));

// 5. Start
app.start('#root');
