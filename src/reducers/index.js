import {combineReducers} from 'redux'
import home from './home'
import spin from './spin'
import message from './message'
const reducers = combineReducers({home, spin, message})

export default reducers