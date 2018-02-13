import Config from '../config'
import { spin,spinHidden } from './spin'
import api from '../api'

export const MV_RECOMMEND= 'MV_RECOMMEND';//推荐MV
export const MV_NEWEST ='MV_NEWEST';//最新MV
export const MV_INFO = 'MV_INFO';//MV详细信息
export const MV_COMMENT = 'MV_COMMENT';//MV评论列表

const mvRecommend = (obj) => {return {type:MV_RECOMMEND, obj}}
const mvNewest = (obj) => {return {type:MV_NEWEST, obj}}
const mvInfo = (obj) => {return {type:MV_INFO, obj}}
const mvComment = (obj) => {return {type:MV_COMMENT, obj}}

//获取推荐MV列表

export function mvRecommendAction(){
    return async dispatch=>{
        dispatch(spin());
        try {
            let data=await api (Config.recommendMV);
            dispatch(mvRecommend(data.result));
            dispatch(spinHidden());
            
        } catch (error) {
            console.log(error)
        }
    }
}
//获取最新MV列表
export function mvNewestAction(limit=30,offset=0) {
    return async dispatch=>{
        dispatch(spin());
        try {
            let data = await api(Config.newestMV,'get',{limit,offset});
            dispatch(mvNewest(data.data));
            dispatch(spinHidden());
            
        } catch (error) {
            console.log(error);
        }
    }
}
//根据mvid获取MV的评论列表

export function mvCommentAction(mvid) {
    return async dispatch=>{
        try {
            let data=await api(Config.mvComment,'get',{id:mvid});
            dispatch(mvComment(data.hotComments));
        } catch (error) {
            console.log(error)
        }
    }
    
}

//根据MVID获取MV的详细信息
export function mvInfoAction(mvid) {
    return async dispatch=>{
        dispatch(spin());
        try {
            let data=await api(Config.mvInfo,'get',{mvid});
            dispatch(mvInfo(data.data));
            dispatch(spinHidden());
            
        } catch (error) {
            console.log(error)
        }
    }
}
//返回时清除MV信息
//若不清除，第二次进入mv播放页面，mv视频还是上一个
export function clearMvInfo() {
    let mvInfoVo={
        name:'',
        brs:{
            240:null,
            480:null,
            720:null,
            1080:null
        }
    }
    return dispatch=>{
        //清除MV详细信息
        dispatch(mvInfo(mvInfoVo));
        //清除MV的评论列表
		dispatch(mvComment([]))
    }
}