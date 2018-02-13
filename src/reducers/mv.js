import { combineReducers } from 'redux'
import { MV_RECOMMEND,MV_NEWEST,MV_INFO,MV_COMMENT } from '../actions/mv'

function recommend(state=[],action) {
    switch (action.type) {
        case MV_RECOMMEND:
            return action.obj;
        default:
            return state;
    }
}

function newest(state=[],action) {
    switch (action.type) {
        case MV_NEWEST:
        return action.obj;
        default:
            return state;
    }
}

let mvInfoVo={
    name:'',
    brs:{
        240:null,
        480:null,
        720:null,
        1080:null,
    }
}

function mvInfo(state=mvInfoVo,action) {
    switch (action.type) {
        case MV_INFO:
        return action.obj;
        default:
        return state;
    }
}

let commentVo = [{
    user: {},
    time: 1494424829003,
    likedCount: 34,
    commentId: 379105019,
    liked: false,
    content: ""
    }]

    function comment(state=commentVo,action) {
        switch (action.type) {
            case MV_COMMENT:
            return action.obj;
            default:
            return state;
        }
    }

    const Reducers=combineReducers({
        recommend,newest,mvInfo,comment
    })

    export default Reducers