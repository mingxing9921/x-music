import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers/index';
import {login} from '../actions/login';
import storage from '../storage';
export default function (initialState) {
				let createStoreWithMiddleware;
				if (process.env.NODE_ENV === 'production') {
								createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

				} else {
								//const logger = createLogger();
								createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
				}
				let store = createStoreWithMiddleware(reducers, initialState);
				//  get token from storage store.dispatch(login(storage.get('token')));
				return store;
};
