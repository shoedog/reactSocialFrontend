import React, { PropTypes } from 'react';

export default class AppView extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div id="app-view">

        <h1>Todos</h1>

        <hr />

        {this.props.children}
      </div>
    );
  }
}