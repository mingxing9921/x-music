import React, {Component} from 'react';

const styles = {
    search: {
        width: '100%',
        borderRadius: '1rem',
        border: '.1rem solid #fff',
        height: '1.5rem',
        paddingLeft: '1rem',
        color: '#333'
    }
}
class Search extends Component {
    render() {
        return (<input placeholder='搜索音乐' style={styles.search}/>);
    }
}

export default Search;