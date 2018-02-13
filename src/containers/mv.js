import React, {Component} from 'react';
import {connect} from 'react-redux'
import {mvRecommendAction, mvNewestAction} from '../actions/mv'
import RecommendMV from '../components/music/recommendMV'

class App extends Component {

    componentDidMount() {
        const{dispatch,mv}=this.props;
        if (mv.recommend.length===0) {
            dispatch(mvRecommendAction())
        }
        if(mv.newest.length===0){
            dispatch(mvNewestAction())
        } 
    }
    playMV(mvid){
        this.props.history.push(`/mvplay/${mvid}`)
    }
    
    render() {
        const {recommend, newest} = this.props.mv;
     
        return (
            <div className='container'>
             <RecommendMV data={recommend} playMV={(mvid) => this.playMV(mvid)}/>

                <div className="recommod">
                    <span
                        style={{
                        lineHeight: '1.6rem'
                    }}>最新MV</span>
                    <span className='arrow-right'></span>
                </div>
                <div style={Styles.newMV}>
                {newest.map((item,index)=>
                <div style={Styles.newMV.item} onClick={()=>this.playMV(item.id)} key={index}>
                <img src={item.cover} style={Styles.newMV.img}/>
                <div style={Styles.newMV.name}>{item.name}</div>
                <div style={Styles.newMV.artistName}>{item.artistName}</div>
                </div>
                )}
                </div>
            </div>
        );
    }
}

const Styles = {
    newMV: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',

        item: {
            width: '14rem',
            margin: '0.5rem 0rem'
        },
        img: {
            width: '14rem',
            height: '8.6rem',
            border: '1px solid #eee'
        },

        name: {
            color: '#333',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },

        artistName: {
            color: '#888'
        }
    }
}
function map(state) {
    return {mv: state.mv}
}

export default connect(map)(App)