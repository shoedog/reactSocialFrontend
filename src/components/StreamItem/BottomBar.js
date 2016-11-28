import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Share from 'material-ui/svg-icons/social/share';
import Comment from 'material-ui/svg-icons/communication/comment';
import Forum from 'material-ui/svg-icons/communication/forum';

import s from './streamItem.css';

const style = {
    height: 200,
    width: 300,
    margin: 10,
    textAlign: 'left',
    display: 'inline-block',
};

class BottomBar extends Component {
  constructor(props) {
    super(props);

    console.log(props)
    this.state = {
      selectedIndex: 0
    };
  }

  select = (index) => this.setState({selectedIndex: index});

  likeTweet = (id) => {
    fetch(`http://0.0.0.0:5000/social/favorite/${id.tweetId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
          }
      })
      .then((res) => console.log(res));
  };

  retweet = (id) => {
    fetch(`http://0.0.0.0:5000/social/retweet/${id.tweetId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
          }
      })
      .then((res) => console.log(res));
  };

  render() {

    const tweetId = this.props;

    return (
      <Paper zDepth={1}>
          <BottomNavigation>

              <BottomNavigationItem label="Comments"
                                    icon={<Forum/>}
                                    onTouchTap={() => this.select(0)}
              ></BottomNavigationItem>
              <BottomNavigationItem label="Comment"
                                    icon={<Comment/>}
                                    onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem label="Like"
                  icon={<FavoriteBorder/>}
                  onTouchTap={() => this.likeTweet(tweetId)}
              />
              <BottomNavigationItem label="Retweet"
                                    icon={<Share/>}
                                    onTouchTap={() => this.retweet(tweetId)}
              />
          </BottomNavigation>
      </Paper>
    )
  }
};


export default BottomBar;
