import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.min.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import Routers from './routers';
import configureStore from './stores/index';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
    <Routers/></Provider>, document.getElementById('root'));
registerServiceWorker();
