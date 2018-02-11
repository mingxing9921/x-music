import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { homeAPI, scrollTopAction } from "../actions/home";
import RecommendList from "../components/music/recommendList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      page: 1
    };
    this.handleChangeTabs = value => () => {
      this.setState({
        index: value
      });
    };
    this.handleChangeIndex = index => () => {
      this.setState({
        index
      });
    };
  }
  componentDidMount() {
    const { dispatch, data, scrollTop } = this.props;

    if (data.recommendMusics.length > 1) {
      this.refs.container.scrollTop =
        scrollTop > 0
          ? scrollTop + this.refs.container.clientHeight / 2 - 50
          : 0;
    } else {
      dispatch(homeAPI(data, this.state.page));
    }
  }
  // 记录当前div滚动高度，以便返回时复原
  scrollTopHandler() {
    const { dispatch } = this.props;
    dispatch(scrollTopAction(this.refs.container.scrollTop));
  }
  scroll() {
    const { dispatch, data } = this.props;
    // console.log('offsetHeight',this.refs.container.offsetHeight)
    // console.log('scrollHeight',this.refs.container.scrollHeight)
    // console.log('clientHeight',this.refs.container.clientHeight)
    // console.log('scrollTop',this.refs.container.scrollTop)
    if (
      this.refs.container.scrollTop + this.refs.container.clientHeight ===
      this.refs.container.scrollHeight
    ) {
      // 这里有问题
      dispatch(homeAPI(data, this.state.page + 1));
      this.setState({ page: this.state.page + 1 });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="container" onScroll={() => this.scroll()} ref="container">
      <br/>
        <RecommendList
          data={data.recommendMusics}
          scrollTop={() => this.scrollTopHandler()}
          history={this.props.history}
        />
      </div>
    );
  }
}

function map(state) {
  return {
    data: state.home.home,
    scrollTop: state.home.scrollTop,
    login: state.login.login,
    controll: state.music.controll
  };
}

export default connect(map)(App);
