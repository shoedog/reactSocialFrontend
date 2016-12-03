import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { Tabs, Tab, GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FaTwitter from 'react-icons/lib/fa/twitter';
import StreamItem from '../StreamItem/StreamItem';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import s from './trends.css';
import Snackbar from 'material-ui/Snackbar';
import { fetchJson } from '../../utils/lib/fetchUtils';
import cities from '../../utils/lib/cities';

class AvailableTrends extends Component {
  mixins: [React.addons.LinkedStateMixin]
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dopen: false,
            searchData: null,
            trendItems: null,
        };
        this.getTrending = this.getTrending.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.viewTweets = this.viewTweets.bind(this);
    }

    handleClick(e) {
      this.getTrending(e);
    }

    handleTrend(e) {
        this.viewTweets(e);
    }

    getId = (e) => {
      console.log(e)  ;
    };

    comoponentWillUpdate() {
      console.log(this.state)
    }


    /**
     *     TRENDS!
     *
     *
     * **/
    getTrending = (id) => {
        let options = { method: 'GET'};
        return fetchJson(`http://54.212.196.159:5000/social/trends/place/${id}`,
            {options})
        .then((res) => {
            console.log('TRENDS');
            console.log(res);
            this.setState({trendItems: res});
        })
    };

  viewTweets = (term) => {
      let options = { method: 'GET'};
      return fetchJson(`http://54.212.196.159:5000/social/stream/${term}`,
          {options})
      .then((res) => {
          console.log(res);
          this.setState({searchData: res});
          this.setState({dopen: !this.state.dopen});
      })
  };

  getText(tweet) {
      if ( tweet.extended_tweet ){
          return tweet.extended_tweet.full_text;
      } else if ( tweet.retweeted_status ) {
          if ( tweet.retweeted_status.extended_tweet ){
              return tweet.retweeted_status.extended_tweet.full_text;
          }
          return tweet.retweeted_status.text;
      }
      return tweet.text;
  }
  getImgs(tweet) {
      if ( tweet.extended_entities) {
          let imgs = tweet.extended_entities.media.filter((media) => {
              if ( media.type === 'photo'){
                  return media.media_url;
              }
          });
          return imgs;
      } else if (tweet.entitites) {
          let imgs = tweet.entities.media.filter((media) => {
              if ( media.type === 'photo') {
                  return media.media_url;
              }
          });
          return imgs;
      }
  }
  getGif(tweet) {
      if (tweet.extended_entities) {
          let gifs = tweet.extended_entities.media.filter((media) => {
              if( media.type === 'animated_gif'){
                  return media.video_info.variants[0].url;
              }
          });
          return gifs;
      }
  }

    getTrends(trendList) {
        console.log('test');
        console.log(trendList);
        if (trendList === null) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <ul>
                    {trendList[0].trends.map((trend) => (
                            <li>
                                <FlatButton label={trend.name + ' Tweets: ' + trend.tweet_volume}
                                onClick={this.handleTrend.bind(this, trend['query'])}/>
                            </li>

                    ))}

                </ul>
            )
        }
    }


    getDrawer(searchGroup) {
        console.log(searchGroup);
        if (searchGroup == null ) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* Begin Left Drawer */}
                    <Drawer open={this.state.dopen} width={400} docked={false} openSecondary={true} onRequestChange={(dopen) => this.setState({dopen})}>
                        <GridList cellHeight='auto' style={{
                            width: 350,
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '10%',
                            marginTop: 40
                        }} padding={10} cols={1}>
                            {searchGroup.statuses.map((tweet) => (
                                <GridTile key={tweet.id_str}>
                                    <StreamItem
                                        tweetId={tweet.id_str}
                                        favorited={tweet.favorited}
                                        retweeted={tweet.retweeted}
                                        retweetCount={tweet.retweet_count}
                                        favoriteCount={tweet.favorite_count}
                                        friend={tweet.user.screen_name}
                                        avatarImg={tweet.user.profile_image_url}
                                        textContent={this.getText(tweet)} />
                                </GridTile>
                            ))}
                        </GridList>
                    </Drawer>
                    {/* End Left Drawer */}
                </div>
            );
        }
    }


    render() {
        let link = "";
        return(
            <div>

                {/* START MAIN BLOCK */}
                <Paper className={s.paperBlock} zDepth={0}>
                    <div style={{display: 'flex', }}>
                        <div>
                            {/* Begin Place List */}
                            <ul >
                            {cities.map((city, handle=fn) => (

                                    <li key={city.woied}> <FlatButton label={city.name} onClick={this.handleClick.bind(this, city['woeid'])} /></li>

                            ))}
                            </ul>
                            {/* End Place List */}
                        </div>
                        <div>
                            <p>TRENDS</p>
                            {/* Begin Trend List  {this.getTrends(this.state.availableTrends)}*/}
                            {this.getTrends(this.state.trendItems)}
                            {/* End Trend List */}
                        </div>
                    </div>
                    {/* Begin Left Drawer {this.getDrawer(this.state.searchData)}*/}
                    {this.getDrawer(this.state.searchData)}
                    {/* End Left Drawer */}
                </Paper>
                {/* END MAIN BLOCK */}
            </div>
        );
    }
}

export default AvailableTrends;
