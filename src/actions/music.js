import Config from "../config";
import { spin, spinHidden } from "./spin";
import api from "../api";

export const MUSICBOX = "MUSICBOX";
export const MUSICBOXADD = "MUSICBOXADD";
export const CURRENTMUSIC = "CURRENTMUSIC";
export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const CHANGETIME = "CHANGETIME";
export const FIRSTTIME = "FIRSTTIME";

const musicBox = obj => {
  return { type: MUSICBOX, obj };
};
const musicBoxAdd = obj => {
  return { type: MUSICBOXADD, obj };
};
const currentMusic = obj => {
  return { type: CURRENTMUSIC, obj };
};
const play = obj => {
  return { type: PLAY, obj };
};
const pause = obj => {
  return { type: PAUSE, obj };
};
const changetime = obj => {
  return { type: CHANGETIME, obj };
};
const firstTime = obj => {
  return { type: FIRSTTIME, obj };
};

export function musicBoxInit(obj) {
  return dispatch => {
    dispatch(musicBox(obj));
  };
}

export function musicBoxAddAPI(obj) {
  return dispatch => {
    dispatch(musicBoxAdd(obj));
  };
}

export function firstTimeAction(obj) {
  return dispatch => {
    dispatch(firstTime(obj));
  };
}

export function currentMusicAPI(id, firstTime) {
  return async dispatch => {
    try {
    
      let data = await api(Config.musicAPI.replace("HASH", id));
      let krc = await api(
        Config.krcAPI.replace("HASH", id).replace("TIMELENGTH", data.timeLength + "000"),
        "get",
        {},
        { Accept: "text/html" }
      );
      let krcArray = [];
      krc.split("\n").map((item, index) => {
        let t = item.substring(1, item.indexOf("]"));
        let tt =
          parseInt(t.substring(0, t.indexOf(":"))) * 60 +
          parseFloat(t.substring(t.indexOf(":") + 1));
        krcArray.push({
          time: tt,
          str: item.substring(item.indexOf("]") + 1),
          index: index
        });
      });
      krcArray.pop();
      let music = {
        krc: krcArray,
        hash: id,
        url: data.url,
        singerName: data.singerName,
        songName: data.songName,
        imgUrl: data.imgUrl,
        duration: data.timeLength
      };
      dispatch(musicBoxAddAPI({ hash: data.hash, name: data.songName }));
      dispatch(currentMusic(music));
      if (!firstTime) {
        dispatch(controllAPI("play"));
      } else {
        firstTimeAction(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
}
//把整改的时间传递给redux
export function changetimeAPI(obj) {
  return dispatch => {
    dispatch(changetime(obj));
  };
}
//播放的状态传递给redux
export function controllAPI(obj) {
  return dispatch => {
    if (obj === "play") {
      dispatch(play(obj));
    } else if (obj === "pause") {
      dispatch(pause(obj));
    }
  };
}
//正在播放歌曲的Hash并传递新的state到redux??????
export function changeMusicAPI(state, currentMusic, type) {
  return dispatch => {
    let index = 0;
    //如果歌曲单里就一首,播放这一首
    if (state.length === 1) {
      index = 0;
    } else {//循环歌单,找到歌单中正在播放这一首
      for (let i = 0; i < state.length; i++) {
        if (state[i].hash === currentMusic.hash) {
          index = i;
          break;
        }
      }
      if (type !== "pre") {//如果类型不是上一首
        if (index === state.length - 1) {//如果播放是最后一首,index定义到第一首
          index = 0;
        } else {
          index = 1;
        }
      } else {//如果播放的是第一首,歌单减一
        if (index === 0) {
          index = state.length - 1;
        } else {//如果不是,index为上一个
          index = index - 1;
        }
      }
    }
    dispatch(currentMusicAPI(state[index].hash));
  };
}
