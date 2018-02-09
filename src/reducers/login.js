import {combineReducers} from 'redux'
import {LOGIN, LOGIN_ERROR, ACCOUNT} from '../actions/login'

// function loginError(state = '', action) {   switch (action.type) {     case
// LOGIN_ERROR:       return action.message     default:       return state   }
// }

function login(state = '', action) {
    switch (action.type) {
        case LOGIN:
            return action.token
        default:
            return state
    }
}

function loginError(state = '', action) {
    switch (action.type) {
        case LOGIN_ERROR:
            return action.obj
        default:
            return state
    }
}

let accountVo = {
    account: {},
    profile: {
        avatarUrl: ''
    }
}

function account(state = accountVo, action) {
    switch (action.type) {
        case ACCOUNT:
            return action.obj
        default:
            return state;
    }
}

const todoApp = combineReducers({login, account})

export default todoApp