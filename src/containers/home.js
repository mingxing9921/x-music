import React, { Component } from "react";
import Slider from '../components/common/slider'
import { connect } from 'react-redux'

class App extends Component {
    
  render() {
      const {dispatch,data,login,controll}=this.props;
    return (
      <div className="root">
        <div
          className="header"
          style={{
            background: "#ce3d3e",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1rem"
          }}
        >
        <div style={{display:'flex',flex:1}}></div>
        <div style={{display:'flex',flex:10,justifyContent:'center'}}></div>
        </div>
        <div className="homeTab">
          <div className="homeTab1">
            <div >个性推荐</div>
            <div >歌单</div>
            <div >主播电台</div>
            <div>排行榜</div>
          </div>
          <div className="highlight" style={{transform:`translateX($(index)00%)`}}></div>

        </div>
        <div className="container">
        <Slider data={data.banner}></Slider>
        </div>
      </div>
    );
  }
}
function map(state) {
    return{
        data: state.home.home,
    
    }
}
export default connect(map)(App);
