import React, {Component} from 'react';
import Spin from './components/common/Spin'
import {connect} from 'react-redux'
import Message from './components/common/Message'
import Audio from './components/music/audio'
import {musicBoxAddAPI, currentMusicAPI, changetimeAPI, controllAPI, changeMusicAPI} from './actions/music'

class App extends Component {
				render() {
								const {currentMusic, time, controll, spin, message} = this.props;
								return (
												<div className="root">
																<Spin spin={spin}></Spin>
																<Message data={message}></Message>
																<div className="root">{this.props.routs}</div>
																<Audio
																				data={currentMusic}
																				getCur={(e) => this.get(e)}
																				time={time}
																				changeTime={() => this.changeTime()}
																				changeMusic={() => this.changeMusic}
																				controllMusic={() => this.controllMusic()}
																				controll={controll}/>
												</div>
								);
				}
}
function map(state) {

				return {
								time: state.music.time,
								spin: state.spin.spin,
								message: state.message.message,
								musicPlayList: state.music.musicPlayList,
								currentMusic: state.music.currentMusic,
								controll: state.music.controll
				}
}
export default connect(map)(App);
