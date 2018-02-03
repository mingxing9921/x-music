import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div className="root">
        <div className="root">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
