import {combineReducers} from 'redux'
import home from './home'
import spin from './spin'
import message from './message'
import music from './music'
const reducers = combineReducers({home, spin, message,music})

export default reducers