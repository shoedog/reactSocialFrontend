import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Badge from 'material-ui/Badge';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Share from 'material-ui/svg-icons/av/repeat';
import Comment from 'material-ui/svg-icons/communication/comment';
import Forum from 'material-ui/svg-icons/communication/forum';
import { red400, grey500 } from 'material-ui/styles/colors';

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
      fav: this.props.favorited,
      rt: this.props.retweeted
    };
  }

  select = (index) => this.setState({selectedIndex: index});

  renderFav = () => {
    return this.state.fav ? <Favorite color={red400}/>
      : <FavoriteBorder/>
  }

  likeTweet = (id) => {
    const uriPath = this.state.fav ? 'unfavorite' : 'favorite';
    fetch(`http://54.212.196.159:5000/social/${uriPath}/${id}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
          }
      })
      .then((res) => {
        //console.log(res);
        const newState = ! this.state.fav;
        this.setState({fav: newState});
      });
  };

  retweet = (id) => {
    const uriPath = this.state.rt ? 'unretweet' : 'retweet';
    fetch(`http://54.212.196.159:5000/social/${uriPath}/${id}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
          }
      })
      .then((res) => {
        //console.log(res)
        const newState = ! this.state.rt;
        this.setState({rt: newState});

      });
  };

  render() {

    const { tweetId, favorited, retweeted, retweetCount, favoriteCount } = this.props;

    return (
      <Paper zDepth={1}>
          <BottomNavigation>
              <BottomNavigationItem label={favoriteCount}
                icon={this.renderFav()}
                onTouchTap={() => this.likeTweet(tweetId)}
              />
              <BottomNavigationItem label={retweetCount}
                icon={<Share/>}
                onTouchTap={() => this.retweet(tweetId)}
              />
          </BottomNavigation>
      </Paper>
    )
  }
};

/*
<BottomNavigationItem label="Comments"
                      icon={<Forum/>}
                      onTouchTap={() => this.select(0)}
></BottomNavigationItem>
<BottomNavigationItem label="Comment"
icon={<Comment/>}
onTouchTap={() => this.select(1)}
/>*/

const styles = {
  parent: {
    display: 'table'
  },
  smallText: {
    fontSize: 10,
    margin: 0,
    padding: 0,
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}


export default BottomBar;
