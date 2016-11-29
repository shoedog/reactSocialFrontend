import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Share from 'material-ui/svg-icons/social/share';
import Comment from 'material-ui/svg-icons/communication/comment';
import Forum from 'material-ui/svg-icons/communication/forum';
import { red400 } from 'material-ui/styles/colors';

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

    this.renderFav = this.renderFav.bind(this);
    this.state = {
      selectedIndex: 0,
      fav: this.props.favorited
    };
  }

  select = (index) => this.setState({selectedIndex: index});

  renderFav = () => {
    return this.state.fav ? <Favorite color={red400}/>
      : <FavoriteBorder/>
  }

  likeTweet = (id) => {
    const uriPath = this.state.fav ? 'unfavorite' : 'favorite';
    fetch(`http://0.0.0.0:5000/social/${uriPath}/${id}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
          }
      })
      .then((res) => {
        console.log(res);
        const newState = ! this.state.fav;
        this.setState({fav: newState});
      });
  };

  retweet = (id) => {
    fetch(`http://0.0.0.0:5000/social/retweet/${id}`,
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

    const { tweetId, favorited } = this.props;

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
                icon={this.renderFav()}
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
