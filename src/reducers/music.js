import { combineReducers } from "redux";
import {
  MUSICBOX,
  MUSICBOXADD,
  CURRENTMUSIC,
  KRC,
  PLAY,
  PAUSE,
  CHANGETIME,
  PRE,
  NEXT,
  FIRSTTIME
} from "../actions/music";

let musicPlayLisVo = [{ hash: "", name: "" }];

function musicPlayList(state = musicPlayLisVo, action) {
  switch (action.type) {
    case MUSICBOX: //初始化音乐盒
      return state;
    case MUSICBOXADD: //音乐盒添加音乐
      let flag = true;
      for (let i = 0; i < state.length; i++) {
        if (state[i].hash === action.obj.hash) {
          flag = false;
          break;
        }
      }
      if (flag) {
        state =
          state[0].hash === ""
            ? [].concat(action.obj)
            : state.concat(action.obj);
      }
      return state;
    default:
      return state;
  }
}
//初始化正在播放的歌曲的信息
let currentMusicVo = {
  hash: "",
  name: "",
  krc: [{ time: 0, str: "" }],
  singerName: "",
  songName: "",
  url: "",
  imgUrl: "",
  duration: 0
};
//正在播放歌曲的状态
function currentMusic(state = currentMusicVo, action) {
  switch (action.type) {
    case CURRENTMUSIC:
      return action.obj;
    default:
      return state;
  }
}
//歌曲时间的状态
function time(state = { currentTime: 0, changeTimeFlag: false }, action) {
  switch (action.type) {
    case CHANGETIME:
      return action.obj;
    default:
      return state;
  }
}
//歌曲的进度控制

function controll(state = "pause", action) {
  switch (action.type) {
    case PLAY:
      return action.obj;
    case PAUSE:
      return action.obj;
    default:
      return state;
  }
}
//歌曲的开始时间状态
function firstTime(state = true, action) {
  switch (action.type) {
    case FIRSTTIME:
      return action.obj;
    default:
      return state;
  }
}
//整合音乐盒的状态输出
const Reducers = combineReducers({
  musicPlayList,
  currentMusic,
  time,
  controll,
  firstTime
});

export default Reducers;
