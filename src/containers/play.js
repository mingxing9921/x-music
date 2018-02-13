import React, { Component } from 'react';
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { currentMusicAPI,changetimeAPI,controllAPI,changeMusicAPI } from '../actions/music'

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
        const {dispatch,currentMusic,firstTime}=this.props;
        const id=this.props.match.params.id;
        if (id&&currentMusic.hash!==id) {
            await dispatch(currentMusicAPI(id,firstTime))
        }
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
        let status=controll==='paly'?'pause':'play'
        dispatch(controllAPI(status))
    }
    //格式化秒
    formatSeconds(value){
        var theTime=parseInt(value|0);//秒
        var theTime1=0;//分
        var theTime2=0;//小时
        
        

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
                    <div style={{display:'flex',maxWidth:'640px',width:'100%',height:'100%',margin:'0 auto',backgroundImage:`url(${imgU})`,backgroundSize:'cover',filter:'blue(3rem)','-webkit-filter':'blue(3rem)',backgroundPosition:'50%'}}>
                    </div>
                    <div style={{height:'100%',zIndex:10,display:'flex',flexDirection:'column'}}></div>
                </div>
                <div style={{height:'100%',zIndex:10,display:'flex',flexDirection:'column'}}>
                    <div className="header" style={{backgroundColor:'transparent',color:'#fff',display:'flex',justifyContent:'space-between',padding:'0 1rem',borderBottom:'.01rem solid #999'}}>
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
                       
                        </div>
                    </div>

                </div>
            </div>
        );
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
  