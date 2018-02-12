import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {homeAPI} from '../actions/home'
import Slider from '../components/common/slider'
import RecommendList from '../components/music/recommendList'

class App extends Component {

    componentDidMount() {
        const {dispatch, data} = this.props
        if (!data.recommendMusics.length > 1) {
            dispatch(homeAPI(data, 0))
        }
    }

    render() {
        const {data} = this.props
        return (
            <div className='container' ref='container'>
                <Slider data={data.banner}></Slider>
                <div className="recommod">
                    <span style={{
                        fontSize: '1rem'
                    }}>推荐歌单</span>
                    <span className="arrow-right"></span>
                </div>
                <RecommendList
                    data={data
                    .recommendMusics
                    .slice(0, 9)}
                    scrollTop={() => this.scrollTopHandler()}
                    history={this.props.history}/>
            </div>
        );
    }
}

function map(state) {
    return {data: state.home.home}
}

export default connect(map)(App)