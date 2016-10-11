import React, { Component, PropTypes } from 'react';
import Immutable     from 'immutable';

class LaunchPageView extends Component {

  render() {
    return (
      <div id="launch-view">
        <h1 style={{"textAlign":"center"}}>Check out this Moon Man!</h1>
        <img src="https://portlandflag.files.wordpress.com/2015/05/as11-40-5875hr-cropped.jpg" className="img"/>
      </div>
    );
  }
}

export default LaunchPageView;
