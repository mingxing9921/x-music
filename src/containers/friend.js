import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {homeAPI} from '../actions/home'

import Nav from '../components/common/Nav';
class App extends Component {

    render() {

        return (
            <div className='root'>

                <div
                    className="header"
                    style={{
                    backgroundColor: '#ce3d3e',
                    color: '#fff'
                }}>
                    朋友
                </div>

                <div className="container">
                    TODO
                </div>

                <Nav/>

            </div>
        )
    }
}

export default App
