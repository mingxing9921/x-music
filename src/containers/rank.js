/* 排行榜 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { rankListAction } from '../actions/rank'

class Rank extends Component {
    componentDidMount() {
        const {dispatch,data}=this.props;
        if (data.length===0) {
            dispatch(rankListAction())
        }
    }
    

    render() {
        const {data} = this.props;
        return (
            <div className="container">
                {data.map((obj,index)=><div onClick={()=>this.props.history.push(`/rankinfo/${obj.rankid}`)} style={{display:'flex',flexFlow:'row',marginBottom:'0.8rem'}} key={index}>
                <div style={{width:'20%'}}><img src={obj.imgurl.replace('{size}','400')} style={{width:'100%',marginTop:'0.1rem'}}/></div>
                <div style={{display:'flex',width:'75%',justifyContent:'space-between',borderBottom:'solid 1px #aaa'}}>
                <div style={{display:'flex',flexFlow:'column',justifyContent:'space-around',padding:'0.8rem',width:'75%'}}>
                <div style={{fontSize:'1.1rem' ,color:'#222'}}>{obj.rankname}</div>
                {obj.songinfo.map((item,index)=>
                <div style={{color:'#555',display:'flex',alignItems:'center'}} key={index}>
                <div className={`rank top${index+1}`}>{index+1}</div>
                <div style={{width:'100%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:'1rem'}}>{item.songname}</div>
                </div>
                )}
                </div>
                <div className="arrow-right" style={{alignSelf:'center',borderColor:'rgb(84,170,222)',marginRight:'1.1rem'}}>
                </div>
                </div>
                </div>)}
            </div>
        );
    }
}

function map(state) {
  return {
    data: state.rank.list
  }
}
export default connect(map)(Rank)