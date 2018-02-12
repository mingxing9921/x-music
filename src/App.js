import React, { Component } from "react";
import Spin from "./components/common/Spin";
import { connect } from "react-redux";
import Message from "./components/common/Message";
import Audio from "./components/music/audio";
import {
  musicBoxAddAPI,
  currentMusicAPI,
  changetimeAPI,
  controllAPI,
  changeMusicAPI
} from "./actions/music";

class App extends Component {
//测试3

    //获取更改的时间进度
    getCur(t){
        const {dispatch}=this.props;
        dispatch(changetimeAPI({
            currentTime:t.currentTime,
            changeTimeFlag:false
        }))
    }
    
    //更改时间进度
    changeTime(t){
        const {dispatch}=this.props;
        dispatch(changetimeAPI({
            currentTime:t.currentTime,
            changeTimeFlag:false
        }))
    }
    //更改歌曲
    changeMusic(){
        const {dispatch,musicPlayList,currentMusic}=this.props;
        dispatch(changeMusicAPI(musicPlayList,currentMusic))
    }
    //控释播放状态
    controllMusic(){
        const {dispatch}=this.props;
        dispatch(controllAPI('pause'));
    }

  render() {
    const { currentMusic, time, controll, spin, message } = this.props;
    return (
      <div className="root">
        <Spin spin={spin} />
        <Message data={message} />
        <div className="root">{this.props.children}</div>
        <Audio
          data={currentMusic}
          getCur={e => this.get(e)}
          time={time}
          changeTime={() => this.changeTime()}
          changeMusic={() => this.changeMusic}
          controllMusic={() => this.controllMusic()}
          controll={controll}
        />
      </div>
    );
  }
}
//获取从该组件需要的状态
function map(state) {
  return {
    time: state.music.time,
    spin: state.spin.spin,
    message: state.message.message,
    musicPlayList: state.music.musicPlayList,
    currentMusic: state.music.currentMusic,
    controll: state.music.controll
  };
}
//从redux获取map定义的需要的状态
export default connect(map)(App);
