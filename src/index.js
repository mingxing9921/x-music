import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.min.css';
import './css/pagination.min.css';
import './css/slider.min.css'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import Routers from './routers';
import configureStore from './stores/index';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
    <Routers/></Provider>, document.getElementById('root'));
registerServiceWorker();
