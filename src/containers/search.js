import React, {Component} from 'react';
import {connect} from 'react-redux'
import Nav from '../components/common/Nav'
import {searchHotAPI, searchResultAPI, clearSearchResultAPI} from '../actions/search'
import Storage from '../storage'

class Search extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(searchHotAPI());
        let page = 1;
    }

    searchEvt(keyword, page = 1) {
        const {dispatch} = this.props;
        keyword = keyword || this.refs.keyword.value;
        if (keyword != '') {
            dispatch(searchResultAPI(keyword, page));
        } else {
            dispatch(clearSearchResultAPI());
        }
        this.refs.keyword.value = keyword;
    }
    clear() {
        const {dispatch} = this.props;
        dispatch(clearSearchResultAPI());
        this.refs.keyword.value = '';
    }
    toPlay(hash) {
        this
            .props
            .history
            .push('/play/' + hash)
    }
    goHome() {
        this
            .props
            .history
            .push('/')
    }
    render() {
        const {dispatch, controll, search} = this.props;
        const hasResult = search.result.length > 0;
        const searchHistory = Storage.get('searchHistory')
            ? Storage
                .get('searchHistory')
                .split(',')
            : []
        return (
            <div
                className="root"
                style={{
                fontSize: '1.2rem'
            }}>
                <div
                    className="header"
                    style={{
                    backgroundColor: '#ce3d3e',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 1rem'
                }}>
                    <span onClick={() => this.props.history.goBack()}>返回</span>
                    <div>
                        <input placeholider='搜索音乐' ref='keyword' style={Styles.input}/>
                        <span
                            style={{
                            color: '#777',
                            marginLeft: '-1.2rem'
                        }}
                            onClick={() => this.clear()}>x</span>
                    </div>
                    <span onClick={() => this.searchEvt()}>搜索</span>
                </div>
                <div
                    className="container"
                    style={{
                    color: '#555'
                }}>
                    {(search.result.length == 0)
                        ? <div>
                                <br/>
                                热门搜索：
                                <div style={Styles.labels}>
                                    {search
                                        .hots
                                        .map((obj, index) => <label
                                            key={index}
                                            onClick={() => this.searchEvt(obj.keyword)}
                                            style={Styles.label}>{obj.keyword}</label>)
}
                                </div>
                                搜索历史:
                                <div style={Styles.labels}>
                                    {searchHistory
                                        .filter(str => str != '' && str != null && str != undefined)
                                        .map((str, index) => < div key = {
                                            index
                                        }
                                        onClick = {
                                            () => this.searchEvt(str)
                                        }
                                        style = {
                                            Styles.label
                                        } > {
                                            str
                                        } < /div>)}
                                </div>
                            </div>
                        : <div
                            style={{
                            display: 'flex',
                            flexFlow: 'column'
                        }}>
                            {search
                                .result
                                .map((obj, index) => <div
                                    key={index}
                                    style={Styles.resultItem}
                                    onClick={() => this.toPlay(obj.hash)}>{obj.filename}</div>)}
                        </div>
}</div>
                <Nav/>
            </div>
        );
    }
}

const Styles = {
    input: {
        width: '18rem',
        height: '1.6rem',
        borderRadius: '0.8rem',
        outline: 'none',
        fontSize: '1.1rem',
        border: '1px solid #e5e5e5',
        paddingLeft: '.5rem'
    },
    labels: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        margin: '1rem 0rem'
    },
    label: {
        padding: '.5rem',
        width: '6rem',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid #bbb',
        borderRadius: '2rem',
        marginTop: '.5rem'
    },
    resultItem: {
        padding: '1rem',
        borderBottom: '.03rem solid #eee',
        margin: '0 1rem'
    }
}
function map(state) {
    return {search: state.search, controll: state.music.controll}
}
export default connect(map)(Search);