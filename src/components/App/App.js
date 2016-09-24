import React, { Component } from 'react';
import Counter from '../Counter/Counter';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
        <h2> Hello 2 </h2>
        <Counter/>
      </div>
    );
  }
}

export default App;