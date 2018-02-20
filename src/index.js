import React from "react";
import ReactDOM from "react-dom";
import "./css/main.min.css";
import "./css/pagination.min.css";
import "./css/slider.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import configureStore from "./stores/index";

import Music from "./containers/music";
import Friend from "./containers/friend";
import Account from "./containers/account";
import Search from "./containers/search";
import App from "./App";
import Home from "./containers/home";
import Rankinfo from './containers/rankInfo'
import play from './containers/play'


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router>
        <Switch className="root">
        <Route  path={`/discover`} component={Home} />
        <Route  path={`/music`} component={Music} />
        <Route  path={`/friend`} component={Friend} />
        <Route  path={`/account`} component={Account} />
        <Route  path={`/search`} component={Search} />
        <Route  path={`/rankinfo/:rankid`} component={Rankinfo} />
        <Route  path={`/play`} component={play} />
        <Route  path={`/play/:id`} component={play} />
        <Route component={Home}/>
        </Switch>
      </Router>
    </App>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
