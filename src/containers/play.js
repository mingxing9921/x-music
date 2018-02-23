import React, { Component } from 'react';
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { currentMusicAPI,changetimeAPI,controllAPI,changeMusicAPI } from '../actions/music'
import {PlayBtn,StopBtn,ListBtn,PreBtn,NextBtn} from '../components/music/musicBtn' 

class App extends Component {
    //初始化状态
    constructor(props) {
        super(props)
        const {dispatch,currentMusic}=this.props;
        const {currentTime}=this.props.time;
        const duration=currentMusic.duration;
        this.state={
            slider:duration?currentTime/duration*100:0,
            playList:false
        }
    }
//取得歌曲的数据
    async componentDidMount() {
        const { dispatch, currentMusic, firstTime, controll } = this.props;
        const id=this.props.match.params.id;
        if (id && currentMusic.hash !== id) {
            await dispatch(currentMusicAPI(id,firstTime))
        }
       dispatch(controllAPI('play'));
    }

    //更新属性时的方法
    componentWillReceiveProps() {
        const {currentTime} =this.props.time;
        const duration=this.props.currentMusic.duration;
        this.setState({
            slider:duration===0?0:currentTime/duration*100
        })
    }
//播放器控制
    musicControll(){
        const {dispatch,controll,currentMusic}=this.props;
        if (currentMusic.hash==='')return
        let status=controll==='play'?'pause':'play'
        dispatch(controllAPI(status))
    }
    //格式化秒
    formatSeconds(value){
        let theTime=parseInt(value|0);//秒
        let theTime1=0;//分
        let theTime2=0;//小时
       
        if (theTime>=60) {
            theTime1=parseInt(theTime/60);
            theTime=parseInt(theTime%60);
            if (theTime1>=60) {
                theTime2=parseInt(theTime1/60);
                theTime1=parseInt(theTime1%60);
            }
        }
        let result=parseInt(theTime);
        result=(result>=10)?''+parseInt(theTime):'0'+parseInt(theTime);
        if (theTime1>0) {
            let m=parseInt(theTime1);
            m=m>=10?''+m:'0'+m;
            result=''+m+':'+result;
        }else{
            result='00:'+result
        }
        if (theTime2>0) {
            result=''+parseInt(theTime2)+':'+result;
        }
        return result;

    }
    //改变播放进度条
    changeSlider(value){
        const {currentTime}=this.props.time;
        const duration=this.props.currentMusic.duration;
        if (!duration) return this.setState({
            Slider:value
        })
        this.props.dispatch(changetimeAPI({
            currentTime:value/100*duration,
            changeTimeFlag:true
        }))

    }
    
    //播放当前音乐
    playMusic(id){
        const {dispatch,currentMusic}=this.props;
        if (currentMusic.hash!==id) {
            dispatch(currentMusicAPI(id))
        }
    }
    //返回
    goBack(){
        const{dispatch,home}=this.props;
        if (home.recommendMusics.length > 1) {
          this.props.history.goBack();
        } else {
          this.props.history.push("/discover");
        }
    }
    render() {
        const { dispatch,data,login,krc,time,controll,currentMusic,musicPlayList } = this.props
        const {currentTime } = this.props.time
        const duration = this.props.currentMusic.duration
        let imgU = currentMusic.imgUrl.replace('{size}',400)

        let krc2 =  currentMusic.krc.filter((item)=>
        currentTime > item.time
      )
      let s = krc2.pop()
      s = s? s : {time: 0 ,
            str: '',
            index:0}
        return (
            <div className='root'>
                <div style={{zIndex:1,position:'absolute',left:0,top:0,right:0,bottom:0}}>
                    <div style={{display:'flex',maxWidth:'640px',width:'100%',height:'100%',margin:'0 auto',backgroundImage:`url(${imgU})`,backgroundSize:'cover',filter:'blue(3rem)',backgroundPosition: '50%'}}>
                    </div>
                    <div style={{zIndex:3,position:'absolute',left:0,top:0,right:0,bottom:0,opacity: '0.7',backgroundColor:'#555'}}></div>
                </div>
                <div style={{height:'100%',zIndex:10,display:'flex',flexDirection:'column'}}>
                <div className="header" style={{backgroundColor:'transparent',color:'#fff',display:'flex',justifyContent: 'space-between',padding:'0 1rem',borderBottom:'.01rem solid #999'}}>
                        <div onClick={()=>this.goBack()} style={{display:'flex',flex:1}}>返回</div>
                        <div style={{display:'flex',flex:3,justifyContent:'center'}}>{currentMusic.songName}</div>
                        <div style={{display:'flex',flex:1}}></div>
                    </div>

                    <div className="container" style={{overflowY:'auto',textAlign:'center',color:'#aaa',padding:'3rem 0',fontSize:'1.2rem'}} onClick={()=>this.setState({playList:false})}>
                    {
                     currentMusic.krc.map((item,index)=>
                    <div key={index} style={Object.assign({transform:'translateY('+(15-s.index*3.3)+'rem',transition:'transform .5s ease',padding:'1rem 0'},s.time===item.time?{color:'#fff'}:{})}>
                    {item.str}
                    </div>
                    )
                    }
                    </div>
                    <div style={{padding:'1rem'}}>
                        <div style={{display:'flex'}}>
                       <div style={{padding:'0 1rem',color:'#fff'}}>{this.formatSeconds(currentTime)}
                       </div>
                       <div style={{display:'flex',flex:1}}>
                       <Slider onChange={(value)=>this.changeSlider(value)} step={0.1} value={this.state.slider} onBeforeChange={()=>this.musicControll('pause')} onAfterChange={()=>this.musicControll('play')}></Slider>
                       </div>
                       <div style={{padding:'0 .5rem',color:'#fff'}}>{this.formatSeconds(duration)}</div>
                        </div>
                        <div style={{display:'flex',padding:'1rem',justifyContent:'space-between'}}>
                        <div onClick={()=>console.log('....')}></div>
                        <div onClick={()=>this.props.dispatch(changeMusicAPI(musicPlayList,currentMusic,'pre'))}><PreBtn/></div>
                        <div onClick={()=>this.musicControll()}>{controll==='play'?<StopBtn/>:<PlayBtn/>}</div>
                        <div onClick={()=>this.props.dispatch(changeMusicAPI(musicPlayList,currentMusic))}><NextBtn/></div>
                        <div onClick={()=>this.setState({playList:true})}><ListBtn/></div>
                        </div>
                    </div>
                    <div className="container" style={Object.assign({position:'fixed',bottom:'0',left:'0',right:'0',maxHeight:'30rem',maxWidth:'640px',margin:'0 auto'},this.state.playList?{display:'block'}:{display:'none'})}>
                    <div style={{minHeight:'25rem',maxWidth:'640px',width:'100%',height:'100%',backgroundColor:'#fff',margin:'0 auto'}}>
                        <div style={{textAlign:'center',fontSize:'1.5rem',padding:'1rem',borderBottom:'.01rem solid #ddd'}}>
                        播放列表{currentMusic.hash===''?'(0)':`(${musicPlayList.length})`}
                        </div>
                        {
                            musicPlayList.map((item,index)=>
                            <div key={index} style={currentMusic.hash===item.hash?{color:'#ce3d3e'}:{}}>
                            <Item {...item} play={(id)=>this.playMusic(id)}></Item>
                            </div>
                            )
                        }
                    </div>
                    </div>

                </div>
            </div>
        );
    }
}
/* 播放列表详细组件 */
class Item extends Component{
    render(){
        const{name,hash,play}=this.props;
        return(
            <div onClick={()=>play(hash)} style={{padding:'1rem'}}></div>
        )

    }
}

function map(state) {
    return {
      musicPlayList: state.music.musicPlayList,
      currentMusic: state.music.currentMusic,
      controll:state.music.controll,
      time:state.music.time,
      home: state.home.home,
      firstTime:state.music.firstTime
    }
  }
  
  export default connect(map)(App)
  