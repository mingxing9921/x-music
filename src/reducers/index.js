import {combineReducers} from 'redux'
import home from './home'
import spin from './spin'
import message from './message'
import music from './music'
import search from './search'
import login from './login'
import rank from './rank'
const reducers = combineReducers({
    home,
    spin,
    message,
    music,
    search,
    login,
    rank
})

export default reducers