import React, {Component} from 'react';
import '../../css/beat.min.css'
class Beat extends Component {
    render() {
        return (
            <div
                className={this.props.beat
                ? 'beat t'
                : 'beat'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default Beat;